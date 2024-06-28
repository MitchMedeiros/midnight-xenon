<h1>Midnight Xenon Theme</h1>

This theme aims to maintain similar syntax highlighting and ease of code readability as the default Dark Modern and Dark+ themes while:

<ul>
<li>Improving the cross-language consistency of syntax highlighting with semantic highlighting enabled</li>
<li>Reducing the sharing of colors between distinctly different code elements</li>
<li>Providing a more minimalistic UI with blue rather than brown undertones</li>
</ul>

<h2>Theme Example Photos</h2>

VSCode looks best when UI elements are hidden and keyboard shortcuts are used to navigate instead!

<img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/theme_examples/python.png">

With the full UI visible:

<h2>Syntax Highlighting</h2>

The default themes have several cross-language syntax highlighting inconsistencies both with semantic highlighting enabled and disabled.
In order to solve this, it is necessary to declare the language server (LSP) extension used for each programming language. This is because different LSPs tokenize and assign scope names to text differently. This theme defines its highlighting using the most popular LSPs for each language:

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/python.png" width="19"> Python - <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance">Pylance</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/java.png" width="17"> Java - <a href="https://marketplace.visualstudio.com/items?itemName=redhat.java">Language Support for Java</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/scala.png" width="17"> Scala - <a href="https://marketplace.visualstudio.com/items?itemName=scalameta.metals">Metals</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/lua.png" width="17"> Lua - <a href="https://marketplace.visualstudio.com/items?itemName=sumneko.lua">Lua Language Server</a>

File Types:

- JSON
- XML
- YAML
- .env - <a href="https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv">DotENV</a> recommended for full highlighting
- Markdown
- HTML
- CSS

<h3>Color Palette</h3>

| Scope                | Color                                              | HEX       |
| -------------------- | -------------------------------------------------- | --------- |
| Class                | ![#2EDCB7](https://fakeimg.pl/35/2EDCB7/?text=+)   | #2EDCB7   |
| Method/Function      | ![#FFFFA8](https://fakeimg.pl/35/FFFFA8/?text=+)   | #FFFFA8   |
| Variable             | ![#88D5FF](https://fakeimg.pl/35/88D5FF/?text=+)   | #88D5FF   |
| Primitive/Constant   | ![#AEFF7F](https://fakeimg.pl/35/AEFF7F/?text=+)   | #AEFF7F   |
| Library/Module       | ![#8F97FF](https://fakeimg.pl/35/8F97FF/?text=+)   | #8F97FF   |
| Flow/Import Keywords | ![#C586C0](https://fakeimg.pl/35/C586C0/?text=+)   | #C586C0   |
| Definition Keywords  | ![#22ADF8](https://fakeimg.pl/35/22ADF8/?text=+)   | #22ADF8   |
| Logic Keywords       | ![#22ADF8](https://fakeimg.pl/35/22ADF8/?text=+)   | #22ADF8   |
| This/Self            | ![#B9CEDA](https://fakeimg.pl/35/B9CEDA/?text=+)   | #B9CEDA   |
| Number               | ![#B5CEA8](https://fakeimg.pl/35/B5CEA8/?text=+)   | #B5CEA8   |
| String               | ![#F3C785](https://fakeimg.pl/35/F3C785/?text=+)   | #F3C785   |
| Comment              | ![#C9C9C9BC](https://fakeimg.pl/35/C9C9C9/?text=+) | #C9C9C9BC |
| Operator/Punctuation | ![#D4D4D4](https://fakeimg.pl/35/D4D4D4/?text=+)   | #D4D4D4   |

<h3>
    Differences in Colors vs Dark Modern/Dark+
</h3>

- Imported libraries and modules receive a unique color rather than sharing the same color as classes
- Primitive types have a unique color to differentiate them from wrapper class objects
- Multiple colors are slightly more vibrant
- Comments are much more muted

<h2>To-do</h2>

Add fully consistent highlighting for:

- html, css
- SQL
- C
- C++
- Go
- JavaScript
- TypeScript
