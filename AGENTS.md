# AGENTS.md

Guidance for AI agents. Read this first, then `README.md` and `themes/midnight-xenon-color-theme.json`.

## What this project is

Midnight Xenon is a dark VS Code color theme published to the VS Code Marketplace and Open VSX. It has consistent
cross-language token colors, and a blue UI palette. The repo is a theme only: no runtime code.

- Theme file: `themes/midnight-xenon-color-theme.json` (tabs, `//` comments and trailing commas are allowed by VS Code,
  so it is not strict JSON)
- Package manifest: `package.json` (version, `engines.vscode`, theme contribution)
- Docs: `README.md` (supported-language table, color palette), `CHANGELOG.md`
- Test fixtures: `test/` (one sample file per supported language; `test/more_tests/` is git-ignored scratch)
- Tooling: `tools/check-theme.mjs`, `tools/token-check.mjs` (shared loader in `tools/theme.mjs`), Prettier, EditorConfig, Husky and lint-staged (pre-commit hook)
- Images: `assets/` (logo, language logos). Excluded from the package by `.vscodeignore`; the README links CDN copies.

## Commands

- `npm install` - install dev tooling and register the Husky pre-commit hook (`prepare` script)
- `npm run check` - runs `format:check` (Prettier) and `check:theme` (theme validation); run before finishing any change
- `npm run check:theme` - parses the theme (comments and trailing commas stripped), validates hex colors and rule
  structure, and warns when a later rule overrides a scope set by an earlier one
- `npm run tokens -- coverage <file> [--all]` - tokenize a file with the theme (Shiki, TextMate grammars) and list each
  unique color and scope pair, to spot uncolored or inconsistent tokens
- `npm run tokens -- lines <file> <line>...` - print every token's color and scope chain for the given lines
- `npm run tokens -- compare <file> <file>...` - list tokens whose color differs between parallel test files (only the
  part of each file before a `// <Name> specific` line is compared)
- `npm run format` - Prettier on everything not in `.prettierignore` (`test/`, `themes/`, `.vscode/` are ignored)
- `npx vsce ls` - lists exactly what the packaged extension contains (expected: `package.json`, `README.md`,
  `LICENSE.txt`, `CHANGELOG.md`, the theme file, `assets/logo.png`)
- Preview the unreleased theme: `codium --extensionDevelopmentPath=<repo> <repo>/test`, or press F5 in the repo (uses
  `.vscode/launch.json`). After editing the theme, run "Developer: Reload Window" in the dev window.

## How the theme works (things that are easy to get wrong)

- The theme has no `include`. VS Code loads only its own `tokenColors`. It does not inherit Dark Modern or `vs-dark`
  token rules. Languages without specific rules get only the general rules (comments, strings, numbers, keywords,
  functions, types).
- TextMate scope matching: for the same token, the rule with the most specific match wins (a longer scope or a
  descendant selector such as `meta.function.color.css constant.numeric` beats a shorter one). If two selectors are
  equally specific, the later rule in the file wins. When adding a scope, prefer adding it to an existing rule with the
  same color over creating a duplicate rule.
- `semanticHighlighting` is on, so the built-in TypeScript server, Pylance and similar servers override TextMate colors
  for many tokens. Semantic default-library variables map to the `support.other.variable` scope. A TextMate-only check
  does not show semantic results.
- Grammar limits: some things cannot be colored from a theme because the grammar gives them no distinct scope.

## Color conventions

- Keep colors consistent across languages. Main syntax palette is in the README.
- Equivalent constructs should match across languages (for example `is` / `in` / `typeof` use the logic-keyword blue,
  decorators use the function color, `this` matches Python `self`).

## Workflow

1. Create or update a sample in `test/` named `test.<ext>` (for example `test/test.rs`). Cover comments, strings,
   numbers, keywords, functions, classes and types, operators, and language-specific syntax. Keep related languages
   structurally parallel so they can be compared side by side (see `test.css`, `test.scss`, `test.sass`, `test.less`
   and `test.js` / `test.ts`).
2. Tokenize the sample with the theme and look for default-colored tokens and inconsistencies using
   `npm run tokens -- coverage test/test.<ext>`. Use `lines` to see the full scope chain of specific lines, and `compare`
   to find tokens colored differently across parallel files. This uses Shiki, which shows TextMate colors only. Confirm
   in VSCodium for semantic highlighting and UI colors.
3. Add scopes to existing rules where the color already exists, add a new rule only when a new color or selector is
   required, then run `npm run check`.
4. Update `README.md`: add or move the language in the supported table, and remove it from the To-do list. Add an
   extension link in the Extension column if highlighting needs one.
5. Add a logo if the table row needs one: a 128x128 transparent PNG named `<language>.png`, copied into
   `assets/language_logos/` and optionally uploaded to a CDN. Existing logos come from Devicon and Material Icon
   Theme.
6. Add a `CHANGELOG.md` entry and bump `package.json` only when preparing a release.
