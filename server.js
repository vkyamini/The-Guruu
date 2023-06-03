// EXPRESS 
const express = require('express')
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
const uri = process.env.MONGODB_URI;

// MONGOOSE 
const mongoose = require('mongoose')

mongoose.connect( uri || 'mongodb://localhost/Guruu_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>
console.log('Connected to MongoDB Endpoint')
);

mongoose.connection.on('error', (err) =>
console.log(`MONGOOSE DISCONNECTED ERROR: ${err}`)
);

mongoose.set('debug', true)

// FILES
app.use(require('./routes'));


// Server Listen 
app.listen(PORT, () => {
console.log((`Connected on localhost:${PORT}`))
})