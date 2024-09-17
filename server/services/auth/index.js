const CustomError = require("../../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("../../validator");
const userRepository = require("../../repositorys/userRepository");
const dotenv = require("dotenv");

const login = async ({ email, password }) => {
  try {
    const findUser = await userRepository.findUserByEmail(email);

    if (!findUser || findUser.email !== email)
      throw new CustomError(
        "The email or password you entered is incorrect. Please try again.",
        404,
        null,
      );

    const isCorrectPassword = bcrypt.compareSync(password, findUser.password);

    if (!isCorrectPassword)
      throw new CustomError(
        "The email or password you entered is incorrect. Please try again.",
        404,
        null,
      );

    const { firstName, lastName, id } = findUser;

    const token = jwt.sign(
      { id, email, firstName, lastName },
      process.env.JWT_SECRET_KEY,
    );

    return {
      id,
      firstName,
      lastName,
      email,
      token,
    };
  } catch (err) {
    throw err;
  }
};

const register = async ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const { error } = validator.UserRegisterSchema.validate({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (error)
      throw new CustomError(
        "Please fill out all required fields with valid information.",
        422,
        error,
      );

    const findUser = await userRepository.findUserByEmail(email);

    if (findUser)
      throw new CustomError("Account with this email already exists");

    const hashPassword = bcrypt.hashSync(password, 8);

    await userRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
  } catch (err) {
    console.log(err);
    throw new CustomError(err.message, err.code, err.result);
  }
};

const verifyToken = async (token) => {
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("decoded data", decodedUserData);

    const findUser = await userRepository.findUserById(decodedUserData.id);

    if (!findUser)
      throw new CustomError(
        "Invalid token or user not found. Please log in again.",
        401,
        null,
      );

    return decodedUserData;
  } catch (err) {
    console.log(err);
    throw new CustomError(
      "Invalid token or user not found. Please log in again.",
      err.status,
      err?.result,
    );
  }
};

module.exports = {
  login,
  register,
  verifyToken,
};
