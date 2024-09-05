const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];



    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }


    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, secret, (err, decoded) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = authenticate;
