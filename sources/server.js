const express  = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
require('dotenv').config();

const index = require('./routes/main_route.js');
const auth = require('./routes/auth_route.js');

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(index);
app.use(auth);

//=========== Configuraciones ===========//
app.set("views", path.join(__dirname, "views")); 
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
//=======================================//



module.exports = app;