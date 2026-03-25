import { type Language } from "./i18n"

export type PassageDifficulty = "easy" | "medium" | "hard"

interface LocalizedText {
  en: string
  fr: string
}

export interface Lesson {
  id: number
  title: LocalizedText
  description: LocalizedText
  keys: string[]
  targetWPM: number
  targetAccuracy: number
  minDuration: number
  category: "home" | "upper" | "lower" | "numbers" | "symbols"
  difficulty: PassageDifficulty
}

const LESSON_TEXT_OVERRIDES: Partial<Record<number, Record<Language, string[]>>> = {
  1: {
    en: [
      "a sad dad asks a lad",
      "a fast lad adds a scarf",
      "dad adds a salad as a fad",
      "a glad lass asks for salad",
    ],
    fr: [
      "a sa da sa fa",
      "la sala va a la salle",
      "dada a sa salade a la salle",
      "sa fala la salle a la salle",
    ],
  },
  2: {
    en: [
      "jill will kick a silk jell",
      "jkl jkl like silk",
      "jill skill still looks well",
      "kill the lull and like the skill",
    ],
    fr: [
      "ji ki li ji ki li",
      "lili a lu le lilas joli",
      "le kali li le joli lilas",
      "lili lit le joli livre",
    ],
  },
  3: {
    en: [
      "all kids ask if jill falls",
      "dad asks jill for a flask",
      "skill and salad fill the hall",
      "a lad still asks jill for silk",
    ],
    fr: [
      "la fille lit le livre a la salle",
      "le gars a mis la salade ici",
      "lili a la clef et la laisse ici",
      "la fille a dit que le sac est la",
    ],
  },
  4: {
    en: [
      "glad halls flash with high flags",
      "hash and gash fade in the hall",
      "the glad ghost has a high laugh",
      "flash the glass and hang the flag",
    ],
    fr: [
      "hugo a glisse le galet a la gare",
      "le chat a happe la glace du gars",
      "gala et hugo changent de logis",
      "le gars a cache la hache au hangar",
    ],
  },
  5: {
    en: [
      "eve will smile while she rides inside",
      "the rider sees the hillside in silence",
      "he is still inside while jill smiles",
      "the little fire is seen in the field",
    ],
    fr: [
      "le sire relit le livre de l ile",
      "le fil relie six idees et des rires",
      "denis visite le site de l eglise",
      "le ministre ecrit vite et relit ici",
    ],
  },
  6: {
    en: [
      "rural rivers run under ruined towers",
      "our runner turns up after sunrise",
      "the ruler returns to us after a run",
      "true runners use sure and regular turns",
    ],
    fr: [
      "le roi arrive sur la rue du port",
      "bruno trouve la route et ouvre la porte",
      "le ruban rouge tourne sur le mur du salon",
      "la troupe du roi arrive au jour du retour",
    ],
  },
  7: {
    en: [
      "they try to stay steady in the tiny yard",
      "the young envoy writes a tidy story today",
      "tiny yellow torches stay dry in the yard",
      "the trusty party waits by the city gate",
    ],
    fr: [
      "tybalt quitte la cour et rejoint le chateau",
      "le valet observe la cite et note le trajet",
      "yves et thierry saluent le capitaine du roi",
      "le page nettoie la table et range le stylet",
    ],
  },
  8: {
    en: [
      "clean notes can trace each action in the scene",
      "a captain can notice each nuance at once",
      "the count can cancel no command at court",
      "constance can conceal a secret in plain sight",
    ],
    fr: [
      "Constance cache une lettre dans la niche du couvent.",
      "Le capitaine annonce cinq consignes dans la cuisine.",
      "La reine avance en silence vers la chambre du conseil.",
      "Ce novice trace encore cinq cercles dans la cour ancienne.",
    ],
  },
  9: {
    en: [
      "the brave messenger moves with calm and nerve",
      "a velvet banner moves over the stone wall",
      "marvel and valor matter in every move",
      "the envoy saves a moment with a clever move",
    ],
    fr: [
      "Le mousquetaire avance vers la grande ville en mars.",
      "Milady observe le mouvement du carrosse dans l'avenue.",
      "Le valet revient avec une missive pour madame de Chevreuse.",
      "La rumeur arrive vite, mais le service demeure calme.",
    ],
  },
  10: {
    en: [
      "the wizard writes six exact words with zeal",
      "we watch the next envoy cross the plaza",
      "the queen sees a wax seal fixed to the box",
      "swift winds mix with the noise of the square",
    ],
    fr: [
      "Le page explique aux voisins pourquoi ce message est exact.",
      "Xavier observe le visage du marquis depuis la croisée.",
      "Le deuxième convoi traverse la place sous un vent assez vif.",
      "La reine exige un texte précis avant de quitter le palais.",
    ],
  },
}

