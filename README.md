# 📚 AppStreamingHQs

Aplicativo web de streaming de histórias em quadrinhos (HQs). Permite navegar por um catálogo de títulos e ler os quadrinhos direto no navegador, sem precisar baixar arquivos.


## ✨ Funcionalidades

- Catálogo de HQs com capa, título e descrição
- Leitor de quadrinhos com navegação entre páginas
- Interface responsiva, para computador e celular

> Ajuste esta lista conforme o que o seu app realmente faz.

## 🛠️ Tecnologias utilizadas

| Categoria | Tecnologia |
| --- | --- |
| Linguagem | TypeScript |
| Ferramenta de build | [Vite](https://vite.dev/) |
| Gerenciador de pacotes | npm |
| Automação | GitHub Actions |

## 📂 Estrutura do projeto

```
.
├── .github/workflows/   # Automações do GitHub Actions
├── src/                 # Código-fonte da aplicação
├── index.html           # Página principal
├── metadata.json        # Informações do app
├── .env.example         # Modelo das variáveis de ambiente
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── vite.config.ts       # Configuração do Vite
```

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior (o npm já vem junto)
- [Git](https://git-scm.com/)

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/kauanunifran-sys/streaming-HQs.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd streaming-HQs
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Crie o arquivo de variáveis de ambiente a partir do modelo:

   ```bash
   cp .env.example .env
   ```

   No Windows (Prompt de Comando), use `copy .env.example .env`.
   Depois abra o arquivo `.env` e preencha as variáveis que estiverem listadas (por exemplo, chaves de API).

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Abra no navegador o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

### Gerar a versão de produção

```bash
npm run build
```

Os arquivos otimizados serão criados na pasta `dist/`. Para testar essa versão localmente:

```bash
npm run preview
```

## 🖼️ Capturas de tela

<!-- Adicione prints do app na pasta docs/ e use: ![Tela inicial](docs/tela-inicial.png) -->

## 🤝 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b minha-feature`)
3. Faça commit das alterações (`git commit -m "Adiciona minha feature"`)
4. Envie para o seu fork (`git push origin minha-feature`)
5. Abra um Pull Request

## ⚠️ Aviso sobre conteúdo

Use apenas HQs de domínio público, de autoria própria ou com autorização de quem detém os direitos autorais.


👤 Autores

Kauan and caio melo
