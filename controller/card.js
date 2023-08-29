const route = require('express').Router()
const nodemailer=require("nodemailer")  
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/tempCard.hbs"), "utf8") 

let transporter = {
    service: 'gmail',
    auth: {
      user: 'promptgenerator2000@gmail.com' ,
      pass: 'Hema@2000',
    }
};

const smtpTransport = nodemailer.createTransport(transporter)
const template = handlebars.compile(emailTemplateSource)


route.post('/newCardMail',(req,res)=>{
    console.log(req.body)
    const htmlToSend = template({address:req.body.address,name:req.body.patientName}) 
    const mailOptions = {
    from:'promptgenerator2000@gmail.com', 
    to:req.body.emailId,  
    subject: 'New Card Details',
    html: htmlToSend
        }  
      smtpTransport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log('gmail')
          console.log(err);
          res.sendStatus(400)
        } 
        else {
            res.send('mail sent')    
            res.sendStatus(200)   
        }
      });
})


module.exports=route