const PASSAGES: Record<Language, Record<PassageDifficulty, string[]>> = {
  en: {
    easy: [
      "As for the gift you give me, let it be a keepsake.",
      "It's so much nicer for you to ride than go on foot.",
      "And I, with the same grief, I died and met my fate.",
      "Not even an older man could speak and do as well.",
      "No, here's what I'll do, it's what seems best to me.",
      "Now she lit a fire and made her supper in the room.",
      "Did he bring some news of your father, his return?",
      "My father is worlds away, dead or alive, who knows?",
    ],
    medium: [
      "And tell me this for a fact, I need to know, where on earth am I?",
      "Odysseus is my father, there was a man, or was he all a dream?",
      "On the same trip do I go and give the news to King Laertes too?",
      "For you, I have some good advice, if only you will accept it.",
      "All men need the gods, but the man is younger, just about my age.",
      "But among men, I must say, few if any could rival me in riches.",
      "I'd no desire to go on living and see the rising light of day.",
      "So now, as in years gone by, let us press on and grant him escort.",
      "No doubt you will pay them back in blood when you come home.",
      "Why, the moment I saw it, here before my eyes, I knew it was a sign.",
    ],
    hard: [
      "First by far to see her was Prince Telemachus, sitting among the suitors, heart obsessed with grief.",
      "But now the suitors trooped in with all their swagger and took their seats on low and high-backed chairs.",
      "Our ship lies moored off farmlands far from town, riding in Rithron Cove, beneath Mount Nion's woods.",
      "Ilus refused, he feared the wrath of the everlasting gods, but father, so fond of him, gave him all he wanted.",
      "I beg you by Olympian Zeus, by Themis too, who sets assemblies free and calls us into session, stop, my friends!",
      "Better for me if you were devouring all my treasure, all my cattle, if you were the ones, we'd make amends in no time.",
      "We'd approach you for reparations round the town, demanding our goods till you'd returned the lot.",
      "Only Antinous, who found it in himself to say, so high and mighty, Telemachus, such unbridled rage!",
      "It's not the suitors here who deserve the blame, it's your own dear mother, the matchless queen of cunning.",
      "Then to all these Pylians, for their splendid rites, grant a reward that warms their gracious hearts.",
    ],
  },
  fr: {
    easy: [
      "Le roi parle a ses gardes dans la salle.",
      "D Artagnan part a Paris avec son cheval.",
      "Athos parle bas et Porthos rit tres fort.",
      "Aramis va a la porte et salue le garde.",
      "Le page court dans la cour puis va au logis.",
      "Le valet sert le repas dans la grande salle.",
      "Le roi voit la carte et parle de la route.",
      "Le jeune gascon va vite et garde son sang froid.",
    ],
    medium: [
      "Oui, et la France va payer d'une guerre le refus de son roi.",
      "Non pas, s'il vous plaît, mon bel ami ; non, pas ici, du moins.",
      "Venez, mes braves, dit le roi, venez ; j'ai à vous gronder.",
      "Ceci n'est pas mon secret, je ne puis donc pas vous le dire.",
      "Et vous dites qu'un de vos amis demeure dans cette maison ?",
      "Mais ce n'est pas un nom d'homme, ça, c'est un nom de montagne !",
      "Je ne sais pas si je devrais vous dire ce que je soupçonne.",
      "Mais je ne sais pas si je ne commets pas une grande imprudence ?",
      "Il le fera comme il le dit, reprit Porthos, il le fera tôt ou tard.",
      "Je sais bien que vous ne tournez pas le dos aux vôtres, vous.",
    ],
    hard: [
      "Je n'ai, mon fils, à vous donner que quinze écus, mon cheval et les conseils que vous venez d'entendre.",
      "Il a commencé comme vous ; allez le voir avec cette lettre, et réglez-vous sur lui, afin de faire comme lui.",
      "De Tréville, et il faut qu'elle se retrouve ; ou si elle ne se retrouve pas, il saura bien la faire retrouver, lui !",
      "Il ne risquait pas davantage à dire vingt mille, mais une certaine pudeur juvénile le retint.",
      "Un trait de lumière frappa tout à coup l'esprit de l'hôte, qui se donnait au diable en ne trouvant rien.",
      "Que voulez-vous, disait le mousquetaire, la mode en vient ; c'est une folie, je le sais bien, mais c'est la mode.",
      "Quant à vous, mon cher, vous avez un trop magnifique baudrier pour être bien fort là-dessus.",
      "Voyons, vous, Porthos, n'avez-vous un si beau baudrier d'or que pour y suspendre une épée de paille ?",
      "Non, répondit d'Artagnan piqué, non, et grâce à mes yeux je vois même ce que ne voient pas les autres.",
      "Le mouchoir était en effet richement brodé et portait une couronne et des armes à l'un de ses coins.",
    ],
  },
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: { en: "Home Row - Left Hand", fr: "Rangée de base - Main gauche" },
    description: { en: "Start with the left hand home row keys", fr: "Commencez avec les touches de base de la main gauche" },
    keys: ["a", "s", "d", "f"],
    targetWPM: 15,
    targetAccuracy: 95,
    minDuration: 60,
    category: "home",
    difficulty: "easy",
  },
  {
    id: 2,
    title: { en: "Home Row - Right Hand", fr: "Rangée de base - Main droite" },
    description: { en: "Practice the right hand home row keys", fr: "Pratiquez les touches de base de la main droite" },
    keys: ["j", "k", "l"],
    targetWPM: 15,
    targetAccuracy: 95,
    minDuration: 60,
    category: "home",
    difficulty: "easy",
  },
  {
    id: 3,
    title: { en: "Home Row - Full", fr: "Rangée de base complète" },
    description: { en: "Combine both hands on the home row", fr: "Combinez les deux mains sur la rangée de base" },
    keys: ["a", "s", "d", "f", "j", "k", "l"],
    targetWPM: 20,
    targetAccuracy: 95,
    minDuration: 120,
    category: "home",
    difficulty: "easy",
  },
  {
    id: 4,
    title: { en: "Adding G and H", fr: "Ajout de G et H" },
    description: { en: "Extend the home row with G and H", fr: "Étendez la rangée de base avec G et H" },
    keys: ["g", "h"],
    targetWPM: 20,
    targetAccuracy: 95,
    minDuration: 120,
    category: "home",
    difficulty: "easy",
  },
  {
    id: 5,
    title: { en: "Upper Row - E and I", fr: "Rangée supérieure - E et I" },
    description: { en: "Reach for E and I while keeping rhythm", fr: "Atteignez E et I sans perdre le rythme" },
    keys: ["e", "i"],
    targetWPM: 22,
    targetAccuracy: 95,
    minDuration: 120,
    category: "upper",
    difficulty: "medium",
  },
  {
    id: 6,
    title: { en: "Upper Row - R and U", fr: "Rangée supérieure - R et U" },
    description: { en: "Add R and U to your reach", fr: "Ajoutez R et U à votre geste" },
    keys: ["r", "u"],
    targetWPM: 25,
    targetAccuracy: 95,
    minDuration: 120,
    category: "upper",
    difficulty: "medium",
  },
  {
    id: 7,
    title: { en: "Upper Row - T and Y", fr: "Rangée supérieure - T et Y" },
    description: { en: "Extend the top row with T and Y", fr: "Complétez la rangée supérieure avec T et Y" },
    keys: ["t", "y"],
    targetWPM: 25,
    targetAccuracy: 95,
    minDuration: 120,
    category: "upper",
    difficulty: "medium",
  },
  {
    id: 8,
    title: { en: "Lower Row - C and N", fr: "Rangée inférieure - C et N" },
    description: { en: "Learn the lower row with C and N", fr: "Travaillez la rangée inférieure avec C et N" },
    keys: ["c", "n"],
    targetWPM: 25,
    targetAccuracy: 95,
    minDuration: 120,
    category: "lower",
    difficulty: "medium",
  },
  {
    id: 9,
    title: { en: "Lower Row - V and M", fr: "Rangée inférieure - V et M" },
    description: { en: "Add V and M to the lower row", fr: "Ajoutez V et M à la rangée inférieure" },
    keys: ["v", "m"],
    targetWPM: 28,
    targetAccuracy: 95,
    minDuration: 120,
    category: "lower",
    difficulty: "medium",
  },
  {
    id: 10,
    title: { en: "Full Alphabet - W X Z", fr: "Alphabet complet - W X Z" },
    description: { en: "Complete the alphabet with the last difficult letters", fr: "Terminez l'alphabet avec les dernières lettres difficiles" },
    keys: ["w", "x", "z"],
    targetWPM: 30,
    targetAccuracy: 95,
    minDuration: 180,
    category: "lower",
    difficulty: "medium",
  },
  {
    id: 11,
    title: { en: "Numbers Row 1-5", fr: "Rangée des chiffres 1-5" },
    description: { en: "Practice the first half of the number row", fr: "Travaillez la première moitié de la rangée des chiffres" },
    keys: ["1", "2", "3", "4", "5"],
    targetWPM: 25,
    targetAccuracy: 95,
    minDuration: 180,
    category: "numbers",
    difficulty: "hard",
  },
  {
    id: 12,
    title: { en: "Numbers 6-0", fr: "Rangée des chiffres 6-0" },
    description: { en: "Finish the number row", fr: "Terminez la rangée des chiffres" },
    keys: ["6", "7", "8", "9", "0"],
    targetWPM: 25,
    targetAccuracy: 95,
    minDuration: 180,
    category: "numbers",
    difficulty: "hard",
  },
  {
    id: 13,
    title: { en: "Punctuation", fr: "Ponctuation" },
    description: { en: "Handle punctuation with literary passages", fr: "Travaillez la ponctuation avec des extraits littéraires" },
    keys: [".", "!", "?"],
    targetWPM: 30,
    targetAccuracy: 95,
    minDuration: 180,
    category: "symbols",
    difficulty: "hard",
  },
  {
    id: 14,
    title: { en: "Real Words Practice", fr: "Phrases réelles" },
    description: { en: "Practice medium passages from the Odyssey", fr: "Travaillez des extraits moyens des Trois Mousquetaires" },
    keys: [],
    targetWPM: 35,
    targetAccuracy: 95,
    minDuration: 300,
    category: "symbols",
    difficulty: "medium",
  },
  {
    id: 15,
    title: { en: "Speed Challenge", fr: "Défi vitesse" },
    description: { en: "Type harder passages at speed", fr: "Tapez des extraits plus difficiles à grande vitesse" },
    keys: [],
    targetWPM: 45,
    targetAccuracy: 95,
    minDuration: 300,
    category: "symbols",
    difficulty: "hard",
  },
]

