# ANSI

An almost complete TypeScript port of the excellent
[charmbracelet/x/ansi](https://github.com/charmbracelet/x/tree/main/ansi)
library, providing utilities for working with ANSI escape sequences. To have a
complete overview, check out the
[API reference](https://nightgrey.github.io/ansi/).

**Note**: This project does not have complete feature-parity with the original
Go library. See [comparison & differences](#comparison--differences) for more. Additionally, I would probably not recommend using it for production use.

**Installation**

```bash
bun install @nightgrey/ansi
# or
pnpm install @nightgrey/ansi
# or
yarn add @nightgrey/ansi
# or
npm add @nightgrey/ansi
```

# Table of Contents
- [Usage](#usage)
- [NPM](https://www.npmjs.com/package/@nightgrey/ansi)
- [Comparison & Differences](#comparison--differences)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Usage
You can find the complete API reference at
[nightgrey.github.io/ansi](https://nightgrey.github.io/ansi/).

```ts
import {
    Style,
    IndexedColor,
    cursorUp,
    Mode,
    bracketedPasteMode,
    focusEventMode,
    cursorPosition,
    strip,
    Modes,
    stringWidth,
    CSI,
    BEL,
    ESC
} from '@nightgrey/ansi';

const stdout = process.stdout;

// Style text easily!
// Colors can be specified by almost any CSS notation (hex, rgb, rgba, hsl, etc.), ANSI indexes, or vectors.
const red = new Style().foreground(IndexedColor.Red);
const alsoRed = new Style().foreground(1);
const blue = new Style().foreground("rgb(0, 100, 255)");
const grey = new Style().foreground([0.2, 0.2, 0.2]);

// `Style` instances are immutable and chainable
const italic = blue.italic();
stdout.write(italic.render("I'm blue and italic"));

const fancy = red.bold().curlyUnderline().blink().reverse().faint().background(IndexedColor.Blue);
stdout.write(fancy.render("I'm reversed - blue in color and red in background, bold, curly underlined, blinking and faint!"));

// Cursor control
stdout.write(cursorUp(5)) // Move cursor up 5 rows
stdout.write(cursorPosition(10, 10)) // Set absolute cursor position to (10, 10)

// Text processing
stdout.write(strip("\u001B[4mUnicorn\u001B[0m")); // `Unicorn`
stdout.write(stringWidth('\u001B[1m古\u001B[22m')); // 2

// Parsing
const parsed = [...parser(tokenizer(String.raw`\x1b[31mHello\x1b[0m World`))];
// Result:
// [
//   {
//     type: "CSI",
//     pos: 0,
//     raw: "\x1b[31m",
//     command: "m",
//     params: ["31"],
//   },
//   {
//     type: "TEXT",
//     pos: 8,
//     raw: "Hello",
//   },
//   {
//     type: "CSI",
//     pos: 13,
//     raw: "\x1b[0m",
//     command: "m",
//     params: ["0"],
//   },
// ]

// Manage terminal modes
stdout.write(bracketedPasteMode.set) // Set bracketed paste mode, enabling bracketed paste
stdout.write(keyboardActionMode.set) // Set keyboard action mode, locking the keyboard

// .. or request and parse responses
stdout.write(focusEventMode.request) // Request focus event mode
process.stdin.on("data", (data) => {
    const setting = Mode.setting(data.toString());
  if (Mode.isSet(setting)) {
    stdout.write("Event mode is set");
  } else if (Mode.isReset(setting)) {
    stdout.write("Event mode is reset");
  } else if (Mode.isPermanentlySet(setting)) {
    stdout.write("Event mode is permanently set");
  } else if (Mode.isPermanentlyReset(setting)) {
    stdout.write("Event mode is permanently reset");
  } else if (Mode.isNotRecognized(setting)) {
    stdout.write("Event mode is not recognized");
  }
});

// Reference control characters in various representations
stdout.write(`${BEL}`); // "\x07"
stdout.write(BEL.toString()); // "\x07"
stdout.write(BEL.toHex()); // 7 (0x07)
stdout.write(BEL.toLiteral()); // "\\x07"
stdout.write(BEL.toCharacter()); // "G"
stdout.write(BEL.toCaret()); // "^G"

// ... and more :)
```

# Comparison & Differences

**In general**
- For functions that just return strings, we use the exact same implementation
  and return the same string.
- For anything else, we try to match the Go implementation, but how that is
  achieved can sometimes not be identical, just from the language differences.
  For example, Go's runes vs. built-in iterators & Grapheme handling vs `Intl.Segmenter`.
- I took a little bit of liberty in a few places, sometimes to make it more
  JS-idiomatic, but unless it's specifically marked as different, the
  functionality offered should be the same, with maybe a slightly different API.
- We use `pascalCase`, they use `CamelCase`. That said, the naming
  is still a bit iffy, might need some tweaking / changes.
- VT100-related comments are identical.

**Missing features**

- *Graphics* ([x/ansi/graphics.go]
(https://github.com/charmbracelet/x/tree/main/ansi/graphics.go))
- *iTerm2*
  ([x/ansi/iterm2](https://github.com/charmbracelet/x/tree/main/ansi/iterm2))
- *Kitty*
  ([x/ansi/kitty](https://github.com/charmbracelet/x/tree/main/ansi/kitty))
- *Sixel*
  ([x/ansi/sixel](https://github.com/charmbracelet/x/tree/main/ansi/sixel))
- Tests are missing almost completely.

**Feature (un)parity**

Features that are not implemented the same way.

- *String processing*
  ([truncate.go](https://github.com/charmbracelet/x/blob/main/ansi/truncate.go),
  [wrap.go](https://github.com/charmbracelet/x/blob/main/ansi/wrap.go))

  The Go package uses their parser for any string processing. So far, we
  only use it for stripping and computing the width.

- *Parser*
  ([x/ansi/parser](https://github.com/charmbracelet/x/tree/main/ansi/parser.go))

  The parser is fundamentally different, though what it achieves is
  effectively the same. We're using the excellent [@ansi-tools/parser]
  (https://www.npmjs.com/package/@ansi-tools/parser)!

- *Color*
  ([x/ansi/color](https://github.com/charmbracelet/x/tree/main/ansi/color.go))

  x/ansi uses the native Go color type and `github.com/lucasb-eyer/go-colorful`
  to parse and convert colors. We use `@thi.ng/color` under the hood.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

[MIT License](LICENSE)

This project is a TypeScript port of
[charmbracelet/x/ansi](https://github.com/charmbracelet/x/tree/main/ansi). See
[LICENSES.md](./LICENSES.md) for full licensing information.


## Acknowledgments

- [charmbracelet/x/ansi](https://github.com/charmbracelet/x/tree/main/ansi) from
  [charmbracelet](https://github.com/charmbracelet)
- [@thi.ng](https://github.com/thi-ng/umbrella) from [postspectacular](https://github.com/postspectacular)
- [@ansi-tools/parser](https://www.npmjs.com/package/@ansi-tools/parser) from
  [~webpro](https://www.npmjs.com/~webpro)
- [sindresorhus](https://www.npmjs.com/~sindresorhus) for their awesome
  ansi-related packages:
  [ansi-truncate](https://www.npmjs.com/package/ansi-truncate),
  [cli-truncate](https://www.npmjs.com/package/cli-truncate),
  [slice-ansi](https://www.npmjs.com/package/slice-ansi),
  [string-width](https://www.npmjs.com/package/string-width),
  [wcwidth](https://www.npmjs.com/package/wcwidth),
  [wrap-ansi](https://www.npmjs.com/package/wrap-ansi)
