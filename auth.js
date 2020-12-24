var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

const findAdmin = "select * from admin where account = ?";
router.post("/login", async (req, res) => {
  await db.query(findAdmin, [req.body.account], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(200).send(false);
    } else {
      let pw = JSON.parse(JSON.stringify(result))[0].password;
      if (pw === req.body.password) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    }
  });
});

module.exports = router;
