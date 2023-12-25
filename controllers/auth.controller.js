const jwt = require('jsonwebtoken');
const { admin } = require('../config/firebase.config');
const ApiResponse = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/AsyncHandler');
const { ApiError } = require('../utils/ApiError');

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user with the given email already exists
        const userExists = await admin.auth().getUserByEmail(email)
            .then(() => true)
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    return false; // User does not exist
                }
                throw error; // Something went wrong
            });

        if (userExists) {
            return res.status(400).json(new ApiError(400, 'User with this email already exists'));
        }

        // Create a new user with email and password
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        const token = jwt.sign({ userId: userRecord.uid }, process.env.JWT_SECRET);

        const user = {
            userRecord,
            token,
        };

        res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user with the given email already exists
        const userExists = await admin.auth().getUserByEmail(email)
            .then(() => true)
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    return false; // User does not exist
                }
                throw error; // Something went wrong
            });

        if (!userExists) {
            return res.status(400).json(new ApiError(400, 'User with this email does not exists'));
        }

        const userRecord = await admin.auth().getUserByEmail(email)

        // Generate JWT token
        const token = jwt.sign({ userId: userRecord.uid }, process.env.JWT_SECRET);

        const user = {
            userRecord,
            token
            // Add any other user-related information you want to include in the response
        };

        res.status(200).json(new ApiResponse(200, user, 'User loggedIn successfully'));
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
})

module.exports = { registerUser, loginUser };
