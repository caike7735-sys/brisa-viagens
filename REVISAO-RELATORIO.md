# Atendimento ao relatório — Brisa Viagens

Esta é a situação atual dos 37 apontamentos das 11 páginas do relatório recebido. Substitui o registro anterior, que ainda mantinha decisões parciais. A implementação principal foi publicada no commit 8ca2247. A conferência posterior descrita ao final encontrou um ajuste de contraste em estado dinâmico; essa correção está no código local e aguarda publicação.

A paleta verde, as seções, os oito destinos, as descrições, os preços ilustrativos, as avaliações e a proposta de portfólio foram preservados. As fotos dos destinos foram substituídas quando necessário para terem localização e origem documentadas.

## Segurança — 6 itens

| Código | Atendimento e evidência                                                                                                                                                                                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1     | Textos interpolados recebem escape em utils.js/render.js. catalog.js valida IDs, caminhos de imagem, categorias, valores e tipos antes de disponibilizar o catálogo. URLs externas ou executáveis e IDs malformados são rejeitados. Testes de catálogo e de injeção no navegador cobrem essas entradas. |
| S2     | O formulário demonstrativo não transmite nem grava e-mail. Há aviso antes do envio e remoção da antiga chave de armazenamento.                                                                                                                                                                          |
| S3     | CSP aparece no início do head: código/fontes locais, imagens locais e somente o Unsplash para as duas fotos de ambientação. Objetos bloqueados; base e ação de formulários restritas à própria origem.                                                                                                  |
| S4     | DM Sans e Manrope variáveis em WOFF2 ficam em fonts/, com licenças OFL. Nenhuma solicitação ao Google Fonts é necessária.                                                                                                                                                                               |
| S5     | Workflow valida e publica exclusivamente dist/. A publicação por Actions já foi confirmada na rodada anterior. Fontes de desenvolvimento não entram no pacote público.                                                                                                                                  |
| S6     | Servidor local mantém lista branca explícita, aceita GET/HEAD, devolve 405 com Allow para outros métodos, acrescenta nosniff e usa charset apenas em tipos de texto.                                                                                                                                    |

## Qualidade e manutenção — 13 itens

| Código | Atendimento e evidência                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1     | HTML, CSS e JavaScript formatados com Prettier; templates de cards e diálogo em múltiplas linhas. Compactação ocorre apenas no build.                                                                                                                                                                                                                                                                                                        |
| Q2     | Removido o fechamento em sem abertura no título principal.                                                                                                                                                                                                                                                                                                                                                                                   |
| Q3     | Indicador de carrossel inexistente removido. Ordem do catálogo identificada como Ordem sugerida. Campo de data explicitamente voltado a planejamento e mostrado na estimativa, sem prometer disponibilidade. Menu acompanha seções com IntersectionObserver.                                                                                                                                                                                 |
| Q4     | Os oito destinos têm fotografias distintas e identificadas na origem: Noronha/Baía do Sancho, Bali/Ulun Danu Beratan, Santorini/Fira, Patagônia/Fitz Roy, Arraial/Praia do Forno, Kyoto/Fushimi Inari, Chapada/Rio Preto e Alpes/Lauterbrunnen. Imagens locais com origem, autoria, descrição e licença em images/sources.json; créditos acessíveis no rodapé. As fotos de ambientação do topo e de Experiências são distintas dos destinos. |
| Q5     | Módulos ES separados para dados/validação, estado/persistência, renderização, eventos, utilitários e ícones. app.js concentra somente inicialização e metadados.                                                                                                                                                                                                                                                                             |
| Q6     | Testes reais com Playwright/axe em computador e celular, cobrindo também tablet, diálogo, menu, newsletter, armazenamento bloqueado, fallback de foto e ausência de JavaScript. Testes unitários verificam entradas inválidas e escape.                                                                                                                                                                                                      |
| Q7     | ESLint, Prettier, EditorConfig, engines, lockfile, workflow CI e LICENSE MIT adicionados. Licença MIT aplicada ao código conforme preferência do proprietário; fotos e fontes preservam licenças próprias. README inclui capturas de tela e instruções atualizadas.                                                                                                                                                                          |
| Q8     | Tratamento morto de data-fallback removido; fallback de imagem local funcional. npm run build copia os arquivos reais, limpa apenas sua pasta dist/ antes de gerar e não referencia image.png inexistente. Ignore atualizado.                                                                                                                                                                                                                |
| Q9     | Dados dos destinos em data.js, independentes dos manipuladores e templates.                                                                                                                                                                                                                                                                                                                                                                  |
| Q10    | Favoritos carregados descartam IDs inexistentes, tipos inválidos e duplicatas; dados malformados ou armazenamento bloqueado não interrompem a página.                                                                                                                                                                                                                                                                                        |
| Q11    | details retorna cedo para ID inexistente; ação de favorito também valida ID.                                                                                                                                                                                                                                                                                                                                                                 |
| Q12    | Uma instância de Intl.NumberFormat com mínimo e máximo de casas decimais explícitos.                                                                                                                                                                                                                                                                                                                                                         |
| Q13    | Busca ao digitar com atraso de 200 ms; reset restaura texto, categoria, modo favoritos e ordenação.                                                                                                                                                                                                                                                                                                                                          |

