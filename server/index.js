require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authCtrl'),
      ctrl = require('./controllers/mainCtrl'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      //add env port here
      port = SERVER_PORT;

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    //add secret here
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
})

//auth endpoints are the way the client-side can connect with the handler functions created in the authCtrl.js file.
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//house endpoints
app.post('/api/listing', ctrl.createListing);

app.listen(port, () => console.log(`Server is listening on ${port}`))