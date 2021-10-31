import express, { RequestHandler } from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import morgan from 'morgan'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { json } from 'body-parser'
import { Login, Register } from './types'
import { getDb } from './database'
import { v4 as uuidV4 } from 'uuid'
import { validateSchema } from '../utils/validateSchema'
import { loginSchema, registerSchema } from './schema'

const app = express()
const port = 8000
dotenv.config()

const validateJWT: RequestHandler = (req, res, next) => {  
  const token = req.headers.authorization
  if (!token) {
    next()
    return
  }

  try {
    jwt.verify(token, process.env.JWT_KEY!)
    next()
  } catch (err) {
    console.log('Error verifying token.')
    next()
  }
}

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(json())
app.use(validateJWT)

app.get('/me', async (req, res) => {
  const token = req.headers.authorization
  
  if (!token) {
    res.status(401).send('Token not found.')
    return
  }
  
  try {
    const verifiedAccount = jwt.verify(token, process.env.JWT_KEY!, { algorithms: ['HS256'] }) as jwt.JwtPayload
    console.log(verifiedAccount)
    const db = await getDb()
    const accountInfo = await db.collection('Account').findOne({
      _id: verifiedAccount.userId
    })
    res.send(accountInfo)
  } catch (err) {
    console.log(err)
    res.sendStatus(401)
    return
  }
})

app.post('/register', async (req, res) => {  
  const { username, password, email, name } = req.body as Register
  const db = await getDb()

  const errors = validateSchema(registerSchema, req.body)

  if (errors) {
    res.status(400).send(errors)
    return
  }

  const account = await db.collection('Account').findOne({
    $or: [
      { username },
      { email }
    ]
  })

  if (account) {
    res.status(409).send('Account already exists.')
    return
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(500).send('Error hashing password')
      return
    }
    const insertedAccount = await db.collection('Account').insertOne({
      _id: uuidV4(),
      name,
      email,
      username,
      password: hash,
      createdAt: new Date()
    })
    const newAccount = insertedAccount.ops[0]
    const token = jwt.sign({
      userId: newAccount._id
    }, process.env.JWT_KEY!)
    res.send({ token })
  })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body as Login
  const db = await getDb()

  const errors = validateSchema(loginSchema, req.body)

  if (errors) {
    res.status(400).send(errors)
    return
  }

  const authAccount = await db.collection('Account').findOne({ username })
  try {
    if (!await bcrypt.compare(password, authAccount.password)) {
      res.status(404).send('Failed login')
      return
    }
  } catch {
    res.sendStatus(500)
    return
  }
  if (!authAccount) {
    res.status(404).send('Account not found')
    return
  }
  const token = jwt.sign({
    userId: authAccount._id
  }, process.env.JWT_KEY!)
  res.send({ token })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
