-- V4__associacao_id_simples.sql

-- 1. Remover chave primária composta antiga
ALTER TABLE Associacao
    DROP CONSTRAINT Associacao_pkey;

-- 2. Adicionar coluna ID simples (auto-incremento)
ALTER TABLE Associacao
    ADD COLUMN id SERIAL;

-- 3. Definir nova chave primária
ALTER TABLE Associacao
    ADD PRIMARY KEY (id);

-- 4. (Opcional) Adicionar índice para melhorar performance em joins ou filtros
CREATE INDEX idx_associacao_usuario ON Associacao(fk_Usuario_idusuario);
CREATE INDEX idx_associacao_produto ON Associacao(fk_Produto_idproduto);
CREATE INDEX idx_associacao_estabelecimento ON Associacao(fk_Estabelecimento_idest);
