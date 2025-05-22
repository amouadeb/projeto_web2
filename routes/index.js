// routes/index.js
const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');
const Evento = require('../models/Evento');

// Rota para verificar status da API
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API de Gerenciamento de Eventos funcionando corretamente',
    endpoints: {
      'GET /api/eventos': 'Listar todos os eventos',
      'GET /api/eventos/:id': 'Buscar um evento específico',
      'POST /api/eventos': 'Criar um novo evento',
      'PUT /api/eventos/:id': 'Atualizar um evento existente',
      'DELETE /api/eventos/:id': 'Excluir um evento',
      'GET /view/eventos': 'Visualizar interface de eventos'
    }
  });
});

// Rota para visualização dos eventos
router.get('/view/eventos', async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.render('eventos', { eventos: eventos || [] });
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
    res.render('eventos', { eventos: [] });
  }
});

// Rotas para eventos
router.get('/api/eventos', EventoController.listarEventos);
router.get('/api/eventos/:id', EventoController.getEvento);
router.post('/api/eventos', EventoController.criarEvento);
router.put('/api/eventos/:id', EventoController.atualizarEvento);
router.delete('/api/eventos/:id', EventoController.excluirEvento);

module.exports = router;
