const Usuario = require('../models/Usuario');
const Joi = require('joi');

const usuarioSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required()
});


class UsuarioController {
  /**
   * Lista todos os usuários
   */
  static async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json({
        success: true,
        data: usuarios
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao listar usuários',
        error: error.message
      });
    }
  }

  /**
   * Busca um usuário específico pelo ID
   */
  static async getUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: `Usuário com ID ${id} não encontrado`
        });
      }
      res.status(200).json({
        success: true,
        data: usuario
      });
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error.message
      });
    }
  }

  /**
   * Cria um novo usuário
   */
  static async criarUsuario(req, res) {
  const { error, value } = usuarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const novoUsuario = await Usuario.create(value);
    res.status(201).json({ success: true, data: novoUsuario });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criar usuário', error: error.message });
  }
}


  /**
   * Atualiza um usuário existente
   */
 static async atualizarUsuario(req, res) {
  const { error, value } = usuarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const usuarioAtualizado = await Usuario.update(req.params.id, value);
    if (!usuarioAtualizado) {
      return res.status(404).json({ success: false, message: `Usuário com ID ${req.params.id} não encontrado` });
    }
    res.status(200).json({ success: true, data: usuarioAtualizado });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar usuário', error: error.message });
  }
}

  /**
   * Exclui um usuário pelo ID
   */
  static async excluirUsuario(req, res) {
    const { id } = req.params;
    try {
      const usuarioExistente = await Usuario.findById(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          message: `Usuário com ID ${id} não encontrado`
        });
      }

      const removido = await Usuario.delete(id);
      if (removido) {
        res.status(200).json({
          success: true,
          message: 'Usuário excluído com sucesso',
          data: { id }
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Falha ao excluir usuário'
        });
      }
    } catch (error) {
      console.error(`Erro ao excluir usuário com ID ${id}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir usuário',
        error: error.message
      });
    }
  }
}

module.exports = UsuarioController;
