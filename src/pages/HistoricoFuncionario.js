import { Container, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const db = getFirestore();

function HistoricoFuncionario() {
    const { id } = useParams();
    const [historico, setHistorico] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistorico = async () => {
            try {
                const historicoRef = collection(db, "funcionarios", id, "historico");
                const historicoSnapshot = await getDocs(historicoRef);

                const historicoData = historicoSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setHistorico(historicoData);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
            }
        };

        fetchHistorico();
    }, [id]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Histórico de Alterações</Typography>
            {isLoading ? (
                <Typography>Carregando histórico...</Typography>
            ) : historico.length > 0 ? (
                <List>
                    {historico.map((alteracao) => (
                        <React.Fragment key={alteracao.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={`Data: ${new Date(alteracao.timestamp.seconds * 1000).toLocaleString()}`}
                                    secondary={
                                        <>
                                            <Typography variant="body2" color="textPrimary">
                                                <strong>Alterações:</strong>
                                            </Typography>
                                            {Object.entries(alteracao.alteracoes).map(([campo, valores], index) => (
                                                <Typography variant="body2" color="textSecondary" key={index}>
                                                    {campo.charAt(0).toUpperCase() + campo.slice(1)}: 
                                                    de <strong>{valores.valorAntigo || "N/A"}</strong> para <strong>{valores.valorNovo || "N/A"}</strong>
                                                </Typography>
                                            ))}
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <Typography>Nenhuma alteração registrada.</Typography>
            )}
        </Container>
    );
}

export default HistoricoFuncionario;
