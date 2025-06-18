# Plataforma de Eventos

Este projeto implementa uma API simples de gerenciamento de eventos utilizando a conexção com banco de dados por meio de  Express e PostgreSQL, seguindo o padrão de arquitetura  Model-View-Controller (MVC). O projeto permite criar, visualizar, editar e excluir eventos através de diversos endpoints como: GET, POST, DELETE e PUT. Agora com uma recem atualização que ultiliza um Fetch API responsavel por integrar todo Backend com Frontend desste projeto, por meio de EJS e HTML.

## Descrição do Sistema

A Plataforma de Eventos é uma aplicação simples em backend que facilita a organização e acompanhamento de eventos. O sistema foi desenvolvido com foco na simplicidade e eficiência, permitindo operações CRUD (Create, Read, Update, Delete) no cenario de eventos. 
Para realizar um cadastro no banco de dados há 2 formas, a primeira sendo ultilizando o CRUD dentro do arquivo rest.http, no qual é possivel realizar um post que é responsavel pela criação do usuario/inscrição/evento, o PUT pra atualizar-lo ou ate um DELETE para apagar. Lembre-se que antes de manipular o banco de dados ultilizando o rest.http é necessario rodar em seu terminal "npm start" e garantir que esteja rodando na porta 3000, para assim conseguir fazer um "send request" para o banco de dados no supabase e conseguir realizar criar,deletar ou atualizar um usuario,inscrição ou eventos. 
A segunda forma para cadastrar algo no banco de dados é por meio do html localizado na pasta "views" do projeto, no caso é necessario apenas rodar o live server no arquivo "index.html" isso vai redirecionar o usuario diretamente na plataforma de gerenciamento de eventos. O usuario tera que realizar seu login caso ja esteja logado, ou se cadastrar apos isso aparecera uma pagina com painel dos eventos mostrando quais eventos o usuario ja participa e quais sao seus proximos eventos. Nesta pagina aparecera uma opção de criar um novo evento localizado o canto superior direto  da pagina, apos cliclar o usuario consegue criar um novo evento com: Titulo do evento, Descrição, Local e status. Apos a criação deste evento os dados serão diretamente enviados ao banco de dados do supabase, onde serão armazenados graças a ultilização do fetch api rodando na porta 3000 que realiza toda essa conexção do front com backend.
Por fim, a ultima forma e mais recomendada de acessar o sistema de gerenciamento é por meio do http://localhost:3000, apos instalar todas as dependencias e bibliotecas, é neecssario realizar node server.js ou npm start e aparecer "servidor rodando na porta 3000".
OBS: Os arquivos ejs tambem são outra maneira de acessar o html, ele serve como um organizador visual de todos arquvios/pastas do projeto.

## Principais funcionalidades:
- CRUD completo: Criação, visualização, edição e exclusão de eventos 
- Respostas em JSON para visualização clara das operações
- Conexão com banco de dados Postgre/Express/Supabase
- Interface simples para gerenciamento  e visualização de eventos
- Conexção Front-Backend por meio de  fetch api com HTML/EJS
- Biblioteca Joi e Schema trazendo segurança para o projeto


## Estrutura de Pastas e Arquivos

Pastas seguindo o padrão MVC completo:


projeto_web2/
│
├── assets/                # Recursos estáticos (imagens, diagramas etc.)
│   ├── draw2.png       # Diagrama do projeto
│   └── modelagem.png      # Modelo de dados
│
├── config/                # Arquivos de configuração
│   └── database.js        # Conexão com o banco de dados
│
├── controllers/           # Controladores da aplicação
│   ├── EventoController.js     # Lógica dos endpoints de evento
│   ├── InscriçãoController.js  # Lógica dos endpoints de inscrição
│   └── UsuarioController.js    # Lógica dos endpoints de usuário
│
├── documents/             # Documentos e specs
│   └── WAD.md             # Documento WAD
│
├── migration/             # Scripts de migração e inicialização do banco
│   ├── 20250522init.sql   # Script SQL para criar a estrutura inicial
│   └── script_sql.js      # Script auxiliar para migrações
│
├── models/                # Modelos de dados (ORM)
│   └── Evento.js          # Definição do modelo Evento
│
├── node_modules/          # Dependências instaladas pelo npm
│
├── routes/                # Definição das rotas da aplicação
│   └── index.js           # Rotas principais da API
│
├── views/                 # Telas da aplicação usando EJS
│   ├── index.ejs         # Pagina inicial do cadastro
│   ├── Dashboard.ejs     # Dashboard com visualização dos eventos
│   └── Detalhamento.html  # Detalhes do evento
│   ├── criar_evento.ejs  # Página HTML de criação de eventos
│   └── eventos.ejs        # Página visual de todos arquivos/pastas do projeto
│
├── .env                   # Variáveis de ambiente (não versionar)
├── .env.example           # Exemplo de configuração do ambiente
├── .gitignore             # Arquivos e pastas ignorados pelo Git
├── package-lock.json      # Registro exato das versões das dependências
├── package.json           # Dependências e scripts do projeto
├── README.md              # Documentação geral do projeto
├── rest.http              # Arquivo para testar as rotas HTTP da API
└── server.js              # Arquivo principal que inicializa o servidor




