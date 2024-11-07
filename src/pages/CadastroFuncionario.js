import React, { useState } from 'react';
import { firestore } from '../firebase';
import '../styles/CadastroFuncionario.css';

function CadastroFuncionario() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const [cargo, setCargo] = useState('');
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [setor, setSetor] = useState('');
    const [salario, setSalario] = useState('');

    const [activeSection, setActiveSection] = useState('contato');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await firestore.collection('funcionarios').add({
                nome,
                sobrenome,
                endereco,
                telefone,
                email,
                nacionalidade,
                dataNascimento: new Date(dataNascimento),
                cargo,
                dataAdmissao: new Date(dataAdmissao),
                setor,
                salario,
            });

            setNome(''); setSobrenome(''); setEndereco(''); setTelefone('');
            setEmail(''); setNacionalidade(''); setDataNascimento('');
            setCargo(''); setDataAdmissao(''); setSetor(''); setSalario('');

            alert('Funcionário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar funcionário:', error.message);
            alert('Ocorreu um erro ao cadastrar o funcionário.');
        }
    };

    return (
        <div className="container">
            <h2>Cadastro de Funcionário</h2>
            <div className="section-navigation">
                <button 
                    className={activeSection === 'contato' ? 'active' : ''} 
                    onClick={() => setActiveSection('contato')}
                >
                    Informações de Contato
                </button>
                <button 
                    className={activeSection === 'profissional' ? 'active' : ''} 
                    onClick={() => setActiveSection('profissional')}
                >
                    Informações Profissionais
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form">
                {activeSection === 'contato' && (
                    <>
                        <h3>Informações de Contato</h3>
                        <div className="form-group">
                            <label className="label">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="ex. Tiago"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Sobrenome</label>
                            <input
                                type="text"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                                placeholder="ex. Souza"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Endereço</label>
                            <input
                                type="text"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="ex. Avenida Paulista, 1234"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Telefone</label>
                            <input
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                placeholder="ex. (11) 91234-5678"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ex. tiago@email.com"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Data de Nascimento</label>
                            <input
                                type="date"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                                required
                                className="input"
                            />
                        </div>
                    </>
                )}

                {activeSection === 'profissional' && (
                    <>
                        <h3>Informações Profissionais</h3>
                        <div className="form-group">
                            <label className="label">Cargo</label>
                            <input
                                type="text"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                                placeholder="ex. Gerente"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Data de Admissão</label>
                            <input
                                type="date"
                                value={dataAdmissao}
                                onChange={(e) => setDataAdmissao(e.target.value)}
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Setor</label>
                            <input
                                type="text"
                                value={setor}
                                onChange={(e) => setSetor(e.target.value)}
                                placeholder="ex. Comercial"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Nacionalidade</label>
                            <input
                                type="text"
                                value={nacionalidade}
                                onChange={(e) => setNacionalidade(e.target.value)}
                                placeholder="ex. Brasileira"
                                required
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Salário</label>
                            <input
                                type="number"
                                value={salario}
                                onChange={(e) => setSalario(e.target.value)}
                                placeholder="ex. 5000"
                                required
                                className="input"
                                step="0.01"
                            />
                        </div>
                    </>
                )}

                {activeSection === 'profissional' && (
                    <div className="button-group">
                        <button type="submit" className="button">Cadastrar</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default CadastroFuncionario;
