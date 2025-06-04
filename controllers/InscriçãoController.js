const Inscricao = require('../models/Inscrição');

class InscricaoController {
  /**
   * Lista todas as inscrições
   */
  static async listarInscricoes(req, res) {
    try {
      const inscricoes = await Inscricao.findAll();
      res.status(200).json({
        success: true,
        data: inscricoes
      });
    } catch (error) {
      console.error('Erro ao listar inscrições:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao listar inscrições',
        error: error.message
      });
    }
  }

  /**
   * Busca uma inscrição específica pelo ID
   */
  static async getInscricao(req, res) {
    const { id } = req.params;
    try {
      const inscricao = await Inscricao.findById(id);
      if (!inscricao) {
        return res.status(404).json({
          success: false,
          message: `Inscrição com ID ${id} não encontrada`
        });
      }
      res.status(200).json({
        success: true,
        data: inscricao
      });
    } catch (error) {
      console.error(`Erro ao buscar inscrição com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar inscrição',
        error: error.message
      });
    }
  }

  /**
   * Cria uma nova inscrição
   */
  static async criarInscricao(req, res) {
    const { usuario_id, evento_id } = req.body;
    if (!usuario_id || !evento_id) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: usuario_id, evento_id'
      });
    }

    try {
      const novaInscricao = await Inscricao.create({ usuario_id, evento_id });
      res.status(201).json({
        success: true,
        data: novaInscricao
      });
    } catch (error) {
      console.error('Erro ao criar inscrição:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar inscrição',
        error: error.message
      });
    }
  }

  /**
   * Exclui uma inscrição pelo ID
   */
  static async excluirInscricao(req, res) {
    const { id } = req.params;
    try {
      const inscricaoExistente = await Inscricao.findById(id);
      if (!inscricaoExistente) {
        return res.status(404).json({
          success: false,
          message: `Inscrição com ID ${id} não encontrada`
        });
      }

      const removido = await Inscricao.delete(id);
      if (removido) {
        res.status(200).json({
          success: true,
          message: 'Inscrição excluída com sucesso',
          data: { id }
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Falha ao excluir inscrição'
        });
      }
    } catch (error) {
      console.error(`Erro ao excluir inscrição com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir inscrição',
        error: error.message
      });
    }
  }
}

module.exports = InscricaoController;
