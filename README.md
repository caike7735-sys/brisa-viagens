# Brisa — viagens

Site responsivo em português, feito com HTML, CSS e JavaScript, sem dependências.

## Abrir

Execute `npm start` e acesse http://localhost:3000. Também é possível abrir `index.html` diretamente.

Busca por nome, região ou país; filtros de categoria; ordenação; favoritos persistidos no navegador; detalhes dos destinos e estimativa por número de viajantes. O formulário de novidades registra o interesse apenas no navegador.

Os preços e as avaliações são ilustrativos. Não há integração com reservas, pagamentos ou envio de e-mails. Fotos e fontes dependem de conexão com a internet; as imagens são referências visuais dos destinos.

## Publicar no GitHub Pages

1. Entre em https://github.com/new e crie um repositório público chamado `brisa-viagens`.
2. Na página do repositório, escolha **uploading an existing file** (ou **Add file → Upload files**).
3. Envie os arquivos deste projeto para a raiz do repositório, incluindo `index.html`, `styles.css`, `app.js` e `.nojekyll`. Não envie o ZIP como um único arquivo: extraia seu conteúdo antes de enviar. O `index.html` precisa ficar diretamente na raiz, sem uma pasta intermediária.
4. Clique em **Commit changes** para salvar.
5. Vá em **Settings → Pages**. Em **Source**, selecione **Deploy from a branch**; em **Branch**, selecione `main` e `/(root)`; clique em **Save**.
6. Aguarde a publicação e copie o endereço exibido nessa página. O formato será `https://SEU-USUARIO.github.io/brisa-viagens/`.

O site publicado funciona sem o servidor Node e sem manter seu computador ligado. Para atualizar, envie os arquivos alterados ao mesmo repositório.

Documentação oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Verificar localmente

Execute `npm run check` e `npm test`.
