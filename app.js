const express = require('express');
const cors = require("cors");
const app = express();
const auth = require("./auth");
const inventoryManage = require("./inventoryManage");
app.use(cors());

app.get('/', (req, res) => {
    res.send('de system')
})

app.use("/auth", auth);

app.use("/inventoryManage", inventoryManage);

app.listen(3030, function () {
    console.log(`Listening on: http://localhost:3030`);
});