# Brisa Viagens

Site responsivo de inspiração para viagens, em português, feito com HTML, CSS e JavaScript, sem frameworks ou dependências de código externas.

**[Acesse o site publicado](https://caike7735-sys.github.io/brisa-viagens/)**

## Funcionalidades

- Busca por nome, região ou país, com suporte a termos sem acentos.
- Filtros por praia, natureza, cidades e aventura.
- Ordenação por popularidade, preço e avaliação.
- Favoritos salvos no navegador com `localStorage`.
- Detalhes dos destinos e estimativa de valor conforme o número de viajantes.
- Layout adaptado para celulares, tablets e computadores.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| HTML | Estrutura e conteúdo da página. |
| CSS | Estilos, layout e adaptação a diferentes telas. |
| JavaScript | Busca, filtros, favoritos e interações. |
| Node.js | Servidor de desenvolvimento e verificações locais. |
| GitHub Pages | Hospedagem do site publicado. |

## Executar no computador

Com o Node.js instalado, abra um terminal na pasta do projeto e execute:

```bash
npm start
```

Depois, acesse [http://localhost:3000](http://localhost:3000). Não é necessário instalar pacotes. Também é possível abrir `index.html` diretamente no navegador.

Para visualizar suas alterações, salve os arquivos e atualize a página.

## Estrutura do projeto

```text
index.html   Estrutura da página
styles.css   Estilos e layout responsivo
app.js       Funcionalidades da interface
server.js    Servidor local em Node.js
verify.cjs   Verificações funcionais
package.json Comandos do projeto
```

## Publicação e atualizações

O site já está publicado no GitHub Pages. As alterações enviadas para a branch `main` são publicadas automaticamente após a conclusão do processo de publicação do GitHub.

## Verificar localmente

Execute `npm run check` e `npm test`.

As verificações cobrem sintaxe JavaScript e comportamentos como busca, filtros, favoritos, estimativa por viajantes e ordenação por preço.

## Sobre a demonstração

Este é um projeto demonstrativo: os preços e as avaliações são ilustrativos. Não há integração com reservas, pagamentos ou envio de e-mails. O formulário de novidades registra o interesse apenas no navegador. Fotos e fontes dependem de conexão com a internet; as imagens são referências visuais dos destinos.
