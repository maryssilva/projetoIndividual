-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!
/* para workbench - local - desenvolvimento */

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

SELECT cidade AS 'Cidade', COUNT(fkCidade) AS 'Avaliações'
FROM avaliacao
JOIN cidades
ON idCidades = fkCidade
GROUP BY cidade;

/* para sql server - remoto - produção */
CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* altere esta tabela de acordo com o que está em INSERT de sua API do arduino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);
