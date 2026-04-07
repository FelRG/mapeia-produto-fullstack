# 📦 Mapeia Produto - Fullstack

Sistema web para **mapeamento de produtos locais**, permitindo que usuários encontrem produtos disponíveis em estabelecimentos através de **geolocalização em mapa interativo**.

---

## 🚀 Demonstração do Sistema

- 🎥 **Apresentação - Entrega 3**  
  https://drive.google.com/file/d/1NaerodhPICzPuCQQTfPZ6oJ0biT-vu0I/view?usp=sharing  

- 🎥 **Apresentação - Entrega 4**  
  https://drive.google.com/file/d/1hvQToRHwgx5IT2r8__GcLrPoFtjrw0Gf/view?usp=sharing  

---

## 🎯 Objetivo

O sistema tem como propósito:

- Facilitar a descoberta de produtos locais  
- Conectar produtores, estabelecimentos e consumidores  
- Incentivar o consumo regional  
- Utilizar mapa interativo com geolocalização  

---

## 🏗️ Arquitetura do Projeto

- mapeia-produto-sistema --> Backend (Spring Boot)
- mapeiaproduto-app --> Frontend (Angular)


### 🔙 Backend (Spring Boot)

- API REST em Java  
- Regras de negócio  
- Integração com PostgreSQL  
- Controle de usuários e permissões  

### 🔜 Frontend (Angular)

- Angular 15  
- Interface responsiva  
- Consumo da API REST  
- Integração com Google Maps  

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Java + Spring Boot 3  
- **Frontend:** Angular 15  
- **Banco de Dados:** PostgreSQL  
- **Mapas:** Google Maps API  
- **Ferramentas:** Git, IntelliJ IDEA  

---

## 👥 Perfis de Usuário

- 👤 Consumidor  
- 🧑‍🌾 Produtor  
- 🛠️ Administrador  
- 🌐 Usuário externo (não autenticado)  

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

- Cadastro de usuário  
- Login  
- Gerenciamento de conta  

### 📦 Produtos

- Cadastro e edição  
- Visualização  
- Exclusão

### 🏪 Estabelecimentos

- Cadastro e edição  
- Visualização  
- Exclusão

### 🔗 Associações

- Vincular produtos a estabelecimentos  
- Visualizar relações  
- Gerenciar vínculos  

### 🗺️ Mapa (Principal funcionalidade)

- Visualização de produtos por localização  
- Busca por:
  - Nome do produto 
- Interação com marcadores no mapa  

### 🛠️ Administração

- Gerenciar usuários  
---

## 📊 Diagrama de Caso de Uso

Este diagrama representa:

- Interação entre Produtor/Consumidor, Admin e Usuário Externo  
- Principais ações como:
  - Cadastro de produtos e estabelecimentos  
  - Associação entre entidades   
  - Visualização via geolocalização  

---

## 🗄️ Modelo de Dados

### Principais entidades:

- Usuário  
- Produto  
- Estabelecimento  
- Associação (Produto x Estabelecimento)  

### Destaques:

- Relacionamentos entre:
  - Usuário ↔ Produto  
  - Usuário ↔ Estabelecimento  
  - Produto ↔ Estabelecimento  
- Controle de status (ativo)  
- Registro de datas  

---

## ▶️ Como Executar o Projeto

### 🔧 Backend

```bash
cd mapeia-produto-sistema
./mvnw spring-boot:run
```

Ou execute pela IDE (IntelliJ)

### 💻 Frontend

```bash
cd mapeiaproduto-app
npm install
ng serve
```
Acesse:
```bash
http://localhost:4200/
```
### 🧪 Testes
Frontend
```bash
ng test
```
