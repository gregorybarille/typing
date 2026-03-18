import { useNavigate, useLocation } from "react-router-dom"
import { type AppState, saveState } from "../lib/storage.ts"
import { type LayoutId } from "../lib/keyboards.ts"
import { type Language, t } from "../lib/i18n.ts"
import { Button } from "./ui/Button.tsx"

interface HeaderProps {
  state: AppState
  onStateChange: (state: AppState) => void
}

export default function Header({ state, onStateChange }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const lang = state.user.language

  function updateSetting<K extends keyof typeof state.user>(key: K, value: typeof state.user[K]) {
    const next = {
      ...state,
      user: { ...state.user, [key]: value },
    }
    saveState(next)
    onStateChange(next)
  }

  const isActive = (path: string) =>
    location.pathname === path ? "bg-accent text-accent-foreground" : ""

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-3">
        {/* Logo */}
        <button
          className="shrink-0 text-xl font-bold text-primary"
          onClick={() => navigate("/")}
        >
          TypingMaster
        </button>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className={isActive("/")} onClick={() => navigate("/")}>
            {t(lang, "nav.home")}
          </Button>
          <Button variant="ghost" size="sm" className={isActive("/lessons")} onClick={() => navigate("/lessons")}>
            {t(lang, "nav.lessons")}
          </Button>
          <Button variant="ghost" size="sm" className={isActive("/stats")} onClick={() => navigate("/stats")}>
            {t(lang, "nav.stats")}
          </Button>
          <Button variant="ghost" size="sm" className={isActive("/settings")} onClick={() => navigate("/settings")}>
            {t(lang, "nav.settings")}
          </Button>
        </nav>

        {/* Quick-switch dropdowns */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <select
            value={state.user.language}
            onChange={(e) => updateSetting("language", e.target.value as Language)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t(lang, "settings.language")}
          >
            <option value="en">{t(lang, "lang.en")}</option>
            <option value="fr">{t(lang, "lang.fr")}</option>
          </select>

          {/* Layout */}
          <select
            value={state.user.layout}
            onChange={(e) => updateSetting("layout", e.target.value as LayoutId)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t(lang, "settings.keyboardLayout")}
          >
            <option value="qwerty">{t(lang, "layout.qwerty")}</option>
            <option value="azerty">{t(lang, "layout.azerty")}</option>
            <option value="qwertz">{t(lang, "layout.qwertz")}</option>
          </select>
        </div>
      </div>
    </header>
  )
}
