package br.csi.mapeia_produto_sistema.infra.security;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class UploadDirectoryInitializer {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @PostConstruct
    public void init() {
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (created) {
                System.out.println("Pasta /uploads criada em: " + UPLOAD_DIR);
            } else {
                System.err.println("Não foi possível criar a pasta /uploads.");
            }
        }
    }
}

