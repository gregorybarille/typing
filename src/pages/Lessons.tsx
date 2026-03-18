import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { LESSONS, getDifficultyLabelKey, isLessonUnlocked } from "../lib/lessons.ts"
import { loadState, type AppState } from "../lib/storage.ts"
import { t } from "../lib/i18n.ts"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/Card.tsx"
import { Badge } from "../components/ui/Badge.tsx"
import { Progress } from "../components/ui/Progress.tsx"
import Header from "../components/Header.tsx"

const CATEGORY_KEYS: Record<string, string> = {
  home: "lessons.catHome",
  upper: "lessons.catUpper",
  lower: "lessons.catLower",
  numbers: "lessons.catNumbers",
  symbols: "lessons.catSymbols",
}

export default function Lessons() {
  const navigate = useNavigate()
  const [state, setState] = useState<AppState>(() => loadState())
  const { progress } = state
  const lang = state.user.language

  const grouped = LESSONS.reduce<Record<string, typeof LESSONS>>((acc, lesson) => {
    if (!acc[lesson.category]) acc[lesson.category] = []
    acc[lesson.category].push(lesson)
    return acc
  }, {})

  const categoryOrder = ["home", "upper", "lower", "numbers", "symbols"]

  return (
    <div className="min-h-screen bg-background">
      <Header state={state} onStateChange={setState} />

      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t(lang, "lessons.title")}</h1>
          <p className="text-muted-foreground">
            {t(lang, "lessons.completed", {
              count: progress.lessonsCompleted.length,
              total: LESSONS.length,
            })}
          </p>
          <Progress
            value={Math.round((progress.lessonsCompleted.length / LESSONS.length) * 100)}
            className="mt-2"
          />
        </div>

        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const lessons = grouped[cat]
            if (!lessons) return null
            return (
              <section key={cat}>
                <h2 className="mb-3 text-lg font-semibold">{t(lang, CATEGORY_KEYS[cat])}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {lessons.map((lesson) => {
                    const completed = progress.lessonsCompleted.includes(lesson.id)
                    const unlocked = isLessonUnlocked(lesson.id, progress.lessonsCompleted)
                    const isCurrent = lesson.id === progress.currentLesson

                    return (
                      <Card
                        key={lesson.id}
                        className="flex flex-col"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-sm">
                              {lesson.id}. {lesson.title[lang]}
                            </CardTitle>
                            {completed && (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" aria-label={t(lang, "lessons.done")} />
                            )}
                            {!completed && isCurrent && <Badge>{t(lang, "lessons.next")}</Badge>}
                            {!completed && !isCurrent && unlocked && (
                              <Badge variant="secondary">{t(lang, "lessons.unlocked")}</Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">{lesson.description[lang]}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-2">
                          <div className="mb-3 flex gap-3 text-xs text-muted-foreground">
                            <span>{t(lang, "lessons.target", { wpm: lesson.targetWPM })}</span>
                            <span>{t(lang, "lessons.acc", { acc: lesson.targetAccuracy })}</span>
                          </div>
                          <div>
                            <Badge variant="secondary">{t(lang, getDifficultyLabelKey(lesson.difficulty))}</Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button
                            size="sm"
                            variant={completed ? "outline" : "default"}
                            className="w-full"
                            onClick={() => navigate(`/exercise/lesson/${lesson.id}`)}
                          >
                            {completed ? t(lang, "lessons.practiceAgain") : t(lang, "lessons.start")}
                          </Button>
                        </CardFooter>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
