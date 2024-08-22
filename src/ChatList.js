import React, { useState, useEffect } from 'react';
import './css/chatlist.css';
import useAuth from './useAuth';

function GroupChat() {
  useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState('');
  const loggedinuser = JSON.parse(localStorage.getItem('logdinuser'));

  useEffect(() => {
    // Load chat history from localStorage on component mount
    const storedChatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    setChatHistory(storedChatHistory);
  }, []);

  const handleSendMessage = () => {
    const message = input.trim();
    if (message) {
      const timestamp = new Date().toLocaleString();
      const newMessage = { message, timestamp, username: loggedinuser.username };
      // All messages will be from "Anonymous"
      const updatedChatHistory = [...chatHistory, newMessage];

      setChatHistory(updatedChatHistory);
      localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="group-chat">
      <h1 className="pt-2 pb-3 text-center">Group Chat</h1>

      <div id="chat" className='chat'>
        {chatHistory.map((chat, index) => (
          <div key={index} className="message">
            <strong>{chat.username}:</strong> <span>{chat.message}</span>
            <div className="timestamp">{chat.timestamp}</div>
          </div>
        ))}
      </div>

      <div className="input-group">
        <input type="text" id="input" className="inputname" placeholder="Type your message here..." value={input} onChange={handleInputChange} />
        <button id="sendBtn" className="sendBtn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default GroupChat;
