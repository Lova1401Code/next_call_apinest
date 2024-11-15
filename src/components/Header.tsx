// src/components/Header.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import BoutonLogout from './BoutonLogout'
import { Menu, MenuItem, IconButton, Typography, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Mon Site
          </Link>
        </Typography>
        <Link href="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button color="inherit">Dashboard</Button>
        </Link>
        <Link href="/users" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button color="inherit">Users</Button>
        </Link>
        <Link href="/post/create" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Button color="inherit">addPost</Button>
        </Link>
        <BoutonLogout />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
