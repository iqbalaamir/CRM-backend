const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes/index.js');
const path = require('path');
const allowedOrigins =
  [
    // 'http://localhost:3000',
    'https://chipper-marigold-22f08b.netlify.app/'
  ];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
            name : "Admin",
            userId : 1,
            password : bcrypt.hashSync("admin123!", 10),
            email : "admin@gmail.com",
            userType : constants.userType.admin,
            userStatus : constants.userStatus.approved
        })
    
        console.log(user);

    }catch(err){
        console.log("Error while inserting data into database manually : ", err.message)
    }
};


const PUBLIC_DIR = path.resolve(__dirname, "../public");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PUBLIC_DIR + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });
app.use('/crm/api/v1', upload.single('image'), routes);

app.get("/", (req, res) => {
    res.send("Hello !! Welcome to CRM App")
})

// Require all routes
// require('./routes/forget.route')(app);
// require('./routes/leads.route')(app);
// require('./routes/user.route')(app);
// require('./routes/service.route')(app);
// require('./routes/auth.route')(app);

module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Server is runing ar PORT : " + serverConfig.PORT)
})