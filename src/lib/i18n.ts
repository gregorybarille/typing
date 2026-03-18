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
  "home.quickPractice": "Quick Practice",

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
  "lessons.difficulty": "Difficulty: {level}",
  "exercise.source": "Source: {source}",
  "exercise.stage": "Stage: {label}",

  // Difficulty
  "difficulty.easy": "Easy",
  "difficulty.medium": "Medium",
  "difficulty.hard": "Hard",

  // Practice stages
  "practiceStage.frStarter": "French starter text without accents",
  "practiceStage.frBridge": "French transition text with simple words",
  "practiceStage.frAccentIntro": "French text with light accents",
  "practiceStage.frLiterary": "Full literary French",

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
  "exercise.nextLesson": "Next Lesson",
  "exercise.showKeyboard": "Keyboard",
  "exercise.showFingerGuide": "Finger Guide",
  "exercise.freeMode": "Free Mode",
  "exercise.freeModeDesc": "Type freely — no target text, just track your speed",
  "exercise.stopFree": "Stop",
  "exercise.dictation": "Dictation",
  "exercise.dictationDesc": "Enter a sentence for someone to type",
  "exercise.dictationInput": "Enter the sentence to dictate:",
  "exercise.dictationStart": "Start Dictation",
  "exercise.dictationPlaceholder": "Type or paste the sentence here…",

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
  "settings.strictLiteraryFrench": "Strict Literary French",
  "settings.strictLiteraryFrenchDesc": "Skip beginner progression — always use full literary French passages",
  "settings.appearance": "Appearance",
  "settings.accentColor": "Accent Color",

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
  "nav.lessons": "Leçons",
  "nav.stats": "Statistiques",
  "nav.settings": "Paramètres",

  // Onboarding
  "onboarding.welcome": "Bienvenue sur TypingMaster",
  "onboarding.description": "Apprenez la dactylographie étape par étape, suivez vos progrès et améliorez votre vitesse et votre précision.",
  "onboarding.nameLabel": "Comment vous appelez-vous ?",
  "onboarding.namePlaceholder": "Entrez votre nom",
  "onboarding.getStarted": "Commencer",
  "onboarding.welcomeUser": "Bienvenue, {name} !",
  "onboarding.allSet": "Vous êtes prêt. Commençons à taper.",
  "onboarding.startLearning": "Commencer les leçons",

  // Home
  "home.welcomeBack": "Bon retour, {name} !",
  "home.welcomeBackGeneric": "Bon retour !",
  "home.subtitle": "Continuez à pratiquer pour améliorer votre vitesse de frappe.",
  "home.avgWpm": "MPM moy.",
  "home.avgAccuracy": "Précision moy.",
  "home.dayStreak": "Série de jours",
  "home.sessions": "Sessions",
  "home.courseProgress": "Progression du cours",
  "home.lessonsCompleted": "{completed} / {total} leçons terminées ({pct}%)",
  "home.viewAllLessons": "Voir toutes les leçons",
  "home.continueLearning": "Continuer à apprendre",
  "home.startLesson": "Commencer la leçon",
  "home.recentSessions": "Sessions récentes",
  "home.viewAllStats": "Voir toutes les stats",
  "home.noSessions": "Aucune session pour le moment. Commencez votre première leçon !",
  "home.beginNow": "Commencer maintenant",
  "home.quickPractice": "Pratique rapide",

  // Lessons
  "lessons.title": "Leçons",
  "lessons.completed": "{count} / {total} terminées",
  "lessons.done": "Fait",
  "lessons.next": "Suivant",
  "lessons.unlocked": "Disponible",
  "lessons.locked": "Verrouillé",
  "lessons.target": "Objectif : {wpm} MPM",
  "lessons.acc": "{acc}% préc.",
  "lessons.practiceAgain": "Refaire",
  "lessons.start": "Commencer",
  "lessons.catHome": "Rangée de base",
  "lessons.catUpper": "Rangée supérieure",
  "lessons.catLower": "Rangée inférieure",
  "lessons.catNumbers": "Chiffres",
  "lessons.catSymbols": "Ponctuation & Vitesse",
  "lessons.difficulty": "Difficulté : {level}",
  "exercise.source": "Source : {source}",
  "exercise.stage": "Niveau : {label}",

  // Difficulty
  "difficulty.easy": "Facile",
  "difficulty.medium": "Moyenne",
  "difficulty.hard": "Difficile",

  // Practice stages
  "practiceStage.frStarter": "Français débutant sans accents",
  "practiceStage.frBridge": "Français de transition avec mots simples",
  "practiceStage.frAccentIntro": "Français avec accents légers",
  "practiceStage.frLiterary": "Français littéraire complet",

  // Exercise
  "exercise.freePractice": "Pratique libre",
  "exercise.drill": "Exercice : {key}",
  "exercise.back": "Retour",
  "exercise.wpm": "MPM",
  "exercise.accuracy": "Précision",
  "exercise.time": "Temps",
  "exercise.clickToStart": "Cliquez ci-dessous et commencez à taper",
  "exercise.focusKeys": "Touches cibles :",
  "exercise.lessonComplete": "Leçon terminée !",
  "exercise.exerciseDone": "Exercice terminé !",
  "exercise.passed": "Vous avez atteint {wpm} MPM avec {acc}% de précision — leçon réussie !",
  "exercise.keepPracticing": "Continuez pour atteindre {wpm} MPM et {acc}% de précision.",
  "exercise.tryAgain": "Réessayer",
  "exercise.backToLessons": "Retour aux leçons",
  "exercise.nextLesson": "Leçon suivante",
  "exercise.showKeyboard": "Clavier",
  "exercise.showFingerGuide": "Guide des doigts",
  "exercise.freeMode": "Mode Libre",
  "exercise.freeModeDesc": "Tapez librement — sans texte cible, seulement votre vitesse",
  "exercise.stopFree": "Arrêter",
  "exercise.dictation": "Dictée",
  "exercise.dictationDesc": "Entrez une phrase à faire taper",
  "exercise.dictationInput": "Entrez la phrase à dicter :",
  "exercise.dictationStart": "Commencer la dictée",
  "exercise.dictationPlaceholder": "Tapez ou collez la phrase ici…",

  // Stats
  "stats.title": "Statistiques",
  "stats.avgWpm": "MPM moy.",
  "stats.bestWpm": "Meilleur MPM",
  "stats.avgAccuracy": "Précision moy.",
  "stats.dayStreak": "Série de jours",
  "stats.wpmOverTime": "MPM dans le temps (20 dernières sessions)",
  "stats.keysToPractice": "Touches à travailler",
  "stats.clickToDrill": "Cliquez sur une touche pour la pratiquer",
  "stats.errors": "{pct}% erreurs",
  "stats.sessionHistory": "Historique des sessions",
  "stats.noSessions": "Aucune session. Terminez une leçon pour voir vos stats.",

  // Settings
  "settings.title": "Paramètres",
  "settings.profile": "Profil",
  "settings.name": "Nom",
  "settings.goals": "Objectifs",
  "settings.targetWpm": "MPM cible : {value}",
  "settings.targetAccuracy": "Précision cible : {value}%",
  "settings.preferences": "Préférences",
  "settings.visualFeedback": "Retour visuel",
  "settings.visualFeedbackDesc": "Mettre en évidence les frappes correctes / incorrectes",
  "settings.keyboardLayout": "Disposition du clavier",
  "settings.language": "Langue",
  "settings.save": "Enregistrer",
  "settings.saved": "Enregistré !",
  "settings.strictLiteraryFrench": "Français littéraire strict",
  "settings.strictLiteraryFrenchDesc": "Ignorer la progression débutant — toujours utiliser des extraits littéraires complets",
  "settings.appearance": "Apparence",
  "settings.accentColor": "Couleur d'accentuation",

  // Keyboard layouts
  "layout.qwerty": "QWERTY (US)",
  "layout.azerty": "AZERTY (France)",
  "layout.qwertz": "QWERTZ (Suisse romande)",

  // Languages
  "lang.en": "Anglais",
  "lang.fr": "Français",

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
