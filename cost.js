var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

const findStrategy = "select strategyCost  from strategy where strategyId = ?";
router.post("/cost", async (req, res) => {
  //console.log(req.body.strategyId);
  await db.query(findStrategy, [req.body.strategyId], (err, result) => {
    if (err) throw err;

    let cost = result[0].strategyCost;
    //console.log(cost);
    res.status(200).json({ strategyCost: cost });
  });
});

module.exports = router;
