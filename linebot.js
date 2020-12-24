// 引用linebot SDK
import Vue from "vue";
import linebot from "linebot";
//var linebot = require("linebot");

Vue.use(linebot);

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: "1655427699",
  channelSecret: "f32b9472546440f29486fd7aa2918487",
  channelAccessToken:
    "tbgPB646+6hjyuCU4O+b1HYfJEhIqSZosbrma31qK9rLLsyIfupzUgrxjs7DBCEq7cM8vMUIMA+4jYwEDL8e3tOh3GtyuCdOrQ3qmQ5b0en6PbxdlVBNgkimrI7O5RcuTSydxCW/xoN+MpTaw9VPBQdB04t89/1O/w1cDnyilFU=",
});

// 當有人傳送訊息給Bot時
bot.on("message", function(event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用
  let userMsg = `你剛剛說 ${event.message.text}`;
  console.log(userMsg);
  event
    .reply(userMsg)
    .then(function(data) {
      // 當訊息成功回傳後的處理
    })
    .catch(function(error) {
      // 當訊息回傳失敗後的處理
    });
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function() {
  console.log("[BOT已準備就緒]");
});
