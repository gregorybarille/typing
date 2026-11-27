import { describe, expect, it } from "vitest"

import { getLessonText, pickMultiple } from "./lessons.ts"
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

describe("pickMultiple", () => {
  it("never repeats an item when the pool is smaller than the count", () => {
    expect(pickMultiple(["only one"], 6)).toBe("only one")
    const picked = pickMultiple(["a", "b", "c"], 6).split(" ")
    expect(new Set(picked).size).toBe(3)
    expect(picked).toHaveLength(3)
  })
})

describe("getFingerForKey", () => {
  it("finds shifted characters", () => {
    expect(getFingerForKey("azerty", "1")).toBe(0)
    expect(getFingerForKey("qwerty", "?")).toBeDefined()
    expect(getFingerForKey("qwerty", "A")).toBe(0)
  })
})
