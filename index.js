require('dotenv').config()

const express = require('express');
const runServer = require('./server');
const admin = require('./config/firebase.config')
const authRouter = require('./routes/auth.route');
const { jsonApiPlaceHolderRouter } = require('./routes/jsonApiPlaceHolder.route');
const app = express();

app.use(express.json())
app.use('/api/v0.1', authRouter)
app.use('/api/v0.1', jsonApiPlaceHolderRouter)



runServer(app)