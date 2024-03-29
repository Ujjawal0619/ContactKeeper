const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const messanger = require('./messenger/messanger');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extemded: false }));

// Initial route for dev phase
// app.get('/', (req, res) =>
//   res.json({ msg: 'Welcom to the form filler API...' })
// );

// Define Routes to use routes files
app.use('/api/users', require('./routes/users')); // postman- POST http://localhost:5000/api/users (1 method)
//       ^end-point                ^route file                 ^depend on router
app.use('/api/auth', require('./routes/auth')); // postman- {POST} http://localhost:5000/api/auth (2 methods)
app.use('/api/contacts', require('./routes/contacts')); // postman- {POST} http://localhost:5000/api/users (4 methos)

// Serve static(react) assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  // SMS texting scheduler
  schedule.scheduleJob('0 0 * * *', () => {
    console.log(`scheduler runs @ ${new Date().toLocaleString()}`);
    messanger();
  });
});
