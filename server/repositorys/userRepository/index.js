const User = require("../../models/User");
const CustomError = require("../../utils/customError");

const createNewUser = async ({ firstName, lastName, email, password }) => {
  try {
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    return user;
  } catch (err) {
    throw new CustomError(err.message, err.status, err?.result);
  }
};

const findUserById = async (userID) => {
  try {
    const user = await User.findByPk(userID);

    return user;
  } catch (err) {
    console.log(err);
    throw new CustomError(err.message, err.status, err?.result);
  }
};

const updateUserData = async (newValue) => {
  try {
    await User.update(newValue);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updateUserData,
  createNewUser,
  findUserByEmail,
  findUserById,
};
