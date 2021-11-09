import express from 'express'
import { GetDocumentsByUserId } from './types'
import { getDb } from './database'
import { validateSchema } from '../utils/validateSchema'
import { getDocumentsByUserIdSchema } from './schema'
import { middlewareHandler } from '../utils/middlewareHandler'


const app = express()
const port = 8002

middlewareHandler(app, port, 'Document')

app.post('/documents', async (req, res) => {
  const { userId } = req.body as GetDocumentsByUserId
  const db = await getDb()

  const errors = validateSchema(getDocumentsByUserIdSchema, req.body)

  if (errors) {
    res.status(400).send(errors)
    return
  }

  try {
    const result = await db.collection('Document').find({
      userId,
      deletedAt: null
    }).sort({ updatedAt: -1 }).toArray()
  
    res.send(result)
  } catch {
    res.sendStatus(500)
  }
})

app.post('/document/:documentId/delete', async (req, res) => {
  const { documentId } = req.params
  const db =  await getDb()

  try {
    const result = await db.collection('Document').findOneAndUpdate({
      _id: documentId
    }, {
      $set: { 
        deletedAt: new Date(),
        updatedAt: new Date()
      }
    })

    res.send(result)
  } catch {
    res.sendStatus(500)
  }
})
