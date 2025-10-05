const socket = io();

const form = document.getElementById("chat-form");
const input = document.getElementById("message");
const messages = document.getElementById("messages");

let username = prompt("Enter your name:") || "Anonymous";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim()) {
    socket.emit("chat message", {
      user: username,
      text: input.value,
      time: new Date().toLocaleTimeString(),
    });
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${msg.user}</strong> [${msg.time}]: ${msg.text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
