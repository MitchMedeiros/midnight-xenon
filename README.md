<h1>About</h1>
This repository contains the theme files for the VSCode theme <a href="example.com">Dark Xenon</a>.

This theme aims to maintain similar syntax highlighting to the default Dark Modern theme while:

<ul>
<li>Improving the cross-language consistency of syntax highlighting when semantic highlighting is enabled</li>
<li>Make subjective improvements to certain syntax colors, such as in-line comments being more muted</li>
<li>Providing more attractive and stylized UI colors</li>
</ul>

<h1>Comparison</h1>

...

<h1>Syntax Highlighting</h1>

The below languages are currently customized. Each language depend on a popular extension which provides appropriate scopes for the tokenized text.

<img src="images/python.png" width="19"> Python - Requires <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance">Pylance</a> (preinstalled)

<img src="images/java.png" width="17"> Java - Requires <a href="https://marketplace.visualstudio.com/items?itemName=redhat.java">Language Support for Java</a>

<img src="images/scala.png" width="17"> Scala - Requires <a href="https://marketplace.visualstudio.com/items?itemName=scala-lang.scala">Scala Syntax</a> (also installed with <a href="https://marketplace.visualstudio.com/items?itemName=scalameta.metals">Metals</a>)

<img src="images/lua.png" width="17"> Lua - Requires <a href="https://marketplace.visualstudio.com/items?itemName=sumneko.lua">Lua Language Server</a>

File Types:

<ul>
<li>JSON</li>
<li>txt</li>
<li>XML</li>
</ul>

Languages and file types not listed will use the same syntax highlighting as Dark Modern.

<h2>Syntax Colors</h2>

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

<h2>Customizing Syntax Colors</h2>

You can add or modify a particular syntax color to your preferences by

<ol>
<li>Opening the "Inspect Editor Tokens and Scopes" tools in VSCode and placing your cursor with text you want to change</li>
<li>Copying one of the listed textmate scopes (using the most specific scope will reduce the risk of accidentally recoloring other tokens)</li>
<li>Add a textmate rule to your VSCode settings.json file with the following format:
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
</li>
<ol>

It may be the case that two or more distinct code elements have only a single textmate scope which is shared across them. If you wish for their colors to differ you will need to either find an extension which adds distinct scopes for them or <a href="https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide">manually add your own</a>.
