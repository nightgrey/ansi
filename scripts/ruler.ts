import { stringWidth } from "../src/unicode";

const RULER = "123456789\n";
const ABC = "abcdefg\n\n";

console.log("1) TEXT-DEFAULT EMOJI");
console.log(RULER + "⛹" + ABC);
console.log("Measured: " + stringWidth("⛹"));
console.log();

console.log("1B) TEXT-DEFAULT EMOJI + VS16");
console.log(RULER + "⛹️" + ABC);
console.log("Measured: " + stringWidth("⛹️"));

console.log("1C) BASE EMOJI CHARACTER + MODIFIER");
console.log(RULER + "🏃🏽" + ABC);
console.log("Measured: " + stringWidth("🏃🏽"));
console.log();

console.log("1D) MODIFIER IN ISOLATION");
console.log(RULER + "Z🏽" + ABC);
console.log("Measured: " + stringWidth("Z🏽"));
console.log();

console.log("2) RGI EMOJI SEQ");
console.log(RULER + "🏃🏼‍♀‍➡" + ABC);
console.log("Measured: " + stringWidth("🏃🏼‍♀‍➡"));
console.log();

console.log("2B) RGI EMOJI SEQ (TEXT-DEFAULT FIRST)");
console.log(RULER + "⛹️‍♂️" + ABC);
console.log("Measured: " + stringWidth("⛹️‍♂️"));
console.log();

console.log("2C) RGI EMOJI SEQ (TEXT-DEFAULT FIRST + UQE)");
console.log(RULER + "⛹️" + ABC);
console.log("Measured: " + stringWidth("⛹️"));
console.log();

console.log("3) NON-RGI VALID EMOJI");
console.log(RULER + "🤠‍🤢" + ABC);
console.log("Measured: " + stringWidth("🤠‍🤢"));
console.log();

console.log("4) NOT WELL-FORMED EMOJI SEQ");
console.log(RULER + "🚄🏾‍🔆" + ABC);
console.log("Measured: " + stringWidth("🚄🏾‍🔆"));
console.log();
