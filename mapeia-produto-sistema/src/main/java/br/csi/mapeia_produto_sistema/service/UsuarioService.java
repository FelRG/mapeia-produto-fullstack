package br.csi.mapeia_produto_sistema.service;

import br.csi.mapeia_produto_sistema.infra.exceptions.UsuarioCadastradoException;
import br.csi.mapeia_produto_sistema.model.DadosUsuario;
import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository){this.repository = repository;}

    // Criar ou atualizar
    public Usuario salvarUsuario(Usuario usuario) {
        boolean exists = repository.existsByEmail(usuario.getEmail());
        if(exists){
            throw new UsuarioCadastradoException(usuario.getEmail());
        }
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuario.setNomeUsuario(usuario.getNomeUsuario().toUpperCase());
        usuario.setDatacadastro(new Date());
        return repository.save(usuario);
    }

    // Buscar todos
    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

    // Buscar por ID
    public Usuario buscarUsuarioPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com id: " + id));
    }

    // Atualizar por ID
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarUsuarioPorId(id); // lança exceção se não encontrar

        // Deixa em letras maiusculas
        usuario.setNomeUsuario(usuarioAtualizado.getNomeUsuario().toUpperCase());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setTelefone(usuarioAtualizado.getTelefone());
//        usuario.setSenha(new BCryptPasswordEncoder().encode(usuarioAtualizado.getSenha()));
//        usuario.setSenha(usuarioAtualizado.getSenha());
        // Atualiza a senha somente se ela foi alterada
//        if (!usuarioAtualizado.getSenha().isBlank()) {
//            usuario.setSenha(new BCryptPasswordEncoder().encode(usuarioAtualizado.getSenha()));
//        }
        usuario.setTipoPermissao(usuarioAtualizado.getTipoPermissao());
        usuario.setAtivo(usuarioAtualizado.getAtivo());
//        usuario.setDatacadastro(usuarioAtualizado.getDatacadastro());

        return repository.save(usuario);
    }

    // Remover por ID
    public void deletarUsuario(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Usuário não encontrado com id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Usuario> buscarPorNome(String nome) {
        return repository.findByNomeUsuarioContainingIgnoreCase(nome);
    }

    public Usuario buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public DadosUsuario findUsuario(Long id){
        Usuario usuario = this.repository.getReferenceById(id);
        return new DadosUsuario(usuario);
    }

    public List<DadosUsuario> findAllUsuarios(){
        return this.repository.findAll().stream().map(DadosUsuario::new).toList();
    }

}

