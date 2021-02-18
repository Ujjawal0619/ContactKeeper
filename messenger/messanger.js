const Contact = require('../models/Contact');

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
    // console.log(userFound);
    userFound.map((user, index) => {
      console.log(index, user.user);
    });
  } catch (err) {
    console.log(err);
  }
};
