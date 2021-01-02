var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

// calculate EOQ D = 1200 per year, DflowerOil = 3600/year, Dalcohol = 2400/year Sf=1500(NTD) Hf=600(NTD) Sa=1000(NTD) Hf=600(NTD)
const calculateEOQ = () => {
  // EOQ =  sqrt(2*D*S/H)
  let EOQf = Math.ceil(Math.sqrt((2 * 3600 * 1500) / 600));
  let EOQa = Math.ceil(Math.sqrt((2 * 2400 * 1000) / 600));
  // company works 365 days per year
  let Tf = Math.ceil((EOQf / 3600) * 365);
  let Ta = Math.ceil((EOQa / 2400) * 365);
  let EOQ = [EOQf, EOQa];
  return EOQ;
};

// ROP =  dLT + z*sqrt(LT)*σd , d = 100*7/31 ,σd = 5,LT = 1 week
// df per week 300*7/31,σdf = 10 , da per week 200*7/31, σda = 5 ,both z =1.88,LT = 1 week
const calculateROP = () => {
  let ROP = Math.ceil(((100 * 7) / 31) * 1 + 1.88 * Math.sqrt(1) * 5);
  return ROP;
};

// get transaction info
const getTransaction = "SELECT amount, time FROM transaction ";
const transaction = () => {
  return new Promise((resolve, reject) => {
    db.query(getTransaction, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      let data = result.map((element) => {
        element = { amount: element.amount, time: element.time };
        return element;
      });
      resolve(data);
    });
  });
};

// add days for recieving order 前置時間
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};

// check Date diffrence
const DateDiff = function (sDate1, sDate2) {
  var oDate1 = new Date(sDate1);
  var oDate2 = new Date(sDate2);
  var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
};

// check ROP time and EOQ
const checkROPandEOQ = async () => {
  let data = await transaction();
  let stock = 100;
  let ROP = calculateROP();
  let lastOrderDate = "2020-06-30";
  let receiveDate = "2020-06-30";
  let list = [];
  let orderId = 0;

  // every receiveDate get 45 products
  for (let i = 0; i < data.length; i++) {
    let currentDate = data[i].time.toISOString().split("T")[0];
    stock -= data[i].amount;
    if (currentDate == receiveDate) {
      stock += 45;
    }
    if (stock <= ROP && DateDiff(lastOrderDate, currentDate) > 7) {
      orderId += 1;
      receiveDate = new Date(data[i].time)
        .addDays(7)
        .toISOString()
        .split("T")[0];
      lastOrderDate = data[i].time.toISOString().split("T")[0];
      list.push({
        orderId: orderId,
        orderDate: lastOrderDate,
        receiveDate: receiveDate,
        EOQf: calculateEOQ()[0],
        EOQa: calculateEOQ()[1],
        cost: (calculateEOQ()[0] + calculateEOQ()[1]) * 1.2,
      });
    }
  }
  JSON.stringify(list);
  return list;
};

router.get("/orderList", async (req, res) => {
  res.send(await checkROPandEOQ());
});

const showInventory = "SELECT ingredient,inventory FROM material;";
const showStock =
  "SELECT pName , sum(stock) as totalStock FROM product INNER JOIN hasStock USING (productId)";
router.get("/showData", (req, res) => {
  // get material inventory and product totalStock from db
  db.query(showInventory + showStock, (err, result) => {
    if (err) throw err;
    // console.log(JSON.stringify(result));
    res.send(result);
  });
});

module.exports = router;
