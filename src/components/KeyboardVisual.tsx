import { getKeyboard, FINGER_COLORS, type LayoutId, type KeyDef } from "../lib/keyboards.ts"
import { cn } from "../lib/utils.ts"

interface KeyboardVisualProps {
  layout: LayoutId
  activeKey?: string
  className?: string
}

function KeyCap({ keyDef, isActive }: { keyDef: KeyDef; isActive: boolean }) {
  const colors = FINGER_COLORS[keyDef.finger]
  const widthClass = keyDef.width
    ? keyDef.width >= 6
      ? "flex-[6]"
      : keyDef.width >= 2
        ? "flex-[2]"
        : "flex-[1.5]"
    : "flex-1"

  const label = keyDef.key === "space" ? "" : keyDef.key

  return (
    <div
      className={cn(
        "relative flex h-10 items-center justify-center rounded-md border-2 text-sm font-mono transition-all select-none",
        widthClass,
        colors,
        isActive && "ring-2 ring-primary scale-95 brightness-90",
        keyDef.isHome && "font-bold",
      )}
    >
      <span className="uppercase">{label}</span>
      {keyDef.isHome && (
        <span className="absolute bottom-0.5 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded bg-foreground/60" />
      )}
    </div>
  )
}

export default function KeyboardVisual({ layout, activeKey, className }: KeyboardVisualProps) {
  const keyboard = getKeyboard(layout)

  return (
    <div className={cn("space-y-1", className)}>
      {keyboard.rows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((keyDef, ki) => {
            const isActive = activeKey
              ? keyDef.key === activeKey.toLowerCase() ||
                (activeKey === " " && keyDef.key === "space")
              : false
            return <KeyCap key={ki} keyDef={keyDef} isActive={isActive} />
          })}
        </div>
      ))}
    </div>
  )
}
