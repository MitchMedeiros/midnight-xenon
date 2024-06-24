# About
This repository contains the theme files for the VSCode theme <a href="example.com">Midnight Xenon</a>.

This theme is a modification of the default dark theme for VSCode and primarily aims to:
- Improve the cross-language consistency of syntax highlighting when semantic highlighting is enabled
- Maintain standard syntax highlighting colors and avoid overcoloring your text editor
- Provide a more attractive and stylized UI

# Comparison

<img src="https://github.com/MitchMedeiros/midnight-xenon/blob/9efd8832e0ffeae3f6e04b566f0d4d962bfa1f78/images/improved/python.png">

# Syntax Highlighting
The below languages are currently customized. Each language depend on a popular extension which provides appropriate scopes for the tokenized text.

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width="19"> Python - Requires <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance">Pylance</a> (preinstalled)

<img src="https://cdn.jsdelivr.net/gh/MitchMedeiros/MitchMedeiros@85ebeb02576a02087114b63f193b4471aa372c20/images/java-white.svg" width="17"> Java - Requires <a href="https://marketplace.visualstudio.com/items?itemName=redhat.java">Language Support for Java</a>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg" width="17"> Scala - Requires <a href="https://marketplace.visualstudio.com/items?itemName=scala-lang.scala">Scala Syntax</a> (also installed with <a href="https://marketplace.visualstudio.com/items?itemName=scalameta.metals">Metals</a>)

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg" width="17"> Lua - Requires <a href="https://marketplace.visualstudio.com/items?itemName=sumneko.lua">Lua Language Server</a>

File Types:
- JSON
- txt
- XML

Languages and file types not listed will use the same syntax highlighting as Dark Modern.

## Syntax Colors
- Imports - #c2ff9e
- Classes - #2edcb7
- Methods - #DCDCAA
- Functions - #DCDCAA
- Variable Names - #9CDCFE
- Keywords - #C586C0
- Self/This Keyword - #b6c8c6
- Types - #2edcb7
- True/False - #10B1FE
- Numerical Values - #B5CEA8
- Strings - #f3c785
- Comments - #c9c9c9bc
- Punctuation - #D4D4D4
- Operators - #D4D4D4

## Customizing Syntax Colors
You can add or modify a particular syntax color to your preferences by

1) Opening the "Inspect Editor Tokens and Scopes" tools in VSCode and placing your cursor with text you want to change
2) Copying one of the listed textmate scopes (using the most specific scope will reduce the risk of accidentally recoloring other tokens)
3) Add a textmate rule to your VSCode settings.json file with the following format:
```json
"editor.tokenColorCustomizations": {
    "textMateRules": [
        {
            "scope": "<scope of the token>",
            "settings": {
                "foreground": "<color you want to use>"
            }
        }
    ]
}
```

It may be the case that two or more distinct code elements have only a single textmate scope which is shared across them. If you wish for their colors to differ you will need to either find an extension which adds distinct scopes for them or <a href="https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide">manually add your own</a>.
