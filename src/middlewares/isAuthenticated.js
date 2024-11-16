import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Token not provided or invalid',
                success: false,
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token',
                    success: false,
                });
            }

            // Attach user ID and role to the request object
            req.id = decoded.userId;
            req.role = decoded.role;  // Extract role from the token
            
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            success: false,
        });
    }
};

export default isAuthenticated;
