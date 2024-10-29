import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression()],
  build: {
    minify: "esbuild",

    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf("node_modules")) {
            if (id.indexOf("react/")) {
              return "react-vendor";
            }
            if (id.indexOf("@emotion/")) {
              return "emotion-vendor";
            }
            return "vendor";
          }
          if (id.indexOf("src/features/")) {
            const feature = id.split("src/features/")[1].split("/")[0];
            return `feature-${feature}`;
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    sourcemap: false,
    modulePreload: {
      polyfill: false,
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
    },
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.tsx"],
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
    pure: ["console.log"],
    legalComments: "none",
  },
});
