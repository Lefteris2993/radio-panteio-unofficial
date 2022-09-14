import { Logout } from '@mui/icons-material';
import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import React from 'react';

const validNameRegex = /^([a-z]*[1-9]*[A-Z]*\.*\@*\-*\_*)+$/;

const validateName = (name: string | undefined) => {
  if (name === undefined || name === '') return false;
  return validNameRegex.test(name);
};

function ChatHeader() {
  const [username, setUsername] = React.useState<string>('');
  const socket = React.useContext(SocketContext);

  const erroredName = () => (username?.length || 0) > 0 && !validateName(username);

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value.trim());
    socket.setUserName(event.target.value.trim());
  };

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

  return (
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-around">
      { socket.connected ? (
        <Box>
          <Typography fontSize="small">
            Connected as:
          </Typography>
          <Typography fontSize="large">{socket.userName}</Typography>
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
        ? (
          <Button onClick={handleLeave} color="primary">
            <Logout fontSize="medium" />
            Leave chat
          </Button>
        )
        : <Button variant="contained" onClick={handleJoin}>Join Chat!</Button> }
    </Stack>
  );
}

export default ChatHeader;
