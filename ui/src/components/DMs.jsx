import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';

const DMs = ({ selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (selectedContact) {
      fetchMessages();
    }
  }, [selectedContact]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${selectedContact.username}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;



    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedContact.username,
          message: newMessage,
        }),
      });
      const data = await response.json();
      setMessages([data, ...messages]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box className="home-messages">
      <VStack spacing={4} align="stretch">
        {messages.length > 0 ? messages.map((msg, index) => (
          <Text key={index} alignSelf={msg.sentByMe ? 'flex-end' : 'flex-start'}>
            {msg.message}
          </Text>
        )) : <Text>Loading...</Text>}
      </VStack>
      <Box mt={4}>
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button mt={2} onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default DMs;

