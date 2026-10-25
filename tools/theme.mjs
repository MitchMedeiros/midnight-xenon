import { readFileSync } from "node:fs";

export const themeUrl = new URL("../themes/midnight-xenon-color-theme.json", import.meta.url);

export function loadTheme() {
  const source = readFileSync(themeUrl, "utf8")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(source);
}
