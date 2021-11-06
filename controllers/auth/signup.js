const gravatar = require("gravatar");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");
const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already signup");
  }

  const verifyToken = v4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword, avatarURL, verifyToken });

  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blank" 
        href="http://localhost:8080/api/users/verify/${verifyToken}">Нажмите для подтверждения email</a>`,
  };
  sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "signup success",
  });
};

module.exports = signup;
