const seedUsers = require('./seedUsers');
const seedPosts = require('./seedPosts');
const seedComments = require('./seedComments');

const sequelize = require('../config/connection');

const seedAll = async() => {
    //every time refresh database
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit(0);
};

seedAll();