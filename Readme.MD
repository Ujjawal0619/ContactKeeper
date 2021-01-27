commands:

npm init -y

    --> initialize package.json, "scripts" & "main" keys value changed to (under "scripts" we have "start": "node server.js", "server":"nodemon server.js") and ("main": "server.js") etc, you can add discription also.

npm i express bcryptjs jsonwebtoken config express-validator mongoos

    --> install requred packages as regualr dependencies.
    express : api and routing
    bcryptjs : use to hash the plain text password
    jsonwebtoken : to send back & forth tokens to acces protective routes
    config : package proved acces to global variables stored in root/config/default.json
    express-validator : validate the inputs.
    mongoos : abstraction layer allows us read and write data to db and it also allow us to create modals

npm i -D nodemon concurrently

    --> these packages are install as dev dependencies as it will no used in production, i only needed for deveploment.
    nodemon : it automatically run surver each time you save any file.
                insted of npm start or npm run server we can add scripts into package.json ("server": "nodemon server.js") as mention in "main" value.
    concurrently : used to run server and frondend UI at same time.

## Express Validator: passend as 2nd argument in router.post(), in form of array [check('name', 'error msg').isEmpty(), ...]

## JWT (jsonwebtoken): it create a token for client that will help to authorise the user

const jwt = require('jsonwebtoken');

const payload = { user: {id: user.id} }
jwt.sign(
payload,
config.get('jwtSecret'),
{expiresIn: 3600},
(err, token) => {
if (err) throw err;
res.json({ token });
}
);

goto jwt.io, past a token, in payload w'll get user-id, in-time and expire-time.

Middleware : app.use((req, res, next) => {..... next();}) // basically used to check tokens when ever a user login.
----------- next() moves the control to run further middleware if any, order of middleware matters here.

------------------------------ CLIENT SIDE -----------------------------

commands: npx create-react-app client
script in package of root of project will be:
"scripts": {
"server": "nodemon server.js",
"start": "node server.js",
"client": "npm start --prefix client", --> --prefix goto inside client directory and run client side
"clientinstall": "npm install --prefix client",
"dev": "concurrently \"npm run server\" \"npm run client\"" --> run server and client at a time
}

NOW: concurrently will run both server at Port: 5000 and client at Port: 3000
NOTE: During development inside client package.json we need to add "proxy": "http://localhost:5000" so that we do not need to make manual request from client side.
PACKAGES:
npm i axios react-router-dom uuid react-transition-group
