import {
  List, ListItem, Paper, Typography,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import React from 'react';

function UsersList() {
  const socket = React.useContext(SocketContext);

  return (
    <Paper
      variant="outlined"
      sx={{
        margin: '2rem',
        padding: '1rem',
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:780px)']: {
          width: '85vw',
        },
      }}
    >
      <Typography variant="h6">
        Online users (
        {socket.usersList.length}
        )
      </Typography>
      <List>
        {socket.usersList.map(
          (user) => (
            <ListItem key={`${user}_${Math.floor(Math.random() * socket.usersList.length)}`}>
              {user}
            </ListItem>
          ),
        )}
      </List>
    </Paper>
  );
}

export default UsersList;
