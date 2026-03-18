import { useState } from "react"
import { loadState, saveState, type AppState } from "../lib/storage.ts"
import { type LayoutId } from "../lib/keyboards.ts"
import { type Language, t } from "../lib/i18n.ts"
import { ACCENT_COLORS, applyTheme } from "../lib/theme.ts"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.tsx"
import Header from "../components/Header.tsx"

export default function Settings() {
  const [state, setState] = useState<AppState>(() => loadState())
  const [saved, setSaved] = useState(false)
  const lang = state.user.language

  function update<K extends keyof typeof state.user>(key: K, value: typeof state.user[K]) {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, [key]: value },
    }))
    setSaved(false)
  }

  function handleSave() {
    saveState(state)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const { user } = state

  return (
    <div className="min-h-screen bg-background">
      <Header state={state} onStateChange={setState} />

      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <h1 className="text-2xl font-bold">{t(lang, "settings.title")}</h1>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t(lang, "settings.profile")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
                {t(lang, "settings.name")}
              </label>
              <input
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t(lang, "settings.appearance")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t(lang, "settings.accentColor")}
              </label>
              <div className="flex flex-wrap gap-3">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    title={color.label}
                    aria-label={color.label}
                    onClick={() => {
                      update("accentColor", color.name)
                      applyTheme(color.name)
                    }}
                    className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      user.accentColor === color.name
                        ? "border-foreground scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.swatch }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t(lang, "settings.goals")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="goalWPM">
                {t(lang, "settings.targetWpm", { value: user.goalWPM })}
              </label>
              <input
                id="goalWPM"
                type="range"
                min={10}
                max={150}
                step={5}
                value={user.goalWPM}
                onChange={(e) => update("goalWPM", Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10</span><span>150</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="goalAccuracy">
                {t(lang, "settings.targetAccuracy", { value: user.goalAccuracy })}
              </label>
              <input
                id="goalAccuracy"
                type="range"
                min={70}
                max={100}
                step={1}
                value={user.goalAccuracy}
                onChange={(e) => update("goalAccuracy", Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>70%</span><span>100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t(lang, "settings.preferences")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t(lang, "settings.visualFeedback")}</p>
                <p className="text-xs text-muted-foreground">{t(lang, "settings.visualFeedbackDesc")}</p>
              </div>
              <button
                role="switch"
                aria-checked={user.visualFeedback}
                onClick={() => update("visualFeedback", !user.visualFeedback)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${user.visualFeedback ? "bg-primary" : "bg-muted"}`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${user.visualFeedback ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            {user.language === "fr" && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t(lang, "settings.strictLiteraryFrench")}</p>
                  <p className="text-xs text-muted-foreground">{t(lang, "settings.strictLiteraryFrenchDesc")}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={user.strictLiteraryFrench}
                  onClick={() => update("strictLiteraryFrench", !user.strictLiteraryFrench)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${user.strictLiteraryFrench ? "bg-primary" : "bg-muted"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${user.strictLiteraryFrench ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="layout">
                {t(lang, "settings.keyboardLayout")}
              </label>
              <select
                id="layout"
                value={user.layout}
                onChange={(e) => update("layout", e.target.value as LayoutId)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="qwerty">{t(lang, "layout.qwerty")}</option>
                <option value="azerty">{t(lang, "layout.azerty")}</option>
                <option value="qwertz">{t(lang, "layout.qwertz")}</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="language">
                {t(lang, "settings.language")}
              </label>
              <select
                id="language"
                value={user.language}
                onChange={(e) => update("language", e.target.value as Language)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="en">{t(lang, "lang.en")}</option>
                <option value="fr">{t(lang, "lang.fr")}</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" size="lg" onClick={handleSave}>
          {saved ? t(lang, "settings.saved") : t(lang, "settings.save")}
        </Button>
      </main>
    </div>
  )
}
