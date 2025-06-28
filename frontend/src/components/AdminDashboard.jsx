import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AdminDashboard = () => {
    const [tabValue, setTabValue] = useState(0);
    
    // Mock data for groups
    const [groups, setGroups] = useState([
        {
            _id: '1',
            title: 'React Study Group',
            subject: 'Web Development',
            creator: { name: 'Alice Johnson' },
            members: ['1', '2', '3'],
            status: 'pending'
        },
        {
            _id: '2',
            title: 'Machine Learning Basics',
            subject: 'Data Science',
            creator: { name: 'Bob Smith' },
            members: ['1', '2'],
            status: 'approved'
        },
        {
            _id: '3',
            title: 'Python Programming',
            subject: 'Programming',
            creator: { name: 'Carol White' },
            members: ['1'],
            status: 'rejected'
        }
    ]);

    // Mock data for users
    const [users, setUsers] = useState([
        {
            _id: '1',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            contactNumber: '1234567890',
            isBlocked: false
        },
        {
            _id: '2',
            name: 'Bob Smith',
            email: 'bob@example.com',
            contactNumber: '0987654321',
            isBlocked: false
        },
        {
            _id: '3',
            name: 'Carol White',
            email: 'carol@example.com',
            contactNumber: '5555555555',
            isBlocked: true
        }
    ]);

    const approveGroup = (groupId) => {
        setGroups(prevGroups => 
            prevGroups.map(group => 
                group._id === groupId 
                    ? { ...group, status: 'approved' }
                    : group
            )
        );
        alert('Group approved successfully!');
    };

    const rejectGroup = (groupId) => {
        setGroups(prevGroups => 
            prevGroups.map(group => 
                group._id === groupId 
                    ? { ...group, status: 'rejected' }
                    : group
            )
        );
        alert('Group rejected successfully!');
    };

    const toggleUserBlock = (userId, isBlocked) => {
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user._id === userId 
                    ? { ...user, isBlocked: !isBlocked }
                    : user
            )
        );
        alert(`User ${!isBlocked ? 'blocked' : 'unblocked'} successfully!`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'success';
            case 'rejected': return 'error';
            case 'pending': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>

            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                <Tab label="Study Groups" />
                <Tab label="Users" />
            </Tabs>

            {tabValue === 0 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Study Groups Management
                        </Typography>
                        
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell>Creator</TableCell>
                                        <TableCell>Members</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {groups.map((group) => (
                                        <TableRow key={group._id}>
                                            <TableCell>{group.title}</TableCell>
                                            <TableCell>{group.subject}</TableCell>
                                            <TableCell>{group.creator?.name}</TableCell>
                                            <TableCell>{group.members?.length || 0}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={group.status} 
                                                    color={getStatusColor(group.status)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {group.status === 'pending' && (
                                                    <>
                                                        <Button 
                                                            size="small" 
                                                            color="success"
                                                            onClick={() => approveGroup(group._id)}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button 
                                                            size="small" 
                                                            color="error"
                                                            onClick={() => rejectGroup(group._id)}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}

            {tabValue === 1 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Users Management
                        </Typography>
                        
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Contact</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.contactNumber}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={user.isBlocked ? 'Blocked' : 'Active'} 
                                                    color={user.isBlocked ? 'error' : 'success'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button 
                                                    size="small" 
                                                    color={user.isBlocked ? 'success' : 'error'}
                                                    onClick={() => toggleUserBlock(user._id, user.isBlocked)}
                                                >
                                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default AdminDashboard;