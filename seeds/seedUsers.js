const { User } = require('../models');

const userData = [
    {
        username: 'Kaihuan',
        useremail:'kaihuan@gmail.com',
        password: 'p111'

    },
    {
        username: 'Justin',
        useremail:'justin@gmail.com',
        password: 'p222'
    },
    {
        username: 'Ryan',
        useremail:'ryan@gmail.com',
        password: 'p333'
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;