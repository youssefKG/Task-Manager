const db = require("../db/db");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const updateUserProfil = (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    oldPassword,
    newPassword,
    confirmPassword,
  } = req.body;
  if (oldPassword && newPassword && confirmPassword) {
    db.query(
      `SELECT * FROM users WHERE id = ${req.user.id}`,
      async (err, rows) => {
        if (err) return next(err);
        if (newPassword !== confirmPassword)
          return next(errorHandler(401, "Unmatched Password !!"));
        const isCorrectPassword = bcrypt.compareSync(
          oldPassword,
          rows[0].password,
        );
        if (isCorrectPassword) {
          const newHashPassword = bcrypt.hashSync(newPassword, salt);
          const queryThatUpdateThePassword = `UPDATE users SET password = ? where id = ?`;
          db.query(
            queryThatUpdateThePassword,
            [newHashPassword, req.user.id],
            (err, rows) => {
              if (err) return next(err);
            },
          );
        }
      },
    );
  }

  const queryUpdateOtherData =
    "UPDATE users SET email = ? , firstName  = ? , lastName = ? where id = ? ";
  db.query(
    queryUpdateOtherData,
    [email, firstName, lastName, req.user.id],
    (err, result) => {
      if (err) return next(err);
      const token = jwt.sign(
        { email, lastName, firstName, id: req.user.id },
        process.env.JWT_KEY,
      );
      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json({ email, firstName, lastName, id: req.user.id });
    },
  );
};

module.exports = {
  updateUserProfil,
};

