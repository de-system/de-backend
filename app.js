const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./auth");
const cost = require("./cost");
const linebot = require("./linebot");
const getLineCus = require("./getLineCus");
app.use(cors());

app.get("/", (req, res) => {
  res.send("de system");
});

app.use("/auth", auth);
app.use("/cost", cost);
app.use("/linebot", linebot);
app.use("/getLineCus", getLineCus);

app.listen(3030, function () {
  console.log("it works yooyoyoy");
});