## Modelo do Banco de Dados

O banco de dados foi projetado de forma simples, contendo apenas a tabela de usuarios, eventos e inscrições:

```sql

CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  senha      VARCHAR(255) NOT NULL,
  criado_em  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS eventos (
  id             SERIAL PRIMARY KEY,
  nome           VARCHAR(100)   NOT NULL,
  descricao      TEXT,
  data_evento    TIMESTAMP,
  local          VARCHAR(100),
  status         VARCHAR(20)    DEFAULT 'agendado',
  organizador_id INTEGER       REFERENCES usuarios(id),
  created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS inscricoes (
  id            SERIAL PRIMARY KEY,
  usuario_id    INTEGER REFERENCES usuarios(id),
  evento_id     INTEGER REFERENCES eventos(id),
  inscrito_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


## Endpoints da API

A API disponibiliza os seguintes endpoints:

'GET /api/eventos': 'Listar todos os eventos',
'GET /api/eventos/:id': 'Buscar um evento específico',
'POST /api/eventos': 'Criar um novo evento',
'PUT /api/eventos/:id': 'Atualizar um evento existente',
'DELETE /api/eventos/:id': 'Excluir um evento',
'GET /api/usuarios': 'Listar todos os usuários',
'GET /api/usuarios/:id': 'Buscar um usuário específico',
'POST /api/usuarios': 'Criar um novo usuário',
'PUT /api/usuarios/:id': 'Atualizar um usuário existente',
'DELETE /api/usuarios/:id': 'Excluir um usuário',
'GET /api/inscricoes': 'Listar todas as inscrições',
'GET /api/inscricoes/:id': 'Buscar uma inscrição específica',
'POST /api/inscricoes': 'Criar uma nova inscrição',
'DELETE /api/inscricoes/:id': 'Excluir uma inscrição'

## Como Executar o Projeto Localmente
Todas instruções estão incluidas dentro da descrição do projeto.

### Pré-requisitos
- Node.js (v14 ou superior)
- npm (v6 ou superior)
- PostgreSQL (v12 ou superior)

### Passos para Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/simple-event-api.git
   cd simple-event-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações locais.

4. **Inicialize o banco de dados**
   - Crie um banco de dados PostgreSQL chamado `event_platform`
   - Execute o script SQL de inicialização:
   ```bash
   psql -U seu_usuario -d event_platform -f init.sql
   ```
   Ou use o comando npm configurado no package.json:
   ```bash
   npm run init-db
   ```

5. **Popule o banco com dados de exemplo (opcional)**
   ```bash
   node populate-eventos.js
   ```

6. **Inicie o servidor**
   ```bash
   npm start
   ```

7. **Acesse a aplicação**
   - API: `http://localhost:3000`
   - Interface visual: `http://localhost:3000/view/eventos`

## Bibliotecas Utilizadas

- **express**: Framework web para Node.js
- **pg**: Cliente PostgreSQL para Node.js
- **dotenv**: Carregamento de variáveis de ambiente
- **ejs**: Engine de templates para visualização (html)
- **joi**: Realiza schema dos models

## Exemplos de Uso

### Criar um evento
```bash
curl -X POST http://localhost:3000/api/eventos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Novo Evento", "descricao": "Descrição do evento", "data_evento": "2025-06-15T09:00:00", "local": "Centro de Convenções", "status": "agendado"}'
```

### Listar todos os eventos
```bash
curl -X GET http://localhost:3000/api/eventos
```

### Buscar um evento específico
```bash
curl -X GET http://localhost:3000/api/eventos/1
```

### Atualizar um evento
```bash
curl -X PUT http://localhost:3000/api/eventos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Evento Atualizado", "descricao": "Nova descrição", "data_evento": "2025-06-16T10:00:00", "local": "Novo Local", "status": "em andamento"}'
```

### Excluir um evento
```bash
curl -X DELETE http://localhost:3000/api/eventos/1
```
