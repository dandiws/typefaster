import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [
      tsconfigPaths(),
      react(),
      Unfonts({
        custom: {
          families: [
            {
              name: "Geist Mono",
              src: "./src/assets/fonts/GeistMonoVF.woff2",
            },
          ],
        },
      }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
  };
});
