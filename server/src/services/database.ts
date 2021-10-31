import { MongoClient } from 'mongodb'
import { Schema, model, Document as DocumentType } from 'mongoose'

export const getDb = async () => {
  const url = 'mongodb://localhost/veiga-docs'
  const client = new MongoClient(url, { useUnifiedTopology: true })
  if (!client.isConnected()) {
    await client.connect()
  }
  const db = client.db()

  return db
}

export interface DocumentData extends DocumentType {
  _id: string,
  userId: string,
  data: Object
}

export const Document = new Schema({
  _id: String,
  userId: String,
  data: Object
})

export const documentModel = model<DocumentData>('Document', Document, 'Document')