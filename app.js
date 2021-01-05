const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./auth");
const cost = require("./cost");
const linebot = require("./linebot");
const getLineCus = require("./getLineCus");
const counter = require("./counter");
const update = require("./updateCounter");
const inventoryManage = require("./inventoryManage");
const report = require("./report");
//const forecast = require("./forecast");
const age = require("./age");
const rfm = require("./rfm");
app.use(cors());

app.get("/", (req, res) => {
  res.send("de system");
});

app.use("/auth", auth);
app.use("/cost", cost);
app.use("/linebot", linebot);
app.use("/getLineCus", getLineCus);
app.use("/counter", counter);
app.use("/updateCounter", update);
app.use("/inventoryManage", inventoryManage);
app.use("/report", report);
app.use("/rfm", rfm);

//app.use("/forecast", forecast);
app.use("/age", age);


app.use("/inventoryManage", inventoryManage);

app.listen(3030, function () {
  console.log("it works yooyoyoy");
});

