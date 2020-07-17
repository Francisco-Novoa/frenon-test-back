const db = require('../database/database');

const populate = async () => {
    const user1 = await db.Users.create({
        username: 'panchonovoa',
        passwordHash: 'password123'
    })
    const user2 = await db.Users.create({
        username: 'panchonovoa2',
        passwordHash: 'password123'
    })
    const user3 = await db.Users.create({
        username: 'panchonovoa3',
        passwordHash: 'password123'
    })

    await db.sequelize.close()
}

populate()