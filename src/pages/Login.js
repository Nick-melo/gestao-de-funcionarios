import { Box, Button, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError('Por favor, insira um email válido.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/cadastro'); // Redireciona para a página inicial após o login
        } catch (error) {
            setError(error.message || 'Erro ao fazer login. Verifique as credenciais e tente novamente.');
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',  // Cor do fundo clara e suave
            padding: 2,
        }}>
            <Container maxWidth="xs">
                <Card sx={{
                    padding: 4,
                    backgroundColor: '#ffffff',  // Card de fundo branco
                    color: '#333',  // Texto escuro
                    borderRadius: 4,  // Bordas arredondadas
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,  // Espaçamento entre os itens dentro do card
                }}>
                    <Typography variant="h5" sx={{ color: '#007bff', fontWeight: '600', marginBottom: 3 }}>
                        Login
                    </Typography>
                    {error && <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>{error}</Typography>}
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        style: { color: '#555' }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#ddd' },
                                            '&:hover fieldset': { borderColor: '#007bff' },
                                            '&.Mui-focused fieldset': { borderColor: '#007bff' },
                                        },
                                        input: { color: '#333' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        style: { color: '#555' }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#ddd' },
                                            '&:hover fieldset': { borderColor: '#007bff' },
                                            '&.Mui-focused fieldset': { borderColor: '#007bff' },
                                        },
                                        input: { color: '#333' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#007bff',
                                        '&:hover': { backgroundColor: '#0056b3' },
                                        color: 'white',
                                        padding: '12px',
                                        fontSize: '16px',
                                    }}
                                >
                                    Entrar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </Box>
    );
}

export default Login;
