const axios = require('axios')
const { asyncHandler } = require('../utils/AsyncHandler');
const { ApiError } = require('../utils/ApiError');
const { jsonApiPlaceHolderBaseUrl } = require('../constants');
const ApiResponse = require('../utils/ApiResponse');

const getUsersFromJsonApiPlaceHolder = asyncHandler(async (req, res) => {
    try {
        const apiResponse = await axios.get(`${jsonApiPlaceHolderBaseUrl}users`)

        const responseData = apiResponse.data

        return res.status(200).send(new ApiResponse(200, responseData, "Users fetched successfully"))
    } catch (error) {
        console.log('Error while fetching users from jsonApiPlaceHolder: ', error);
        return res.status(500).send(new ApiError(500, "Internal Server Error"))
    }
})

const getPostsFromJsonApiPlaceHolder = asyncHandler(async (req, res) => {
    try {
        const apiResponse = await axios.get(`${jsonApiPlaceHolderBaseUrl}posts`)

        const responseData = apiResponse.data

        return res.status(200).send(new ApiResponse(200, responseData, "Post fetched successfully"))
    } catch (error) {
        console.log('Error while fetching posts from jsonApiPlaceHolder: ', error);
        return res.status(500).send(new ApiError(500, "Internal Server Error"))
    }
})

const getCommentsFromJsonApiPlaceHolder = asyncHandler(async (req, res) => {
    const { postId } = req.query;

    try {
        const apiResponse = await axios.get(`${jsonApiPlaceHolderBaseUrl}posts/${postId}/comments`)

        const responseData = apiResponse.data

        return res.status(200).send(new ApiResponse(200, responseData, "Comments fetched successfully"))
    } catch (error) {
        console.log('Error while fetching posts from jsonApiPlaceHolder: ', error);
        return res.status(500).send(new ApiError(500, "Internal Server Error"))
    }
})

const getTodosFromJsonApiPlaceHolder = asyncHandler(async (req, res) => {
    const { postId } = req.query;

    try {
        const apiResponse = await axios.get(`${jsonApiPlaceHolderBaseUrl}todos`)

        const responseData = apiResponse.data

        return res.status(200).send(new ApiResponse(200, responseData, "Todos fetched successfully"))
    } catch (error) {
        console.log('Error while fetching posts from jsonApiPlaceHolder: ', error);
        return res.status(500).send(new ApiError(500, "Internal Server Error"))
    }
})

module.exports = { getUsersFromJsonApiPlaceHolder, getPostsFromJsonApiPlaceHolder, getCommentsFromJsonApiPlaceHolder, getTodosFromJsonApiPlaceHolder }