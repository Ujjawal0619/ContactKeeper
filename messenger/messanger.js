const Contact = require('../models/Contact');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 25,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'ujjawal.kumar0619@gmail.com',
    pass: 'Ullash@72525',
  },
});

const mailOptions = {
  from: 'ujjawal.kumar0619@gmail.com',
  to: null,
  subject: 'Birth Day Reminder',
  text: null,
};

module.exports = async () => {
  try {
    const userFound = await Contact.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$dob' }, { $dayOfMonth: new Date() }] },
          { $eq: [{ $month: '$dob' }, { $month: new Date() }] },
        ],
      },
    });
    // console.log(userFound[0].user);
    userFound.map(async (user, index) => {
      try {
        let person = await User.findById(user.user);
        if (person) {
          // Start sending mail to person
          mailOptions.text = `Today's ${user.name} Birthday.`;
          mailOptions.to = person.email;
          console.log(`user: ${person.name} to:${person.email}`);
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log('email has been sent', info.response);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
