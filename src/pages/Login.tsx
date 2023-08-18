// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    const handleLogin = () => {
        // You would typically perform authentication here
        // For the sake of simplicity, let's assume successful login
        const validUsername = 'admin';
        const validPassword = 'admin123';
        if (username === validUsername && password === validPassword) {
            login(username, password);
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '30px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5">Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
