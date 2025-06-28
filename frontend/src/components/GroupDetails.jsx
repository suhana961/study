import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const GroupDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);
    const [currentUserId] = useState('user1');
    const [isUserInGroup, setIsUserInGroup] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchGroupDetails();
        fetchMessages();
    }, [id]);

    const fetchGroupDetails = () => {
        // Mock groups data
        const mockGroups = {
            'group1': {
                _id: 'group1',
                title: 'Advanced Mathematics Study Group',
                subject: 'Mathematics',
                description: 'Calculus, Linear Algebra, and Statistics study sessions. We meet twice a week to solve complex problems and help each other understand difficult concepts.',
                members: [
                    { _id: 'user1', name: 'Demo User' },
                    { _id: 'user2', name: 'Alice Johnson' },
                    { _id: 'user3', name: 'Bob Smith' }
                ],
                creator: { _id: 'user2', name: 'Alice Johnson' }
            },
            'group2': {
                _id: 'group2',
                title: 'Computer Science Fundamentals',
                subject: 'Computer Science',
                description: 'Data Structures, Algorithms, and Programming concepts. Perfect for CS students looking to strengthen their foundation.',
                members: [
                    { _id: 'user1', name: 'Demo User' },
                    { _id: 'user4', name: 'Carol Davis' }
                ],
                creator: { _id: 'user1', name: 'Demo User' }
            },
            'group3': {
                _id: 'group3',
                title: 'Physics Lab Group',
                subject: 'Physics',
                description: 'Experimental physics and lab report discussions. Share your experiments and get help with lab reports.',
                members: [
                    { _id: 'user5', name: 'David Wilson' },
                    { _id: 'user6', name: 'Emma Brown' }
                ],
                creator: { _id: 'user5', name: 'David Wilson' }
            },
            'group4': {
                _id: 'group4',
                title: 'English Literature Circle',
                subject: 'English',
                description: 'Classic and modern literature analysis and discussion. Dive deep into literary works and share interpretations.',
                members: [
                    { _id: 'user7', name: 'Frank Miller' }
                ],
                creator: { _id: 'user7', name: 'Frank Miller' }
            }
        };

        const selectedGroup = mockGroups[id];
        if (selectedGroup) {
            setGroup(selectedGroup);
            // Check if current user is in this group
            setIsUserInGroup(selectedGroup.members.some(member => member._id === currentUserId));
        }
    };

    const fetchMessages = () => {
        // Mock messages data
        const mockMessages = {
            'group1': [
                {
                    _id: 'msg1',
                    message: 'Hey everyone! I uploaded the calculus study notes from last week.',
                    sender: { _id: 'user2', name: 'Alice Johnson' },
                    fileUrl: 'calculus-notes.pdf',
                    createdAt: new Date('2025-06-25T10:30:00Z')
                },
                {
                    _id: 'msg2',
                    message: 'Thanks Alice! Can someone explain the integration by parts method?',
                    sender: { _id: 'user3', name: 'Bob Smith' },
                    createdAt: new Date('2025-06-25T14:15:00Z')
                },
                {
                    _id: 'msg3',
                    message: 'Sure! Integration by parts uses the formula: ∫u dv = uv - ∫v du',
                    sender: { _id: 'user1', name: 'Demo User' },
                    createdAt: new Date('2025-06-25T16:45:00Z')
                }
            ],
            'group2': [
                {
                    _id: 'msg4',
                    message: 'Working on binary trees today. Anyone want to practice together?',
                    sender: { _id: 'user1', name: 'Demo User' },
                    createdAt: new Date('2025-06-26T09:00:00Z')
                },
                {
                    _id: 'msg5',
                    message: 'I\'m in! Let\'s meet at the library.',
                    sender: { _id: 'user4', name: 'Carol Davis' },
                    createdAt: new Date('2025-06-26T09:15:00Z')
                }
            ]
        };

        setMessages(mockMessages[id] || []);
    };

    const joinGroup = () => {
        if (!isUserInGroup) {
            const updatedGroup = {
                ...group,
                members: [...group.members, { _id: currentUserId, name: 'Demo User' }]
            };
            setGroup(updatedGroup);
            setIsUserInGroup(true);
            alert('Joined group successfully!');
        }
    };

    const leaveGroup = () => {
        if (isUserInGroup) {
            const updatedGroup = {
                ...group,
                members: group.members.filter(member => member._id !== currentUserId)
            };
            setGroup(updatedGroup);
            setIsUserInGroup(false);
            alert('Left group successfully!');
        }
    };

    const handleEditGroup = () => {
        navigate(`/edit-group/${id}`);
    };

    const handleDeleteGroup = () => {
        alert('Group deleted successfully!');
        navigate('/');
        setDeleteDialogOpen(false);
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                _id: `msg${Date.now()}`,
                message: newMessage,
                sender: { _id: currentUserId, name: 'Demo User' },
                fileUrl: file ? file.name : null,
                createdAt: new Date()
            };
            
            setMessages([...messages, newMsg]);
            setNewMessage('');
            setFile(null);
            alert('Message sent successfully!');
        }
    };

    const isUserLoggedIn = () => {
        return true; // Always logged in for demo
    };

    const isGroupCreator = () => {
        return currentUserId && group && group.creator && group.creator._id === currentUserId;
    };

    if (!group) return <div>Loading...</div>;

    return (
        <Box sx={{ padding: 3 }}>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {group.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Subject: {group.subject}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {group.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Created by: {group.creator?.name}
                    </Typography>
                    <Typography variant="body2">
                        Members: {group.members?.length || 0}
                    </Typography>
                    
                    {/* Action Buttons */}
                    <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {/* Join/Leave Group Button */}
                        {isUserLoggedIn() && !isGroupCreator() && (
                            <>
                                {isUserInGroup ? (
                                    <Button 
                                        variant="outlined" 
                                        color="secondary"
                                        onClick={leaveGroup}
                                    >
                                        Leave Group
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="contained" 
                                        onClick={joinGroup}
                                    >
                                        Join Group
                                    </Button>
                                )}
                            </>
                        )}
                        
                        {/* Edit/Delete Buttons - Only for Group Creator */}
                        {isGroupCreator() && (
                            <>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={handleEditGroup}
                                >
                                    Edit Group
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => setDeleteDialogOpen(true)}
                                >
                                    Delete Group
                                </Button>
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>

            {/* Messages Section - Only show if user is in group */}
            {isUserInGroup ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Group Messages & Materials
                        </Typography>
                        
                        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                            {messages.map((message) => (
                                <div key={message._id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={message.sender?.name}
                                            secondary={
                                                <>
                                                    <Typography variant="body2">
                                                        {message.message}
                                                    </Typography>
                                                    {message.fileUrl && (
                                                        <Typography variant="caption" color="primary">
                                                            📎 {message.fileUrl}
                                                        </Typography>
                                                    )}
                                                    <Typography variant="caption" display="block">
                                                        {new Date(message.createdAt).toLocaleString()}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </div>
                            ))}
                        </List>

                        <Box sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Send a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ marginBottom: '10px' }}
                            />
                            
                            <Button 
                                variant="contained" 
                                onClick={sendMessage}
                                disabled={!newMessage.trim()}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent>
                        <Alert severity="info">
                            You need to join this group to view messages and participate in discussions.
                        </Alert>
                    </CardContent>
                </Card>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this group? This action cannot be undone.
                        All messages and materials will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteGroup} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GroupDetails;