function uniqueTexts(texts: string[]): string[] {
  return [...new Set(texts)]
}

// Pick `count` unique items at random; if pool is smaller, cycle through shuffled pool.
function pickMultiple(pool: string[], count: number): string {
  if (pool.length === 0) return ""
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(shuffled[i % shuffled.length])
  }
  return result.join(" ")
}

const PASSAGE_COUNT: Record<PassageDifficulty, number> = {
  easy: 8,
  medium: 6,
  hard: 5,
}

function getProgressiveEnglishPool(currentLesson: number): string[] {
  if (currentLesson <= 4) return uniqueTexts([...PASSAGES.en.easy])
  if (currentLesson <= 8) return uniqueTexts([...PASSAGES.en.easy, ...PASSAGES.en.medium])
  return uniqueTexts([...PASSAGES.en.medium, ...PASSAGES.en.hard])
}

function getProgressiveFrenchPool(currentLesson: number): string[] {
  if (currentLesson <= 4) {
    return uniqueTexts([
      ...(LESSON_TEXT_OVERRIDES[1]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[2]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[3]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[4]?.fr ?? []),
    ])
  }

  if (currentLesson <= 7) {
    return uniqueTexts([
      ...(LESSON_TEXT_OVERRIDES[5]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[6]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[7]?.fr ?? []),
    ])
  }

  if (currentLesson <= 10) {
    return uniqueTexts([
      ...(LESSON_TEXT_OVERRIDES[8]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[9]?.fr ?? []),
      ...(LESSON_TEXT_OVERRIDES[10]?.fr ?? []),
      ...PASSAGES.fr.medium,
    ])
  }

  return uniqueTexts([...PASSAGES.fr.medium, ...PASSAGES.fr.hard])
}

