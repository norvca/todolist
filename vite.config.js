import { resolve } from "path";
import { readdirSync } from "fs";

import { defineConfig } from "vite";
import customIndex from "vite-plugin-custom-index";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [
    customIndex("index.hbs"),
    handlebars({
      partialDirectory: getDirectories("src/components"),
    }),
  ],
});

function getDirectories(componentsDir) {
  const absolutePath = resolve(__dirname, componentsDir);

  return readdirSync(absolutePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => `${absolutePath}/${dirent.name}`);
}
