const express = require('express');

const friendsController = require('../controllers/friends.controller');

const friendsRouter = express.Router();  // To create a new router for larger apps to make it more modular


friendsRouter.use((req, res, next) => {
    console.log('ip adress:', req.ip);    // we can use middleware in the router to work the req before like showing req ip
    next();
});
friendsRouter.post('/', friendsController.postFriend);  // we use router as any middleware, first param relative to where the route was mounted '/friends' so '/'
friendsRouter.get('/', friendsController.getFriends); 
friendsRouter.get('/:friendId', friendsController.getFriend);

module.exports = friendsRouter;