const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookie_parser = require("cookie-parser");
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");
const { dbConnection } = require("./db");

const port = process.env.PORT;
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cookie_parser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

// app.use(express.static(path.json(___dirname, '/client/build')))

dbConnection();

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "server error ";
  res.status(status).json({
    message: message,
    status: status,
    success: false,
  });
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "client", 'build', "index.htm"))
// })

app.listen(1900, () => {
  console.log("server running on the port ", port);
});
