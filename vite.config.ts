import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 將第三方依賴獨立分包，讓瀏覽器能長期快取不常變動的 vendor 代碼
        manualChunks: {
          router: ["react-router"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-avatar", "@radix-ui/react-slot", "cmdk"],
        },
      },
    },
  },
})