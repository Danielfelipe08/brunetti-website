import { Button } from "@/components/ui/Button";
import { homeContent } from "@/data/home";

export function WhatsAppCTA({ className }: { className?: string }) {
  if (!homeContent.whatsappHref) {
    return (
      <Button
        surface="dark"
        className={className}
        disabled
        aria-label={`${homeContent.primaryCta} — WhatsApp ainda não disponível`}
        title="WhatsApp ainda não disponível"
      >
        {homeContent.primaryCta}
      </Button>
    );
  }

  return (
    <Button
      href={homeContent.whatsappHref}
      surface="dark"
      className={className}
      aria-label={`${homeContent.primaryCta} pelo WhatsApp`}
    >
      {homeContent.primaryCta}
    </Button>
  );
}
