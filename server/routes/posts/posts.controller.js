const Users = require('../../models').User;
const Personal = require('../../models').Personal;
const Post = require('../../models').Post;
const sequelize = require('../../models').sequelize;
const Op = require('sequelize').Op;
const postsHelper = require('./posts.helpers');

const getAllPosts = (req, res, next) => {
    sequelize.query(postsHelper.getPostsQuery, {type: sequelize.QueryTypes.SELECT})
        .then(posts => {
            res.status(201).send(posts);
        })
        .catch(err => next(err));
};
const createPost = (req, res, next) => {
    const newPost = req.body;
    return Post.create({...newPost, owner: req.params.id}, {})
        .then(post => {
            sequelize.query(postsHelper.getPostByIdQuery(post.dataValues.id), {type: sequelize.QueryTypes.SELECT})
                .then(posts => {
                    res.status(201).send(posts[0]);
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
};

const deletePost = (req, res, next) => {

    return Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((user) => {
            user.destroy();
            res.status(201).send({status: 'success'})
        })
        .catch(err => next(err));
};

module.exports = {
    getAllPosts,
    createPost,
    deletePost
};
