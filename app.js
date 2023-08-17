const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoConnect = require('./util/database').mongoConnect;
const User = require("./models/user").User

const notFoundController = require("./controllers/not-found");
//Registering routes
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

//Using EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "views");

//Middleware
app.use((req, res, next)=>{
  User.getByPk("64db4def9de3ab5907e0c89f")
  .then((result) => {
      req.user = result;
      next();
  }).catch((err) => {
    console.error(err);
  });
});

//Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
//Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

//Using the routes
app.use(shopRoute);
app.use(adminRoute);
app.use(notFoundController.getNotFoundPage);

mongoConnect(() => {
  app.listen(3000);
}); 

