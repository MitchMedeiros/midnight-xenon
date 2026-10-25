import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { createHighlighter } from "shiki";
import { loadTheme } from "./theme.mjs";

const usage = `Usage:
  node tools/token-check.mjs coverage <file> [--all]   unique color and scope pairs, punctuation hidden unless --all
  node tools/token-check.mjs lines <file> <line>...    scopes and color of every token on the given lines
  node tools/token-check.mjs compare <file> <file>...  tokens with the same text but different colors across files

Tokenizes with the TextMate grammars bundled in Shiki and the theme in themes/. Semantic highlighting and UI colors are
not reflected; confirm those in the editor. compare only reads the part of each file before a "// <Name> specific" line.`;

const languageByExtension = { py: "python", sh: "bash", ps1: "powershell", md: "markdown", yml: "yaml", rs: "rust" };
const sharedSectionEnd = /^\/\/ \w+ specific/m;

const theme = loadTheme();
const highlighters = new Map();

function languageOf(file) {
  const extension = extname(file).slice(1).toLowerCase();
  return languageByExtension[extension] ?? extension;
}

async function tokenize(file, source = readFileSync(file, "utf8")) {
  const lang = languageOf(file);
  if (!highlighters.has(lang)) highlighters.set(lang, await createHighlighter({ themes: [theme], langs: [lang] }));
  const { tokens } = highlighters.get(lang).codeToTokens(source, { lang, theme: theme.name, includeExplanation: true });
  return tokens;
}

function* explainedTokens(lines) {
  for (const [index, line] of lines.entries()) {
    for (const token of line) {
      for (const part of token.explanation) {
        if (part.content.trim()) {
          const scopes = part.scopes.map((scope) => scope.scopeName);
          yield { line: index + 1, text: part.content.trim(), color: (token.color ?? "none").toUpperCase(), scopes };
        }
      }
    }
  }
}

async function coverage(file, showAll) {
  const seen = new Map();
  for (const token of explainedTokens(await tokenize(file))) {
    const scope = token.scopes.at(-1);
    if (!showAll && /^punctuation\.(section|definition|separator|terminator|accessor)/.test(scope)) continue;
    const key = `${token.color} | ${scope}`;
    if (!seen.has(key)) seen.set(key, token);
  }
  for (const [key, token] of [...seen].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(key, "|", JSON.stringify(token.text.slice(0, 30)), `L${token.line}`);
  }
}

async function lines(file, numbers) {
  const wanted = new Set(numbers.map(Number));
  let current = 0;
  for (const token of explainedTokens(await tokenize(file))) {
    if (!wanted.has(token.line)) continue;
    if (token.line !== current) console.log(`--- L${(current = token.line)}`);
    console.log(token.color, JSON.stringify(token.text), token.scopes.slice(-3).join(" > "));
  }
}

async function compare(files) {
  const byText = new Map();
  for (const file of files) {
    const shared = readFileSync(file, "utf8").split(sharedSectionEnd)[0];
    for (const token of explainedTokens(await tokenize(file, shared))) {
      const perFile = byText.get(token.text) ?? new Map();
      const entries = perFile.get(file) ?? new Set();
      entries.add(`${token.color}(${token.scopes.at(-1)})`);
      perFile.set(file, entries);
      byText.set(token.text, perFile);
    }
  }
  for (const [text, perFile] of byText) {
    const colors = new Set(
      [...perFile.values()].flatMap((entries) => [...entries].map((entry) => entry.split("(")[0])),
    );
    if (perFile.size < 2 || colors.size < 2) continue;
    console.log(JSON.stringify(text));
    for (const [file, entries] of perFile) console.log("   ", file, [...entries].join(" | "));
  }
}

const [command, ...args] = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith("--"));

if (command === "coverage" && positional.length === 1) await coverage(positional[0], args.includes("--all"));
else if (command === "lines" && positional.length > 1) await lines(positional[0], positional.slice(1));
else if (command === "compare" && positional.length > 1) await compare(positional);
else {
  console.error(usage);
  process.exit(1);
}
