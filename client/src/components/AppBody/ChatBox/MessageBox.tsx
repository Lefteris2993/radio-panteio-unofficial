import {
  Box, Paper, Tooltip, Typography,
} from '@mui/material';
import React from 'react';
import { Message } from 'utils/interfaces';

interface MessageBoxProps {
  message: Message
}

function MessageBox({ message }: MessageBoxProps) {
  const getDateTime = () => {
    const date = new Date(message.timestamp);
    return date.toLocaleString();
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 12, marginLeft: '0.5rem', marginBottom: '0.1rem' }}>{message.sender}</Typography>
      <Paper
        sx={{
          background: '#f1f1f1',
          padding: '1rem',
          marginLeft: '1rem',
        }}
      >
        <Tooltip title={getDateTime()} placement="top-end">
          <Typography>{message.message}</Typography>
        </Tooltip>
      </Paper>
    </Box>
  );
}

export default MessageBox;
