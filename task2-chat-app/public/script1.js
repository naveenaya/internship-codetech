const socket = io();

// Debug connection
socket.on("connect", () => {
  console.log("✅ Connected to server with ID:", socket.id);
});

const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const messages = document.getElementById("messages");

let username = prompt("Enter your name:") || "Anonymous";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim()) {
    const message = {
      user: username,
      text: input.value,
      time: new Date().toLocaleTimeString(),
    };
    console.log("📤 Sending message:", message);
    socket.emit("chat message", message);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  console.log("📥 Received message:", msg);
  const li = document.createElement("li");
  li.innerHTML = `<strong>${msg.user}</strong> [${msg.time}]: ${msg.text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
