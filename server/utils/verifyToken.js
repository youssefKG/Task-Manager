const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const db = require("../db/db")
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(errorHandler(401, "Unauthorized"));
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return next(errorHandler(401, 'Unauthorized'));
        const query = "SELECT * FROM users WHERE id= ? ";
        db.query(query, [user.id], (err, rows) => {
            if (err) return next(err);
            if (!rows.length) return next(errorHandler(401, "Unauthorized"));
        })
        req.user = user;
        return next()
    })
}

module.exports = verifyToken