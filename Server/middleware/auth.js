const jwt = require('jsonwebtoken');
const combinedMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }
    const extractedToken = token.split(' ')[1];
    try {
        let decodedToken;
        let source;
        try {
            decodedToken = jwt.verify(extractedToken, 'kjhgfghj');
            source = 'signup';
        } catch (signupErr) {
            decodedToken = jwt.verify(extractedToken, 'dfghjnhbgvf');
            source = 'login';
        }
        req.userId = decodedToken.userId;
        req.tokenSource = source;
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        res.status(401).json({ error: 'Invalid token' });
    }
};
module.exports = combinedMiddleware;

