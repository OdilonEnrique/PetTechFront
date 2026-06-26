# PetTech Front - Plataforma Educativa para Cuidados com Animais

## Integrantes

* José Murilo Palácio Duarte
* Antonio Heric Bezerra Pacheco
* Odilon Enrique Gomes Duarte
* Paulo Rodolfo Silva Barboza
* Diogo Vieira Antunes

---

# 1. Introdução

O PetTech Front é a interface web da plataforma PetTech, desenvolvida com o objetivo de permitir que os usuários visualizem, cadastrem e interajam com publicações educativas sobre cuidados com animais domésticos.

A aplicação permite o cadastro de pessoas, animais, posts, comentários e curtidas, funcionando como a camada visual responsável por consumir a API do backend e apresentar os dados de forma organizada, responsiva e intuitiva.

O projeto foi desenvolvido como atividade da disciplina de Programação Orientada a Objetos (POO), utilizando React, TypeScript e conceitos modernos de componentização, consumo de API e gerenciamento de estado assíncrono.

---

# 2. Objetivos do Projeto

## Objetivo Geral

Desenvolver uma interface web para a plataforma PetTech, permitindo que os usuários acessem e interajam com conteúdos educativos sobre animais domésticos.

## Objetivos Específicos

* Exibir uma listagem de posts relacionados aos animais cadastrados.
* Permitir o cadastro de pessoas para identificação dos usuários.
* Permitir o cadastro de animais com informações de cuidado.
* Permitir a criação de publicações relacionadas aos animais.
* Permitir a visualização detalhada de posts.
* Permitir comentários em publicações.
* Permitir curtidas em publicações.
* Consumir os dados da API desenvolvida no backend.
* Aplicar componentização com React.
* Organizar estilos CSS por responsabilidade.
* Utilizar React Query para controle de requisições e atualização de dados.
* Utilizar TypeScript para maior segurança na tipagem dos dados.

---

# 3. Tecnologias Utilizadas

## Frontend

* React
* TypeScript
* Vite
* CSS
* Axios
* TanStack React Query
* React Toastify
* Lucide React

## Ferramentas de Desenvolvimento

* Visual Studio Code
* Git
* GitHub
* Vercel
* Navegador Web
* API REST do backend PetTech

---

# 4. Arquitetura do Sistema

O frontend foi estruturado de forma componentizada, separando responsabilidades entre componentes visuais, hooks, serviços HTTP, tipos e estilos.

```txt
Usuário
   ↓
Interface React
   ↓
Componentes
   ↓
Hooks e Requisições HTTP
   ↓
API Backend
   ↓
Banco de Dados
```

## Estrutura de Pastas

```txt
src/
│
├── assets/
│
├── components/
│   ├── empty-feed/
│   ├── header/
│   ├── modal/
│   ├── modals/
│   │   ├── create-animal-modal/
│   │   ├── create-post-modal/
│   │   ├── modals-register-pessoa/
│   │   └── post-detail-modal/
│   │
│   └── post-card/
│
├── constants/
│
├── hooks/
│   └── useCurrentPessoa.ts
│
├── http/
│   ├── animais/
│   │   ├── useCreateAnimal.ts
│   │   └── useListAnimais.ts
│   │
│   ├── comentarios/
│   │   ├── useCreateComentario.ts
│   │   └── useListComentarioByPost.ts
│   │
│   ├── pessoa/
│   │   └── useCreatePessoa.ts
│   │
│   └── posts/
│       ├── useCreatePost.ts
│       ├── useCurtirPost.ts
│       └── useListPosts.ts
│
├── lib/
│   └── api.ts
│
├── styles/
│   ├── animal.css
│   ├── buttons.css
│   ├── comments.css
│   ├── feed.css
│   ├── forms.css
│   ├── global.css
│   ├── header.css
│   ├── modal.css
│   ├── post-card.css
│   ├── post-detail.css
│   └── responsive.css
│
├── types/
│   ├── animal.d.ts
│   ├── comentario.d.ts
│   ├── pessoa.d.ts
│   └── post.d.ts
│
├── utils/
│
├── App.tsx
└── main.tsx
```

