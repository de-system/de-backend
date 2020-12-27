var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

const findCustomer =
  "select c.name ,c.age, c.lineId , date_format(t.time,'%Y-%m-%d') as time  from transaction as t  inner join customer as c on t.customerId = c.customerId where caMethod='line' and MONTH(time)=? ";
router.post("/customer", async (req, res) => {
  //console.log(req.body.strategyId);
  await db.query(findCustomer, [req.body.month], (err, result) => {
    if (err) throw err;
    let name = [];
    let age = [];
    let lineId = [];
    let time = [];
    for (let i = 0; i < result.length; i++) {
      name.push(result[i].name);
      age.push(result[i].age);
      lineId.push(result[i].lineId);
      time.push(result[i].time);
    }

    //console.log(cost);
    res.status(200).json({ name: name, age: age, lineId: lineId, time: time });
  });
});

module.exports = router;
