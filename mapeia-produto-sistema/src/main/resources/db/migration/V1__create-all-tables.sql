CREATE TABLE Usuario (
                         idusuario SERIAL NOT NULL PRIMARY KEY,
                         nomeusuario VARCHAR(100) NOT NULL,
                         email VARCHAR(100) NOT NULL UNIQUE,
                         telefone VARCHAR(50),
                         senha VARCHAR(100) NOT NULL,
                         tipopermissao VARCHAR(50) NOT NULL,
                         ativo CHAR(1) NOT NULL,
                         data TIMESTAMP
);
CREATE TABLE Estabelecimento (
                                 idestabelecimento SERIAL NOT NULL PRIMARY KEY,
                                 nomeestabelecimento VARCHAR(100) NOT NULL,
                                 endereco VARCHAR(150) NOT NULL,
                                 numero VARCHAR(10) NOT NULL,
                                 estado CHAR(2) NOT NULL ,
                                 categoria VARCHAR(50) NOT NULL,
                                 ativo CHAR(1) NOT NULL,
                                 cidade VARCHAR(100) NOT NULL,
                                 complemento VARCHAR(100),
                                 data TIMESTAMP,
                                 fk_Usuario_idusuario INTEGER,
                                 CONSTRAINT fk_usuario_estabelecimento FOREIGN KEY (fk_Usuario_idusuario) REFERENCES Usuario(idusuario)
);

CREATE TABLE Produto (
                         idproduto SERIAL NOT NULL PRIMARY KEY,
                         nomeproduto VARCHAR(100) NOT NULL ,
                         marca VARCHAR(50) NOT NULL,
                         municipiorigem VARCHAR(100) NOT NULL,
                         fabricante VARCHAR(100) NOT NULL,
                         ativo CHAR(1) NOT NULL,
                         foto TEXT,
                         data TIMESTAMP,
                         fk_Usuario_idusuario INTEGER,
                         CONSTRAINT fk_usuario_produto FOREIGN KEY (fk_Usuario_idusuario) REFERENCES Usuario(idusuario)
);


CREATE TABLE Associacao (
                            fk_Produto_idproduto INTEGER,
                            fk_Estabelecimento_idest INTEGER,
                            ativo CHAR(1) NOT NULL,
                            data TIMESTAMP,
                            PRIMARY KEY (fk_Produto_idproduto, fk_Estabelecimento_idest),
                            CONSTRAINT fk_associacao_produto FOREIGN KEY (fk_Produto_idproduto) REFERENCES Produto(idproduto),
                            CONSTRAINT fk_associacao_estabelecimento FOREIGN KEY (fk_Estabelecimento_idest) REFERENCES Estabelecimento(idestabelecimento)
);