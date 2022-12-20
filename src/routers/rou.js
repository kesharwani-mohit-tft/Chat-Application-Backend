
const express = require('express');
//for creating a router
const router = new express.Router();
const Messages = require("../models/mod1")
const User = require("../models/mod2")
const jwt = require("jsonwebtoken");
const multer=require("multer");
const fs = require('fs');
var passport=require('passport');

require('../passports.js')(passport)


require("dotenv").config();
const JWT_SECRET=process.env.JWT_SECRET;



//we will handle post requests
router.post('/mod1', async (req, res) => {
    try {
        const addingmessage = new Messages(req.body)   
       
        const insertmessage= await addingmessage.save()
        res.status(201).send(insertmessage);
    }catch(e){
        res.status(400).send(e);
    }
  })



  //we will handle get requests  and varify token manually 
//   router.get('/mod1',varifyToken,async (req, res) => {
//   try {
//        console.log("sms-sms",req.headers.authorization.split(' ')[1])
//        const getMessage = await Messages.find({});     
//        res.send(getMessage);              
//   }catch(e){
//       res.status(400).send(e);
//   }
// })  


//for varification jwt manually
function varifyToken(req,res,next){
  token = req.headers.authorization.split(' ')[1];;
   jwt.verify(token,JWT_SECRET,(err,valid)=>{
       if(err){
        res.send({result:"Please Provide valid token"})
       }else{
        console.log("905",valid)
        next();        
       }
   })                 
 
}      



// we will handle get requests  and varify token by passport
  router.get('/mod1',passport.authenticate('jwt',{session:false}),async (req, res) => {
  try {
       //console.log("sms-sms",req.headers.authorization.split(' ')[1])
       const getMessage = await Messages.find({});     
       res.send(getMessage);              
  }catch(e){
      res.status(400).send(e);
  }
})  



//handle post requests for sign-in in mod2
router.post('/signup', async (req, res) => {
  try {
      const addingmessage = new User(req.body)    
      console.log( "signup...",req.body);
      const insertmessage= await addingmessage.save()
      res.status(201).send(insertmessage);
  }catch(e){
      res.status(400).send(e);
  }
})


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

    console.log("100",user)
  if (!user) {
    return res.json({ error: "User Not found" }); 
  }
   jwt.sign({email:user.email}, JWT_SECRET,{expiresIn:"2h"},(err,token)=>{
    if(err){
      res.json({result:"some thing went wrong"})
    }
    console.log("Token000  ",token)
    res.json({user,token:token,status: "ok"})
  });
  
  
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix  + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage }).single("file")

//we will handle post requests for the uploads
router.post('/chat/upload', async (req, res) => {
  
    upload(req, res,err=>{
      if(err){
        return res.json({success:false,err})
      }    
      const addingmessage = new Messages({
        sms: res.req.file.path,
        sender: 'Mohit',
        receiver: 'Faizan',
        time: '27-nov-2023'
      })  
     
      addingmessage.save()
      console.log("222",res.req)
      return res.json({success:true,url:res.req.file.path,fileName:res.req.file.originalname});
      
    })    
  
})



  router.get('/', async (req, res) => {
  res.send('Hello World!')
})

module.exports = router;




























  //we will handle patch requests for updatation
//   router.patch('/mod1/:id', async (req, res) => {
//     try {
//         const _id = req.params.id;
//          const getMessage = await Messages.findByIdAndUpdate(_id,req.body,{new:true});     
//         res.send(getMessage);
//     }catch(e){
//         res.status(500).send(e);
//     }
//   })

   //we will handle delete requests for deletions
//    router.delete('/mod1/:id', async (req, res) => {
//     try {
//         const _id = req.params.id;
//          const getMessage = await Messages.findByIdAndDelete(_id);     
//         res.send(getMessage);
//     }catch(e){
//         res.status(500).send(e);
        
//     }
//   })  