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

const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        contactNumber: ''
    });
    const [myGroups, setMyGroups] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Mock profile data
        const mockProfile = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contactNumber: '1234567890'
        };
        setProfile(mockProfile);

        // Mock groups data
        const mockGroups = [
            {
                _id: '1',
                title: 'Advanced Mathematics Study Group',
                subject: 'Mathematics',
                members: ['user1', 'user2', 'user3']
            },
            {
                _id: '2',  
                title: 'Physics Problem Solving',
                subject: 'Physics',
                members: ['user1', 'user4', 'user5', 'user6']
            },
            {
                _id: '3',
                title: 'Computer Science Fundamentals',
                subject: 'Computer Science',
                members: ['user1', 'user7']
            }
        ];
        setMyGroups(mockGroups);
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        // Simulate save operation
        setTimeout(() => {
            setIsEditing(false);
            alert('Profile updated successfully!');
        }, 500);
    };

    const leaveGroup = async (groupId) => {
        // Simulate leaving group
        setTimeout(() => {
            setMyGroups(prevGroups => prevGroups.filter(group => group._id !== groupId));
            alert('Left group successfully!');
        }, 500);
    };

    return (
        <Box sx={{ padding: 3 }}>
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
                    />
                    
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={profile.email}
                        onChange={handleChange}
                        margin="normal"
                        disabled={!isEditing}
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
                                    Save
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => setIsEditing(false)}
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
                        My Study Groups
                    </Typography>
                    
                    <List>
                        {myGroups.map((group) => (
                            <div key={group._id}>
                                <ListItem>
                                    <ListItemText
                                        primary={group.title}
                                        secondary={`Subject: ${group.subject} | Members: ${group.members?.length || 0}`}
                                    />
                                    <Button 
                                        variant="outlined" 
                                        color="error" 
                                        size="small"
                                        onClick={() => leaveGroup(group._id)}
                                    >
                                        Leave
                                    </Button>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                        {myGroups.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                You haven't joined any groups yet.
                            </Typography>
                        )}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;