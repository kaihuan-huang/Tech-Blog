const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "This email software can help small businesses stay productive",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Discover data intelligence solutions for big data processing and automation. Read more to explore your options. ",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "As big data has become increasingly prevalent in recent years, healthcare companies have been turning to data intelligence solutions to use this vast amount of information. ",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;