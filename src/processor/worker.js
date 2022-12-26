const downloadFileQueue = require("../config/queue");
const path = require("path");
const fs = require("fs");

function workers() {
  try {
    downloadFileQueue.process(async (job, done) => {
      console.log(`${job.id} ---> `, job.data.sms);
      fs.readFile(
        `${path.dirname(__filename)}/../../upload/${job.data.sms}`,
        (err, data) => {
          console.log("filename", data);

          socketInstance.emit("file-download", data);
        }
      );

      done();
    });
  } catch (error) {
    console.log("Error in workers ", error);
  }
}

downloadFileQueue.on("completed", (job) => {
  console.log(`${job.id} completed`);
});

module.exports = workers;
