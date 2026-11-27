import { describe, expect, it } from "vitest"

import { getLessonText } from "./lessons.ts"
import { getFingerForKey } from "./keyboards.ts"

describe("lessons", () => {
  it("number lessons contain digits", () => {
    for (const lang of ["en", "fr"] as const) {
      for (const id of [11, 12]) {
        for (let i = 0; i < 10; i++) expect(getLessonText(id, lang)).toMatch(/\d/)
      }
    }
  })
})

describe("getFingerForKey", () => {
  it("finds shifted characters", () => {
    expect(getFingerForKey("azerty", "1")).toBe(0)
    expect(getFingerForKey("qwerty", "?")).toBeDefined()
    expect(getFingerForKey("qwerty", "A")).toBe(0)
  })
})
