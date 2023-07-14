const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Registering routes
const landingPageRoute = require('./routes/landing-page');
const addProductRoute = require('./routes/add-product');
const notFoundRoute = require('./routes/not-found');
const productRoute = require('./routes/product');

const app = express();

//Using EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Middleware to parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));
//Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

//Using the routes
app.use(landingPageRoute); 
app.use(productRoute);
app.use(addProductRoute);
app.use(notFoundRoute); 

app.listen(2000); 