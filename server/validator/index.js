const Joi = require("joi");

const UserRegisterSchema = Joi.object({
  firstName: Joi.string().min(5).required(),
  lastName: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.ref("password"),
});

const UserLoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required,
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required,
});

const CreateTaskScheama = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  content: Joi.string().min(8).max(100).required(),
  isImportant: Joi.bool().required(),
  isCompleted: Joi.bool().required(),
  userId: Joi.string().required(),
});

const UpdateTaskSchema = Joi.object({
  title: Joi.string().min(5).max(30),
  content: Joi.string().min(8).max(100),
  isImportant: Joi.bool(),
  isCompleted: Joi.bool(),
});

const UpdateUserSchema = Joi.object({
  firstName: Joi.string().min(5).max(5),
  firstName: Joi.string().min(5),
  lastName: Joi.string().min(5),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.ref("password"),
});

module.exports = {
  UserRegisterSchema,
  UserLoginSchema,
  CreateTaskScheama,
  UpdateTaskSchema,
  UpdateUserSchema,
};
