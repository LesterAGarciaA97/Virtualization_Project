const express = require("express");
const router = express.Router();

var bodyParser = require('body-parser')

var AWS = require("aws-sdk");

var VariableGlobal;

AWS.config.update({

    accessKeyId: "",
    secretAccessKey: "",
    region: ""
})

const rekognition = new AWS.Rekognition();

router.post("/", (req, res) => {

    console.log("*****************")
    console.log(req.body.nombre)
    console.log("*****************")

    imagenNombre=req.body.nombre;

    var params = {
        Image: {
            S3Object:{
                Bucket: "",
                Name: imagenNombre //nombre de la imagen que se sube
            }
        },
        Attributes: ['ALL']
    };


    rekognition.detectFaces(params, (err, response) =>{
        if(err){
            console.log(err, err.stack); //an error ocurred
        }
        else{
            response.FaceDetails.forEach(data =>{
                
            console.log(data)
            //console.log(data);
             console.log(`  Emotions[0].Type:       ${data.Emotions[0].Type}`)
             console.log(`  Emotions[0].Confidence: ${data.Emotions[0].Confidence}`)
    
             console.log(`  Emotions[1].Type:       ${data.Emotions[1].Type}`)
             console.log(`  Emotions[1].Confidence: ${data.Emotions[1].Confidence}`)
             
             console.log(`  Emotions[2].Type:       ${data.Emotions[2].Type}`)
             console.log(`  Emotions[2].Confidence: ${data.Emotions[2].Confidence}`)
    
             console.log(`  Emotions[3].Type:       ${data.Emotions[3].Type}`)
             console.log(`  Emotions[3].Confidence: ${data.Emotions[3].Confidence}`)
    
             console.log(`  Emotions[4].Type:       ${data.Emotions[4].Type}`)
             console.log(`  Emotions[4].Confidence: ${data.Emotions[4].Confidence}`)
    
             console.log(`  Emotions[5].Type:       ${data.Emotions[5].Type}`)
             console.log(`  Emotions[5].Confidence: ${data.Emotions[5].Confidence}`)
    
             console.log(`  Emotions[6].Type:       ${data.Emotions[6].Type}`)
             console.log(`  Emotions[6].Confidence: ${data.Emotions[6].Confidence}`)
    
             console.log(`  Emotions[7].Type:       ${data.Emotions[7].Type}`)
             console.log(`  Emotions[7].Confidence: ${data.Emotions[7].Confidence}`)
    
             var Mood = data.Emotions[0].Type
             var Quantity = data.Emotions[0].Confidence
    
             if (Quantity <= data.Emotions[1].Confidence) {
                var Mood = data.Emotions[1].Type
                var Quantity = data.Emotions[1].Confidence
             }
             else if (Quantity <= data.Emotions[2].Confidence) {
                var Mood = data.Emotions[2].Type
                var Quantity = data.Emotions[2].Confidence
             }
             else if (Quantity <= data.Emotions[3].Confidence) {
                var Mood = data.Emotions[3].Type
                var Quantity = data.Emotions[3].Confidence
             }
             else if (Quantity <= data.Emotions[4].Confidence) {
                var Mood = data.Emotions[4].Type
                var Quantity = data.Emotions[4].Confidence
             }
             else if (Quantity <= data.Emotions[5].Confidence) {
                var Mood = data.Emotions[5].Type
                var Quantity = data.Emotions[5].Confidence
             }
             else if (Quantity <= data.Emotions[6].Confidence) {
                var Mood = data.Emotions[6].Type
                var Quantity = data.Emotions[6].Confidence
             }
             else if (Quantity <= data.Emotions[7].Confidence) {
                var Mood = data.Emotions[7].Type
                var Quantity = data.Emotions[7].Confidence
             }
             VariableGlobal = Mood;
    
             console.log("------------")
             console.log(VariableGlobal)
             console.log("------------")
            })
        }
    })
    res.send(VariableGlobal);
})

module.exports = router;