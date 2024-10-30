const cors = require('cors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const allowedOrigins = [
    "http://localhost:3000"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200, 
};

  

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = {
            email: decoded.email,
            role: decoded.role
        };
        next();
    });
};

module.exports = {
    corsOptions,
    verifyUser
};