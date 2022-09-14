import {
  List, ListItem, Paper, Typography, useMediaQuery,
} from '@mui/material';
import { SocketContext } from 'context/socket';
import React from 'react';

function UsersList() {
  const matches = useMediaQuery('(max-width:780px)');
  const socket = React.useContext(SocketContext);

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '1rem',
        width: matches ? '85vw' : '30%',
        marginLeft: matches ? 0 : 2,
        marginTop: matches ? 2 : 0,
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
            <ListItem key={`${user}_${(Math.random() + 1).toString(36).substring(2)}`}>
              {user}
            </ListItem>
          ),
        )}
      </List>
    </Paper>
  );
}

export default UsersList;
