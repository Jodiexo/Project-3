import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Text,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';

const DiscoverGroupChats = () => {
    const [groupChats, setGroupChats] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchGroupChats = async () => {
          const chats = [
            { id: 1, name: 'possom fans' },
            { id: 2, name: 'chakra fans' },
            { id: 3, name: 'react haters' },
            { id: 4, name: 'Matts madhouse' },
          ];
          setGroupChats(chats);
        };
        fetchGroupChats();
      }, []);

  const filteredChats = groupChats.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const fontsize = useBreakpointValue({ base: 'sm', md: 'md' });

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
        Group Chats
      </Heading>
      <Input
        placeholder="Search for group chats"
        mb={4}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
       <VStack spacing={4} align="stretch">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <HStack
              key={chat.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              shadow="md"
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
            >
              <Text fontSize={fontsize}>
                {chat.name}
              </Text>
              <Button
                ml="auto"
                colorScheme="teal"
                variant="outline"
                onClick={() => alert(`Joined ${chat.name}`)}
              >
                Join
              </Button>
            </HStack>
          ))
        ) : (
          <Text>No group chats found</Text>
        )}
      </VStack>
    </Box>
    );
};

export default DiscoverGroupChats;