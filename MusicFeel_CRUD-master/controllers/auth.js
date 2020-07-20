const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE    
});



exports.register = (req, res)=>{
    console.log(req.body);

    const name = req.body.txtname;
    const lastname = req.body.txtlastname;
    const username = req.body.txtusername;
    const password = req.body.txtpassword;
    const confirmpassword = req.body.txtpasswordconfirm;

    db.query("SELECT USERNAME FROM UserMusic WHERE USERNAME = ?", [username], (error, results) =>{
        if(error){
            console.log(error);
        }
        else if(results.length > 0){
            return res.render("register.hbs", {
                message: "That username is already in use"
            })
        } else if(password !== confirmpassword){
            return res.render("register.hbs", {
                message: "Passwords do not match"
            })
        }

        //Aqui agregar un encryptado

        db.query("INSERT INTO UserMusic SET ?", {NAME: name, LASTNAME: lastname, USERNAME: username, PASSWORD: password, Admin: 0}, (error, results) =>{
            if (error) {
                console.log(error)
            }
            else{
                console.log(results);
                return res.render("register.hbs", {
                    message: "User registered"
                });
            }
        })
    });
}

exports.login = (req, res)=>{

    try {
        console.log(req.body);

        const username = req.body.txtusername;
        const password = req.body.txtpassword;

        if (!username || !password) {
            return res.status(400).render("login.hbs", {
                message: "Please provide an username and password"
            })
        }
        
        db.query("SELECT * FROM UserMusic WHERE USERNAME = ? AND PASSWORD = ?", [username, password], (err, results) =>{

            if (err){
                console.log(err);
            };

            //Aqui agregar un desencryptado y compararlo con password

            if( (username !== results[0].USERNAME) || ((password !== results[0].PASSWORD))){
                res.status(401).render("login.hbs", {
                    message: "USERNAME OR PASSWORD INCORRECT"
                })
            }else{
                const id = results[0].ID;
                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: " + token);
                
                const cookieOptions ={
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie("jwt", token, cookieOptions);

                if (results[0].Admin == 1) {
                    res.status(200).redirect("/Admin");
                } else {
                    res.status(200).redirect("/logged");
                } 
            }

        });

    } catch (err) {
        if (err) {
            res.status(401).render("login.hbs", {
                message: "USERNAME OR PASSWORD INCORRECT"
            })
        }
    }

}

exports.insertMood = (req, res)=>{
    console.log(req.body);
    const MyMood = req.body.txtMyMood;
    
    var contador;

    if (MyMood == "") {
        console.log("HAHAHA HUBO UN ERROR")
    }
    else{
        db.query("SELECT * FROM MoodCount WHERE Mood = ?", [MyMood], (error, results) =>{
            if(error){
                console.log(error);
            }
            else if(results.length > 0){
                contador = results[0].Contador + 1;
            } 

            db.query("Update MoodCount SET Contador = ? Where Mood = ?", [contador, MyMood], (error, results) =>{
                if (error) {
                    console.log(error)
                }
                else{
                    console.log("Felicidades perro hiciste tu primer update :D");
                }
            })
        });

    }
    
}

exports.spotifyApi = (req,res)=>{
    
    res.redirect("http://ec2-35-172-193-27.compute-1.amazonaws.com:3000")
}



exports.Dashboard = (req, res)=>{

    try {        
        db.query("SELECT * FROM MoodCount", (err, results) =>{
  
            var Sad = results[0].Contador;
            var Fear = results[1].Contador;
            var Confused = results[2].Contador;
            var Calm = results[3].Contador;
            var Disgusted = results[4].Contador;
            var Surprised = results[5].Contador;
            var Angry = results[6].Contador;
            var Happy = results[7].Contador;


            res.render("Admin.hbs", {
                Sad: Sad,
                Fear: Fear,
                Confused: Confused,
                Calm: Calm,
                Disgusted: Disgusted,
                Surprised: Surprised,
                Angry: Angry,
                Happy: Happy
            })
        });

    } catch (err) {
        console.log("Roma no me ayudo en nada :(")
    }

}
