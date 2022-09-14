import { Send } from '@mui/icons-material';
import {
  Box,
  Button, IconButton, Paper, Stack, TextField, Typography,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import React from 'react';
import { Message } from 'utils/interfaces';
import MessageBox from './MessageBox';

const validNameRegex = /^([a-z]*[1-9]*[A-Z]*\.*\@*\-*\_*)+$/;

const validateName = (name: string | undefined) => {
  if (name === undefined || name === '') return false;
  return validNameRegex.test(name);
};

function ChatBox() {
  const [username, setUsername] = React.useState<string>('');
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

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.trim());
    socket.setUserName(event.target.value.trim());
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const erroredName = () => (username?.length || 0) > 0 && !validateName(username);

  const handleJoin = () => {
    if (erroredName()) {
      return;
    }
    socket.connect();
  };

  const handleLeave = () => {
    if (!socket.connected) {
      return;
    }
    socket.disconnect();
  };

  const handleSentMessage = () => {
    socket.sentMessage(newMessage.trim());
    setNewMessage('');
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        margin: '2rem',
        padding: '1rem',
        maxWidth: '80%',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:780px)']: {
          maxWidth: 'none',
          width: '85vw',
        },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          margin: '0.1rem',
          padding: '1rem',
        }}
      >
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-around">
          { socket.connected ? (
            <Box>
              <Typography variant="h6">
                Connected as:
              </Typography>
              <Typography variant="h5">{socket.userName}</Typography>
            </Box>
          ) : (
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              value={username}
              onChange={handleUsername}
              error={erroredName()}
              helperText={erroredName() && 'Use only alphanumeric characters and . @ - _'}
            />

          ) }
          { socket.connected
            ? <Button variant="contained" onClick={handleLeave} color="secondary">Leave Chat</Button>
            : <Button variant="contained" onClick={handleJoin} type="submit">Join Chat!</Button> }
        </Stack>
      </Paper>
      { socket.connected && (
      <Paper
        ref={messageScrollBoxRef}
        variant="outlined"
        sx={{
          margin: '0.1rem',
          padding: '1rem',
          height: '20rem',
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
      <Paper
        variant="outlined"
        sx={{
          margin: '0.1rem',
          padding: '1rem',
        }}
      >
        <Stack spacing={1} direction="row" justifyContent="space-between">
          <TextField
            id="outlined-multiline-flexible"
            label="Sent Message"
            multiline
            fullWidth
            value={newMessage}
            onChange={handleMessage}
            maxRows={4}
          />
          <IconButton onClick={handleSentMessage}>
            <Send color="primary" fontSize="large" />
          </IconButton>
        </Stack>
      </Paper>
      )}
    </Paper>
  );
}

export default ChatBox;
