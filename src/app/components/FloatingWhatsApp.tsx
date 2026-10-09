import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Button } from "./ui/button";

// Same business number used by the contact form and footer.
const WHATSAPP_URL = "https://wa.me/5491148897180";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-40">
      <Button
        type="button"
        size="icon"
        aria-label="Contactar a Visione por WhatsApp (abre una nueva pestaña)"
        title="Hablemos por WhatsApp"
        onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
        className="btn-wipe btn-wipe-primary size-14 md:size-16 rounded-full bg-primary text-primary-foreground shadow-2xl border border-primary hover:bg-primary focus-visible:ring-primary"
      >
        <WhatsAppIcon className="size-7" />
      </Button>
    </div>
  );
}
