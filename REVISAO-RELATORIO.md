# Revisão do relatório do professor — Brisa Viagens

A análise abrangeu as 11 páginas do relatório recebido em 24/10/2026. Os 37 apontamentos foram conferidos contra o código local. A identidade verde, os destinos, a organização das seções, os favoritos e a proposta de portfólio foram preservados. Contraste, tipografia e distribuição em telas pequenas foram ajustados para corrigir os problemas de leitura.

O relatório reúne erros atuais, riscos futuros e sugestões opcionais. Os dados fixos não demonstram uma exploração XSS atual; a proteção foi acrescentada preventivamente. Arquivos estáticos de desenvolvimento acessíveis não provam vazamento de segredo, mas a saída de produção agora contém somente arquivos públicos. A ausência de licença não autoriza atribuir uma licença ao código do titular.

## Segurança

| Item | Tratamento                                                                                                                                                                          |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1   | Escape do conteúdo textual interpolado nos cards e no diálogo. IDs e URLs permanecem provenientes do catálogo local controlado; uma futura API exigirá validação de esquema e URLs. |
| S2   | Formulário demonstrativo não armazena nem transmite e-mail; chave antiga removida quando o navegador permite. Aviso visível antes do envio.                                         |
| S3   | CSP no HTML permite código e fontes locais e imagens do Unsplash. Sem scripts executáveis inline.                                                                                   |
| S4   | DM Sans e Manrope hospedadas localmente em WOFF2, com licenças OFL.                                                                                                                 |
| S5   | Build e workflow preparados para publicar somente dist/. Ativação de GitHub Actions em Pages e publicação remota não foram executadas nesta revisão.                                |
| S6   | Lista branca mantida; somente GET/HEAD, resposta 405 com Allow, nosniff e MIME sem charset em imagens.                                                                              |

## Qualidade e manutenção

| Item | Tratamento                                                                                                                                                                                                              |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1   | HTML, CSS e JavaScript formatados com Prettier. Compactação apenas no build.                                                                                                                                            |
| Q2   | Fechamento em solto removido do título principal.                                                                                                                                                                       |
| Q3   | Removido falso contador de carrossel; ordenação chamada Ordem sugerida; data identificada como planejamento e usada na estimativa, sem sugerir disponibilidade real; menu acompanha as seções com IntersectionObserver. |
| Q4   | Substituídas fotos repetidas entre destinos, topo e Experiências. Fotos externas continuam imagens de inspiração; não foi atestada correspondência geográfica de cada foto.                                             |
| Q5   | Script convertido para módulo ES; estado de filtros agrupado; dados e ícones separados. Renderização e eventos permanecem juntos em app.js para limitar a reestruturação.                                               |
| Q6   | DOM falso substituído por testes reais com Playwright e axe, em computador e celular.                                                                                                                                   |
| Q7   | ESLint, Prettier, EditorConfig, engines e workflow adicionados. Licença do código permanece decisão do titular; licenças das fontes incluídas.                                                                          |
| Q8   | Removido fallback morto; fallback local real para falha de fotos; build npm funcional e ignore atualizado.                                                                                                              |
| Q9   | Catálogo separado em data.js.                                                                                                                                                                                           |
| Q10  | Favoritos carregados filtram IDs inexistentes, tipos inválidos e duplicatas.                                                                                                                                            |
| Q11  | Detalhes de ID inexistente retornam sem lançar erro.                                                                                                                                                                    |
| Q12  | Uma instância de Intl.NumberFormat com mínimo e máximo explícitos.                                                                                                                                                      |
| Q13  | Busca durante digitação com atraso de 200 ms; reset restaura ordenação.                                                                                                                                                 |

## Desempenho

| Item | Tratamento                                                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1   | Hero com srcset 800/1200/1600/2400, sizes, qualidade 70 e prioridade alta. O navegador escolhe conforme tela e densidade.                                           |
| P2   | Noronha WebP 640 e 1280: aproximadamente 51 e 205 KB, contra 349 KB do JPEG. Original preservado para referência e compartilhamento.                                |
| P3   | Fontes locais variáveis, font-display swap e preload da fonte principal.                                                                                            |
| P4   | Ícones estáticos diretamente no HTML, sem esperar JavaScript. SVGs inline atendem ao objetivo de evitar deslocamentos sem exigir o sprite sugerido.                 |
| P5   | Cards com srcset 400/700/1000, sizes correspondente às colunas e dimensões explícitas.                                                                              |
| P6   | Esbuild gera CSS e JavaScript minificados e nomes com hash em dist/.                                                                                                |
| P7   | Favoritar atualiza botão e contador sem recriar o grid. Remoção na lista de favoritos recalcula a lista e restaura foco ao próximo item ou ao botão Minhas viagens. |

## Acessibilidade, SEO e responsividade

| Item | Tratamento                                                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1   | Textos secundários e sobretítulos escurecidos; axe verifica contraste em computador e celular.                                                                |
| A2   | Base 1rem; tamanhos fixos de texto convertidos a rem com mínimo de 0,75rem. Títulos responsivos existentes preservados.                                       |
| A3   | Foco preservado ao favoritar; remoção em favoritos tem destino de foco explícito.                                                                             |
| A4   | Minhas viagens recebe nome acessível permanente.                                                                                                              |
| A5   | Inputs e selects com contorno visível de 2px.                                                                                                                 |
| A6   | Diálogo ligado ao título; menu fecha com Escape e clique externo, devolvendo foco com Escape.                                                                 |
| A7   | Open Graph, Twitter Card, canonical, favicon e ícone Apple adicionados. Compartilhamento público depende da publicação e dos caches das plataformas.          |
| A8   | Uma coluna até 420px; hero com altura mínima em svh e espaço para o texto.                                                                                    |
| A9   | Rótulos visíveis nomeiam data e viajantes sem aria-label divergente.                                                                                          |
| A10  | Botões de favoritos, detalhes, fechar e menu com área mínima de 44px.                                                                                         |
| A11  | Noscript e dados estruturados TouristDestination/ItemList. TravelAgency não foi usado porque o projeto é demonstrativo e não representa uma agência operante. |

