// TDD-lite test for the 3 AM Excuse entry (make.fun, program/v1).
// Checks, before main.ts exists: entrypoint present, gate (1-200 chars,
// non-whitespace UTF-8), determinism (two runs, identical bytes),
// stdlib-only imports. Run: node test-entry.mjs
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const entryDir = dirname(fileURLToPath(import.meta.url));
const mainTs = join(entryDir, "main.ts");
let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
};

check("main.ts exists", existsSync(mainTs));

if (existsSync(mainTs)) {
  const src = readFileSync(mainTs, "utf8");
  const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
  const nonStd = imports.filter((i) => !i.startsWith("node:"));
  check("stdlib-only imports", nonStd.length === 0, `imports: ${imports.join(", ") || "(none)"}`);

  const run = () => {
    const out = mkdtempSync(join(tmpdir(), "excuse-out-"));
    const r = spawnSync(process.execPath, [mainTs], {
      env: { ...process.env, MAKEFUN_OUTPUT_DIR: out },
      encoding: "utf8",
    });
    const file = join(out, "entry.txt");
    const text = existsSync(file) ? readFileSync(file, "utf8") : null;
    rmSync(out, { recursive: true, force: true });
    return { status: r.status, stderr: r.stderr, text };
  };

  const a = run();
  const b = run();
  check("main.ts exits 0", a.status === 0, a.stderr.trim());
  check("entry.txt written", a.text !== null);
  if (a.text !== null) {
    const len = [...a.text].length;
    check("entry 1-200 chars", len >= 1 && len <= 200, `${len} chars`);
    check("entry not only whitespace", a.text.trim().length > 0);
    check("entry is a single line", !a.text.includes("\n"));
    console.log(`ENTRY (${len} chars): ${a.text}`);
  }
  check("deterministic across runs", a.text !== null && a.text === b.text);
}

process.exit(failures ? 1 : 0);
