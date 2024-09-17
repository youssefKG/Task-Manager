const bcrypt = require("bcryptjs");
const CustomError = require("../../utils/customError");
const validator = require("../../validator/index");
const userRepository = require("../../repositorys/userRepository");

const updateUserProdil = async (
  userId,
  { firstName, lastName, oldPassword, newPassword, confirmNewPassword },
) => {
  try {
    const userData = {};
    const { error } = validator.UpdateUserSchema.validate({
      firstName,
      lastName,
      password,
      newPassword,
      confirmNewPassword,
    });

    if (error) throw new CustomError(error.message, 400, error.result);

    if (oldPassword) {
      const { password } = await userRepository.findUserById(userId);
      const isCorrectPassword = bcrypt.compareSync(password, oldPassword);

      if (!isCorrectPassword)
        throw new CustomError(
          "The old password is incorrect. Please try again.",
          400,
          null,
        );
    }

    const hashPassword = bcrypt.hashSync(newPassword);

    if (firstName) userData.firstName = firstName;
    if (lastName) userData.lastName = lastName;
    if (newPassword) userData.password = password;

    await userRepository.updateUserData(userId, userData);
  } catch (err) {
    throw new CustomError(err.message, err.status, err?.result);
  }
};

module.exports = { updateUserProdil };
