import { Server } from 'socket.io'
import * as mongoose from 'mongoose'
import Document from './Document'

mongoose.connect('mongodb://localhost/veiga-docs', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const io = new Server()

io.attach(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const defaultValue = ''

io.on('connection', socket => {
  socket.on('get-document', async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit('load-document', document.data)

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit('receive-changes', delta)
      console.log(delta)
    })

    socket.on('save-document', async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
  console.log('Socket connected.')
})

const findOrCreateDocument = async (documentId: string) => {
  if (!documentId) {
    throw new Error('No documentId found')
  }

  const document = await Document.findById(documentId)
  if (document) return document
  return await Document.create({
    _id: documentId,
    data: defaultValue
  })
}
