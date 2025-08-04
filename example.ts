import {
  BEL,
  BracketedPasteMode,
  cursorPosition,
  cursorUp,
  FocusEventMode,
  IndexedColor,
  KeyboardActionMode,
  Mode,
  parser,
  Style,
  stringWidth,
  strip,
  tokenizer,
} from "./src";

const stdout = process.stdout;

// Style text easily!
// Colors can be specified by almost any CSS notation (hex, rgb, rgba, hsl, etc.), ANSI indexes, or vectors.
const red = new Style().foreground(IndexedColor.Red);
const _alsoRed = new Style().foreground(1);
const blue = new Style().foreground("rgb(0, 100, 255)");
const _grey = new Style().foreground([0.2, 0.2, 0.2]);

// `Style` instances are immutable and chainable
const italic = blue.italic();
stdout.write(italic.render("I'm blue and italic"));

const fancy = red
  .bold()
  .curlyUnderline()
  .blink()
  .reverse()
  .faint()
  .background(IndexedColor.Blue);
stdout.write(
  fancy.render(
    "I'm reversed - blue in color and red in background, bold, curly underlined, blinking and faint!",
  ),
);

// Cursor control
stdout.write(cursorUp(5)); // Move cursor up 5 rows
stdout.write(cursorPosition(10, 10)); // Set absolute cursor position to (10, 10)

// Text processing
stdout.write(strip("\u001B[4mUnicorn\u001B[0m")); // `Unicorn`
stdout.write(stringWidth("\u001B[1m古\u001B[22m").toString()); // 2

// Parsing
const result = [...parser(tokenizer(String.raw`\x1b[31mHello\x1b[0m World`))];
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
stdout.write(BracketedPasteMode.set); // Set bracketed paste mode, enabling bracketed paste
stdout.write(KeyboardActionMode.set); // Set keyboard action mode, locking the keyboard

// .. or request and parse responses
stdout.write(FocusEventMode.request); // Request focus event mode
process.stdin.on("data", (data) => {
  const setting = Mode.parseReport(data.toString());
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
stdout.write(Buffer.from([BEL.toHex()])); // 7 (0x07)
stdout.write(BEL.toLiteral()); // "\\x07"
stdout.write(BEL.toCharacter()); // "G"
stdout.write(BEL.toCaret()); // "^G"

// ... and more :)
