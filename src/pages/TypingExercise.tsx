import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getLessonById, generateDrillText } from "../lib/lessons.ts"
import { loadState, saveState, addSession, completeLesson, type AppState } from "../lib/storage.ts"
import { calculateWPM, calculateAccuracy } from "../lib/utils.ts"
import { t } from "../lib/i18n.ts"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Progress } from "../components/ui/Progress.tsx"
import KeyboardVisual from "../components/KeyboardVisual.tsx"
import FingerGuide from "../components/FingerGuide.tsx"

type ExerciseMode = "lesson" | "drill" | "free"
type Phase = "ready" | "typing" | "done"

interface CharState {
  char: string
  status: "pending" | "correct" | "wrong"
}

function buildCharStates(text: string): CharState[] {
  return text.split("").map((c) => ({ char: c, status: "pending" }))
}

export default function TypingExercise() {
  const { mode, id } = useParams<{ mode: ExerciseMode; id: string }>()
  const navigate = useNavigate()
  const [state] = useState<AppState>(() => loadState())
  const lang = state.user.language

  // Resolve the text to type
  const exerciseText = (() => {
    if (mode === "lesson") {
      const lesson = getLessonById(Number(id))
      if (!lesson) return "The quick brown fox jumps over the lazy dog."
      const texts = lesson.texts
      return texts[Math.floor(Math.random() * texts.length)]
    }
    if (mode === "drill") return generateDrillText(id ?? "a")
    return "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs."
  })()

  const lesson = mode === "lesson" ? getLessonById(Number(id)) : null

  const [chars, setChars] = useState<CharState[]>(() => buildCharStates(exerciseText))
  const [cursor, setCursor] = useState(0)
  const [phase, setPhase] = useState<Phase>("ready")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [errors, setErrors] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Toggle states from user settings
  const [showKeyboard, setShowKeyboard] = useState(state.user.showKeyboard)
  const [showFingerGuide, setShowFingerGuide] = useState(state.user.showFingerGuide)

  // Live stats
  const wpm = startTime ? calculateWPM(cursor, elapsed) : 0
  const accuracy = totalKeystrokes > 0 ? calculateAccuracy(totalKeystrokes - errors, totalKeystrokes) : 100
  const progressPct = Math.round((cursor / chars.length) * 100)

  // Timer
  useEffect(() => {
    if (phase === "typing") {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - (startTime ?? Date.now())) / 1000))
      }, 250)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase, startTime])

  // Focus container on mount and after reset
  useEffect(() => {
    containerRef.current?.focus()
  }, [phase])

  // Persist toggle prefs
  function toggleKeyboard() {
    const next = !showKeyboard
    setShowKeyboard(next)
    const s = loadState()
    s.user.showKeyboard = next
    saveState(s)
  }

  function toggleFingerGuide() {
    const next = !showFingerGuide
    setShowFingerGuide(next)
    const s = loadState()
    s.user.showFingerGuide = next
    saveState(s)
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === "Tab") { e.preventDefault(); return }

      if (phase === "done") return

      const key = e.key

      // Start on first real keystroke
      if (phase === "ready" && key.length === 1) {
        setPhase("typing")
        setStartTime(Date.now())
        setElapsed(0)
      }

      if (key === "Backspace") {
        e.preventDefault()
        if (cursor === 0) return
        const newChars = [...chars]
        newChars[cursor - 1] = { ...newChars[cursor - 1], status: "pending" }
        setChars(newChars)
        setCursor((c) => c - 1)
        return
      }

      if (key.length !== 1) return

      if (cursor >= chars.length) return

      const expected = chars[cursor].char
      const correct = key === expected
      const newChars = [...chars]
      newChars[cursor] = { char: expected, status: correct ? "correct" : "wrong" }
      setChars(newChars)
      setCursor((c) => c + 1)
      setTotalKeystrokes((t) => t + 1)
      if (!correct) setErrors((err) => err + 1)

      // Finished
      if (cursor + 1 >= chars.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        const finalElapsed = Math.max(1, Math.floor((Date.now() - (startTime ?? Date.now())) / 1000))
        const finalWPM = calculateWPM(chars.length, finalElapsed)
        const finalAcc = calculateAccuracy(totalKeystrokes + 1 - (correct ? 0 : 1), totalKeystrokes + 1)

        addSession({
          date: new Date().toISOString().split("T")[0],
          wpm: finalWPM,
          accuracy: finalAcc,
          keystrokes: totalKeystrokes + 1,
          duration: finalElapsed,
          mode: (mode as "lesson" | "drill" | "free") ?? "free",
          lessonId: mode === "lesson" ? Number(id) : undefined,
        })

        if (mode === "lesson" && lesson) {
          if (finalWPM >= lesson.targetWPM && finalAcc >= lesson.targetAccuracy) {
            completeLesson(lesson.id)
          }
        }

        setElapsed(finalElapsed)
        setPhase("done")
      }
    },
    [phase, cursor, chars, startTime, totalKeystrokes, mode, id, lesson],
  )

  function restart() {
    setChars(buildCharStates(exerciseText))
    setCursor(0)
    setPhase("ready")
    setStartTime(null)
    setElapsed(0)
    setErrors(0)
    setTotalKeystrokes(0)
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeout(() => containerRef.current?.focus(), 0)
  }

  const finalWPM = elapsed > 0 ? calculateWPM(chars.length, elapsed) : 0
  const finalAcc = totalKeystrokes > 0 ? calculateAccuracy(totalKeystrokes - errors, totalKeystrokes) : 100
  const passedLesson =
    lesson && phase === "done" && finalWPM >= lesson.targetWPM && finalAcc >= lesson.targetAccuracy

  // Next expected key for keyboard highlight
  const nextExpectedKey = phase !== "done" && cursor < chars.length ? chars[cursor].char : undefined

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <button className="text-lg font-bold text-primary" onClick={() => navigate("/")}>
            TypingMaster
          </button>
          <div className="text-sm text-muted-foreground">
            {lesson
              ? lesson.title
              : mode === "drill"
                ? t(lang, "exercise.drill", { key: (id ?? "").toUpperCase() })
                : t(lang, "exercise.freePractice")}
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            {t(lang, "exercise.back")}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 p-6">
        {/* Live stats bar */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <Card>
            <CardContent className="py-3">
              <div className="text-2xl font-bold text-primary">{phase === "done" ? finalWPM : wpm}</div>
              <div className="text-xs text-muted-foreground">{t(lang, "exercise.wpm")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3">
              <div className="text-2xl font-bold text-primary">
                {phase === "done" ? finalAcc : accuracy}%
              </div>
              <div className="text-xs text-muted-foreground">{t(lang, "exercise.accuracy")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-3">
              <div className="text-2xl font-bold text-primary">{elapsed}s</div>
              <div className="text-xs text-muted-foreground">{t(lang, "exercise.time")}</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <Progress value={progressPct} />

        {/* Text display + input area */}
        {phase !== "done" && (
          <Card>
            <CardContent className="p-6">
              {phase === "ready" && (
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  {t(lang, "exercise.clickToStart")}
                </p>
              )}
              {/* Typing area — captures keyboard events */}
              <div
                ref={containerRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="cursor-text select-none rounded-md border border-input bg-muted/30 p-4 font-mono text-lg leading-relaxed outline-none focus:ring-2 focus:ring-ring"
                aria-label="Typing area"
              >
                {chars.map((c, i) => (
                  <span
                    key={i}
                    className={
                      i === cursor
                        ? "border-b-2 border-primary text-foreground"
                        : c.status === "correct"
                          ? "text-green-600"
                          : c.status === "wrong"
                            ? "bg-red-100 text-red-600"
                            : "text-muted-foreground"
                    }
                  >
                    {c.char}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {phase === "done" && (
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <div className="text-4xl">{passedLesson ? "&#127881;" : "&#9989;"}</div>
              <h2 className="text-xl font-bold">
                {passedLesson ? t(lang, "exercise.lessonComplete") : t(lang, "exercise.exerciseDone")}
              </h2>
              {lesson && (
                <p className="text-sm text-muted-foreground">
                  {passedLesson
                    ? t(lang, "exercise.passed", { wpm: finalWPM, acc: finalAcc })
                    : t(lang, "exercise.keepPracticing", { wpm: lesson.targetWPM, acc: lesson.targetAccuracy })}
                </p>
              )}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{finalWPM}</div>
                  <div className="text-xs text-muted-foreground">{t(lang, "exercise.wpm")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{finalAcc}%</div>
                  <div className="text-xs text-muted-foreground">{t(lang, "exercise.accuracy")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{elapsed}s</div>
                  <div className="text-xs text-muted-foreground">{t(lang, "exercise.time")}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={restart}>
                  {t(lang, "exercise.tryAgain")}
                </Button>
                <Button className="flex-1" onClick={() => navigate("/lessons")}>
                  {t(lang, "exercise.backToLessons")}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key hints for lesson */}
        {lesson && lesson.keys.length > 0 && phase !== "done" && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">{t(lang, "exercise.focusKeys")}</span>
            {lesson.keys.map((k) => (
              <kbd
                key={k}
                className="rounded border border-border bg-muted px-2 py-0.5 font-mono text-sm uppercase"
              >
                {k}
              </kbd>
            ))}
          </div>
        )}

        {/* Keyboard / Finger Guide toggles */}
        {phase !== "done" && (
          <div className="flex items-center gap-4">
            <button
              onClick={toggleKeyboard}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                showKeyboard
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {t(lang, "exercise.showKeyboard")}
            </button>
            <button
              onClick={toggleFingerGuide}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                showFingerGuide
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {t(lang, "exercise.showFingerGuide")}
            </button>
          </div>
        )}

        {/* Visual keyboard */}
        {showKeyboard && phase !== "done" && (
          <KeyboardVisual
            layout={state.user.layout}
            activeKey={nextExpectedKey}
          />
        )}

        {/* Finger guide */}
        {showFingerGuide && phase !== "done" && (
          <FingerGuide layout={state.user.layout} lang={lang} />
        )}
      </main>
    </div>
  )
}
