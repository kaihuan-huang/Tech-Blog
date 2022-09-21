const { Post } = require('../models');

const postData = [
    {
        title:"Review this list of the best data intelligence software",
        content:"Data intelligence solutions are becoming increasingly important as businesses.",
        user_id: 1
    },
    {
        title:"Megaport Virtual Edge vs Equinix Network Edge: Compare top edge computing platforms",
        content:"As enterprises strive to scale network capacities to meet the evolving technological demands of digital transformation.",
        user_id:2
    },
    {
        title:"How to add Gmail as a search engine in Chrome-based browsers",
        content:"Open a new tab and type “gmail” in the address bar followed by a space. Type the search query you want to run in Gmail and hit Enter on your keyboard.",
        user_id:2
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;