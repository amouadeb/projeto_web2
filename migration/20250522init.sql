
CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  senha      VARCHAR(255) NOT NULL,
  criado_em  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  data VARCHAR(20) NOT NULL,
  local VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'agendado'
);



CREATE TABLE IF NOT EXISTS inscricoes (
  id            SERIAL PRIMARY KEY,
  usuario_id    INTEGER REFERENCES usuarios(id),
  evento_id     INTEGER REFERENCES eventos(id),
  inscrito_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
