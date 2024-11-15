"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Container, Typography, Grid, Card, CardContent, Avatar, CircularProgress, Box } from '@mui/material';

interface User {
    userId: number;
    username: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:3000/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
                setLoading(false);
            } else {
                console.log("Error fetching users");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Container>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                    List of Users
                </Typography>

                {loading ? (
                    <Box textAlign="center" sx={{ mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        {users.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user.userId}>
                                <Card elevation={3} sx={{ backgroundColor: '#f7f7f7', padding: 2 }}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Avatar sx={{ margin: 'auto', mb: 2 }}>
                                            {user.username}
                                        </Avatar>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {user.username}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            {user.email}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Container>
    );
};

export default UserList;
