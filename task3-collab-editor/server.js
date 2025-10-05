import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// ✅ MongoDB connection (replace URI with your own)
mongoose.connect("mongodb://127.0.0.1:27017/codtech-editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// ✅ Schema
const docSchema = new mongoose.Schema({
  content: String
});
const Document = mongoose.model("Document", docSchema);

io.on("connection", async (socket) => {
  console.log("🟢 User connected:", socket.id);
  const docId = "main-document";

  // Load initial content
  let document = await Document.findById(docId);
  if (!document) {
    document = await Document.create({ _id: docId, content: "" });
  }
  socket.join(docId);
  socket.emit("load-document", document.content);

  // Listen for changes
  socket.on("send-changes", (delta) => {
    socket.broadcast.to(docId).emit("receive-changes", delta);
  });

  // Save document
  socket.on("save-document", async (data) => {
    await Document.findByIdAndUpdate(docId, { content: data });
  });

  socket.on("disconnect", () => console.log("🔴 User disconnected:", socket.id));
});

const PORT = 4000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
