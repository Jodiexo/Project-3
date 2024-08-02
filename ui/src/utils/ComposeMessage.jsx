import React, { useState, useContext } from 'react';
import { Box, Heading, Button, Input, Textarea } from '@chakra-ui/react';
import { MessageContext } from '../context/MessageContext';
import { LoginContext } from '../context/LoginContext';

const ComposeMessage = () => {
  const [messageBody, setMessageBody] = useState('');
  const [recipientUsername, setRecipientUsername] = useState('');
  const [groupChatName, setGroupChatName] = useState('');
  const { createMessage } = useContext(MessageContext);
  const { id: currentUserId } = useContext(LoginContext);

  const handleComposeMessage = async () => {
    if (messageBody.trim()) {
      try {
        let receiving_id = null;
        let groupchat_id = null;

        if (recipientUsername.trim()) {
          const response = await fetch(
            `http://localhost:8080/users/username/${recipientUsername}`,
          );
          if (response.ok) {
            const recipient = await response.json();
            receiving_id = recipient.id;
          } else {
            console.error('Failed to fetch recipient user ID');
            return;
          }
        } else if (groupChatName.trim()) {
          const response = await fetch(
            `http://localhost:8080/group_chats/name/${groupChatName}`,
          );
          if (response.ok) {
            const groupChat = await response.json();
            groupchat_id = groupChat.id;
          } else {
            console.error('Failed to fetch group chat ID');
            return;
          }
        }

        const newMessage = {
          message_body: messageBody,
          receiving_id,
          sending_id: currentUserId,
          groupchat_id,
        };

        await createMessage(newMessage);
        setMessageBody('');
        setRecipientUsername('');
        setGroupChatName('');
      } catch (error) {
        console.error('Error composing message:', error);
      }
    }
  };

  return (
    <Box mt={4}>
      <Heading as="h3" size="md">
        Compose Message
      </Heading>
      <Input
        value={recipientUsername}
        onChange={(e) => setRecipientUsername(e.target.value)}
        placeholder="Recipient Username (leave empty for group chat)"
        mb={2}
      />
      <Input
        value={groupChatName}
        onChange={(e) => setGroupChatName(e.target.value)}
        placeholder="Group Chat Name (leave empty for direct message)"
        mb={2}
      />
      <Textarea
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
        placeholder="Type your message here..."
        mb={2}
      />
      <Button onClick={handleComposeMessage} colorScheme="blue">
        Send
      </Button>
    </Box>
  );
};

export default ComposeMessage;
