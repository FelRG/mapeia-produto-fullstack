package br.csi.mapeia_produto_sistema.service;

import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    private final UsuarioRepository repository;

    public AutenticacaoService(UsuarioRepository repository){
        this.repository = repository;
    }

    //Método destinado a criação de um UserDetail que será inserido no contexto do Spring

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        Usuario usuario = this.repository.findByEmail(email);
        if(usuario == null){
            throw new UsernameNotFoundException("Email ou senha incorretos");
        } else {
            UserDetails client = User.withUsername(usuario.getEmail()).password(usuario.getSenha()).authorities(usuario.getTipoPermissao()).build();
            return client;
        }
    }

}
