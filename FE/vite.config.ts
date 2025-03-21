import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
const env = loadEnv(process.env.NODE_ENV as string, process.cwd(), "VITE_");

console.log("loadEnv⚙️");
console.log(env);

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": env,
  },
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_HOST,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
          "*": "",
        },
      },
    },
  },
});
