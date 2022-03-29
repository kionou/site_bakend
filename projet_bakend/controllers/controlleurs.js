const bcrypt = require("bcryptjs/dist/bcrypt");
const { request ,response} = require("express");
const { validationResult } = require("express-validator");
const { mailer } = require("../middleware/nodemailer");
const requet = require("../middleware/requette");
const authentification = require("../middleware/token");





const controlleur = class {
    static accueil = (req=request,res=response) =>{
        res.render('index')
    }

    static inscriptionGet =(req=request,res=response) =>{
       
    }

    static inscriptionPost =(req=request,res=response) =>{
      
        const result = validationResult(req)
        if (!result.isEmpty() ) {
            const error = result.mapped()
            console.log('rrfrrkrk',error ); 
             res.render('inscription',{alert:error})

        }else{
            requet.VerifUserUniqu(req.body.email).then(success=>{
                const token= authentification.CreerToken(req.body);
                mailer(req.body.email,token)
                res.redirect('/message')
                  
            }).catch(error=>{
                res.render('inscription',{alert:error})
            })
        }
    }

    static connectionGet =(req=request,res=response) =>{
        if (req.session.user) {
            res.redirect('/profil')
        } 
        return  res.render('connection',{alert:{}})
            
        
    }


    static connectionToken =(req=request,res=response) =>{
             const TokenId = req.params.id;
             const DecodedToken= authentification.VerifierToken(TokenId);
              requet.InsertionUser(DecodedToken)
             console.log('eeee',TokenId,DecodedToken);
             res.redirect('/connection')
    }

    static connectionPost = (req=request,res=response) =>{
        const result = validationResult(req)
        if (!result.isEmpty() ) {
            const error = result.mapped()
            console.log('rrfrrkrk',error ); 

             res.render('connection',{alert:error})

        }else{
            requet.connectUser(req.body).then(success =>{
                let password = req.body.password;
                let  dataUser = {
                     email:success[0].email,
                     hash:success[0].password
              }
              console.log('zerteyet(e',success.email);
               let passwordUser = bcrypt.compareSync(password,dataUser.hash);
              if (  passwordUser) {
                  req.session.user= dataUser;
                  console.log('ma session est :',req.session);
                  res.redirect('/profil')
              } else {
                  console.log('mot de passe incorrect')
                 res.render('connection',{alert:'mot de passe incorrect'}) 
              }


            }).catch(error =>{
                console.log('kevin',error,'dtjtss');
                res.render('connection',{alert:'Email ou le Mot de passe incorrect !'})
            })

        }
    }

    static message = (req=request,res=response) =>{
        res.render('message')
    }

    static profil = (req=request,res=response) =>{
        if (req.session.user) {
             res.render('profil',)
        }else{
            return res.redirect('/connection')
        }
       
    }
    static logout  = (req=request,res=response) =>{
        req.session.destroy();
         res.redirect('/')
    }
}



module.exports= controlleur;