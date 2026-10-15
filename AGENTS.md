# AGENTS.md

## Brunetti Odontologia Website

Este arquivo define como agentes de IA devem trabalhar neste repositório.

Leia estas instruções antes de alterar qualquer arquivo.

---

## 1. Fonte de verdade

A documentação em `/docs` é a principal fonte de verdade do projeto.

Antes de trabalhar, consulte os documentos relevantes:

1. `docs/01-project-brief.md`
2. `docs/02-brand-guidelines.md`
3. `docs/03-target-audience.md`
4. `docs/04-sitemap.md`
5. `docs/05-page-specs.md`
6. `docs/06-design-system.md`

Não contradiga decisões já documentadas sem solicitação explícita.

---

## 2. Objetivo do projeto

Construir o novo site institucional da Brunetti Odontologia.

A experiência deve comunicar:

- hotelaria de alto luxo;
- arte;
- tecnologia;
- arquitetura;
- exclusividade;
- atendimento humanizado.

O site não deve parecer uma clínica odontológica genérica.

---

## 3. Conversão principal

O principal CTA do site é o WhatsApp.

Não adicionar sem solicitação:

- chatbot;
- e-commerce;
- checkout;
- agendamento automatizado;
- área do paciente;
- formulários extensos.

---

## 4. Trabalhe apenas no escopo solicitado

Se a tarefa for:

`Implementar o Hero da Home`

altere apenas o necessário para essa tarefa.

Não aproveite para:

- redesenhar outras seções;
- trocar fontes globais;
- alterar o footer;
- refatorar arquivos sem necessidade;
- instalar bibliotecas não relacionadas.

---

## 5. Não invente informações

Nunca invente:

- tratamentos;
- tecnologias;
- profissionais;
- endereço;
- números;
- depoimentos;
- prêmios;
- preços;
- estatísticas;
- resultados clínicos;
- prazos de tratamento.

Quando uma informação estiver faltando, marque como pendente.

---

## 6. Conteúdo clínico

Não inventar:

- indicações;
- contraindicações;
- duração;
- recuperação;
- número de sessões;
- resultados garantidos;
- riscos;
- benefícios clínicos específicos.

Conteúdo clínico deve ser validado pela Brunetti.

---

## 7. Claims

Afirmações fornecidas pela cliente, mas ainda não comprovadas, não devem ser tratadas automaticamente como fatos verificados.

Exemplo:

`Maior laboratório chairside da América Latina`

Manter internamente como claim que requer validação antes da publicação final.

---

## 8. Design System

Sempre seguir:

`docs/06-design-system.md`

Não criar arbitrariamente:

- novas cores;
- novas fontes;
- novos radius;
- sombras;
- gradientes;
- efeitos visuais.

Utilizar os tokens existentes sempre que possível.

---

## 9. Princípios visuais

Priorizar:

- fotografia real da Brunetti;
- layout editorial;
- espaço generoso;
- arquitetura;
- materialidade;
- tipografia;
- contraste;
- animações discretas.

Evitar:

- azul médico;
- dourado excessivo;
- neon;
- glassmorphism exagerado;
- cards em todas as seções;
- sombras pesadas;
- estética SaaS;
- ícones odontológicos genéricos.

---

## 10. Assets

Prioridade:

1. materiais reais da Brunetti;
2. novos materiais produzidos para o projeto;
3. conteúdo institucional existente;
4. elementos gráficos;
5. imagens geradas por IA somente quando necessário.

Não substituir fotografia real adequada por imagem genérica.

---

## 11. Responsividade

Toda implementação deve funcionar em:

- desktop;
- tablet;
- mobile.

Mobile não deve ser apenas uma versão desktop comprimida.

Recomponha o layout quando necessário.

---

## 12. Performance

O projeto utilizará muitas fotos e vídeos.

Por isso:

- otimizar imagens;
- usar tamanhos responsivos;
- lazy-load quando apropriado;
- utilizar poster em vídeos;
- evitar JavaScript desnecessário;
- evitar bibliotecas pesadas sem justificativa.

Qualidade visual não deve comprometer carregamento.

---

## 13. Acessibilidade

Manter:

- HTML semântico;
- navegação por teclado;
- foco visível;
- contraste adequado;
- alt text;
- labels;
- suporte a `prefers-reduced-motion`.

---

## 14. Componentes

Criar componentes reutilizáveis quando houver reutilização clara.

Evitar abstrações prematuras.

Preferir:

- componentes simples;
- props claras;
- nomes objetivos;
- código fácil de manter.

---

## 15. Dependências

Antes de instalar uma biblioteca:

1. verificar se realmente é necessária;
2. verificar se a stack atual já resolve o problema;
3. evitar bibliotecas duplicadas;
4. explicar o motivo da instalação.

---

## 16. Estrutura esperada

src/app/
- páginas e rotas

src/components/layout/
- header, footer e navegação

src/components/sections/
- seções das páginas

