# Note-Taking API

This is a TypeScript-based API for a note-taking application. It provides functionality for managing notes, categories, and user authentication.

## Features

- **User Authentication:**
  - User registration (sign-up)
  - User login
  - User logout
  
- **Notes:**
  - Create, read, update, delete notes
  - Categorize notes
  
- **Protected Routes:**
  - Authentication middleware to protect routes

## Technologies Used

- **Express.js** for building the API.
- **MongoDB** for storing notes and user data.
- **Mongoose** for object modeling and schema definition.
- **JWT (JSON Web Tokens)** for user authentication and authorization.
- **Joi** for request validation.
- **TypeScript** for type safety and better maintainability.

## Setup

### Prerequisites

- Node.js (preferably the latest stable version)
- MongoDB (or access to a MongoDB database)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
API Endpoints
Authentication Routes
POST /api/auth/register - Register a new user

POST /api/auth/login - Login with email and password

POST /api/auth/logout - Logout the user

Note Routes (Protected)
These routes are protected by JWT authentication, and you must include the JWT token in the Authorization header (Bearer <token>).

GET /api/notes/categories - Get all categories

GET /api/notes - Get all notes

GET /api/notes/:noteId - Get a specific note by its ID

POST /api/notes - Create a new note

POST /api/notes/category - Create a new category

PUT /api/notes/:noteId - Update an existing note by its ID

DELETE /api/notes/:noteId - Delete a specific note by its ID

Server Check
GET /api/ping - A simple endpoint to check if the server is running


