import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
    const [form, setForm] = useState({
        title: '',
        subject: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Validate form
        if (!form.title || !form.subject || !form.description) {
            alert('Please fill in all fields');
            return;
        }

        // Mock group creation success
        const mockGroupId = Math.random().toString(36).substr(2, 9);
        console.log('Mock group created:', {
            id: mockGroupId,
            ...form,
            createdAt: new Date().toISOString(),
            status: 'pending'
        });
        
        alert('Study group created successfully! It will be reviewed by admin.');
        
        // Reset form
        setForm({
            title: '',
            subject: '',
            description: ''
        });
        
        // Navigate to home
        navigate('/');
    };

    return (
        <Box sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Create New Study Group
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
                    
                    <Button 
                        variant="contained" 
                        onClick={handleSubmit}
                        sx={{ mt: 2 }}
                        fullWidth
                    >
                        Create Group
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreateGroup;