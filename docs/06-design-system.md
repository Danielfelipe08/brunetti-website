# Brunetti Odontologia — Design System

**Version:** 0.1  
**Status:** Prototype  
**Scope:** Website prototype and initial implementation

---

# 1. Objetivo deste documento

Este documento define o sistema visual e os principais tokens de interface utilizados no protótipo do novo site da Brunetti Odontologia.

O sistema deverá orientar:

- design de interface;
- prototipação;
- desenvolvimento frontend;
- criação de componentes;
- responsividade;
- animações;
- tipografia;
- cores;
- espaçamento;
- tratamento de imagens;
- consistência entre páginas.

Este documento não representa um manual oficial de identidade da Brunetti.

As decisões abaixo foram construídas a partir de:

- materiais reais da clínica;
- identidade visual observada nas redes sociais;
- logotipo disponibilizado;
- fotografias da arquitetura;
- requisitos levantados na reunião.

Quando materiais oficiais de branding forem fornecidos, os tokens poderão ser atualizados.

---

# 2. Princípio visual

O Design System deverá traduzir:

**luxo silencioso + materialidade + arte + tecnologia + odontologia**

O design não deve tentar criar luxo através de ornamentação.

O valor deverá surgir através de:

- espaço;
- proporção;
- fotografia;
- tipografia;
- contraste;
- movimento;
- precisão.

---

# 3. Direção geral

A interface deverá possuir caráter:

- editorial;
- arquitetônico;
- sofisticado;
- contemporâneo;
- minimalista;
- humano;
- tecnológico sem parecer futurista.

Evitar aparência de:

- dashboard;
- SaaS;
- template médico;
- clínica popular;
- site corporativo genérico.

---

# 4. Sistema de cores

## Status

Paleta provisória para protótipo.

Não considerar como paleta oficial da marca.

A seleção parte da identidade preto/branco observada no logotipo e das tonalidades presentes na arquitetura real da clínica.

---

# 5. Cores principais

## Ink

```css
--color-ink: #0A0A09;
```

Uso:

- fundos escuros;
- footer;
- hero quando aplicável;
- áreas editoriais;
- textos sobre superfícies claras.

Representa o preto predominante na identidade.

---

## Carbon

```css
--color-carbon: #161513;
```

Uso:

- superfícies escuras secundárias;
- cards;
- backgrounds alternativos.

Evitar utilizar muitos níveis diferentes de preto.

---

## Ivory

```css
--color-ivory: #F3F0E9;
```

Uso:

- background principal claro;
- superfícies editoriais;
- áreas de leitura.

Deve substituir branco hospitalar sempre que possível.

---

## Paper

```css
--color-paper: #FAF8F3;
```

Uso:

- áreas muito claras;
- contraste com Ivory;
- superfícies pontuais.

---

# 6. Tons inspirados na arquitetura

## Walnut

Inspirado na madeira predominante na clínica.

```css
--color-walnut: #5A2E1B;
```

Uso restrito:

- detalhes;
- backgrounds editoriais específicos;
- elementos decorativos;
- estados visuais controlados.

Não deve ser utilizado como cor de botão principal em todo o site.

---

## Oak

```css
--color-oak: #9A6742;
```

Uso:

- detalhes;
- pequenos acentos;
- elementos inspirados em materialidade.

---

## Sand

```css
--color-sand: #D8CCBA;
```

Uso:

- backgrounds;
- superfícies;
- divisores;
- áreas editoriais.

---

## Stone

```css
--color-stone: #A6A097;
```

Uso:

- texto secundário;
- bordas;
- elementos neutros.

---

# 7. Cores de texto

```css
--text-primary-dark: #11110F;
--text-secondary-dark: #5D5A54;

--text-primary-light: #F6F3EC;
--text-secondary-light: #B8B4AB;
```

Não utilizar preto absoluto sobre branco absoluto sempre que houver alternativa.

---

# 8. Accent color

No protótipo, **não haverá uma cor vibrante principal**.

O sistema deverá depender principalmente de:

- preto;
- off-white;
- madeira;
- fotografia.

Isso diferencia a Brunetti de sites odontológicos que utilizam azul ou verde como código visual padrão.

Caso a identidade oficial apresente posteriormente uma cor institucional, ela poderá ocupar o token:

```css
--color-accent
```

---

# 9. Estados de interface

Estados funcionais devem permanecer neutros.

## Success

```css
--color-success: #496653;
```

## Error

```css
--color-error: #8A4139;
```

