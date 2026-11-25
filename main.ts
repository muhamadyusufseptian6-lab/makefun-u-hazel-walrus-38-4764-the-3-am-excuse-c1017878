// The 3 AM Excuse — make.fun entry (program/v1, Node 22, stdlib-only).
// Writes one line, in the voice of a hardware wallet refusing to sign
// a transaction at 3 AM, to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Repo dir resolved from this script's location, never from process.cwd().
const repoDir = dirname(fileURLToPath(import.meta.url));
void repoDir;

// The entry: invented from the judge brief. A grumpy vault with a
// bedtime — keys off duty since midnight, screen dreaming in seed
// phrases, and a sleepwalking thumb it won't let spend the rent.
// No battery, firmware or cold-storage clichés: the 3 AM hour itself
// is the joke.
const ENTRY =
  "It's 3 AM — my keys clocked out at midnight, my screen's dreaming in seed phrases, and no sleepwalking thumb spends your rent tonight.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
