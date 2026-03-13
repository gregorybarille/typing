export type Language = "en" | "fr"

interface Translations {
  [key: string]: string
}

const en: Translations = {
  // Nav
  "nav.home": "Home",
  "nav.lessons": "Lessons",
  "nav.stats": "Stats",
  "nav.settings": "Settings",

  // Onboarding
  "onboarding.welcome": "Welcome to TypingMaster",
  "onboarding.description": "Learn touch typing step by step, track your progress, and improve your speed and accuracy.",
  "onboarding.nameLabel": "What's your name?",
  "onboarding.namePlaceholder": "Enter your name",
  "onboarding.getStarted": "Get Started",
  "onboarding.welcomeUser": "Welcome, {name}!",
  "onboarding.allSet": "You're all set. Let's start typing.",
  "onboarding.startLearning": "Start Learning",

  // Home
  "home.welcomeBack": "Welcome back, {name}!",
  "home.welcomeBackGeneric": "Welcome back!",
  "home.subtitle": "Keep up the practice to improve your typing speed.",
  "home.avgWpm": "Avg WPM",
  "home.avgAccuracy": "Avg Accuracy",
  "home.dayStreak": "Day Streak",
  "home.sessions": "Sessions",
  "home.courseProgress": "Course Progress",
  "home.lessonsCompleted": "{completed} / {total} lessons completed ({pct}%)",
  "home.viewAllLessons": "View All Lessons",
  "home.continueLearning": "Continue Learning",
  "home.startLesson": "Start Lesson",
  "home.recentSessions": "Recent Sessions",
  "home.viewAllStats": "View All Stats",
  "home.noSessions": "No sessions yet. Start your first lesson!",
  "home.beginNow": "Begin Now",

  // Lessons
  "lessons.title": "Lessons",
  "lessons.completed": "{count} / {total} completed",
  "lessons.done": "Done",
  "lessons.next": "Next",
  "lessons.unlocked": "Unlocked",
  "lessons.locked": "Locked",
  "lessons.target": "Target: {wpm} WPM",
  "lessons.acc": "{acc}% acc",
  "lessons.practiceAgain": "Practice Again",
  "lessons.start": "Start",
  "lessons.catHome": "Home Row",
  "lessons.catUpper": "Upper Row",
  "lessons.catLower": "Lower Row",
  "lessons.catNumbers": "Numbers",
  "lessons.catSymbols": "Punctuation & Speed",

  // Exercise
  "exercise.freePractice": "Free Practice",
  "exercise.drill": "Drill: {key}",
  "exercise.back": "Back",
  "exercise.wpm": "WPM",
  "exercise.accuracy": "Accuracy",
  "exercise.time": "Time",
  "exercise.clickToStart": "Click below and start typing to begin",
  "exercise.focusKeys": "Focus keys:",
  "exercise.lessonComplete": "Lesson Complete!",
  "exercise.exerciseDone": "Exercise Done!",
  "exercise.passed": "You hit {wpm} WPM with {acc}% accuracy — lesson passed!",
  "exercise.keepPracticing": "Keep practicing to reach {wpm} WPM and {acc}% accuracy.",
  "exercise.tryAgain": "Try Again",
  "exercise.backToLessons": "Back to Lessons",
  "exercise.showKeyboard": "Keyboard",
  "exercise.showFingerGuide": "Finger Guide",

  // Stats
  "stats.title": "Statistics",
  "stats.avgWpm": "Avg WPM",
  "stats.bestWpm": "Best WPM",
  "stats.avgAccuracy": "Avg Accuracy",
  "stats.dayStreak": "Day Streak",
  "stats.wpmOverTime": "WPM Over Time (last 20 sessions)",
  "stats.keysToPractice": "Keys to Practice",
  "stats.clickToDrill": "Click a key to drill it",
  "stats.errors": "{pct}% errors",
  "stats.sessionHistory": "Session History",
  "stats.noSessions": "No sessions yet. Complete a lesson to see stats.",

  // Settings
  "settings.title": "Settings",
  "settings.profile": "Profile",
  "settings.name": "Name",
  "settings.goals": "Goals",
  "settings.targetWpm": "Target WPM: {value}",
  "settings.targetAccuracy": "Target Accuracy: {value}%",
  "settings.preferences": "Preferences",
  "settings.visualFeedback": "Visual Feedback",
  "settings.visualFeedbackDesc": "Highlight correct / wrong keystrokes",
  "settings.keyboardLayout": "Keyboard Layout",
  "settings.language": "Language",
  "settings.save": "Save Settings",
  "settings.saved": "Saved!",

  // Keyboard layouts
  "layout.qwerty": "QWERTY (US)",
  "layout.azerty": "AZERTY (France)",
  "layout.qwertz": "QWERTZ (Swiss French)",

  // Languages
  "lang.en": "English",
  "lang.fr": "French",

  // Finger guide
  "fingerGuide.title": "Finger Placement Guide",
  "fingerGuide.leftPinky": "Left Pinky",
  "fingerGuide.leftRing": "Left Ring",
  "fingerGuide.leftMiddle": "Left Middle",
  "fingerGuide.leftIndex": "Left Index",
  "fingerGuide.rightIndex": "Right Index",
  "fingerGuide.rightMiddle": "Right Middle",
  "fingerGuide.rightRing": "Right Ring",
  "fingerGuide.rightPinky": "Right Pinky",
  "fingerGuide.thumbs": "Thumbs",
  "fingerGuide.homeKeys": "Home position: place index fingers on {left} and {right}",
}

