const db = require("../database/database");
const bcrypt = require('bcryptjs');

const requet = class {
    static VerifUserUniqu = (into)=>{
       return new Promise((resolve,reject)=>{
        let{email}=into;
      let  sqle = "SELECT * FROM `users` WHERE `email`= ? ";
        db.query(sqle,[into],(error,result)=>{
            if (result=='') {
               
                resolve({message:'success'})
            } else {
                reject({message:'deja inscrit ,essayé avec une autre adresse mail ! '})
            }
        })
       })

    }

    static InsertionUser = (into)=>{
       
        let password = bcrypt.hashSync(into.password, 10);
        let{nom,prenom,email,genre,nce,numero}=into;
        let sql= "INSERT INTO `users`( `nom`, `prenom`, `email`, `genre`, `nce`, `numero`, `password`) VALUES (?,?,?,?,?,?,?)";
        db.query(sql,[nom,prenom,email,genre,nce,numero,password],(error,result)=>{
            if (result) {
                return result;
                
            } else {
                return error;
            }

        })

        // console.log('resssbodyyyy',password)
    }

    static connectUser = (into) =>{
      
       return new Promise ((resolve,reject) =>{
        let{email,password}=into;
        let sql =`SELECT * FROM users WHERE email = ?`;
             db.query(sql,[email],(err,result) =>{
            if (result) {
                resolve(result)   
            } else {
                console.log("errrrorrr",err);
                reject({message:'Email ou le Mot de passe incorrect !'})   
            }
        })
        })
       
    }
}


module.exports= requet;