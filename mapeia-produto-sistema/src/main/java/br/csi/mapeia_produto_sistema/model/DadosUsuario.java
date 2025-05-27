package br.csi.mapeia_produto_sistema.model;

public record DadosUsuario(Long id, String email, String permissao) {
    public DadosUsuario(Usuario usuario){
        this(usuario.getId(), usuario.getEmail(), usuario.getTipoPermissao());
    }
}
