const jwt = require("jsonwebtoken");
const {User} = require("../models/index.model");
const response = require("../utils/responses.util");

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return response.badRequestResponse(res, "No token provided");
        }
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                return response.unauthorizedResponse(res);
            }
            req.id = decoded.id;
            const user = await User.findById(req.id);
            req.role = user.role;
            // req.role = 'ADMIN';
            next();
        });
    } catch (err) {
        console.log(err);
        return response.serverErrorResponse(res);
    }
};    

module.exports = {
    verifyToken,
};
