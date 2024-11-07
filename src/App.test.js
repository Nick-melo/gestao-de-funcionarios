// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CadastroFuncionario from './pages/CadastroFuncionario';
import ListaFuncionarios from './pages/ListaFuncionarios';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListaFuncionarios />} />
                <Route path="/cadastro" element={<CadastroFuncionario />} />
            </Routes>
        </Router>
    );
}

export default App;
