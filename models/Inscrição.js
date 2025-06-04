const pool = require('../config/database');

class Inscricao {
  /**
   * Retorna todas as inscrições (ordena por data de inscrição).
   * @returns {Promise<Array>} Lista de inscrições
   */
  static async findAll() {
    try {
      const result = await pool.query(
        `SELECT 
           i.id,
           i.usuario_id,
           i.evento_id,
           i.inscrito_em,
           u.nome AS usuario_nome,
           e.titulo AS evento_titulo
         FROM inscricoes i
         LEFT JOIN usuarios u ON u.id = i.usuario_id
         LEFT JOIN eventos e ON e.id = i.evento_id
         ORDER BY i.inscrito_em DESC`
      );
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
      throw error;
    }
  }

  /**
   * Retorna uma inscrição específica pelo ID.
   * @param {number} id - ID da inscrição
   * @returns {Promise<Object|null>} Inscrição ou null se não existir
   */
  static async findById(id) {
    try {
      const result = await pool.query(
        `SELECT 
           i.id,
           i.usuario_id,
           i.evento_id,
           i.inscrito_em,
           u.nome AS usuario_nome,
           e.titulo AS evento_titulo
         FROM inscricoes i
         LEFT JOIN usuarios u ON u.id = i.usuario_id
         LEFT JOIN eventos e ON e.id = i.evento_id
         WHERE i.id = $1`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Erro ao buscar inscrição com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria uma nova inscrição (usa a data/hora atual).
   * @param {Object} data - Dados da inscrição
   * @param {number} data.usuario_id
   * @param {number} data.evento_id
   * @returns {Promise<Object>} Inscrição recém-criada
   */
  static async create({ usuario_id, evento_id }) {
    try {
      const result = await pool.query(
        `INSERT INTO inscricoes (usuario_id, evento_id, inscrito_em)
         VALUES ($1, $2, NOW())
         RETURNING id, usuario_id, evento_id, inscrito_em`,
        [usuario_id, evento_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar inscrição:', error);
      throw error;
    }
  }

  /**
   * Remove uma inscrição pelo ID.
   * @param {number} id - ID da inscrição a ser removida
   * @returns {Promise<boolean>} True se removido, false caso contrário
   */
  static async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM inscricoes WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Erro ao deletar inscrição com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Inscricao;
