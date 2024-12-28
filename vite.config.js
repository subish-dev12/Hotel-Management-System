import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});

//each pages will not have any side effects
//instead we will import all the funcationalities from the component
//that is related with the feature
