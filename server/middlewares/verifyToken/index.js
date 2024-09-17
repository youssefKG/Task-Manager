const authService = require("../../services/auth");

const verifyToken = async (req, res, next) => {
  try {
    const user = await authService.verifyToken(req.cookies.access_token);

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
