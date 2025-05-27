package br.csi.mapeia_produto_sistema.infra.exceptions;

public class UsuarioCadastradoException extends RuntimeException{

    public UsuarioCadastradoException(String email){
        super("Usuário já cadastrado para o email" + email);
    }
}
