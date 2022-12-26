const express = require("express");
require("./src/db/connection");
const router = require("./src/routers/router");
var cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
var passport = require("passport");
const worker = require("./src/processor/worker");
global.socketInstance = null;
app = express();
const port = 3000;

const corsOpts = {
  // origin: 'https://localhost:3001',
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.use(express.json());
app.use("/", router);
app.use(passport.initialize());

app.use("/upload", express.static("upload"));

worker();

//socket
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(" user connected", socket.id);
  socketInstance = socket;
  socket.on("send_message", (data) => {
    console.log("13", data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
