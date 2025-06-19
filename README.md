# PostNChat

PostNChat is a social media platform that enables users to connect and communicate in real-time. The platform integrates chat functionality with social media features, allowing users to post, share, and chat seamlessly with others. It's built using React for the frontend and Node.js/Express with Socket.io for real-time communication in the backend.

## Features

- Real-time chat using Socket.io
- Post content such as text and  images.
- Interactive user interface built with React
- User authentication and authorization
- Responsive design for mobile and desktop users

## Tech Stack

- **Frontend**: React, Redux, Axios
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB (for storing posts and user data)
- **Environment Variables**: Managed using `.env` files


## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB (or a MongoDB cloud instance)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/clay108/PostNChat.git
   ```
2.Install the dependencies:
  ```bash
    cd PostNChat
    npm install
  ```
3.Create a .env file in the root directory and add the following environment variables:

#for client side
 ```bash
REACT_APP_PUBLIC_FOLDER = http://localhost:5000/images/
REACT_APP_BACKEND_URL = http://localhost:5000
REACT_APP_SOCKET_URL = ws://localhost:8800
REACT_APP_FRONTEND_URL=http://localhost:3000
  ```
#for backend 
 ```bash
 MONGODB_CONNECTION =
 PORT = 5000
 JWTKEY = 
 FRONTEND_URL = http://localhost:3000
  ```
#for socket 
 ```bash
 PORT = 8800
 REACT_APP_FRONTEND_URL = http://localhost:3000
  ```
4.Start the MongoDB server (if running locally):
```bash
mongod
```
5.Run the backend:
```bash
cd backend
npm start

```
6.Run the frontend:
```bash
cd frontend
npm start

```
7.Run the Socket:
```bash
cd socket
npm start

```


