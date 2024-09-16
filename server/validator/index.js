const Joi = require("joi");

const UserRegisterSchema = Joi.object({
  firstName: Joi.string().min(5).required,
  lastName: Joi.string().min(5).required,
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required,
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required,
  confirmPassword: Joi.ref("password"),
});

const UserLoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required,
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required,
});

module.exports = {
  UserRegisterSchema,
  UserLoginSchema,
};
