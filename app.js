const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const {User} = require('./models/associations')

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
    User.findByPk(1)
    .then(user=>{
        req.user = user.dataValues;
        next();
    })
    .catch(err=>console.log(err))
})

//Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
//Middleware to serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

//Using the routes
app.use(shopRoute);
app.use(adminRoute);
app.use(notFoundController.getNotFoundPage);

sequelize
  .sync({force: false})
  .then(result => {
    return User.findByPk(1)
  })
  .then(user=>{
    if(!user){
        return User.create({name:"Theara", email: "thearasoeung123@gmail.com"});
    }
    return user;
  })
  .then(user=>{
    app.listen(2000);   
  })
  .catch((err) => {});
