const User = require("../../models/User");
const CustomError = require("../../utils/customError");

const createUser = async ({ firstName, lastName, email, password }) => {
  try {
    const newUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password,
      },
      { fields: ["firstName", "lastName", "email", "password"] },
    );
    return newUser;
  } catch (err) {
    throw new CustomError(err.message, err.status, err?.result);
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
    throw new CustomError(err.message, err.status, err?.result);
  }
};

const updateUserData = async (id, newUserData) => {
  try {
    await User.update(newUserData, { where: { id } });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  updateUserData,
  createUser,
  findUserByEmail,
  findUserById,
};
