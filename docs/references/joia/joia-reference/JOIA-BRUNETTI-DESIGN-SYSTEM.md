# JOIA → Brunetti — engenharia reversa do sistema visual e de interação

**Referência:** [JOIA, Preweb](https://www.preweb.site/projects/joia/)  
**Inspeção:** 11 de outubro de 2026  
**Destino:** protótipo Brunetti, preservando a composição, o ritmo e os comportamentos do sistema, com identidade e conteúdo próprios.  
**Idioma deste documento:** português. A interface de referência está em inglês canadense.

## 1. Como usar este documento

Esta é uma especificação de reconstrução, obtida da página renderizada, do HTML público, do CSS e dos scripts efetivamente vinculados. Não é uma proposta de redesign. Os valores de CSS e JavaScript abaixo são extraídos da referência, salvo quando identificados como recomendação.

Legenda de evidência:

- **[C] Código confirmado:** valor ou comportamento identificado nos arquivos públicos.
- **[V] Verificado no navegador:** composição, estado ou interação observados durante a inspeção.
- **[R] Recomendação Brunetti:** ajuste proposto para reconstrução; não atribuir ao site original.
- **[L] Limite:** algo não validado integralmente, dependente de contexto ou ausente.

O foco principal é a home. Também foram lidos HTML, CSS e scripts de `/treatments/`, `/before-after/`, `/team/`, `/clinic/`, `/contact/` e `/treatments/veneers/`. O comparador da página de resultados foi inspecionado no navegador. As demais páginas internas têm especificações baseadas no código; não foram percorridas visualmente em todas as resoluções. Os outros detalhes de tratamento não foram auditados individualmente.

Viewports usados: **1440 × 900**, **390 × 844**, **834 × 1112**, além de uma leitura inicial em **621 × 725**. Isso verifica desktop, celular e uma faixa problemática de tablet; não equivale a teste em dispositivos físicos ou em todos os navegadores. Redução de movimento foi analisada no código, sem alterar a preferência do sistema operacional.

Arquivos complementares no mesmo diretório:

- `tokens.json`: variáveis originais e parâmetros principais para reutilização por código ou IA.
- `asset-inventory.json`: imagens e recursos referenciados pelos documentos inspecionados.
- `evidence/`: cópias dos arquivos públicos consultados e manifesto de origem/hash. São evidência da inspeção, não um projeto Brunetti pronto.

## 2. A identidade do sistema

**[V]** A experiência é editorial, fotográfica e teatral: serifas grandes, palavras em itálico dourado, fundos marfim e espresso, composição assimétrica e fotografias quentes. O espaço vazio é parte central da hierarquia. A sensação de sofisticação depende mais da proporção e da cadência entre cenas do que da quantidade de componentes.

As características que mais precisam permanecer na reconstrução:

1. Títulos grandes com entrelinha muito curta e ênfase seletiva em itálico.
2. Alternância entre planos claros e escuros, sem transformar tudo em cartões.
3. Imagem editorial de retrato no desktop; imagem de fundo na abertura mobile.
4. Composição de 12 colunas, com recuos e sobreposições intencionais.
5. Quatro sequências fixadas durante o scroll da home desktop.
6. Um motivo gráfico recorrente que participa das transições.
7. Conteúdo curto: título, legenda, imagem e ação; poucos parágrafos longos.
8. Fotografias com direção de arte consistente, tons quentes e fundos neutros.

**[R]** Para Brunetti, preservar esses papéis visuais antes de ajustar a identidade. Uma fonte ou um logotipo mais largo pode exigir novas quebras de linha, mesmo mantendo os mesmos tamanhos.

## 3. Arquitetura e sequência narrativa

### 3.1 Home

| Ordem | Seletor | Papel | Superfície | Comportamento desktop |
|---|---|---|---|---|
| 0 | `.loader` | Entrada da marca | Marfim | Marca central + contador; desaparece |
| 1 | `#hero` | Promessa principal | Espresso | Retrato à direita, título à esquerda; abertura por máscara |
| 2 | `#manifesto` | Método e autoria | Marfim | Texto central assimétrico, 3 imagens pequenas, traço de assinatura; pin |
| 3 | `#makeover` | Demonstração de transformação | Marfim | Foto grande, revelação antes/depois pelo scroll; pin |
| 4 | `#moments` | Prova humana | Espresso | Duas faixas contínuas de retratos em sentidos opostos |
| 5 | `#work` | Serviços | Espresso | Três linhas alternadas de imagem/texto; entradas laterais |
| 6 | `#artist` | Equipe | Marfim | Lista de nomes à esquerda, leque de retratos à direita |
| 7 | `#gallery` | Ambiente | Espresso | Título seguido de galeria em tela cheia; iris e crossfades; pin |
| 8 | `#invitation` | Conversão | Marfim → Espresso | Círculo escuro cresce, texto/CTA e retrato discreto; pin |
| 9 | `.footer` | Encerramento | Espresso | Marca, frase breve, desenho animado, contatos, linha legal |

**[V]** Em 1440 × 900, a altura total observada foi aproximadamente **15.078 px**, incluindo espaços dos pins. Em 390 × 844, aproximadamente **9.401 px**, sem pins. Esses números dependem de fonte, conteúdo, viewport e momento de medição; não são alturas a fixar no código.

### 3.2 Navegação

**[C]** Menu com destinos para tratamentos, resultados, equipe, clínica, contato e botão de consulta. O logotipo volta à home ou rola até `#hero` quando esse alvo existe na página atual.

Há uma regra importante: links com `data-scroll-to` procuram primeiro o alvo na página atual. Se ele existir, o código cancela a navegação e rola até ele. Se não existir, segue o `href` para a página interna. Assim, **Our Team na home vai para `#artist`**, embora seu `href` aponte para `/team/`. Não assumir que todos os itens do menu sempre abrem páginas.

**[C]** Não foi identificado roteamento de aplicação, interceptação geral de links nem transição animada entre páginas. São navegações de documento, com loader e introdução próprios. A presença de WordPress é indicada pelos caminhos `wp-content`; a versão do WordPress não foi verificada.

## 4. Tokens de cor

**[C]** Fonte: `style.css`, bloco `:root` e `body.is-dark`.

| Token original | Valor | Uso |
|---|---|---|
| `--ivory` | `#F6F1E7` | Fundo claro e texto principal no escuro |
| `--sand` | `#E8DCC6` | Fundo de retratos/cartões antes da imagem |
| `--gold` | `#C8A35B` | Itálicos, símbolos, progresso, destaques |
| `--gold-deep` | `#A8823C` | CTA preenchido, índices e detalhes |
| `--gold-soft` | `#D9C29A` | Legendas e texto auxiliar no escuro |
| `--gold-text` | `#7A5E22` | Rótulos dourados sobre marfim |
| `--espresso` | `#1A1714` | Fundo escuro principal e texto no claro |
| `--espresso-2` | `#0D0B09` | Fundo escuro profundo |
| `--espresso-plate` | `#211B16` | Token declarado; não assumir uso em todo cartão |
| `--soft` | `#6E6557` | Texto secundário no claro |
| `--fg-soft` em escuro | `#A89F8E` | Texto suave do tema escuro |
| Texto de serviços | `#C9BEA8` | Corpo sobre espresso |
| Texto de painéis internos | `#DACFBC` | Corpo sobre fotografia/escuro |
| `--hair` claro | `rgba(168,130,60,.26)` | Filete de separação |
| `--hair` escuro | `rgba(200,163,91,.3)` | Filete no tema escuro |

Tema base: `--bg: var(--ivory)`, `--fg: var(--espresso)`, `--fg-soft: var(--soft)`. `body.is-dark` troca esses tokens; várias seções também fixam suas cores diretamente. Portanto, não basta alterar apenas o fundo do `body`.

Seleção de texto: fundo dourado e texto espresso. Foco visível: contorno dourado de **2 px**, afastado **4 px**.

### 4.1 Superfícies e efeitos

| Elemento | Receita confirmada |
|---|---|
| Menu | Gradiente `135deg`, `#1c1813 → #100d0b` |
| Header após scroll | `rgba(18,15,12,.86)` + blur de `10px` |
| Scrim do modal | `rgba(26,23,20,.6)` + blur de `8px` |
| Hero mobile | Gradiente vertical: espresso `.78` embaixo, `.08` a 44%, `.62` em cima |
| Hero desktop | Gradiente horizontal: espresso a 30%, espresso `.1` a 60%, transparente |
| Grain global | SVG com `feTurbulence`, frequência `.9`, 2 oitavas, opacidade `.035` |
| Luz global `.facet` | Gradiente radial dourado, `mix-blend-mode:screen`, `62vmax` |
| Motivos ao fundo | Traços dourados enormes, geralmente opacidade `.05–.09` |

**[R]** Separar tokens semânticos de superfície, texto e acento na Brunetti. Se a paleta da marca mudar, manter a relação claro/escuro e a função de cada dourado; não substituir todas as variantes por uma única cor.

## 5. Tipografia

### 5.1 Famílias e pesos

**[C/V]** Fontes servidas via Google Fonts:

- **Fraunces** para títulos, números editoriais, nomes, legendas e trechos em itálico. Importação: normal 400/500/600, itálico 400/500, eixo óptico `9..144`. Fallback: Georgia, serif.
- **Hanken Grotesk** para corpo, navegação, rótulos, links e campos. Importação: 300/400/500. Fallback: system-ui, sans-serif.

O corpo usa peso **300**, títulos geralmente **500**. Alguns links declaram **600**, embora esse peso não esteja explicitamente na URL de importação da Hanken; tratar a renderização desse peso como potencial síntese do navegador.

Não confundir o logotipo com texto composto em Fraunces: os logotipos observados são imagens PNG.

### 5.2 Escala exata e valores medidos

Conversões abaixo assumem `1rem = 16px`, como observado. `clamp(mínimo, fluido, máximo)` deve ser preservado, em vez de congelar o valor de uma captura.

| Papel/seletor | `font-size` | Entrelinha | 1440 px | 390 px |
|---|---|---|---:|---:|
| Corpo | `clamp(1rem,1.05vw,1.15rem)` | `1.55` | 16 | 16 |
| `.eyebrow` | `clamp(.64rem,.8vw,.76rem)` | Herdada | 11,52 | 10,24 |
| `.hero__promise` | `clamp(2.6rem,6.4vw,6.5rem)` | `.92` | 92,16 | 41,6 |
| `.manifesto__line` | `clamp(2.2rem,5vw,5.4rem)` | `1` | 72 | 35,2 |
| `.manifesto__sub` | `clamp(1.15rem,2vw,1.8rem)` | Herdada | 28,8 | 18,4 |
| `.makeover__title` | `clamp(1.8rem,3.4vw,4rem)` | `.96` | 48,96 | 28,8 |
| `.moments__title` | `clamp(2rem,4.4vw,4.2rem)` | `1.02` | 63,36 | 32 |
| `.work__title` | `clamp(2.2rem,4.6vw,4.6rem)` | `1` | 66,24 | 35,1¹ |
| `.work__rt` | `clamp(1.7rem,2.8vw,2.6rem)` | `1.04` | 40,32 | 27,2 |
| `.team__title` | `clamp(2.2rem,4.6vw,5rem)` | `.98` | 66,24 | 35,2 |
| `.gallery__title` | `clamp(2rem,4.4vw,4.4rem)` | `1` | 63,36 | 32 |
| `.invitation__line` | `clamp(2.8rem,6.4vw,7rem)` | `.92` | 92,16 | 44,8 |
| `.footer__title` | `clamp(2rem,4.4vw,3.4rem)` | `1` | 54,4 | 32 |
| `.phero__title`, internas | `clamp(2.6rem,7vw,7rem)` | `.94` | 100,8² | 41,6² |
| `.cpanel__name`, tratamentos | `clamp(2.8rem,8vw,8rem)` | `.9` | 115,2² | 42,9² ³ |

¹ Override mobile: `clamp(2rem,9vw,3.4rem)`. ² Calculado do CSS, não medido nessa página. ³ Override até 860 px: `clamp(2.4rem,11vw,4.2rem)`.

### 5.3 Tratamentos editoriais

- `.type-fracture`: tracking `-.02em`.
- `em` nesse tratamento: tamanho `.92em`, entrelinha `.85`, deslocamento vertical `.04em`, padding direito `.05em`.
- `.outline-cut`: preenchimento transparente e traço dourado de `1px`.
- Recuo de linha `.indent`: `clamp(1rem,5vw,7rem)`; `.indent-lg`: `clamp(2rem,10vw,13rem)`. Em 1440 px: 72 e 144 px.
- Os recuos zeram na composição mobile até 820 px.
- Eyebrows: caixa alta, peso 500, tracking `.12em`.
- Label do menu: `.66rem`, tracking `.18em`; links auxiliares frequentemente `.12–.2em`.
- Folios: serifados, itálicos, escrita vertical e rotação de 180° no desktop; não são controles de navegação.
- Larguras textuais são limitadas em `ch`: hero 13ch, manifesto 16ch, título de serviços 14ch, galeria 18ch; corpo normalmente 24–48ch.

**[R]** Em português, adaptar a redação à largura, não apenas traduzir literalmente. Reservar itálico para uma expressão curta e outline para uma palavra; o uso excessivo dissolve a hierarquia.

## 6. Grid, espaçamento e geometria

### 6.1 Estrutura global

**[C]** `.container`: largura 100%, máximo **1680 px**, centralizado, padding lateral `clamp(1.25rem,4vw,5rem)`. O `max-width` inclui o padding devido a `box-sizing:border-box`.

| Viewport | Gutter de cada lado | Largura interna disponível antes dos gaps |
|---:|---:|---:|
| 390 | 20 px | 350 px |
| 768 | 30,72 px | 706,56 px |
| 834 | 33,36 px | 767,28 px |
| 1440 | 57,6 px | 1324,8 px |
| 1920 | 76,8 px dentro do container de 1680 | 1526,4 px |

`.editorial`: **12 colunas iguais**, gap `clamp(.8rem,1.4vw,1.6rem)`. Em 1440: gap 20,16 px; colunas de aproximadamente 91,92 px. Em telas maiores que o container, somar as margens externas ao gutter interno.

O sistema **não declara uma escala modular única de 8 px**. Usa combinações de `rem`, `vw`, `vh`, `svh`, `vmin`, `vmax` e `ch`. Padronizar tudo em espaçamentos de 8 px altera a composição.

### 6.2 Ritmo vertical

| Seção | Padding vertical original |
|---|---|
| Hero | Topo `clamp(6rem,12vh,9rem)`; base `clamp(4rem,8vh,7rem)` |
| Manifesto | `clamp(5rem,11vh,9rem)` |
| Antes/depois | `clamp(6rem,12vh,10rem)` |
| Mural e serviços | `clamp(4rem,9vh,7rem)` |
| Equipe | Topo `clamp(6rem,12vh,9rem)`; base `clamp(3.5rem,8vh,6rem)` |
| Galeria, cabeçalho | Topo `clamp(3rem,7vh,5rem)`; base `clamp(1.4rem,3vh,2.4rem)` |
| Convite | `clamp(6rem,12vh,10rem)` |

`.scene` tem `min-height:100svh` por padrão. Equipe e galeria têm exceções; convite tem `110svh`. Alturas de conteúdo e padding podem tornar uma cena maior que uma tela. O manifesto, por exemplo, ocupou cerca de 1078 px em uma janela de 900 px de altura: não presumir que uma cena fixada cabe integralmente no viewport.

### 6.3 Bordas e sombras

- Fotografias pequenas: raio 3 px; imagens de serviços e hero desktop: 4 px.
- Cartões de equipe e comparador: 6 px; modal: 8 px.
- Botões e chips: raio 100 px, formato cápsula.
- Filetes: predominantemente 1 px, baixa opacidade dourada.
- Fotos de manifesto: `0 30px 70px rgba(26,23,20,.16)`.
- Antes/depois da home: `0 30px 80px rgba(26,23,20,.15)`.
- Equipe em leque: `0 24px 60px rgba(26,23,20,.34)`.
- Retrato do hero: `0 40px 90px rgba(0,0,0,.45)`.

**[R]** Manter cantos discretos; arredondamento grande em todas as imagens mudaria o caráter editorial.

## 7. Anatomia das cenas da home

### 7.1 Hero

**[C/V]** Desktop a partir de 861 px: retrato contido à direita, largura `min(42vw,640px)`, altura `82vh`, distância da direita `4vw`, centro vertical em 50%. Em 1440 × 900: aproximadamente **604,8 × 738 px**, começando em x=777,6 e y≈83. Imagem com `object-fit:cover`, foco `50% 24%`.

Título nas colunas 1–6 (`grid-column:1/7`), ancorado embaixo. Eyebrow acima, pequena indicação de atendimento abaixo. Folio vertical na lateral esquerda. O recuo crescente das linhas produz uma diagonal; é uma parte estrutural, não um alinhamento acidental.

Até 820 px: imagem cobre a cena inteira, opacidade `.62`, foco base `52% center`, texto claro na porção inferior, `min-height:72svh` no conteúdo. A altura da cena permanece pelo menos `100svh`. O pequeno brilho sobre a imagem permanece no mobile; o correspondente do hero é oculto no desktop.

### 7.2 Manifesto

**[C/V]** Fundo marfim; rótulo no alto à esquerda; folio no alto à direita; título nas colunas 3–11; apoio nas colunas 8–11, alinhado embaixo. A assinatura ocupa até `min(62vw,880px)` e fica deslocada 17vh para baixo.

Três fotos flutuantes no desktop:

| Foto | Posição | Largura | Proporção | Rotação |
|---|---|---|---|---|
| 1 | topo 7%, direita 3% | `min(14vw,190px)` | 4:5 | +2,5° |
| 2 | base 9%, esquerda 2% | `min(12vw,165px)` | 3:4 | −3° |
| 3 | topo 37%, direita 9% | `min(9vw,125px)` | 1:1 | −1,5° |

Até 860 px, as imagens tornam-se uma faixa flexível de três itens, gap `.55rem`, cada item limitado a 31%, proporção 3:4 e sem rotação. Até 820 px, a composição textual também se empilha. No celular observado, título, apoio e miniaturas continuam legíveis, com a curva dourada decorativa abaixo das imagens.

### 7.3 Antes/depois da home

**[C/V]** Foto nas colunas 2–11, altura mínima `min(78svh,940px)`. Rótulo vertical à esquerda, palavra decorativa grande no fundo, caixa de título sobre a parte inferior direita. Foco das imagens: `50% 42%`.

A camada inicial usa `saturate(.08) contrast(.72) brightness(.62)`; a final usa `saturate(1.06) contrast(1.06) brightness(1.03)`. Portanto, parte da diferença percebida vem de filtros explícitos. As imagens têm URLs distintas; isso não comprova a natureza clínica ou autenticidade do caso.

O after é revelado da esquerda para a direita com `clip-path:inset(0 100% 0 0) → inset(0 0% 0 0)`. A linha acompanha o corte, com espessura de 2 px, gradiente dourado e glow. Um brilho de quatro pontas surge perto do final.

**Não é um slider arrastável nesta seção.** O controlador é a rolagem. A página interna de resultados usa outro componente, descrito adiante.

Mobile até 820 px: after totalmente aberto, before em miniatura no canto superior esquerdo, largura 34%, proporção 4:5; linha de wipe oculta; legenda fora da foto. Imagem principal também 4:5. Em 390 px, a imagem mediu 350 × 437,5 px.

### 7.4 Mural de pessoas

**[C/V]** Duas faixas, 5 fotos por sequência, cada sequência duplicada para fechar o loop. Há nove arquivos `moment-*` distintos; uma foto reaparece em ambas as linhas. As cópias recebem `aria-hidden`.

Desktop: cards `clamp(230px,23vw,340px)` × `clamp(170px,16vw,250px)`, gap 16 px, raio 3 px. Em 1440: 331,2 × 230,4 px. Mobile: `60vw × 42vw`, ou 234 × 163,8 px em 390.

Cada faixa percorre metade da pista mais meio gap em **48 s**, easing linear, loop infinito. Sentidos opostos. Hover pausa somente a faixa atingida. A velocidade é temporal, não vinculada à velocidade do scroll. Não há setas, paginação, drag nem abertura de lightbox nesse mural.

### 7.5 Serviços

**[C/V]** Três linhas em 2 colunas iguais, alternando a posição da imagem. Gap horizontal `clamp(1.5rem,4vw,4.5rem)`; vertical entre linhas `clamp(2rem,5vh,4rem)`.

Cada linha contém imagem, índice serifado itálico, título, descrição curta de até 38ch e link sublinhado com seta. A imagem tem altura `clamp(280px,30vw,440px)`, 432 px no viewport desktop de referência.

As imagens entram por wipe lateral alternado e reduzem o zoom de 1,18 para 1. O texto sobe 26 px com opacidade. Mobile até 820 px: uma coluna, imagem sempre antes do texto, altura `62vw`; wipe desativado.

### 7.6 Equipe

**[C/V]** Cabeçalho acima de um palco de duas colunas `.95fr 1.05fr`. Lista de nomes em outline à esquerda, retratos sobrepostos à direita. Leque com posições `x=-96/0/+96px`, rotação `-9/0/+9°`, deslocamento vertical `18/0/18px`.

Card: largura `clamp(205px,19vw,285px)`, altura `clamp(260px,24vw,356px)`. Ao entrar na tela, os três abrem a partir de uma pilha.

Hover ou foco no nome destaca o respectivo retrato: y=-16 px, rotação 0°, escala 1,1, brilho 1,04, z-index 30. Os outros vão para escala .92, brilho .55 e saturação .85. Duração .5 s, `power3.out`. O nome ganha preenchimento e recuo de 1rem; a função aparece. Saída do ponteiro da lista ou do deck restaura o leque.

**[V]** Foco/click no primeiro nome produziu os valores esperados. **[C]** Não há ação de navegação ou abertura de biografia no click desses botões; são controles de destaque por foco/hover.

Até 860 px: lista de nomes oculta e deck estático com três colunas e legendas visíveis nos retratos. Até 560 px: uma coluna, fotos 4:5. Não é carrossel mobile.

### 7.7 Galeria do espaço

**[C/V]** Cabeçalho separado do palco. Desktop: palco de `100vh`, fotos absolutas em tela cheia; abertura circular central, seguida de crossfade entre três ambientes. O scroll fixa **o palco**, não o cabeçalho.

Sem modo animado: fotos empilhadas com gap `.5rem`, altura 54vh; até 860 px, 44vh. Em 390 × 844, cada foto tem cerca de 371,36 px de altura. Legendas ficam no canto inferior esquerdo, serifadas e brancas, com sombra.

Não há galeria modal, setas ou thumbnails na home. O gesto de rolagem é o controlador da sequência desktop.

### 7.8 Convite final e footer

**[C/V]** Convite com frase grande dourada, uma palavra em outline e trecho itálico. Texto nas colunas 1–9; bloco de ação nas colunas 9–11, alinhado embaixo. Retrato à direita com opacidade .15, dessaturado, `mix-blend-mode:luminosity`. Círculo de 18vmax cresce do centro, de escala .05 até 18, cobrindo o fundo claro.

Mobile até 820 px: fundo já escuro, círculo expandido estaticamente, retrato entra no fluxo com altura 46vh e opacidade .34, ação abaixo da frase.

Footer centralizado, sem megamenu de colunas na marcação inspecionada: símbolo de 36 px, título, desenho de sorriso, contatos flexíveis e linha legal. O desenho alterna entre curva de sorriso e marca. Há texto de privacidade/termos/acessibilidade, mas a marcação da home não o oferece como links individuais. Usar os seletores presentes no DOM; o CSS contém regras antigas de `.footer__grid` sem esse layout na home atual.

## 8. Componentes globais e estados

### 8.1 Header

- **[C/V]** `position:fixed`, largura total, z-index 90.
- Padding inicial: `clamp(.9rem,2vh,1.4rem)` vertical e `clamp(1.1rem,3vw,2.4rem)` horizontal.
- Logo desktop: `clamp(98px,9vw,128px)` de largura; mobile até 860 px: 92 px.
- Após **80 px** de scroll, adiciona `.scrolled`: fundo espresso translúcido, blur 10 px, filete dourado `.25`, padding vertical menor.
- Transição de header: .4 s, `ease`.
- Símbolo do menu: 26 × 26 px, dourado, rotação contínua de 360° em 6 s, brilho periódico.
- Não há navegação horizontal tradicional nem CTA persistente no header desta home.
- Existe CSS e lógica de concierge, mas o componente não está presente no HTML inspecionado. Não incluí-lo como comportamento observado.

### 8.2 Menu de tela inteira

- **[C/V]** Camada fixa, z-index 100, fundo espresso em gradiente.
- Abertura: `clip-path:circle(0% at calc(100% - 3rem) 2.2rem)` → `circle(160% …)`.
- Duração .75 s, curva `cubic-bezier(.76,0,.24,1)`.
- Links Fraunces 500, outline 1 px, `clamp(2rem,6vw,4rem)`, entrelinha 1,18.
- No mobile até 860 px: `clamp(1.9rem,8vw,2.8rem)`.
- Hover: preenchimento dourado e remoção do outline em .3 s.
- Símbolo de fundo: 62% de largura, opacidade .1, rotação contínua de 30 s.
- Fecha por X, Escape, escolha de link ou abertura de consulta.
- Atualiza `aria-expanded` e `aria-hidden`; interrompe Lenis enquanto aberto.
- **[C/L]** Ao fechar, `visibility:hidden` é aplicado junto com a retirada da classe; por isso, não contar com uma animação reversa visível de .75 s como contrato confiável.

### 8.3 Botões e links

| Estado/componente | Especificação |
|---|---|
| Botão base | Borda 1 px, cápsula 100 px, padding `1em 1.9em`, fonte `.86rem`, caixa alta, tracking `.06em` |
| Botão grande | Padding `1.15em 2.4em`, fonte `.95rem` |
| Primário | Fundo/borda `--gold-deep`, texto marfim |
| Hover primário | Fundo `--gold`, texto espresso, sobe 2 px, sombra `0 8px 24px rgba(200,163,91,.25)` |
| Transições do botão | .6 s, `cubic-bezier(.16,1,.3,1)` |
| Link de serviço | Fonte `.78rem`, caixa alta, tracking `.12em`, filete dourado; hover branco e seta +5 px |
| Chips | Borda hairline, cápsula, `.85rem`, padding `.6em 1.1em` |
| Chip selecionado | Fundo espresso, texto marfim |
| Até 560 px | `.btn` ocupa 100% da largura |

Hover no CTA do convite também altera o padding via FLIP durante .35 s e transforma a assinatura em uma forma arredondada por .45 s. Sem Flip, usa escala 1,025. Isso não configura um botão magnético: não há acompanhamento contínuo do ponteiro.

### 8.4 Modal de consulta

**[C/V]** Card claro sobre scrim borrado; largura `min(560px,92vw)`, altura máxima 90svh, scroll interno, raio 8 px, padding `clamp(2rem,5vw,3.5rem)`, z-index global 300. Exibição via `display:none/block`, sem tween próprio de entrada/saída.

Fluxo:

1. Seleção de interesses por chips; múltiplas opções podem ficar ativas.
2. Campo livre de prazo desejado.
3. Nome, email e telefone; botão final.

**[V]** O fluxo permite avançar sem preencher o prazo. **[C]** Não há validação dos passos, botão voltar ou reinicialização do índice ao fechar. Reabrir mantém o passo atual e o estado dos campos durante a mesma visita.

**[C]** O botão final possui apenas `data-modal-close`: fecha o modal, sem formulário de envio ou handler de rede nesses arquivos. Não existe confirmação de recebimento. O protótipo Brunetti deve tornar o destino da ação explícito.

Foco inicial vai ao primeiro elemento focável — na prática, o X de fechar. Existe ciclo de Tab dentro do card e restauração de foco ao acionador. Escape e click no scrim fecham. Lenis para; não há bloqueio explícito equivalente de scroll nativo do `body` para mobile.

Campos: fundo transparente, apenas borda inferior, fonte 1,05rem; foco altera a borda para gold-deep e coloca um fundo dourado de 4%. Labels existem visualmente ocultos.

## 9. Motor de movimento e scroll

### 9.1 Dependências e inicialização

**[C]** GSAP + ScrollTrigger + SplitText + ScrollToPlugin. Plugins opcionais: MorphSVGPlugin, DrawSVGPlugin e Flip. Lenis cuida da suavização desktop. A URL de CSS/main contém versão de recurso `v=1.0.2`; isso não identifica a versão de cada biblioteca.

Boot: espera `document.fonts.ready` ou até 2 s, configura controles e cenas, atualiza os triggers, executa o loader, dispara `joia:ready`, inicia hero e atualiza as medições novamente. Há mecanismos para tornar texto visível se a inicialização falhar.

Loader: marca entra de y=14 px e opacidade 0 em .8 s; contador **000 → 100** em 1,5 s, espera .15 s, fade de .7 s. É um contador temporizado, não percentual real de bytes carregados. Há chamada de segurança após 3 s para finalizar. A espera por fontes pode aumentar o tempo total de entrada.

### 9.2 Sensação do mouse e da rolagem

| Parâmetro | Valor confirmado |
|---|---|
| Ativação Lenis | `min-width:861px` e ausência de reduced-motion |
| Interpolação | `lerp:0.09` |
| Wheel suave | `smoothWheel:true` |
| Multiplicador de wheel | `1` |
| Relógio | GSAP ticker chama `lenis.raf(t*1000)` |
| Sincronia | Evento de scroll Lenis chama `ScrollTrigger.update` |
| Lag smoothing GSAP | Desativado (`0`) |
| Navegação por âncora | Lenis `duration:1.3`; sem Lenis usa `scrollIntoView` suave |
| Reduced-motion | Âncora usa comportamento automático |
| ScrollTrigger | `ignoreMobileResize:true`, `limitCallbacks:true` |

**[C/V]** O wheel continua vertical. Nos pins, o documento consome deslocamento enquanto a cena fica parada e o progresso altera máscara, imagem ou cor. Não há snap implementado: atributos `data-no-snap` e `data-pin-duration` no HTML não constituem, por si só, uma configuração de snap. Os valores efetivos vêm das timelines do script.

Não foi encontrado cursor customizado. Os controles usam cursor padrão/pointer; o comparador interno usa `ew-resize`. Não há efeito de cursor magnético, trilha do mouse ou arraste da página inteira.

### 9.3 Distâncias fixadas da home

Todas começam em `top top`. Os números de `scrub` são tempos de suavização para alcançar o progresso, não durações totais da cena.

| Cena | Distância adicional de scroll | Em altura de 900 px | Scrub |
|---|---:|---:|---:|
| Manifesto | `1.2 × innerHeight` | 1080 px | 1,2 |
| Antes/depois | `1.6 × innerHeight` | 1440 px | .5 |
| Galeria, palco | `2.5 × innerHeight` | 2250 px | .6 |
| Convite | `1.4 × innerHeight` | 1260 px | 1 |

Os pins somam **6,7 alturas de viewport adicionais**, ou 6030 px no desktop medido. Hero, mural, serviços e equipe não são fixados. Os pins usam antecipação 1, invalidação no refresh e, nessas cenas, `fastScrollEnd:true`.

### 9.4 Coreografias

| Movimento | Gatilho | Parâmetros |
|---|---|---|
| Hero abre | Depois do loader | Máscara estrelada: `--r:9vmin → 118vmax`, `--a:1.2vmin → 70vmax`, 1,5 s, `power2.inOut` |
| Foto hero | Mesmo início | Escala 1,12 → 1 em 1,6 s, `power2.out` |
| Título hero | +.45 s | Linhas yPercent 125 → 0, .95 s, stagger .1, `power3.out` |
| Eyebrow/cue hero | +.65 s | y=18 → 0, opacidade → 1, .6 s, stagger .1 |
| Saída hero | `top top → bottom top` | Imagem yPercent +10, grid yPercent −4 e fade; scrub .8 |
| Manifesto | Pin | Linhas sobem de 115%, stagger .12; traço é desenhado e vira sorriso; fotos sobem 46 px, escala .92 → 1 |
| Antes/depois | Pin | Wipe em .72 unidades da timeline, início .12; legenda entra a .34; brilho a .82 |
| Serviços | Interseção de 18%, margem inferior −6% | Wipe 1,1 s, zoom 1,4 s, texto .7 s; atrasos .12/.2/.28 |
| Equipe | Topo chega a 72% da tela | Pilha abre em 1 s, stagger .12, `power3.out` |
| Galeria | Pin | Círculo 3% → 150% em .26 unidades; símbolo gira 160°, some a .3; crossfades iniciam em .36 e .68 |
| Convite | Pin | Iris escala 18 em .62 unidades; cores mudam a .2/.24; assinatura desenha, preenche e transforma |
| Reveal genérico | Topo chega a 86% | y=34 → 0, opacidade 0 → 1, 1 s, stagger .1; ao voltar, .6 s |
| Split genérico | Topo chega a 85% | Linhas yPercent 115 → 0, 1,1 s, stagger .12 |
| Motivos de fundo | `top bottom → bottom top` | Rotação alternada ±28°, scrub .6 |
| Progresso superior | Início ao final do documento | scaleX 0 → 1, altura 2 px, scrub .3 |
| Indicação de scroll | Loop | Linha 1 × 54 px, scaleY 1 ↔ .4, opacidade 1 ↔ .5, 2,2 s |

**Atenção:** durações dentro de timelines com `scrub` representam proporções internas. O usuário pode completar o trecho rápido ou devagar; não reproduzir esses números como delays de relógio independentes.

### 9.5 Vocabulário de easing e efeitos

- Interação CSS: `cubic-bezier(.16,1,.3,1)`.
- Cortinas/abertura de menu: `cubic-bezier(.76,0,.24,1)`.
- Entradas de texto: `power3.out`.
- Aberturas e morphs: `power2.inOut`.
- Movimentos contínuos: `linear`/`none`.
- Brilho decorativo: entrada `.75s back.out(2)`, seguida de y=-4 px e escala 1,18 em loop yoyo de 1,15 s, `sine.inOut`.

**[R]** O símbolo Brunetti deve ter equivalentes para forma fechada, contorno, preenchimento e forma arredondada/curva. Reutilizar a lógica de transformação sem simplesmente manter o emblema JOIA.

## 10. Páginas internas e padrões adicionais

### 10.1 Shell interno

**[C]** Header, menu, loader, modal, efeitos globais e footer compartilhados. Hero interno escuro, folio vertical, título grande nas colunas 2–11, lead serifado itálico de até 44ch. Título sobe por linhas em .95 s com stagger .1; metadados entram após .3 s. Mobile usa colunas completas e remove brilho decorativo do hero interno.

### 10.2 Tratamentos `/treatments/`

**[C]** Introdução seguida de cinco painéis: facetas, clareamento, planejamento completo do sorriso, alinhadores e tratamentos restauradores/implantes. Esses nomes descrevem o conteúdo original, não serviços confirmados da Brunetti.

Desktop: palco 100vh fixado; 6 painéis contando a introdução; distância de scroll `innerHeight × quantidade de painéis`, portanto 6 telas adicionais; scrub .7. Cada próximo painel sobe de yPercent 100 → 0; imagem reduz de escala 1,25 → 1. Nomes sobem por linhas, símbolo é desenhado e desaparece.

Uma faixa dourada atravessa a imagem em **1,15 s**, com xPercent −130 → 135. Esse movimento específico inicia ao chegar ao painel e toca por tempo, independentemente da rolagem. Não confundir com o scrub dos próprios painéis.

Mobile: painéis empilhados, mínimo 78vh; título `clamp(2.4rem,11vw,4.2rem)`. Abaixo, processo de 4 passos, 4 colunas no desktop, 2 até 860 px, 1 até 520 px; encerramento com CTA claro.

### 10.3 Resultados `/before-after/`

**[C]** Comparador próprio `.ba__stage`: máximo 1080 px, proporção 16:10, raio 6 px; mobile até 860 px, 4:3. Handle circular de 48 px, fundo espresso translúcido, blur 4 px e borda dourada. Linha vertical 2 px.

Pointerdown em qualquer ponto inicia arraste e cancela autoanimação; pointermove atualiza a divisão; pointerup encerra. Posição limitada entre **2% e 98%**. A entrada automática vai de valor 100 (renderizado como 98 por clamp) para **46%**, em 1,5 s, quando o topo chega a 78% da tela. Com reduced-motion, inicia em **52%**.

**[V]** No navegador, o estágio mediu 1080 × 675 px e estabilizou em `inset(0px 0px 0px 46%)`. Um gesto de arraste alterou a divisão para aproximadamente 49,72%, confirmando atualização interativa da máscara. A medição confirma funcionamento, não um teste de precisão de todos os gestos/tipos de entrada.

CSS usa `touch-action:none` e `user-select:none`. Não há handler de teclado no script do comparador. **[R]** Implementar semântica de slider, setas/Home/End e alternativa legível para teclado na Brunetti.

Galeria posterior usa CSS columns, não um grid de linhas uniformes: 4 colunas; 3 até 1100 px; 2 até 860 px; 1 até 460 px. Tiles misturam 4:5, 1:1 e 3:4. Entram de y=42 px em .9 s, stagger .08, gatilho 90%; imagens internas fazem parallax ±6% no desktop, scrub .6. Hover: zoom 1,06 e borda dourada mais forte. Não foi identificado lightbox nessa implementação.

### 10.4 Equipe `/team/`

**[C]** Repete o leque de retratos e acrescenta biografias alternadas, com grid `.92fr 1.08fr`, retratos 4:5, nome, função, texto e chips de credenciais. A revelação lateral usa interseção .2 e margem inferior −8%; sem animação no mobile. Credenciais são conteúdo específico e devem ser substituídas por dados reais da Brunetti.

### 10.5 Clínica `/clinic/`

**[C]** Hero → manifesto com duas fotografias verticais → passeio por ambientes → CTA.

No passeio, scroll vertical controla deslocamento horizontal. Faixa `.rooms__track`; primeiro painel 62vw, ambientes 82vw; altura 100vh. Distância horizontal e distância adicional de scroll são ambas `track.scrollWidth - innerWidth`; scrub .6. Quatro ambientes mais introdução, conforme HTML inspecionado.

Até 860 px: coluna vertical, ambientes com 74vh, introdução com altura automática; nenhum deslocamento horizontal. **[L]** O fallback de reduced-motion em desktop tem problema potencial: o script cancela o pin, mas o CSS de empilhamento dos ambientes está condicionado à largura. Deve ser corrigido antes de reutilizar.

### 10.6 Contato `/contact/`

**[C]** Grid de duas colunas, informações à esquerda e retrato/ambiente 4:5 à direita. Imagem revela por círculo 0% → 150%, 1,25 s, ao chegar a 82% da tela. O desenho sobre a imagem alterna entre sorriso e símbolo, com morphs de 1,5 s e pausas. Mobile coloca imagem primeiro, máximo 440 px de largura. Contatos são apresentados em linhas com bordas finas; CTA abre o mesmo modal.

### 10.7 Detalhe de tratamento, amostra `/treatments/veneers/`

**[C]** Hero com link de retorno → texto de apresentação + imagem 4:5 → processo sobre espresso → FAQ sobre marfim → cards de outros tratamentos → CTA.

Processo: duas colunas `.85fr 1.15fr`; cabeçalho sticky no desktop, topo `clamp(6rem,16vh,9rem)`. Trilho dourado de 2 px, nós de 24 px, centro de 6 px. Linha desenha durante o scroll, gatilho `top 78% → bottom 70%`, scrub .6. Cada passo acende ao atingir 45% de interseção, margem inferior −10%; nó ativo escala 1,18.

FAQ nativo com `<details>/<summary>`: largura máxima 900 px, borda de 1 px entre itens, título serifado `clamp(1.1rem,1.8vw,1.5rem)`, sinal `+` que gira 45° em .3 s. Não há exclusividade de abertura no script, portanto vários itens podem ficar abertos. Não há animação de altura customizada confirmada.

Cards relacionados: 4 colunas desktop, 2 até 860 px, proporção 4:5; zoom 1,05 no hover e imagem de opacidade .78 → 1.

## 11. Responsividade: preservar intenção e corrigir lacunas

### 11.1 Breakpoints reais

| Corte | Efeito |
|---|---|
| `min-width:861px` | Lenis no carregamento; timelines desktop; retrato contido no hero |
| `max-width:1100px` | Galeria interna de resultados passa de 4 para 3 colunas |
| `max-width:860px` | Header compacto; menu menor; equipe estática; internas reorganizadas; sem pins desktop |
| `max-width:820px` | Grid editorial vira coluna; hero full-bleed; comparação estática; serviços empilhados; convite escuro |
| `max-width:560px` | Equipe em 1 coluna; botões com largura total |
| `max-width:520px` | Processo geral de tratamentos em 1 coluna |
| `max-width:460px` | Galeria interna de resultados em 1 coluna |

### 11.2 Problema confirmado entre 821 e 860 px

**[C/V]** Em **834 × 1112**, a home apresentou **0 pin-spacers**, mas manteve o grid editorial desktop. A máscara da imagem hero continuou como pequeno polígono central, sem a timeline desktop para abri-la. O after permaneceu em `inset(0px 100% 0px 0px)` e a linha de wipe continuou visível, sem a timeline desktop para avançá-los.

A causa é a separação entre o corte de JavaScript em 861 px e o fallback CSS principal somente até 820 px. Isso é um defeito da referência, não uma característica estética.

**[R]** Unificar o fallback principal em **860 px**, ou estabelecer explicitamente um layout intermediário completo para 821–860 px. Para um primeiro protótipo fiel, usar 860/861 como fronteira única de cenas complexas e testar 820, 821, 834, 860 e 861.

### 11.3 Resize e orientação

**[C]** Timelines da home usam `gsap.matchMedia`, mas a constante `desktop` usada para iniciar Lenis é lida uma vez no carregamento. Scripts internos também leem `desktop` no início. Cruzar a fronteira por resize pode deixar o modo de scroll ou certas cenas diferente de um carregamento limpo nessa largura.

**[R]** Na Brunetti, criar/destruir Lenis e os efeitos por media query reativa; restaurar estilos ao desmontar. Validar tanto recarregamento em cada largura quanto resize contínuo e rotação do dispositivo.

### 11.4 Movimento reduzido

**[C]** O CSS desliga animações/transições globais; texto escondido é revelado; loader, facet e grain somem. O JavaScript principal evita construir cenas animadas. O mural vira conteúdo estático com wrap.

Não considerar o fallback perfeito: fotos duplicadas do mural não são removidas visualmente; a clínica pode manter o track horizontal sem o motor de deslocamento; regras mobile e reduced-motion compartilham um bloco que também reorganiza desktop. O hover do CTA é inicializado fora do retorno de `build()` para reduced-motion e merece revisão.

**[R]** Separar layout responsivo de preferência de movimento. Todas as imagens, textos e ações precisam permanecer acessíveis sem pin, parallax ou autoplay.

## 12. Imagens, marca e direção de arte

### 12.1 Inventário principal da home

URLs de imagem usam a base pública `https://www.preweb.site/projects/joia/wp-content/uploads/2026/06/`. A pasta não comprova data de produção da imagem.

| Grupo | Arquivos | Quantidade distinta | Papel a substituir na Brunetti |
|---|---|---:|---|
| Logo | `joia-stacked-gold.png`, `joia-horizontal-ivory.png` | 2 | Logo de entrada e header |
| Abertura | `hero.webp` | 1 | Retrato principal com espaço para crop |
| Método | `manifesto-detail-1.webp`, `-2.webp`, `-3.webp` | 3 | Processo, detalhe e resultado |
| Transformação | `makeover-before.webp`, `makeover-after.webp` | 2 | Par comparável com enquadramento consistente |
| Pessoas | `moment-1.webp` até `moment-9.webp` | 9 | Mural humano |
| Serviços | `treatment-veneers.webp`, `treatment-whitening.webp`, `work-smile.webp` | 3 | Imagem editorial de cada serviço |
| Equipe | `dentist-1.webp` até `dentist-3.webp` | 3 | Retratos da equipe real |
| Espaço | `clinic-suite2.webp`, `clinic-consult.webp`, `clinic-reception.webp` | 3 | Três ambientes |
| Convite | `invite-portrait.webp` | 1 | Retrato secundário de fundo |

Total: **25 fotografias distintas + 2 logos**, sem contar SVGs inline. O inventário JSON inclui também recursos das páginas internas.

Dimensões naturais verificadas para os arquivos já carregados durante a medição: hero **1638 × 2048**; miniaturas do manifesto e before **1200 × 1500**; logo horizontal **2000 × 560**; logo empilhado **1600 × 1600**. Outras dimensões devem ser lidas do asset, não inferidas do tamanho exibido.

### 12.2 Direção de arte observada

**[V]** Luz quente de janela, peles em tons naturais, roupa e fundos em branco quente, bege e marrom. Retratos espontâneos, sorrisos e enquadramentos próximos; ambientes com pedra clara, madeira, iluminação indireta, tecidos e vegetação. Fotografias de procedimento funcionam como detalhes artesanais, não como mosaico clínico de alta densidade.

**[L]** Não foi verificado se as imagens são de banco, produzidas, sintéticas ou de pacientes reais. O estilo não permite concluir procedência.

**[R]** Produzir ou selecionar um conjunto Brunetti coerente: retratos verticais 4:5, crop horizontal seguro para serviços/mural e ambientes largos. Cada imagem deve permitir os focos de crop documentados. Para comparação de resultados, usar enquadramento e iluminação consistentes, sem copiar os filtros que exageram diferenças.

### 12.3 Carregamento

**[C]** Hero com preload e `fetchpriority="high"`; imagens usam `decoding="async"`; muitas abaixo da dobra usam `loading="lazy"`. Não há `srcset`/`sizes` no HTML da home inspecionada. As fotos são WebP. Não há elemento de vídeo ou canvas na home: o efeito cinematográfico vem de fotos, SVG, CSS e scroll.

**[R]** Adicionar versões responsivas, dimensões intrínsecas e reserva de proporção. Medir triggers novamente após fontes/imagens necessárias, evitando mudanças de altura durante um pin. Manter os arquivos originais da referência apenas como evidência, substituindo-os na implementação Brunetti.

## 13. Camadas e acessibilidade

### 13.1 Ordem global de camadas

| Camada | z-index |
|---|---:|
| Conteúdo e imagens de cena | Geralmente 0–6 |
| Card ativo da equipe | 30 |
| Facet/luz global | 55 |
| Grain | 60 |
| Progresso | 70 |
| Header | 90 |
| Menu | 100 |
| Loader | 200 |
| Modal | 300 |
| Skip link | 400 |

Efeitos decorativos usam `pointer-events:none`. Há contextos de empilhamento locais por `isolation`, transform e opacidade; copiar números sem a hierarquia pode não reproduzir a sobreposição.

### 13.2 O que já existe

**[C/V]** Skip link, alt em fotografias de conteúdo, decoração em `aria-hidden`, foco visível, modal com `role=dialog` e `aria-modal`, Escape, ciclo de Tab e restauração de foco, labels ocultos nos campos, alternativas para alguns plugins e reduced-motion.

### 13.3 O que corrigir na reconstrução

- **Menu:** não há foco inicial, focus trap ou `inert` no restante da página implementados como no modal. Implementar.
- **Scroll em overlays:** parar Lenis não substitui bloquear e restaurar o scroll nativo no celular. Implementar ambos.
- **Chips:** seleção visual por classe sem `aria-pressed` no handler. Anunciar estado.
- **Comparador:** implementar teclado e valor acessível; o código observado é baseado em pointer.
- **Mural:** oferecer pausa acessível, inclusive em touch; hover não atende todas as entradas.
- **Contraste:** textos pequenos dourados, outline e corpo sobre imagem precisam de verificação no contexto final. O tema do `body` pode clarear o eyebrow do modal, apesar do card claro.
- **Formulário:** integrar envio real, validação, estados de erro/sucesso, anterior/próximo e política de persistência dos passos.
- **Fallback:** garantir leitura quando GSAP, fontes ou imagens falharem; o mecanismo de emergência existente cobre somente parte dos estados visuais.

Esses pontos são lacunas observadas no código, não resultado de uma auditoria formal completa de acessibilidade.

## 14. Plano de adaptação para Brunetti

### 14.1 Mapa de substituição

| Manter como sistema | Substituir por Brunetti |
|---|---|
| Papel e posição do logo | Logos próprios nas versões clara/escura e de entrada |
| Hierarquia Fraunces/Hanken ou equivalência métrica | Tipografia de marca aprovada, se houver |
| Claro/escuro/acento e filetes | Tokens reais da identidade, mantendo contraste e função |
| Diagonal e densidade do título hero | Promessa curta da Brunetti e quebras revisadas |
| Manifesto com 3 detalhes | Método e diferenciais verdadeiros |
| Demonstração visual | Caso/resultado adequado ao negócio |
| Mural em 2 linhas | Fotografias autorizadas e coerentes |
| 3 serviços de destaque | Seleção real de serviços/produtos |
| Leque de 3 retratos | Pessoas reais e funções corretas |
| Sequência de 3 espaços | Ambientes da Brunetti |
| Convite e modal | CTA, contato, canais e processo de conversão reais |
| Motivo gráfico animável | Símbolo derivado da identidade Brunetti |
| Footer compacto | Dados legais e links operacionais próprios |

**[L]** A inspeção não recebeu manual de marca, catálogo, fotografias ou estrutura comercial da Brunetti. Não assume que todos os serviços odontológicos do original se aplicam ao destino.

### 14.2 Componentização recomendada

**[R]** Separar conteúdo da coreografia:

```text
SiteShell
  Preloader / SiteHeader / FullscreenMenu
  ScrollProgress / GrainOverlay / AmbientLight
  HeroEditorial
  ManifestoScene
  ScrollBeforeAfter
  PeopleMarquee
  AlternatingServiceRows
  TeamFan
  IrisGallery
  InvitationScene
  SiteFooter
  ConsultationDialog

Internas
  InternalHero / TreatmentPanels / DragBeforeAfter
  ResultsColumns / TeamBiography / HorizontalRooms
  ContactDetails / ProcessTimeline / FAQ / RelatedCards
```

Configurar textos, imagens, focos de crop, links e durações fora dos componentes. Manter uma camada estática completa; só aplicar estados ocultos após confirmar que a animação correspondente foi inicializada. Cada animação deve ter limpeza e restauração de estilos.

### 14.3 Ordem de implementação

1. Tokens, fontes e shell; confirmar que o texto está com a mesma métrica.
2. Layout estático desktop e mobile, incluindo crops e comprimentos de títulos.
3. Header, menu, modal e navegação funcional.
4. Hero e reveals simples.
5. Pins do manifesto, transformação, galeria e convite.
6. Mural, interação da equipe e efeitos decorativos.
7. Internas necessárias ao escopo Brunetti.
8. Correções de breakpoints, teclado, reduced-motion e integração do formulário.

### 14.4 Critérios de aceite

- [ ] Em 1440 × 900, hero mantém retrato de aproximadamente 42vw × 82vh e título com recuos progressivos.
- [ ] Marfim/espresso alternam na mesma sequência narrativa.
- [ ] Tipografia, `ch`, entrelinhas e crops são comparados antes de ajustar animações.
- [ ] Scroll desktop tem Lenis .09 e exatamente os quatro pins previstos na home.
- [ ] Movimento para frente e para trás preserva as transições; reveals de entrada não somem indevidamente.
- [ ] Antes/depois da home responde ao scroll; o comparador interno responde ao arraste/teclado.
- [ ] Em 390 × 844 não há pins; manifesto, serviços, equipe e galeria permanecem completos e legíveis.
- [ ] A faixa 821–860 px não mantém máscaras fechadas.
- [ ] Resize/orientação recriam o modo correto sem reload obrigatório.
- [ ] Menu e modal têm foco previsível, Escape, restauração de foco e bloqueio de fundo.
- [ ] Formulário envia de verdade ou informa claramente que é demonstração.
- [ ] Reduced-motion permite acessar todo o conteúdo e cancela loops decorativos.
- [ ] Nenhum dado, retrato, credencial, logo, endereço ou serviço JOIA sobra por acidente.
- [ ] Links legais e de contato têm destinos reais.

## 15. Fontes e rastreabilidade

### 15.1 Registro resumido de verificação

| Contexto | Verificação realizada | Resultado |
|---|---|---|
| Home 1440 × 900 | Hero, manifesto, comparação, mural, serviços, equipe, galeria e convite | Estrutura visual conferida por capturas de viewport ao longo do scroll |
| Home desktop | Menu aberto e consulta em três passos | Menu circular, modal e avanço sem validação confirmados; nenhum dado pessoal inserido |
| Home desktop | Foco no primeiro nome da equipe | Escala 1,1/brilho 1,04 no ativo; escala .92 e brilho .55 nos demais |
| Home 390 × 844 | Tipografia, largura, fotos e empilhamento | 0 pins, largura do documento 390 px, imagem comparativa 350 × 437,5 px |
| Home 834 × 1112 | Máscara do hero e do after | Falha entre breakpoints confirmada por estilo computado e observação visual |
| Resultados 1440 × 900 | Entrada automática e arraste | Divisor em 46%; máscara atualizada pelo gesto |
| Reduced-motion | Leitura de CSS e JavaScript | Comportamentos documentados; sem teste por emulação da preferência |
| Internas restantes | HTML, CSS compartilhado e scripts por página | Estrutura e parâmetros confirmados em código, sem auditoria visual completa |

### 15.2 Endereços consultados

Fontes primárias consultadas:

1. [Home JOIA](https://www.preweb.site/projects/joia/) — estrutura, composição e marcação.
2. [CSS principal](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/css/style.css?v=1.0.2) — cores, fontes, layouts, estados e media queries.
3. [Motor principal](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/main.js?v=1.0.2) — scroll, loader, menu, modal e cenas.
4. [Tratamentos](https://www.preweb.site/projects/joia/treatments/) e [script](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/treatments.js?v=1.0.2).
5. [Antes/depois](https://www.preweb.site/projects/joia/before-after/) e [script](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/results.js?v=1.0.2).
6. [Equipe](https://www.preweb.site/projects/joia/team/) e [script](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/team.js?v=1.0.2).
7. [Clínica](https://www.preweb.site/projects/joia/clinic/) e [script](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/clinic.js?v=1.0.2).
8. [Contato](https://www.preweb.site/projects/joia/contact/) e [script](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/contact.js?v=1.0.2).
9. [Detalhe de facetas](https://www.preweb.site/projects/joia/treatments/veneers/) e [script](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/detail.js?v=1.0.2).
10. [Introdução compartilhada das internas](https://www.preweb.site/projects/joia/wp-content/plugins/joia-site/assets/js/pages/page-intro.js?v=1.0.2).

O conteúdo poderá mudar após a data da inspeção. Para reconstruir esta versão específica, confrontar o documento com os arquivos de evidência e seus hashes. As descrições de movimento e os tokens são a referência de implementação; comentários antigos do CSS/JS não prevalecem sobre o DOM e o comportamento executado.
