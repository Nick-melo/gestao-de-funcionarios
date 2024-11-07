import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const db = getFirestore();

function EditarFuncionario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [funcionario, setFuncionario] = useState({
        nome: '',
        sexo: '',
        endereco: '',
        telefone: '',
        dataNascimento: '',
        dataAdmissao: '',
        cargo: '',
        nacionalidade: '',
        setor: '',
        salario: ''
    });
    const [valoresAntigos, setValoresAntigos] = useState({}); // Para comparar as alterações

    useEffect(() => {
        const fetchFuncionario = async () => {
            const docRef = doc(db, "funcionarios", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFuncionario(data);
                setValoresAntigos(data); // Armazena o estado original para comparação
            } else {
                console.log("Nenhum documento encontrado!");
            }
        };

        fetchFuncionario();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const docRef = doc(db, "funcionarios", id);
        const alteracoes = {};

        // Comparação para criar histórico de alterações
        Object.keys(funcionario).forEach((campo) => {
            if (funcionario[campo] !== valoresAntigos[campo]) {
                alteracoes[campo] = {
                    valorAntigo: valoresAntigos[campo],
                    valorNovo: funcionario[campo]
                };
            }
        });

        try {
            await updateDoc(docRef, funcionario); // Atualiza o documento com os novos dados

            if (Object.keys(alteracoes).length > 0) { 
                const historicoRef = doc(db, "funcionarios", id, "historico", new Date().toISOString());
                await setDoc(historicoRef, {
                    alteracoes,
                    timestamp: new Date()
                });
            }
            
            alert("Dados do funcionário atualizados com sucesso!");
            navigate('/'); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao atualizar o funcionário: ", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este funcionário?");
        if (confirmDelete) {
            try {
                const funcionarioRef = doc(db, "funcionarios", id);
                const funcionarioSnap = await getDoc(funcionarioRef);

                if (funcionarioSnap.exists()) {
                    await setDoc(doc(db, "lixeira", id), {
                        ...funcionarioSnap.data(),
                        deletadoEm: new Date(),
                        funcionarioId: id
                    });
                    await deleteDoc(funcionarioRef);
                    alert("Cadastro movido para a lixeira com sucesso!");
                    navigate('/');
                } else {
                    alert("Funcionário não encontrado!");
                }
            } catch (error) {
                console.error("Erro ao mover o Cadastro para a lixeira: ", error);
            }
        }
    };

    const handleChange = (e) => {
        setFuncionario({
            ...funcionario,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Editar Funcionário</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nome"
                            name="nome"
                            value={funcionario.nome}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Sexo"
                            name="sexo"
                            value={funcionario.sexo}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Telefone"
                            name="telefone"
                            value={funcionario.telefone}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Endereço"
                            name="endereco"
                            value={funcionario.endereco}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Data de Nascimento"
                            name="dataNascimento"
                            type="date"
                            value={funcionario.dataNascimento}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Data de Admissão"
                            name="dataAdmissao"
                            type="date"
                            value={funcionario.dataAdmissao}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Cargo"
                            name="cargo"
                            value={funcionario.cargo}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nacionalidade"
                            name="nacionalidade"
                            value={funcionario.nacionalidade}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Setor"
                            name="setor"
                            value={funcionario.setor}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Salário"
                            name="salario"
                            type="number"
                            value={funcionario.salario}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Atualizar Funcionário
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleDelete}>
                            Excluir Cadastro
                        </Button>
                    </Grid>

                    {/* Botão de ver histórico */}
                    <Grid item xs={12} style={{ marginTop: 20, textAlign: 'center' }}>
                        <Button variant="text" color="secondary" onClick={() => navigate(`/historico/${id}`)}>
                            Ver Histórico de Alterações
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default EditarFuncionario;