## Desempenho — 7 itens

| Código | Atendimento e evidência                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1     | Hero com srcset 800/1200/1600/2400, sizes, qualidade 70, dimensões e fetchpriority high.                                                                               |
| P2     | Noronha com WebP 640/1280 e srcset; JPEG original mantido para referência/compartilhamento.                                                                            |
| P3     | Fontes variáveis locais, font-display swap e preload da fonte principal.                                                                                               |
| P4     | Sprite SVG inline com symbol/use. Ícones estáticos aparecem sem aguardar JavaScript e permanecem disponíveis sem ele.                                                  |
| P5     | Demais destinos locais com variantes WebP 400/700/1000/1280, srcset e sizes do grid; dimensões explícitas e carregamento tardio dos cards.                             |
| P6     | Esbuild gera CSS/JavaScript minificados com nomes contendo hash. dist/ é recriada para não acumular arquivos de builds anteriores.                                     |
| P7     | Favoritar um card atualiza somente botão e contador. Recriação da lista ocorre quando uma remoção efetivamente muda os resultados de Minhas viagens, com foco tratado. |

## Acessibilidade, SEO e responsividade — 11 itens

| Código | Atendimento e evidência                                                                                                                                                                                                                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A1     | Textos secundários e sobretítulos com contraste corrigido; fundo do hero reforçado e contornos de foco escuros. Axe verifica página e diálogo nos cenários avaliados.                                                                                                                                                          |
| A2     | Base 1rem, rótulos/legendas com mínimo de 0,75rem e todos os tamanhos de fonte fixos em rem; limites do clamp do título também em rem. O título agora acompanha a preferência de tamanho de fonte.                                                                                                                             |
| A3     | Foco de teclado preservado ao favoritar; destino explícito após remoção na lista de favoritos. Ação dentro do diálogo mantém foco dentro dele.                                                                                                                                                                                 |
| A4     | Botão Minhas viagens mantém nome acessível mesmo com texto visual oculto.                                                                                                                                                                                                                                                      |
| A5     | Inputs/selects com contorno visível de 2px e contraste forte. Links e botões também têm foco visível.                                                                                                                                                                                                                          |
| A6     | Diálogo nomeado pelo título do destino; menu fecha por Escape e clique externo, com restauração de foco ao usar Escape.                                                                                                                                                                                                        |
| A7     | Open Graph, Twitter Card, canonical, favicon SVG e apple-touch-icon. Imagem de compartilhamento hospedada no projeto.                                                                                                                                                                                                          |
| A8     | Uma coluna até 420px; hero com min-height e svh. Campos de busca em grid no tablet e em coluna no celular. Testes exercitam 320, 375, 541, 600, 768, 800, 1024 e 1440px.                                                                                                                                                       |
| A9     | Rótulos visíveis nomeiam data e viajantes sem aria-label divergente.                                                                                                                                                                                                                                                           |
| A10    | Áreas de favoritos, detalhes, fechar diálogo e menu com mínimo de 44 por 44px.                                                                                                                                                                                                                                                 |
| A11    | Mensagem noscript e dados estruturados de destinos com ItemList/TouristDestination. Foi usado o tipo adequado ao conteúdo: TravelAgency seria uma indicação incorreta de agência comercial para este portfólio sem reservas. O problema de ausência de metadados está atendido sem acrescentar uma declaração comercial falsa. |

