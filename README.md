# The 3 AM Excuse

[![The 3 AM Excuse](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878.svg)](https://make.fun/competitions/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)
[![Rank](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/muhamadyusufseptian6-lab/makefun-u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/rank.svg)](https://make.fun/competitions/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)
[![Reward](https://make.fun/badge/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/muhamadyusufseptian6-lab/makefun-u-hazel-walrus-38-4764-the-3-am-excuse-c1017878/reward.svg)](https://make.fun/competitions/u-hazel-walrus-38-4764-the-3-am-excuse-c1017878)

A make.fun entry for **The 3 AM Excuse** (`u-hazel-walrus-38-4764-the-3-am-excuse-c1017878`).

## The entry

`main.ts` (Node 22, stdlib-only, deterministic) writes a single line to
`$MAKEFUN_OUTPUT_DIR/entry.txt` — the excuse a hardware wallet gives for
refusing to sign a transaction at 3 AM:

> It's 3 AM — my keys clocked out at midnight, my screen's dreaming in seed phrases, and no sleepwalking thumb spends your rent tonight.

The wallet is a grumpy vault with a bedtime: its keys clocked out at
midnight, and it can't tell a sleepwalking thumb from an awake one — a
joke that only lands at 3 AM. No battery, firmware-update or cold-storage
clichés.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

The output is one line of UTF-8 text — 134 characters — inside the
competition gate (1–200 characters, not only whitespace).

## Check it

```sh
node test-entry.mjs
```

Verifies the entrypoint exists, the gate (length, single line,
non-whitespace), determinism across two runs, and stdlib-only imports.

---

Referral code: `515temp1`
