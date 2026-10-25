# Midnight Xenon Theme

Maintains similar syntax highlighting as the default Dark Modern and Dark+ themes while:

- Improving the cross-language consistency of syntax highlighting with semantic highlighting enabled
- Reducing the sharing of colors between distinctly different code elements
- Providing a more minimalistic UI with blue rather than brown undertones

## Theme Example Photos

**Minimal UI:**

![Minimal UI](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/theme_examples/python_minimal.png)

**Full UI:**

![Full UI](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/theme_examples/python_full_ui.png)

## Syntax Highlighting

In order to have consistent cross-language syntax highlighting, it is necessary to declare the language server (LSP)
extension used for each programming language. This is because different LSPs tokenize and assign scope names to text
differently. This theme was created using the most popular LSPs for each language:

- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/python.png" width="19"> Python - [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) or [Pyrefly](https://marketplace.visualstudio.com/items?itemName=meta.pyrefly)
- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/java.png" width="17"> Java - [Language Support for Java](https://marketplace.visualstudio.com/items?itemName=redhat.java)
- <img src="https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/language_logos/scala.png" width="17"> Scala - [Metals](https://marketplace.visualstudio.com/items?itemName=scalameta.metals)

**Other Customized File Types**

- Jupyter Notebooks
- Markdown
- HTML
- CSS
- JSON
- XML
- YAML
- Shell (.sh, .bash)
- .env - [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) by mikestead recommended for full highlighting
- .ini
- .toml
- .log
- .gradle - extension such as [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) needed for full highlighting

### Syntax Color Palette

| Scope                | Color                                                                                        | HEX     |
| -------------------- | -------------------------------------------------------------------------------------------- | ------- |
| Class                | ![#30E5BE](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/30E5BE.png) | #30E5BE |
| Method/Function      | ![#FFFFA8](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/FFFFA8.png) | #FFFFA8 |
| Variable             | ![#88D5FF](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/88D5FF.png) | #88D5FF |
| Primitive/Constant   | ![#AEFF7F](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/AEFF7F.png) | #AEFF7F |
| Library/Module       | ![#8F97FF](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/8F97FF.png) | #8F97FF |
| Flow/Import Keywords | ![#C586C0](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/C586C0.png) | #C586C0 |
| Definition Keywords  | ![#22ADF8](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/22ADF8.png) | #22ADF8 |
| Logic Keywords       | ![#22ADF8](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/22ADF8.png) | #22ADF8 |
| This/Self            | ![#B9CEDA](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/B9CEDA.png) | #B9CEDA |
| Number               | ![#B5CEA8](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/B5CEA8.png) | #B5CEA8 |
| String               | ![#EEBC70](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/EEBC70.png) | #EEBC70 |
| Comment              | ![#60737D](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/60737D.png) | #60737D |
| Operator/Punctuation | ![#D4D4D4](https://d1nheu3uhuz51e.cloudfront.net/dark-xenon-theme/color_swatches/D4D4D4.png) | #D4D4D4 |

### Highlighting Differences to Dark Modern/Dark+

- Imported libraries and modules receive a unique color rather than sharing the same color as classes
- Primitive types have a unique color to differentiate them from wrapper class objects
- Multiple colors are slightly more vibrant
- Comments are much more muted

## To-do

Add consistent highlighting for:

- C
- C++
- JavaScript
- TypeScript
- Go
- Lua

## Credits

`test.md` and `.env` forked from [uloco/syntax-highlighting-samples](https://github.com/uloco/syntax-highlighting-samples) for testing syntax highlighting.
