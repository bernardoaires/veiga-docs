import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { json } from 'body-parser'
import { validateJWT } from '../middlewares'

export const middlewareHandler = (app: Express, port: number, service: string) => {
  dotenv.config()
  app.use(cors())
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(json())
  app.use(validateJWT)

  app.listen(port, () => {
    console.log(`Listening on port ${port} - Service: ${service}`)
  })
}
