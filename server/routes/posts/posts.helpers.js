const getPostsQuery = `SELECT "Posts".id, "Posts".title, "Posts".message, "Posts"."createdAt", "Users".username,"Personals".avatar, "Users".email from "Posts"
INNER JOIN "Users" ON "Users".id = "Posts".owner
INNER JOIN "Personals" ON "Users".id = "Personals".owner
Order by "Posts"."createdAt" DESC;`;


const getPostByIdQuery = (id) => `SELECT "Posts".id, "Posts".title, "Posts".message, "Posts"."createdAt", "Users".username,"Personals".avatar, "Users".email from "Posts"
INNER JOIN "Users" ON "Users".id = "Posts".owner
INNER JOIN "Personals" ON "Users".id = "Personals".owner
where "Posts".id = ${id}
Order by "Posts"."createdAt" DESC;`;

module.exports = {
    getPostsQuery,
    getPostByIdQuery
};
