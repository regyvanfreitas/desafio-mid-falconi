# Projeto rodando na Vercel

🔗 [Acesse aqui](https://desafio-mid-falconi-front.vercel.app/)

# Sistema de Gestão de Usuários - Desafio Técnico Fullstack

Uma aplicação fullstack para gerenciamento de usuários e perfis, desenvolvida com **NestJS** no backend e **Next.js** no frontend.

## 🛠️ Tecnologias Utilizadas

### Backend (NestJS)

- **NestJS** - Framework Node.js para APIs escaláveis
- **TypeScript** - Tipagem estática
- **Class Validator** - Validação de dados
- **Swagger/OpenAPI** - Documentação automática da API
- **Jest** - Testes unitários

### Frontend (Next.js)

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilos utilitários
- **Headless UI** - Componentes acessíveis
- **Heroicons** - Ícones
- **React Hot Toast** - Notificações
- **Axios** - Cliente HTTP

## 🚀 Como Executar a Aplicação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd desafio-mid-falconi
```

### 2. Configurar o Backend

```bash
cd back-end
npm install
npm run start:dev
```

O backend estará rodando em: `http://localhost:4000`
Documentação da API: `http://localhost:4000/api#`

### 3. Configurar o Frontend

Siga os passos abaixo para preparar e rodar o front-end:

**1. Instale as dependências:**

```bash
cd front-end
npm install
```

**2. Configure as variáveis de ambiente:**

Crie um arquivo chamado `.env` dentro da pasta `front-end` com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> ⚠️ Altere a URL conforme o endereço da sua API backend. Se estiver rodando localmente, mantenha como acima. Se estiver usando uma API publicada, coloque a URL pública.

**3. Execute o front-end:**

```bash
npm run dev
```

O front-end estará disponível em: [http://localhost:3000](http://localhost:3000)

## 📋 Funcionalidades Implementadas

### ✅ Requisitos Obrigatórios

- **CRUD Completo de Usuários**

  - ✅ Criar usuário
  - ✅ Listar usuários
  - ✅ Buscar usuário por ID
  - ✅ Editar usuário
  - ✅ Remover usuário
  - ✅ Ativar/Desativar usuário

- **Gerenciamento de Perfis**

  - ✅ CRUD completo de perfis
  - ✅ Filtrar usuários por perfil

- **Entidades Corretas**
  - ✅ User (id, firstName, lastName, email, isActive, profileId)
  - ✅ Profile (id, name)

### ✅ Requisitos Técnicos

- ✅ TypeScript em todo o projeto
- ✅ NestJS no backend
- ✅ Next.js no frontend
- ✅ Dados mockados em memória
- ✅ API RESTful com status codes apropriados
- ✅ Frontend consumindo a API

### 🎯 Diferenciais Implementados

- ✅ Documentação Swagger completa
- ✅ Interface responsiva e moderna
- ✅ Validações robustas
- ✅ Tratamento de erros
- ✅ Notificações de feedback
- ✅ Filtros e busca em tempo real
- ✅ Loading states
- ✅ Confirmações para ações destrutivas

## 🏗️ Estrutura do Projeto

```
desafio-mid-falconi/
├── back-end/                 # API NestJS
│   ├── src/
│   │   ├── users/           # Módulo de usuários
│   │   ├── profiles/        # Módulo de perfis
│   │   ├── utils/          # Utilitários compartilhados
│   │   ├── middleware/     # Middlewares customizados
│   │   ├── filters/        # Exception filters
│   │   └── main.ts         # Configuração principal
│   ├── test/               # Testes E2E
│   └── package.json
├── front-end/              # Aplicação Next.js
│   ├── app/               # App Router (Pages)
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes UI base
│   │   ├── __tests__/    # Testes de componentes
│   │   ├── UserCard.tsx
│   │   └── UserForm.tsx
│   ├── lib/              # APIs e utilitários
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Usuários (`/users`)

- `GET /users` - Listar usuários (com filtro opcional por profileId)
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PATCH /users/:id` - Atualizar usuário
- `PATCH /users/:id/status` - Ativar/Desativar usuário
- `DELETE /users/:id` - Remover usuário

### Perfis (`/profiles`)

- `GET /profiles` - Listar perfis
- `GET /profiles/:id` - Buscar perfil por ID
- `POST /profiles` - Criar perfil
- `PATCH /profiles/:id` - Atualizar perfil
- `DELETE /profiles/:id` - Remover perfil

## 🧪 Testes

### Backend

```bash
cd back-end
npm run test           # Testes unitários
npm run test:cov      # Cobertura de testes
```

### Frontend

```bash
cd front-end
npm run test          # Testes unitários
npm run test:coverage # Cobertura de testes
```

## 🏛️ Decisões Arquiteturais

### Backend

- **Modular**: Separação clara em módulos (Users, Profiles)
- **DTOs**: Validação robusta de entrada com class-validator
- **Services**: Lógica de negócio centralizada
- **Exception Handling**: Tratamento consistente de erros
- **In-Memory Storage**: Arrays privados nos services para persistência temporária

### Frontend

- **Component-Driven**: Componentes reutilizáveis e modulares
- **Custom Hooks**: Lógica compartilhada
- **API Layer**: Abstração da comunicação HTTP
- **State Management**: useState para estado local
- **UI/UX**: Interface intuitiva com feedback visual

## 📝 Considerações Finais

Esta implementação atende todos os requisitos do desafio com foco em:

- ✅ **Funcionalidade**: Todos os CRUDs implementados
- ✅ **Código Limpo**: Estrutura organizada e bem documentada
- ✅ **TypeScript**: Tipagem consistente em todo projeto
- ✅ **Boas Práticas**: Validação, tratamento de erros, UX
- ✅ **Escalabilidade**: Arquitetura preparada para crescimento

A aplicação está pronta para uso.

---

**Desenvolvido por**: Regivan Freitas  
**Data**: Novembro 2025  
**Tecnologias**: NestJS + Next.js + TypeScript
