-- 1. Renomear coluna `data` para `datacadastro` nas tabelas
ALTER TABLE Usuario
    RENAME COLUMN data TO datacadastro;

ALTER TABLE Estabelecimento
    RENAME COLUMN data TO datacadastro;

ALTER TABLE Produto
    RENAME COLUMN data TO datacadastro;

ALTER TABLE Associacao
    RENAME COLUMN data TO datacadastro;

-- 2. Adicionar coluna fk_Usuario_idusuario em Associacao
ALTER TABLE Associacao
    ADD COLUMN fk_Usuario_idusuario INTEGER;

-- 3. Adicionar nova constraint de chave estrangeira para Usuario
ALTER TABLE Associacao
    ADD CONSTRAINT fk_associacao_usuario FOREIGN KEY (fk_Usuario_idusuario)
        REFERENCES Usuario(idusuario);

-- 4. Atualizar chave primária de Associacao
-- (1) Remover chave primária atual
ALTER TABLE Associacao
    DROP CONSTRAINT Associacao_pkey;

-- (2) Definir nova chave primária composta
ALTER TABLE Associacao
    ADD PRIMARY KEY (fk_Usuario_idusuario, fk_Produto_idproduto, fk_Estabelecimento_idest);
