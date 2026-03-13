export interface Lesson {
  id: number;
  title: string;
  description: string;
  keys: string[];
  targetWPM: number;
  targetAccuracy: number;
  minDuration: number;
  texts: string[];
  category: "home" | "upper" | "lower" | "numbers" | "symbols";
}

export const LESSONS: Lesson[] = [
  {
    id: 1, title: "Home Row - Left Hand", description: "Master the left home row: A S D F",
    keys: ["a","s","d","f"], targetWPM: 15, targetAccuracy: 95, minDuration: 60, category: "home",
    texts: ["add sad fad dad ass fas das","a sad lad had a flask add a dash","all falls fads dads asks","dad adds a salad fast","fads fall as dads asks"],
  },
  {
    id: 2, title: "Home Row - Right Hand", description: "Master the right home row: J K L",
    keys: ["j","k","l"], targetWPM: 15, targetAccuracy: 95, minDuration: 60, category: "home",
    texts: ["jkl lkj jll kll jkl","like kill jell lull silk","skill still kills jell","lull skill silk","kill lull jill keel"],
  },
  {
    id: 3, title: "Home Row - Full", description: "Combine both hands on the home row",
    keys: ["a","s","d","f","j","k","l"], targetWPM: 20, targetAccuracy: 95, minDuration: 120, category: "home",
    texts: ["flask skill falls kids ask dads","all kids shall fall like silk","a lad falls as a disk skids","dads ask kids kids ask dads","flask falls silk skids kids fall"],
  },
  {
    id: 4, title: "Adding G and H", description: "Extend home row with G and H keys",
    keys: ["g","h"], targetWPM: 20, targetAccuracy: 95, minDuration: 120, category: "home",
    texts: ["glad has high flash shall","shall glad high has flash","high halls glad dash hash","flash high glad ash gash","has hash flash glad high"],
  },
  {
    id: 5, title: "Upper Row - E and I", description: "Reach up for E and I",
    keys: ["e","i"], targetWPM: 22, targetAccuracy: 95, minDuration: 120, category: "upper",
    texts: ["kids like side hike silk","she is inside a field","high skill slide file size","slide like a fish inside","she filed like skilled kids"],
  },
  {
    id: 6, title: "Upper Row - R and U", description: "Learn R and U keys",
    keys: ["r","u"], targetWPM: 25, targetAccuracy: 95, minDuration: 120, category: "upper",
    texts: ["ruse sure rule fur rural","rules are sure for rural use","fur sure rules are useful","rural rules sure are","sure useful rules fur"],
  },
  {
    id: 7, title: "Upper Row - T and Y", description: "Extend with T and Y",
    keys: ["t","y"], targetWPM: 25, targetAccuracy: 95, minDuration: 120, category: "upper",
    texts: ["they try truly just stay","the truly just stay light","try to get the right style","style truly gets you there","they try to get it right"],
  },
  {
    id: 8, title: "Lower Row - C and N", description: "Learn the lower row: C and N",
    keys: ["c","n"], targetWPM: 25, targetAccuracy: 95, minDuration: 120, category: "lower",
    texts: ["nice clean code can run","clean nice code runs nicely","can nice clean run code","nice clean running code","clean code can run nicely"],
  },
  {
    id: 9, title: "Lower Row - V and M", description: "Add V and M to your repertoire",
    keys: ["v","m"], targetWPM: 28, targetAccuracy: 95, minDuration: 120, category: "lower",
    texts: ["move vim name marvel","vim moves names marvel","move name vim marvel","vim marvel move names","name move marvel vim"],
  },
  {
    id: 10, title: "Full Alphabet - W X Z", description: "Complete the alphabet with W, X, Z",
    keys: ["w","x","z"], targetWPM: 30, targetAccuracy: 95, minDuration: 180, category: "lower",
    texts: ["wax zero flex box wizard","zero wax wizard flex box","the wizard can flex with wax","zero boxes fix the wizard","wax wizard flex zero box"],
  },
  {
    id: 11, title: "Numbers Row 1-5", description: "Learn the number keys 1-5",
    keys: ["1","2","3","4","5"], targetWPM: 25, targetAccuracy: 95, minDuration: 180, category: "numbers",
    texts: ["12 34 15 23 45 13 24 35","type 123 then 45 or 234","1 and 2 make 3 with 4 and 5","1234 5432 1234 5432","12345 54321 12345"],
  },
  {
    id: 12, title: "Numbers 6-0", description: "Master the rest of the number row",
    keys: ["6","7","8","9","0"], targetWPM: 25, targetAccuracy: 95, minDuration: 180, category: "numbers",
    texts: ["67 89 70 68 79 60 78","type 678 then 90 or 789","67890 09876 67890","6 and 7 make 8 with 9 and 0","6789 9876 6789"],
  },
  {
    id: 13, title: "Punctuation", description: "Master common punctuation marks",
    keys: [".","!","?"], targetWPM: 30, targetAccuracy: 95, minDuration: 180, category: "symbols",
    texts: ["Hello world. How are you?","Wait really? Yes indeed!","Is it true? Yes. Really!","Come here please. Wait!","Are you sure? Yes I am!"],
  },
  {
    id: 14, title: "Real Words Practice", description: "Type real English sentences fluently",
    keys: [], targetWPM: 35, targetAccuracy: 95, minDuration: 300, category: "symbols",
    texts: [
      "The quick brown fox jumps over the lazy dog.",
      "Pack my box with five dozen liquor jugs.",
      "How vexingly quick daft zebras jump.",
      "The five boxing wizards jump quickly.",
      "Sphinx of black quartz judge my vow.",
    ],
  },
  {
    id: 15, title: "Speed Challenge", description: "Push your speed with varied sentences",
    keys: [], targetWPM: 45, targetAccuracy: 95, minDuration: 300, category: "symbols",
    texts: [
      "Practice makes perfect and speed will follow with patience.",
      "Touch typing is a skill that improves with daily deliberate practice.",
      "The best way to learn touch typing is through consistent repetition.",
      "Keep your eyes on the screen and trust your fingers to find the keys.",
      "Speed and accuracy both improve when you focus on the correct technique.",
    ],
  },
];

