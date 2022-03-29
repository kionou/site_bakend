const jwt = require('jsonwebtoken');
require('dotenv').config()


const authentification = class {
    static CreerToken = (into)=>{
        let user ={
            nom:into.nom,
            prenom:into.prenom,
            email:into.email,
            genre:into.genre,
            nce:into.nce,
            numero:into.numero,
            password:into.password,
        }
        console.log('rytre',user);
        const token = jwt.sign(user,process.env.TOKEN_SECRET);
        return token
    }

    static VerifierToken = (token)=>{
        try {
            const DecodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
            return DecodedToken
        } catch  {
            console.log('error404');
        }

    }
}

module.exports=authentification