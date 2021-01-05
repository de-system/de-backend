var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

//總收入
const findAge = "select * from customer order by age asc";

router.get("/customer", async (req, res) => {
  //console.log(req.body.strategyId);
  await db.query(findAge, (err, result) => {
    if (err) throw err;
    //console.log(result);
    //var age = [];
    var age20 = 0;
    var age25 = 0;
    var age30 = 0;
    var age35 = 0;
    var age40 = 0;
    var age45 = 0;
    var age50 = 0;

    for (let i = 0; i < result.length; i++) {
      if (result[i].age <= 20) {
        age20++;
      } else if ((result[i].age > 20) & (result[i].age <= 25)) {
        age25++;
      } else if ((result[i].age > 25) & (result[i].age <= 30)) {
        age30++;
      } else if ((result[i].age > 30) & (result[i].age <= 35)) {
        age35++;
      } else if ((result[i].age > 35) & (result[i].age <= 40)) {
        age40++;
      } else if ((result[i].age > 40) & (result[i].age <= 45)) {
        age45++;
      } else {
        age50++;
      }
    }

    // age.push(age20);
    // age.push(age25);
    // age.push(age30);
    // age.push(age35);
    // age.push(age40);
    // age.push(age45);
    // age.push(age50);

    //console.log(cost);
    res.status(200).json({
      age20: age20,
      age25: age25,
      age30: age30,
      age35: age35,
      age40: age40,
      age45: age45,
      age50: age50,
    });
  });
});

module.exports = router;
