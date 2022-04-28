const User = require('./User');
const Post = require('./Post');

// CREATE > ASSOCIATIONS 'ONE TO MANY' 'USER FILE CREATES MANY USERS'
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// CREATE > ASSOCIATIONS ' ONE TO ONE' 'POST BELONGS TO ONE USER'
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };