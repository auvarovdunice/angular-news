const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY);
};

module.exports = {
    createToken
};
