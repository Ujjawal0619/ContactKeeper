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

Express Validator: passend as 2nd argument in router.post(), in form of array [check('name', 'error msg').isEmpty(), ...]