## Pontos fortes preservados

Lista branca no servidor, lang pt-BR, avisos aria-live, nomes acessíveis nos controles de ícone, tratamento de armazenamento indisponível e preferência de movimento reduzido. Rolagens programáticas também respeitam movimento reduzido.

## Validação e alcance

Os comandos de validação são npm run check, npm run format:check, npm test e npm run test:production (que também executa o build). O conjunto cobre segurança do catálogo, busca, filtros, ordenação, favoritos, diálogo, estimativa, menu, newsletter, acessibilidade automatizada, imagens, servidor e telas pequenas. A saída de produção também é aberta em navegador para conferir os arquivos versionados.

A análise automatizada não é uma certificação de conformidade WCAG e não substitui avaliação com usuários e leitores de tela. As fontes e fotos possuem atribuições próprias. O site continua demonstrativo: sem reservas, pagamentos, disponibilidade real ou envio de newsletter.

## Publicação

As rodadas anteriores foram publicadas nos commits 07a498b, d4b758f e 8ca2247. A execução do commit 8ca2247 concluiu validação e publicação com sucesso, confirmadas também no site público. O ajuste de contraste da conferência posterior ainda não foi publicado.

### Resultado da rodada final

- Sintaxe e ESLint: aprovados.
- Formatação Prettier: aprovada.
- Testes unitários: 3 aprovados.
- Testes de navegador: 24 aprovados; 2 dispensados somente por incompatibilidade entre o cenário e a resolução (menu móvel no computador e varredura de tablet no projeto móvel).
- Build e teste de produção sob o caminho /brisa-viagens/: aprovados, sem arquivos locais faltando ou erros de JavaScript.
- Axe: nenhuma violação automática encontrada nos critérios A/AA avaliados na página e no diálogo, em computador e celular.
- Comparação do catálogo com o commit d4b758f: oito destinos preservados e nenhuma alteração em nomes, descrições, preços, avaliações ou demais dados além das imagens.
- Capturas atuais de computador/celular inspecionadas e disponíveis no README.

A matriz acima contém os 37 códigos: 6 de segurança, 13 de qualidade, 7 de desempenho e 11 de acessibilidade/SEO. As decisões que antes constavam como parciais foram resolvidas nesta rodada; A11 usa a representação semântica adequada a um portfólio (WebSite e TouristDestination).

## Conferência posterior da versão publicada

A branch main remota e a versão local estavam no commit 8ca2247, sem modificações de código feitas pelo proprietário. A repetição dos testes iniciais passou (3 unitários, 24 de navegador e 1 de produção). A auditoria npm não encontrou vulnerabilidades conhecidas nas dependências instaladas.

Uma verificação adicional no site público após a busca detectou contraste insuficiente em #results-message, que não era exercitado pelos testes anteriores de acessibilidade. A cor foi substituída por var(--muted), já usada nos demais textos secundários. Um novo cenário testa busca, favoritos, estado vazio e créditos expandidos com axe em computador e celular. O conteúdo e o layout não foram alterados.

A verificação do site público em 1440, 768 e 375px confirmou os oito destinos, ausência de rolagem horizontal, foco preservado ao favoritar, busca sem acentos e estimativa correta de R$ 13.770 para três viajantes em Bali. Não houve erros de JavaScript nesses fluxos. A ressalva de contraste observada na versão publicada foi corrigida localmente nesta conferência; não deve ser descrita como publicada antes de novo envio.

Resultado após esta correção: 3 testes unitários, 26 testes de navegador e 1 teste de produção aprovados; 2 cenários dispensados por não se aplicarem à configuração de resolução correspondente. Código e formatação passaram. Axe não apontou violações automáticas nos estados adicionais de busca, favoritos, lista vazia e créditos expandidos, em computador e celular. Nenhuma publicação nova foi realizada nesta conferência.
