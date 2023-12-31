import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), jsconfigPaths()],
    esbuild: {
      pure: mode === "production" ? ["console.log"] : [],
    },
  };
});
