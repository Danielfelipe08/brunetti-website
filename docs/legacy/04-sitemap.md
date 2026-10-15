# Brunetti Odontologia — Sitemap & Information Architecture

## 1. Objetivo deste documento

Este documento define a arquitetura de informação inicial do novo site da Brunetti Odontologia.

Ele deverá orientar:

- estrutura de páginas;
- navegação principal;
- hierarquia de conteúdo;
- criação dos wireframes;
- estratégia de SEO;
- organização de componentes;
- implementação frontend;
- expansão futura do site.

O sitemap foi desenvolvido a partir dos requisitos levantados na reunião de diagnóstico.

A cliente não definiu explicitamente uma quantidade de páginas. Portanto, a estrutura apresentada aqui é uma recomendação de projeto baseada nos objetivos identificados.

---

# 2. Princípio da arquitetura

O site deverá equilibrar três necessidades:

### 1. Posicionamento

Apresentar a Brunetti como uma experiência diferenciada de odontologia.

### 2. Descoberta

Permitir que usuários encontrem a clínica através de pesquisas relacionadas à marca e aos tratamentos.

### 3. Conversão

Conduzir usuários interessados para uma conversa no WhatsApp.

A arquitetura deverá permanecer simples.

Não criar páginas sem função clara.

---

# 3. Sitemap principal

Estrutura inicial recomendada:

```text
/
│
├── /clinica
│
├── /tratamentos
│   │
│   ├── /lentes-de-contato-em-porcelana
│   │
│   ├── /implantes-dentarios
│   │
│   ├── /limpeza-air-flow
│   │
│   └── /clareamento-dentario
│
├── /tecnologia
│
├── /na-midia
│
└── /contato
```

Total inicial:

**6 áreas principais**

com páginas individuais para os tratamentos estratégicos.

---

# 4. Navegação principal

Header recomendado:

```text
BRUNETTI

A Clínica

Tratamentos

Tecnologia

Na Mídia

Contato

[ Falar pelo WhatsApp ]
```

O WhatsApp deverá funcionar como CTA principal.

Em telas menores, os links poderão ser agrupados em um menu mobile.

---

# 5. Home

URL:

```text
/
```

## Objetivo

Criar a primeira impressão da marca e apresentar rapidamente:

- experiência;
- arquitetura;
- tecnologia;
- principais tratamentos;
- laboratório chairside;
- autoridade;
- conteúdo recente;
- localização;
- contato.

A Home não deverá explicar tudo em profundidade.

Sua função será criar interesse e encaminhar o visitante para:

- páginas internas;
- Instagram;
- WhatsApp.

---

# 6. Estrutura recomendada da Home

A ordem definitiva será refinada durante `05-page-specs.md`.

Estrutura inicial:

```text
HEADER

HERO

MANIFESTO / EXPERIÊNCIA BRUNETTI

CLÍNICA / ARQUITETURA

LABORATÓRIO CHAIRSIDE

TRATAMENTOS PRINCIPAIS

TECNOLOGIA

EXPERIÊNCIA DO PACIENTE

VÍDEO INSTITUCIONAL

NA MÍDIA / PROVA SOCIAL

INSTAGRAM

LOCALIZAÇÃO

CTA FINAL

FOOTER
```

O site deverá causar impacto visual antes de apresentar grandes volumes de informação.

---

# 7. A Clínica

URL:

```text
/clinica
```

## Objetivo

Apresentar a identidade institucional da Brunetti.

Essa página deverá aprofundar a experiência apresentada na Home.

Possíveis conteúdos:

- história e conceito da clínica;
- filosofia;
- arquitetura;
- hotelaria;
- arte;
- experiência do paciente;
- atendimento personalizado;
- estrutura;
- liderança.

---

# 8. Pessoas na página A Clínica

A página não deverá funcionar como catálogo individual de profissionais.

A comunicação deverá priorizar:

### Brunetti Odontologia

Marca principal.

### Jonas

Dentista-chefe.

### Gestão da clínica

Apresentação institucional da gestora.

### Equipe multidisciplinar

Apresentada de maneira coletiva.

Não deverão ser criadas inicialmente páginas individuais para profissionais parceiros.

A estrutura deverá permanecer independente da permanência de parceiros específicos.

---

# 9. Tratamentos

URL:

```text
/tratamentos
```

## Objetivo

Apresentar os tratamentos oferecidos pela Brunetti e funcionar como hub para as páginas específicas.

Estrutura possível:

```text
Tratamentos

Lentes de contato em porcelana
→ Saiba mais

Implantes dentários
→ Saiba mais

Limpeza com Air Flow
→ Saiba mais

Clareamento dentário
→ Saiba mais

Outros tratamentos
→ futuramente
```

A lista completa ainda depende das informações que a clínica deverá fornecer.

---

# 10. Páginas de tratamento

Cada tratamento estratégico deverá possuir sua própria página.

Essa decisão possui duas funções:

### Experiência

Permitir explicar cada tratamento sem sobrecarregar a Home.

### SEO

