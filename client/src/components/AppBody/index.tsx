import React from 'react';
import {
  Box, Paper, Stack, useMediaQuery,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import AudioPlayer from './AudioPlayer';
import ChatBox from './ChatBox';
import UsersList from './UsersList';
import ChatHeader from './ChatBox/ChatHeader';

function AppBody() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const matches = useMediaQuery('(max-width:780px)');
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
  }, [audioRef.current?.volume]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 6rem)',
        width: '100%',
        paddingTop: '3rem',
      }}
    >
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        marginTop={2}
        sx={{
          width: '90%',
          height: '100%',
        }}
      >
        <AudioPlayer />
        { !matches
        && (
        <Paper
          variant="outlined"
          sx={{
            width: '80%',
          }}
        >
          <Box
            sx={{
              margin: '0.1rem',
              padding: '1rem',

            }}
          >
            <ChatHeader />
          </Box>

        </Paper>
        )}
        { matches ? (
          <>
            <ChatBox />
            { socket.connected && <UsersList />}
          </>
        ) : (
          socket.connected && (
          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            marginTop={2}
            width="80%"
          >
            <ChatBox />
            { socket.connected && <UsersList /> }
          </Stack>
          )
        ) }

      </Stack>
    </Box>

  );
}

export default AppBody;
