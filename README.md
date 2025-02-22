Sistema de Gestão de Funcionários

Um sistema de gestão de funcionários desenvolvido em React, com operações CRUD (Create, Read, Update, Delete) e funcionalidade de lixeira para recuperação de cadastros excluídos. A aplicação permite adicionar, visualizar, editar, excluir e recuperar registros de funcionários, oferecendo uma interface intuitiva e responsiva.

Funcionalidades
Adicionar Funcionário: Formulário para inserir novos registros de funcionários, com validação de campos.

Visualizar Funcionários: Listagem de todos os funcionários cadastrados, com opções de ordenação e busca.

Editar Funcionário: Atualização de informações de funcionários existentes.

Excluir Funcionário: Remoção de registros de funcionários com confirmação. Os cadastros excluídos são movidos para a lixeira.

Recuperar da Lixeira: Recuperação de cadastros excluídos, restaurando-os para a lista principal.

Interface Responsiva: Design adaptável para diferentes dispositivos (desktop, tablet, mobile).

Tecnologias Utilizadas
React (Create React App)

JavaScript (ES6+)

HTML5 e CSS3

React Hooks (useState, useEffect) para gerenciamento de estado

Como Executar o Projeto
Siga os passos abaixo para rodar o projeto na sua máquina local:

Pré-requisitos
Node.js instalado (versão 14 ou superior).

NPM ou Yarn para gerenciamento de dependências.

Passos
Clone o repositório:

bash
Copy
git clone https://github.com/seu-usuario/gestao-funcionarios.git  
Acesse a pasta do projeto:

bash
Copy
cd gestao-funcionarios  
Instale as dependências:

bash
Copy
npm install  
ou

bash
Copy
yarn install  
Execute o projeto:

bash
Copy
npm start  
ou

bash
Copy
yarn start  
Acesse a aplicação no navegador:

Copy
http://localhost:3000  
Estrutura do Projeto
bash
Copy
gestao-funcionarios/  
├── public/  
│   ├── index.html  
│   └── ...  
├── src/  
│   ├── components/  
│   │   ├── FuncionarioForm.js  
│   │   ├── FuncionarioList.js  
│   │   ├── Lixeira.js  
│   │   └── ...  
│   ├── App.js  
│   ├── index.js  
│   └── ...  
├── package.json  
├── README.md  
└── ...  
Funcionalidade de Lixeira
A funcionalidade de lixeira permite que os cadastros excluídos sejam movidos para uma área separada, onde podem ser visualizados e recuperados.

Como Funciona
Excluir Funcionário: Ao excluir um funcionário, ele é movido para a lixeira em vez de ser removido permanentemente.

Visualizar Lixeira: Acesse a lixeira para ver todos os cadastros excluídos.

Recuperar Funcionário: Selecione um funcionário na lixeira e restaure-o para a lista principal.

Exclusão Permanente: Opção para excluir permanentemente os cadastros da lixeira.

Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Faça um fork do projeto.

Crie uma branch para sua feature:

bash
Copy
git checkout -b minha-feature  
Commit suas mudanças:

bash
Copy
git commit -m 'Adicionando nova funcionalidade'  
Push para a branch:

bash
Copy
git push origin minha-feature  
Abra um Pull Request.

Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
