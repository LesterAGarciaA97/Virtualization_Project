const express = require("express");
const path = require("path")
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var Handlebars = require('hbs');




Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});



dotenv.config({path: "./.env"})

const app = express();





const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE    
})

const publicDirectory = path.join(__dirname, "./public");
console.log(__dirname);

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended : false}));
// Parse JSON Bbodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "hbs");

db.connect((error) =>{
    if(error){
        console.log(error);
    }
    else{
        console.log("MySQL Connected")
    }
})







/*--------------------------------------------------------------- */

//Define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"))

app.listen(3001, () =>{
    console.log("Server running in port 3001");
})
