import { generateId } from "./utils";
import { LESSONS } from "./lessons";
import { type LayoutId } from "./keyboards";
import { type Language } from "./i18n";

export interface UserSettings {
  layout: LayoutId;
  language: Language;
  showKeyboard: boolean;
  showFingerGuide: boolean;
  highlightKeys: boolean;
  name: string;
  onboardingComplete: boolean;
  strictLiteraryFrench: boolean;
  accentColor: string;
}

export interface Progress {
  currentLesson: number;
  lessonsCompleted: number[];
  totalKeystrokes: number;
  totalSessions: number;
  streak: number;
  lastSessionDate: string | null;
}

export interface SessionStat {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  keystrokes: number;
  duration: number;
  mode: "lesson" | "drill" | "free" | "dictation";
  lessonId?: number;
}

export interface KeyStat {
  errors: number;
  total: number;
}

export interface AppState {
  user: UserSettings;
  progress: Progress;
  stats: SessionStat[];
  keyboardStats: Record<string, KeyStat>;
}

const DEFAULT_STATE: AppState = {
  user: {
    layout: "qwerty",
    language: "en",
    showKeyboard: true,
    showFingerGuide: false,
    highlightKeys: true,
    name: "",
    onboardingComplete: false,
    strictLiteraryFrench: false,
    accentColor: "blue",
  },
  progress: {
    currentLesson: 1,
    lessonsCompleted: [],
    totalKeystrokes: 0,
    totalSessions: 0,
    streak: 0,
    lastSessionDate: null,
  },
  stats: [],
  keyboardStats: {},
};

const STORAGE_KEY = "typing-app-state";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const parsed = JSON.parse(raw);
    return {
      user: { ...DEFAULT_STATE.user, ...parsed.user },
      progress: { ...DEFAULT_STATE.progress, ...parsed.progress },
      stats: parsed.stats || [],
      keyboardStats: parsed.keyboardStats || {},
    };
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.error("Failed to save state");
  }
}

export function updateUser(patch: Partial<UserSettings>): void {
  const state = loadState();
  state.user = { ...state.user, ...patch };
  saveState(state);
}

// The user's local calendar day as YYYY-MM-DD (toISOString alone would give the UTC day).
export function localDate(now = new Date()): string {
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function addSession(session: Omit<SessionStat, "id" | "date">): void {
  const state = loadState();
  const today = localDate();
  const lastDate = state.progress.lastSessionDate;
  if (lastDate) {
    const diffDays = Math.floor(
      (new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 1) state.progress.streak += 1;
    else if (diffDays > 1) state.progress.streak = 1;
  } else {
    state.progress.streak = 1;
  }
  state.progress.lastSessionDate = today;
  state.progress.totalSessions += 1;
  state.progress.totalKeystrokes += session.keystrokes;
  state.stats.unshift({ ...session, date: today, id: generateId() });
  if (state.stats.length > 100) state.stats = state.stats.slice(0, 100);
  saveState(state);
}

export function updateKeyboardStats(keyErrors: Record<string, { errors: number; total: number }>): void {
  const state = loadState();
  for (const [key, data] of Object.entries(keyErrors)) {
    if (!state.keyboardStats[key]) state.keyboardStats[key] = { errors: 0, total: 0 };
    state.keyboardStats[key].errors += data.errors;
    state.keyboardStats[key].total += data.total;
  }
  saveState(state);
}

export function completeLesson(lessonId: number): void {
  const state = loadState();
  if (!state.progress.lessonsCompleted.includes(lessonId)) state.progress.lessonsCompleted.push(lessonId);
  if (lessonId >= state.progress.currentLesson) state.progress.currentLesson = Math.min(lessonId + 1, LESSONS.length);
  saveState(state);
}
