import { Server } from 'socket.io'
import { documentModel } from './database'
import { connect } from 'mongoose'


connect('mongodb://localhost/veiga-docs', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const io = new Server()

io.attach(8001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const defaultValue = ''

io.on('connection', socket => {
  socket.on('get-document', async (documentId: string, userId: string) => {
    const document = await findOrCreateDocument(documentId, userId)
    socket.join(documentId)
    socket.emit('load-document', document.data)
    socket.emit('get-title', document.title)

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit('receive-changes', delta)
      console.log(delta)
    })

    socket.on('save-document', async (data, title, image) => {
      await documentModel.findByIdAndUpdate(documentId, { 
        data,
        title,
        image,
        updatedAt: new Date()
      })
    })
  })
  console.log('Socket connected.')
})

const findOrCreateDocument = async (documentId: string, userId: string) => {
  if (!documentId) {
    throw new Error('No documentId found')
  }

  if (!userId) {
    throw new Error('No userId found')
  }

  const document = await documentModel.findById(documentId)
  if (document) return document
  return await documentModel.create({
    _id: documentId,
    userId,
    data: defaultValue,
    title: '',
    image: '',
    updatedAt: new Date(),
    createdAt: new Date(),
    deletedAt: null
  })
}