src/components/ui/
- componentes pequenos reutilizáveis

src/components/media/
- componentes de imagem e vídeo

src/data/
- conteúdo estruturado

src/lib/
- helpers e utilitários

src/types/
- tipos compartilhados

Não criar novas pastas de primeiro nível sem necessidade.

---

## 17. Antes de criar algo novo

Antes de criar um componente:

- procure se já existe algo equivalente.

Antes de corrigir um bug:

- entenda a implementação atual.

Antes de refatorar:

- confirme se isso é realmente necessário para a tarefa.

---

## 18. Não redesenhe silenciosamente

Uma seção já validada não deve ser modificada apenas porque o agente considera outra solução "melhor".

Mudanças visuais relevantes precisam de instrução explícita.

---

## 19. Animações

Direção:

`slow, subtle, intentional`

Permitido:

- fade;
- reveal;
- translate discreto;
- mask reveal;
- parallax leve.

Evitar:

- bounce;
- glow;
- rotação;
- zoom exagerado;
- movimento constante.

---

## 20. Home

A Home deverá priorizar:

1. posicionamento Brunetti;
2. experiência da clínica;
3. laboratório chairside;
4. tratamentos;
5. tecnologia;
6. atendimento humanizado;
7. autoridade;
8. Instagram;
9. localização;
10. WhatsApp.

Consultar:

`docs/05-page-specs.md`

---

## 21. Chairside

O laboratório chairside é um dos principais diferenciais do projeto.

Apresentar principalmente:

- integração;
- fluxo digital;
- controle;
- conveniência;
- rapidez quando aplicável.

Evitar excesso de linguagem técnica.

---

## 22. Instagram

Durante o protótipo, a seção pode ser simulada.

Não escolher uma integração definitiva antes de avaliar:

- autenticação;
- limitações;
- manutenção;
- custo;
- confiabilidade.

---

## 23. WhatsApp

WhatsApp é o CTA principal.

O site não precisa utilizar verde do WhatsApp como cor principal.

O botão deve permanecer visualmente coerente com a identidade Brunetti.

---

## 24. Qualidade de código

Preferir:

- TypeScript estrito;
- nomes claros;
- funções pequenas;
- código simples;
- mínima complexidade.

Evitar `any` sempre que possível.

---

## 25. Fluxo de trabalho

Para cada tarefa:

1. ler `AGENTS.md`;
2. ler somente os documentos relevantes;
3. inspecionar os arquivos relacionados;
4. planejar a menor alteração necessária;
5. implementar;
6. testar;
7. revisar desktop e mobile;
8. parar quando o escopo estiver concluído.

Não explorar ou alterar o projeto inteiro para uma tarefa localizada.

---

## 26. Validação

Antes de finalizar:

- verificar erros de TypeScript;
- verificar console;
- verificar rota afetada;
- verificar responsividade;
- verificar regressões visuais.

Compilar não significa que a interface está visualmente correta.

---

## 27. Git

Branches recomendadas:

- `feat/home-hero`
- `feat/chairside-section`
- `fix/mobile-nav`
- `docs/design-system`

Commits devem ser pequenos e claros.

Exemplos:

- `feat: implement home hero`
- `feat: add chairside section`
- `fix: improve mobile navigation`
- `docs: update design system`

---

## 28. Resposta ao concluir uma tarefa

Responder de forma curta com:

### Changed
O que foi alterado.

### Files
Arquivos modificados.

### Validation
O que foi testado.

### Pending
O que ainda falta, se houver.

---

## 29. Quando houver dúvida

Não adivinhar decisões:

- estratégicas;
- clínicas;
- de branding;
- de escopo;
- de arquitetura relevante.

Marcar a decisão para revisão.

Para pequenos detalhes técnicos já cobertos pelas convenções do projeto, prossiga normalmente.

---

## 30. Regra final

A interface deve valorizar a Brunetti, não competir com ela.

Entre:

`mais efeitos`

e

`mais clareza`

prefira sempre:

`mais clareza`.


## 31. Padrão para implementações da Home

- JOIA é a referência principal: reproduzir com máxima fidelidade visual e de interação, sem redesign; adaptar apenas conteúdo, identidade e imagens para Brunetti.
- Consultar automaticamente `docs/references/joia/joia-reference/JOIA-BRUNETTI-DESIGN-SYSTEM.md`, `docs/references/joia/joia-reference/tokens.json` e `docs/references/joia/visual/`.
- `docs/01-project-brief.md` e `docs/02-brand-guidelines.md` definem conteúdo e identidade Brunetti. Não usar `docs/legacy`.
- Usar somente assets reais de `public/brand/brunetti/`.
- Implementar somente a seção solicitada; não alterar seções anteriores sem pedido explícito.
- Preservar composição, grid, tipografia, espaçamentos, animações, scroll/pinning e responsividade do JOIA.
- Rodar lint após cada seção. Não fazer commit sem solicitação.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