const fr: Translations = {
  // Nav
  "nav.home": "Accueil",
  "nav.lessons": "Lecons",
  "nav.stats": "Statistiques",
  "nav.settings": "Parametres",

  // Onboarding
  "onboarding.welcome": "Bienvenue sur TypingMaster",
  "onboarding.description": "Apprenez la dactylographie etape par etape, suivez vos progres et ameliorez votre vitesse et precision.",
  "onboarding.nameLabel": "Comment vous appelez-vous ?",
  "onboarding.namePlaceholder": "Entrez votre nom",
  "onboarding.getStarted": "Commencer",
  "onboarding.welcomeUser": "Bienvenue, {name} !",
  "onboarding.allSet": "Vous etes pret. Commençons a taper.",
  "onboarding.startLearning": "Commencer les lecons",

  // Home
  "home.welcomeBack": "Bon retour, {name} !",
  "home.welcomeBackGeneric": "Bon retour !",
  "home.subtitle": "Continuez a pratiquer pour ameliorer votre vitesse de frappe.",
  "home.avgWpm": "MPM moy.",
  "home.avgAccuracy": "Precision moy.",
  "home.dayStreak": "Serie de jours",
  "home.sessions": "Sessions",
  "home.courseProgress": "Progression du cours",
  "home.lessonsCompleted": "{completed} / {total} lecons terminees ({pct}%)",
  "home.viewAllLessons": "Voir toutes les lecons",
  "home.continueLearning": "Continuer a apprendre",
  "home.startLesson": "Commencer la lecon",
  "home.recentSessions": "Sessions recentes",
  "home.viewAllStats": "Voir toutes les stats",
  "home.noSessions": "Aucune session pour le moment. Commencez votre premiere lecon !",
  "home.beginNow": "Commencer maintenant",

  // Lessons
  "lessons.title": "Lecons",
  "lessons.completed": "{count} / {total} terminees",
  "lessons.done": "Fait",
  "lessons.next": "Suivant",
  "lessons.unlocked": "Disponible",
  "lessons.locked": "Verrouille",
  "lessons.target": "Objectif : {wpm} MPM",
  "lessons.acc": "{acc}% prec.",
  "lessons.practiceAgain": "Refaire",
  "lessons.start": "Commencer",
  "lessons.catHome": "Rangee de base",
  "lessons.catUpper": "Rangee superieure",
  "lessons.catLower": "Rangee inferieure",
  "lessons.catNumbers": "Chiffres",
  "lessons.catSymbols": "Ponctuation & Vitesse",

  // Exercise
  "exercise.freePractice": "Pratique libre",
  "exercise.drill": "Exercice : {key}",
  "exercise.back": "Retour",
  "exercise.wpm": "MPM",
  "exercise.accuracy": "Precision",
  "exercise.time": "Temps",
  "exercise.clickToStart": "Cliquez ci-dessous et commencez a taper",
  "exercise.focusKeys": "Touches cibles :",
  "exercise.lessonComplete": "Lecon terminee !",
  "exercise.exerciseDone": "Exercice termine !",
  "exercise.passed": "Vous avez atteint {wpm} MPM avec {acc}% de precision — lecon reussie !",
  "exercise.keepPracticing": "Continuez pour atteindre {wpm} MPM et {acc}% de precision.",
  "exercise.tryAgain": "Reessayer",
  "exercise.backToLessons": "Retour aux lecons",
  "exercise.showKeyboard": "Clavier",
  "exercise.showFingerGuide": "Guide des doigts",

  // Stats
  "stats.title": "Statistiques",
  "stats.avgWpm": "MPM moy.",
  "stats.bestWpm": "Meilleur MPM",
  "stats.avgAccuracy": "Precision moy.",
  "stats.dayStreak": "Serie de jours",
  "stats.wpmOverTime": "MPM dans le temps (20 dernieres sessions)",
  "stats.keysToPractice": "Touches a travailler",
  "stats.clickToDrill": "Cliquez sur une touche pour la pratiquer",
  "stats.errors": "{pct}% erreurs",
  "stats.sessionHistory": "Historique des sessions",
  "stats.noSessions": "Aucune session. Terminez une lecon pour voir vos stats.",

  // Settings
  "settings.title": "Parametres",
  "settings.profile": "Profil",
  "settings.name": "Nom",
  "settings.goals": "Objectifs",
  "settings.targetWpm": "MPM cible : {value}",
  "settings.targetAccuracy": "Precision cible : {value}%",
  "settings.preferences": "Preferences",
  "settings.visualFeedback": "Retour visuel",
  "settings.visualFeedbackDesc": "Mettre en evidence les frappes correctes / incorrectes",
  "settings.keyboardLayout": "Disposition du clavier",
  "settings.language": "Langue",
  "settings.save": "Enregistrer",
  "settings.saved": "Enregistre !",

  // Keyboard layouts
  "layout.qwerty": "QWERTY (US)",
  "layout.azerty": "AZERTY (France)",
  "layout.qwertz": "QWERTZ (Suisse romande)",

  // Languages
  "lang.en": "Anglais",
  "lang.fr": "Francais",

  // Finger guide
  "fingerGuide.title": "Guide de placement des doigts",
  "fingerGuide.leftPinky": "Auriculaire gauche",
  "fingerGuide.leftRing": "Annulaire gauche",
  "fingerGuide.leftMiddle": "Majeur gauche",
  "fingerGuide.leftIndex": "Index gauche",
  "fingerGuide.rightIndex": "Index droit",
  "fingerGuide.rightMiddle": "Majeur droit",
  "fingerGuide.rightRing": "Annulaire droit",
  "fingerGuide.rightPinky": "Auriculaire droit",
  "fingerGuide.thumbs": "Pouces",
  "fingerGuide.homeKeys": "Position de base : placez les index sur {left} et {right}",
}

const TRANSLATIONS: Record<Language, Translations> = { en, fr }

export function t(lang: Language, key: string, params?: Record<string, string | number>): string {
  let text = TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v))
    }
  }
  return text
}
