import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

// Express + HTTP server setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // allow React app to connect
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB (you can skip for testing if MongoDB not installed)
mongoose.connect("mongodb://127.0.0.1:27017/codtech-editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const documentSchema = new mongoose.Schema({ content: String });
const Document = mongoose.model("Document", documentSchema);

const DEFAULT_ID = "main-document";

io.on("connection", async (socket) => {
  console.log("🟢 User connected:", socket.id);

  let document = await Document.findById(DEFAULT_ID);
  if (!document) document = await Document.create({ _id: DEFAULT_ID, content: "" });

  socket.join(DEFAULT_ID);
  socket.emit("load-document", document.content);

  socket.on("send-changes", (newContent) => {
    socket.broadcast.to(DEFAULT_ID).emit("receive-changes", newContent);
  });

  socket.on("save-document", async (data) => {
    await Document.findByIdAndUpdate(DEFAULT_ID, { content: data });
  });

  socket.on("disconnect", () => console.log("🔴 User disconnected:", socket.id));
});

const PORT = 4000;
server.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
