const socketIo = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./index");

const app = express();
app.use(index);
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, { cors: { origin: "*" } });

let interval;

io.on("connection", (socket) => {
  // console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    // console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = async (socket) => {
  try {
    const res = await axios.get(
      "https://www.bitstamp.net/api/v2/order_book/btcusd/"
    ); // Getting the data from DarkSky
    socket.emit("FromAPI", res.data); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
