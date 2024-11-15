// src/app/dashboard/page.tsx
"use client"; // Ce composant est rendu côté client

import { Card, CardContent, CardActions, Button, Typography, Grid, Container, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import Link from "next/link";

// TypeScript interface for blog type
interface Post {
    postId: number;
    title: string;
    body: string;
}

const Dashboard: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter()
    const fetchRecords = async () => {
        try {
            const res = await fetch("http://localhost:3000/posts")
            const data = await res.json()
            setPosts(data)
        } catch (error) {

        }
        finally {
            setLoading(false); // Arrête le chargement après la récupération des posts
        }
    }
    useEffect(() => {
        fetchRecords();
    })
    useEffect(() => {
        const showdashboard = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
            }
        }
        showdashboard();
    })
    return (
        <div>
            <Container>
                <Header />
                <Container sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                        Blogs
                    </Typography>
                    {loading ?
                        (<CircularProgress />)
                        :
                        <Grid container spacing={3}>
                            {posts.map((post) => (
                                <Grid item xs={12} sm={6} md={4} key={post.postId}>
                                    <Card elevation={3} sx={{ backgroundColor: '#f7f7f7' }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" gutterBottom>
                                                {post.title}
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                {post.body}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Link href={`/post/${post.postId}?mode=show`}>
                                                <Button size="small" color="primary">
                                                    Read More
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    }

                </Container>
            </Container>
        </div>
    );
};

export default Dashboard;
