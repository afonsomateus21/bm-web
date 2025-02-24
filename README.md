# Beauty Manager

## 📋 Descrição
Este projeto consiste no front-end do Beauty Manager, uma aplicação de agendamento voltada para o salão de beleza House Pink. Ele também visa satisfazer os requisitos da disciplina Projeto Integrado I, do curso Sistemas e Mídias Digitais da Universidade Federal do Ceará.


## 👥 Equipe
- Afonso Mateus de Oliveira Souza - 552193
- Clara Livia Moura de Oliveira - 554010

## 🧑‍🏫 Professores Supervisores
- Cátia Luzia Oliveira da Silva
- Henrique Sérgio Lima Pequeno

## 📝 Requisitos
Atualmente, **41,67%** dos requisitos foram implementados.
<table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Descrição</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RF01</td>
      <td>Gerenciar usuário</td>
      <td>Permitir o cadastro, edição, visualização e exclusão de usuários do sistema (ADMIN e CLIENTE).</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF02</td>
      <td>Cadastrar administradores</td>
      <td>Permitir que usuários do tipo ADMIN criem novos usuários com permissões de administrador (ADMIN).</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF03</td>
      <td>Gerenciar serviços</td>
      <td>Permitir que usuários ADMIN cadastrem, atualizem, visualizem (ADMIN e CLIENTE) e excluam serviços disponíveis.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF04</td>
      <td>Visualizar serviços</td>
      <td>Permitir que usuários CLIENTE e ADMIN visualizem a lista de serviços cadastrados com seus detalhes.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF05</td>
      <td>Realizar agendamento</td>
      <td>Permitir que usuários CLIENTE realizem o agendamento de serviços, especificando data e horário.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF06</td>
      <td>Cancelar agendamento</td>
      <td>Permitir que usuários ADMIN e CLIENTE cancelem agendamentos de serviços existentes.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF07</td>
      <td>Notificar agendamento</td>
      <td>Notificar usuários ADMIN e CLIENTE sobre novos agendamentos realizados no sistema.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF08</td>
      <td>Notificar cancelamento</td>
      <td>Notificar usuários ADMIN e CLIENTE sobre cancelamentos de agendamentos no sistema.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF09</td>
      <td>Reservar horários</td>
      <td>Permitir que usuários ADMIN reservem horários específicos para CLIENTES VIP.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF10</td>
      <td>Cancelar horários</td>
      <td>Permitir que usuários ADMIN cancelem reservas de horários para CLIENTES VIP.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF11</td>
      <td>Realizar login</td>
      <td>Permitir que usuários (ADMIN ou CLIENTE) façam login no sistema com suas credenciais.</td>
      <td>Implementado</td>
    </tr>
    <tr>
      <td>RF12</td>
      <td>Realizar logout</td>
      <td>Permitir que usuários (ADMIN ou CLIENTE) façam logout do sistema, encerrando a sessão ativa.</td>
      <td>Implementado</td>
    </tr>
  </tbody>
</table>

## 🛠️ Tecnologias Utilizadas
As seguintes tecnologias foram utilizadas na construção do front-end:
<ul>
  <li>React</li>
  <li>TypeScript</li>
  <li>Vite</li>
  <li>React Router</li>
  <li>Tailwind CSS</li>
  <li>Material Design Icons</li>
</ul>

## 📦 Instalação

### 1. **Clone o repositório**
```bash
$ git clone https://github.com/afonsomateus21/bm-web.git
$ git clone git@github.com:afonsomateus21/bm-web.git se utilizar SSH
cd bm-web
```

### 2. **Instale as dependências**
```bash
npm install
```

### 3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias, como exemplo:
```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=test
VITE_GOOGLE_CLIENT_SECRET=test
```

### 4. **Execute o projeto**
```bash
npm run dev
```

O projeto estará disponível em:  
**http://localhost:5173** (ou outra porta, dependendo da configuração do Vite).

---

## 🗂️ Estrutura do Projeto
```bash

```

## ▶️ Como executar a aplicação

### 1. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

### 2. **Acesse a aplicação**
Abra o navegador e acesse:  
**http://localhost:5173**

## 📝 Licença
Este projeto está licenciado sob a **MIT License**.
