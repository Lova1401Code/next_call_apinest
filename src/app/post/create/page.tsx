"use client"
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react';
import { TextField, Card, CardContent, CardActions, Button, Typography, Grid, Container, CircularProgress, Box, Avatar, Divider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const createPost = () => {
    const router = useRouter()
    const [title, setTitle] = useState<String>();
    const [body, setBody] = useState<String>();
    useEffect(() => {
        const createPost = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
            }
        }
        createPost();
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const res = await fetch("http://localhost:3000/posts/create", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    body
                }),
            })
            if (res.ok) {
                console.log("post created")
                router.push('/dashboard')
            }
        } catch (error) {
            console.log("there is an error :", error)
        }

    }
    return (
        <Container>
            <Header />
            <Grid container justifyContent="center" sx={{ mt: 4 }}>

                <Grid item xs={12} sm={8}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                        Add Post
                    </Typography>
                    <Card elevation={3} sx={{ backgroundColor: '#fff', padding: 3 }}>
                        <form onSubmit={handleSubmit}>
                            {/* Title Field */}
                            <CardContent>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    variant="outlined"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    sx={{ mb: 3 }}
                                />
                            </CardContent>

                            {/* Body Field */}
                            <CardContent>
                                <TextField
                                    fullWidth
                                    label="Body"
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    sx={{ mb: 3 }}
                                />
                            </CardContent>

                            {/* Submit Button */}
                            <Box textAlign="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    add Post
                                </Button>
                            </Box>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
export default createPost;