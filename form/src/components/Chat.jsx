import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";
import "./Chat.css";




function Chat() {
  const navigate = useNavigate();
  const [myId, setMyId] = useState("");
  const { receiverId } = useParams();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
const [FetchMsg, setFetchMsg] = useState([])
  // Fetch initial user and receiver info onmount
const [userId, setUserId] =useState('')



  

//fetch message

  const fetchMsg = async()=>{



    
    const res = await axios.post('https://mern-chat-backend-xj0t.onrender.com/api/auth/fetchMsg', {receiverId}, {withCredentials:true})
console.log(res)
    if(res.status===200){
      console.log(res)
      setFetchMsg(res.data)
    }
    
  }


  





  
  useEffect(() => {
    
    
    
    


    const fetchUserData = async () => {
      try {
        // Fetch current user details
        const homeRes = await axios.get(
          "https://mern-chat-backend-xj0t.onrender.com/api/auth/Home",
          { withCredentials: true }
        );
        await setMyId(homeRes.data._id)

        // Fetch receiver details
        const userRes = await axios.post(
          "https://mern-chat-backend-xj0t.onrender.com/api/auth/userData",
          { receiverId },
          { withCredentials: true }
        );
        console.log('hello')
        if (userRes.status === 200) {
          console.log(userRes)
                    
                      setUsername(userRes.data.users[0].username)

          
        }
      } catch (err) {
        console.error(err);
        console.log(err.response)
        if (err.response && err.response.status === 401) {
          console.log("Login required");
          navigate("/Login");
        }
      }
    }
//socket connection setup


    



    
    fetchMsg()





    

    fetchUserData();



  

    
  },[]);



useEffect(() => {
  // 1. Agar myId nahi mili hai toh socket connect mat karo
  if (!myId) return;

  // 2. Socket Initialize karo
  

  // 3. Connection Status Check
  

  

  // 4. Live Message Listener
  

  // 5. Cleanup
  
  
}, []);
  const socket = io("https://mern-chat-backend-xj0t.onrender.com", {
    query: { userId: myId }
  });

  socket.on("connect", () => {
    console.log("Connected to Backend Socket!");
  });

  socket.on("newMessage", (newMsg) => {
    console.log("msg comed:", newMsg);

    // Dynamic Check: Message specific receiver ka hi hai ya nahi

    console.log('message emited')
    if (newMsg.senderId == receiverId) {
      console.log("Hello i am a message", newMsg);
      setFetchMsg((prev) => [...prev, newMsg]);
    }
  
  });


  


  

  



  

  // Handler for sending messages
  const handleSend = async () => {
    
    if (!message.trim()) return;

    try {
      console.log("Receiver:", receiverId);
      console.log("Message:", message);

     const res= await axios.post(
        "https://mern-chat-backend-xj0t.onrender.com/api/auth/send",
        { receiverId, message },
        { withCredentials: true }
      );

    
     setFetchMsg((pre)=>[...pre, res.data])

      setMessage(""); // Clear input after sending




    
    } catch (err) {
      console.error("Error sending message:", err);


console.log("hello ")


      
    }

//socket connection

    
    



    
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <button className="chat-back" onClick={() => navigate("/")}>
          ←
        </button>
        <div className="chat-avatar">A</div>
        <div className="chat-user-info">
          <h3>{username}</h3>
          <span>Online</span>
        </div>
        <button
          className="chat-profile"
          onClick={() => navigate("/profile")}
        >
          👤
        </button>
      </div>

      {/* Messages Area */}
            <div className="chat-messages">
              {FetchMsg.map((msg)=>(
      <div className={`message ${msg.senderId === myId ? 'sent' : 'received'}`}>
          <p>{msg.text}</p>
          <span>  {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })}</span>
        </div>
              ))}

        
      </div>

      {/* Message Input Area */}
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}

export default Chat;
