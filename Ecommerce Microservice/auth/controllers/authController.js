const User = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.register = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.hash(password, 10, function (err, hash) {
      const newUser = new User({
        name,
        email,
        password: hash
      });
      newUser.save().then((user) => {
        res.status(200).json({ message: "User created successfully" });
      });
    });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    console.log(user);
    bcrypt.compare(password, user.password, function (err, result) {
      if (result == true) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email
        };
        jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
          res.status(200).json({ token });
        });
      }
    });
  });
};
