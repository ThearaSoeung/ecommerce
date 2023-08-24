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
const multer = require('multer');

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const csrfProtection = csrf();
const app = express();

const formData = require('form-data');
const Mailgun = require('mailgun.js'); 

const apiKey = 'f10bb0546b64fd260dedac006386807d-f0e50a42-cc0a44cb';
const domain = 'sandbox576bd4a2b2ae4bcaa232784fd9ceac3d.mailgun.org';

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: apiKey});
 
const store = new MongoDBSession({
  uri: MongoDbURI,
  collection: 'sessions'
})

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const name = new Date().toISOString()+'-'+file.originalname; 
    cb(null, name);
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' || 
    file.mimetype === 'image/jpeg' ||  
    file.mimetype === 'image/jpg'     
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image')); 
//Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.locals.baseUrl = req.protocol + '://' + req.get('host');
  next();
});

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

app.use((res, req, next)=>{
  req.Client = client;
  req.Domain = domain;
  next();
})

//Using the routes
app.use(shopRoute);
app.use(adminRoute);
app.use(notFoundController.getNotFoundPage);

app.listen('3000');