import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// Las páginas llegan prerenderizadas (scripts/prerender.mjs), así que el JS
// principal se pide recién cuando la página terminó de cargar (o a los 3 s):
// el navegador pinta el contenido y la imagen principal sin competir con React.
// Los links son <a> reales, así que la navegación funciona antes de hidratar.
function deferMainScript(): Plugin {
  return {
    name: 'defer-main-script',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          (_, src) =>
            `<script>(function(){var d=0;function go(){if(d)return;d=1;var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src=${JSON.stringify(src)};document.head.appendChild(s)}function later(){setTimeout(go,300)}if(document.readyState==="complete")later();else addEventListener("load",later);setTimeout(go,3000)})()</script>`,
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    deferMainScript(),
  ],
  resolve: {
    // Keep application and dependency hooks on the same React instance.
    dedupe: ['react', 'react-dom'],
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    // Optimize React and its renderer together before serving the first page.
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@radix-ui/react-avatar',
      '@radix-ui/react-slot',
    ],
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
