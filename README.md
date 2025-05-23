# Plataforma de Eventos

Este projeto implementa uma API simples de gerenciamento de eventos utilizando a conexção com banco de dados por meio de  Express e PostgreSQL, seguindo o padrão de arquitetura  Model-View-Controller (MVC). O projeto permite criar, visualizar, editar e excluir eventos através de diversos endpoints como: GET, POST, DELETE e PUT.

## Descrição do Sistema

A Plataforma de Eventos é uma aplicação simples en backend que facilita a organização e acompanhamento de eventos. O sistema foi desenvolvido com foco na simplicidade e eficiência, permitindo operações CRUD (Create, Read, Update, Delete) no cenario de eventos.

## Principais funcionalidades:
- CRUD completo: Criação, visualização, edição e exclusão de eventos 
- Respostas em JSON para visualização clara das operações
- Conexão com banco de dados Postgre/Express/Supabase
- Interface simples para gerenciamento  e visualização de eventos

## Estrutura de Pastas e Arquivos

Pastas seguindo o padrão MVC completo:

```
projeto_web2/
│
├── config/                # Arquivos de configuração
│   └── database.js        # Configuração de conexão com o banco de dados
├── controllers/           # Controladores da aplicação
│   └── EventoController.js # Controlador de eventos
├── models/                # Modelos de dados
│   └── Evento.js          # Modelo de eventos
├── routes/                # Definição das rotas
│   └── index.js           # Rotas principais da aplicação
├── views/                 # Views da aplicação
│   └── eventos.ejs        # View para visualização de eventos
├── .env.example           # Exemplo de variáveis de ambiente
├── 20250522init.sql       # Script SQL para inicialização do banco
├── package.json           # Dependências e scripts do projeto
├── server.js              # Arquivo principal que inicializa o servidor
└── README.md              # Documentação do projeto
```

## Modelo do Banco de Dados

O banco de dados foi projetado de forma simples, contendo apenas a tabela de eventos:

```sql
CREATE TABLE IF NOT EXISTS eventos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_evento TIMESTAMP,
    local VARCHAR(100),
    status VARCHAR(20) DEFAULT 'agendado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Endpoints da API

A API disponibiliza os seguintes endpoints:

- `GET /`: Verifica o status da API e lista todos os endpoints disponíveis
- `GET /api/eventos`: Lista todos os eventos
- `GET /api/eventos/:id`: Busca um evento específico pelo ID
- `POST /api/eventos`: Cria um novo evento
- `PUT /api/eventos/:id`: Atualiza um evento existente
- `DELETE /api/eventos/:id`: Exclui um evento
- `GET /view/eventos`: Acessa a interface visual para gerenciamento de eventos

## Como Executar o Projeto Localmente

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
- **ejs**: Engine de templates para visualização

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
