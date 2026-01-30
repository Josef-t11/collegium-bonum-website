import { defineCliConfig } from "sanity/cli";
import path from "path";

export default defineCliConfig({
  api: {
    projectId: "collegium-bonum", // To už tam pravděpodobně máte
    dataset: "production"
  },
  // Sem přidáme konfiguraci pro Vite, aby pochopil symbol @
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});