function getAllPassages(lang: Language): string[] {
  return [...PASSAGES[lang].easy, ...PASSAGES[lang].medium, ...PASSAGES[lang].hard]
}

export function getLessonById(id: number): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id)
}

export function getLessonText(lessonId: number, lang: Language, strictLiterary = false): string {
  if (!strictLiterary) {
    const overrideTexts = LESSON_TEXT_OVERRIDES[lessonId]?.[lang]
    if (overrideTexts && overrideTexts.length > 0) {
      return pickMultiple(overrideTexts, Math.min(overrideTexts.length, 5))
    }
  }

  const lesson = getLessonById(lessonId)
  const difficulty: PassageDifficulty = lesson?.difficulty ?? "medium"
  return pickMultiple(PASSAGES[lang][difficulty], PASSAGE_COUNT[difficulty])
}

export function generateDrillText(key: string, lang: Language, currentLesson = 1, strictLiterary = false): string {
  const normalizedKey = key.toLowerCase()
  const sourceTexts = lang === "fr"
    ? (strictLiterary ? getAllPassages(lang) : getProgressiveFrenchPool(currentLesson))
    : getProgressiveEnglishPool(currentLesson)
  const matches = sourceTexts.filter((text) => {
    const lower = text.toLowerCase()
    const occurrences = lower.split(normalizedKey).length - 1
    return occurrences >= 2
  })

  const pool = matches.length > 0 ? matches : sourceTexts
  return pickMultiple(pool, PASSAGE_COUNT.medium)
}

