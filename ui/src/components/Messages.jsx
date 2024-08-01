import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Heading, VStack, HStack, Input} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { LoginContext } from '../context/LoginContext';
import './Messages.css'

const MessageFetch =  () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const { user_name } = useContext(LoginContext)

    useEffect(() => {
      console.log('Username from context:', user_name);
    const fetchmessages = async () => {
    
    try {
      const response = await fetch('http://localhost:8080/chats')
        if (response.ok) {
            const data = await response.json();
            setMessages(data);
        } else {
          setError('Failed to fetch messages')
        }
    } catch(error) {
        console.log(messages)
        console.error(error)
      setError('An error occured while attempting to fetch messages')
    } finally {
      setLoading(false)
    }
  };
    fetchmessages();
  }, []);
    
  const handleSendMessage = () => {
    if (newMessage.trim()) {
        setMessages((prevMessages) =>
            [...prevMessages, newMessage]
        );
      setNewMessage('');
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
        borderRadius="1g"    
        boxShadow="1g"
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
        </Box>
      {console.log(messages)}
                {messages.length > 0 ? (
            <VStack spacing={3} align="start">
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {messages.map((message, index) => (
                    <li onClick={() => navigate('/home')}
                    key={index}>
                    <strong>{user_name}: </strong>{message}</li>
              ///for moving to 1-1 chat <li onClick={() => navigate('/chat/message.uuid')} key={index}>{message}</li>
            ))}             
                        </ul>
             </VStack>           
                ) : (
                        <p>No Messages Here</p>
      )}           
        <HStack>
                <Input
                placeholder="Type a message..." 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)} 
                    />
                    <Button  onClick={handleSendMessage}>
                        Send
                    </Button>
        </HStack>
        </VStack >
        </Box>
   )
  
}
export default MessageFetch
