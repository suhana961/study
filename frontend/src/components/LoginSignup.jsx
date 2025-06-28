import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TermsAndConditions from './TermsAndConditions';

const LoginSignup = ({ onLogin }) => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [signupForm, setSignupForm] = useState({
        name: '', email: '', contactNumber: '', password: '', confirmPassword: '', termsAccepted: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [termsDialogOpen, setTermsDialogOpen] = useState(false);

    // Mock user accounts for demo
    const mockUsers = [
        { email: 'demo@example.com', password: 'password', name: 'Demo User', role: 'user' },
        { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
        { email: 'student@example.com', password: 'student123', name: 'Student User', role: 'user' }
    ];

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setError('');
    };

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSignupChange = (e) => {
        if (e.target.name === 'termsAccepted') {
            setSignupForm({ ...signupForm, [e.target.name]: e.target.checked });
        } else {
            setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
        }
        setError('');
    };

    const handleLogin = () => {
        if (!loginForm.email || !loginForm.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            // Check against mock users
            const foundUser = mockUsers.find(
                user => user.email === loginForm.email && user.password === loginForm.password
            );

            if (foundUser) {
                const mockUser = {
                    _id: foundUser.role === 'admin' ? 'admin1' : 'user1',
                    name: foundUser.name,
                    email: foundUser.email,
                    contactNumber: '1234567890',
                    role: foundUser.role,
                    isAdmin: foundUser.role === 'admin'
                };
                
                onLogin(mockUser);
                navigate('/');
            } else {
                setError('Invalid credentials. Try: demo@example.com/password or admin@example.com/admin123');
            }
            setLoading(false);
        }, 1000);
    };

    const handleSignup = () => {
        if (!signupForm.name || !signupForm.email || !signupForm.contactNumber || 
            !signupForm.password || !signupForm.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (signupForm.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (!signupForm.termsAccepted) {
            setError('You must accept the Terms and Conditions to register');
            return;
        }

        // Check if email already exists
        const emailExists = mockUsers.some(user => user.email === signupForm.email);
        if (emailExists) {
            setError('Email already registered. Please use a different email.');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            alert('Registration successful! You can now login with your credentials.');
            
            // Add new user to mock users (in a real app, this would be handled by backend)
            mockUsers.push({
                email: signupForm.email,
                password: signupForm.password,
                name: signupForm.name,
                role: 'user'
            });
            
            // Switch to login tab and clear form
            setTabValue(0);
            setSignupForm({
                name: '', email: '', contactNumber: '', password: '', confirmPassword: '', termsAccepted: false
            });
            setLoading(false);
        }, 1000);
    };

    const handleTermsLinkClick = (e) => {
        e.preventDefault();
        setTermsDialogOpen(true);
    };

    const handleTermsAccept = () => {
        setSignupForm({ ...signupForm, termsAccepted: true });
        setTermsDialogOpen(false);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 450, margin: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Study Group Finder
            </Typography>
            
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Login" />
                <Tab label="Sign Up" />
            </Tabs>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {tabValue === 0 && (
                <Box sx={{ mt: 3 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        <strong>Demo Accounts:</strong><br/>
                        User: demo@example.com / password<br/>
                        Admin: admin@example.com / admin123
                    </Alert>
                    
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleLogin} 
                        fullWidth 
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            )}

            {tabValue === 1 && (
                <Box sx={{ mt: 3 }}>
                    <TextField
                        name="name"
                        label="Full Name"
                        value={signupForm.name}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        value={signupForm.email}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        name="contactNumber"
                        label="Contact Number"
                        value={signupForm.contactNumber}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                        helperText="Minimum 6 characters"
                    />
                    <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={signupForm.confirmPassword}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
                        variant="outlined"
                    />
                    
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="termsAccepted"
                                checked={signupForm.termsAccepted}
                                onChange={handleSignupChange}
                                color="primary"
                            />
                        }
                        label={
                            <span>
                                I agree to the{' '}
                                <Link 
                                    href="#" 
                                    onClick={handleTermsLinkClick}
                                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    Terms and Conditions
                                </Link>
                            </span>
                        }
                        sx={{ mt: 2, mb: 2 }}
                    />
                    
                    <Button 
                        variant="contained" 
                        onClick={handleSignup} 
                        fullWidth 
                        size="large"
                        sx={{ mt: 2, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </Box>
            )}

            <TermsAndConditions
                open={termsDialogOpen}
                onClose={() => setTermsDialogOpen(false)}
                onAccept={handleTermsAccept}
            />
        </Box>
    );
};

export default LoginSignup;