export function getFreePracticeText(lang: Language, currentLesson = 1, strictLiterary = false): string {
  if (lang === "fr") {
    const pool = strictLiterary
      ? [...PASSAGES.fr.medium, ...PASSAGES.fr.hard]
      : getProgressiveFrenchPool(currentLesson)
    return pickMultiple(pool, PASSAGE_COUNT.medium)
  }

  return pickMultiple(getProgressiveEnglishPool(currentLesson), PASSAGE_COUNT.medium)
}

export function getLessonSource(lang: Language): string {
  return lang === "fr" ? "Les Trois Mousquetaires" : "The Odyssey"
}

export function getPracticeStageKey(lang: Language, currentLesson: number, strictLiterary = false): string | null {
  if (lang !== "fr") return null
  if (strictLiterary) return "practiceStage.frLiterary"
  if (currentLesson <= 4) return "practiceStage.frStarter"
  if (currentLesson <= 7) return "practiceStage.frBridge"
  if (currentLesson <= 10) return "practiceStage.frAccentIntro"
  return "practiceStage.frLiterary"
}

export function getDifficultyLabelKey(difficulty: PassageDifficulty): string {
  return `difficulty.${difficulty}`
}

export function isLessonUnlocked(_lessonId: number, _completedIds: number[]): boolean {
  return true
}
