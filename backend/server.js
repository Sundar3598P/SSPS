import express from 'express';
import mongoose from 'mongoose';
// import products from './data/products.js'

import productRoutes from './routes/productRoutes.js'

import userRoutes from './routes/userRoutes.js'

// import orderRoutes from './routes/orderRoutes.js'

import dotenv from 'dotenv';

import connectDB from './config/db.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running..')
})

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
// app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.REACT_APP_PORT || 8280

app.listen(PORT, console.log(`Server is running in ${process.env.REACT_APP_NODE_ENV} mode on port ${process.env.REACT_APP_PORT}`))

