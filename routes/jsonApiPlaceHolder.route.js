const express = require('express')
const { getUsersFromJsonApiPlaceHolder, getPostsFromJsonApiPlaceHolder, getCommentsFromJsonApiPlaceHolder, getTodosFromJsonApiPlaceHolder } = require('../controllers/jsonApiPlaceHolder.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const jsonApiPlaceHolderRouter = express.Router()

jsonApiPlaceHolderRouter.get('/users', authMiddleware, getUsersFromJsonApiPlaceHolder)
jsonApiPlaceHolderRouter.get('/posts', authMiddleware, getPostsFromJsonApiPlaceHolder)
jsonApiPlaceHolderRouter.get('/posts/comments', authMiddleware, getCommentsFromJsonApiPlaceHolder)
jsonApiPlaceHolderRouter.get('/todos', authMiddleware, getTodosFromJsonApiPlaceHolder)

module.exports = { jsonApiPlaceHolderRouter }