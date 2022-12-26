const express = require("express");
//for creating a router
const router = new express.Router();
const Messages = require("../models/message");
const multer = require("multer");
var passport = require("passport");
const downloadfiles = require("../controllers/downloadingfile");
const {
  addingmessage,
  getAllmessage,
  fileUpload,
} = require("../controllers/messageController");
const userController = require("../controllers/userController");
require("../passports.js")(passport);
require("dotenv").config();

//we will handle post requests
router.post("/message", addingmessage);

// we will handle get requests  and varify token by passport
router.get(
  "/message",
  passport.authenticate("jwt", { session: false }),
  getAllmessage
);

//handle post requests for sign-up in user
router.post("/signup", userController.addingUser);

//handle post requests for sign-up in user
router.post("/signin", userController.signingUser);

//handle download file
router.get("/download/file/", downloadfiles.downloadfile);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

//we will handle post requests for the uploads
router.post("/chat/upload", async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.json({ success: false, err });
      console.log("999999", err);
    }
    const addingmessage = new Messages({
      sms: res.req.file.path,
      sender: "Mohit",
      receiver: "Faizan",
    });

    addingmessage.save();
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.originalname,
    });
  });
});
//router.post('/chat/upload', fileUpload)

router.get("/", async (req, res) => {
  res.send("Hello World!");
});

module.exports = router;

//we will handle get requests  and varify token manually
//   router.get('/message',varifyToken,async (req, res) => {
//   try {
//        console.log("sms-sms",req.headers.authorization.split(' ')[1])
//        const getMessage = await Messages.find({});
//        res.send(getMessage);
//   }catch(e){
//       res.status(400).send(e);
//   }
// })

//for varification jwt manually
// function varifyToken(req,res,next){
//   token = req.headers.authorization.split(' ')[1];;
//    jwt.verify(token,JWT_SECRET,(err,valid)=>{
//        if(err){
//         res.send({result:"Please Provide valid token"})
//        }else{
//         console.log("905",valid)
//         next();
//        }
//    })

// }
