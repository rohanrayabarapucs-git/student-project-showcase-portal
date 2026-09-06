# Student Project Showcase Portal

A full-stack web application designed to provide students with a centralized platform to upload, manage, and showcase their academic and technical projects.

## Features

* User Authentication
* Student Registration and Login
* Student Profile Management
* Project Submission
* Project Showcase and Exploration
* My Projects Dashboard
* Faculty/Admin Project Management
* Responsive User Interface

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

## Project Structure

```text
student-project-showcase-portal/
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   └── faculty.html
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the backend directory:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and configure the required environment variables:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

5. Start the server:

```bash
npm start
```

## Future Improvements

* Project likes and comments
* Advanced search and filtering
* Project categories
* Student collaboration
* AI-based project recommendations
* Cloud deployment

## Author

**Rohan Rayabarapu**

Developed as a full-stack web development project.