Criar páginas específicas para diferentes intenções de pesquisa.

---

# 11. Lentes de contato em porcelana

URL recomendada:

```text
/tratamentos/lentes-de-contato-em-porcelana
```

Possíveis tópicos:

- apresentação;
- para quem é indicado;
- experiência Brunetti;
- fluxo digital;
- laboratório chairside;
- tecnologia;
- resultados possíveis;
- dúvidas frequentes;
- CTA WhatsApp.

Não definir promessas clínicas específicas sem validação da clínica.

---

# 12. Implantes dentários

URL recomendada:

```text
/tratamentos/implantes-dentarios
```

Possíveis tópicos:

- apresentação;
- avaliação;
- planejamento;
- tecnologia;
- equipe;
- estrutura;
- experiência;
- FAQ;
- WhatsApp.

A comunicação deverá evitar sugerir que todo caso de implante pode ser concluído em três dias.

---

# 13. Limpeza com Air Flow

URL recomendada:

```text
/tratamentos/limpeza-air-flow
```

A página poderá explicar de maneira visual:

- o que é a tecnologia;
- como funciona;
- diferenciais em relação a métodos convencionais;
- experiência do paciente;
- equipamento utilizado;
- CTA.

Evitar excesso de especificações técnicas.

---

# 14. Clareamento dentário

URL recomendada:

```text
/tratamentos/clareamento-dentario
```

Conteúdo possível:

- apresentação;
- avaliação;
- abordagem utilizada;
- experiência;
- dúvidas frequentes;
- contato.

---

# 15. Expansão futura de tratamentos

Quando a clínica fornecer a lista completa, novas URLs poderão ser adicionadas seguindo o padrão:

```text
/tratamentos/nome-do-tratamento
```

Exemplo estrutural:

```text
/tratamentos
    /tratamento-a
    /tratamento-b
    /tratamento-c
```

Essa estrutura permite ampliar o site sem alterar sua arquitetura principal.

---

# 16. Tecnologia

URL:

```text
/tecnologia
```

## Objetivo

Apresentar o principal diferencial tecnológico da Brunetti.

Essa página deverá possuir grande importância institucional.

Conteúdos prioritários:

### Laboratório Chairside

- laboratório integrado;
- fluxo digital;
- produção;
- rapidez;
- controle;
- integração entre clínica e laboratório.

### Scanner intraoral

Apresentação visual da tecnologia.

### Air Flow

Apresentação do equipamento e benefício para o paciente.

### Outras tecnologias

Adicionar posteriormente após levantamento com a clínica.

---

# 17. Laboratório Chairside

O laboratório poderá ser apresentado dentro de `/tecnologia` como elemento protagonista.

Neste primeiro escopo, não é obrigatório criar:

```text
/laboratorio
```

como página separada.

Entretanto, caso o conteúdo e a estratégia de SEO justifiquem posteriormente, poderá existir:

```text
/tecnologia/laboratorio-chairside
```

A arquitetura deverá permitir essa expansão.

---

# 18. Na Mídia

URL:

```text
/na-midia
```

## Objetivo

Reunir conteúdos externos que reforcem a autoridade da Brunetti.

Exemplos:

- Revista GPS;
- entrevistas;
- matérias;
- publicações;
- outras aparições relevantes.

Estrutura possível:

```text
Imagem

Título da matéria

Veículo

Data

[ Ler matéria ]
```

O conteúdo deverá direcionar para a publicação original quando aplicável.

---

# 19. Contato

URL:

```text
/contato
```

## Objetivo

Facilitar comunicação e localização.

Conteúdo:

- WhatsApp;
- telefone, se aplicável;
- endereço;
- horários;
- Instagram;
- mapa;
- rota.

Possíveis ações:

```text
Falar pelo WhatsApp

Abrir no Google Maps

Abrir no Apple Maps
```

A solução técnica definitiva dos mapas será definida posteriormente.

---

# 20. Instagram

Não deverá existir uma página:

```text
/instagram
```

O Instagram deverá funcionar como integração e canal complementar.

Aplicações recomendadas:

### Home

Feed ou seleção dinâmica de conteúdos recentes.

### Footer

Link convencional.

### Outras páginas

Link discreto quando pertinente.

---

# 21. WhatsApp

Também não deverá existir uma página intermediária para WhatsApp.

O CTA deverá abrir diretamente o canal de atendimento.

Exemplo conceitual:

```text
[ Falar com a Brunetti ]
```

ou

```text
[ Agendar uma avaliação ]
```

A copy definitiva será desenvolvida posteriormente.

---

# 22. CTA global

O contato via WhatsApp deverá estar disponível ao longo de toda a experiência.

Possíveis pontos:

- Header;
- Hero;
- páginas de tratamento;
- tecnologia;
- final de seções estratégicas;
- footer;
- CTA flutuante, caso aprovado no design.

Evitar excesso de botões repetidos.

---

# 23. Footer

Estrutura inicial:

