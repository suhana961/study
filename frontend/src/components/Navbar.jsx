import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        onLogout();
        handleClose();
        navigate('/');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile');
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={2}>
                <Toolbar>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                            flexGrow: 1, 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover': {
                                opacity: 0.8
                            }
                        }}
                        onClick={handleLogoClick}
                    >
                        📚 Study Group Finder
                    </Typography>
                    
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button 
                            color="inherit" 
                            sx={{ 
                                color: "white",
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            Home
                        </Button>
                    </Link>
                    
                    {user ? (
                        <>
                            <Link to='/create-group' style={{ textDecoration: 'none' }}>
                                <Button 
                                    color="inherit" 
                                    sx={{ 
                                        color: "white",
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    Create Group
                                </Button>
                            </Link>
                            
                            {(user.role === 'admin' || user.isAdmin) && (
                                <Link to='/admin' style={{ textDecoration: 'none' }}>
                                    <Button 
                                        color="inherit" 
                                        sx={{ 
                                            color: "white",
                                            backgroundColor: 'rgba(255, 193, 7, 0.2)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 193, 7, 0.3)'
                                            }
                                        }}
                                    >
                                        Admin Dashboard
                                    </Button>
                                </Link>
                            )}
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                <Typography variant="body2" sx={{ mr: 1, color: 'white' }}>
                                    {user.name}
                                </Typography>
                                <IconButton
                                    size="large"
                                    onClick={handleMenu}
                                    color="inherit"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    <Badge 
                                        color="secondary" 
                                        variant="dot" 
                                        invisible={!user.isAdmin}
                                    >
                                        <AccountCircle />
                                    </Badge>
                                </IconButton>
                            </Box>
                            
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleProfileClick}>
                                    <AccountCircle sx={{ mr: 1 }} />
                                    My Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Button 
                                color="inherit" 
                                variant="outlined"
                                sx={{ 
                                    color: "white",
                                    borderColor: "white",
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: "white"
                                    }
                                }}
                            >
                                Login / Sign Up
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;