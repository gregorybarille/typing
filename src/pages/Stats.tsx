import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"
import { loadState, type AppState } from "../lib/storage.ts"
import { formatDuration } from "../lib/utils.ts"
import { t } from "../lib/i18n.ts"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.tsx"
import Header from "../components/Header.tsx"

export default function Stats() {
  const navigate = useNavigate()
  const [state, setState] = useState<AppState>(() => loadState())
  const { stats, progress, keyboardStats } = state
  const lang = state.user.language

  const chartData = [...stats]
    .reverse()
    .slice(-20)
    .map((s, i) => ({ session: i + 1, wpm: s.wpm, accuracy: s.accuracy }))

  const avgWPM = stats.length
    ? Math.round(stats.reduce((s, x) => s + x.wpm, 0) / stats.length)
    : 0
  const bestWPM = stats.length ? Math.max(...stats.map((s) => s.wpm)) : 0
  const avgAcc = stats.length
    ? Math.round(stats.reduce((s, x) => s + x.accuracy, 0) / stats.length)
    : 0

  // Worst keys by error rate
  const worstKeys = Object.entries(keyboardStats)
    .filter(([, v]) => v.total >= 5)
    .map(([key, v]) => ({ key, errorRate: Math.round((v.errors / v.total) * 100) }))
    .sort((a, b) => b.errorRate - a.errorRate)
    .slice(0, 8)

  return (
    <div className="min-h-screen bg-background">
      <Header state={state} onStateChange={setState} />

      <main className="mx-auto max-w-4xl space-y-6 p-6">
        <h1 className="text-2xl font-bold">{t(lang, "stats.title")}</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{avgWPM}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "stats.avgWpm")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{bestWPM}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "stats.bestWpm")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{avgAcc}%</div>
              <div className="text-xs text-muted-foreground">{t(lang, "stats.avgAccuracy")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{progress.streak}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "stats.dayStreak")}</div>
            </CardContent>
          </Card>
        </div>

        {/* WPM chart */}
        {chartData.length >= 2 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t(lang, "stats.wpmOverTime")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="session" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    stroke="hsl(221.2 83.2% 53.3%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Worst keys */}
        {worstKeys.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t(lang, "stats.keysToPractice")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {worstKeys.map(({ key, errorRate }) => (
                  <button
                    key={key}
                    onClick={() => navigate(`/exercise/drill/${key}`)}
                    className="flex flex-col items-center rounded-lg border border-border bg-muted px-4 py-2 text-center transition-colors hover:bg-accent"
                  >
                    <kbd className="font-mono text-lg uppercase">{key}</kbd>
                    <span className="text-xs text-destructive">
                      {t(lang, "stats.errors", { pct: errorRate })}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{t(lang, "stats.clickToDrill")}</p>
            </CardContent>
          </Card>
        )}

        {/* Session history */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t(lang, "stats.sessionHistory")}</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t(lang, "stats.noSessions")}</p>
            ) : (
              <div className="space-y-2">
                {stats.slice(0, 20).map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm odd:bg-muted/30"
                  >
                    <div className="text-muted-foreground">
                      {s.date} · {s.mode}
                      {s.lessonId ? ` #${s.lessonId}` : ""}
                    </div>
                    <div className="font-medium">
                      {s.wpm} WPM · {s.accuracy}% · {formatDuration(s.duration)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
