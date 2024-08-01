import React, { createContext, useState, useEffect } from 'react';

const MessageContext = createContext({
  message_id: '',
  message_body: '',
  sending_id: '',
  receiving_id: '',
  chat_id: '',
  setMessage: () => {},
  createMessage: async () => {},
  fetchMessages: async () => {},
  messages: [],
});

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({
    message_id: '',
    message_body: '',
    sending_id: '',
    receiving_id: '',
    chat_id: '',
  });

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages');
      if (!response.ok) {
        console.log(`Failed to fetch messges`);
      }
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const createMessage = async (newMessage) => {
    try {
      console.log('createMessage has been triggered with:', newMessage);
      const response = await fetch('http://localhost:8080/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error('Post request failed');
      }

      const data = await response.json();

      setMessage((prevMessages) => [...prevMessages, data]);

      console.log(data.message);
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };
  return (
    // passing the user props created on line 17 and functions from lines 12/13
    <MessageContext.Provider
      value={{ ...message, setMessage, createMessage, fetchMessages }}
    >{children}

    </MessageContext.Provider>
  );
};
export { MessageContext, MessageProvider };
