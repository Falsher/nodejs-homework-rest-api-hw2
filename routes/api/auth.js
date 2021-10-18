const express = require("express");

const { joiUserSchema } = require("../../models");
const { controllerWrapper, validation } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signup)
);

router.post("/login", validation(joiUserSchema), controllerWrapper(ctrl.login));

router.get("/logout", controllerWrapper(ctrl.logout));

module.exports = router;
