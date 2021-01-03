var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());

const findStock =
  "select c.counterId as counterId , c.counterName as counterName , s.stock as counterStock from counter as c join hasStock as s on c.counterId = s.counterId ;";
router.get("/manageInventory", async (req, res) => {
  await db.query(findStock, (err, result) => {
    if (err) throw err; //error
    let counterName = [];
    let counterId = [];
    let counterStock = [];

    for (let i = 0; i < result.length; i++) {
      counterName.push(result[i].counterName);
      counterId.push(result[i].counterId);
      counterStock.push(result[i].counterStock);
    }
    // console.log(JSON.stringify(counterStock));
    res.status(200).json({
      counterName: counterName,
      counterId: counterId,
      counterStock: counterStock,
    });
  });
});
module.exports = router;

//昀靜的code

// conn.connect(function (err) {
//   if (err) {
//     console.log("!!! Cannot connect !!! Error:");
//     throw err;
//   } else {
//     console.log("Connection established.");
//     readData();
//     show();
//     end();
//   }
// });

//從資料庫讀取資料
// function readData() {
//   conn.query(
//     "select * from hasStock,counter where counter.counterId=hasStock.counterId;",
//     function (err, result, fields) {
//       if (err) throw err;
//       else counterName1 = result[0].counterName;
//       counterName2 = result[1].counterName;
//       counterID1 = result[0].counterID;
//       counterID2 = result[1].counterID;
//       counterStock1 = result[0].stock;
//       counterStock2 = result[1].stock;
//       console.log(counterName1 + ":" + counterStock1);
//       console.log(counterName2 + ":" + counterStock2);
//     }
//   );
// }

// 調撥貨物
// function changStock(counterID, num) {
//   if ((counterID = counterID1)) {
//     counterStock1 = counterStock1 + num;
//     counterStock2 = counterStock2 - num;
//     conn.query(
//       "UPDATE hasStock SET stock = ? WHERE counterID = ?",
//       [counterStock1, 1],
//       function (err, results, fields) {
//         if (err) throw err;
//       }
//     );
//     conn.query(
//       "UPDATE hasStock SET stock = ? WHERE counterID = ?",
//       [counterStock2, 2],
//       function (err, results, fields) {
//         if (err) throw err;
//       }
//     );
//   } else {
//     counterStock2 = counterStock2 + num;
//     counterStock1 = counterStock1 - num;
//     conn.query(
//       "UPDATE hasStock SET stock = ? WHERE counterID = ?",
//       [counterStock1, 1],
//       function (err, results, fields) {
//         if (err) throw err;
//       }
//     );
//     conn.query(
//       "UPDATE hasStock SET stock = ? WHERE counterID = ?",
//       [counterStock2, 2],
//       function (err, results, fields) {
//         if (err) throw err;
//       }
//     );
//   }
// }

// function end() {
//   conn.end(function (err) {
//     if (err) throw err;
//     else console.log("Done.");
//   });
// }
// //展示現在存貨
// function show() {
//   conn.query("select * from hasStock ", function (err, result, fields) {
//     if (err) throw err;
//     else console.log(result);
//   });
// }
