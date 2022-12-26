const Messages = require("../models/message");
const multer = require("multer");

const addingmessage = async (req, res) => {
  try {
    const addingmessage = new Messages(req.body);
    console.log("111", addingmessage);
    const insertmessage = await addingmessage.save();
    console.log("222", insertmessage);
    res.status(201).send(insertmessage);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllmessage = async (req, res) => {
  try {
    const getMessage = await Messages.find({});
    res.send(getMessage);
  } catch (error) {
    res.status(400).send(error);
    console.log("5555", error);
  }
};

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

const fileUpload = async (req, res) => {
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
    // console.log("222",res.req)
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.originalname,
    });
  });
};

module.exports = { addingmessage, getAllmessage, fileUpload };
