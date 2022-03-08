const path = require('path'); // to work with paths handling all the different ways that different OS handle paths   /folder (MAC LInux) \folder (Windows)



function getMessages(req, res) {       // written this way while testing node can tell us which function is throwing error, debbuging benefit     
    res.render('messages', {
        title: 'Messages to my Friends',
        friend: 'Elon Musk',
    });
    //res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'));  // passing all the different components of the path, __dirname is a var in node glob to get the name of the folder where the current file is (controllers), '..' tells node that 'public' is one folder up
    //res.send('<ul><li>Hellooooo Einstein</li></ul>');
};

function postMessage(req, res) {
    console.log('Updating messages...');
};


module.exports = {
    getMessages,
    postMessage,
};