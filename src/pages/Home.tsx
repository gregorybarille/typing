import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadState, type AppState } from "../lib/storage.ts"
import { t } from "../lib/i18n.ts"
import { LESSONS } from "../lib/lessons.ts"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card.tsx"
import { Progress } from "../components/ui/Progress.tsx"
import Header from "../components/Header.tsx"

export default function Home() {
  const navigate = useNavigate()
  const [state, setState] = useState<AppState>(() => loadState())
  const { user, progress, stats } = state
  const lang = user.language

  const completedCount = progress.lessonsCompleted.length
  const totalLessons = LESSONS.length
  const progressPct = Math.round((completedCount / totalLessons) * 100)

  const recentSessions = stats.slice(0, 5)
  const avgWPM = stats.length
    ? Math.round(stats.slice(0, 10).reduce((s, x) => s + x.wpm, 0) / Math.min(stats.length, 10))
    : 0
  const avgAccDisplay = stats.length
    ? Math.round(stats.slice(0, 10).reduce((s, x) => s + x.accuracy, 0) / Math.min(stats.length, 10))
    : 0

  const currentLesson = LESSONS.find((l) => l.id === progress.currentLesson) ?? LESSONS[0]

  return (
    <div className="min-h-screen bg-background">
      <Header state={state} onStateChange={setState} />

      <main className="mx-auto max-w-4xl space-y-6 p-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {user.name
              ? t(lang, "home.welcomeBack", { name: user.name })
              : t(lang, "home.welcomeBackGeneric")}
          </h1>
          <p className="text-muted-foreground">{t(lang, "home.subtitle")}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{avgWPM}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "home.avgWpm")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{avgAccDisplay}%</div>
              <div className="text-xs text-muted-foreground">{t(lang, "home.avgAccuracy")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{progress.streak}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "home.dayStreak")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{progress.totalSessions}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "home.sessions")}</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress + next lesson */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t(lang, "home.courseProgress")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={progressPct} />
              <p className="text-sm text-muted-foreground">
                {t(lang, "home.lessonsCompleted", {
                  completed: completedCount,
                  total: totalLessons,
                  pct: progressPct,
                })}
              </p>
              <Button className="w-full" onClick={() => navigate("/lessons")}>
                {t(lang, "home.viewAllLessons")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t(lang, "home.continueLearning")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{currentLesson.title}</p>
                <p className="text-sm text-muted-foreground">{currentLesson.description}</p>
              </div>
              <Button
                className="w-full"
                onClick={() => navigate(`/exercise/lesson/${currentLesson.id}`)}
              >
                {t(lang, "home.startLesson")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent sessions */}
        {recentSessions.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t(lang, "home.recentSessions")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentSessions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {new Date(s.date).toLocaleDateString()} — {s.mode}
                    </span>
                    <span className="font-medium">
                      {s.wpm} WPM · {s.accuracy}%
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full" onClick={() => navigate("/stats")}>
                {t(lang, "home.viewAllStats")}
              </Button>
            </CardContent>
          </Card>
        )}

        {recentSessions.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">{t(lang, "home.noSessions")}</p>
              <Button className="mt-4" onClick={() => navigate(`/exercise/lesson/${currentLesson.id}`)}>
                {t(lang, "home.beginNow")}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
