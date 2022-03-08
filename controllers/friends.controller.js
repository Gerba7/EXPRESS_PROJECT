const model = require('../modules/friends.module')

function postFriend(req, res) { //    <---- Route handler app.method('path', (req, res) => {})
    if (!req.body.name) {
        return res.status(400).json({   // putting return makes no other part of the code below getting executed otherwise there will be two responses and an error
            error: 'Missing friend name'
        });
    }; 

    const newFriend = {
        id: model.length,
        name: req.body.name     // req.body wont exist if we dont parse the JSON using middleware
    };
    model.push(newFriend);

    res.json(newFriend);
};

function getFriends(req, res) {      // (path, callback(last parameter) - route handler) method for request 
    res.json(model);  // data passed in treated as JSON
};

function getFriend(req, res) {      // express will parse whatever comes after the slash as the friend id
    const friendId = +req.params.friendId;  // id passed to the parameter, + (or Number()) to convert it to a number because the param comes as a string
    const friend = model[friendId]  // if id is not in friends, friend = undefined
    if (friend) {  // undefined = false value and friend obj = true
        res.status(200).json(friend);
    } else {
        res.status(404).json({
            error: 'Friend does not exist'
        });        // express doesnt throw 404 with a ex:/friends/34 because it matches the path so we have to set status
    };
};

module.exports = {
    postFriend,
    getFriend,
    getFriends,
}