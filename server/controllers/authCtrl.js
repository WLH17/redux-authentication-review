//When looking at this file, handler functions will be broken up into different chunks of code. These chunks of code will draw back to one of the questions found on the readme.

//bcryptjs is used for the hashing of passwords, which will help you with question 3 on the readme. Passwords are meant to be kept private, and hashing passwords allows us to keep them secure.
const bcrypt = require('bcryptjs');

module.exports = {
    //The register function has four sections of code to focus on:
    register: async(req, res) => {
        //1. Setup of what the function needs to work(what it's recieving from the client-side, and getting the db)
        const {email, password} = req.body;
        const db = req.app.get('db');

        //2. Ensuring users can't create duplicate accounts(question 4 on the readme). This is done by querying the database to see if the email the server recieved from req.body exists in the database. If it does, send a response to the client-side informing the user the email is already in use.
        let foundUser = await db.auth.check_users(email);
        if(foundUser[0]){
            return res.status(400).send('Email already in use')
        }

        //3. Hashing the users password and placing there information in your database(question 3 on the readme). This is done by creating a salt with bcrypts genSaltSync function. Pass into this function how large you want the salt to be. Then create the hash with bcrypts hashSync function, passing it the password from req.body, and the salt. Lastly, send the users email and the hash to the database to be added to the users table.
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.auth.register_user(email, hash);

        //4. Creating an active session for the user, and sending it to the client-side(question 5 on the readme).
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    //The login function also can be broken into 4 parts:
    login: async(req, res) => {
        //1. Setup of what the function needs to work(what it's recieving from the client-side, and getting the db)
        const {email, password} = req.body;
        const db = req.app.get('db');

        //2. Ensure the user exists in the database by querying the database with the email recieved from req.body. If the user is not in the database, send a response to the client-side informing the user they need to register.
        let foundUser = await db.auth.check_users(email);
        if(!foundUser[0]){
            return res.status(400).send("Email doesn't exist in database")
        }

        //3. If the user is in the database, make sure the password they have provided matches the hash in the database. This is done through bcrypts compareSync function. Provide it the password from req.body and the password from the database(on the foundUser object), and compareSync will return 'true' if they match and 'false' if not. If they don't match, send a response to the client-side informing the user the password is incorrect.
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(400).send('Password is incorrect')
        }

        //4. If the users password is correct, delete the password(it is not needed past this point, and should never go to the client-side). Create a user session and send that session to the client-side.
        delete foundUser[0].password;
        req.session.user = foundUser[0];
        // console.log(req.session.user);
        res.status(202).send(req.session.user);
    },
    //The logout function is the clean-up function. Specifically, it removes a users session, making it inactive. This is done through the 'destroy' method found on req.session. Simply send a status code to the client side to let the client-side know it was completed.
    logout: (req, res) => {
        req.session.destroy();
        // console.log(req.session);
        res.sendStatus(200);
    }
}