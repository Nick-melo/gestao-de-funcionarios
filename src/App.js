import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CadastroFuncionario from './pages/CadastroFuncionario';
import EditarFuncionario from './pages/EditarFuncionario';
import HistoricoFuncionario from './pages/HistoricoFuncionario';
import ListaFuncionarios from './pages/ListaFuncionarios';
import Lixeira from './pages/Lixeira';
import Login from './pages/Login';

const auth = getAuth();

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // Estado de carregamento

    // Verifica o estado de autenticação
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Atualiza o estado com o usuário autenticado
            setLoading(false); // Finaliza o carregamento
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = "/"; // Redireciona para a página de login após o logout
        } catch (error) {
            console.error("Erro ao sair", error);
        }
    };

    // Componente PrivateRoute para proteção de rotas
    const PrivateRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />; // Se não estiver autenticado, redireciona para o login
    };

    if (loading) {
        return <div>Carregando...</div>;  // Ou qualquer outro indicativo de carregamento
    }

    return (
        <Router>
            {/* Verifica se o usuário está autenticado e redireciona para /cadastro */}
            {user && window.location.pathname === "/" && <Navigate to="/cadastro" />}

            {/* Exibir o AppBar apenas se o usuário estiver autenticado */}
            {user && (
                <AppBar position="static" style={{ marginBottom: '20px' }}>
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Gestão de Funcionários
                        </Typography>
                        <Button color="inherit" component={Link} to="/cadastro" startIcon={<PersonAddIcon />}>
                            Cadastro
                        </Button>
                        <Button color="inherit" component={Link} to="/lista-funcionarios" startIcon={<PeopleIcon />}>
                            Lista de Funcionários
                        </Button>
                        <Button color="inherit" component={Link} to="/lixeira" startIcon={<DeleteIcon />}>
                            Lixeira
                        </Button>
                        {/* Ícone de Logout */}
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}

            {/* Configuração das rotas */}
            <Routes>
                <Route path="/" element={<Login />} />
                
                {/* Rotas protegidas com PrivateRoute */}
                <Route path="/lista-funcionarios" element={<PrivateRoute><ListaFuncionarios /></PrivateRoute>} />
                <Route path="/cadastro" element={<PrivateRoute><CadastroFuncionario /></PrivateRoute>} />
                <Route path="/editar-funcionario/:id" element={<PrivateRoute><EditarFuncionario /></PrivateRoute>} />
                <Route path="/lixeira" element={<PrivateRoute><Lixeira /></PrivateRoute>} />
                <Route path="/historico/:id" element={<PrivateRoute><HistoricoFuncionario /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
