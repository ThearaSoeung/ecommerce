const Squelize = require('sequelize'); 
const squelize = new Squelize({
    database: 'new_schema',
    username: 'root', 
    password: 'Theara011802399',
    host: '127.0.0.1', 
    dialect: 'mysql' 
}); 

squelize.sync()

.then(()=>{
})
.catch((error)=>{
    console.log("Error", error);
})

module.exports = squelize;