export function getLessonById(id: number): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function isLessonUnlocked(lessonId: number, completedIds: number[]): boolean {
  if (lessonId === 1) return true;
  return completedIds.includes(lessonId - 1);
}

export const DRILL_SENTENCES: Record<string, string[]> = {
  a: ["all ants are able to add and ask","a sad lad had a flask and asked dad","all animals act as amazing ambassadors"],
  b: ["big blue birds bring bright berries","bob built a big brown barn beside brook","bold bears boldly brave the bitter blizzard"],
  c: ["cool cats can catch clever creatures","careful cooks create classic crispy cuisine","curious cats consistently climb cedar cliffs"],
  d: ["dogs dance daily during dark december","delightful ducks dive deep during daylight","dozens of dogs dash down dusty dirt drives"],
  e: ["every elephant eats elegant emerald leaves","eagles eagerly explore each enormous evergreen","eleven eager eagles eat elegant evening meals"],
  f: ["five frogs find fresh food fast","funny foxes flip fluffy feathers freely","fresh flowers float free from far fields"],
  g: ["green grapes grow gloriously in gardens","glad gorillas gracefully greet golden guests","great gray geese graze gently on grass"],
  h: ["happy horses hop high through the hills","helpful hens happily harvest hearty herbs here","huge hippos huddle here hoping heat helps"],
  i: ["icy igloos inspire interesting imaginative ideas","intelligent insects inspect intricate ivory items","incredibly intricate insect images invite intense interest"],
  j: ["jolly jesters juggle jars in july","jaguars jump joyfully just before june","just juggling jelly jars joyfully in january"],
  k: ["kind kings keep kites knotted to keys","knowledgeable kids kick kicking kangaroos kindly","keen kittens keenly keep knocking kitchen kettles"],
  l: ["large lions leap lightly like little lambs","lovely ladies leave lush lavender lily lands","lazy llamas linger lazily licking lemon lollipops"],
  m: ["many mice make music in the meadow","magnificent moths move mainly past moonlit marshes","mighty mountains magnify many magnificent morning moments"],
  n: ["nine nimble newts navigate narrow northern nights","numerous noble knights never neglect natural needs","new noon naps never negatively narrow nighttime"],
  o: ["old owls observe the ocean on october","odd otters often open orange outdoor ovens","our old oak offers ordinary occupants odd overtime"],
  p: ["happy people play piano perfectly past midnight","purple parrots perch proudly picking plump plums","pretty pink ponies prance past purple pine parks"],
  q: ["quite quickly queens question quaint quill quality","quirky quiet quails quest quite quietly quickly","quartz quickly quotes quality questions quite quietly"],
  r: ["red robins run rapidly round the rocks","rolling rivers rush rapidly round rough rocky ridges","round red roses rarely require rigorous routine repair"],
  s: ["six snakes slide swiftly south seeking shade","small snails slowly slide since sunrise seems slow","seven silver swans swim silently since spring started"],
  t: ["ten tiny turtles trek through thick trees","the thirty tiny tots trot through the town","tall trees tower triumphantly throughout their territory today"],
  u: ["unique unicorns usually use unusual urban routes","under unusual umbrellas unusual uncles usually unite us","unique unusual users ultimately understand ultimate unity"],
  v: ["vivid violins vibrate vigorously vaulting vast valleys","vast violet vines vividly validate very vibrant views","very vivid valuable vases vanish via various venues"],
  w: ["wild wolves wander west watching winter weather","with warm winds we walked while wearing wool","wide western woods welcome wandering wildlife watching warmly"],
  x: ["exercise extra xerography expert exactly six foxes mixing","extra oxygen fixes textbook examples six mixing boxes","foxes fix six boxes exactly mixing extra oxygen"],
  y: ["yellow yaks yell yearly yet yield yearly","young yaks yearly yawn yearning yonder yesterday","your yellow yacht yields yet yonder yearning yearly"],
  z: ["zesty zebras zigzag zero zones zealously","zero zesty zebras zealously zig zag zones","zeal zebras zero zones zig zapping zealously"],
};

export function generateDrillText(key: string): string {
  const sentences = DRILL_SENTENCES[key.toLowerCase()] ?? [`practice the ${key} key repeatedly to improve`];
  return sentences.join(". ") + ".";
}
