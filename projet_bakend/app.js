
const express = require("express");
const session = require("express-session");
const db = require("./database/database");
const router = require("./routes/route");
const app = express();
require('dotenv').config();




db.connect((err)=>{
    if (!err) {
        console.log('connexion reussie avec la db');
        app.set('view engine','ejs');
        app.set('views','./views')
        app.use(express.static('public'));
        app.use(express.json())
        app.use(express.urlencoded({ extended: false }))
        app.use(session({ 
            secret: process.env.SESSION_SECRET,
             resave: false,
             saveUninitialized: true,
             cookie: { maxAge: 60000000000 }}))
        app.use('/',router)

        
    } else {
        console.log('connection echec ' + JSON.stringify(err , undefined ,2),err); 
    }
})










app.listen(process.env.PORT,()=>{
    console.log(`connection au port ${process.env.PORT}`);
})