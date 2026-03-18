export type LayoutId = "qwerty" | "azerty" | "qwertz"

// Finger assignments — index 0-9 maps to:
// 0=leftPinky, 1=leftRing, 2=leftMiddle, 3=leftIndex, 4=leftIndex(stretch)
// 5=rightIndex(stretch), 6=rightIndex, 7=rightMiddle, 8=rightRing, 9=rightPinky
export type Finger = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface KeyDef {
  key: string        // label on keycap (lowercase or symbol)
  shift?: string     // shifted character (shown in top half of keycap)
  finger: Finger
  row: number        // 0=number row, 1=top, 2=home, 3=bottom, 4=space
  isHome: boolean    // true for home-row resting keys (F/J equivalents)
  width?: number     // in units (default 1), e.g. Tab=1.5, Backspace=2
  isModifier?: boolean  // true for non-typing keys (Tab, Shift, Enter, etc.)
  // For display labels on modifier keys (secondary label)
  label?: string
}

export interface KeyboardLayout {
  id: LayoutId
  rows: KeyDef[][]
  homeLeft: string   // home key for left index (usually "f")
  homeRight: string  // home key for right index (usually "j")
  shape: "ansi" | "iso"  // ANSI = US shape, ISO = European shape (extra key row 3)
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

// Shorthand constructors
function k(key: string, finger: Finger, row: number, isHome = false, width?: number, shift?: string): KeyDef {
  return { key, finger, row, isHome, width, ...(shift !== undefined ? { shift } : {}) }
}

function mod(key: string, row: number, width?: number, label?: string): KeyDef {
  return { key, finger: 0, row, isHome: false, width, isModifier: true, label }
}

// ── QWERTY (US / ANSI) ───────────────────────────────────────────────────
const qwertyRows: KeyDef[][] = [
  // Row 0 — number row
  [
    k("`", 0, 0, false, undefined, "~"),
    k("1", 0, 0, false, undefined, "!"),
    k("2", 1, 0, false, undefined, "@"),
    k("3", 2, 0, false, undefined, "#"),
    k("4", 3, 0, false, undefined, "$"),
    k("5", 4, 0, false, undefined, "%"),
    k("6", 5, 0, false, undefined, "^"),
    k("7", 6, 0, false, undefined, "&"),
    k("8", 7, 0, false, undefined, "*"),
    k("9", 8, 0, false, undefined, "("),
    k("0", 9, 0, false, undefined, ")"),
    k("-", 9, 0, false, undefined, "_"),
    k("=", 9, 0, false, undefined, "+"),
    mod("⌫", 0, 2, "Backspace"),
  ],
  // Row 1 — top row
  [
    mod("⇥", 1, 1.5, "Tab"),
    k("q", 0, 1), k("w", 1, 1), k("e", 2, 1), k("r", 3, 1), k("t", 4, 1),
    k("y", 5, 1), k("u", 6, 1), k("i", 7, 1), k("o", 8, 1), k("p", 9, 1),
    k("[", 9, 1, false, undefined, "{"),
    k("]", 9, 1, false, undefined, "}"),
    mod("\\", 1, 1.5, "\\|"),
  ],
  // Row 2 — home row
  [
    mod("⇪", 2, 1.75, "Caps"),
    k("a", 0, 2), k("s", 1, 2), k("d", 2, 2), k("f", 3, 2, true), k("g", 4, 2),
    k("h", 5, 2), k("j", 6, 2, true), k("k", 7, 2), k("l", 8, 2),
    k(";", 9, 2, false, undefined, ":"),
    k("'", 9, 2, false, undefined, "\""),
    mod("↵", 2, 2.25, "Enter"),
  ],
  // Row 3 — bottom row (ANSI: no extra key after left shift)
  [
    mod("⇧", 3, 2.25, "Shift"),
    k("z", 0, 3), k("x", 1, 3), k("c", 2, 3), k("v", 3, 3), k("b", 4, 3),
    k("n", 5, 3), k("m", 6, 3),
    k(",", 7, 3, false, undefined, "<"),
    k(".", 8, 3, false, undefined, ">"),
    k("/", 9, 3, false, undefined, "?"),
    mod("⇧", 3, 2.75, "Shift"),
  ],
  // Row 4 — space row
  [
    mod("fn", 4, 1.25),
    mod("⌃", 4, 1.25, "Ctrl"),
    mod("⌥", 4, 1.25, "Alt"),
    mod("⌘", 4, 1.5, "Cmd"),
    k("space", 6, 4, false, 6.5),
    mod("⌘", 4, 1.5, "Cmd"),
    mod("⌥", 4, 1.25, "Alt"),
    mod("◀", 4, 1, "←"),
    mod("▼▲", 4, 1, "↕"),
    mod("▶", 4, 1, "→"),
  ],
]

// ── AZERTY (France / ISO) ────────────────────────────────────────────────
const azertyRows: KeyDef[][] = [
  // Row 0 — number row (AZERTY uses symbols as primary, numbers as shift)
  [
    k("\u00B2", 0, 0),                       // ²  (no shift)
    k("&", 0, 0, false, undefined, "1"),
    k("\u00E9", 1, 0, false, undefined, "2"),  // é / 2
    k("\"", 2, 0, false, undefined, "3"),
    k("'", 3, 0, false, undefined, "4"),
    k("(", 4, 0, false, undefined, "5"),
    k("-", 5, 0, false, undefined, "6"),
    k("\u00E8", 6, 0, false, undefined, "7"),  // è / 7
    k("_", 7, 0, false, undefined, "8"),
    k("\u00E7", 8, 0, false, undefined, "9"),  // ç / 9
    k("\u00E0", 9, 0, false, undefined, "0"),  // à / 0
    k(")", 9, 0, false, undefined, "\u00B0"),  // ) / °
    k("=", 9, 0, false, undefined, "+"),
    mod("⌫", 0, 2, "Backspace"),
  ],
  // Row 1 — top row
  [
    mod("⇥", 1, 1.5, "Tab"),
    k("a", 0, 1), k("z", 1, 1), k("e", 2, 1), k("r", 3, 1), k("t", 4, 1),
    k("y", 5, 1), k("u", 6, 1), k("i", 7, 1), k("o", 8, 1), k("p", 9, 1),
    k("^", 9, 1, false, undefined, "\u00A8"),  // ^ / ¨
    k("$", 9, 1, false, undefined, "\u00A3"),  // $ / £
    mod("↵", 1, 2, "Enter"), // ISO enter starts at row 1
  ],
  // Row 2 — home row
  [
    mod("⇪", 2, 1.75, "Caps"),
    k("q", 0, 2), k("s", 1, 2), k("d", 2, 2), k("f", 3, 2, true), k("g", 4, 2),
    k("h", 5, 2), k("j", 6, 2, true), k("k", 7, 2), k("l", 8, 2), k("m", 9, 2),
    k("\u00F9", 9, 2, false, undefined, "%"),  // ù / %
    k("*", 9, 2, false, undefined, "\u03BC"), // * / µ
    // ISO enter continues (rendered as a visual marker in KeyboardVisual)
  ],
  // Row 3 — bottom row (ISO: extra key < > after left shift)
  [
    mod("⇧", 3, 1.25, "Shift"),
    k("<", 0, 3, false, undefined, ">"), // ISO extra key
    k("w", 0, 3), k("x", 1, 3), k("c", 2, 3), k("v", 3, 3), k("b", 4, 3),
    k("n", 5, 3), k(",", 6, 3, false, undefined, "?"), k(";", 7, 3, false, undefined, "."),
    k(":", 8, 3, false, undefined, "/"), k("!", 9, 3, false, undefined, "\u00A7"), // ! / §
    mod("⇧", 3, 2.75, "Shift"),
  ],
  // Row 4 — space row
  [
    mod("fn", 4, 1.25),
    mod("⌃", 4, 1.25, "Ctrl"),
    mod("⌥", 4, 1.25, "Alt"),
    mod("⌘", 4, 1.5, "Cmd"),
    k("space", 6, 4, false, 6.5),
    mod("⌘", 4, 1.5, "Cmd"),
    mod("⌥", 4, 1.25, "AltGr"),
    mod("◀", 4, 1, "←"),
    mod("▼▲", 4, 1, "↕"),
    mod("▶", 4, 1, "→"),
  ],
]

// ── QWERTZ (Swiss French / ISO) ──────────────────────────────────────────
const qwertzRows: KeyDef[][] = [
  // Row 0 — number row
  [
    k("\u00A7", 0, 0, false, undefined, "\u00B0"), // § / °
    k("1", 0, 0, false, undefined, "+"),
    k("2", 1, 0, false, undefined, "\""),
    k("3", 2, 0, false, undefined, "*"),
    k("4", 3, 0, false, undefined, "\u00E7"),  // 4 / ç
    k("5", 4, 0, false, undefined, "%"),
    k("6", 5, 0, false, undefined, "&"),
    k("7", 6, 0, false, undefined, "/"),
    k("8", 7, 0, false, undefined, "("),
    k("9", 8, 0, false, undefined, ")"),
    k("0", 9, 0, false, undefined, "="),
    k("'", 9, 0, false, undefined, "?"),
    k("^", 9, 0, false, undefined, "`"),
    mod("⌫", 0, 2, "Backspace"),
  ],
  // Row 1 — top row
  [
    mod("⇥", 1, 1.5, "Tab"),
    k("q", 0, 1), k("w", 1, 1), k("e", 2, 1), k("r", 3, 1), k("t", 4, 1),
    k("z", 5, 1), k("u", 6, 1), k("i", 7, 1), k("o", 8, 1), k("p", 9, 1),
    k("\u00E8", 9, 1, false, undefined, "\u00FC"),  // è / ü
    k("\u00A8", 9, 1, false, undefined, "!"),        // ¨ / !
    mod("↵", 1, 2, "Enter"), // ISO
  ],
  // Row 2 — home row
  [
    mod("⇪", 2, 1.75, "Caps"),
    k("a", 0, 2), k("s", 1, 2), k("d", 2, 2), k("f", 3, 2, true), k("g", 4, 2),
    k("h", 5, 2), k("j", 6, 2, true), k("k", 7, 2), k("l", 8, 2),
    k("\u00E9", 9, 2, false, undefined, "\u00F6"),  // é / ö
    k("\u00E0", 9, 2, false, undefined, "\u00E4"),  // à / ä
    k("$", 9, 2, false, undefined, "\u00A3"),        // $ / £
  ],
  // Row 3 — bottom row (ISO: extra key < > after left shift)
  [
    mod("⇧", 3, 1.25, "Shift"),
    k("<", 0, 3, false, undefined, ">"), // ISO extra key
    k("y", 0, 3), k("x", 1, 3), k("c", 2, 3), k("v", 3, 3), k("b", 4, 3),
    k("n", 5, 3), k("m", 6, 3),
    k(",", 7, 3, false, undefined, ";"),
    k(".", 8, 3, false, undefined, ":"),
    k("-", 9, 3, false, undefined, "_"),
    mod("⇧", 3, 2.75, "Shift"),
  ],
  // Row 4 — space row
  [
    mod("fn", 4, 1.25),
    mod("⌃", 4, 1.25, "Ctrl"),
    mod("⌥", 4, 1.25, "Alt"),
    mod("⌘", 4, 1.5, "Cmd"),
    k("space", 6, 4, false, 6.5),
    mod("⌘", 4, 1.5, "Cmd"),
    mod("⌥", 4, 1.25, "AltGr"),
    mod("◀", 4, 1, "←"),
    mod("▼▲", 4, 1, "↕"),
    mod("▶", 4, 1, "→"),
  ],
]

export const KEYBOARDS: Record<LayoutId, KeyboardLayout> = {
  qwerty: { id: "qwerty", rows: qwertyRows, homeLeft: "f", homeRight: "j", shape: "ansi" },
  azerty: { id: "azerty", rows: azertyRows, homeLeft: "f", homeRight: "j", shape: "iso" },
  qwertz: { id: "qwertz", rows: qwertzRows, homeLeft: "f", homeRight: "j", shape: "iso" },
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
  // Skip modifier keys — only match typing keys
  const k = getAllKeys(layout).find(
    (kd) => !kd.isModifier && kd.key === key.toLowerCase(),
  )
  return k?.finger
}
