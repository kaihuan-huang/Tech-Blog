const { Post } = require('../models');

const postData = [
    {
        title:"Review this list of the best data intelligence software",
        body:"Data intelligence solutions are becoming increasingly important as businesses strive to make the most of their data. Big data is only getting bigger, and it can be challenging to process and make sense of all that information without the help of specialized software. That’s where data intelligence solutions come in. They automate the process of big data processing and analysis, making it easier for businesses to get a clear picture of what’s going on within their data sets. Data intelligence tools also go by various other names, such as big data analytics, business intelligence, and data analysis software.",
        user_id: 1,
        like: 0
    },
    {
        title:"Megaport Virtual Edge vs Equinix Network Edge: Compare top edge computing platforms",
        body:"As enterprises strive to scale network capacities to meet the evolving technological demands of digital transformation, edge computing platforms are looking for ways to help provide solutions that will enhance network performance by simplifying the networks, increasing resilience and enabling seamless deployment of network infrastructure at the edge.",
        user_id: 2,
        like: 0
    },
    {
        title:"How to add Gmail as a search engine in Chrome-based browsers",
        body:"Open a new tab and type “gmail” in the address bar followed by a space. Type the search query you want to run in Gmail and hit Enter on your keyboard.",
        user_id: 3,
        like: 0,
    },
    {
        title:"5G",
        body:"5G is the next generation of mobile technology–the fifth generation wireless network standards will succeed 4G, LTE, and 3G networks. 5G technology will impact remote workers, smart cities, IoT devices, and digital transformation initiatives, and many other areas of tech. Don’t miss TechRepublic’s coverage of when 5G rollouts are happening, the fastest 5G deployment speed by country, the industries at the forefront of 5G adoption, why 5G is considered a game changer for public safety and transportation, and more.",
        user_id: 3,
        like: 0
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;