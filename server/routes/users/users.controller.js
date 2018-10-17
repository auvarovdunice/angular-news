const Users = require('../../models').User;
const Personal = require('../../models').Personal;
const Posts = require('../../models').Post;
const Op = require('sequelize').Op;
const userHelpers = require('./users.helpers');

const fs = require('fs');

const getAllUsers = (req, res, next) => {
    return Users.findAll({
        include: [
        {
            model: Personal,
            as: 'personal',
        },
        {
            model: Posts,
            as: 'posts',
        },
        ],
    })
        .then(data => {
            console.log(data);
            res.status(200).send({data})
        })
        .catch(err => next(err));
};

const getToken = (req, res, next) => {
    const {username, password} = req.body;
    return Users.findOne({
        where: {
            [Op.or]: [{username}, {email: username}]
        }
    })
        .then(data => {
            if (!data) {
                next({message: 'User not found'})
            } else if (data.password !== password) {
                next({message: 'Incorrect password'})
            } else {
                const token = userHelpers.createToken(data.dataValues);
                const {id, username, email} = data.dataValues;
                res.status(200).send({id, username, email, token});
            }
        })
        .catch(err => next(err));
};

const createUser = (req, res, next) => {
    const newUser = req.body;
    return Users.create({...newUser, personal: {}}, {
        include: [{
            model: Personal,
            as: 'personal',
        }]
    })
        .then(data => {
            console.log("created user", data.dataValues);
            const token = userHelpers.createToken(data.dataValues);
            const {id, username, email, personal} = data.dataValues;
            res.status(201).send({token, id, username, email, personal});
        })
        .catch(err => next(err));
};

const updateUser = (req, res, next) => {
    const updatedUser = req.body;
    res.send({data: req.body.authData});
    Users.find({
        where: {
            email: req.body.authData,
        }
    }).then(user => {
        const newUser = user.update(updatedUser);
        res.send({newUser});
    })
};

const retrieveUser = (req, res) => {
    Users.findById(req.params.id, {
        include: [{
            model: Personal,
            as: 'personal',
        }],
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found',
                });
            }
            if (user.dataValues.username !== req.body.authData.username) {
                return res.status(404).send({
                    message: 'It\'s not your profile!',
                });
            }
            return res.status(200).send(user);
        })
        .catch(error => res.status(400).send(error));
};


const uploadAvatar = (req, res) => {
    const {path} = req.file;

    Personal.update({
            avatar: path
        },
        {
            returning: true,
            where: {owner: req.params.id}
        })
        .then((data) => res.status(200).send(data[1][0]));
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getToken,
    uploadAvatar,
    retrieveUser,
};
