<h1>Midnight Xenon Theme</h1>

This theme aims to maintain similar syntax highlighting and ease of code readability as the default Dark Modern and Dark+ themes while:

<ul>
<li>Improving the cross-language consistency of syntax highlighting with semantic highlighting enabled</li>
<li>Making minor improvements to certain syntax colors, such as in-line comments being more muted, imported libraries/modules having a unique color, etc</li>
<li>Providing a more minimalistic UI with a deep blue and neon color scheme</li>
</ul>

<h2>Theme Example Photos</h2>

Looks best when UI elements are hidden and keyboard shortcuts are used to navigate instead!

<img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/theme_examples/python.png">

With the full UI visible:

<h2>Syntax Highlighting</h2>

In general, to benefit from syntax highlighting a language server (LSP) extension for the programming language(s) you're interested in is needed. This theme addresses the fact that different LSPs tokenize and attach scopes to text differently by explicitly listing the LSP needed for a particular language in order to get consistent cross-language highlighting. The most popular LSPs are recommended for the below languages:

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/python.png" width="19"> Python - Requires <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance">Pylance</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/java.png" width="17"> Java - Requires <a href="https://marketplace.visualstudio.com/items?itemName=redhat.java">Language Support for Java</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/scala.png" width="17"> Scala - Requires <a href="https://marketplace.visualstudio.com/items?itemName=scalameta.metals">Metals</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/lua.png" width="17"> Lua - Requires <a href="https://marketplace.visualstudio.com/items?itemName=sumneko.lua">Lua Language Server</a>

| Scope                | Color                                              | HEX       |
| -------------------- | -------------------------------------------------- | --------- |
| Class                | ![#2EDCB7](https://fakeimg.pl/35/2EDCB7/?text=+)   | #2EDCB7   |
| Method/Function      | ![#DCDCAA](https://fakeimg.pl/35/DCDCAA/?text=+)   | #DCDCAA   |
| Variable             | ![#9CDCFE](https://fakeimg.pl/35/9CDCFE/?text=+)   | #9CDCFE   |
| Flow Keyword         | ![#C586C0](https://fakeimg.pl/35/C586C0/?text=+)   | #C586C0   |
| Logic Keyword        | ![#C586C0](https://fakeimg.pl/35/C586C0/?text=+)   | #C586C0   |
| Import               | ![##C2FF9E](https://fakeimg.pl/35/C2FF9E/?text=+)  | #C2FF9E   |
| String               | ![#F3C785](https://fakeimg.pl/35/F3C785/?text=+)   | #F3C785   |
| Number               | ![#B5CEA8](https://fakeimg.pl/35/B5CEA8/?text=+)   | #B5CEA8   |
| Constant             | ![#10B1FE](https://fakeimg.pl/35/10B1FE/?text=+)   | #10B1FE   |
| Comment              | ![#C9C9C9BC](https://fakeimg.pl/35/C9C9C9/?text=+) | #C9C9C9BC |
| Operator/Punctuation | ![#D4D4D4](https://fakeimg.pl/35/D4D4D4/?text=+)   | #D4D4D4   |
| self/this Keyword    | ![#B6C8C6](https://fakeimg.pl/35/B6C8C6/?text=+)   | #B6C8C6   |

<h2>Customizing Syntax Colors</h2>

You can add or modify a particular syntax color to your preferences by

<ol>
<li>Opening the "Inspect Editor Tokens and Scopes" tools in VSCode and placing your cursor with text you want to change</li>
<li>Copying one of the listed textmate scopes (using the most specific scope will reduce the risk of accidentally recoloring other tokens)</li>
<li>Add a textmate rule to your settings.json file with the following format:

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

It may be the case that two or more distinct code elements have only a single textmate scope which is shared across them. If you wish for their colors to differ you may need to <a href="https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide">manually add your own scope</a>.
