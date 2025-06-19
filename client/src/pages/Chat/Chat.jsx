import React, { useRef, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { useEffect } from "react";
import { userChats } from "../../api/ChatRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  //console.log(user);


  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      if (!user || !user._id) {
        console.error("User ID is not available");
        return;
      }
  
      try {
        //console.log("Fetching chats for user ID:", user._id); // Ensure the user._id is correct
        
        // Fetch chats from the backend
        const { data } = await userChats(user._id);
        
        // Check if data exists and is not empty
        if (data && data.length > 0) {
          setChats(data); // Update the state with the fetched chats
         // console.log("Chats fetched successfully:", data); // Log the data
        } else {
          //console.log("No chats found for this user.");
        }
  
      } catch (error) {
        console.error("Error fetching chats:", error); // Better error logging
      }
    };
  
    getChats(); // Call the function
  
  }, [user._id]); // Only re-run if `user` changes
  

  // Connect to Socket.io
 
  useEffect(() => {
    if (user && user._id) {
      // Establish socket connection
      socket.current = io(process.env.REACT_APP_SOCKET_URL);

      // Emit new user event after connection is established
      socket.current.emit("new-user-add", user._id);

      // Listen for 'get-users' event and update online users
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
       // console.log(users); // Log the updated users instead of old state value
      });

      // Clean up the socket connection on component unmount
      return () => {
        if (socket.current && socket.current.connected) {
          // Safely disconnect only if the socket is connected
          socket.current.disconnect();
        }
      };
    }
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);


  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      //console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2 >Chats</h2>
        
          <div className="Chat-list">
            {chats.map((chat) => (
              <div  key={chat._id} 
                onClick={() => {
                  setCurrentChat(chat);
                  //console.log(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
