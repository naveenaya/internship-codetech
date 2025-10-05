import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ Serve index1.html manually
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index1.html"));
});

// ✅ Serve static files (JS + CSS)
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("📩 Message received:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
