import React from 'react';
import { BottomNavigation, Link } from '@mui/material';

function Footer() {
  return (
    <BottomNavigation
      sx={{
        width: '100%',
        position: 'relative',
        left: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-around',
        height: '2rem',
        fontSize: 14,
      }}
    >
      <Link
        href="https://www.panteion.gr/2022/04/radio-panteion/"
        target="_blank"
      >
        Radio Panteion website
      </Link>
      <Link
        href="https://github.com/Lefteris2993/radio-panteio-unofficial"
        target="_blank"
      >
        GitHub
      </Link>
    </BottomNavigation>
  );
}

export default Footer;
