const db = require('../database/database');

const populate = async () => {
    await db.Users.create({
        username: 'panchonovoa',
        passwordHash: 'password123'
    })
    await db.Users.create({
        username: 'panchonovoa2',
        passwordHash: 'password123'
    })
    await db.Users.create({
        username: 'panchonovoa3',
        passwordHash: 'password123'
    })

    await db.sequelize.close()
}

populate()