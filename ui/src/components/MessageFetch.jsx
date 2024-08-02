import React, { useState, useEffect, useContext } from 'react';
import { Box, Heading, VStack, HStack } from '@chakra-ui/react';
import { MessageContext } from '../context/MessageContext';
import  ComposeMessage  from '../utils/ComposeMessage';

const MessageFetch = () => {
  const { messages, fetchMessages } = useContext(MessageContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        await fetchMessages();
        setLoading(false);
      } catch (error) {
        setError('Failed to load messages');
        setLoading(false);
      }
    };
    loadMessages();
  }, [fetchMessages]);

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
                    <strong>Username: </strong>
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
          <ComposeMessage />
        </HStack>
      </VStack>
    </Box>
  );
};

export default MessageFetch;
