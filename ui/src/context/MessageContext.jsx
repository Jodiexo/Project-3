import { createContext, useState, useEffect, useContext } from 'react';
import { LoginContext } from './LoginContext';

// Create the MessageContext
const MessageContext = createContext({
  messages: [],
  fetchMessages: async () => {},
  createMessage: async () => {},
  loading: false,
  error: null,
});

// Create a provider component
const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id: userId, isLoggedIn } = useContext(LoginContext); 

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchMessages();
    }
  }, [isLoggedIn, userId]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/messages/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
        setError('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages');
    } finally {
      setLoading(false);
    }
  };

  const createMessage = async (newMessage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      if (response.ok) {
        // Optimally update messages state
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, data]);
      } else {
        console.error('Failed to create message');
        setError('Failed to create message');
      }
    } catch (error) {
      console.error('Error creating message:', error);
      setError('Error creating message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MessageContext.Provider
      value={{ messages, fetchMessages, createMessage, loading, error }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
