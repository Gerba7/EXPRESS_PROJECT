// npm init -y   -   npm install express, express returns 404 by default if nothing is found

const express = require('express');

const path = require('path');

const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');  

const app = express();

app.set('view engine', 'hbs');  // to set the template engine
app.set('views', path.join(__dirname, 'views'));  // to find templates in views folder


const PORT = 3000;


app.use((req, res, next) => {
    const start = Date.now();
    next(); // to continue the middleware, express finds the matching route handler, the req goes to the app.get('friends/:friendId) and returns here
    const delta = Date.now() - start; // here finishes the middleware, time right before res is send
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`); // baseUrl because the log only brings the '/' of the route
});


app.use('/site', express.static(path.join(__dirname, 'public')));  // to use Node to serve a website, param: string containing the RELATIVE(to the folder from which you launch your node app) path of folder we want to make available from our server
app.use(express.json()); // returns a piece of middleware that looks at the content-type and sets de req.body to a js obj when content type app/json


app.get('/', (req, res) => {
    res.render('handlebars.hbs', {   // to tell express we are renderin hbs file, second param: object with all the variables of the template
        title: 'My Friends Are Very CLever',
        caption: 'Let\'s go skiing!',
    }); 
});
app.use('/friends', friendsRouter);   // Mounting friends router on the app, to get all methods unified in one path
app.use('/messages', messagesRouter);


/*
app.post('/friends', friendsController.postFriend);
app.get('/friends', friendsController.getFriends); 
app.get('/friends/:friendId', friendsController.getFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);
*/

app.listen(PORT, () => {    // PORT and callback that run when server starts
    console.log(`Listening on ${PORT}...`);
});



// nodemon to restart server any time a js file is changed
// DevDependencies packages only to develop
// scripts   --->  "watch": "nodemon server.js"  ---> npm run watch

/*
app.use(function(req, res, next) => {              (register middleware with express) (function is middleware to handle req an res)
    next                                     let us work with the req, use data and take some action before it reaches the root handlers (log, validation, etc)
})                                             next --> to call next middleware (nested till downstream(endpoint and takes a app.method to make the response))
*/


/*
MVC (Model View Controller) USER uses CONTROLLER(fn that react to req) that manipulates MODEL(data) that update VIEW which USER sees
*/

/*

REST (Representational State (how your server makes your data available) Tranfer (how its sent back to client))

Use existing standards (HTTP, JSON, URL)

end points - plural nouns , represent collections of data sored in server side

GET PUT DELETE POST

Req STATELESS(each req is separate and not connected to any state of client, independent from the state of the
    front end) AND CACHEABLES (saving results for future use to increase performance)

*/

/*

CRUD (CREATE-POST READ-GET UPDATE-PUT DELETE-DELETE)

*/