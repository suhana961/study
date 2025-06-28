import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ user, groups = [], onLeaveGroup }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        contactNumber: ''
    });
    const [myGroups, setMyGroups] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!user) {
            navigate('/login');
            return;
        }

        // Set profile data from user prop
        setProfile({
            name: user.name || '',
            email: user.email || '',
            contactNumber: user.contactNumber || ''
        });

        // Filter groups where user is a member
        const userGroups = groups.filter(group => 
            group.members && group.members.includes(user._id)
        );
        setMyGroups(userGroups);
    }, [user, groups, navigate]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Simulate save operation with validation
        if (!profile.name.trim()) {
            setMessage('Name is required');
            return;
        }
        
        if (!profile.email.trim()) {
            setMessage('Email is required');
            return;
        }

        // Simulate API delay
        setTimeout(() => {
            setIsEditing(false);
            setMessage('Profile updated successfully!');
            console.log('Mock profile update:', profile);
            
            // Clear success message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        }, 500);
    };

    const handleCancel = () => {
        // Reset to original user data
        setProfile({
            name: user.name || '',
            email: user.email || '',
            contactNumber: user.contactNumber || ''
        });
        setIsEditing(false);
        setMessage('');
    };

    const leaveGroup = (groupId) => {
        // Confirm before leaving
        if (window.confirm('Are you sure you want to leave this group?')) {
            // Update local state immediately for better UX
            setMyGroups(prevGroups => prevGroups.filter(group => group._id !== groupId));
            
            // Call parent handler if provided
            if (onLeaveGroup) {
                onLeaveGroup(groupId);
            }
            
            setMessage('Left group successfully!');
            
            // Clear message after 3 seconds
            setTimeout(() => setMessage(''), 3000);
        }
    };

    // Show loading or redirect message if no user
    if (!user) {
        return (
            <Box sx={{ padding: 3 }}>
                <Typography variant="h6">
                    Please log in to view your profile.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 800, mx: 'auto' }}>
            {message && (
                <Alert 
                    severity={message.includes('successfully') ? 'success' : 'error'} 
                    sx={{ mb: 2 }}
                    onClose={() => setMessage('')}
                >
                    {message}
                </Alert>
            )}

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        My Profile
                    </Typography>
                    
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        value={profile.name}
                        onChange={handleChange}
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        name="contactNumber"
                        label="Contact Number"
                        value={profile.contactNumber}
                        onChange={handleChange}
                        margin="normal"
                        disabled={!isEditing}
                    />
                    
                    <Box sx={{ mt: 2 }}>
                        {isEditing ? (
                            <>
                                <Button 
                                    variant="contained" 
                                    onClick={handleSave}
                                    sx={{ mr: 2 }}
                                >
                                    Save Changes
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button 
                                variant="outlined" 
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        My Study Groups ({myGroups.length})
                    </Typography>
                    
                    {myGroups.length > 0 ? (
                        <List>
                            {myGroups.map((group) => (
                                <div key={group._id}>
                                    <ListItem
                                        sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <ListItemText
                                            primary={group.title}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        Subject: {group.subject}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2">
                                                        Members: {group.members?.length || 0}/{group.maxMembers || 'No limit'}
                                                    </Typography>
                                                    {group.location && (
                                                        <>
                                                            <br />
                                                            <Typography component="span" variant="body2">
                                                                Location: {group.location}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </>
                                            }
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Button 
                                                variant="outlined" 
                                                size="small"
                                                onClick={() => navigate(`/group/${group._id}`)}
                                            >
                                                View Details
                                            </Button>
                                            <Button 
                                                variant="outlined" 
                                                color="error" 
                                                size="small"
                                                onClick={() => leaveGroup(group._id)}
                                            >
                                                Leave Group
                                            </Button>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                You haven't joined any study groups yet.
                            </Typography>
                            <Button 
                                variant="contained" 
                                onClick={() => navigate('/')}
                                sx={{ mt: 2 }}
                            >
                                Browse Study Groups
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;