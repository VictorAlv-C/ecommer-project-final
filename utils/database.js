const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "./config.env" });

const sequelize = new Sequelize({
  host: process.env.HOST_DB,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DB,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = { sequelize };
