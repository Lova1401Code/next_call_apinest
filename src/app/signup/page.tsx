// src/app/signup/page.tsx
"use client"; // Indique que ce composant est un Client Component

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'inscription ici
        try {
            const res = await fetch("http://localhost:3000/auth/signup", {
                method: "Post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            //vérifie si le response is ok
            if (res.ok) {
                router.push('/login');
            }
        } catch (error) {
            alert(error)
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    borderRadius: 2,
                    backgroundColor: '#ffffff', // Fond blanc
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Ombre légère
                }}
            >
                <Typography variant="h5" sx={{ textAlign: 'center', color: '#333333' }}>
                    Inscription
                </Typography>
                <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
                    <TextField
                        label="Nom d'utilisateur"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            sx: { backgroundColor: '#f7f7f7' }, // Champ de saisie avec fond clair
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            sx: { backgroundColor: '#f7f7f7' }, // Champ de saisie avec fond clair
                        }}
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            sx: { backgroundColor: '#f7f7f7' }, // Champ de saisie avec fond clair
                        }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#3f51b5' }}>
                        S'inscrire
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#666666' }}>
                    Vous avez déjà un compte?{' '}
                    <Link href="/login">
                        Se connecter
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Signup;
