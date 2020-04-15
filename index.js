const express = require("express");
const app = express();
const axios = require('axios');
const route = require('./routes/router.js');
const blog = require('./routes/blog.js');
const db= require('./startup/db.js');
const create= require('./models/blog.js');
const port = process.env.PORT;

db();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname + '/public/'));
app.use('/', route);
app.use('/blog', blog);




app.listen(port, () => { console.log(`listening to port {$port}`) })

