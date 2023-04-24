const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const serverConfig = require('./configs/server.config')
const User = require('./models/user.model');
const constants = require('./utils/constants');
// connectiong with mongoDB
mongoose.connect(serverConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error While connecting with mongoDB")
})
db.once("open", () => {
    console.log("Connection Established with mongoDB")
    init()
})

async function init(){
    try{

        // await User.collection.drop();
        // await Ticket.collection.drop();
    
        let  user = await User.findOne({userType : constants.userType.admin});
        if(user){
            console.log(user);
            console.log("Admin user is already created")
            return
        }
    
        user = await User.create({
            name : "Aamir Iqbal",
            userId : "aam",
            password : bcrypt.hashSync("aami98", 10),
            email : "aamir.iqbal040@gmail.com",
            userType : constants.userType.admin,
            userStatus : constants.userStatus.approved
        })
    
        console.log(user);

    }catch(err){
        console.log("Error while inserting data into database manually : ", err.message)
    }
};

app.get("/", (req, res) => {
    res.send("Hello !! Welcome to CRM App")
})

// Require all routes
require('./routes/forget.route')(app);
require('./routes/leads.route')(app);
require('./routes/user.route')(app);
require('./routes/service.route')(app);
require('./routes/auth.route')(app);

const allowedOrigins =
  [
    'http://localhost:3000',
  ];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Server is runing ar PORT : " + serverConfig.PORT)
})