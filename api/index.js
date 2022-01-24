const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');

const MongoDbSession = require('connect-mongodb-session')(session);
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

/* Socekt.io Config*/ 
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

/* DB CONNECTION */

/* Sessions Mongo */
const store = new MongoDbSession({
    uri: process.env.MONGO_URI_USERS,
    collection: "mySessions",
});

/* URLs Domain */
var UrlDomain;

if(process.env.NODE_ENV === "development")
{
    UrlDomain = 'http://localhost:4200';
}
else if(process.env.NODE_ENV === "production")
{
    UrlDomain = 'https://blue-chat-app.herokuapp.com';
}

/* MONGODB MODELS */

const users = require('./routes/users');
const contacts = require('./routes/contacts');
const messages = require('./routes/messages');
const chats = require('./routes/chats');


/* ENABLING MIDDLEWARES */

app.use(function(req, res, next) // CORS MIDDLEWARE
{ 
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", UrlDomain); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT, OPTIONS');
    next();
});
 
    /* Middleware Parser */
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));

    /* Express session Middleware */

app.use(session({
    secret: 'Key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store
}));
  

/* STATIC ROUTE FOLDERS */

app.use(express.static('public')); // Set Static Folder

app.use('/images', express.static(path.join('images'))); // Set Images Path


/* APP ROUTES */
app.use('/api/users', users);
app.use('/api/contacts', contacts);
app.use('/api/messages', messages);
app.use('/api/chats', chats);  

/* Socket Event Handler */
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('save-message', (data) => {
        console.log(data);
        io.emit('new-message', { message: data });        
    });
});

/* APP CONFIGURATION */

server.listen(port, () => {
    console.log("Server listening on port: ", port);
});
  


