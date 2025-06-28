import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const [groups, setGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Static mock groups data - no backend connection
        const mockGroups = [
            {
                _id: 'group1',
                title: 'Advanced Mathematics Study Group',
                subject: 'Mathematics', 
                description: 'Calculus, Linear Algebra, and Statistics study sessions',
                members: [
                    { _id: 'user1', name: 'Demo User' },
                    { _id: 'user2', name: 'Alice Johnson' },
                    { _id: 'user3', name: 'Bob Smith' }
                ],
                creator: { _id: 'user2', name: 'Alice Johnson' }
            },
            {
                _id: 'group2',
                title: 'Computer Science Fundamentals',
                subject: 'Computer Science',
                description: 'Data Structures, Algorithms, and Programming concepts',
                members: [
                    { _id: 'user1', name: 'Demo User' },
                    { _id: 'user4', name: 'Carol Davis' }
                ],
                creator: { _id: 'user1', name: 'Demo User' }
            },
            {
                _id: 'group3',
                title: 'Physics Lab Group',
                subject: 'Physics',
                description: 'Experimental physics and lab report discussions',
                members: [
                    { _id: 'user5', name: 'David Wilson' },
                    { _id: 'user6', name: 'Emma Brown' }
                ],
                creator: { _id: 'user5', name: 'David Wilson' }
            },
            {
                _id: 'group4',
                title: 'English Literature Circle',
                subject: 'English',
                description: 'Classic and modern literature analysis and discussion',
                members: [
                    { _id: 'user7', name: 'Frank Miller' }
                ],
                creator: { _id: 'user7', name: 'Frank Miller' }
            },
            {
                _id: 'group5',
                title: 'Chemistry Study Sessions',
                subject: 'Chemistry',
                description: 'Organic and Inorganic Chemistry problem solving',
                members: [
                    { _id: 'user8', name: 'Grace Lee' },
                    { _id: 'user9', name: 'Henry Chen' }
                ],
                creator: { _id: 'user8', name: 'Grace Lee' }
            }
        ];
        
        setGroups(mockGroups);
        // Mock: User is initially in groups 1 and 2
        setUserGroups(['group1', 'group2']);
    }, []);

    const joinGroup = (groupId) => {
        const currentUserId = user?._id || 'user1';
        
        if (!userGroups.includes(groupId)) {
            setUserGroups([...userGroups, groupId]);
            // Update the groups to reflect new member
            setGroups(prevGroups => 
                prevGroups.map(group => 
                    group._id === groupId 
                        ? {
                            ...group,
                            members: [...group.members, { _id: currentUserId, name: user?.name || 'Demo User' }]
                        }
                        : group
                )
            );
            alert('Successfully joined the group!');
        }
    };

    const leaveGroup = (groupId) => {
        const currentUserId = user?._id || 'user1';
        
        if (userGroups.includes(groupId)) {
            setUserGroups(userGroups.filter(id => id !== groupId));
            // Update the groups to remove the member
            setGroups(prevGroups => 
                prevGroups.map(group => 
                    group._id === groupId 
                        ? {
                            ...group,
                            members: group.members.filter(member => member._id !== currentUserId)
                        }
                        : group
                )
            );
            alert('Successfully left the group!');
        }
    };

    const isUserInGroup = (groupId) => {
        return userGroups.includes(groupId);
    };

    const isUserLoggedIn = () => {
        return user !== null;
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Study Groups
            </Typography>
            
            {!user && (
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Please log in to join study groups.
                </Typography>
            )}

            <Grid container spacing={3}>
                {groups.map((group) => (
                    <Grid item xs={12} sm={6} md={4} key={group._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {group.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Subject: {group.subject}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {group.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Members: {group.members.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Created by: {group.creator?.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    onClick={() => navigate(`/group/${group._id}`)}
                                >
                                    View Details
                                </Button>
                                
                                {isUserLoggedIn() && (
                                    isUserInGroup(group._id) ? (
                                        <Button 
                                            size="small" 
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => leaveGroup(group._id)}
                                        >
                                            Leave Group
                                        </Button>
                                    ) : (
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            onClick={() => joinGroup(group._id)}
                                        >
                                            Join Group
                                        </Button>
                                    )
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;