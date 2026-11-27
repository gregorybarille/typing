import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { addSession, completeLesson, loadState, localDate } from "./storage.ts"
import { LESSONS } from "./lessons.ts"

const SESSION = { wpm: 30, accuracy: 95, keystrokes: 100, duration: 60, mode: "lesson" as const }

beforeEach(() => {
  const store = new Map<string, string>()
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  })
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe("addSession", () => {
  it("dates a late-evening session on the local day, not the UTC day", () => {
    vi.setSystemTime(new Date(2026, 10, 27, 23, 30))
    expect(new Date().toISOString().slice(0, 10)).toBe("2026-11-28") // UTC is already tomorrow
    expect(localDate()).toBe("2026-11-27")
    addSession(SESSION)
    expect(loadState().stats[0].date).toBe("2026-11-27")
  })

  it("grows the streak on consecutive local days and resets after a gap", () => {
    vi.setSystemTime(new Date(2026, 10, 27, 20, 0))
    addSession(SESSION)
    expect(loadState().progress.streak).toBe(1)

    vi.setSystemTime(new Date(2026, 10, 27, 22, 0))
    addSession(SESSION)
    expect(loadState().progress.streak).toBe(1)

    vi.setSystemTime(new Date(2026, 10, 28, 18, 0))
    addSession(SESSION)
    expect(loadState().progress.streak).toBe(2)

    vi.setSystemTime(new Date(2026, 11, 1, 9, 0))
    addSession(SESSION)
    expect(loadState().progress.streak).toBe(1)
  })
})

describe("completeLesson", () => {
  it("keeps the current lesson in range after the last one", () => {
    completeLesson(LESSONS.length)
    expect(loadState().progress.currentLesson).toBe(LESSONS.length)
  })
})
