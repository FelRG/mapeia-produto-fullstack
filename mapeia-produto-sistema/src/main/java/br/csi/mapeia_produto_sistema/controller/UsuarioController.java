package br.csi.mapeia_produto_sistema.controller;

import br.csi.mapeia_produto_sistema.infra.exceptions.UsuarioCadastradoException;
import br.csi.mapeia_produto_sistema.model.DadosUsuario;
import br.csi.mapeia_produto_sistema.model.Usuario;
import br.csi.mapeia_produto_sistema.service.UsuarioService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    // Construtor que injeta o serviço de cliente para ser usado nos métodos
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    // Criar usuário
    @PostMapping
    @Transactional
    public ResponseEntity<Usuario> criarUsuario(@RequestBody @Valid Usuario usuario, UriComponentsBuilder uriBuilder) {
        try {
        Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
        URI uri = uriBuilder.path("/usuario/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(novoUsuario);
        } catch (UsuarioCadastradoException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    // Listar todos os usuários
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    // Buscar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.buscarUsuarioPorId(id);
            return ResponseEntity.ok(usuario);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar usuário
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        try {
            Usuario atualizado = usuarioService.atualizarUsuario(id, usuarioAtualizado);
            return ResponseEntity.ok(atualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar usuário
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarUsuario(@PathVariable Long id) {
        try {
            usuarioService.deletarUsuario(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Buscar usuários por nome (ex: /usuario/buscar?q=joao)
    @GetMapping("/buscar")
    public ResponseEntity<List<Usuario>> buscarUsuariosPorNome(@RequestParam(value = "q", required = false, defaultValue = "") String termo) {
        List<Usuario> usuarios = usuarioService.buscarPorNome(termo);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/findById/{id}")
    public DadosUsuario findById(@PathVariable Long id) { return this.usuarioService.findUsuario(id); }

    @GetMapping("/findAll")
    public List<DadosUsuario> findAll(){
        return this.usuarioService.findAllUsuarios();
    }

    @GetMapping("/findByEmail")
    public ResponseEntity<Usuario> buscarUsuarioPorEmail(@RequestParam(value = "email", required = false, defaultValue = "") String termo) {
        Usuario usuario = usuarioService.buscarPorEmail(termo);
        return ResponseEntity.ok(usuario);
    }
}