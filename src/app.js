const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3000;
const hbs = require('express-handlebars');
const route = require('./routes')
//---
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

// set view engine 
app.engine('.hbs', hbs.engine({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// set static files
app.use(express.static('public'));

//---
const https = require('https');
const fs = require('fs');
const secrect = 'mysecrectkey';
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secrect));
app.use(session({
    secret: secrect,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// require('./mws/ggpassport')(app);
// require('./mws/fbpassport')(app);
require('./mws/passport')(app);

route(app);

// http
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})