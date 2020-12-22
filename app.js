const express = require('express');
const cors = require("cors");
const app = express();
const auth = require("./auth");
app.use(cors());

app.get('/', (req, res) => {
    res.send('de system')
})

app.use("/auth", auth);

app.listen(3030, function () {
    console.log('it works yooyoyoy');

});