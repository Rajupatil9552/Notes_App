import express from 'express'
import dotenv from 'dotenv/config'
import noteRouter from './Routes/Router.js'
import mongoose from 'mongoose'
import connectDB from './db/connectDB.js'
import corsMiddleware from './middleware/cors.js'


const app = express()
const port = process.env.Port || 3000

connectDB();

app.use(corsMiddleware); 
app.use(express.json());

app.use('/note', noteRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})