// var express = require("express");
// const cors = require("cors");
// const db = require("./database/db");
// var router = express.Router();
// router.use(cors());
// router.use(express.json());

// const findR =
//   "select  transaction.customerId,customer.name,customer.lineId,transaction.time,customer.responseRate from transaction,customer where customer.customerId=transaction.customerId order by time desc limit 10";
// router.post("/R", async (req, res) => {
//   await db.query(findR, (err, result) => {
//     if (err) throw err;
//     let customerId = [];
//     let name = [];
//     let lineId = [];
//     let time = [];
//     let responseRate = [];
//     for (let i = 0; i < result.length; i++) {
//       customerId.push(result[i].customerId);
//       name.push(result[i].name);
//       lineId.push(result[i].lineId);
//       time.push(result[i].time);
//       responseRate.push(result[i].responseRate);
//     }
//     var bi;
//     //st1,買一送一(損益平衡回應率)
//     var st1 = 50 / 700;
//     //st2,折扣(損益平衡回應率)
//     var sr3 = 10 / 700;
//     for (let j = 0; i < responseRate.length; j++) {
//       bi = bi + responseRate[j];
//     }
//     bi = bi / responseRate.length;
//     //st_bi1,買一送一(損益平衡指數)
//     //st_bi2,折扣(損益平衡指數)
//     let st_bi1 = (bi - st1) / st1;
//     let st_bi2 = (bi - st2) / st2;
//     console.log(
//       "(買一送一)損益平衡回應率: " + st1 + " 損益平衡指數: " + st_bi1
//     );
//     console.log("(折扣)損益平衡回應率: " + st2 + " 損益平衡指數: " + st_bi1);
//     res
//       .status(200)
//       .json({
//         customerId: customerId,
//         name: name,
//         lineId: lineId,
//         time: time,
//         st_bi1: st_bi1,
//         st_bi2: st_bi2,
//       });
//   });
// });

// const findF =
//   "select transaction.customerId,customer.name,customer.lineId,count(*) as Amount,customer.responseRate   FROM transaction,customer where customer.customerId=transaction.customerId group by customerId order by amount desc";
// router.post("/F", async (req, res) => {
//   //console.log();
//   await db.query(findF, (err, result) => {
//     if (err) throw err;
//     let customerId = [];
//     let name = [];
//     let lineId = [];
//     let amount = [];
//     let responseRate = [];
//     for (let i = 0; i < result.length; i++) {
//       customerId.push(result[i].customerId);
//       name.push(result[i].name);
//       lineId.push(result[i].lineId);
//       amount.push(result[i].amount);
//       responseRate.push(result[i].responseRate);
//     }
//     var bi;
//     //st1,買一送一(損益平衡回應率)
//     var st1 = 50 / 700;
//     //st2,折扣(損益平衡回應率)
//     var sr3 = 10 / 700;
//     for (let j = 0; i < responseRate.length; j++) {
//       bi = bi + responseRate[j];
//     }
//     bi = bi / responseRate.length;
//     //st_bi1,買一送一(損益平衡指數)
//     //st_bi2,折扣(損益平衡指數)
//     let st_bi1 = (bi - st1) / st1;
//     let st_bi2 = (bi - st2) / st2;
//     //console.log();
//     res
//       .status(200)
//       .json({
//         customerId: customerId,
//         name: name,
//         lineId: lineId,
//         amount: amount,
//         st_bi1: st_bi1,
//         st_bi2: st_bi2,
//       });
//   });
// });

// const findM =
//   "select transaction.customerId,customer.name,customer.lineId,sum(transaction.payment) as Payment,customer.responseRate  from transaction,customer where customer.customerId = transaction.customerId group by customerId order by sum(payment) desc";
// router.post("/M", async (req, res) => {
//   //console.log();
//   await db.query(findM, (err, result) => {
//     if (err) throw err;
//     let customerId = [];
//     let name = [];
//     let lineId = [];
//     let payment = [];
//     let responseRate = [];
//     for (let i = 0; i < result.length; i++) {
//       customerId.push(result[i].customerId);
//       name.push(result[i].name);
//       lineId.push(result[i].lineId);
//       payment.push(result[i].payment);
//       responseRate.push(result[i].responseRate);
//     }
//     var bi;
//     //st1,買一送一(損益平衡回應率)
//     var st1 = 50 / 700;
//     //st2,折扣(損益平衡回應率)
//     var sr3 = 10 / 700;
//     for (let j = 0; i < responseRate.length; j++) {
//       bi = bi + responseRate[j];
//     }
//     bi = bi / responseRate.length;
//     //st_bi1,買一送一(損益平衡指數)
//     //st_bi2,折扣(損益平衡指數)
//     let st_bi1 = (bi - st1) / st1;
//     let st_bi2 = (bi - st2) / st2;
//     //console.log();
//     res
//       .status(200)
//       .json({
//         customerId: customerId,
//         name: name,
//         lineId: lineId,
//         payment: payment,
//         st_bi1: st_bi1,
//         st_bi2: st_bi2,
//       });
//   });
// });

// const survivalRate =
//   "select  transaction.customerId,customer.name,customer.lineId,max(transaction.time) as lastTime from transaction,customer where customer.customerId=transaction.customerId group by customerId order by lastTime  asc ";
// router.post("/survivalRate", async (req, res) => {
//   //console.log();
//   await db.query(survivalRate, (err, result) => {
//     if (err) throw err;
//     let customerId = [];
//     let name = [];
//     let lineId = [];
//     let lastTime = [];
//     for (let i = 0; i < result.length; i++) {
//       customerId.push(result[i].customerId);
//       name.push(result[i].name);
//       lineId.push(result[i].lineId);
//       lastTime.push(result[i].lastTime);
//     }

//     //console.log();
//     res
//       .status(200)
//       .json({
//         customerId: customerId,
//         name: name,
//         lineId: lineId,
//         lastTime: lastTime,
//       });
//   });
// });
// module.exports = router;
