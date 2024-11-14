import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config documentation: https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
});
