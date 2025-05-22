// server.js - Refatorado para melhor organização e clareza
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Importar rotas
const routes = require('./routes/index');
app.use('/', routes);

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Rota 404 para requisições não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
