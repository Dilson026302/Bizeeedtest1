import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

export default defineConfig({
  server: {
    port: 3000, // You can use any unused port
  },
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
  optimizeDeps: {
    include: ['react-native-image-picker'],
  },
  define: {
    // Pass .env variables to Vite's environment
    "process.env": process.env,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx", // Map .js files to the JSX loader
      },
    },
  },
});
