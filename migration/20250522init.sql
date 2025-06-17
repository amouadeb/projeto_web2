
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


INSERT INTO usuarios (nome, email, senha)
VALUES
('João Silva', 'joao@email.com', 'senha123'),
('Maria Oliveira', 'maria@email.com', 'senha456'),
('Carlos Souza', 'carlos@email.com', 'senha789');


INSERT INTO eventos (titulo, descricao, data, local, status)
VALUES
('Reunião de Projeto', 'Reunião semanal do time.', '2025-06-20', 'Sala 1', 'agendado'),
('Workshop de Node.js', 'Oficina prática de Node.', '2025-06-21', 'Laboratório', 'agendado'),
('Apresentação Final', 'Apresentação do projeto final.', '2025-06-22', 'Auditório', 'agendado');



INSERT INTO inscricoes (usuario_id, evento_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 2),
(2, 3);
