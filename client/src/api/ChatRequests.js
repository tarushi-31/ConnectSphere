import axios from 'axios'


const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

export const createChat = (firstId, secondId) => 
    API.post('/chat/', { senderId: firstId, receiverId: secondId }); 
    //console.log(firstId,secondId)

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

//export const addNewUserChat = (firstId,secondId) => API.post(`/chat/${firstId}/${secondId}`);