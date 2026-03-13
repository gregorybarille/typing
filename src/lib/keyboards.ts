export type LayoutId = "qwerty" | "azerty" | "qwertz"

// Finger assignments — index 0-9 maps to:
// 0=leftPinky, 1=leftRing, 2=leftMiddle, 3=leftIndex, 4=leftIndex(stretch)
// 5=rightIndex(stretch), 6=rightIndex, 7=rightMiddle, 8=rightRing, 9=rightPinky
export type Finger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface KeyDef {
  key: string        // label on keycap (lowercase or symbol)
  finger: Finger
  row: number        // 0=number row, 1=top, 2=home, 3=bottom, 4=space
  isHome: boolean    // true for home-row resting keys (F/J equivalents)
  width?: number     // in units (default 1), e.g. Tab=1.5, Backspace=2
}

export interface KeyboardLayout {
  id: LayoutId
  rows: KeyDef[][]
  homeLeft: string   // home key for left index (usually "f")
  homeRight: string  // home key for right index (usually "j")
}

// Colors per finger (Tailwind classes)
export const FINGER_COLORS: Record<Finger, string> = {
  0: "bg-rose-200 border-rose-400",        // left pinky
  1: "bg-orange-200 border-orange-400",     // left ring
  2: "bg-emerald-200 border-emerald-400",   // left middle
  3: "bg-sky-200 border-sky-400",           // left index
  4: "bg-sky-100 border-sky-300",           // left index stretch
  5: "bg-violet-100 border-violet-300",     // right index stretch
  6: "bg-violet-200 border-violet-400",     // right index
  7: "bg-emerald-200 border-emerald-400",   // right middle
  8: "bg-orange-200 border-orange-400",     // right ring
  9: "bg-rose-200 border-rose-400",         // right pinky
}

export const FINGER_LABELS = [
  "fingerGuide.leftPinky",
  "fingerGuide.leftRing",
  "fingerGuide.leftMiddle",
  "fingerGuide.leftIndex",
  "fingerGuide.leftIndex",
  "fingerGuide.rightIndex",
  "fingerGuide.rightIndex",
  "fingerGuide.rightMiddle",
  "fingerGuide.rightRing",
  "fingerGuide.rightPinky",
] as const

function k(key: string, finger: Finger, row: number, isHome = false, width?: number): KeyDef {
  return { key, finger, row, isHome, width }
}

// ── QWERTY (US) ──────────────────────────────────────────────────────────
const qwertyRows: KeyDef[][] = [
  // Number row
  [
    k("`", 0, 0), k("1", 0, 0), k("2", 1, 0), k("3", 2, 0), k("4", 3, 0), k("5", 4, 0),
    k("6", 5, 0), k("7", 6, 0), k("8", 7, 0), k("9", 8, 0), k("0", 9, 0),
    k("-", 9, 0), k("=", 9, 0),
  ],
  // Top row
  [
    k("q", 0, 1), k("w", 1, 1), k("e", 2, 1), k("r", 3, 1), k("t", 4, 1),
    k("y", 5, 1), k("u", 6, 1), k("i", 7, 1), k("o", 8, 1), k("p", 9, 1),
    k("[", 9, 1), k("]", 9, 1),
  ],
  // Home row
  [
    k("a", 0, 2), k("s", 1, 2), k("d", 2, 2), k("f", 3, 2, true), k("g", 4, 2),
    k("h", 5, 2), k("j", 6, 2, true), k("k", 7, 2), k("l", 8, 2), k(";", 9, 2),
    k("'", 9, 2),
  ],
  // Bottom row
  [
    k("z", 0, 3), k("x", 1, 3), k("c", 2, 3), k("v", 3, 3), k("b", 4, 3),
    k("n", 5, 3), k("m", 6, 3), k(",", 7, 3), k(".", 8, 3), k("/", 9, 3),
  ],
  // Space
  [k("space", 6, 4, false, 6)],
]

