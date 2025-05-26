
const pool = require('../config/database');

class Evento {
  /**
   * Encontra todos os eventos
   * @returns {Promise<Array>} Lista de eventos
   */
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM eventos ORDER BY data DESC');
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      throw error;
    }
  }

  /**
   * Encontra um evento pelo ID
   * @param {number} id - ID do evento
   * @returns {Promise<Object|null>} Evento encontrado ou null
   */
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM eventos WHERE id = $1', [id]);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`Erro ao buscar evento com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria um novo evento
   * @param {Object} eventoData - Dados do evento
   * @returns {Promise<Object>} Evento criado
   */
  static async create(eventoData) {
    try {
      const { titulo, descricao, data, local, status } = eventoData;
      const query = `
        INSERT INTO eventos (titulo, descricao, data, local, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [titulo, descricao, data, local, status || 'agendado'];
      
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

  /**
   * Atualiza um evento existente
   * @param {number} id - ID do evento
   * @param {Object} eventoData - Novos dados do evento
   * @returns {Promise<Object|null>} Evento atualizado ou null
   */
  static async update(id, eventoData) {
    try {
      const { titulo, descricao, data, local, status } = eventoData;
      const query = `
        UPDATE eventos
        SET titulo = $1, descricao = $2, data = $3, local = $4, status = $5, updated_at = NOW()
        WHERE id = $6
        RETURNING *
      `;
      const values = [titulo, descricao, data, local, status, id];
      
      const result = await pool.query(query, values);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`Erro ao atualizar evento com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Remove um evento
   * @param {number} id - ID do evento
   * @returns {Promise<boolean>} True se removido com sucesso
   */
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM eventos WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Erro ao excluir evento com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Evento;