---

# 5. Conceitos Aplicados no Frontend

## Componentização

A aplicação foi dividida em componentes menores e reutilizáveis, facilitando a manutenção e a organização do código.

Exemplos de componentes:

* Header
* EmptyFeed
* PostCard
* RegisterPessoaModal
* CreateAnimalModal
* CreatePostModal
* PostDetailModal

---

## Separação de Responsabilidades

Cada parte da aplicação possui uma função específica:

| Camada/Pasta | Responsabilidade                  |
| ------------ | --------------------------------- |
| components   | Componentes visuais da interface  |
| hooks        | Lógicas reutilizáveis do frontend |
| http         | Requisições para a API            |
| lib          | Configurações compartilhadas      |
| styles       | Arquivos de estilização           |
| types        | Tipagens TypeScript               |
| utils        | Funções auxiliares                |
| App.tsx      | Composição principal da aplicação |
| main.tsx     | Inicialização da aplicação React  |

---

## Tipagem com TypeScript

O projeto utiliza TypeScript para definir os formatos dos principais dados utilizados pela aplicação.

Principais tipos:

* Pessoa
* Animal
* Post
* Comentario

Exemplo:

```ts
export type Post = {
  id: number;
  animalId: number;
  titulo: string;
  conteudo: string;
  fotoUrl?: string | null;
  likes: number;
  createdAt?: string;
};
```

---

## Consumo de API

A comunicação com o backend é realizada através de uma instância do Axios configurada em `src/lib/api.ts`.

```ts
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

A URL da API é definida por variável de ambiente, permitindo que o frontend seja conectado a diferentes ambientes, como desenvolvimento local e produção.

---

## Gerenciamento de Requisições

O projeto utiliza TanStack React Query para controlar requisições, cache, carregamento, erros e atualização automática dos dados após ações como cadastro, comentário e curtida.

Exemplos de hooks HTTP:

* useListAnimais
* useCreateAnimal
* useListPosts
* useCreatePost
* useCurtirPost
* useCreatePessoa
* useCreateComentario
* useListComentariosByPost

---

## Armazenamento Local do Usuário

O frontend utiliza `localStorage` para armazenar os dados da pessoa cadastrada, permitindo que o usuário continue identificado durante o uso da aplicação.

---

# 6. Integração com o Backend

O frontend consome a API REST do backend PetTech, responsável por gerenciar os dados de pessoas, animais, posts, comentários, curtidas e imagens.

## Fluxo de Comunicação

```txt
React Frontend
   ↓
Axios / Fetch
   ↓
API Backend
   ↓
Prisma ORM
   ↓
