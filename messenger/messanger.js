const Contact = require('../models/Contact');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '161559792699-3setpqhfv6j33lqdhl31li620p2skd3p.apps.googleusercontent.com';
const CLIENT_SECRET = 'TMNeJ9vIlIF0EHuwxaczA4uR';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04PvBiaHUh6gACgYIARAAGAQSNwF-L9IrykXt1Je3_7AoINydoHTw1MWWEdW0dPm_JLDINNjQnW2n5inI_JRHFzCSna4CDLqwBeM';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = async () => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ujjawal.kumar0619@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    //
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
          const mailOptions = {
            from: 'Birthday Reminder app <ujjawal.kumar0619@gmail.com>',
            to: person.email,
            subject: `Birth Day Reminder`,
            text: `Hi, ${person.name}. I am here to remind you ${user.name} Birthday is today.`,
            html: `
                  <h1 style = { background: #003699; color: #fff; }> Hi ${person.name} </h1> 
                  <div style = { background: #ccc; color: #333; }>     
                    Today's ${user.name} Birthday
                  </div>
                  `,
          };

          console.log(
            `sending mail from user: ${person.name} to:${person.email}`
          );

          const res = await transporter.sendMail(mailOptions);
          try {
            console.log('Email has been send', res);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
