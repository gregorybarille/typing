import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  getLessonById,
  getLessonSource,
  getLessonText,
  getPracticeStageKey,
  generateDrillText,
  getFreePracticeText,
  LESSONS,
} from "../lib/lessons.ts"
import { loadState, saveState, addSession, completeLesson, type AppState } from "../lib/storage.ts"
import { calculateWPM, calculateAccuracy } from "../lib/utils.ts"
import { t } from "../lib/i18n.ts"
import { Button } from "../components/ui/Button.tsx"
import { Card, CardContent } from "../components/ui/Card.tsx"
import { Progress } from "../components/ui/Progress.tsx"
import KeyboardVisual from "../components/KeyboardVisual.tsx"
import FingerGuide from "../components/FingerGuide.tsx"

type ExerciseMode = "lesson" | "drill" | "free" | "dictation"
type Phase = "ready" | "typing" | "done"
// Dictation has an extra "input" phase before "ready"
type DictationPhase = "input" | Phase

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
  const currentLesson = state.progress.currentLesson
  const strictLiterary = state.user.strictLiteraryFrench

  const isFree = mode === "free"
  const isDictation = mode === "dictation"

  // Resolve the exercise text (not used for free or dictation-input phases)
  const resolvedText = (() => {
    if (mode === "lesson") {
      const lesson = getLessonById(Number(id))
      if (!lesson) return getFreePracticeText(lang, currentLesson, strictLiterary)
      return getLessonText(lesson.id, lang, strictLiterary)
    }
    if (mode === "drill") return generateDrillText(id ?? "a", lang, currentLesson, strictLiterary)
    // free or dictation: handled separately
    return ""
  })()

  const lesson = mode === "lesson" ? getLessonById(Number(id)) : null
  const lessonTitle = lesson ? lesson.title[lang] : null
  const sourceLabel = getLessonSource(lang)
  const practiceStageKey = getPracticeStageKey(lang, lesson?.id ?? currentLesson, strictLiterary)

  // Dictation: sentence entered by the teacher
  const [dictationInput, setDictationInput] = useState("")
  // Phase for dictation flow
  const [dictationPhase, setDictationPhase] = useState<DictationPhase>(isDictation ? "input" : "ready")

  // Determine the actual text to type
  const exerciseText = isDictation ? dictationInput : resolvedText

  const [chars, setChars] = useState<CharState[]>(() =>
    isFree ? [] : buildCharStates(exerciseText),
  )
  const [cursor, setCursor] = useState(0)
  const [phase, setPhase] = useState<Phase>("ready")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [errors, setErrors] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)

  // Free mode: store all typed characters
  const [freeText, setFreeText] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reset all exercise state when navigating to a different exercise
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    const nextIsFree = mode === "free"
    const nextIsDictation = mode === "dictation"
    setChars(nextIsFree || nextIsDictation ? [] : buildCharStates(resolvedText))
    setCursor(0)
    setPhase("ready")
    setStartTime(null)
    setElapsed(0)
    setErrors(0)
    setTotalKeystrokes(0)
    setFreeText("")
    setDictationInput("")
    setDictationPhase(nextIsDictation ? "input" : "ready")
    if (!nextIsDictation) {
      setTimeout(() => containerRef.current?.focus(), 0)
    }
    // resolvedText is derived from mode/id/lang/strictLiterary — listing those is sufficient
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id, lang, strictLiterary])

  // Toggle states from user settings
  const [showKeyboard, setShowKeyboard] = useState(state.user.showKeyboard)
  const [showFingerGuide, setShowFingerGuide] = useState(state.user.showFingerGuide)

  // Live stats
  const wpm = startTime ? calculateWPM(isFree ? freeText.length : cursor, elapsed) : 0
  const accuracy =
    totalKeystrokes > 0 ? calculateAccuracy(totalKeystrokes - errors, totalKeystrokes) : 100
  const progressPct = isFree
    ? 0
    : Math.round((cursor / Math.max(chars.length, 1)) * 100)

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
    if (dictationPhase !== "input") {
      containerRef.current?.focus()
    }
  }, [phase, dictationPhase])

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

  // Start dictation: transition from input phase to ready
  function startDictation() {
    if (!dictationInput.trim()) return
    setChars(buildCharStates(dictationInput))
    setCursor(0)
    setPhase("ready")
    setDictationPhase("ready")
    setTimeout(() => containerRef.current?.focus(), 0)
  }

  // Stop free mode
  function stopFreeMode() {
    if (timerRef.current) clearInterval(timerRef.current)
    const finalElapsed = Math.max(1, elapsed)
    const finalWPM = calculateWPM(freeText.length, finalElapsed)
    addSession({
      date: new Date().toISOString().split("T")[0],
      wpm: finalWPM,
      accuracy: 100,
      keystrokes: freeText.length,
      duration: finalElapsed,
      mode: "free",
    })
    setElapsed(finalElapsed)
    setPhase("done")
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === "Tab") {
        e.preventDefault()
        return
      }

      if (phase === "done") return

      const key = e.key

      // ── FREE MODE ────────────────────────────────────────────────────────
      if (isFree) {
        if (key.length === 1) {
          if (phase === "ready") {
            setPhase("typing")
            setStartTime(Date.now())
            setElapsed(0)
          }
          setFreeText((prev) => prev + key)
          setTotalKeystrokes((t) => t + 1)
        } else if (key === "Backspace") {
          e.preventDefault()
          setFreeText((prev) => prev.slice(0, -1))
        }
        return
      }

      // ── LESSON / DRILL / DICTATION MODE ──────────────────────────────────
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
        const finalElapsed = Math.max(
          1,
          Math.floor((Date.now() - (startTime ?? Date.now())) / 1000),
        )
        const finalWPM = calculateWPM(chars.length, finalElapsed)
        const finalAcc = calculateAccuracy(
          totalKeystrokes + 1 - (correct ? 0 : 1),
          totalKeystrokes + 1,
        )

        addSession({
          date: new Date().toISOString().split("T")[0],
          wpm: finalWPM,
          accuracy: finalAcc,
          keystrokes: totalKeystrokes + 1,
          duration: finalElapsed,
          mode: (mode as "lesson" | "drill" | "free" | "dictation") ?? "free",
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
    [phase, cursor, chars, startTime, totalKeystrokes, mode, id, lesson, isFree],
  )

  function restart() {
    if (isDictation) {
      // Return to the teacher-input phase
      setDictationInput("")
      setDictationPhase("input")
      setChars([])
    } else {
      setChars(buildCharStates(exerciseText))
    }
    setCursor(0)
    setPhase("ready")
    setStartTime(null)
    setElapsed(0)
    setErrors(0)
    setTotalKeystrokes(0)
    setFreeText("")
    if (timerRef.current) clearInterval(timerRef.current)
    if (!isDictation) {
      setTimeout(() => containerRef.current?.focus(), 0)
    }
  }

  const finalWPM = isFree
    ? calculateWPM(freeText.length, Math.max(1, elapsed))
    : elapsed > 0
      ? calculateWPM(chars.length, elapsed)
      : 0
  const finalAcc =
    totalKeystrokes > 0 ? calculateAccuracy(totalKeystrokes - errors, totalKeystrokes) : 100
  const passedLesson =
    lesson && phase === "done" && finalWPM >= lesson.targetWPM && finalAcc >= lesson.targetAccuracy

  const nextLesson = lesson ? (LESSONS.find((l) => l.id === lesson.id + 1) ?? null) : null

  // Next expected key for keyboard / finger guide highlight
  const nextExpectedKey =
    !isFree && phase !== "done" && cursor < chars.length ? chars[cursor].char : undefined

  // ── DICTATION INPUT PHASE ────────────────────────────────────────────────
  if (isDictation && dictationPhase === "input") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
            <button className="text-lg font-bold text-primary" onClick={() => navigate("/")}>
              TypingMaster
            </button>
            <div className="text-sm text-muted-foreground">{t(lang, "exercise.dictation")}</div>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              {t(lang, "exercise.back")}
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-3xl space-y-6 p-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold">{t(lang, "exercise.dictation")}</h2>
              <p className="text-sm text-muted-foreground">{t(lang, "exercise.dictationInput")}</p>
              <textarea
                autoFocus
                value={dictationInput}
                onChange={(e) => setDictationInput(e.target.value)}
                placeholder={t(lang, "exercise.dictationPlaceholder")}
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
              <Button
                className="w-full"
                disabled={!dictationInput.trim()}
                onClick={startDictation}
              >
                {t(lang, "exercise.dictationStart")}
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // ── MAIN EXERCISE VIEW ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <button className="text-lg font-bold text-primary" onClick={() => navigate("/")}>
            TypingMaster
          </button>
          <div className="text-sm text-muted-foreground">
            {lesson
              ? lessonTitle
              : mode === "drill"
                ? t(lang, "exercise.drill", { key: (id ?? "").toUpperCase() })
                : mode === "dictation"
                  ? t(lang, "exercise.dictation")
                  : t(lang, "exercise.freeMode")}
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
                {isFree ? "—" : phase === "done" ? `${finalAcc}%` : `${accuracy}%`}
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

        {/* Progress bar — hidden in free mode */}
        {!isFree && <Progress value={progressPct} />}

        {/* Source / stage labels — hidden in free and dictation modes */}
        {!isFree && !isDictation && (
          <>
            <p className="text-center text-xs text-muted-foreground">
              {t(lang, "exercise.source", { source: sourceLabel })}
            </p>
            {practiceStageKey && (
              <p className="text-center text-xs text-muted-foreground">
                {t(lang, "exercise.stage", { label: t(lang, practiceStageKey) })}
              </p>
            )}
          </>
        )}

        {/* Text display + input area */}
        {phase !== "done" && (
          <Card>
            <CardContent className="p-6">
              {phase === "ready" && !isFree && (
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  {t(lang, "exercise.clickToStart")}
                </p>
              )}

              {/* FREE MODE: plain textarea feel */}
              {isFree ? (
                <div className="space-y-3">
                  <div
                    ref={containerRef}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    className="min-h-[120px] cursor-text select-none rounded-md border border-input bg-muted/30 p-4 font-mono text-lg leading-relaxed outline-none focus:ring-2 focus:ring-ring whitespace-pre-wrap break-all"
                    aria-label="Free typing area"
                  >
                    {freeText || (
                      <span className="text-muted-foreground/50 select-none">
                        {t(lang, "exercise.clickToStart")}
                      </span>
                    )}
                    <span className="border-b-2 border-primary">&nbsp;</span>
                  </div>
                  {phase === "typing" && (
                    <Button variant="outline" size="sm" className="w-full" onClick={stopFreeMode}>
                      {t(lang, "exercise.stopFree")}
                    </Button>
                  )}
                </div>
              ) : (
                /* LESSON / DRILL / DICTATION: character-by-character */
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
              )}
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {phase === "done" && (
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <div className="text-4xl">{passedLesson ? "🎉" : "✅"}</div>
              <h2 className="text-xl font-bold">
                {passedLesson ? t(lang, "exercise.lessonComplete") : t(lang, "exercise.exerciseDone")}
              </h2>
              {lesson && (
                <p className="text-sm text-muted-foreground">
                  {passedLesson
                    ? t(lang, "exercise.passed", { wpm: finalWPM, acc: finalAcc })
                    : t(lang, "exercise.keepPracticing", {
                        wpm: lesson.targetWPM,
                        acc: lesson.targetAccuracy,
                      })}
                </p>
              )}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{finalWPM}</div>
                  <div className="text-xs text-muted-foreground">{t(lang, "exercise.wpm")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {isFree ? "—" : `${finalAcc}%`}
                  </div>
                  <div className="text-xs text-muted-foreground">{t(lang, "exercise.accuracy")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{elapsed}s</div>
                  <div className="text-xs text-muted-foreground">{t(lang, "exercise.time")}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-4 pt-2">
                {/* Retry */}
                <button
                  onClick={restart}
                  title={t(lang, "exercise.tryAgain")}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-muted text-xl transition-colors hover:bg-accent"
                  aria-label={t(lang, "exercise.tryAgain")}
                >
                  ↺
                </button>

                {/* Next lesson — only in lesson mode when a next lesson exists */}
                {nextLesson && (
                  <button
                    onClick={() => navigate(`/exercise/lesson/${nextLesson.id}`)}
                    title={t(lang, "exercise.nextLesson")}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground transition-colors hover:bg-primary/90"
                    aria-label={t(lang, "exercise.nextLesson")}
                  >
                    →
                  </button>
                )}
              </div>

              {/* Subtle lessons link */}
              <button
                onClick={() => navigate("/lessons")}
                className="mt-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
              >
                {t(lang, "exercise.backToLessons")}
              </button>
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

        {/* Keyboard / Finger Guide toggles — not shown in free mode done state */}
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
          <KeyboardVisual layout={state.user.layout} activeKey={nextExpectedKey} />
        )}

        {/* Finger guide */}
        {showFingerGuide && phase !== "done" && (
          <FingerGuide
            layout={state.user.layout}
            lang={lang}
            nextExpectedKey={nextExpectedKey}
          />
        )}
      </main>
    </div>
  )
}
