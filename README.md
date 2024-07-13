<h1>Midnight Xenon Theme</h1>

Maintains similar syntax highlighting as the default Dark Modern and Dark+ themes while:

<ul>
<li>Improving the cross-language consistency of syntax highlighting with semantic highlighting enabled</li>
<li>Reducing the sharing of colors between distinctly different code elements</li>
<li>Providing a more minimalistic UI with blue rather than brown undertones</li>
</ul>

<h2>Theme Example Photos</h2>

**Minimal UI:**
<img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/theme_examples/python_minimal.png">

**Full UI:**
<img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/theme_examples/python_full_ui.png">

<h2>Syntax Highlighting</h2>

In order to have consistent cross-language syntax highlighting, it is necessary to declare the language server (LSP) extension used for each programming language. This is because different LSPs tokenize and assign scope names to text differently. This theme was created using the most popular LSPs for each language:

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/python.png" width="19"> Python - <a href="https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance">Pylance</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/java.png" width="17"> Java - <a href="https://marketplace.visualstudio.com/items?itemName=redhat.java">Language Support for Java</a>

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/scala.png" width="17"> Scala - <a href="https://marketplace.visualstudio.com/items?itemName=scalameta.metals">Metals</a>

<!-- - <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/lua.png" width="17"> Lua - <a href="https://marketplace.visualstudio.com/items?itemName=sumneko.lua">Lua Language Server</a> -->

<br>

<u>Other Customized File Types</u>

- Jupyter Notebooks
- Markdown
- HTML
- JSON
- XML
- YAML
- .env - <a href="https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv">DotENV</a> recommended for full highlighting
- .ini
- .toml
- .log
- .gradle - extension such as <a href="https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle">DotENV</a> needed for full highlighting

<h3>Syntax Color Palette</h3>

| Scope                | Color                                              | HEX       |
| -------------------- | -------------------------------------------------- | --------- |
| Class                | ![#30E5BE](https://fakeimg.pl/35/30E5BE/?text=+)   | #30E5BE   |
| Method/Function      | ![#FFFFA8](https://fakeimg.pl/35/FFFFA8/?text=+)   | #FFFFA8   |
| Variable             | ![#88D5FF](https://fakeimg.pl/35/88D5FF/?text=+)   | #88D5FF   |
| Primitive/Constant   | ![#AEFF7F](https://fakeimg.pl/35/AEFF7F/?text=+)   | #AEFF7F   |
| Library/Module       | ![#8F97FF](https://fakeimg.pl/35/8F97FF/?text=+)   | #8F97FF   |
| Flow/Import Keywords | ![#C586C0](https://fakeimg.pl/35/C586C0/?text=+)   | #C586C0   |
| Definition Keywords  | ![#22ADF8](https://fakeimg.pl/35/22ADF8/?text=+)   | #22ADF8   |
| Logic Keywords       | ![#22ADF8](https://fakeimg.pl/35/22ADF8/?text=+)   | #22ADF8   |
| This/Self            | ![#B9CEDA](https://fakeimg.pl/35/B9CEDA/?text=+)   | #B9CEDA   |
| Number               | ![#B5CEA8](https://fakeimg.pl/35/B5CEA8/?text=+)   | #B5CEA8   |
| String               | ![#EEBC70](https://fakeimg.pl/35/EEBC70/?text=+)   | #EEBC70   |
| Comment              | ![#60737D](https://fakeimg.pl/35/60737D/?text=+)   | #60737D   |
| Operator/Punctuation | ![#D4D4D4](https://fakeimg.pl/35/D4D4D4/?text=+)   | #D4D4D4   |

<h3>Highlighting Differences to Dark Modern/Dark+</h3>

- Imported libraries and modules receive a unique color rather than sharing the same color as classes
- Primitive types have a unique color to differentiate them from wrapper class objects
- Multiple colors are slightly more vibrant
- Comments are much more muted

<h2>To-do</h2>

Add consistent highlighting for:

- CSS
- SQL
- C
- C++
- JavaScript
- TypeScript
- Go
- Lua

<h2>Credits</h2>

`test.md` and `.env` forked from <a href="https://github.com/uloco/syntax-highlighting-samples">uloco/syntax-highlighting-samples</a> for testing syntax highlighting.
