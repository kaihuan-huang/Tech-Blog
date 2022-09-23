const { User } = require('../models');

const userData = [{
        name: 'Kaihuan',
        email:'kaihuan@gmail.com',
        password: 'p111'

    },
    {
        name: 'Justin',
        email:'justin@gmail.com',
        password: 'p222'
    },
    {
        name: 'Ryan',
        email:'ryan@gmail.com',
        password: 'p333'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks:true});

module.exports = seedUsers;