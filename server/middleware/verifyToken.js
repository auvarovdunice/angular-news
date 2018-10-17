const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
            if (err) {
                next(err);
            }
            req.body.authData = authData;
            next();
        });
    } else {
        res.status(403).send('Unauthorised');
    }
};

module.exports = verifyToken;