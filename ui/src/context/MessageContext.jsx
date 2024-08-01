import { createContext, useState } from 'react';

const MessageContext = createContext({
  messages: [],
  fetchMessages: () => {},
  createMessage: () => {},
});

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/messages/user/${userId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const createMessage = async (newMessage) => {
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      if (response.ok) {
        fetchMessages(newMessage.sending_id); // Refresh messages after creating a new one
      } else {
        console.error('Failed to create message');
      }
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, fetchMessages, createMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
