const express = require("express");
const authController = require("../controllers/auth");
const multer= require('multer');
const mimeTypes = require('mime-types');
const AWS  = require('aws-sdk');
const fs   = require('fs');
const path = require('path');



const router = express.Router();

var nombreArchivo;


router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/InserMood", authController.insertMood)

router.post("/Dashboard", authController.Dashboard)

router.post("/spotifyApi", authController.spotifyApi)

AWS.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
});


/*------------- Cargar Foto -------------- */ 
//Almacenamiento en disco
//Guarda en el mismo equipo donde se encuentra el disco
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function(req,file,cb){
        nombreArchivo = file.originalname;
        cb("", file.originalname ) //+ mimeTypes.extension(file.mimetype));
       // cb("",Date.now()+ file.originalname + "." + mimeTypes.extension(file.mimetype));
    }
})

const upload = multer({
    storage: storage
})

router.post("/files",upload.single('imagen'),(req,res)=>{
    /*  app2.get("/", (req,res)=>{
          res.send();
    });*/
    var s3 = new AWS.S3();
    var filePath = "./uploads/"+nombreArchivo;

    //configurar parametros
    var params = {
    Bucket : process.env.BUCKET,
    Body   : fs.createReadStream(filePath),
    Key    : path.basename(filePath),
    ACL    : 'public-read'
    };

    s3.upload(params, function (err, data) {
        //en caso de error
        if (err) {
          console.log("Error", err);
        }
      
        // el archivo se ha subido correctamente
        if (data) {
          console.log("Uploaded in:", data.Location);
        }
    });


        res.render("logged.hbs", {
          nombreArchivo: nombreArchivo
            
            
      })

     
  })


  

module.exports = router;