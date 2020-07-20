var AWS = require("aws-sdk");
var cors = require('cors')



const express = require("express");
const path  = require("path");
const app = express();
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

const awsRoutes = require("./routes/aws")

app.set("port", process.env.PORT || 9000)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));

app.use("/", awsRoutes)

app.listen(9000, () =>{
    console.log("server on port 9000")
})
