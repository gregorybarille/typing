import { FINGER_COLORS, FINGER_LABELS, getKeyboard, type Finger, type LayoutId } from "../lib/keyboards.ts"
import { t, type Language } from "../lib/i18n.ts"
import { cn } from "../lib/utils.ts"

interface FingerGuideProps {
  layout: LayoutId
  lang: Language
  className?: string
}

export default function FingerGuide({ layout, lang, className }: FingerGuideProps) {
  const keyboard = getKeyboard(layout)

  // Group keys by finger (deduplicate finger 3/4 and 5/6 into left/right index)
  const fingerKeys = new Map<Finger, string[]>()
  for (const row of keyboard.rows) {
    for (const k of row) {
      if (k.key === "space") continue
      if (!fingerKeys.has(k.finger)) fingerKeys.set(k.finger, [])
      fingerKeys.get(k.finger)!.push(k.key)
    }
  }

  // Display fingers 0-3 (left hand) and 6-9 (right hand), merge 4 into 3 and 5 into 6
  const displayFingers: { finger: Finger; label: string; keys: string[] }[] = []
  for (const f of [0, 1, 2, 3, 6, 7, 8, 9] as Finger[]) {
    const keys = [...(fingerKeys.get(f) ?? [])]
    // Merge stretch keys
    if (f === 3) keys.push(...(fingerKeys.get(4) ?? []))
    if (f === 6) keys.push(...(fingerKeys.get(5) ?? []))
    displayFingers.push({
      finger: f,
      label: t(lang, FINGER_LABELS[f]),
      keys,
    })
  }

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold">{t(lang, "fingerGuide.title")}</h3>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {displayFingers.map(({ finger, label, keys }) => (
          <div
            key={finger}
            className={cn(
              "rounded-md border-2 p-2 text-center",
              FINGER_COLORS[finger],
            )}
          >
            <div className="text-xs font-medium">{label}</div>
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              {keys.map((k) => (
                <kbd
                  key={k}
                  className="rounded border border-foreground/20 bg-background/50 px-1 py-0.5 font-mono text-xs uppercase"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Thumbs — space bar */}
      <div className="rounded-md border border-border bg-muted/30 p-2 text-center text-xs text-muted-foreground">
        {t(lang, "fingerGuide.thumbs")} — Space
      </div>

      <p className="text-xs text-muted-foreground">
        {t(lang, "fingerGuide.homeKeys", {
          left: keyboard.homeLeft.toUpperCase(),
          right: keyboard.homeRight.toUpperCase(),
        })}
      </p>
    </div>
  )
}
