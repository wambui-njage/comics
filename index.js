const express = require("express");
const app = express();
const db= require('./startup/db.js');
const port = 3000;

db();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public/'));
require("./startup/router")(app);

app.listen(port, () => { console.log(`listening to port {$port}`) })

module.exports = app;