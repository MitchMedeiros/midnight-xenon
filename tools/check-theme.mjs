import { loadTheme } from "./theme.mjs";

const hexColor = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const errors = [];
const warnings = [];

let theme;
try {
  theme = loadTheme();
} catch (error) {
  console.error(`Theme is not valid JSON: ${error.message}`);
  process.exit(1);
}

if (!theme.name) errors.push("Missing theme name");
if (!Array.isArray(theme.tokenColors)) errors.push("tokenColors must be an array");

const scopeColors = new Map();
for (const [index, rule] of (theme.tokenColors ?? []).entries()) {
  const label = `tokenColors[${index}] "${rule.name ?? "unnamed"}"`;
  const scopes = [].concat(rule.scope ?? []);
  if (scopes.length === 0) errors.push(`${label}: missing scope`);
  const foreground = rule.settings?.foreground;
  if (foreground && !hexColor.test(foreground)) errors.push(`${label}: invalid foreground "${foreground}"`);

  for (const scope of scopes) {
    const color = foreground?.toLowerCase();
    const previous = scopeColors.get(scope);
    if (previous && previous.color !== color) {
      warnings.push(`${label}: scope "${scope}" overrides ${previous.color} set by ${previous.label}`);
    }
    scopeColors.set(scope, { color, label });
  }
}

for (const [key, value] of Object.entries(theme.colors ?? {})) {
  if (!hexColor.test(value)) errors.push(`colors.${key}: invalid color "${value}"`);
}

for (const warning of warnings) console.warn(`Warning: ${warning}`);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Theme OK: ${theme.tokenColors.length} token rules, ${Object.keys(theme.colors ?? {}).length} colors`);
