import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup';
import GroupDetails from './components/GroupDetails';
import UserProfile from './components/UserProfile';
import CreateGroup from './components/CreateGroup';
import EditGroup from './components/EditGroup';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    // Mock user data for standalone frontend - starts as logged in user
    const [user, setUser] = useState({
        _id: 'user1',
        name: 'Demo User',
        email: 'demo@example.com',
        contactNumber: '1234567890',
        role: 'user', // Changed from isAdmin to role for consistency
        isAdmin: false
    });

    const handleLogin = (userData) => {
        // Mock login - set user data based on form input or use default
        const mockUser = {
            _id: userData?.email === 'admin@example.com' ? 'admin1' : 'user1',
            name: userData?.name || 'Demo User',
            email: userData?.email || 'demo@example.com',
            contactNumber: userData?.contactNumber || '1234567890',
            role: userData?.email === 'admin@example.com' ? 'admin' : 'user',
            isAdmin: userData?.email === 'admin@example.com'
        };
        setUser(mockUser);
        console.log('User logged in:', mockUser);
    };

    const handleLogout = () => {
        // Mock logout - clear user data
        setUser(null);
        console.log('User logged out');
    };

    return (
        <div>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path='/' element={<Home user={user} />} />
                <Route path='/login' element={<LoginSignup onLogin={handleLogin} />} />
                <Route path='/group/:id' element={<GroupDetails user={user} />} />
                <Route path='/profile' element={<UserProfile user={user} />} />
                <Route path='/create-group' element={<CreateGroup user={user} />} />
                <Route path='/edit-group/:id' element={<EditGroup user={user} />} />
                <Route path='/admin' element={<AdminDashboard user={user} />} />
            </Routes>
        </div>
    );
};

export default App;