## Validação realizada na revisão

- npm run check: sintaxe e ESLint aprovados.
- npm run format:check: formatação aprovada.
- npm run build: saída de produção gerada com sucesso.
- Navegação no build de produção: cards e diálogo funcionaram com arquivos versionados, sem erros JavaScript.
- Playwright: 13 cenários aprovados; um cenário de menu móvel dispensado no computador por não se aplicar.
- Axe: nenhuma violação automática nos critérios WCAG A/AA avaliados, na página e no diálogo, em computador e celular.
- Layout também conferido em 320px, sem rolagem horizontal; capturas de computador e celular inspecionadas.

Esses resultados são da execução durante a revisão original; a restauração deste documento não representa uma nova execução dos testes. A avaliação automatizada não constitui certificação WCAG e não substitui testes manuais com leitores de tela.

## Ajuste posterior solicitado

O crédito da foto de Fernando de Noronha foi integrado ao rodapé, recolhido no controle nativo “Créditos da fotografia”. Autor, origem, licença CC BY-SA 3.0 e informação de redimensionamento continuam disponíveis ao expandir. O build foi gerado novamente após esse ajuste.

## Limites e publicação

Não há reserva, consulta de disponibilidade ou integração real de newsletter. Como o site usa módulos ES, deve ser aberto pelo servidor com npm start, em vez de abrir index.html diretamente.

O workflow está preparado localmente. Nenhum commit, push, alteração de configuração remota ou publicação foi realizado durante a revisão. A saída atual para publicação é dist/; os ZIPs antigos não foram atualizados.

As fontes mantêm licenças em fonts/. A foto de Noronha e suas versões WebP mantêm os créditos no rodapé. A licença de redistribuição do código deve ser definida pelo titular.

## Conferência após o envio ao GitHub

A conferência foi feita a pedido do proprietário, após o envio do commit `07a498b6d05244148446d8b85f9cf385e5430e18`.

- O commit local e o commit da branch main no GitHub eram idênticos. Antes dos ajustes desta conferência, não havia mudanças locais pendentes.
- A execução [Validate and publish](https://github.com/caike7735-sys/brisa-viagens/actions/runs/40148103732) concluiu validate e deploy com sucesso. A configuração de publicação exclusiva de dist/ passou a estar efetivamente ativa.
- HTML, JavaScript e CSS referenciados pelo site público, fontes e imagens locais corresponderam aos arquivos gerados localmente. A diferença de bytes no texto da licença DM Sans era apenas de terminações de linha.
- Os arquivos server.js, build.cjs, verify.cjs e package.json responderam 404 no site público, como esperado.
- Os oito destinos mantiveram nomes, textos, preços e avaliações em relação ao commit anterior à revisão. Apenas as referências de imagens de Arraial e Alpes mudaram no catálogo, conforme a correção de fotos repetidas.
- No site público, busca sem acentos, favoritos com preservação de foco, diálogo, estimativa para três viajantes e expansão dos créditos funcionaram em computador e celular. A página e o diálogo já haviam passado pelo conjunto local de testes; a repetição de axe na página pública de 1440 e 375px também não apontou violações automáticas.
- Uma conferência adicional encontrou o seletor de viajantes com largura zero em 768px. Esse problema já estava no ajuste anterior de CSS; não foi causado pelos comandos de envio do proprietário. A barra de busca local foi corrigida para distribuir os campos em grid nas telas de tablet. Foi acrescentado teste em 541, 600, 768, 800 e 1024px. Esta correção posterior ainda precisa ser enviada ao GitHub; o commit publicado indicado acima não a contém.

### Sugestões que não devem ser descritas como integralmente concluídas

- Q5: dados e ícones estão separados e o estado agrupado, mas renderização e eventos continuam no mesmo módulo.
- Q7: infraestrutura de qualidade está pronta, mas a licença do código não foi escolhida pelo titular.
- Q4: repetição de fotos foi eliminada; correspondência geográfica de cada imagem externa não foi certificada.
- S1: há escape de textos no catálogo atual. A integração futura de uma API exigirá validação de IDs e URLs, além do escape.
- A2: textos fixos foram convertidos para rem; o título principal ainda usa clamp com limites em px. A conversão tipográfica não foi absoluta.

As informações anteriores deste documento sobre ausência de publicação descrevem o momento da revisão inicial. A publicação foi confirmada posteriormente nesta seção. Nenhuma alteração acidental do proprietário foi identificada na comparação realizada.

### Resultado após o ajuste de tablet

Sintaxe/ESLint, formatação e build aprovados novamente. A rodada completa de Playwright terminou com 14 testes aprovados e dois dispensados por não se aplicarem ao projeto de resolução correspondente (menu móvel no computador e verificação de tablet na configuração móvel). A checagem automatizada de acessibilidade da página e do diálogo continuou aprovada. As nove referências de fotos externas do catálogo e das seções responderam HTTP 200 durante a conferência.

Os únicos arquivos versionados alterados nesta conferência foram styles.css, tests/site.spec.js e este registro. Não foi feito commit nem push dessas alterações adicionais.
