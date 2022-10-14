const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "This software can help small businesses stay productive! Great!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Can't wait to discover more!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "I really enjoy this Post!",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;