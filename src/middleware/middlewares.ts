const jwt = require('jsonwebtoken');

export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
        const decoded = jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication failed',
                    status_code: 401
                });
            }
            req.userData = decoded;
            next();
        });
    } catch (error) {
        next(error);
    }
};

