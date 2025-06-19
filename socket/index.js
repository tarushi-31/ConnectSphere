import { Server } from "socket.io"; // Import Server from socket.io
import http from "http"; // Import http to create the server

import dotenv from "dotenv";
dotenv.config();

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_FRONTEND_URL, // Use your environment variable for the frontend URL
    methods: ["GET", "POST"],
  },
});



let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

const PORT = process.env.SOCKET_PORT || 8800; // Use the port from the .env file or default to 8800
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
