const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// CREATE > ASSOCIATIONS 'ONE TO MANY' 'USER FILE CREATES MANY USERS'
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// CREATE > ASSOCIATIONS ' ONE TO ONE' 'POST BELONGS TO ONE USER'
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// CREATE > ASSOCIATIONS 'MANY TO MANY' MANY PEOPLE CAN VOTE
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Vote.hasMany(Vote, {
    foreignKey: 'user_id'
});

Vote.hasMany(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };