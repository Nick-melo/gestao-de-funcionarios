import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { FaTrashRestore } from 'react-icons/fa'; // Ícone para restaurar
import '../styles/Lixeira.css'; // Importando o arquivo de estilo

const db = getFirestore();

function Lixeira() {
    const [funcionariosLixeira, setFuncionariosLixeira] = useState([]);

    useEffect(() => {
        const fetchLixeira = async () => {
            const lixeiraRef = collection(db, "lixeira");
            const snapshot = await getDocs(lixeiraRef);

            const funcionarios = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setFuncionariosLixeira(funcionarios);
        };

        fetchLixeira();
    }, []);

    const handleRestore = async (id, dadosFuncionario) => {
        try {
            // Copiar dados para a coleção 'funcionarios'
            await setDoc(doc(db, "funcionarios", id), dadosFuncionario);
            // Remover o funcionário da 'lixeira'
            await deleteDoc(doc(db, "lixeira", id));
            alert("Cadastro restaurado com sucesso!");
            // Atualizar a lista da lixeira após a restauração
            setFuncionariosLixeira(funcionariosLixeira.filter(func => func.id !== id));
        } catch (error) {
            console.error("Erro ao restaurar o funcionário: ", error);
        }
    };

    return (
        <div className="lixeira-container">
            <h2>Cadastros na Lixeira</h2>
            <div className="lixeira-list">
                {funcionariosLixeira.length === 0 ? (
                    <p className="empty-message">Nenhum cadastro na lixeira.</p>
                ) : (
                    funcionariosLixeira.map((func) => (
                        <div key={func.id} className="lixeira-item">
                            <div className="lixeira-item-content">
                                <p><strong>Nome:</strong> {func.nome}</p>
                                <p><strong>Cargo:</strong> {func.cargo}</p>
                                <p><strong>Sexo:</strong> {func.sexo}</p>
                                <p><strong>Telefone:</strong> {func.telefone}</p>
                            </div>
                            <button 
                                onClick={() => handleRestore(func.id, func)} 
                                className="restore-button">
                                <FaTrashRestore size={20} /> Restaurar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Lixeira;
