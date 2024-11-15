// src/app/login/page.tsx
"use client"; // Ce composant est rendu côté client

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Image from 'next/image';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const router = useRouter();

    const handleClose = (event?: any, reason?: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Logique de connexion 
        try {
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // Vérifiez si la réponse est ok (status 200-299)
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Stocke le token dans le localStorage
                router.push('/dashboard'); // Redirige vers le tableau de bord
            } else {
                setAlertMessage('Échec de la connexion. Vérifiez vos informations d’identification.');
                setAlertSeverity('error');
                setOpen(true);
            }

            // Traiter la réponse si tout va bien
            const data = await response.json();
            console.log('Connexion réussie:', data);
            // Effectuez d'autres opérations, comme le stockage du token ou la redirection
            if (data.token) {
                //stockage de jwt
                console.log(data.token)
                localStorage.setItem('token', data.token);
                setAlertMessage("user valide")
                setAlertSeverity("success")
                //redirection vers la page de profil
                router.push('/dashboard');
            } else {
                setAlertMessage("invalid user")
            }
        } catch (error: any) {
            console.error('Erreur lors de la connexion:', error.message);
            // Gérer l'erreur : afficher un message à l'utilisateur ou autre action
        }
    };

    return (

        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Box textAlign="center">
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        Connexion
                    </Typography>
                </Box>
                {/* Snackbar pour afficher l'alerte */}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Se connecter
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                    Vous n'avez pas de compte?{' '}
                    <Link href="/signup">
                        S'inscrire
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
