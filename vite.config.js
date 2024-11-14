// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
// export default {
//   server: {
//     host: "0.0.0.0", // Expose the server to external network
//     port: 3001, // You can change the port if needed
//   },
// };

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config documentation: https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // You can change the port if needed, default is 3000
  },
});
