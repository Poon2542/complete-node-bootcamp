const express = require('express');

const usersRouter = express.Router();
const usersController = require('./../controller/userController')



usersRouter
    .route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUsers)

usersRouter
    .route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = usersRouter;