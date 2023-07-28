const connection = require('../config/connection');
const { User, Thought } = require('../models');


console.time('seeding');

// const users = [
//     {
//         username: 'lernantino',
//         email: 'lernantino@fakelernantino.com'
//     },
//     {
//         username: 'amiko',
//         email: 'amiko@fakeamiko.com'
//     },
//     {
//         username: 'skaterboi',
//         email: 'skaterboi@fakeskaterboi.com'
//     },
//     {
//         username: 'dylan2',
//         email: 'dylan2@fakedylan2.com'
//     },
// ];



connection.once('open', async () => {
    console.log('connected to database');
    connection.on('error', (error) => {
        console.error(`Database error: ${error.message}`);
        process.exit(1);
    });
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length !== 0) {
        await connection.db.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length !== 0) {
        await connection.db.dropCollection('thoughts');
    }

    const users = [
        {
            username: 'lernantino',
            email: 'lernantino@fakelernantino.com'
        },
        {
            username: 'amiko',
            email: 'amiko@fakeamiko.com'
        },
        {
            username: 'skaterboi',
            email: 'skaterboi@fakeskaterboi.com'
        },
        {
            username: 'dylan2',
            email: 'dylan2@fakedylan2.com'
        },
    ];

    const thoughts = [
        {
            thoughtText: 'This app is dope!',
            username: 'lernantino',
            reactions: '👍',
        },
        {
            thoughtText: 'I love my dog!',
            username: 'amiko',
            reactions: '😍',
        },
        {
            thoughtText: 'Sk8rB0i 4 life!',
            username: 'skaterboi',
            reactions: '😆',
        },
        {
            thoughtText: '@skaterboi is dumb',
            username: 'dylan2',
            reactions: '😡',
        },
    ]

    // const {users} = 
    // const users = [];
    // const thoughts  = [];
    console.log('collections dropped');

    // const newUser
    // users.push({ username, email });



    await User.insertMany(users);

    await Thought.insertMany(thoughts);


    console.log('collections seeded');
    console.table(User);
    console.table(Thought, ['thought', 'username', 'reaction']);
    console.timeEnd('seeding');
    process.exit(0);
});