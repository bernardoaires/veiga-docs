import { Schema, model, Document as DocumentType } from 'mongoose'

export interface DocumentData extends DocumentType {
  _id: string,
  data: Object
}

export const Document = new Schema({
  _id: String,
  data: Object
})

export default model<DocumentData>('Document', Document)