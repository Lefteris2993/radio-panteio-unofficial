import React from 'react';
import { AppBar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar sx={{ height: '3rem' }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          padding: '0.5rem',
        }}
      >
        Radio Panteion Unofficial Chat
      </Typography>
    </AppBar>
  );
}

export default Header;