```text
BRUNETTI ODONTOLOGIA

A Clínica
Tratamentos
Tecnologia
Na Mídia
Contato

WhatsApp
Instagram

Endereço

Google Maps
Apple Maps

Informações legais
Política de Privacidade
```

Caso necessário:

```text
CRO / responsável técnico
```

deverá ser validado antes da publicação.

---

# 24. Hierarquia completa recomendada

```text
BRUNETTI ODONTOLOGIA

HOME
│
├── experiência
├── clínica
├── chairside
├── tratamentos
├── tecnologia
├── mídia
├── Instagram
├── localização
└── contato


A CLÍNICA
│
├── conceito
├── arquitetura
├── arte
├── experiência
├── liderança
└── equipe multidisciplinar


TRATAMENTOS
│
├── Lentes de contato em porcelana
│
├── Implantes dentários
│
├── Limpeza com Air Flow
│
├── Clareamento dentário
│
└── futuros tratamentos


TECNOLOGIA
│
├── Laboratório Chairside
├── Fluxo digital
├── Scanner intraoral
├── Air Flow
└── Outras tecnologias


NA MÍDIA
│
├── Revista GPS
└── Futuras publicações


CONTATO
│
├── WhatsApp
├── Endereço
├── Mapa
├── Rota
└── Instagram
```

---

# 25. Jornada principal pela arquitetura

## Caminho institucional

```text
Google / Instagram / indicação
        ↓
       Home
        ↓
    A Clínica
        ↓
    Tecnologia
        ↓
     WhatsApp
```

---

## Caminho por tratamento

```text
Google
   ↓
Página do tratamento
   ↓
Diferencial Brunetti
   ↓
Tecnologia / Chairside
   ↓
WhatsApp
```

---

## Caminho de validação

```text
Indicação
   ↓
Home
   ↓
Estrutura / fotos / vídeos
   ↓
Na Mídia
   ↓
Contato
```

---

# 26. Navegação mobile

Menu sugerido:

```text
MENU

A Clínica
Tratamentos
Tecnologia
Na Mídia
Contato

────────────

Falar pelo WhatsApp

Instagram
```

Priorizar simplicidade.

Não utilizar múltiplos níveis complexos de menu.

Tratamentos podem abrir uma lista simples.

---

# 27. URLs

Padrão:

- minúsculas;
- palavras separadas por hífen;
- nomes claros;
- sem códigos ou IDs desnecessários.

Exemplo correto:

```text
/tratamentos/implantes-dentarios
```

Evitar:

```text
/service?id=4
```

---

# 28. Página 404

Criar página personalizada.

Objetivo:

- manter identidade da marca;
- informar que o conteúdo não foi encontrado;
- oferecer retorno para Home;
- oferecer acesso ao WhatsApp.

---

# 29. SEO e arquitetura

O site deverá utilizar arquitetura hierárquica clara.

Exemplo:

```text
/
    /tratamentos
        /implantes-dentarios
        /clareamento-dentario
```

Isso ajuda mecanismos de busca e usuários a entenderem a relação entre conteúdos.

As páginas de tratamentos deverão possuir conteúdo original e específico.

Não deverão existir apenas para repetir o mesmo texto mudando o nome do procedimento.

---

# 30. Estrutura inicial de lançamento

Para a primeira versão, recomendamos:

### Institucional

- Home
- A Clínica
- Tecnologia
- Na Mídia
- Contato

### Tratamentos

- Hub de tratamentos
- Lentes de contato em porcelana
- Implantes dentários
- Limpeza com Air Flow
- Clareamento dentário

Total:

**10 URLs principais inicialmente.**

---

# 31. O que NÃO criaremos inicialmente

Não fazem parte da arquitetura inicial:

- e-commerce;
- área do paciente;
- login;
- portal;
- checkout;
- sistema interno;
- chatbot;
- agendamento automatizado;
- página individual para cada profissional parceiro;
- página separada do Instagram;
- dezenas de páginas de tratamentos sem conteúdo validado.

---

# 32. Possíveis expansões futuras

A arquitetura deverá permitir futuramente:

```text
/blog
```

ou

```text
/conteudos
```

para estratégia de SEO.

Também poderá permitir:

```text
/en
```

para conteúdo em inglês.

E novas páginas:

```text
/tratamentos/...
```

conforme o catálogo da clínica for validado.

Essas funcionalidades não pertencem automaticamente ao escopo inicial.

---

# 33. Decisões ainda pendentes

Antes de considerar o sitemap definitivo, confirmar:

- lista completa de tratamentos;
- informações institucionais finais;
- matérias disponíveis;
- dados de contato;
- dados de localização;
- necessidade ou não de versão em inglês;
- requisitos legais da área odontológica;
- conteúdo referente à equipe;
- materiais disponíveis para cada página.

---

# 34. Princípio final da arquitetura

A Brunetti não precisa de um site cheio de páginas.

Precisa de uma estrutura em que cada página possua uma função clara:

**apresentar**

**explicar**

**gerar confiança**

ou

**converter.**

Se uma página não cumprir pelo menos uma dessas funções, sua existência deverá ser reconsiderada.