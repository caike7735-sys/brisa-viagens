# Brisa Viagens

Um site para explorar destinos e planejar uma viagem: pesquisar lugares, comparar estimativas de preço e guardar favoritos para consultar depois.

**[Ver site online](https://caike7735-sys.github.io/brisa-viagens/)**

## O projeto

O Brisa Viagens é um projeto de portfólio feito com HTML, CSS e JavaScript. Reúne uma interface de busca de destinos e recursos de planejamento, sem depender de uma conta para salvar favoritos.

## Funcionalidades

- Busca por nome, região ou país, com suporte a termos sem acentos.
- Filtros por praia, natureza, cidades e aventura.
- Ordenação sugerida, por preço e por avaliação.
- Favoritos salvos no navegador com `localStorage`.
- Detalhes dos destinos e estimativa de valor conforme o número de viajantes.
- Layout adaptado para celulares, tablets e computadores.

## Como funciona

A interface usa HTML, CSS e JavaScript puro, sem frameworks ou dependências de execução. A busca, os filtros e os cálculos acontecem no navegador.

Os favoritos ficam no `localStorage`: continuam disponíveis ao recarregar a página, mas não são sincronizados entre dispositivos.

O Node.js serve para executar o site e as verificações no computador. A versão pública fica hospedada no GitHub Pages. As fontes e as fotos dos destinos são locais; as fotos de ambientação do topo e de Experiências precisam de conexão. Se uma foto falhar, será exibida uma imagem local de inspiração.

## Executar no computador

Com o Node.js instalado, abra um terminal na pasta do projeto e execute:

```bash
npm ci
npm start
```

Depois, acesse [http://localhost:3000](http://localhost:3000). O site usa módulos JavaScript e deve ser aberto pelo servidor local.

## Verificações

```bash
npm run check
npx playwright install chromium
npm test
npm run test:production
```

As verificações cobrem sintaxe JavaScript e comportamentos como busca, filtros, favoritos, estimativa por viajantes e ordenação por preço.

## Limitações do projeto

Os destinos, preços e avaliações são demonstrativos. O site não realiza reservas ou pagamentos. O formulário de novidades é uma demonstração: não envia nem armazena e-mails.

As fotos dos destinos têm origem e localização documentadas em `images/sources.json`. As imagens do topo e de Experiências são de ambientação. Nenhuma imagem representa uma oferta de hospedagem ou pacote de viagem.

## Produção e qualidade

`npm run build` gera `dist/` com JavaScript e CSS minificados e nomes versionados. Publique apenas essa pasta. O workflow `.github/workflows/pages.yml` valida o projeto antes de publicar; no GitHub, Pages deve estar configurado para usar GitHub Actions. Esta alteração local não publica o site automaticamente.

`npm test` executa Chromium em resoluções de computador e celular, incluindo axe, navegação por teclado, formulário, busca e proteção do servidor. `npm run format:check` confere a formatação. Os testes automatizados não substituem avaliação manual com leitores de tela.

As fontes locais mantêm suas licenças OFL em `fonts/`. A imagem de Noronha e suas versões WebP mantêm o crédito CC BY-SA 3.0 no rodapé. O código está sob licença MIT, em `LICENSE`. Essa licença não substitui as licenças próprias das fotografias e fontes. Os créditos de todas as fotos dos destinos ficam recolhidos no rodapé.

## Organização do código

- `app.js`: inicialização da página.
- `data.js` e `catalog.js`: dados dos destinos e validação do catálogo.
- `state.js`: estado de filtros e persistência de favoritos.
- `render.js`: cards, diálogo, contadores e mensagens.
- `events.js`: interações, busca, menu e navegação.
- `utils.js` e `icons.js`: formatação, imagens e referências ao sprite SVG.
- `images/sources.json`: autoria, origem, localização e licença das fotografias dos destinos.

## Capturas de tela

![Brisa Viagens no computador](docs/desktop.webp)

![Brisa Viagens no celular](docs/mobile.webp)
