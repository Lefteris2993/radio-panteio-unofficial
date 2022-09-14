import React from 'react';
import {
  Box, Stack,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import AudioPlayer from './AudioPlayer';
import ChatBox from './ChatBox';
import UsersList from './UsersList';

function AppBody() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
  }, [audioRef.current?.volume]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 2rem - 3rem)',
        width: '100%',
        paddingTop: '3rem',
        paddingBottom: '2em',
      }}
    >
      <Stack spacing={2} direction="column" alignItems="center" marginTop={2}>
        <AudioPlayer />
        <ChatBox />
        { socket.connected && <UsersList /> }
      </Stack>
    </Box>

  );
}

export default AppBody;
