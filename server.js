const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const messanger = require('./messenger/messanger');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extemded: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcom to the form filler API...' })
);

// Define Routes to use routes files
app.use('/api/users', require('./routes/users')); // postman- POST http://localhost:5000/api/users (1 method)
//       ^end-point                ^route file                 ^depend on router
app.use('/api/auth', require('./routes/auth')); // postman- {POST} http://localhost:5000/api/auth (2 methods)
app.use('/api/contacts', require('./routes/contacts')); // postman- {POST} http://localhost:5000/api/users (4 methos)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  // SMS texting scheduler
  schedule.scheduleJob('* */30 * * * *', () => {
    messanger();
  });
});