## Warning

```css
--color-warning: #92723E;
```

Essas cores devem aparecer apenas quando funcionalmente necessárias.

---

# 10. Proporção de utilização das cores

Direção aproximada:

```text
55% → Ivory / Paper

30% → Ink / Carbon

10% → fotografia / materiais

5% → Walnut / Sand / detalhes
```

Isso não deve ser interpretado como regra matemática rígida.

É apenas orientação visual.

---

# 11. Tema claro e escuro

O site não deverá possuir botão de alternância Dark Mode / Light Mode.

Entretanto, o layout poderá alternar naturalmente entre:

### Seções claras

```text
Ivory / Paper
```

e

### Seções escuras

```text
Ink / Carbon
```

Essa alternância será utilizada narrativamente.

Exemplo:

```text
Hero escuro
↓
Institucional claro
↓
Chairside escuro
↓
Tratamentos claro
↓
Experiência escura
```

Não alternar apenas por estética.

Cada transição deverá ajudar a criar ritmo.

---

# 12. Tipografia

A identidade tipográfica definitiva ainda não foi fornecida.

Para o protótipo utilizaremos um sistema:

**Editorial Serif + Contemporary Sans**

---

# 13. Fonte Display

Uso:

- Hero;
- H1;
- headlines editoriais;
- citações;
- grandes mensagens institucionais.

Características desejadas:

- sofisticada;
- alta legibilidade;
- contraste moderado;
- editorial;
- elegante sem parecer clássica demais.

Direções adequadas:

- Instrument Serif;
- DM Serif Display;
- Cormorant Garamond;
- ou equivalente de qualidade.

## Recomendação inicial para protótipo

```text
Instrument Serif
```

Caso disponível e tecnicamente adequada.

---

# 14. Fonte Sans

Uso:

- navegação;
- body;
- botões;
- labels;
- interface;
- informações funcionais.

Características:

- limpa;
- contemporânea;
- neutra;
- legível.

Direções adequadas:

- Inter;
- Geist;
- Manrope;
- Helvetica/Arial-like premium sans.

## Recomendação inicial

```text
Geist
```

ou:

```text
Inter
```

Geist poderá ser utilizada se a stack do projeto facilitar sua implementação.

---

# 15. Font stack

Provisoriamente:

```css
--font-display: "Instrument Serif", Georgia, serif;

--font-sans: "Geist", "Inter", Arial, sans-serif;
```

---

# 16. Hierarquia tipográfica desktop

## Display XL

```css
font-family: var(--font-display);
font-size: clamp(4.5rem, 7vw, 8rem);
line-height: 0.92;
letter-spacing: -0.035em;
font-weight: 400;
```

Uso:

Hero especial.

---

## H1

```css
font-family: var(--font-display);
font-size: clamp(3.5rem, 5.5vw, 6rem);
line-height: 0.98;
letter-spacing: -0.025em;
```

---

## H2

```css
font-family: var(--font-display);
font-size: clamp(2.5rem, 4vw, 4.5rem);
line-height: 1;
letter-spacing: -0.02em;
```

---

## H3

```css
font-family: var(--font-display);
font-size: clamp(2rem, 3vw, 3rem);
line-height: 1.05;
```

---

# 17. Body typography

## Large

```css
font-size: 1.25rem;
line-height: 1.55;
```

## Base

```css
font-size: 1rem;
line-height: 1.65;
```

## Small

```css
font-size: 0.875rem;
line-height: 1.55;
```

---

# 18. Eyebrows / Labels

```css
font-family: var(--font-sans);
font-size: 0.75rem;
font-weight: 500;
letter-spacing: 0.12em;
text-transform: uppercase;
```

Utilizar com moderação.

Exemplo:

```text
TECNOLOGIA BRUNETTI
```

---

# 19. Limite de largura textual

Evitar parágrafos muito largos.

```css
--content-text-max: 680px;
```

Para textos institucionais principais:

```css
--content-narrow: 540px;
```

---

# 20. Grid

Desktop deverá utilizar:

```text
12 colunas
```

Tablet:

```text
8 colunas
```

Mobile:

```text
4 colunas
```

---

# 21. Container

```css
--container-max: 1440px;
```

Para monitores maiores, o conteúdo deverá permanecer controlado.

---

# 22. Padding horizontal

Desktop:

```css
--page-padding-desktop: clamp(48px, 6vw, 96px);
```

Tablet:

```css
--page-padding-tablet: 32px;
```

