# REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR

COMPANY: CODTECH IT SOLUTIONS PVT.LTD

NAME: Naveenaya R

INTERN ID: CT04DY2193

DOMAIN: FULL STACK WEB DEVELOPMENT

DURATION: 4 WEEKS

MENTOR: NEELA SANTHOSH KUMAR

# INTRODUCTION -

In today's interconnected world, seamless collaboration on documents among multiple users is essential for productivity and efficiency. The Real-Time Collaborative Document Editor is a cutting-edge application designed to facilitate simultaneous editing of shared documents by multiple users in real time. This project harnesses the power of modern web technologies, including NestJS for the backend, WebSocket for real-time communication, and robust authentication mechanisms to ensure data security and user privacy

# KEY-FEATURES ->

1.Real-Time Collaboration
2.Document & users management
3.Identification/mapping of websocket client with database user
4.Authentication & Authorization
5.Conflict Resolution
6.Persistence
7.Maintaining DTO’s (Data Transfer Object)
8.Class-Validator & Class-Transformer

# TECHNOLOGY STACK ->

- Frontend : ReactJS, state management(ContextAPI), TailwindCSS
- Backend : NestJS, WebSockets Gateway, Socket.io-client, Mongoose, Mongo-Atlas, JWT(JSON web token - HMAC with SHA-256), Typescript

  # PROJECT STRUCTURE ->

  Realtime-collaborative-doc-editor/ │ ├── src/ │ ├── app.module.ts // Main module │ ├── document/ // Document module │ │ ├── document.controller.ts // Document controller │ │ ├── document.service.ts // Document service │ │ ├── document.entity.ts // Document entity (Mongoose) │ │ └── document.module.ts // Document module definition │ │ │ ├── auth/ // Authentication module │ │ ├── auth.controller.ts // Auth controller (login, register) │ │ ├── auth.service.ts // Auth service (JWT authentication) │ │ └── auth.module.ts // Auth module definition │ │ └── jwt.strategy.ts │ │ └── guards │ │ ├── jwt-guards.auth.ts // JWT guard for authentication │ │ │ ├── user/ // User module │ │ ├── user.controller.ts // User controller │ │ ├── user.service.ts // User service │ │ ├── user.entity.ts // User entity (Mongoose) │ │ └── user.module.ts // User module definition │ ├── socket.gateway.ts // WebSocket gateway │ │ │ └── main.ts // Entry point for the application ├── .env // Environment variables └── package.json // Project dependencies and scripts

  # OUTPUT

  ![Screenshot (19)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/4e9c93d3-9b8d-4170-8683-41b3c9cdf44d)

  ![Screenshot (21)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/d8d46bcc-af22-40d3-964e-707766b51522)

![Screenshot (22)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/37f102ba-e5d4-4083-8b7f-660db28e2cb9)


![Screenshot (26)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/bec637a6-c544-4f26-877b-5cd6dc594647)


![Screenshot (28)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/ee8a2558-3320-40be-9f96-b40d3f5e2c16)


![Screenshot (33)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/b7bea3c8-584d-4247-924f-dbe96bc2bd24)


![Screenshot (35)](https://github.com/tikhepooja11/Realtime-collaborative-document-editing-app/assets/47672660/179da481-b196-410e-a4ce-d56cd1b43442)
