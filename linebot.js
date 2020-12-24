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

// 當有人傳送訊息給Bot時
bot.on("message", function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用
  //let userMsg = `你剛剛說 ${event.message.text} ${event.source.userId}`;
  let userMsg = [
    {
      type: "flex",
      altText: "de-life 問卷折扣來囉！",
      contents: {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://www.hotzbuy.com/images/41/41-05-2.jpg",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "http://linecorp.com/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "de-life 問卷折扣！",
              weight: "bold",
              size: "xl",
            },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "使用分櫃",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 2,
                    },
                    {
                      type: "text",
                      text: "全台de專櫃皆可使用",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 5,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Time",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 2,
                    },
                    {
                      type: "text",
                      text: "1/7 ~ 1/31",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 5,
                    },
                  ],
                },
              ],
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "link",
              height: "sm",
              action: {
                type: "uri",
                label: "領取折價卷",
                uri: "https://lin.ee/8K551ct",
              },
            },
            {
              type: "spacer",
              size: "sm",
            },
          ],
          flex: 0,
        },
      },
    },
  ];
  if (event.message.text == "ok") {
    event
      .reply(userMsg)
      .then(function (data) {
        // 當訊息成功回傳後的處理
      })
      .catch(function (error) {
        // 當訊息回傳失敗後的處理
      });
  }
});
// const users = ["Udfde9af28953a58a7e5dfa54f1ae661b"];
// bot.multicast(users, [
//   {
//     type: "text",
//     text: "耶誕夜寫什麼程式",
//   },
// ]);

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
          type: "flex",
          altText: "de-life 買一送一來囉！",
          contents: {
            type: "bubble",
            hero: {
              type: "image",
              url:
                "https://yahooshopping-cdn240.myguide.hk/uploads/article/871f2e4994c18d26b832762dd273667c.jpg",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
              action: {
                type: "uri",
                uri: "http://linecorp.com/",
              },
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "de-life 限時買一送一！",
                  weight: "bold",
                  size: "xl",
                },
                {
                  type: "box",
                  layout: "vertical",
                  margin: "lg",
                  spacing: "sm",
                  contents: [
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "使用分櫃",
                          color: "#aaaaaa",
                          size: "sm",
                          flex: 2,
                        },
                        {
                          type: "text",
                          text: "全台de專櫃皆可使用",
                          wrap: true,
                          color: "#666666",
                          size: "sm",
                          flex: 5,
                        },
                      ],
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "Time",
                          color: "#aaaaaa",
                          size: "sm",
                          flex: 2,
                        },
                        {
                          type: "text",
                          text: "1/7 ~ 1/31",
                          wrap: true,
                          color: "#666666",
                          size: "sm",
                          flex: 5,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "button",
                  style: "link",
                  height: "sm",
                  action: {
                    type: "uri",
                    label: "領取買一送一",
                    uri: "https://lin.ee/xgUfxVY",
                  },
                },
                {
                  type: "spacer",
                  size: "sm",
                },
              ],
              flex: 0,
            },
          },
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
          type: "flex",
          altText: "de-life 限時折扣來囉！",
          contents: {
            type: "bubble",
            hero: {
              type: "image",
              url: "https://www.hotzbuy.com/images/41/41-05-2.jpg",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
              action: {
                type: "uri",
                uri: "http://linecorp.com/",
              },
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: "de-life 限時折扣！",
                  weight: "bold",
                  size: "xl",
                },
                {
                  type: "box",
                  layout: "vertical",
                  margin: "lg",
                  spacing: "sm",
                  contents: [
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "使用分櫃",
                          color: "#aaaaaa",
                          size: "sm",
                          flex: 2,
                        },
                        {
                          type: "text",
                          text: "全台de專櫃皆可使用",
                          wrap: true,
                          color: "#666666",
                          size: "sm",
                          flex: 5,
                        },
                      ],
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      spacing: "sm",
                      contents: [
                        {
                          type: "text",
                          text: "Time",
                          color: "#aaaaaa",
                          size: "sm",
                          flex: 2,
                        },
                        {
                          type: "text",
                          text: "1/7 ~ 1/31",
                          wrap: true,
                          color: "#666666",
                          size: "sm",
                          flex: 5,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              spacing: "sm",
              contents: [
                {
                  type: "button",
                  style: "link",
                  height: "sm",
                  action: {
                    type: "uri",
                    label: "領取折價卷",
                    uri: "https://lin.ee/JUCxHys",
                  },
                },
                {
                  type: "spacer",
                  size: "sm",
                },
              ],
              flex: 0,
            },
          },
        },
      ];
    }

    const users = ["Udfde9af28953a58a7e5dfa54f1ae661b"];
    bot.multicast(users, replyMsg);
  });
});

module.exports = router;
