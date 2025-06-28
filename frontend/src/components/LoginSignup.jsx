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

    const handleLogin = async () => {
        if (!loginForm.email || !loginForm.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call delay
        setTimeout(() => {
            // Mock login validation
            if (loginForm.email === 'demo@example.com' && loginForm.password === 'password') {
                const mockUser = {
                    id: '1',
                    name: 'Demo User',
                    email: loginForm.email,
                    contactNumber: '1234567890',
                    role: 'user'
                };
                
                onLogin(mockUser);
                navigate('/');
            } else {
                setError('Invalid credentials. Use demo@example.com / password for demo login.');
            }
            setLoading(false);
        }, 1000);
    };

    const handleSignup = async () => {
        if (!signupForm.name || !signupForm.email || !signupForm.contactNumber || 
            !signupForm.password || !signupForm.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!signupForm.termsAccepted) {
            setError('You must accept the Terms and Conditions to register');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call delay
        setTimeout(() => {
            alert('Registration successful! Please login with your credentials.');
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
        <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', mt: 4 }}>
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
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Demo Login: demo@example.com / password
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
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleLogin} 
                        fullWidth 
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>
            )}

            {tabValue === 1 && (
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <TextField
                        name="name"
                        label="Name"
                        value={signupForm.name}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
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
                    />
                    <TextField
                        name="contactNumber"
                        label="Contact Number"
                        value={signupForm.contactNumber}
                        onChange={handleSignupChange}
                        fullWidth
                        margin="normal"
                        required
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
                        sx={{ mt: 2, mb: 2, textAlign: 'left' }}
                    />
                    
                    <Button 
                        variant="contained" 
                        onClick={handleSignup} 
                        fullWidth 
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
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