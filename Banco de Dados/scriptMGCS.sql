CREATE DATABASE MGCS;
USE MGCS;

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    telefone VARCHAR(15) UNIQUE,
    estado VARCHAR(2),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(20)
);

CREATE TABLE cidades(
	idCidades INT PRIMARY KEY AUTO_INCREMENT,
    cidade VARCHAR(18)
);

CREATE TABLE avaliacao(
	idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
	fkCidade INT,
    FOREIGN KEY (fkCidade) REFERENCES cidades(idCidades),
    comentario VARCHAR(200),
	fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

SELECT * FROM usuario;
SELECT * FROM cidades;
SELECT * FROM avaliacao;