Mobile:

```css
--page-padding-mobile: 20px;
```

---

# 23. Espaçamento

Base:

```text
4px
```

Escala:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
--space-11: 160px;
--space-12: 192px;
```

---

# 24. Espaçamento vertical entre seções

Desktop:

```text
120px – 192px
```

Mobile:

```text
72px – 112px
```

Não comprimir excessivamente o conteúdo.

Espaço faz parte da percepção premium.

---

# 25. Section height

Não exigir que todas as seções tenham `100vh`.

Hero poderá utilizar:

```css
min-height: 100svh;
```

Outras seções deverão responder ao conteúdo.

---

# 26. Border Radius

Evitar aparência excessivamente arredondada.

## Small

```css
--radius-sm: 4px;
```

## Medium

```css
--radius-md: 8px;
```

## Large

```css
--radius-lg: 16px;
```

## Pill

Reservado para casos específicos:

```css
--radius-pill: 999px;
```

Não utilizar radius de 24–40px em todos os componentes.

---

# 27. Borders

```css
--border-light: rgba(10,10,9,0.12);

--border-dark: rgba(255,255,255,0.14);
```

Bordas devem ser discretas.

---

# 28. Sombras

Sombras não deverão ser elemento visual predominante.

Uso excepcional:

```css
box-shadow:
0 12px 40px rgba(0,0,0,0.08);
```

Evitar:

- cards flutuantes genéricos;
- sombras fortes;
- glow.

---

# 29. Botão primário

Direção:

```text
fundo escuro
texto claro
```

Em seção escura:

```text
fundo claro
texto escuro
```

## Dimensões

Desktop:

```css
height: 52px;
padding: 0 28px;
```

Mobile:

```css
min-height: 48px;
padding: 0 22px;
```

---

# 30. Botão primário — comportamento

Hover:

- pequena alteração de contraste;
- transição suave.

Possível movimento:

```css
transform: translateY(-1px);
```

Não utilizar:

- glow;
- bounce;
- grandes escalas;
- gradientes chamativos.

---

# 31. Botão secundário

Possíveis formatos:

### Text link

```text
Conhecer a clínica →
```

ou:

### Ghost button

Fundo transparente.

Borda discreta.

---

# 32. Links editoriais

Podem utilizar:

- seta;
- underline animado;
- mudança discreta de opacidade.

Exemplo:

```text
Explorar tecnologia ↗
```

---

# 33. Cards

Regra:

> cards não são o padrão de layout.

Usar apenas quando ajudam a organizar conteúdo.

Evitar:

```text
12 caixas iguais com ícone + título + texto.
```

Preferir composição editorial.

---

# 34. Tratamentos

Os tratamentos podem utilizar:

- grandes imagens;
- tipografia sobreposta;
- listas;
- layouts alternados.

Caso cards sejam utilizados:

- imagem predominante;
- texto mínimo;
- sem sombra pesada;
- raio discreto.

---

# 35. Imagens

A fotografia deverá ser protagonista.

Formatos preferenciais:

## Editorial landscape

```text
16:10
```

## Cinematic

```text
16:9
```

## Portrait

```text
4:5
```

## Vertical editorial

```text
3:4
```

---

# 36. Image treatment

Não adicionar filtros artificiais intensos via CSS.

Preservar:

- madeira;
- tons quentes;
- pele natural;
- contraste;
- textura.

A direção fotográfica atual já possui forte identidade.

---

# 37. Imagens full bleed

Podem ultrapassar o container em seções especiais.

Exemplo:

```text
texto dentro do grid
+
imagem ocupando até a borda da viewport
```

Essa abordagem deve ser utilizada para gerar composição editorial.

---

# 38. Fotografia e tons quentes

As imagens reais apresentam frequentemente iluminação e materiais quentes.

O restante da interface deverá permanecer relativamente neutro para permitir que:

- madeira;
- pele;
- luz;
- arquitetura;

funcionem como cor.

---

# 39. Vídeo

Formato recomendado:

```text
MP4 / WebM otimizado
```

Sempre utilizar:

- poster;
- preload controlado;
- muted;
- playsInline.

Hero video:

```text
loop
autoplay
muted
playsInline
```

quando apropriado.

---

# 40. Overlays de vídeo

Quando texto estiver sobre vídeo:

```css
background:
linear-gradient(
  to bottom,
  rgba(0,0,0,0.08),
  rgba(0,0,0,0.45)
);
```

Valor deverá ser ajustado por asset.

Evitar escurecer tanto que a fotografia perca sua identidade.

---

# 41. Ícones

Priorizar:

- ícones lineares;
- traços finos;
- linguagem consistente.

Biblioteca possível:

```text
Lucide
```

Não misturar múltiplos estilos de ícones.

---

# 42. Logo

A identidade observada possui símbolo monocromático.

Utilizações preferenciais:

### Fundo claro

Logo preto.

### Fundo escuro

Logo branco.

Evitar:

- gradiente;
- sombra;
- glow;
- contorno;
- alteração de proporções.

---

# 43. Área de proteção do logo

Enquanto não houver manual oficial, utilizar como regra provisória:

```text
mínimo 1× a largura interna do símbolo ao redor do logo
```

Nunca encostar o logo em bordas da viewport.

---

# 44. Navegação

Header deve possuir altura aproximada:

```css
--header-height: 80px;
```

Mobile:

```css
--header-height-mobile: 68px;
```

Pode ser transparente sobre Hero.

Após scroll, poderá adquirir:

```text
background com blur discreto
```

ou:

```text
background sólido
```

dependendo do contraste.

---

# 45. Glass effect

Caso utilizado:

```css
backdrop-filter: blur(16px);
background: rgba(...);
```

Deve ser extremamente discreto.

Não utilizar Liquid Glass como linguagem dominante.

A Brunetti possui materialidade física forte demais para depender desse efeito.

---

# 46. Breakpoints

Proposta:

```css
--bp-sm: 480px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

