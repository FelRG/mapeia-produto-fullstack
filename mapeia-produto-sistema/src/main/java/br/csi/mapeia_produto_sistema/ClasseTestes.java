package br.csi.mapeia_produto_sistema;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class ClasseTestes {
    public static void main(String[] args) {
        String senhaPura = "1234";
        String senhaCriptografada = new BCryptPasswordEncoder().encode(senhaPura);
        System.out.println(senhaCriptografada);
    }
}
