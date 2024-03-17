const jwt = require('jsonwebtoken');
const secretKey = 'KALPANA'; 
// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['authorization'];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = {verifyToken};

