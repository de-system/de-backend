var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());



const findAdmin = "SELECT * FROM admin WHERE account = ?"
router.post('/login', (req, res) => {
  db.query(findAdmin, [req.body.account], (err, result) => {
    if (err) throw err;
    //check user exists
    if (result.length === 0) {
      res.status(200).send(false);
    }
    else {
      let pw = result[0].password;
      if (pw === req.body.password) {
        res.status(200).send(true);
      }
      else {
        res.status(200).send(false);
      }
    }
  })
})

module.exports = router;
