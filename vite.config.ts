import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/tdd-flip-box-game/",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
