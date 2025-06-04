-- 1. Cria tabela de usuários primeiro (porque eventos e inscrições dependem dela)
CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  senha      VARCHAR(255) NOT NULL,
  criado_em  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cria tabela de eventos (não depende de inscrições, mas referenciará usuários como organizador)
CREATE TABLE IF NOT EXISTS eventos (
  id             SERIAL PRIMARY KEY,
  nome           VARCHAR(100)   NOT NULL,
  descricao      TEXT,
  data_evento    TIMESTAMP,
  local          VARCHAR(100),
  status         VARCHAR(20)    DEFAULT 'agendado',
  organizador_id INTEGER       REFERENCES usuarios(id),
  created_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- 3. Cria tabela de inscrições (depende de usuários e de eventos)
CREATE TABLE IF NOT EXISTS inscricoes (
  id            SERIAL PRIMARY KEY,
  usuario_id    INTEGER REFERENCES usuarios(id),
  evento_id     INTEGER REFERENCES eventos(id),
  inscrito_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
