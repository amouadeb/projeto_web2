const pool = require('../config/database');

class Usuario {
  /**
   * Retorna todos os usuários (ordenados por data de criação decrescente).
   * @returns {Promise<Array>} Lista de usuários
   */
  static async findAll() {
    try {
      const result = await pool.query(
        'SELECT id, nome, email, criado_em FROM usuarios ORDER BY criado_em DESC'
      );
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  /**
   * Retorna um usuário específico pelo ID.
   * @param {number} id - ID do usuário
   * @returns {Promise<Object|null>} Usuário ou null se não existir
   */
  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria um novo usuário.
   * @param {Object} data - Dados do usuário
   * @param {string} data.nome
   * @param {string} data.email
   * @param {string} data.senha
   * @returns {Promise<Object>} Usuário recém-criado
   */
  static async create({ nome, email, senha }) {
    try {
      const result = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, criado_em)
         VALUES ($1, $2, $3, NOW())
         RETURNING id, nome, email, criado_em`,
        [nome, email, senha]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  /**
   * Atualiza um usuário existente.
   * @param {number} id - ID do usuário a ser atualizado
   * @param {Object} data - Novos dados do usuário
   * @param {string} [data.nome]
   * @param {string} [data.email]
   * @param {string} [data.senha]
   * @returns {Promise<Object|null>} Usuário atualizado ou null se não existir
   */
  static async update(id, { nome, email, senha }) {
    try {
      const result = await pool.query(
        `UPDATE usuarios
         SET nome = $1,
             email = $2,
             senha = $3
         WHERE id = $4
         RETURNING id, nome, email, criado_em`,
        [nome, email, senha, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Remove um usuário pelo ID.
   * @param {number} id - ID do usuário a ser removido
   * @returns {Promise<boolean>} True se removido, false caso contrário
   */
  static async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM usuarios WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Erro ao deletar usuário com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Usuario;
