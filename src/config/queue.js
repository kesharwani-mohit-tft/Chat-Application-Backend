
const Queue = require('bull');
const downloadFileQueue = new Queue('download_file', { redis: { port: 6379, host:'127.0.0.1'} });


module.exports = downloadFileQueue;