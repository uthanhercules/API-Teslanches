CREATE DATABASE TESLANCHES;

CREATE TABLE categoria(
  id SERIAL NOT NULL primary key,
  nome varchar(30) NOT NULL
);

INSERT INTO categoria (nome)
VALUES
('Diversos'),
('Lanches'),
('Carnes'),
('Massas'),
('Pizzas'),
('Japonesa'),
('Chinesa'),
('Mexicano'),
('Brasileira'),
('Italiana'),
('Árabe')

CREATE TABLE usuario(
  id SERIAL NOT NULL primary key,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  senha text NOT NULL
);

CREATE TABLE restaurante(
id SERIAL NOT NULL primary key,
  usuario_id int NOT NULL references usuario(id),
  nome varchar(50) NOT NULL,
  descricao varchar(100),
  imagem_restaurante TEXT,
  categoria_id int NOT NULL references categoria(id),
  taxa_entrega int NOT NULL DEFAULT(0),
  tempo_entrega_minutos int NOT NULL DEFAULT(30),
  valor_minimo_pedido int NOT NULL DEFAULT(0)
);

CREATE TABLE produto(
  id SERIAL NOT NULL primary key,
  restaurante_id int NOT NULL references restaurante(id),
  nome varchar(50) NOT NULL,
  descricao varchar(100),
  imagem_produto TEXT,
  preco int NOT NULL,
  ativo boolean NOT NULL DEFAULT(TRUE),
  permite_observacoes boolean NOT NULL DEFAULT(FALSE)
);