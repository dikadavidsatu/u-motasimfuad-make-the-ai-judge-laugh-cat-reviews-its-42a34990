// Make the AI Judge Laugh: Cat Reviews Its Human
// make.fun entry — writes a single original one-star cat review to
// /output/entry.txt.
//
// The review: the cat grants its human one star and explains the
// household's real chain of command — the cat decides when the door
// opens, when the food appears, and when the human sleeps; the human
// merely pays the rent. The sting lands in the last words, the
// human reduced to a landlord. The voice is deadpan feline: the
// human is measured against cat standards and found to be staff.
// One line, 134 characters, every word earning its place.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const REVIEW =
  "One star. He calls it \"his house\", but I decide when the door opens, when the food appears, and when he sleeps. He just pays the rent.";

export const MAX_CHARS = 200;
export const OUTPUT_PATH = "/output/entry.txt";

/** The competition gate: 1-200 characters of UTF-8 text, not only whitespace. */
export function isValidEntry(text: string): boolean {
  if (typeof text !== "string") return false;
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  return true;
}

function main(): void {
  if (!isValidEntry(REVIEW)) {
    throw new Error(
      `Review fails the gate: ${[...REVIEW].length} chars (limit ${MAX_CHARS})`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, REVIEW, "utf8");
  // Read it back and re-check the gate on exactly what was written,
  // so a partial write or encoding slip fails loudly instead of
  // silently shipping an invalid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== REVIEW || !isValidEntry(written)) {
    throw new Error("Read-back check failed: /output/entry.txt is not the review");
  }
  console.log(`Wrote ${[...REVIEW].length} chars to ${OUTPUT_PATH}`);
  console.log(REVIEW);
}

main();
