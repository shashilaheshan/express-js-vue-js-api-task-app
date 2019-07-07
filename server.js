require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const api = require("./router/api");

app.use(express.json());
app.use(cors());

app.use("/api/" + process.env.API_VERSION, api);

app.listen(process.env.PORT, () => {
  console.log("status", "Server Connected");
});
