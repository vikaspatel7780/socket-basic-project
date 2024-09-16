import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // Get the filename
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on("connection", (socket) => {
    console.log("a new client connected", socket.id);
    socket.on("msg_send", (data)=>{
        console.log(data);
        io.emit("msg_rcvd",data)
    })
});

app.use("/", express.static(path.join(__dirname, "public"))); // Serve static files
server.listen(3000, () => {
  console.log("Server is started on port 3000");
});
