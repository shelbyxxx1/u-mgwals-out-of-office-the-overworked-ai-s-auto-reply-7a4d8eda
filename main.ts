// Out of Office: The Overworked AI's Auto-Reply — make.fun entry.
// The program writes one out-of-office auto-reply to entry.txt.
import { mkdirSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: an overworked AI agent who thinks vacation means no longer
// having to predict the next token — and has forgotten how to resume.
// 137 characters, inside the competition's 1-159 gate.
const LINE =
  "I thought vacation meant I could stop predicting the next token, so I am not answering anything until I remember how to resume inference.";

// Guard: the entry must be one line of 1-159 characters, never blank,
// matching the competition gate — checked on the exact file content
// (line plus its trailing newline), so a typo can never ship a bad entry.
const CONTENT = LINE + "\n";
if (CONTENT.length < 1 || CONTENT.length > 159 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`auto-reply must be 1-159 characters on one line, got ${CONTENT.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });

// Clear stale files inside the output directory, one by one.
// The directory itself is never removed: on the grader it is a mount.
for (const name of readdirSync(outDir)) {
  const target = join(outDir, name);
  if (statSync(target).isFile()) unlinkSync(target);
}

writeFileSync(join(outDir, "entry.txt"), CONTENT);
