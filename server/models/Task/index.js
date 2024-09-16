const { DataTypes } = require("sequelize");
const { DB } = require("../../db/db");
const User = require("../User");

const Task = DB.define(
  "tasks",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: NULL,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isImportant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { timestamps: true },
);

Task.sync({ force: true });

module.exports = Task;
