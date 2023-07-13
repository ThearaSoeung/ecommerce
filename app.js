const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const landingPageRoute = require('./routes/landing-page/landing-page');
const addProductRoute = require('./routes/add-product/add-product');
const notFoundRoute = require('./routes/not-found/not-found');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(landingPageRoute); 
app.use(addProductRoute);
app.use(notFoundRoute); 

app.listen(4000); 