var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

//每月銷量 這個沒有用到 直接寫死
const monthamount =
  "select sum(t.amount) as total from transaction as t group by month(t.time);";

router.get("/pastinfo", async (req, res) => {
  await db.query(monthamount, (err, result) => {
    if (err) throw err;

    let rev = 0;
    let amount = 0;
    let cost = 0;
    let net = 0;

    for (let i = 0; i < result.length; i++) {
      rev = rev + result[i].payment;
      amount = amount + result[i].amount;
      cost = amount * 300;
      net = rev - cost;
    }
    console.log(rev);
    console.log(amount);
    console.log(cost);
    console.log(net);

    //console.log(cost);
    //res.status(200).json({ rev : rev, amount: amount, cost: cost, net: net });
  });
});

module.exports = router;
