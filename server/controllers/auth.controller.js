const db = require("../db/db");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler");

const singUp = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  db.query("select * from users where email = ? ", [email], (err1, result1) => {
    if (err1) return next(next(err1));
    if (result1.length)
      return next(
        errorHandler(
          409,
          `This email is already registered. If you forgot your password, you can reset it. For help.`,
        ),
      );
    var hashPassword = bcrypt.hashSync(password, salt);
    db.query(
      "INSERT INTO  users values (?)",
      [[, firstName, lastName, email, hashPassword]],
      (err2, result2) => {
        if (err2) return next(err2);
        return res.status(200).json("User Created");
      },
    );
  });
};

const signIn = (req, res, next) => {
  console.log(req.body);
  db.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    async (err, rows) => {
      try {
        if (err) return next(err);
        if (!rows.length)
          return next(errorHandler(401, "Email or password incorrect!"));
        const { password: pass, ...rest } = rows[0];
        const isCorrectPassword = bcrypt.compareSync(
          req.body.password,
          rows[0].password,
        );
        if (!isCorrectPassword)
          return next(errorHandler(401, "Email or password incorrect!"));
        const token = jwt.sign(rest, process.env.JWT_KEY);
        console.log(token);
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);
      } catch (error) {
        console.log(error);
      }
    },
  );
};

const signOut = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("aaccess_token")
      .json("user has been logged out ! ");
  } catch (err) {
    next(err);
  }
};
module.exports = { singUp, signIn, signOut };
