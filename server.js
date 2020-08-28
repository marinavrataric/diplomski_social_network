const express = require ('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
app.use(express.json())

// MongoDB config
const db = config.get('mongoURI')
mongoose
    .connect(
        db,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.log('Fail to connect.', err))

// Routes
app.use('/api/users', require('./api/users'))
app.use('/api/auth', require('./api/auth'))
app.use('/api/posts', require('./api/posts'))
app.use('/api/image', require('./api/image'))

app.use('/uploads', express.static('uploads'))

const PORT = 5000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))