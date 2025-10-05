import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const socket = io("http://localhost:4000");

function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.once("load-document", (doc) => {
      setContent(doc);
    });

    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, []);

  const handleChange = (value) => {
    setContent(value);
    socket.emit("send-changes", value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("save-document", content);
    }, 2000);
    return () => clearInterval(interval);
  }, [content]);

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>📝 Real-Time Collaborative Editor</h1>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder="Start typing..."
        style={{ height: "70vh", background: "#fff" }}
      />
    </div>
  );
}

export default App;
