import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Heading, VStack, HStack, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { MessageContext } from '../context/MessageContext';
import './Messages.css';

const Messages = () => {
  const { user_id, createMessage } = useContext(MessageContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const navigate = useNavigate();
  const { user_name } = useContext(LoginContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/chats/${chatId}/messages`,
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          setError('Failed to fetch messages');
        }
      } catch (error) {
        setError('An error occurred while attempting to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMsgObject = {
        chat_id: chatId,
        message_body: newMessage,
        sending_id: user_id,
        recieving_id: '', // You should set this based on the recipient's user ID
      };

      try {
        await createMessage(newMsgObject);
        setMessages((prevMessages) => [...prevMessages, newMsgObject]);
        setNewMessage('');
      } catch (error) {
        setError('Failed to send message');
      }
    }
  };

  if (loading) {
    return <p>LOADING...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" mb={6} textAlign="center">
        Chats
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box
          flex="1"
          borderWidth={1}
          borderRadius="lg"
          overflowY="auto"
          p={1}
          maxH="400px"
          backgroundColor="gray.50"
        >
          {messages.length > 0 ? (
            <VStack spacing={3} align="start">
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {messages.map((message, index) => (
                  <li key={index}>
                    <strong>{user_name}: </strong>
                    {message.message_body}
                  </li>
                ))}
              </ul>
            </VStack>
          ) : (
            <p>No Messages Here</p>
          )}
        </Box>
        <HStack>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Messages;
