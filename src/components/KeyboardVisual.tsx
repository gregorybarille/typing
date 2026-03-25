import { getKeyboard, FINGER_COLORS, type LayoutId, type KeyDef } from "../lib/keyboards.ts"
import { cn } from "../lib/utils.ts"

interface KeyboardVisualProps {
  layout: LayoutId
  activeKey?: string
  className?: string
}

// No extra padding needed — the stagger is already encoded in the left-side modifier
// key widths (Tab=1.5, Caps=1.75, Shift=2.25 for ANSI / 1.25+isoKey for ISO).
// Adding a separate paddingLeft would double-shift the left side.

function KeyCap({ keyDef, isActive }: { keyDef: KeyDef; isActive: boolean }) {
  const isModifier = keyDef.isModifier ?? false
  const colors = FINGER_COLORS[keyDef.finger]

  // Width mapping: convert numeric units to flex values
  const widthStyle: React.CSSProperties = keyDef.width
    ? { flex: `${keyDef.width} 0 0` }
    : { flex: "1 0 0" }

  // ISO Enter bottom continuation — render as a blank keycap (occupies space, no label)
  if (keyDef.enterCont) {
    return (
      <div
        className={cn("relative min-w-0 rounded-sm border h-10 select-none", colors)}
        style={widthStyle}
        title="Enter"
      />
    )
  }

  const hasDual = !isModifier && keyDef.shift !== undefined && keyDef.key !== "space"

  // The displayed label for modifier / space keys
  let label: string
  if (keyDef.key === "space") {
    label = ""
  } else if (isModifier && keyDef.label) {
    label = keyDef.label
  } else {
    label = keyDef.key
  }

  return (
    <div
      className={cn(
        "relative flex min-w-0 rounded-sm border px-1 font-mono transition-all select-none overflow-hidden",
        hasDual ? "h-10 flex-col items-center justify-between py-0.5" : "h-10 items-center justify-center",
        colors,
        isActive && "ring-2 ring-primary scale-95 brightness-90",
        keyDef.isHome && !isModifier && "font-bold",
        isModifier ? "text-[10px]" : "text-xs",
      )}
      style={widthStyle}
      title={isModifier ? keyDef.label : keyDef.key}
    >
      {hasDual ? (
        <>
          {/* Shifted character — top, slightly muted */}
          <span className="leading-none text-[9px] opacity-70">{keyDef.shift}</span>
          {/* Primary character — bottom */}
          <span className="leading-none uppercase">{keyDef.key}</span>
        </>
      ) : (
        <span className={cn("truncate", !isModifier && "uppercase")}>{label}</span>
      )}
      {keyDef.isHome && !isModifier && (
        <span className="absolute bottom-0.5 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded bg-foreground/60" />
      )}
    </div>
  )
}

export default function KeyboardVisual({ layout, activeKey, className }: KeyboardVisualProps) {
  const keyboard = getKeyboard(layout)

  return (
    <div className={cn("space-y-1 rounded-xl border border-border bg-muted/20 p-3", className)}>
      {keyboard.rows.map((row, ri) => (
        <div
          key={ri}
          className="flex gap-0"
        >
          {row.map((keyDef, ki) => {
            const isActive = activeKey
              ? (!keyDef.isModifier && keyDef.key === activeKey.toLowerCase()) ||
                (activeKey === " " && keyDef.key === "space")
              : false
            return <KeyCap key={ki} keyDef={keyDef} isActive={isActive} />
          })}
        </div>
      ))}
    </div>
  )
}
