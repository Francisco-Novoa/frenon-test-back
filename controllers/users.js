"use strict"

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")
const { info, error } = require("../utils/logger")
const usersRouter = require("express").Router()
const db = require("../database/database")

usersRouter.get("/", (request, response) => {
    db.Users.findAll({
        attributes: ["id", 'username', "createdAt"]
    })
        .then((users) => {
            return response.json(JSON.stringify(users))
        })
        .catch(err => {
            response.status(500).send({ error: err });
        })
})

usersRouter.get("/:id", (request, response) => {
    db.Users.findByPk(request.params.id, { attributes: ["id", 'username', "createdAt"] })
        .then(users => {
            return response.json(JSON.stringify(users))
        })
        .catch((err) => {
            return response.status(500).send({ error: err })
        })

})

usersRouter.post("/", async (request, response) => {
    //check if there is password and username
    const { password, username } = request.body
    if (!password && !username) return response.status(400).send({
        error: "password or username missing"
    })

    //validate length, other validations can be added
    if (password.length < 8) return response.status(400).send({
        error: "password length must be of least 8 characters"
    })
    if (username.length < 8) return response.status(400).send({
        error: "username length must be of least 8 characters"
    })

    //password hashing and salting
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    //user saving
    db.Users.create({ username, passwordHash })
        .then(async (user) => {
            const preToken = {
                username: user.username,
                id: user._id,
            }
            const token = await jwt.sign(preToken, config.SECRET)
            info(`user "${user.username}" saved to database`)
            response.status(201).send({ token, username: user.username })
        })
        .catch(err => {
            error(`error saving to database ${err}`)
            response.status(500).send({ error: err })
        })
})

usersRouter.put("/:id", async (request, response) => {
    //check if there is password and username
    const { password, username } = request.body
    const id = request.params.id
    if (!password && !username) return response.status(400).send({
        error: "password or username missing"
    })

    //validate length, other validations can be added
    if (password.length < 8) return response.status(400).send({
        error: "password length must be of least 8 characters"
    })
    if (username.length < 8) return response.status(400).send({
        error: "username length must be of least 8 characters"
    })

    //password hashing and salting
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    //searchs if the user is in the bd
    db.Users.findByPk(id)
        .then(user => {
            //updates it
            user.update({
                passwordHash, username
            },
                {
                    returning: true,
                    plain: true
                })
                //returns onlny safe fields
                .then(user => {
                    const { id, username, createdAt, updatedAt } = user.dataValues
                    return response.json({ id, username, createdAt, updatedAt })
                })
        })
        .catch((err) => {
            return response.status(500).send({ error: err })
        })
})

usersRouter.delete("/:id", async (request, response) => {
    //finds and deletes user
    db.Users.destroy({
        where: {
            id: request.params.id
        }
    })
        .then(() => {
            response.status(204).end()
        })
        .catch(err => {
            response.status(500).send({ error: err })
        })
})




module.exports = usersRouter
