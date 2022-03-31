require("dotenv").config({ path: "./config.env" });
const { app } = require("./app");
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

sequelize
  .authenticate()
  .then(() => console.log("Database Authenticated"))
  .catch((err) => console.log(err));

initModels();

sequelize
  .sync()
  .then(() => console.log("Sync Succesfully"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server runing in PORT " + PORT);
});