Responsividade deve ser baseada no conteúdo, não apenas nesses valores.

---

# 47. Mobile

Mobile deverá preservar:

- fotografia;
- ritmo;
- tipografia;
- espaço;
- sensação premium.

Não reduzir tudo proporcionalmente.

Recompor.

---

# 48. Hero mobile

Direção:

- imagem/video vertical ou crop específico;
- headline de 42–56px aproximadamente;
- conteúdo acima da dobra;
- CTA acessível;
- navegação simplificada.

Evitar headline ocupando mais de 5–6 linhas.

---

# 49. Motion System

Princípio:

**slow, subtle, intentional.**

---

# 50. Motion duration

Microinteração:

```css
--motion-fast: 180ms;
```

Interface:

```css
--motion-base: 320ms;
```

Editorial:

```css
--motion-slow: 600ms;
```

Reveals especiais:

```css
--motion-cinematic: 900ms;
```

---

# 51. Easing

```css
--ease-standard:
cubic-bezier(0.22, 1, 0.36, 1);
```

Evitar `ease-in-out` genérico em todas as animações.

---

# 52. Scroll reveal

Elementos podem entrar com:

```text
opacity 0 → 1

translateY 24px → 0
```

Não exceder movimentos grandes.

---

# 53. Image reveal

Pode utilizar:

- clip-path;
- mask;
- scale muito discreto.

Exemplo:

```text
scale 1.04 → 1
```

---

# 54. Parallax

Permitido em:

- grandes fotografias;
- backgrounds;
- elementos editoriais.

Máximo recomendado:

movimento visual discreto.

Não utilizar em todos os elementos.

---

# 55. Reduced motion

Obrigatório respeitar:

```css
@media (prefers-reduced-motion: reduce)
```

Reduzir ou eliminar animações não essenciais.

---

# 56. Component tokens

## Button

```text
height: 52px
radius: 4–8px
padding-x: 28px
```

## Input

```text
height: 52px
radius: 4–8px
border: subtle
```

## Card

```text
radius: 8–16px
shadow: none/minimal
```

## Section

```text
padding-y: 120–192px desktop
padding-y: 72–112px mobile
```

---

# 57. Forms

O site não deverá depender de formulários extensos.

Caso exista formulário futuro:

- poucos campos;
- labels visíveis;
- alto contraste;
- mensagens claras;
- campos grandes.

---

# 58. WhatsApp CTA

WhatsApp é funcionalidade de conversão, mas não precisa transformar o site inteiro em verde.

Evitar:

```text
verde WhatsApp espalhado em toda interface
```

O botão poderá manter a identidade da Brunetti.

Ícone ou contexto poderá deixar claro seu destino.

---

# 59. Accessibility

Contraste mínimo deverá seguir WCAG.

Garantir:

- foco visível;
- teclado;
- labels;
- alt text;
- targets mobile adequados;
- contraste;
- reduced motion.

---

# 60. Hover

