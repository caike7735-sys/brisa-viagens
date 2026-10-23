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

A interface usa HTML, CSS e JavaScript puro, sem frameworks ou pacotes externos de código. A busca, os filtros e os cálculos acontecem no navegador.

Os favoritos ficam no `localStorage`: continuam disponíveis ao recarregar a página, mas não são sincronizados entre dispositivos.

O Node.js serve para executar o site e as verificações no computador. A versão pública fica hospedada no GitHub Pages. Fotos e fontes externas precisam de conexão com a internet.

## Executar no computador

Com o Node.js instalado, abra um terminal na pasta do projeto e execute:

```bash
npm start
```

Depois, acesse [http://localhost:3000](http://localhost:3000). Não é necessário instalar pacotes. Também é possível abrir `index.html` diretamente no navegador.

## Verificações

```bash
npm run check
npm test
```

As verificações cobrem sintaxe JavaScript e comportamentos como busca, filtros, favoritos, estimativa por viajantes e ordenação por preço.

## Limitações do projeto

Os destinos, preços e avaliações são demonstrativos. O site não realiza reservas ou pagamentos. O formulário de novidades não envia e-mails; registra o interesse apenas no navegador.

As fotos ilustram os destinos e não representam uma oferta de hospedagem ou pacote de viagem.
