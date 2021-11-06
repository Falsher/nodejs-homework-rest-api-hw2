const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");
const recheck = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`missing required field email ${email}`);
  }
  if (!(user.verify, user.verifyToken)) {
    throw new BadRequest(`Verification has already been passed`);
  }
  const mail = {
    to: email,
    subject: "Подтверждение регистрации на сайте",
    html: `<a target="_blank" 
        href="http://localhost:8080/api/users/verify/${user.verifyToken}">Нажмите для подтверждения email</a>`,
  };
  sendEmail(mail);
};
module.exports = recheck;
