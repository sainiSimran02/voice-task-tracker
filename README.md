# 📘 Voice-Enabled Task Tracker

A smart task management system where users can **speak their tasks**,
and the system automatically extracts the **title**, **priority**, **due
date**, and **status**.

------------------------------------------------------------------------

## 1. Project Setup

### 1.a. Prerequisites

#### Node.js

-   Version: v18+

```{=html}
<!-- -->
```
    node -v

#### MongoDB (Atlas)

-   Connection string:

```{=html}
<!-- -->
```
    mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/voice_tasks

------------------------------------------------------------------------

### 1.b. Install Steps

#### Backend Setup

    cd backend
    npm install

Create `.env`:

    PORT=5000
    MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@cluster.mongodb.net/voice_tasks

Run:

    npm run dev

#### Frontend Setup

    cd frontend
    npm install

Create `.env`:

    REACT_APP_API_BASE=http://localhost:5000/api

Run:

    npm start

------------------------------------------------------------------------

### 1.c. Email Configuration (Optional)

    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=<EMAIL>
    EMAIL_PASS=<APP_PASSWORD>

------------------------------------------------------------------------

### 1.d. Run Locally

  Component   Command
  ----------- -----------------------
  Backend     npm run dev
  Frontend    npm start
  App         http://localhost:3000

------------------------------------------------------------------------

### 1.e. Seed Data

    node seed.js

------------------------------------------------------------------------

## 2. Tech Stack

-   React, Axios, SpeechRecognition API
-   Node.js, Express.js, MongoDB
-   chrono-node (NLP)
-   Nodemailer (optional)

------------------------------------------------------------------------

## 3. 📡 API Documentation

### GET /api/tasks

Returns all tasks.

### POST /api/tasks

Creates a task.

### PUT /api/tasks/:id

Updates a task.

### DELETE /api/tasks/:id

Deletes a task.

### POST /api/tasks/voice/parse

Parses voice transcript.

------------------------------------------------------------------------

## 4. Decisions & Assumptions

-   NLP using chrono-node + regex
-   Status defaults to "To Do"
-   Evening = 6 PM, Morning = 9 AM

------------------------------------------------------------------------

## 5. AI Tools Usage

-   ChatGPT, Copilot for debugging and boilerplate
-   Prompts used for parser logic and bug fixing
