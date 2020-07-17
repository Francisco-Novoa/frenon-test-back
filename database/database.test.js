const db = require('./database');



describe("tests to check if db works as expected", () => {

    beforeAll(async () => {
        db.Users.destroy({ truncate: true })
        await db.sequelize.sync();
    })

    test('create user', async () => {
        const user = await db.Users.create({
            id:1,
            username: 'panchonovoa',
            passwordHash: 'password123'
        })
        expect(user.id).toEqual(1);
    })
    
    test('get user', async () => {
        const user = await db.Users.findByPk(1)
        expect(user.username).toEqual('panchonovoa')
        expect(user.passwordHash).toEqual("password123")
    })

    test('delete user', async () => {
        await db.Users.destroy({
            where: {
                id: 1
            }
        })
        const users = await db.Users.findByPk(1);
        expect(users).toBeNull();
    })
    afterAll(async () => {
        await db.sequelize.close();
    })
})






