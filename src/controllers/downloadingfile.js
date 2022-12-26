const queue = require("../config/queue");

exports.downloadfile = async (req, res) => {
  let sms = req.query.download.replace("upload/", "");
//   console.log("coming...", sms);
  try {
    res.status(200).json({ message: "All queue added" });
    await queue.add({ sms: sms });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
