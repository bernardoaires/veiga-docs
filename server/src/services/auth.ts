import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Login, Register } from './types'
import { getDb } from './database'
import { v4 as uuidV4 } from 'uuid'
import { validateSchema } from '../utils/validateSchema'
import { loginSchema, registerSchema } from './schema'
import { middlewareHandler } from '../utils/middlewareHandler'

const app = express()
const port = 8000

middlewareHandler(app, port, 'Auth')

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

  if (!authAccount) {
    res.status(404).send('Account not found')
    return
  }

  try {
    if (!await bcrypt.compare(password, authAccount.password)) {
      res.status(404).send('Failed login')
      return
    }
  } catch {
    res.sendStatus(500)
    return
  }

  const token = jwt.sign({
    userId: authAccount._id
  }, process.env.JWT_KEY!)
  res.send({ token })
})
