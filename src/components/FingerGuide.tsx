import { getFingerForKey, type LayoutId } from "../lib/keyboards.ts"
import { t, type Language } from "../lib/i18n.ts"
import { cn } from "../lib/utils.ts"
import HandsSVG from "./HandsSVG.tsx"

interface FingerGuideProps {
  layout: LayoutId
  lang: Language
  nextExpectedKey?: string
  className?: string
}

export default function FingerGuide({ layout, lang, nextExpectedKey, className }: FingerGuideProps) {
  // Resolve which finger index should be highlighted.
  // 10 is a virtual index meaning "both thumbs" (spacebar).
  const activeFinger =
    nextExpectedKey !== undefined
      ? nextExpectedKey === " "
        ? 10
        : getFingerForKey(layout, nextExpectedKey)
      : undefined

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold">{t(lang, "fingerGuide.title")}</h3>

      <HandsSVG activeFinger={activeFinger} />

      <p className="text-center text-xs text-muted-foreground">
        {t(lang, "fingerGuide.homeKeys", {
          left: "F",
          right: "J",
        })}
      </p>
    </div>
  )
}
