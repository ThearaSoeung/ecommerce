const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./models/user")
const mongooes = require("mongoose"); 
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const MongoDbURI = "mongodb+srv://thearasoeung:Theara011802399@cluster0.6wyv2kg.mongodb.net/?retryWrites=true&w=majority";
const csrf = require('csurf');
const flash = require('connect-flash');
const notFoundController = require("./controllers/not-found");
//Registering routes
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const csrfProtection = csrf();
const app = express();

const store = new MongoDBSession({
  uri: MongoDbURI,
  collection: 'sessions'
})
//Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
//Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

//Using EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "views");

mongooes.connect(MongoDbURI)
.then((result) => {
  console.log("Connected")
}).catch((err) => {
  console.error(err);   
});

app.use(session({ 
  secret: 'mySecret',
  resave: false, 
  saveUninitialized: false,
  store: store, 
}))

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next)=>{
  if(!req.session.user){
    return next();    
  }
  User.getByPk(req.session.user._id)
  .then((result) => {
      req.user = result;
      next();
  }).catch((err) => {
    console.error(err);
  });
});

app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.session.loginStatus;
  res.locals.csrfToken = req.csrfToken();
  next()
})


//Using the routes
app.use(shopRoute);
app.use(adminRoute);
app.use(notFoundController.getNotFoundPage);

app.listen('3000');