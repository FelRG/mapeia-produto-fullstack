-- 1. Remover constraints antigas que não têm ON DELETE CASCADE
ALTER TABLE Produto DROP CONSTRAINT fk_usuario_produto;
ALTER TABLE Estabelecimento DROP CONSTRAINT fk_usuario_estabelecimento;
ALTER TABLE Associacao DROP CONSTRAINT fk_associacao_usuario;

-- 2. Adicionar novas constraints com ON DELETE CASCADE
ALTER TABLE Produto
    ADD CONSTRAINT fk_usuario_produto FOREIGN KEY (fk_Usuario_idusuario)
        REFERENCES Usuario(idusuario) ON DELETE CASCADE;

ALTER TABLE Estabelecimento
    ADD CONSTRAINT fk_usuario_estabelecimento FOREIGN KEY (fk_Usuario_idusuario)
        REFERENCES Usuario(idusuario) ON DELETE CASCADE;

ALTER TABLE Associacao
    ADD CONSTRAINT fk_associacao_usuario FOREIGN KEY (fk_Usuario_idusuario)
        REFERENCES Usuario(idusuario) ON DELETE CASCADE;
