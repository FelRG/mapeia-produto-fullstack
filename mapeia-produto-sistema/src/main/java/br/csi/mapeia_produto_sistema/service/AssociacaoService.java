package br.csi.mapeia_produto_sistema.service;

import br.csi.mapeia_produto_sistema.dto.AssociacaoDTO;
import br.csi.mapeia_produto_sistema.model.*;
import br.csi.mapeia_produto_sistema.repository.AssociacaoRepository;
import br.csi.mapeia_produto_sistema.repository.EstabelecimentoRepository;
import br.csi.mapeia_produto_sistema.repository.ProdutoRepository;
import br.csi.mapeia_produto_sistema.repository.UsuarioRepository;
import br.csi.mapeia_produto_sistema.service.mapper.AssociacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssociacaoService {

    private final AssociacaoRepository associacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProdutoRepository produtoRepository;
    private final EstabelecimentoRepository estabelecimentoRepository;

    public AssociacaoDTO create(AssociacaoDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Estabelecimento estabelecimento = estabelecimentoRepository.findById(dto.getEstabelecimentoId())
                .orElseThrow(() -> new RuntimeException("Estabelecimento não encontrado"));

        Associacao associacao = AssociacaoMapper.toEntity(dto, usuario, produto, estabelecimento);
        associacao.setDatacadastro(new Date());

        Associacao saved = associacaoRepository.save(associacao);
        return AssociacaoMapper.toDTO(saved);
    }

    public AssociacaoDTO getById(Long id) {
        Associacao associacao = associacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Associação não encontrada"));
        return AssociacaoMapper.toDTO(associacao);
    }

    public void deleteById(Long id) {
        if (!associacaoRepository.existsById(id)) {
            throw new RuntimeException("Associação não encontrada");
        }
        associacaoRepository.deleteById(id);
    }

    public AssociacaoDTO update(AssociacaoDTO dto) {
        if (dto.getId() == null) {
            throw new IllegalArgumentException("ID da associação é obrigatório para atualização");
        }

        Associacao associacao = associacaoRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Associação não encontrada"));

        associacao.setAtivo(dto.getAtivo());
        // associacao.setDatacadastro(dto.getDatacadastro()); // Se quiser permitir alteração da data

        Associacao updated = associacaoRepository.save(associacao);
        return AssociacaoMapper.toDTO(updated);
    }

    public List<AssociacaoDTO> getAll() {
        return associacaoRepository.findAll()
                .stream()
                .map(AssociacaoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<AssociacaoDTO> getByProdutoId(Long produtoId) {
        return associacaoRepository.findByProdutoId(produtoId)
                .stream()
                .map(AssociacaoMapper::toDTO)
                .collect(Collectors.toList());
    }
}


