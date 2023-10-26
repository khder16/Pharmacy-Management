const jwt = require('jsonwebtoken')
const Admin = require('../model/admin');
const config = process.env

const verifyToken = async (req, res, next) => {
    try {

        const token = req.cookies.token || req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded; // Set the decoded token in the request object
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }

    next();
};

const authRole = (role) => {
    return (req, res, next) => {
        if (role === 'admin') {
            next();
        } else {
            res.status(403).send('Admins only');
        }
    };
}

module.exports = verifyToken 