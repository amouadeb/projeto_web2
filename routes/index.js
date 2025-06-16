const express = require('express');
const router = express.Router();

const EventoController = require('../controllers/EventoController');
const UsuarioController = require('../controllers/UsuarioController');
const InscricaoController = require('../controllers/InscriçãoController');


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
      'GET /api/usuarios': 'Listar todos os usuários',
      'GET /api/usuarios/:id': 'Buscar um usuário específico',
      'POST /api/usuarios': 'Criar um novo usuário',
      'PUT /api/usuarios/:id': 'Atualizar um usuário existente',
      'DELETE /api/usuarios/:id': 'Excluir um usuário',
      'GET /api/inscricoes': 'Listar todas as inscrições',
      'GET /api/inscricoes/:id': 'Buscar uma inscrição específica',
      'POST /api/inscricoes': 'Criar uma nova inscrição',
      'DELETE /api/inscricoes/:id': 'Excluir uma inscrição'
    }
  });
});



router.get('/eventos', EventoController.listarEventos);
router.get('/eventos/:id', EventoController.getEvento);
router.post('/eventos', EventoController.criarEvento);
router.put('/eventos/:id', EventoController.atualizarEvento);
router.delete('/eventos/:id', EventoController.excluirEvento);

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.getUsuario);
router.post('/usuarios', UsuarioController.criarUsuario);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario);
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

router.get('/inscricoes', InscricaoController.listarInscricoes);
router.get('/inscricoes/:id', InscricaoController.getInscricao);
router.post('/inscricoes', InscricaoController.criarInscricao);
router.delete('/inscricoes/:id', InscricaoController.excluirInscricao);


module.exports = router;
