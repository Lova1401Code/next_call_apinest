"use client"
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TextField, Card, CardContent, CardActions, Button, Typography, Grid, Container, CircularProgress, Box, Avatar, Divider } from '@mui/material';
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub: number;
    username: string;
    // Ajoutez d'autres propriétés selon le format de votre JWT
}
type Params = {
    id: number
}
interface Comment {
    commentId: number;
    content: string;
}
interface User {
    id: number;
    username: string;
}

type Post = {
    postId: number;
    title: string;
    body: string;
    userId: number
    user: User;
    comment: Comment[];
};

const page = ({ params }: { params: Params }) => {
    const router = useRouter()
    const id = params.id;
    const searchQuery = useSearchParams();
    const mode = searchQuery.get("mode");
    const [showing, setShowing] = useState<boolean>(mode === "show");
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [userName, setUserName] = useState<string>("");
    const [comment, setComment] = useState<string>("")
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        setShowing(mode === "show")
    }, [mode])

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
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`http://localhost:3000/posts/update/${id}`, {
                method: "PUT",
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
                console.log(res.json())
                router.replace(`/post/${id}?mode=show`);
            }

        } catch (error) {
            console.log("there is an error")
        }
    }

    const fetchPost = async () => {
        try {
            const res = await fetch(`http://localhost:3000/posts/${id}`)
            if (res.ok) {
                const data = await res.json();
                setPost(data);
                setTitle(data.title);
                setBody(data.body);
                setUserName(data.user.userName);
                setComment(data.comments?.length ? data.comments[0].content : "0 comment");
            } else {
                console.log("there is an error loading data");
            }
        } catch (error) {
            console.log("there is an error ", error);
        }
    }

    useEffect(() => {
        const id = getUserId();
        console.log(id)
        setUserId(id);
    }, []);

    useEffect(() => {
        if (showing) {
            fetchPost();
        }
    }, [id, showing]);

    const deletePost = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/posts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.ok) {
                console.log("post deleted succefully")
                router.push('/dashboard')
            } else {
                console.log("error deleting")
            }
        } catch (error) {
            console.error("error request :", error)
        }
    }
    const getUserId = (): number | null => {
        const token = localStorage.getItem("token")
        if (!token) {
            return null;
        }
        try {
            const decoded: DecodedToken = jwtDecode(token);
            console.log(decoded)
            return decoded.sub;
        } catch (error) {
            console.error("error for decoding token :", error)
            return null;
        }
    }
    return (
        <Container>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                    Blog Post
                </Typography>
                {!showing ?
                    (
                        <Grid container justifyContent="center">
                            <Grid item xs={12} sm={8}>
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
                                                Save Changes
                                            </Button>
                                        </Box>
                                    </form>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                    : (
                        post && ( // Vérification que `post` n'est pas null
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={8}>
                                    <Card elevation={3} sx={{ backgroundColor: '#fff', padding: 2 }}>
                                        {/* Post Title */}
                                        <CardContent>
                                            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                {post.title}{post.userId}
                                            </Typography>
                                        </CardContent>

                                        {/* Post Body */}
                                        <CardContent>
                                            <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3 }}>
                                                {post.body}
                                            </Typography>

                                            {/* User Details */}
                                            <Box display="flex" alignItems="center" mb={3}>
                                                <Avatar sx={{ mr: 2 }}>U</Avatar> {/* A simple Avatar with a letter */}
                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                    {post.user.username}
                                                </Typography>
                                            </Box>
                                            <Divider />

                                            {/* Comment Section */}
                                            <Box mt={3}>
                                                {/* <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                                                    Comment:
                                                </Typography>
                                                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                                                    {comment}
                                                    <Link href={`/post/${post.postId}?mode=show`}>
                                                        <Button size="small" color="primary">
                                                            Edit comment
                                                        </Button>
                                                    </Link>
                                                </Typography> */}
                                            </Box>
                                        </CardContent>

                                        {/* Edit Button */}
                                        {
                                            userId == post.userId ? (
                                                <CardActions>
                                                    <Link href={`/post/${id}?mode=edit`} style={{ textDecoration: 'none' }}>
                                                        <Button variant="contained" color="primary" size="small" sx={{ ml: "auto" }}>
                                                            Edit Post
                                                        </Button>
                                                    </Link>
                                                    <Button onClick={deletePost} variant="contained" color="error" size="small" sx={{ ml: "auto" }}>
                                                        Delete Post
                                                    </Button>
                                                </CardActions>
                                            )
                                                : (
                                                    <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3 }}>
                                                        It's not your post
                                                    </Typography>)
                                        }

                                    </Card>
                                </Grid>
                            </Grid>
                        )
                    )
                }
            </Container>
        </Container>
    )
}
export default page;
