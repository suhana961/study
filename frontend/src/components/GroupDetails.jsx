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
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const GroupDetails = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUserInGroup, setIsUserInGroup] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Mock data - this would normally come from your backend
    const mockGroups = {
        'group1': {
            _id: 'group1',
            title: 'Advanced Mathematics Study Group',
            subject: 'Mathematics',
            description: 'Calculus, Linear Algebra, and Statistics study sessions. We meet twice a week to solve complex problems and help each other understand difficult concepts.',
            members: [
                { _id: 'user1', name: 'Demo User', email: 'demo@example.com' },
                { _id: 'user2', name: 'Alice Johnson', email: 'alice@example.com' },
                { _id: 'user3', name: 'Bob Smith', email: 'bob@example.com' }
            ],
            creator: { _id: 'user2', name: 'Alice Johnson' },
            createdAt: '2025-06-01T10:00:00Z'
        },
        'group2': {
            _id: 'group2',
            title: 'Computer Science Fundamentals',
            subject: 'Computer Science',
            description: 'Data Structures, Algorithms, and Programming concepts. Perfect for CS students looking to strengthen their foundation.',
            members: [
                { _id: 'user1', name: 'Demo User', email: 'demo@example.com' },
                { _id: 'user4', name: 'Carol Davis', email: 'carol@example.com' }
            ],
            creator: { _id: 'user1', name: 'Demo User' },
            createdAt: '2025-06-05T14:30:00Z'
        },
        'group3': {
            _id: 'group3',
            title: 'Physics Lab Group',
            subject: 'Physics',
            description: 'Experimental physics and lab report discussions. Share your experiments and get help with lab reports.',
            members: [
                { _id: 'user5', name: 'David Wilson', email: 'david@example.com' },
                { _id: 'user6', name: 'Emma Brown', email: 'emma@example.com' }
            ],
            creator: { _id: 'user5', name: 'David Wilson' },
            createdAt: '2025-06-10T09:15:00Z'
        },
        'group4': {
            _id: 'group4',
            title: 'English Literature Circle',
            subject: 'English',
            description: 'Classic and modern literature analysis and discussion. Dive deep into literary works and share interpretations.',
            members: [
                { _id: 'user7', name: 'Frank Miller', email: 'frank@example.com' }
            ],
            creator: { _id: 'user7', name: 'Frank Miller' },
            createdAt: '2025-06-15T16:45:00Z'
        }
    };

    const mockMessages = {
        'group1': [
            {
                _id: 'msg1',
                message: 'Hey everyone! I uploaded the calculus study notes from last week.',
                sender: { _id: 'user2', name: 'Alice Johnson' },
                fileName: 'calculus-notes.pdf',
                createdAt: '2025-06-25T10:30:00Z'
            },
            {
                _id: 'msg2',
                message: 'Thanks Alice! Can someone explain the integration by parts method?',
                sender: { _id: 'user3', name: 'Bob Smith' },
                createdAt: '2025-06-25T14:15:00Z'
            },
            {
                _id: 'msg3',
                message: 'Sure! Integration by parts uses the formula: ∫u dv = uv - ∫v du. The key is choosing u and dv wisely.',
                sender: { _id: 'user1', name: 'Demo User' },
                createdAt: '2025-06-25T16:45:00Z'
            }
        ],
        'group2': [
            {
                _id: 'msg4',
                message: 'Working on binary trees today. Anyone want to practice together?',
                sender: { _id: 'user1', name: 'Demo User' },
                createdAt: '2025-06-26T09:00:00Z'
            },
            {
                _id: 'msg5',
                message: 'I\'m in! Let\'s meet at the library at 3 PM.',
                sender: { _id: 'user4', name: 'Carol Davis' },
                fileName: 'binary-tree-exercises.pdf',
                createdAt: '2025-06-26T09:15:00Z'
            }
        ],
        'group3': [
            {
                _id: 'msg6',
                message: 'Lab report deadline is next week. Anyone need help with the calculations?',
                sender: { _id: 'user5', name: 'David Wilson' },
                createdAt: '2025-06-27T11:30:00Z'
            }
        ],
        'group4': [
            {
                _id: 'msg7',
                message: 'Just finished reading "Pride and Prejudice". The character development is incredible!',
                sender: { _id: 'user7', name: 'Frank Miller' },
                createdAt: '2025-06-27T20:00:00Z'
            }
        ]
    };

    useEffect(() => {
        fetchGroupDetails();
        fetchMessages();
    }, [id]);

    const fetchGroupDetails = () => {
        setTimeout(() => {
            const selectedGroup = mockGroups[id];
            if (selectedGroup) {
                setGroup(selectedGroup);
                // Check if current user is in this group
                if (user) {
                    setIsUserInGroup(selectedGroup.members.some(member => member._id === user._id));
                }
            }
            setLoading(false);
        }, 300);
    };

    const fetchMessages = () => {
        setMessages(mockMessages[id] || []);
    };

    const joinGroup = () => {
        if (!user) {
            alert('Please login to join groups');
            navigate('/login');
            return;
        }

        if (!isUserInGroup && group) {
            const updatedGroup = {
                ...group,
                members: [...group.members, { _id: user._id, name: user.name, email: user.email }]
            };
            setGroup(updatedGroup);
            setIsUserInGroup(true);
            console.log('Joined group:', id);
            alert('Successfully joined the group!');
        }
    };

    const leaveGroup = () => {
        if (isUserInGroup && group && user) {
            const updatedGroup = {
                ...group,
                members: group.members.filter(member => member._id !== user._id)
            };
            setGroup(updatedGroup);
            setIsUserInGroup(false);
            console.log('Left group:', id);
            alert('You have left the group.');
        }
    };

    const handleEditGroup = () => {
        navigate(`/edit-group/${id}`);
    };

    const handleDeleteGroup = () => {
        console.log('Group deleted:', id);
        alert('Group deleted successfully!');
        navigate('/');
        setDeleteDialogOpen(false);
    };

    const sendMessage = () => {
        if (!user) {
            alert('Please login to send messages');
            return;
        }

        if (newMessage.trim()) {
            const newMsg = {
                _id: `msg${Date.now()}`,
                message: newMessage,
                sender: { _id: user._id, name: user.name },
                fileName: selectedFile ? selectedFile.name : null,
                createdAt: new Date().toISOString()
            };
            
            setMessages([...messages, newMsg]);
            setNewMessage('');
            setSelectedFile(null);
            // Reset file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
            
            console.log('Message sent:', newMsg);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 10MB for demo)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                e.target.value = '';
                return;
            }
            setSelectedFile(file);
        }
    };

    const isUserLoggedIn = () => {
        return user !== null;
    };

    const isGroupCreator = () => {
        return user && group && group.creator && group.creator._id === user._id;
    };

    if (loading) {
        return (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h6">Loading group details...</Typography>
            </Box>
        );
    }

    if (!group) {
        return (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Group not found
                </Alert>
                <Button variant="contained" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
            {/* Group Information Card */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            {group.title}
                        </Typography>
                        <Chip 
                            label={group.subject} 
                            color="primary" 
                            variant="outlined"
                        />
                    </Box>
                    
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {group.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Created by:</strong> {group.creator?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Members:</strong> {group.members?.length || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Created:</strong> {new Date(group.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>

                    {/* Members List */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Group Members
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {group.members?.map((member) => (
                                <Chip
                                    key={member._id}
                                    avatar={<Avatar sx={{ width: 24, height: 24 }}>{member.name.charAt(0)}</Avatar>}
                                    label={member.name}
                                    variant="outlined"
                                    size="small"
                                />
                            ))}
                        </Box>
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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

                        {!isUserLoggedIn() && (
                            <Button 
                                variant="contained" 
                                onClick={() => navigate('/login')}
                            >
                                Login to Join
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>

            {/* Messages Section */}
            {isUserInGroup ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Group Messages & Materials
                        </Typography>
                        
                        {/* Messages List */}
                        <Box sx={{ maxHeight: 400, overflow: 'auto', mb: 3, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            {messages.length > 0 ? (
                                <List>
                                    {messages.map((message, index) => (
                                        <div key={message._id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                                {message.sender?.name.charAt(0)}
                                                            </Avatar>
                                                            <Typography variant="subtitle2">
                                                                {message.sender?.name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {new Date(message.createdAt).toLocaleString()}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    secondary={
                                                        <Box sx={{ mt: 1 }}>
                                                            <Typography variant="body2">
                                                                {message.message}
                                                            </Typography>
                                                            {message.fileName && (
                                                                <Chip
                                                                    label={`📎 ${message.fileName}`}
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    sx={{ mt: 1 }}
                                                                />
                                                            )}
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {index < messages.length - 1 && <Divider />}
                                        </div>
                                    ))}
                                </List>
                            ) : (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography color="text.secondary">
                                        No messages yet. Be the first to start the conversation!
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Message Input */}
                        <Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Send a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                sx={{ mb: 2 }}
                                placeholder="Share study materials, ask questions, or start a discussion..."
                            />
                            
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="small"
                                >
                                    📎 Attach File
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                    />
                                </Button>
                                
                                {selectedFile && (
                                    <Chip
                                        label={selectedFile.name}
                                        onDelete={() => setSelectedFile(null)}
                                        size="small"
                                    />
                                )}
                            </Box>
                            
                            <Button 
                                variant="contained" 
                                onClick={sendMessage}
                                disabled={!newMessage.trim()}
                                fullWidth
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
                            {isUserLoggedIn() 
                                ? "You need to join this group to view messages and participate in discussions."
                                : "Please login and join this group to view messages and participate in discussions."
                            }
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
                        Are you sure you want to delete "{group.title}"? This action cannot be undone.
                        All messages and materials will be permanently deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteGroup} color="error" variant="contained">
                        Delete Group
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GroupDetails;