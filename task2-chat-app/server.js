import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ Serve your main file manually
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index1.html"));
});

// ✅ Serve JS and CSS files
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("chat message", (msg) => io.emit("chat message", msg));
  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
