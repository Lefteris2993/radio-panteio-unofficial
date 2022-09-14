import { Send } from '@mui/icons-material';
import {
  Box,
  IconButton, Paper, Stack, TextField, useMediaQuery,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import React from 'react';
import { Message } from 'utils/interfaces';
import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';

function ChatBox() {
  const matches = useMediaQuery('(max-width:780px)');
  const [newMessage, setNewMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const messageScrollBoxRef = React.useRef<HTMLDivElement>(null);
  const messagesRef = React.useRef<Message[]>([]);
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    const subscription = socket
      .newMessages
      .subscribe((message) => {
        if (!messagesRef.current) {
          return;
        }
        setMessages(messagesRef.current.concat(message));
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!socket.connected) {
      return;
    }
    setMessages(socket.initMessages);
  }, [socket.initMessages]);

  React.useEffect(() => {
    messagesRef.current = messages;
    if (messageScrollBoxRef.current) {
      messageScrollBoxRef.current.scrollTop = messageScrollBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSentMessage = () => {
    socket.sentMessage(newMessage.trim());
    setNewMessage('');
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '1rem',
        width: matches ? '85vw' : '70%',
      }}
    >
      { matches && (
      <Box
        sx={{
          margin: '0.1rem',
          padding: '1rem',

        }}
      >
        <ChatHeader />
      </Box>
      ) }
      { socket.connected && (
      <Paper
        ref={messageScrollBoxRef}
        variant="outlined"
        sx={{
          margin: '0.1rem',
          padding: '1rem',
          height: matches ? '20rem' : '40vh',
          minHeight: '20rem',
          maxHeight: '90%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Stack spacing={1} direction="column">
          {messages.map((message) => <MessageBox key={message.timestamp} message={message} />)}
        </Stack>
      </Paper>
      )}
      { socket.connected && (
      <Box
        sx={{
          margin: '0.1rem',
          padding: '1rem',
        }}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={1} direction="row" justifyContent="space-between">
            <TextField
              id="outlined-multiline-flexible"
              label="Sent Message"
              fullWidth
              value={newMessage}
              onChange={handleMessage}
              maxRows={4}
            />
            <IconButton onClick={handleSentMessage} type="submit">
              <Send color="primary" fontSize="large" />
            </IconButton>
          </Stack>
        </form>

      </Box>
      )}
    </Paper>
  );
}

export default ChatBox;
