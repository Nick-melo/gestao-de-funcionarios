import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaFilePdf, FaTrash, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/ListaFuncionarios.css';

const db = getFirestore();

function ListaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const funcionariosCollection = collection(db, 'funcionarios');
                const funcionariosSnapshot = await getDocs(funcionariosCollection);
                const funcionariosData = funcionariosSnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setFuncionarios(funcionariosData);
            } catch (error) {
                console.log('Erro ao buscar funcionários:', error);
            }
        };

        fetchFuncionarios();
    }, []);

    const handleDelete = async (id, funcionarioData) => {
        const confirmDelete = window.confirm("Tem certeza que deseja mover o cadastro para a lixeira?");
        if (confirmDelete) {
            try {
                // Referência para o funcionário a ser movido
                const funcionarioRef = doc(db, "funcionarios", id);
                
               
                const lixeiraRef = doc(db, "lixeira", id);
                
                // Movendo os dados para a lixeira
                await setDoc(lixeiraRef, funcionarioData);
                
                // Removendo o funcionário da coleção principal
                await deleteDoc(funcionarioRef);
                
                alert("Cadastro movido para a lixeira com sucesso!");
                setFuncionarios(funcionarios.filter(funcionario => funcionario.id !== id)); 
            } catch (error) {
                console.error("Erro ao mover o cadastro para a lixeira:", error);
            }
        }
    };

    // Função para gerar o PDF
    const gerarPDF = (funcionario) => {
        const doc = new jsPDF();
        doc.text("Informações do Funcionário", 10, 10);
        doc.text(`Nome: ${funcionario.data.nome}`, 10, 20);
        doc.text(`Sexo: ${funcionario.data.sexo}`, 10, 30);
        doc.text(`Endereço: ${funcionario.data.endereco}`, 10, 40);
        doc.text(`Telefone: ${funcionario.data.telefone}`, 10, 50);
        doc.text(`Data de Aniversário: ${funcionario.data.dataAniversario?.seconds 
            ? new Date(funcionario.data.dataAniversario.seconds * 1000).toLocaleDateString() 
            : 'N/A'}`, 10, 60);
        doc.text(`Cargo: ${funcionario.data.cargo}`, 10, 70);
        doc.text(`Nacionalidade: ${funcionario.data.nacionalidade}`, 10, 80);

        doc.save(`funcionario_${funcionario.data.nome}.pdf`);
    };

    return (
        <div className="container">
            <h2>Funcionários</h2>
            <div className="cards-container">
                {funcionarios.map(funcionario => (
                    <div key={funcionario.id} className="card">
                        {/* Ícone de usuário no lugar da foto */}
                        <div className="icon-container">
                            <FaUserCircle size={60} color="#007bff" />
                        </div>
                        <h3>{funcionario.data.nome}</h3>
                        <p><strong>Sexo:</strong> {funcionario.data.sexo}</p>
                        <p><strong>Endereço:</strong> {funcionario.data.endereco}</p>
                        <p><strong>Telefone:</strong> {funcionario.data.telefone}</p>
                        <p><strong>Data de Aniversário:</strong> {funcionario.data.dataAniversario?.seconds 
                            ? new Date(funcionario.data.dataAniversario.seconds * 1000).toLocaleDateString() 
                            : 'N/A'}</p>
                        <p><strong>Cargo:</strong> {funcionario.data.cargo}</p>
                        <p><strong>Nacionalidade:</strong> {funcionario.data.nacionalidade}</p>
                        <div className="actions">
                            {/* Ícone de edição */}
                            <Link to={`/editar-funcionario/${funcionario.id}`}>
                                <button className="edit">
                                    <FaEdit size={20} /> Editar
                                </button>
                            </Link>
                            {/* Ícone de lixeira para mover para a lixeira */}
                            <button onClick={() => handleDelete(funcionario.id, funcionario.data)} className="delete-button">
                                <FaTrash size={20} /> Excluir
                            </button>
                            {/* Botão para gerar o PDF */}
                            <button onClick={() => gerarPDF(funcionario)} className="pdf-button">
                                <FaFilePdf size={20} /> Gerar PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListaFuncionarios;
