import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
              <TypingExercise />
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
