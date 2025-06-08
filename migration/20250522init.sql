
CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  senha      VARCHAR(255) NOT NULL,
  criado_em  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);


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


CREATE TABLE IF NOT EXISTS inscricoes (
  id            SERIAL PRIMARY KEY,
  usuario_id    INTEGER REFERENCES usuarios(id),
  evento_id     INTEGER REFERENCES eventos(id),
  inscrito_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