Hover jamais deve carregar informação essencial.

Mobile não possui hover.

Portanto:

```text
hover = melhoria
```

e não:

```text
hover = requisito para entender conteúdo
```

---

# 61. Z-index

Definir escala controlada:

```css
--z-base: 0;
--z-content: 10;
--z-header: 50;
--z-overlay: 100;
--z-modal: 200;
```

Evitar números arbitrários como:

```text
999999
```

---

# 62. Design tokens — resumo

```css
:root {
  /* Colors */

  --color-ink: #0A0A09;
  --color-carbon: #161513;

  --color-ivory: #F3F0E9;
  --color-paper: #FAF8F3;

  --color-walnut: #5A2E1B;
  --color-oak: #9A6742;
  --color-sand: #D8CCBA;
  --color-stone: #A6A097;


  /* Typography */

  --font-display: "Instrument Serif", Georgia, serif;

  --font-sans:
    "Geist",
    "Inter",
    Arial,
    sans-serif;


  /* Radius */

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;


  /* Layout */

  --container-max: 1440px;


  /* Motion */

  --motion-fast: 180ms;
  --motion-base: 320ms;
  --motion-slow: 600ms;

  --ease-standard:
    cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

# 63. O que evitar

Não utilizar sem justificativa:

- gradientes coloridos;
- azul médico;
- verde hospitalar;
- dourado;
- glassmorphism excessivo;
- cards em todas as seções;
- sombras pesadas;
- blur em excesso;
- tipografia futurista;
- ícones odontológicos;
- dentes ilustrados;
- interfaces de dashboard;
- bordas arredondadas excessivas;
- animações chamativas;
- brilhos;
- neon.

---

# 64. Referência fotográfica real

A arquitetura da Brunetti deverá orientar o design.

Os materiais apresentados possuem:

- madeira escura e quente;
- esculturas pretas;
- luz direcional;
- contraste alto;
- mobiliário sofisticado;
- tons creme;
- materiais naturais;
- presença de arte.

Quando houver dúvida sobre qual cor ou textura adicionar:

> consultar primeiro a própria clínica.

Não buscar decoração artificial para o site.

---

# 65. Relação entre fotografia e UI

A interface deverá funcionar como uma moldura.

Exemplo:

```text
Fotografia expressiva
+
tipografia elegante
+
muito espaço
+
pouca interface
```

Não:

```text
Fotografia
+
card
+
badge
+
ícone
+
gradient
+
efeito
+
glass
```

---

# 66. Critério visual de aprovação

Antes de aprovar uma seção perguntar:

### 1.

Ela poderia pertencer a um site genérico de clínica?

Se sim, reconsiderar.

### 2.

A fotografia real possui espaço suficiente?

### 3.

Existe informação visual desnecessária?

### 4.

Estamos tentando “mostrar luxo” ou deixando a qualidade aparecer?

### 5.

O layout conversa com arquitetura, arte e moda?

### 6.

Funciona igualmente bem em mobile?

---

# 67. Status dos tokens

## Aprovados para protótipo

- estrutura de grid;
- spacing;
- radius;
- motion;
- containers;
- abordagem claro/escuro;
- direção tipográfica;
- tratamento fotográfico.

## Provisórios

- cores exatas;
- famílias tipográficas definitivas.

## Dependem da Brunetti

- cores oficiais;
- fonte institucional;
- regras oficiais do logo;
- manual de marca;
- possíveis elementos gráficos proprietários.

---

# 68. Regra para agentes de IA

Ao implementar uma interface:

1. Utilizar tokens existentes.
2. Não criar novas cores arbitrariamente.
3. Não criar novos radius sem necessidade.
4. Não instalar novas fontes sem aprovação.
5. Não utilizar gradientes sem especificação.
6. Não utilizar glassmorphism como padrão.
7. Não transformar todas as informações em cards.
8. Utilizar fotografia real sempre que disponível.
9. Respeitar espaçamento amplo.
10. Preservar contraste e acessibilidade.
11. Não alterar o Design System para resolver um caso isolado sem registrar a decisão.
12. Caso o sistema não cubra uma situação, registrar antes de introduzir um novo padrão.

---

# 69. Princípio final

O Design System da Brunetti deverá ser quase invisível.

Sua função não é chamar atenção para a interface.

Sua função é permitir que:

**a arquitetura, a arte, a tecnologia, as pessoas e a experiência da Brunetti sejam protagonistas.**

O design deve comunicar qualidade através de precisão e contenção.