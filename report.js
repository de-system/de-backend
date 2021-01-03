var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());


//總收入
const findRate = "select customerid ,MONTH(max(time)) as t,MONTH(min(time)) as h from transaction  group by customerid order by t asc;"

router.get("/surRate", async (req, res) => {
    console.log(req.body.strategyId);
    db.query(findRate, (err, result) => {
        if (err) throw err;
        //console.log(result);
        let rate = [];
        let period1 = 0;
        let period2 = 0;
        let period3 = 0;
        let period4 = 0;
        let period5 = 0;
        let period6 = 0;

        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        let count5 = 0;
        let count6 = 0;
        let base = 50;

        console.log(result);

        for (let i = 0; i < result.length; i++) {
            let j = Number(result[i].t);
            //console.log(j);
            if (j == 12) {
                count1++;
                count2++;
                count3++;
                count4++;
                count5++;
                count6++;
            } else if (j == 11) {
                count1++;
                count2++;
                count3++;
                count4++;
                count5++;
            } else if (j == 10) {
                count1++;
                count2++;
                count3++;
                count4++;
            } else if (j == 9) {
                count1++;
                count2++;
                count3++;
            } else if (j == 8) {
                count1++;
                count2++;
            } else {
                count1++;
            }

        }
        console.log(count1);
        console.log(count2);
        console.log(count3);
        console.log(count4);
        console.log(count5);
        console.log(count6);

        period1 = count1 / base;
        period2 = period1 * count2 / count1;
        period3 = period2 * count3 / count2;
        period4 = period3 * count4 / count3;
        period5 = period4 * count5 / count4;
        period6 = period5 * count6 / count5;

        period1 = period1.toFixed(2);
        period2 = period2.toFixed(2);
        period3 = period3.toFixed(2);
        period4 = period4.toFixed(2);
        period5 = period5.toFixed(2);
        period6 = period6.toFixed(2);

        console.log(period1);
        console.log(period2);
        console.log(period3);
        console.log(period4);
        console.log(period5);
        console.log(period6);

        rate.push(period1);
        rate.push(period2);
        rate.push(period3);
        rate.push(period4);
        rate.push(period5);
        rate.push(period6);


        console.log(rate);
        //console.log(cost);
        res.status(200).json({ rate: rate });
    });

});



//總收入
const findRev =
    "SELECT  MONTH(time) AS month,SUM(payment) AS payment,SUM(amount) AS amount,SUM(amount)*300 AS cost,SUM(amount)*700 AS net FROM transaction GROUP BY MONTH(time)"

router.get("/info", async (req, res) => {
    db.query(findRev, (err, result) => {
        if (err) throw err;

        // let rev = 0;
        // let amount = 0;
        // let cost = 0;
        // let net = 0;

        // for (let i = 0; i < result.length; i++) {

        //     rev = rev + result[i].payment;
        //     amount = amount + result[i].amount;
        //     cost = amount * 300;
        //     net = rev - cost;

        // }
        // console.log(rev);
        // console.log(amount);
        // console.log(cost);
        // console.log(net);

        // console.log(cost);

        res.send(result);
    });
});

const findCustomer = "SET @t = 7;SELECT count(distinct customerId) as amount ,month(time) as month , IF(month(time)=7, @t:= month(time) , @t := month(time)-1) as q FROM transaction where customerId IN (select distinct customerId from transaction where month(time)=@t) group by month(time) ;";
const findIndex = "SELECT count(distinct customerId) as cAmount ,month(time) as month FROM transaction group by month(time);";
router.get("/customerIndex", async (req, res) => {
    let cAmountArray = []; // array for 每期的顧客數
    let rArray = []; // array for retentionRate 
    let defectionArray = []; //array for defectionRate 
    let surviveArray = []; // array for  surviveRate
    let totalArray = [];
    await db.query(findIndex, (err, result) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            if (i === 0) {
                cAmountArray.push(27);
                rArray.push((27 / 50).toFixed(2));
                defectionArray.push((1 - 27 / 50).toFixed(2));
                surviveArray.push((27 / 50).toFixed(2));
            } else {
                cAmountArray.push(result[i].cAmount);
            }
        }
        db.query(findCustomer, (err, result) => {
            if (err) throw err;
            for (let i = 0; i < result[1].length; i++) {
                if (i != 0) {
                    rArray.push((result[1][i].amount / cAmountArray[i - 1]).toFixed(2));
                    defectionArray.push((1 - rArray[i]).toFixed(2));
                    surviveArray.push((surviveArray[i - 1] * rArray[i]).toFixed(2));
                }
                //不要百分比的話就拿掉 * 100 + "%" (๑•̀ㅂ•́)و✧
                totalArray.push({ month: result[1][i].month, retetionRate: rArray[i] * 100 + "%", defectionRate: defectionArray[i] * 100 + "%", surviveRate: Math.floor(surviveArray[i] * 100) + "%" });
            }
            res.send(totalArray);
        });
    });
});


module.exports = router;