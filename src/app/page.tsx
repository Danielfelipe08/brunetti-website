import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";

export default function Home() {
  return (
    <main>
      <section className="surface-light" style={{ padding: "var(--space-9) 0" }}>
        <Container>
          <p className="text-eyebrow text-secondary">Fundação visual</p>
          <h1 className="text-h1" style={{ marginTop: "var(--space-4)" }}>
            Base do design system
          </h1>
          <p
            className="text-body-lg text-secondary text-measure"
            style={{ marginTop: "var(--space-5)" }}
          >
            Página neutra para validar tipografia, cores e componentes base.
          </p>
          <div
            style={{
              marginTop: "var(--space-6)",
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-5)",
              alignItems: "center",
            }}
          >
            <Button href="#">Botão primário</Button>
            <Button href="#" variant="ghost">
              Botão ghost
            </Button>
            <TextLink href="#">Text link</TextLink>
          </div>
        </Container>
      </section>

      <section className="surface-dark" style={{ padding: "var(--space-9) 0" }}>
        <Container>
          <p className="text-eyebrow text-secondary">Seção escura</p>
          <h2 className="text-h2" style={{ marginTop: "var(--space-4)" }}>
            Contraste Ink e Ivory
          </h2>
          <div
            style={{
              marginTop: "var(--space-6)",
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-5)",
              alignItems: "center",
            }}
          >
            <Button href="#" surface="dark">
              Botão primário
            </Button>
            <Button href="#" variant="ghost" surface="dark">
              Botão ghost
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
