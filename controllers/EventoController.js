
const Evento = require('../models/Evento');

/**
 * Controller para gerenciamento de eventos
 */
class EventoController {
  /**
   * Lista todos os eventos
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  static async listarEventos(req, res) {
    try {
      const eventos = await Evento.findAll();
      res.status(200).json({
        success: true,
        message: 'Eventos recuperados com sucesso',
        data: eventos
      });
    } catch (error) {
      console.error('Erro ao listar eventos:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao recuperar eventos',
        error: error.message
      });
    }
  }

  /**
   * Busca um evento pelo ID
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  static async getEvento(req, res) {
    try {
      const eventoId = req.params.id;
      const evento = await Evento.findById(eventoId);
      
      if (!evento) {
        return res.status(404).json({
          success: false,
          message: 'Evento não encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Evento recuperado com sucesso',
        data: evento
      });
    } catch (error) {
      console.error(`Erro ao buscar evento:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar evento',
        error: error.message
      });
    }
  }

  /**
   * Cria um novo evento
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  static async criarEvento(req, res) {
    try {
      const { titulo, descricao, data, local, status } = req.body;
      
      
      if (!titulo) {
        return res.status(400).json({
          success: false,
          message: 'O título do evento é obrigatório'
        });
      }
      
      
      const evento = await Evento.create({
        titulo,
        descricao,
        data,
        local,
        status: status || 'agendado'
      });
      
      res.status(201).json({
        success: true,
        message: 'Evento criado com sucesso',
        data: evento
      });
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar evento',
        error: error.message
      });
    }
  }

  /**
   * Atualiza um evento existente
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  static async atualizarEvento(req, res) {
    try {
      const eventoId = req.params.id;
      const { titulo, descricao, data, local, status } = req.body;
      
      
      if (!titulo) {
        return res.status(400).json({
          success: false,
          message: 'O título do evento é obrigatório'
        });
      }
      
      
      const eventoAtualizado = await Evento.update(eventoId, {
        titulo,
        descricao,
        data,
        local,
        status
      });
      
      if (!eventoAtualizado) {
        return res.status(404).json({
          success: false,
          message: 'Evento não encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Evento atualizado com sucesso',
        data: eventoAtualizado
      });
    } catch (error) {
      console.error(`Erro ao atualizar evento:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar evento',
        error: error.message
      });
    }
  }

  /**
   * Exclui um evento
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   */
  static async excluirEvento(req, res) {
    try {
      const eventoId = req.params.id;
      const deleted = await Evento.delete(eventoId);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Evento não encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Evento excluído com sucesso',
        data: { id: eventoId }
      });
    } catch (error) {
      console.error(`Erro ao excluir evento:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir evento',
        error: error.message
      });
    }
  }
}

module.exports = EventoController;
