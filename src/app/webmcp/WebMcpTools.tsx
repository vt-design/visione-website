import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

type ModelContext = {
  registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => unknown;
  unregisterTool?: (name: string) => void;
};

function getModelContext(): ModelContext | null {
  const g = globalThis as {
    document?: { modelContext?: ModelContext };
    navigator?: { modelContext?: ModelContext };
  };
  // La spec actual usa document.modelContext; versiones previas de Chrome, navigator.modelContext.
  return g.document?.modelContext ?? g.navigator?.modelContext ?? null;
}

/** Registra las herramientas WebMCP del sitio si el navegador las soporta. */
export function WebMcpTools() {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  useEffect(() => {
    const mc = getModelContext();
    if (!mc) return;
    const controller = new AbortController();
    const names: string[] = [];
    void import("./tools").then(({ createTools }) => {
      if (controller.signal.aborted) return;
      for (const tool of createTools((path) => navigateRef.current(path))) {
        try {
          void Promise.resolve(mc.registerTool(tool, { signal: controller.signal })).catch((e) =>
            console.warn("WebMCP:", tool.name, e),
          );
          names.push(tool.name);
        } catch (e) {
          console.warn("WebMCP:", tool.name, e);
        }
      }
    });
    return () => {
      controller.abort();
      // Versiones previas de la API no usan la señal para quitar herramientas.
      for (const name of names) {
        try {
          mc.unregisterTool?.(name);
        } catch {
          /* ya quitada */
        }
      }
    };
  }, []);

  return null;
}
