const authService = require("../../services/auth");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    await authService.register({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    res
      .status(201)
      .json("Account created successfully. You can now login now.");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { token, ...othersUserInfo } = await authService.login({
      email,
      password,
    }); // othersUserInfo = {firstName , lastName, email, id}

    res.cookie("access_token", token, { httpOnly: true }).status(201).json({
      message: "Login success.",
      result: othersUserInfo,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.status(200).clearCookie("access_token").json({
      message: "You logout successfully.",
      result: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout };
