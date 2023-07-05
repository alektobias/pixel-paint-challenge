
const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/*
    Every server restart will clear the canvas, if we want to maintain it state 
    we need to improve this data storage system, maybe a database or a file
 */
let canvas = {}; 

let connectedUsers = {}

io.on("connection", (socket ) => {
  io.emit("canvas", canvas);
  io.emit("users", connectedUsers);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete connectedUsers[socket.id]
    io.emit("users", connectedUsers);
  });

  socket.on("joinCanvas", (data) => {
    /*
      Here we should check if the user is already connected 
      and if so, we should not allow him to join the canvas
      and also if user limit is reached, we should not allow him to join
    */
    connectedUsers[socket.id] = {
      id: socket.id,
      name: data.name,
      color: data.color,
    }
    io.emit("users", connectedUsers);
  })
  socket.on("drawOnServer", (data) => {
    if(!connectedUsers[socket.id]) {
      return io.emit("no-user-found", "Please, add your name to continue drawing!")
    }

    canvas[`${data.x}-${data.y}`] = data;
    io.emit("drawOnClient", data);
    connectedUsers[socket.id].color = data.color
    io.emit("users", connectedUsers);
  });
});

server.listen(process.env.PORT || 3001, () =>
  console.info("server is running")
);
