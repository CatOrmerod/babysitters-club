const db = require('./connection');
const { Babysitter, User } = require('../models');

db.once('open', async () => {
    await Babysitter.deleteMany();

    const babysitter = await Babysitter.insertMany([
        {
            babysitterAuthor: 'Cat',
            babysitterFirst: 'Cat',
            babysitterLast: 'Ormerod',
            babysitterEmail: 'cat@test.com',
            babysitterAbout: 'Mum of 3 year old',
            babysitterLoc: 'Green Point, 2251',
            babysitterCert: 'WWCC, First Aid',
            babysitterPic: 'https://tbc',
            babysitterPh: '0424976625'
        },
        {
            babysitterAuthor: 'Kate',
            babysitterFirst: 'Kate',
            babysitterLast: 'Derbynew',
            babysitterEmail: 'kate@test.com',
            babysitterAbout: 'Fun Dad who loves to play footy',
            babysitterLoc: 'Green Point, 2251',
            babysitterCert: 'Police Check',
            babysitterPic: 'https://tbc',
            babysitterPh: '0452077227'
        },
        {
            babysitterAuthor: 'Bethan',
            babysitterFirst: 'Bethan',
            babysitterLast: 'Minor',
            babysitterEmail: 'bethan@test.com',
            babysitterAbout: 'School Student with 3 younger brothers',
            babysitterLoc: 'Avoca, 2251',
            babysitterCert: 'None',
            babysitterPic: 'https://tbc',
            babysitterPh: '555-1234'
        },
       
    ]);

    console.log('babysitters seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@babysitters-club.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Cat',
        lastName: 'Ormerod',
        email: 'cat@test.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Kate',
        lastName: 'Derbynew',
        email: 'kate@test.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Bethan',
        lastName: 'Minor',
        email: 'bethan@test.com',
        password: 'password1234',
    });

    console.log('users seeded')

    process.exit();
});