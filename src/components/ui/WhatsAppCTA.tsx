import { Button } from "@/components/ui/Button";
import { homeContent } from "@/data/home";

export function WhatsAppCTA({ className }: { className?: string }) {
  const href =
    homeContent.whatsappHref ||
    "https://api.whatsapp.com/send?phone=5561996238444&text=Ol%C3%A1!%20Gostaria%20de%20conversar%20com%20a%20equipe%20da%20Brunetti%20Odontologia.";

  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      surface="dark"
      className={className}
      aria-label={`${homeContent.primaryCta} pelo WhatsApp`}
    >
      {homeContent.primaryCta}
    </Button>
  );
}
