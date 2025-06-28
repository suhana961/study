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
    // Mock user data for standalone frontend
    const [user, setUser] = useState({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        contactNumber: '1234567890',
        isAdmin: true
    });

    const handleLogin = (userData) => {
        // Mock login - just set the user data
        setUser(userData);
    };

    const handleLogout = () => {
        // Mock logout - reset to default user or null
        setUser(null);
    };

    return (
        <div>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginSignup onLogin={handleLogin} />} />
                <Route path='/group/:id' element={<GroupDetails />} />
                <Route path='/profile' element={<UserProfile />} />
                <Route path='/create-group' element={<CreateGroup />} />
                <Route path='/edit-group/:id' element={<EditGroup />} />
                <Route path='/admin' element={<AdminDashboard />} />
            </Routes>
        </div>
    );
};

export default App;