// ── AZERTY (France) ──────────────────────────────────────────────────────
const azertyRows: KeyDef[][] = [
  // Number row (with special chars as main label, simplified)
  [
    k("\u00B2", 0, 0), k("&", 0, 0), k("\u00E9", 1, 0), k("\"", 2, 0), k("'", 3, 0), k("(", 4, 0),
    k("-", 5, 0), k("\u00E8", 6, 0), k("_", 7, 0), k("\u00E7", 8, 0), k("\u00E0", 9, 0),
    k(")", 9, 0), k("=", 9, 0),
  ],
  // Top row
  [
    k("a", 0, 1), k("z", 1, 1), k("e", 2, 1), k("r", 3, 1), k("t", 4, 1),
    k("y", 5, 1), k("u", 6, 1), k("i", 7, 1), k("o", 8, 1), k("p", 9, 1),
    k("^", 9, 1), k("$", 9, 1),
  ],
  // Home row
  [
    k("q", 0, 2), k("s", 1, 2), k("d", 2, 2), k("f", 3, 2, true), k("g", 4, 2),
    k("h", 5, 2), k("j", 6, 2, true), k("k", 7, 2), k("l", 8, 2), k("m", 9, 2),
    k("\u00F9", 9, 2),
  ],
  // Bottom row
  [
    k("w", 0, 3), k("x", 1, 3), k("c", 2, 3), k("v", 3, 3), k("b", 4, 3),
    k("n", 5, 3), k(",", 6, 3), k(";", 7, 3), k(":", 8, 3), k("!", 9, 3),
  ],
  // Space
  [k("space", 6, 4, false, 6)],
]

// ── QWERTZ (Swiss French) ───────────────────────────────────────────────
const qwertzRows: KeyDef[][] = [
  // Number row
  [
    k("\u00A7", 0, 0), k("1", 0, 0), k("2", 1, 0), k("3", 2, 0), k("4", 3, 0), k("5", 4, 0),
    k("6", 5, 0), k("7", 6, 0), k("8", 7, 0), k("9", 8, 0), k("0", 9, 0),
    k("'", 9, 0), k("^", 9, 0),
  ],
  // Top row
  [
    k("q", 0, 1), k("w", 1, 1), k("e", 2, 1), k("r", 3, 1), k("t", 4, 1),
    k("z", 5, 1), k("u", 6, 1), k("i", 7, 1), k("o", 8, 1), k("p", 9, 1),
    k("\u00E8", 9, 1), k("\u00A8", 9, 1),
  ],
  // Home row
  [
    k("a", 0, 2), k("s", 1, 2), k("d", 2, 2), k("f", 3, 2, true), k("g", 4, 2),
    k("h", 5, 2), k("j", 6, 2, true), k("k", 7, 2), k("l", 8, 2), k("\u00E9", 9, 2),
    k("\u00E0", 9, 2),
  ],
  // Bottom row
  [
    k("y", 0, 3), k("x", 1, 3), k("c", 2, 3), k("v", 3, 3), k("b", 4, 3),
    k("n", 5, 3), k("m", 6, 3), k(",", 7, 3), k(".", 8, 3), k("-", 9, 3),
  ],
  // Space
  [k("space", 6, 4, false, 6)],
]

export const KEYBOARDS: Record<LayoutId, KeyboardLayout> = {
  qwerty: { id: "qwerty", rows: qwertyRows, homeLeft: "f", homeRight: "j" },
  azerty: { id: "azerty", rows: azertyRows, homeLeft: "f", homeRight: "j" },
  qwertz: { id: "qwertz", rows: qwertzRows, homeLeft: "f", homeRight: "j" },
}

export function getKeyboard(layout: LayoutId): KeyboardLayout {
  return KEYBOARDS[layout]
}

/** Get all keys in a layout as a flat array */
export function getAllKeys(layout: LayoutId): KeyDef[] {
  return KEYBOARDS[layout].rows.flat()
}

/** Lookup a finger assignment for a specific key label in a layout */
export function getFingerForKey(layout: LayoutId, key: string): Finger | undefined {
  const k = getAllKeys(layout).find((kd) => kd.key === key.toLowerCase())
  return k?.finger
}