PostgreSQL
```

---

# 7. Funcionalidades Implementadas

## Listagem de Posts

A tela principal exibe os posts cadastrados na plataforma, mostrando informações como título, conteúdo, imagem, animal relacionado e quantidade de curtidas.

---

## Cadastro de Pessoa

Permite cadastrar uma pessoa através do nome, possibilitando que ela seja identificada ao comentar nas publicações.

O usuário cadastrado é salvo localmente no navegador.

---

## Cadastro de Animais

Permite cadastrar animais com informações completas de cuidado.

Cada animal pode conter:

* Foto
* Nome
* Espécie
* Raça
* Faixa Etária
* Alimentação
* Higiene
* Primeiros Socorros

---

## Criação de Posts

Permite criar publicações relacionadas a um animal cadastrado.

Cada post pode conter:

* Animal relacionado
* Título
* Conteúdo
* Imagem

---

## Detalhamento de Posts

Ao clicar em uma publicação, é aberta uma modal com mais detalhes do post, incluindo informações do animal e área de comentários.

---

## Sistema de Comentários

Permite que uma pessoa cadastrada publique comentários em posts.

Cada comentário é vinculado a:

* Pessoa
* Post
* Texto do comentário

---

## Sistema de Curtidas

Permite que o usuário curta uma publicação, atualizando a quantidade de curtidas exibida na interface.

---

## Upload de Imagens

O frontend envia imagens de animais e posts para o backend utilizando `FormData`.

O backend é responsável pelo processamento do upload e armazenamento das imagens em nuvem.

---

## Feedback Visual

O projeto utiliza mensagens de sucesso e erro para informar o usuário sobre o resultado das ações realizadas, como cadastro de pessoa e criação de comentário.

---

## Responsividade

A interface possui arquivos CSS separados e um arquivo específico para responsividade, permitindo melhor adaptação da aplicação em diferentes tamanhos de tela.

---

# 8. Rotas Consumidas da API

## Pessoas

| Método | Endpoint |
| ------ | -------- |
| POST   | /pessoas |
| GET    | /pessoas |

---

## Animais

| Método | Endpoint |
| ------ | -------- |
| POST   | /animais |
| GET    | /animais |

---

## Posts

| Método | Endpoint          |
| ------ | ----------------- |
| POST   | /posts            |
| GET    | /posts            |
| PATCH  | /posts/:id/curtir |

---

## Comentários

| Método | Endpoint                  |
| ------ | ------------------------- |
| POST   | /comentarios              |
| GET    | /comentarios/post/:postId |

---

# 9. Variáveis de Ambiente

Para executar o frontend corretamente, é necessário configurar a URL da API backend.

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
VITE_API_URL=
```

Exemplo para ambiente local:

```env
VITE_API_URL=http://localhost:3333
```

Exemplo para ambiente em produção:

```env
VITE_API_URL=https://sua-api.com
```

---

# 10. Como Executar o Projeto

## Clonar o Repositório

```bash
git clone https://github.com/OdilonEnrique/PetTechFront.git
```

## Acessar a Pasta do Projeto

```bash
cd PetTechFront
```

## Instalar Dependências

```bash
npm install
```

## Configurar Variável de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
VITE_API_URL=
```

## Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

## Gerar Build de Produção

```bash
npm run build
```

## Visualizar Build Localmente

```bash
npm run preview
```

---

# 11. Scripts Disponíveis

| Comando         | Descrição                                |
| --------------- | ---------------------------------------- |
| npm run dev     | Inicia o projeto em modo desenvolvimento |
| npm run build   | Gera a versão de produção                |
| npm run lint    | Executa a verificação de lint            |
| npm run preview | Visualiza o build de produção localmente |

---

# 12. Relação com Programação Orientada a Objetos

Embora o frontend seja desenvolvido com React, ele trabalha diretamente com as entidades definidas no domínio do backend.

As principais entidades do sistema são representadas no frontend por tipos TypeScript:

* Pessoa
* Animal
* Post
* Comentario

Essas entidades refletem os objetos principais da aplicação e permitem que os dados sejam manipulados de forma organizada, segura e coerente com a estrutura do backend.

---

# 13. Melhorias Futuras

* Implementar autenticação de usuários.
* Adicionar edição de posts.
* Adicionar exclusão de posts.
* Adicionar exclusão de comentários.
* Criar sistema de favoritos.
* Criar busca por animais e posts.
* Criar filtro por espécie ou faixa etária.
* Melhorar validações dos formulários.
* Adicionar paginação no feed.
* Criar perfil de usuário.
* Criar dashboard administrativo.
* Adicionar modo escuro.
* Melhorar acessibilidade da aplicação.

---

# 14. Conclusão

O desenvolvimento do PetTech Front permitiu aplicar conceitos importantes de desenvolvimento web moderno, como componentização, consumo de API REST, tipagem com TypeScript, gerenciamento de estado assíncrono e organização de estilos.

A utilização de React, Vite, TypeScript, Axios e TanStack React Query proporcionou uma interface organizada, reutilizável e integrada ao backend da plataforma PetTech.

Dessa forma, o frontend complementa o backend ao oferecer uma experiência visual para que os usuários possam cadastrar animais, criar posts, comentar, curtir e acessar informações educativas sobre cuidados com animais domésticos.
