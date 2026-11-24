// Herramientas WebMCP: permiten que un agente de IA en el navegador consulte los
// servicios, vea trabajos, navegue el sitio y prepare un pedido de presupuesto.
// Spec: https://webmachinelearning.github.io/webmcp/
// Este módulo se descarga solo si el navegador expone document.modelContext.
import servicios from "@/data/servicios.json";
import { CONTACT_INFO, buildWhatsAppQuoteUrl } from "../contacto";
import { SITE_URL } from "../seo";

type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };

export type WebMcpTool = {
  name: string;
  title?: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean; consequentialHint?: boolean; untrustedContentHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};

type ServiceData = {
  title: string;
  subtitle: string;
  features: { title: string; description: string }[];
};
const SERVICES = servicios as Record<string, ServiceData>;
const SERVICE_KEYS = Object.keys(SERVICES);

const PAGES: Record<string, string> = {
  "/": "Inicio",
  "/sobre-nosotros": "Sobre nosotros: cómo trabajamos",
  "/proyectos": "Galería de trabajos realizados",
  "/contacto": "Contacto y formulario de presupuesto",
  ...Object.fromEntries(SERVICE_KEYS.map((k) => [`/soluciones/${k}`, SERVICES[k].title])),
};

const QUOTE_SERVICES = ["Revestimientos", "Cartelería y Corpóreos", "Gráfica corporativa", "Proyecto Integral"];

const text = (value: unknown): ToolResult => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
});
const fail = (message: string): ToolResult => ({ ...text(message), isError: true });

export function createTools(navigate: (path: string) => void): WebMcpTool[] {
  return [
    {
      name: "list_services",
      title: "Servicios de Visione Publicidad",
      description:
        "List the services Visione Publicidad offers (signage and 3D letters, building facade cladding, corporate graphics and vinyl), with what each one includes and its page URL. Content is in Spanish.",
      inputSchema: {
        type: "object",
        properties: {
          service: { type: "string", enum: SERVICE_KEYS, description: "Only return this service. Omit to list all." },
        },
      },
      annotations: { readOnlyHint: true },
      async execute({ service }) {
        const keys = typeof service === "string" ? [service] : SERVICE_KEYS;
        if (keys.some((k) => !SERVICES[k])) return fail(`Unknown service. Use one of: ${SERVICE_KEYS.join(", ")}`);
        return text(
          keys.map((k) => ({
            id: k,
            title: SERVICES[k].title,
            summary: SERVICES[k].subtitle,
            url: `${SITE_URL}/soluciones/${k}`,
            includes: SERVICES[k].features.map((f) => ({ name: f.title, description: f.description })),
          })),
        );
      },
    },
    {
      name: "get_contact_info",
      title: "Datos de contacto",
      description: "Get Visione Publicidad's address, WhatsApp number, email, opening hours and service area.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        return text(CONTACT_INFO);
      },
    },
    {
      name: "browse_projects",
      title: "Ver trabajos realizados",
      description:
        "Get photos of past projects from the gallery, optionally filtered by type. Returns image URLs and a cursor to fetch more.",
      inputSchema: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["carteleria", "revestimientos", "grafica"], description: "Project type filter." },
          cursor: { type: "string", description: "nextCursor from a previous call, to get the next page." },
        },
      },
      annotations: { readOnlyHint: true },
      async execute({ type, cursor }) {
        const params = new URLSearchParams();
        if (typeof cursor === "string" && cursor) params.set("cursor", cursor);
        if (typeof type === "string" && type) params.set("tag", type);
        const res = await fetch(`/.netlify/functions/galeria?${params}`);
        if (!res.ok) return fail("The gallery could not be loaded. Try again later.");
        const data = (await res.json()) as { images: { url: string; tags: string[] }[]; nextCursor: string | null };
        return text({
          images: data.images.map((img) => ({ url: img.url, tags: img.tags })),
          nextCursor: data.nextCursor,
          galleryPage: `${SITE_URL}/proyectos`,
        });
      },
    },
    {
      name: "navigate_to_page",
      title: "Ir a una página",
      description: `Open a page of the website in the user's current tab. Available pages: ${Object.entries(PAGES)
        .map(([p, label]) => `${p} (${label})`)
        .join("; ")}.`,
      inputSchema: {
        type: "object",
        properties: { path: { type: "string", enum: Object.keys(PAGES) } },
        required: ["path"],
      },
      async execute({ path }) {
        if (typeof path !== "string" || !PAGES[path])
          return fail(`Unknown page. Use one of: ${Object.keys(PAGES).join(", ")}`);
        navigate(path);
        window.scrollTo({ top: 0 });
        return text(`Opened ${SITE_URL}${path} (${PAGES[path]}).`);
      },
    },
    {
      name: "prepare_quote_request",
      title: "Preparar pedido de presupuesto",
      description:
        "Prepare a quote request for Visione Publicidad. Returns a WhatsApp link with the message already written; nothing is sent. Show the link to the user so they can review and send it themselves.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Full name of the person asking for the quote." },
          location: { type: "string", description: "Where the job is (address or city)." },
          service: {
            type: "string",
            enum: QUOTE_SERVICES,
            description: "Service needed. 'Proyecto Integral' means advice / a full project.",
          },
          illuminated: { type: "boolean", description: "Whether the sign needs lighting." },
          details: { type: "string", description: "Approximate size and other details of the job." },
        },
        required: ["name", "location", "service"],
      },
      annotations: { readOnlyHint: true },
      async execute({ name, location, service, illuminated, details }) {
        if (typeof name !== "string" || !name.trim()) return fail("name is required.");
        if (typeof location !== "string" || !location.trim()) return fail("location is required.");
        if (typeof service !== "string" || !QUOTE_SERVICES.includes(service))
          return fail(`service must be one of: ${QUOTE_SERVICES.join(", ")}`);
        return text({
          whatsappUrl: buildWhatsAppQuoteUrl({
            nombre: name,
            ubicacion: location,
            servicio: service,
            iluminado: illuminated ? "si" : "no",
            consulta: typeof details === "string" ? details : undefined,
          }),
          note: `Nothing has been sent. The user must open this link and press send in WhatsApp, or email ${CONTACT_INFO.email}.`,
        });
      },
    },
  ];
}
