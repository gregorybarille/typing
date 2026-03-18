import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { loadState } from "./lib/storage.ts"
import { applyTheme } from "./lib/theme.ts"
import Onboarding from "./pages/Onboarding.tsx"
import Home from "./pages/Home.tsx"
import Lessons from "./pages/Lessons.tsx"
import TypingExercise from "./pages/TypingExercise.tsx"
import Stats from "./pages/Stats.tsx"
import Settings from "./pages/Settings.tsx"

// Apply stored accent color before first render
applyTheme(loadState().user.accentColor)

// Wrapper that forces TypingExercise to remount when mode/id or user settings change,
// preventing stale chars/phase state from carrying over between exercises.
function ExerciseRoute() {
  const { pathname } = useLocation()
  const { user } = loadState()
  const key = `${pathname}-${user.language}-${user.strictLiteraryFrench}`
  return <TypingExercise key={key} />
}

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const state = loadState()
  if (!state.user.onboardingComplete) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter basename="/typing">
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={
            <RequireOnboarding>
              <Home />
            </RequireOnboarding>
          }
        />
        <Route
          path="/lessons"
          element={
            <RequireOnboarding>
              <Lessons />
            </RequireOnboarding>
          }
        />
        <Route
          path="/exercise/:mode/:id"
          element={
            <RequireOnboarding>
              <ExerciseRoute />
            </RequireOnboarding>
          }
        />
        <Route
          path="/stats"
          element={
            <RequireOnboarding>
              <Stats />
            </RequireOnboarding>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireOnboarding>
              <Settings />
            </RequireOnboarding>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
