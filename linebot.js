// 引用linebot SDK
var express = require("express");
const cors = require("cors");
const db = require("./database/db");
var router = express.Router();
router.use(cors());
router.use(express.json());
var linebot = require("linebot");

// 用於辨識Line Channel的資訊
let bot = linebot({
  channelId: "1655427699",
  channelSecret: "f32b9472546440f29486fd7aa2918487",
  channelAccessToken:
    "tbgPB646+6hjyuCU4O+b1HYfJEhIqSZosbrma31qK9rLLsyIfupzUgrxjs7DBCEq7cM8vMUIMA+4jYwEDL8e3tOh3GtyuCdOrQ3qmQ5b0en6PbxdlVBNgkimrI7O5RcuTSydxCW/xoN+MpTaw9VPBQdB04t89/1O/w1cDnyilFU=",
});

//Bot所監聽的webhook路徑與port;
bot.listen("/linewebhook", 3000, function () {
  console.log("[BOT已準備就緒]");
});

const sendStrategy = "select type from strategy where strategyId = ?";
router.post("/bot", async (req, res) => {
  await db.query(sendStrategy, [req.body.strategyId], (err, result) => {
    if (err) throw err;

    let strategy = result[0].type;

    res.status(200).json({ type: strategy });
    let replyMsg = [];
    if (strategy == "買一送一") {
      replyMsg = [
        {
          type: "text",
          text: "出示此訊息即享有買一送一 ㅠㅠ～",
        },
      ];
    } else if (strategy == "寄調查問卷") {
      replyMsg = [
        {
          type: "text",
          text:
            "請到此網址填答問卷 " +
            "完畢回覆 ok 即可享有折扣1000元～https://forms.gle/KBfwZXFJ1vcNpo6q6",
        },
      ];
    } else {
      replyMsg = [
        {
          type: "image",
          originalContentUrl:
            "https://s.newtalk.tw/album/news/502/5fc752ad3b176.jpg",
          previewImageUrl: "https://www.hotzbuy.com/images/41/41-05-2.jpg",
        },
      ];
    }

    const users = ["Udfde9af28953a58a7e5dfa54f1ae661b"];
    bot.multicast(users, replyMsg);
  });
});

module.exports = router;
