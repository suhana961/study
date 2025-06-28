import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';

const EditGroup = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        subject: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentUserId] = useState('user1');

    useEffect(() => {
        fetchGroupDetails();
    }, [id]);

    const fetchGroupDetails = () => {
        // Mock groups data
        const mockGroups = {
            'group1': {
                _id: 'group1',
                title: 'Advanced Mathematics Study Group',
                subject: 'Mathematics',
                description: 'Calculus, Linear Algebra, and Statistics study sessions. We meet twice a week to solve complex problems and help each other understand difficult concepts.',
                creator: { _id: 'user2', name: 'Alice Johnson' }
            },
            'group2': {
                _id: 'group2',
                title: 'Computer Science Fundamentals',
                subject: 'Computer Science',
                description: 'Data Structures, Algorithms, and Programming concepts. Perfect for CS students looking to strengthen their foundation.',
                creator: { _id: 'user1', name: 'Demo User' }
            },
            'group3': {
                _id: 'group3',
                title: 'Physics Lab Group',
                subject: 'Physics',
                description: 'Experimental physics and lab report discussions. Share your experiments and get help with lab reports.',
                creator: { _id: 'user5', name: 'David Wilson' }
            },
            'group4': {
                _id: 'group4',
                title: 'English Literature Circle',
                subject: 'English',
                description: 'Classic and modern literature analysis and discussion. Dive deep into literary works and share interpretations.',
                creator: { _id: 'user7', name: 'Frank Miller' }
            }
        };

        const group = mockGroups[id];
        
        if (!group) {
            setError('Group not found');
            setLoading(false);
            return;
        }

        // Check if current user is the creator
        if (group.creator._id !== currentUserId) {
            setError('You are not authorized to edit this group');
            setLoading(false);
            return;
        }
        
        setForm({
            title: group.title,
            subject: group.subject,
            description: group.description
        });
        setLoading(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Simulate successful update
        alert('Group updated successfully!');
        navigate(`/group/${id}`);
    };

    const handleCancel = () => {
        navigate(`/group/${id}`);
    };

    if (loading) return <div>Loading...</div>;

    if (error) {
        return (
            <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button variant="contained" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Edit Study Group
                    </Typography>
                    
                    <TextField
                        fullWidth
                        name="title"
                        label="Group Title"
                        value={form.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    
                    <TextField
                        fullWidth
                        name="subject"
                        label="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    
                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        value={form.description}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button 
                            variant="contained" 
                            onClick={handleSubmit}
                            sx={{ flex: 1 }}
                        >
                            Update Group
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={handleCancel}
                            sx={{ flex: 1 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EditGroup;