-- Modelo Físico do Banco de Dados para a Plataforma de Eventos

-- Tabela de Eventos
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
