const nodemailer = require("nodemailer");
require('dotenv').config()


exports.mailer = (into,token)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail', 
        auth: {
          user: 'kionoumohamed@gmail.com', 
          pass: 'Laloi2015' 
        },
      });
    let lien =`http://localhost:${process.env.PORT}/connection/${token}`
    let mailOptions = {
        from: 'kionoumohamed@gmail.com', 
        to: into, 
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: `<p>Hello world,bonjour Mr ${into},veillez cliquer sur ce lien suivant:  </p> 
                       <a  href="${lien}">confirmer votre email</a> 
                          pour finaliser votre inscription.`  
      };

    
    transporter.sendMail(mailOptions, (error, info)=>{
     if (error) {
      console.log(error);
     } else {
      console.log('success' , info.response);
     }
  }); 
}