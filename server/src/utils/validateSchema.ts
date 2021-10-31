import * as R from 'ramda'
import { Schema } from 'joi'

export const validateSchema = (schema: Schema, validationTarget: object) => {
  const { error } = schema.validate(validationTarget, { abortEarly: false, convert: false })

  if (!error || !error.details) {
    return undefined
  }

  const errorsArray = error.details.map(({ message, path }) => ({ [path.join('.')]: message }))
  const errors = R.mergeAll(errorsArray)

  return errors
}
