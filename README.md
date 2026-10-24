# Brisa Viagens

Um site para explorar destinos e planejar uma viagem: pesquisar lugares, comparar estimativas de preço e guardar favoritos para consultar depois.

**[Ver site online](https://caike7735-sys.github.io/brisa-viagens/)**

## O projeto

O Brisa Viagens é um projeto de portfólio feito com HTML, CSS e JavaScript. Reúne uma interface de busca de destinos e recursos de planejamento, sem depender de uma conta para salvar favoritos.

## Funcionalidades

- Busca por nome, região ou país, com suporte a termos sem acentos.
- Filtros por praia, natureza, cidades e aventura.
- Ordenação por popularidade, preço e avaliação.
- Favoritos salvos no navegador com `localStorage`.
- Detalhes dos destinos e estimativa de valor conforme o número de viajantes.
- Layout adaptado para celulares, tablets e computadores.

## Como funciona

A interface usa HTML, CSS e JavaScript puro, sem frameworks ou dependências de execução. A busca, os filtros e os cálculos acontecem no navegador.

Os favoritos ficam no `localStorage`: continuam disponíveis ao recarregar a página, mas não são sincronizados entre dispositivos.

O Node.js serve para executar o site e as verificações no computador. A versão pública fica hospedada no GitHub Pages. As fontes são locais; as fotos externas precisam de conexão. Se uma foto falhar, será exibida uma imagem local de inspiração.

## Executar no computador

Com o Node.js instalado, abra um terminal na pasta do projeto e execute:

```bash
npm start
```

Depois, acesse [http://localhost:3000](http://localhost:3000). Execute `npm ci` na primeira utilização. O site usa módulos JavaScript e deve ser aberto pelo servidor local.

## Verificações

```bash
npm run check
npx playwright install chromium
npm test
npm run build
```

As verificações cobrem sintaxe JavaScript e comportamentos como busca, filtros, favoritos, estimativa por viajantes e ordenação por preço.

## Limitações do projeto

Os destinos, preços e avaliações são demonstrativos. O site não realiza reservas ou pagamentos. O formulário de novidades é uma demonstração: não envia nem armazena e-mails.

As fotos ilustram os destinos e não representam uma oferta de hospedagem ou pacote de viagem.

## Produção e revisão

`npm run build` gera `dist/` com JavaScript e CSS minificados e nomes versionados. Publique apenas essa pasta. O workflow `.github/workflows/pages.yml` valida o projeto antes de publicar; no GitHub, Pages deve estar configurado para usar GitHub Actions. Esta alteração local não publica o site automaticamente.

`npm test` executa Chromium em resoluções de computador e celular, incluindo axe, navegação por teclado, formulário, busca e proteção do servidor. `npm run format:check` confere a formatação. Os testes automatizados não substituem avaliação manual com leitores de tela.

Veja [REVISAO-RELATORIO.md](REVISAO-RELATORIO.md) para a análise de cada apontamento do professor.

As fontes locais mantêm suas licenças OFL em `fonts/`. A imagem de Noronha e suas versões WebP mantêm o crédito CC BY-SA 3.0 no rodapé. A licença do código do projeto deve ser definida pelo titular; nenhuma licença de redistribuição foi atribuída nesta revisão.
