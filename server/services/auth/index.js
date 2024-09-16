const CustomError = require("../../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("../../validator");
const userRepository = require("../../repositorys/userRepository");

const login = async ({ email, password }) => {
  try {
    const findUser = await userRepository.findUserByEmail(email);

    if (!findUser || findUser.email !== email)
      throw new CustomError(
        "The email or password you entered is incorrect. Please try again.",
        404,
        null,
      );

    const isCorrectPassword = bcrypt.compare(password, findUser.password);

    if (!isCorrectPassword)
      throw new CustomError(
        "The email or password you entered is incorrect. Please try again.",
        404,
        null,
      );

    const { password, ...others } = findUser;

    const token = jwt.sign(others, process.env.JWT_KEY);

    return {
      id: findUser.id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
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

    if (!error)
      throw new CustomError(
        "Please fill out all required fields with valid information.",
        422,
        error,
      );

    const findUser = await userRepository.findUserByEmail(email);

    if (!findUser)
      throw new CustomError("Account with this email already exists");

    const hashPassword = bcrypt.hashSync(password, 8);

    await userRepository.createNewUser({
      firstName,
      lastName,
      email,
      hashPassword,
    });
  } catch (err) {
    console.log(err);
    throw new CustomError(err.message, err.code, err.result);
  }
};

const verifyToken = async (token) => {
  try {
    const decodedUserData = await jwt.verify.verify(
      token,
      process.env.JWT_SECRET_KEY,
    );

    const findUser = await userRepository.findUserById(decodedUserData);

    if (!findUser)
      throw new CustomError(
        "Invalid or expired token. Please try again.",
        401,
        null,
      );

    return decodedUserData;
  } catch (err) {
    console.log(err);
    new CustomError(err.message, err.status, err?.result);
  }
};

module.exports = {
  login,
  register,
  verifyToken,
};
