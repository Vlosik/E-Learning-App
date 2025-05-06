const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader?.startsWith('Bearer ')){
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET , (err, user) => {
            if(err){
                return res.status(403).json({
                    message : "Invalid token or expired!"
                });
            }
            else{
                req.user = user;
                next();
            }
        });
    }
    else{
        return res.status(403).json({
            message : "Authorization token missing."
        });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                message : "Invalid role for this request."
            })
        }
        next();
    };
};

module.exports = {
    authenticateJWT,
    authorizeRoles
}