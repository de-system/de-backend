var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

const setStock =
  "UPDATE hasStock SET stock = CASE counterId WHEN '1' THEN ?  WHEN '2' THEN ? END ; ";
router.post("/update", async (req, res) => {
  console.log(req);
  await db.query(
    setStock,
    [req.body.amount1, req.body.amount2],
    (err, result) => {
      if (err) throw err; //error
      // let counterStock = [];

      // for (let i = 0; i < result.length; i++) {
      //   counterStock.push(result[i].counterStock);
      // }
      // console.log(JSON.stringify(counterStock));
      res.status(200).send(true);
    }
  );
});
module.exports = router;
