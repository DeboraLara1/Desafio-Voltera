# Desafio Voltera - Estimador de Idade por Nome

Uma aplicação web desenvolvida com SvelteKit que consulta a API gratuita [agify.io](https://agify.io) para estimar a idade de uma pessoa baseada no nome.

## Funcionalidades

- **Input de texto**: Digite um nome e veja a idade estimada
- **Debounce automático**: Consulta a API automaticamente após 500ms de pausa na digitação
- **URL dinâmica**: A URL é atualizada com o nome consultado (ex: `/?name=João`)
- **Responsivo**: Interface adaptada para dispositivos móveis e desktop
- **Acessível**: Implementa boas práticas de acessibilidade

## Tecnologias

- **SvelteKit 5**: Framework web moderno
- **TypeScript**: Tipagem estática
- **CSS puro**: Estilização customizada sem frameworks
- **API agify.io**: Serviço gratuito para estimativa de idade

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Build

Para criar a versão de produção:

```bash
npm run build
npm run preview
```

## Limitações da API

A API agify.io possui um limite de 100 requisições por dia. Use com moderação durante os testes.

## Estrutura do Projeto

- `src/routes/+page.svelte`: Componente principal da aplicação
- `src/routes/+page.ts`: Função load() que consulta a API
- `src/app.html`: Template HTML base

## Requisitos Atendidos

✅ Input de texto para digitar o nome  
✅ Consulta automática à API (debounce de 500ms)  
✅ Uso da função load() do SvelteKit  
✅ URL modificada com querystring  
✅ HTML5 válido  
✅ CSS puro customizado  
✅ Responsivo e acessível  
✅ Tratamento de erros da API
