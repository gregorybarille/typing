import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadState, saveState } from "../lib/storage.ts"
import { t } from "../lib/i18n.ts"
import { type LayoutId } from "../lib/keyboards.ts"
import { type Language } from "../lib/i18n.ts"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card.tsx"

export default function Onboarding() {
  const navigate = useNavigate()
  const [state] = useState(() => loadState())
  const [name, setName] = useState("")
  const [layout, setLayout] = useState<LayoutId>(state.user.layout)
  const [language, setLanguage] = useState<Language>(state.user.language)
  const [step, setStep] = useState<"name" | "done">("name")

  // Use the potentially updated language for translations
  const activeLang = language

  function handleSubmit() {
    if (!name.trim()) return
    const s = loadState()
    s.user.name = name.trim()
    s.user.layout = layout
    s.user.language = language
    s.user.onboardingComplete = true
    saveState(s)
    setStep("done")
  }

  if (step === "done") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">
              {t(activeLang, "onboarding.welcomeUser", { name })}
            </CardTitle>
            <CardDescription>{t(activeLang, "onboarding.allSet")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full" onClick={() => navigate("/lessons")}>
              {t(activeLang, "onboarding.startLearning")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-3xl">&#9000;</span>
          </div>
          <CardTitle className="text-2xl">{t(activeLang, "onboarding.welcome")}</CardTitle>
          <CardDescription>
            {t(activeLang, "onboarding.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="name">
              {t(activeLang, "onboarding.nameLabel")}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t(activeLang, "onboarding.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="onb-language">
              {t(activeLang, "settings.language")}
            </label>
            <select
              id="onb-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="en">{t(activeLang, "lang.en")}</option>
              <option value="fr">{t(activeLang, "lang.fr")}</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground" htmlFor="onb-layout">
              {t(activeLang, "settings.keyboardLayout")}
            </label>
            <select
              id="onb-layout"
              value={layout}
              onChange={(e) => setLayout(e.target.value as LayoutId)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="qwerty">{t(activeLang, "layout.qwerty")}</option>
              <option value="azerty">{t(activeLang, "layout.azerty")}</option>
              <option value="qwertz">{t(activeLang, "layout.qwertz")}</option>
            </select>
          </div>

          <Button size="lg" className="w-full" disabled={!name.trim()} onClick={handleSubmit}>
            {t(activeLang, "onboarding.getStarted")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
