import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web", // Aliasing for React Native Web compatibility
    },
  },
  optimizeDeps: {
    include: ["react-native-image-picker"], // Include dependencies explicitly for pre-bundling
    esbuildOptions: {
      loader: {
        ".js": "jsx", // Ensure ESBuild treats `.js` files as JSX
      },
    },
  },
});
