const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send(new ApiError(401, "Invalid Token"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).send(new ApiError(403, "Forbidden or Unauthorized"))
        }

        req.user = user
        next()
    })
}

module.exports = { authMiddleware }