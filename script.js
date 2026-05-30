const ADMIN_EMAIL = "asadbekbahriddinov77777@gmail.com";

const pages = [
  ["dashboard", "🏠", "Bosh sahifa"],
  ["lessons", "📚", "Darslar"],
  ["tasks", "✅", "Testlar"],
  ["tests", "🏅", "Olimpiadalar"],
  ["ai-tutor", "🤖", "AI Ustoz"],
  ["memory", "🧠", "Xotira"],
  ["statistics", "📊", "Statistika"],
  ["goals", "🎯", "Maqsadlar"],
  ["leaderboard", "🏆", "Leaderboard"]
];
const premiumLockedPages = new Set(["ai-tutor", "memory", "leaderboard"]);

const subjects = [
  ["Ona tili", "Grammatika va imlo", 0, "0 video", "🔤"],
  ["Adabiyot", "Asarlar va tahlil", 0, "0 video", "📖"],
  ["Matematika", "Misollar va masalalar", 0, "0 video", "📐"],
  ["Algebra", "Tenglama va funksiyalar", 0, "0 video", "➗"],
  ["Geometriya", "Shakllar va isbotlar", 0, "0 video", "📏"],
  ["Fizika", "Mexanika va qonunlar", 0, "0 video", "⚙️"],
  ["Kimyo", "Moddalar va reaksiyalar", 0, "0 video", "⚗️"],
  ["Biologiya", "Tirik organizmlar", 0, "0 video", "🌿"],
  ["Tarix", "Davrlar va voqealar", 0, "0 video", "🏛️"],
  ["Geografiya", "Yer va xaritalar", 0, "0 video", "🌍"],
  ["Ingliz tili", "Vocabulary va grammar", 0, "0 video", "🇬🇧"],
  ["Rus tili", "Grammatika va nutq", 0, "0 video", "🇷🇺"],
  ["Informatika", "Kompyuter va dasturlash", 0, "0 video", "💻"],
  ["Huquq", "Qonun va jamiyat", 0, "0 video", "⚖️"],
  ["Iqtisod", "Pul va bozor", 0, "0 video", "💰"],
  ["Astronomiya", "Koinot va sayyoralar", 0, "0 video", "🪐"],
  ["Chizmachilik", "Chizma va loyiha", 0, "0 video", "✏️"],
  ["Tarbiya", "Shaxsiy rivojlanish", 0, "0 video", "🤝"],
  ["SAT", "SAT Math va English", 0, "0 video", "🎓"],
  ["IELTS", "Listening, Reading, Writing, Speaking", 0, "0 video", "🗣️"]
];

const root = document.querySelector("#page-root");
const landing = document.querySelector("#landing");
const app = document.querySelector("#app");
const nav = document.querySelector("#app-nav");
const modal = document.querySelector("#auth-modal");
const toast = document.querySelector("#toast");
let mode = "login";
let currentUser = JSON.parse(localStorage.getItem("mindoraUser") || "null");
let registeredUsers = JSON.parse(localStorage.getItem("mindoraUsers") || "[]");
let adminItems = JSON.parse(localStorage.getItem("mindoraAdminItems") || "[]");
let userGoals = JSON.parse(localStorage.getItem("mindoraUserGoals") || "[]");
let lessonVideos = JSON.parse(localStorage.getItem("mindoraLessonVideos") || "{}");
let premiumCards = JSON.parse(localStorage.getItem("mindoraPremiumCards") || "[]");
let premiumPayments = JSON.parse(localStorage.getItem("mindoraPremiumPayments") || "[]");
let questionReports = JSON.parse(localStorage.getItem("mindoraQuestionReports") || "[]");
let latestMistakes = JSON.parse(sessionStorage.getItem("mindoraLatestMistakes") || "[]");
let aiTutorLastQuiz = null;
let onaTiliRun = null;
let learningStats = JSON.parse(localStorage.getItem("mindoraLearningStats") || "null") || {
  streak: 0,
  minutes: 0,
  points: 0,
  newPoints: 0,
  tests: 0,
  testScore: 0,
  subjectProgress: {},
  subjectMinutes: {},
  studyLog: []
};
let statsSnapshot = "";
const defaultUserXp = {
  [ADMIN_EMAIL]: 1154
};
const MAX_USER_XP = 10000;
const manualPaymentDetails = {
  cardNumber: "5614 6810 1725 6235",
  owner: "Xasanova Nazira",
  telegram: "@Mindora_admin"
};

const defaultLessonVideos = {
  "Ona tili": [["Ona tili 0 dan", "Grammatika, imlo va asosiy qoidalar.", "ona tili 0 dan dars uzbek"]],
  "Adabiyot": [["Adabiyot 0 dan", "Asarlar, adiblar va tahlilni boshidan o'rganish.", "adabiyot 0 dan dars uzbek"]],
  "Matematika": [["Matematika 0 dan", "Sonlar, amallar va masalalar asoslari.", "matematika 0 dan dars uzbek"]],
  "Algebra": [["Algebra 0 dan", "Ifodalar, tenglamalar va funksiyalar.", "algebra 0 dan dars uzbek"]],
  "Geometriya": [["Geometriya 0 dan", "Shakllar, burchaklar va isbotlar.", "geometriya 0 dan dars uzbek"]],
  "Fizika": [["Fizika 0 dan", "Mexanika va fizik qonunlar asoslari.", "fizika 0 dan dars uzbek"]],
  "Kimyo": [["Kimyo 0 dan", "Moddalar, formulalar va reaksiyalar.", "kimyo 0 dan dars uzbek"]],
  "Biologiya": [["Biologiya 0 dan", "Tirik organizmlar va hujayra asoslari.", "biologiya 0 dan dars uzbek"]],
  "Tarix": [["Tarix 0 dan", "Davrlar, voqealar va muhim sanalar.", "tarix 0 dan dars uzbek"]],
  "Geografiya": [["Geografiya 0 dan", "Yer, xarita va materiklar asoslari.", "geografiya 0 dan dars uzbek"]],
  "Ingliz tili": [["Ingliz tili 0 dan", "Alphabet, grammar va vocabulary asoslari.", "ingliz tili 0 dan dars uzbek"]],
  "Rus tili": [["Rus tili 0 dan", "Alifbo, grammatika va boshlang'ich nutq.", "rus tili 0 dan dars uzbek"]],
  "Informatika": [["Informatika 0 dan", "Kompyuter savodxonligi va dasturlash asoslari.", "informatika 0 dan dars uzbek"]],
  "Huquq": [["Huquq 0 dan", "Qonun, davlat va jamiyat asoslari.", "huquq 0 dan dars uzbek"]],
  "Iqtisod": [["Iqtisod 0 dan", "Pul, bozor va iqtisodiy tushunchalar.", "iqtisod 0 dan dars uzbek"]],
  "Astronomiya": [["Astronomiya 0 dan", "Koinot, sayyoralar va osmon jismlari.", "astronomiya 0 dan dars uzbek"]],
  "Chizmachilik": [["Chizmachilik 0 dan", "Chizma, o'lcham va loyiha asoslari.", "chizmachilik 0 dan dars uzbek"]],
  "Tarbiya": [["Tarbiya 0 dan", "Shaxsiy rivojlanish va odob asoslari.", "tarbiya 0 dan dars uzbek"]]
};

const onaTiliTests = [
  { question: "“Kitob” so'zi qaysi so'z turkumiga kiradi?", answers: ["Fe'l", "Ot", "Sifat", "Son"], correct: "B" },
  { question: "“Chiroyli” so'zi qaysi so'z turkumi?", answers: ["Sifat", "Ot", "Ravish", "Olmosh"], correct: "A" },
  { question: "Gapning asosiy bo'laklari qaysilar?", answers: ["Ega va kesim", "To'ldiruvchi va aniqlovchi", "Hol va ega", "Kesim va hol"], correct: "A" },
  { question: "“Men maktabga bordim” gapida ega qaysi?", answers: ["Maktabga", "Bordim", "Men", "Gapda ega yo'q"], correct: "C" },
  { question: "“Yugurmoq” qanday so'z turkumi?", answers: ["Ot", "Fe'l", "Sifat", "Son"], correct: "B" },
  { question: "Alisher Navoiy kim bo'lgan?", answers: ["Olim", "Shoir", "Sportchi", "Bastakor"], correct: "B" },
  { question: "“Beshta” so'zi qaysi turkumga kiradi?", answers: ["Son", "Ot", "Sifat", "Ravish"], correct: "A" },
  { question: "“Ona yurti oltin beshiging” maqolida nechta so'z bor?", answers: ["3", "4", "5", "6"], correct: "B" },
  { question: "So'zning ma'noli qismlari nima deyiladi?", answers: ["Gap", "Bo'g'in", "Morfema", "Harf"], correct: "C" },
  { question: "“Bahor keldi” gapida kesim qaysi?", answers: ["Bahor", "Keldi", "Gapda kesim yo'q", "Ikkalasi ham"], correct: "B" },
  { question: "O'zbek alifbosida nechta harf bor?", answers: ["26", "28", "29", "30"], correct: "C" },
  { question: "“Qizil olma” birikmasida sifat qaysi?", answers: ["Olma", "Qizil", "Ikkalasi", "Hech biri"], correct: "B" },
  { question: "“Men” qanday olmosh?", answers: ["Ko'rsatish", "So'roq", "Kishilik", "Gumon"], correct: "C" },
  { question: "Nuqta qachon qo'yiladi?", answers: ["So'roq gapdan keyin", "His-hayajon gapdan keyin", "Darak gapdan keyin", "Hammasida"], correct: "C" },
  { question: "“Kim?” so'rog'iga javob bo'ladigan so'zlar odatda qaysi turkumga kiradi?", answers: ["Ot", "Fe'l", "Ravish", "Son"], correct: "A" },
  { question: "“Tez yugurdi” birikmasida “tez” qanday so'z?", answers: ["Sifat", "Ravish", "Ot", "Son"], correct: "B" },
  { question: "Sinonim so'zlar nima?", answers: ["Qarama-qarshi ma'noli", "Bir xil shaklli", "Ma'nodosh so'zlar", "Eski so'zlar"], correct: "C" },
  { question: "Antonim so'zlar nima?", answers: ["Ma'nodosh", "Qarama-qarshi ma'noli", "Bir xil yoziladigan", "Yangi so'zlar"], correct: "B" },
  { question: "“Maktab” so'zida nechta bo'g'in bor?", answers: ["1", "2", "3", "4"], correct: "B" },
  { question: "“Vatan” so'zining ma'nodoshi qaysi?", answers: ["Yurt", "Uy", "Ko'cha", "Mahalla"], correct: "A" }
];

const subjectTestSets = [
  {
    id: "ona-tili-aralash-2",
    subject: "Ona tili",
    title: "Ona tili. Aralash testlar. 2-test.",
    rating: 4.67,
    seedViews: 5805,
    questions: onaTiliTests
  },
  {
    id: "matematika-aralash-1",
    subject: "Matematika",
    title: "Matematika. Aralash misollar.",
    rating: 4.5,
    seedViews: 1871,
    questions: [
      { question: "12 + 8 nechaga teng?", answers: ["18", "20", "22", "24"], correct: "B" },
      { question: "5 × 6 nechaga teng?", answers: ["25", "30", "35", "40"], correct: "B" },
      { question: "100 ning 25 foizi nechaga teng?", answers: ["20", "25", "30", "40"], correct: "B" },
      { question: "9² nechaga teng?", answers: ["18", "72", "81", "99"], correct: "C" },
      { question: "3x = 21 bo'lsa, x nechaga teng?", answers: ["6", "7", "8", "9"], correct: "B" }
    ]
  },
  {
    id: "tarix-aralash-1",
    subject: "Tarix",
    title: "Tarix. Aralash savollar.",
    rating: 4.78,
    seedViews: 1924,
    questions: [
      { question: "Amir Temur qaysi sulola asoschisi?", answers: ["Temuriylar", "Shayboniylar", "Somoniylar", "Qoraxoniylar"], correct: "A" },
      { question: "Mustaqillik kuni qaysi sana?", answers: ["1-sentabr", "8-dekabr", "21-mart", "9-may"], correct: "A" },
      { question: "Jaloliddin Manguberdi kimga qarshi kurashgan?", answers: ["Mo'g'ullarga", "Arablar", "Rimliklar", "Yunonlar"], correct: "A" },
      { question: "Konstitutsiya kuni qaysi sana?", answers: ["1-sentabr", "8-dekabr", "9-may", "31-avgust"], correct: "B" },
      { question: "Buyuk ipak yo'li asosan nimaga xizmat qilgan?", answers: ["Savdoga", "Faqat urushga", "Faqat ovga", "Faqat sportga"], correct: "A" }
    ]
  },
  {
    id: "biologiya-aralash-1",
    subject: "Biologiya",
    title: "Biologiya. Boshlang'ich testlar.",
    rating: 3.86,
    seedViews: 2725,
    questions: [
      { question: "O'simliklar fotosintezda nima ajratadi?", answers: ["Kislorod", "Azot", "Tuz", "Qum"], correct: "A" },
      { question: "Inson tanasida qon aylanishini nima boshqaradi?", answers: ["Yurak", "O'pka", "Jigar", "Buyrak"], correct: "A" },
      { question: "Hujayra markazida odatda nima bo'ladi?", answers: ["Yadro", "Suyak", "Barg", "Tomir"], correct: "A" },
      { question: "Nafas olishda asosiy organ qaysi?", answers: ["O'pka", "Oshqozon", "Teri", "Ko'z"], correct: "A" },
      { question: "DNK nimani saqlaydi?", answers: ["Irsiy axborot", "Suv", "Issiqlik", "Tovush"], correct: "A" }
    ]
  },
  {
    id: "ingliz-grammar-1",
    subject: "Ingliz tili",
    title: "English grammar. Mixed test.",
    rating: 4.67,
    seedViews: 2440,
    questions: [
      { question: "Choose the correct form: She ___ a student.", answers: ["am", "is", "are", "be"], correct: "B" },
      { question: "Past form of “go” is ...", answers: ["goed", "went", "goes", "gone"], correct: "B" },
      { question: "Which one is a noun?", answers: ["book", "quickly", "beautiful", "run"], correct: "A" },
      { question: "Choose the article: ___ apple", answers: ["a", "an", "the", "no"], correct: "B" },
      { question: "Translate “maktab”.", answers: ["school", "home", "street", "city"], correct: "A" }
    ]
  },
  {
    id: "kimyo-aralash-1",
    subject: "Kimyo",
    title: "Kimyo. Oddiy va murakkab moddalar.",
    rating: 4.76,
    seedViews: 13953,
    questions: [
      { question: "H2O formulasi nimani bildiradi?", answers: ["Suv", "Tuz", "Kislorod", "Vodorod"], correct: "A" },
      { question: "NaCl qanday modda?", answers: ["Osh tuzi", "Suv", "Temir", "Shakar"], correct: "A" },
      { question: "Kislorodning belgisi qaysi?", answers: ["O", "K", "Ki", "Ox"], correct: "A" },
      { question: "Fe qaysi element?", answers: ["Temir", "Ftor", "Fosfor", "Kumush"], correct: "A" },
      { question: "CO2 tarkibida qaysi elementlar bor?", answers: ["Uglerod va kislorod", "Azot va suv", "Temir va tuz", "Vodorod va xlor"], correct: "A" }
    ]
  }
];

function makeQuestion(question, correct, wrongs, offset = 0) {
  const labels = ["A", "B", "C", "D"];
  const answers = [correct, ...wrongs].slice(0, 4);
  const shift = offset % answers.length;
  const rotated = [...answers.slice(shift), ...answers.slice(0, shift)];
  return {
    question,
    answers: rotated,
    correct: labels[rotated.indexOf(correct)]
  };
}

function fromRows(rows, variant = 0) {
  return rows.slice(0, 20).map((row, index) => makeQuestion(row[0], row[1], row.slice(2), index + variant));
}

function buildMathQuestions(variant) {
  return Array.from({ length: 20 }, (_, index) => {
    const a = 8 + variant * 4 + index;
    const b = 3 + ((index + variant) % 9);
    if (index % 4 === 0) return makeQuestion(`${a} + ${b} nechaga teng?`, String(a + b), [String(a + b + 2), String(a + b - 1), String(a * b)], index);
    if (index % 4 === 1) return makeQuestion(`${a} × ${b} nechaga teng?`, String(a * b), [String(a + b), String(a * b + b), String(a * b - a)], index);
    if (index % 4 === 2) return makeQuestion(`${a * b} : ${b} nechaga teng?`, String(a), [String(b), String(a + b), String(a - 1)], index);
    return makeQuestion(`x + ${b} = ${a + b} bo'lsa, x nechaga teng?`, String(a), [String(b), String(a + 1), String(a - 2)], index);
  });
}

function buildSubjectQuestions(subject, variant) {
  const rows = {
    "Ona tili": [
      ["“Kitob” so'zi qaysi so'z turkumiga kiradi?", "Ot", "Fe'l", "Sifat", "Son"],
      ["“Chiroyli” so'zi qaysi so'z turkumi?", "Sifat", "Ot", "Ravish", "Olmosh"],
      ["Gapning asosiy bo'laklari qaysilar?", "Ega va kesim", "To'ldiruvchi va aniqlovchi", "Hol va ega", "Kesim va hol"],
      ["“Men maktabga bordim” gapida ega qaysi?", "Men", "Maktabga", "Bordim", "Gapda ega yo'q"],
      ["“Yugurmoq” qanday so'z turkumi?", "Fe'l", "Ot", "Sifat", "Son"],
      ["Alisher Navoiy kim bo'lgan?", "Shoir", "Olim", "Sportchi", "Bastakor"],
      ["“Beshta” so'zi qaysi turkumga kiradi?", "Son", "Ot", "Sifat", "Ravish"],
      ["“Ona yurti oltin beshiging” maqolida nechta so'z bor?", "4", "3", "5", "6"],
      ["So'zning ma'noli qismlari nima deyiladi?", "Morfema", "Gap", "Bo'g'in", "Harf"],
      ["“Bahor keldi” gapida kesim qaysi?", "Keldi", "Bahor", "Gapda kesim yo'q", "Ikkalasi ham"],
      ["O'zbek alifbosida nechta harf bor?", "29", "26", "28", "30"],
      ["“Qizil olma” birikmasida sifat qaysi?", "Qizil", "Olma", "Ikkalasi", "Hech biri"],
      ["“Men” qanday olmosh?", "Kishilik", "Ko'rsatish", "So'roq", "Gumon"],
      ["Nuqta qachon qo'yiladi?", "Darak gapdan keyin", "So'roq gapdan keyin", "His-hayajon gapdan keyin", "Hammasida"],
      ["“Kim?” so'rog'iga javob bo'ladigan so'zlar odatda qaysi turkumga kiradi?", "Ot", "Fe'l", "Ravish", "Son"],
      ["“Tez yugurdi” birikmasida “tez” qanday so'z?", "Ravish", "Sifat", "Ot", "Son"],
      ["Sinonim so'zlar nima?", "Ma'nodosh so'zlar", "Qarama-qarshi ma'noli", "Bir xil shaklli", "Eski so'zlar"],
      ["Antonim so'zlar nima?", "Qarama-qarshi ma'noli", "Ma'nodosh", "Bir xil yoziladigan", "Yangi so'zlar"],
      ["“Maktab” so'zida nechta bo'g'in bor?", "2", "1", "3", "4"],
      ["“Vatan” so'zining ma'nodoshi qaysi?", "Yurt", "Uy", "Ko'cha", "Mahalla"]
    ],
    "Tarix": [
      ["Amir Temur qaysi sulola asoschisi?", "Temuriylar", "Shayboniylar", "Somoniylar", "Qoraxoniylar"],
      ["O'zbekiston mustaqilligi qachon e'lon qilingan?", "1991-yil 31-avgust", "1992-yil 8-dekabr", "1990-yil 1-sentabr", "1989-yil 21-mart"],
      ["Jaloliddin Manguberdi kimlarga qarshi kurashgan?", "Mo'g'ullarga", "Rimliklarga", "Arab xalifaligiga", "Saljuqlarga"],
      ["O'zbekiston Konstitutsiyasi qachon qabul qilingan?", "1992-yil 8-dekabr", "1991-yil 1-sentabr", "1993-yil 9-may", "1990-yil 20-iyun"],
      ["Buyuk ipak yo'li asosan nimaga xizmat qilgan?", "Savdo va madaniy aloqaga", "Faqat harbiy yurishga", "Faqat dehqonchilikka", "Faqat ovchilikka"],
      ["Mirzo Ulug'bek qaysi sohada mashhur?", "Astronomiya", "Dengizchilik", "Kimyo", "Haykaltaroshlik"],
      ["Buxoro xonligi qaysi hududda shakllangan?", "Movarounnahrda", "Misrda", "Hindistonda", "Rimda"],
      ["Ikkinchi jahon urushi qachon boshlangan?", "1939-yil", "1914-yil", "1945-yil", "1920-yil"],
      ["Qadimgi Misrda hukmdorlar qanday atalgan?", "Fir'avn", "Xon", "Sulton", "Imperator"],
      ["Spitamen kimlarga qarshi kurashgan?", "Aleksandr qo'shinlariga", "Arab lashkarlariga", "Mo'g'ullarga", "Rimliklarga"],
      ["Temuriylar davrida Samarqand qanday markaz bo'lgan?", "Ilm-fan va madaniyat", "Faqat konchilik", "Faqat chorvachilik", "Dengiz porti"],
      ["Xiva xonligi poytaxti qaysi shahar edi?", "Xiva", "Qo'qon", "Toshkent", "Termiz"],
      ["Qo'qon xonligi qaysi vodiya bilan bog'liq?", "Farg'ona vodiysi", "Nil vodiysi", "Amazonka vodiysi", "Volga bo'yi"],
      ["Zahiriddin Muhammad Bobur qaysi asar muallifi?", "Boburnoma", "Xamsa", "Qutadg'u bilig", "Devonu lug'otit turk"],
      ["1917-yilda Rossiyada qanday voqea bo'lgan?", "Inqilob", "Mustaqillik", "Buyuk geografik kashfiyot", "Renessans"],
      ["Somoniylar davlati markazi qaysi shahar edi?", "Buxoro", "Parij", "London", "Pekin"],
      ["Qadimgi Yunonistonda Afina nima bilan mashhur?", "Demokratiya", "Qog'oz ixtirosi", "Porox", "Kompas"],
      ["Rim imperiyasida lotin tili qanday rol o'ynagan?", "Davlat va madaniyat tili", "Faqat oshxona tili", "Faqat musiqa tili", "Faqat sport tili"],
      ["Al-Xorazmiy qaysi fan rivojiga katta hissa qo'shgan?", "Matematika", "Botanika", "Musiqa", "Geologiya"],
      ["Mustaqillik kuni qaysi sana nishonlanadi?", "1-sentabr", "8-dekabr", "21-mart", "9-may"]
    ],
    "Biologiya": [
      ["Fotosintez jarayonida o'simliklar nima ajratadi?", "Kislorod", "Azot", "Tuz", "Qum"],
      ["Qon aylanishida asosiy nasos organ qaysi?", "Yurak", "O'pka", "Jigar", "Buyrak"],
      ["Hujayraning boshqaruv markazi nima?", "Yadro", "Ribosoma", "Xloroplast", "Membrana"],
      ["Nafas olishda asosiy organ qaysi?", "O'pka", "Oshqozon", "Teri", "Ko'z"],
      ["DNK nimani saqlaydi?", "Irsiy axborot", "Suv zaxirasi", "Issiqlik", "Tovush"],
      ["Qizil qon tanachalari nima tashiydi?", "Kislorod", "Yog'", "Tuz", "Kraxmal"],
      ["O'simlik ildizi nima vazifa bajaradi?", "Suv va mineral modda shimadi", "Faqat gul ochadi", "Faqat urug' beradi", "Yorug'lik chiqaradi"],
      ["Bargda fotosintez uchun qaysi pigment muhim?", "Xlorofill", "Gemoglobin", "Melanin", "Keratin"],
      ["Suyaklar tizimi qanday vazifa bajaradi?", "Tayanch va himoya", "Faqat hazm", "Faqat ko'rish", "Faqat eshitish"],
      ["Viruslar hujayrasiz tuzilishga egami?", "Ha", "Yo'q", "Faqat o'simlikda", "Faqat hayvonda"],
      ["Buyrakning asosiy vazifasi nima?", "Qonni filtrlash", "Qon haydash", "Nafas olish", "Ko'rish"],
      ["Nerv tizimi nimani boshqaradi?", "Organlar faoliyatini", "Faqat ovqatni", "Faqat suyakni", "Faqat terini"],
      ["Ekologiya nimani o'rganadi?", "Organizm va muhit aloqasini", "Faqat sonlarni", "Faqat tovushni", "Faqat she'rni"],
      ["Oziq zanjiri nimani ko'rsatadi?", "Energiya o'tishini", "Harflar tartibini", "Sayyoralar yo'lini", "Tog' balandligini"],
      ["Bakteriyalar qanday organizmlar?", "Mikroorganizmlar", "Faqat qushlar", "Faqat daraxtlar", "Faqat baliqlar"],
      ["Oqsillar nimadan tuzilgan?", "Aminokislotalardan", "Faqat suvdan", "Faqat qumdan", "Faqat tuzdan"],
      ["Mitoz natijasida nechta hujayra hosil bo'ladi?", "2", "1", "3", "4"],
      ["Gen nima?", "Irsiy birlik", "Suyak turi", "Ovqat turi", "Tog' nomi"],
      ["Immunitet nimani anglatadi?", "Himoya qobiliyati", "Ko'rish qobiliyati", "Uchish qobiliyati", "Yozish qobiliyati"],
      ["Populyatsiya nima?", "Bir tur individlari guruhi", "Faqat bitta hujayra", "Faqat mineral", "Faqat organ"]
    ],
    "Kimyo": [
      ["H2O formulasi nimani bildiradi?", "Suv", "Tuz", "Kislorod", "Vodorod"],
      ["NaCl qanday modda?", "Osh tuzi", "Suv", "Temir", "Shakar"],
      ["Kislorodning kimyoviy belgisi qaysi?", "O", "K", "Ki", "Ox"],
      ["Fe qaysi element belgisi?", "Temir", "Ftor", "Fosfor", "Kumush"],
      ["CO2 tarkibida qaysi elementlar bor?", "Uglerod va kislorod", "Azot va suv", "Temir va tuz", "Vodorod va xlor"],
      ["Atom yadrosida nimalar bo'ladi?", "Proton va neytron", "Faqat elektron", "Faqat molekula", "Faqat ion"],
      ["Elektron qanday zaryadga ega?", "Manfiy", "Musbat", "Zaryadsiz", "Har doim ikki musbat"],
      ["pH 7 qanday muhitni bildiradi?", "Neytral", "Kuchli kislota", "Kuchli ishqor", "Metall"],
      ["Kislotalar odatda qaysi ion beradi?", "H+", "OH-", "Na+", "Cl-"],
      ["Ishqorlar odatda qaysi ion beradi?", "OH-", "H+", "Fe3+", "O2"],
      ["Molekula nima?", "Atomlar birikmasi", "Faqat bitta proton", "Faqat elektr toki", "Tog' jinslari"],
      ["Oksidlanish jarayonida elektron bilan nima bo'ladi?", "Yo'qotiladi", "Ko'payadi", "Muzlaydi", "Yo'qolmaydi"],
      ["Cu qaysi element belgisi?", "Mis", "Kalsiy", "Uglerod", "Xlor"],
      ["Au qaysi element?", "Oltin", "Kumush", "Alyuminiy", "Azot"],
      ["Kimyoviy reaksiya belgisi nima?", "Yangi modda hosil bo'lishi", "Faqat shakl o'zgarishi", "Faqat joy almashish", "Faqat ovoz"],
      ["Katalizator nima qiladi?", "Reaksiyani tezlashtiradi", "Haroratni doim pasaytiradi", "Massani yo'q qiladi", "Atomni o'chiradi"],
      ["Suvning qaynash harorati odatda nechchi?", "100°C", "0°C", "50°C", "200°C"],
      ["HCl qanday modda?", "Kislota", "Ishqor", "Tuz", "Metall"],
      ["NaOH qanday modda?", "Ishqor", "Kislota", "Gaz", "Neft"],
      ["Davriy jadvalni kim yaratgan?", "Mendeleyev", "Nyuton", "Darvin", "Navoiy"]
    ],
    "Fizika": [
      ["Kuch birligi qaysi?", "Nyuton", "Joul", "Vatt", "Volt"],
      ["Tezlik formulasi qaysi?", "v = s/t", "F = ma", "p = mv", "A = Fs"],
      ["Tok kuchi birligi nima?", "Amper", "Volt", "Om", "Vatt"],
      ["Kuchlanish birligi nima?", "Volt", "Nyuton", "Joul", "Kelvin"],
      ["Qarshilik birligi nima?", "Om", "Amper", "Metr", "Sekund"],
      ["Yorug'lik vakuumda qanday tarqaladi?", "To'g'ri chiziq bo'ylab", "Faqat aylana", "Faqat zigzag", "Har doim to'xtab"],
      ["Massa birligi SI da qaysi?", "Kilogramm", "Litr", "Volt", "Gradus"],
      ["Ish birligi qaysi?", "Joul", "Amper", "Nyuton", "Om"],
      ["Quvvat birligi qaysi?", "Vatt", "Joul", "Volt", "Tesla"],
      ["Erkin tushish tezlanishi taxminan qancha?", "9.8 m/s²", "1 m/s²", "100 m/s²", "0.5 m/s²"],
      ["Zichlik formulasi qaysi?", "rho = m/V", "v = s/t", "F = ma", "I = U/R"],
      ["Ohm qonuni qaysi?", "I = U/R", "F = ma", "E = mc²", "p = mv"],
      ["Issiqlik almashinuvi qaysi jarayon?", "Energiya o'tishi", "Massa yo'qolishi", "Vaqt to'xtashi", "Yorug'lik sinishi"],
      ["Magnitning ikki qutbi qanday ataladi?", "Shimoliy va janubiy", "Issiq va sovuq", "Oq va qora", "Katta va kichik"],
      ["Tovush qayerda tarqala olmaydi?", "Vakuumda", "Havoda", "Suvda", "Metallarda"],
      ["Bosim formulasi qaysi?", "p = F/S", "v = s/t", "I = U/R", "Q = cmT"],
      ["Linza yorug'likni nima qiladi?", "Sindira oladi", "Massaga aylantiradi", "Tovushga aylantiradi", "Yo'q qiladi"],
      ["Inersiya nima?", "Jism holatini saqlash xossasi", "Faqat qizish", "Faqat sovish", "Faqat yoritish"],
      ["Impuls formulasi qaysi?", "p = mv", "F = ma", "A = Fs", "P = A/t"],
      ["Elektr zaryad birligi qaysi?", "Kulon", "Nyuton", "Metr", "Kelvin"]
    ],
    "Geografiya": [
      ["Yerning eng katta okeani qaysi?", "Tinch okeani", "Atlantika", "Hind", "Shimoliy Muz"],
      ["O'zbekiston poytaxti qaysi?", "Toshkent", "Samarqand", "Buxoro", "Xiva"],
      ["Dunyodagi eng baland cho'qqi qaysi?", "Everest", "Elbrus", "Kilimanjaro", "Pomir"],
      ["Eng uzun daryo sifatida ko'p tilga olinadigan daryo qaysi?", "Nil", "Amudaryo", "Sirdaryo", "Zarafshon"],
      ["Sahroi Kabir qaysi qit'ada?", "Afrika", "Osiyo", "Yevropa", "Avstraliya"],
      ["Yer nechta asosiy qit'aga bo'linadi?", "6", "3", "4", "9"],
      ["Kompas shimolni nimaga qarab ko'rsatadi?", "Magnit maydoniga", "Quyosh issig'iga", "Oyning rangiga", "Bulutga"],
      ["Ekvator Yer sharini qanday bo'ladi?", "Shimoliy va janubiy yarimsharga", "Sharq va g'arbga", "Faqat tog'larga", "Faqat dengizga"],
      ["Cho'l iqlimida yog'in odatda qanday?", "Kam", "Juda ko'p", "Doim qor", "Doim tuman"],
      ["Globus nima?", "Yerning kichraytirilgan modeli", "Faqat xarita belgisi", "Meteorologik asbob", "Tog' turi"],
      ["Masshtab nimani bildiradi?", "Masofa kichraytirish nisbatini", "Haroratni", "Bosimni", "Shamol tezligini"],
      ["Orol dengizi qaysi mintaqada?", "Markaziy Osiyo", "Janubiy Amerika", "G'arbiy Afrika", "Avstraliya"],
      ["Amazonka havzasi qaysi qit'ada?", "Janubiy Amerika", "Yevropa", "Osiyo", "Antarktida"],
      ["Antarktida qanday iqlimi bilan mashhur?", "Juda sovuq", "Doim issiq", "Doim tropik", "Cho'l issig'i"],
      ["Tog' jinslari yemirilishi nima deyiladi?", "Nurash", "Fotosintez", "Diffuziya", "Ionlanish"],
      ["Shamol yo'nalishini qaysi asbob ko'rsatadi?", "Flyuger", "Termometr", "Barometr", "Kompas har doim"],
      ["Havo bosimini qaysi asbob o'lchaydi?", "Barometr", "Termometr", "Spidometr", "Mikroskop"],
      ["Dunyo xaritasida meridianlar nimani ko'rsatadi?", "Uzunlikni", "Balandlikni", "Haroratni", "Yog'inni"],
      ["Parallellar nimani ko'rsatadi?", "Kenglikni", "Tok kuchini", "Tezlikni", "Massani"],
      ["Vulqon otilishida nima chiqadi?", "Lava", "Muz", "Qog'oz", "Shisha"]
    ],
    "Ingliz tili": [
      ["Choose the correct form: She ___ a student.", "is", "am", "are", "be"],
      ["Past form of “go” is ...", "went", "goed", "goes", "gone"],
      ["Which one is a noun?", "book", "quickly", "beautiful", "run"],
      ["Choose the article: ___ apple", "an", "a", "the", "no article"],
      ["Translate “maktab”.", "school", "home", "street", "city"],
      ["Plural of “child” is ...", "children", "childs", "childes", "childrens"],
      ["Choose: I ___ coffee every morning.", "drink", "drinks", "drank", "drinking"],
      ["Opposite of “big” is ...", "small", "tall", "long", "wide"],
      ["“Beautiful” is which part of speech?", "Adjective", "Noun", "Verb", "Preposition"],
      ["Choose: They ___ playing football.", "are", "is", "am", "be"],
      ["Past form of “write” is ...", "wrote", "writed", "writes", "writing"],
      ["Choose the correct pronoun: ___ am a pupil.", "I", "He", "They", "We"],
      ["Translate “kitob”.", "book", "pen", "bag", "desk"],
      ["Choose: There ___ two apples.", "are", "is", "am", "be"],
      ["Comparative of “good” is ...", "better", "gooder", "best", "more good"],
      ["Which is an adverb?", "quickly", "quick", "table", "green"],
      ["Choose: He ___ not like tea.", "does", "do", "is", "are"],
      ["Future marker is ...", "will", "did", "was", "has"],
      ["Translate “oila”.", "family", "friend", "lesson", "window"],
      ["Choose the question word for place.", "Where", "When", "Who", "Why"]
    ],
    "Rus tili": [
      ["Слово “книга” отвечает на вопрос ...", "что?", "кто?", "какой?", "где?"],
      ["Антоним слова “большой” ...", "маленький", "высокий", "длинный", "широкий"],
      ["Сколько букв в русском алфавите?", "33", "29", "31", "35"],
      ["“Я” qanday olmosh?", "Kishilik olmoshi", "So'roq olmoshi", "Sifat", "Son"],
      ["Глагол обозначает ...", "действие", "предмет", "признак", "число"],
      ["Имя существительное отвечает на вопросы ...", "кто? что?", "какой? какая?", "что делать?", "сколько?"],
      ["Слово “красивый” qaysi turkum?", "Sifat", "Fe'l", "Ot", "Son"],
      ["Предлог qaysi qatorda?", "в", "дом", "иду", "красный"],
      ["Множественное число слова “стол” ...", "столы", "стола", "столом", "столь"],
      ["Прошедшее время fe'lini toping.", "читал", "читать", "читает", "читай"],
      ["Синоним слова “быстрый” ...", "скорый", "медленный", "тихий", "старый"],
      ["“Кто?” so'rog'iga nima javob bo'ladi?", "Shaxs", "Belgi", "Harakat", "Son"],
      ["Слово “пять” qaysi turkum?", "Son", "Ot", "Fe'l", "Ravish"],
      ["“Он идет” gapida fe'l qaysi?", "идет", "он", "gap yo'q", "ikkalasi"],
      ["Точка ставится в конце ...", "darak gap", "faqat so'roq gap", "faqat undov", "so'z boshida"],
      ["Буква “я” nechta tovush berishi mumkin?", "2", "1", "3", "0"],
      ["Корень слова nima?", "Asosiy ma'noli qism", "Faqat qo'shimcha", "Faqat harf", "Tinish belgisi"],
      ["Слово “мама” nechta bo'g'in?", "2", "1", "3", "4"],
      ["“Белый” so'zining antonimi?", "черный", "светлый", "новый", "добрый"],
      ["Вопрос “где?” nimani so'raydi?", "Joyni", "Vaqtni", "Shaxsni", "Sonni"]
    ]
  };
  if (subject === "Matematika") return buildMathQuestions(variant);
  const source = rows[subject] || rows["Ona tili"];
  return fromRows(source.map((row, index) => {
    if (variant === 0) return row;
    const prefix = variant === 1 ? "Mustahkamlash: " : "Aralash savol: ";
    return [`${prefix}${row[0]}`, ...row.slice(1)];
  }), variant);
}

const generatedSubjectTestSets = [
  ["Ona tili", "Ona tili. Aralash testlar. 2-test.", 4.67, 5805],
  ["Ona tili", "Ona tili. Morfologiya testi.", 4.72, 6220],
  ["Ona tili", "Ona tili. Sintaksis va imlo.", 4.81, 7024],
  ["Matematika", "Matematika. Aralash misollar.", 4.5, 1871],
  ["Matematika", "Matematika. Tenglama va amallar.", 4.62, 2460],
  ["Matematika", "Matematika. Foiz va mantiq.", 4.74, 3188],
  ["Ingliz tili", "English grammar. Mixed test.", 4.67, 2440],
  ["Ingliz tili", "English vocabulary. Basic test.", 4.58, 2866],
  ["Ingliz tili", "English tenses. Practice.", 4.73, 3905],
  ["Tarix", "Tarix. Aralash savollar.", 4.78, 1924],
  ["Tarix", "Tarix. O'zbekiston tarixi.", 4.85, 1863],
  ["Tarix", "Tarix. Jahon tarixi.", 4.69, 1554],
  ["Biologiya", "Biologiya. Boshlang'ich testlar.", 3.86, 2725],
  ["Biologiya", "Biologiya. Hujayra va organizm.", 4.42, 3102],
  ["Biologiya", "Biologiya. Ekologiya va genetika.", 4.51, 4050],
  ["Kimyo", "Kimyo. Oddiy va murakkab moddalar.", 4.76, 13953],
  ["Kimyo", "Kimyo. Atom va molekula.", 4.61, 10955],
  ["Kimyo", "Kimyo. Kislota, ishqor va tuzlar.", 4.7, 8720],
  ["Fizika", "Fizika. Boshlang'ich qonunlar.", 4.59, 1540],
  ["Fizika", "Fizika. Elektr va magnit.", 4.68, 856],
  ["Fizika", "Fizika. Mexanika aralash test.", 4.75, 1920],
  ["Geografiya", "Geografiya. Yer va xarita.", 4.55, 1324],
  ["Geografiya", "Geografiya. Materik va okeanlar.", 4.64, 2400],
  ["Geografiya", "Geografiya. Iqlim va tabiat.", 4.71, 3090],
  ["Rus tili", "Русский язык. Aralash test.", 4.8, 1862],
  ["Rus tili", "Русский язык. Grammatika.", 4.62, 1190],
  ["Rus tili", "Русский язык. So'z turkumlari.", 4.7, 2877]
].map(([subject, title, rating, seedViews], index) => ({
  id: `${subjectSlug(subject)}-${index % 3 + 1}`,
  subject,
  title,
  rating,
  seedViews,
  questions: buildSubjectQuestions(subject, index % 3)
}));

const catalogSubjects = ["Matematika", "Ingliz tili", "Tarix", "Biologiya", "Kimyo", "Fizika", "Geografiya", "Ona tili", "Rus tili"];

function difficultyTitle(subject, difficulty, variant) {
  const mediumTitles = ["O'rta daraja aralash test", "O'rta daraja mustahkamlash", "O'rta daraja nazorat ishi"];
  const hardTitles = ["Juda qiyin aralash test", "Juda qiyin mantiqiy savollar", "Juda qiyin yakuniy sinov"];
  const titles = difficulty === "hard" ? hardTitles : mediumTitles;
  return `${subject}. ${titles[variant]}.`;
}

const difficultyQuestionBanks = {
  "Matematika": {
    medium: [
      ["3(2x - 5) + 4 = 25 bo'lsa, x nechaga teng?", "6", "5", "7", "8"],
      ["240 sonining 35 foizi bilan 180 sonining 20 foizi yig'indisi nechaga teng?", "120", "112", "126", "132"],
      ["x² - 9x + 20 = 0 tenglamaning ildizlari yig'indisi nechaga teng?", "9", "20", "4", "5"],
      ["Arifmetik progressiyada a1 = 7, d = 4. a12 nechaga teng?", "51", "48", "55", "44"],
      ["To'g'ri to'rtburchak yuzi 96, perimetri 40. Tomonlari qaysi?", "8 va 12", "6 va 16", "10 va 10", "4 va 24"],
      ["2/3 qismi 54 ga teng son nechaga teng?", "81", "72", "90", "36"],
      ["15, 18 va 24 sonlarining EKUKi nechaga teng?", "360", "120", "180", "720"],
      ["Agar f(x)=2x²-3x+1 bo'lsa, f(-2) nechaga teng?", "15", "13", "11", "17"],
      ["Radiusi 6 bo'lgan doira yuzasi qaysi?", "36π", "12π", "18π", "72π"],
      ["Bir son 25% kamayib 90 bo'ldi. Dastlabki son nechaga teng?", "120", "112", "115", "100"],
      ["x:y = 3:5 va x+y=64 bo'lsa, y nechaga teng?", "40", "24", "36", "45"],
      ["log₂32 nechaga teng?", "5", "4", "6", "8"],
      ["(a+b)² - (a-b)² ifoda nimaga teng?", "4ab", "2ab", "a²+b²", "a²-b²"],
      ["Sinfi 30 o'quvchi. 40% qiz bo'lsa, o'g'il bolalar nechta?", "18", "12", "16", "20"],
      ["√(49+72) nechaga teng?", "11", "9", "13", "121"],
      ["7 ta son o'rtachasi 18. Yig'indi nechaga teng?", "126", "108", "118", "132"],
      ["Kubning qirrasi 5 sm. Hajmi nechaga teng?", "125 sm³", "25 sm³", "100 sm³", "150 sm³"],
      ["2x - 3 < 11 tengsizlik yechimi qaysi?", "x < 7", "x > 7", "x < 4", "x > 4"],
      ["Geometrik progressiyada b1=3, q=2. b6 nechaga teng?", "96", "48", "64", "128"],
      ["Tanga 3 marta tashlansa, kamida bitta gerb tushish ehtimoli qaysi?", "7/8", "1/2", "3/8", "5/8"]
    ],
    hard: [
      ["x² + y² = 65 va xy = 28 bo'lsa, (x+y)² nechaga teng?", "121", "93", "109", "137"],
      ["2^a · 4^b = 128 va a + 2b = 7 bo'lsa, ifoda nechta butun juftlik yechimga ega?", "8", "6", "7", "9"],
      ["x + 1/x = 5 bo'lsa, x² + 1/x² nechaga teng?", "23", "25", "21", "27"],
      ["a+b+c=0 bo'lsa, a³+b³+c³ nimaga teng?", "3abc", "abc", "0", "a²b²c²"],
      ["n² - n soni har qanday butun n uchun nimaga bo'linadi?", "2", "3", "4", "6"],
      ["x² - 6x + 10 ifodaning eng kichik qiymati nechaga teng?", "1", "0", "2", "4"],
      ["1 dan 100 gacha bo'lgan sonlarda 3 ga ham, 5 ga ham bo'linmaydiganlari nechta?", "53", "47", "54", "60"],
      ["Agar a:b=2:3, b:c=4:5 bo'lsa, a:c nisbat qaysi?", "8:15", "2:5", "6:20", "4:15"],
      ["x²+y²=34 va x-y=2 bo'lsa, xy nechaga teng?", "15", "12", "16", "18"],
      ["f(x)=x²-4x+7 bo'lsa, f(x) ning minimum qiymati qaysi?", "3", "4", "7", "0"],
      ["Ketma-ketlik: 2, 6, 12, 20, 30, ... 12-had nechaga teng?", "156", "144", "132", "168"],
      ["Agar 3x+2y=17 va 2x-y=4 bo'lsa, x+y nechaga teng?", "7", "6", "8", "9"],
      ["Tomonlari 13, 14, 15 bo'lgan uchburchak yuzi nechaga teng?", "84", "90", "78", "96"],
      ["10 ta turli kitobdan 3 tasini tartibsiz tanlash usuli nechta?", "120", "720", "30", "90"],
      ["|2x-7| = 9 tenglama yechimlari yig'indisi nechaga teng?", "7", "8", "6", "9"],
      ["x² - 5x + 6 > 0 tengsizlik yechimi qaysi?", "x<2 yoki x>3", "2<x<3", "x>2", "x<3"],
      ["Agar sin α = 3/5 va α o'tkir burchak bo'lsa, cos α qaysi?", "4/5", "3/4", "5/4", "2/5"],
      ["Soddalashtiring: (x²-9)/(x-3), x≠3", "x+3", "x-3", "x²+3", "3x"],
      ["Bir ishni A 12 kunda, B 18 kunda tugatsa, birga necha kunda tugatadi?", "36/5 kun", "15 kun", "30/5 kun", "9 kun"],
      ["P(x)=x³-3x²+2x polinomining ildizlari yig'indisi nechaga teng?", "3", "2", "0", "6"]
    ]
  },
  "Fizika": {
    medium: [
      ["Massasi 5 kg jismga 20 N kuch ta'sir etsa, tezlanish qancha?", "4 m/s²", "2 m/s²", "10 m/s²", "25 m/s²"],
      ["Jism 15 m/s tezlikda 12 s harakatlansa, masofa qancha?", "180 m", "120 m", "150 m", "200 m"],
      ["Qarshilik 8 Om, tok 3 A bo'lsa, kuchlanish qancha?", "24 V", "11 V", "18 V", "30 V"],
      ["100 J ish 20 s da bajarilsa, quvvat qancha?", "5 W", "20 W", "80 W", "2000 W"],
      ["Zichligi 2 kg/m³ va hajmi 9 m³ bo'lgan jism massasi qancha?", "18 kg", "11 kg", "4.5 kg", "20 kg"],
      ["Impuls 40 kg m/s, massa 8 kg bo'lsa, tezlik qancha?", "5 m/s", "32 m/s", "48 m/s", "4 m/s"],
      ["Bosim 200 Pa, yuza 4 m² bo'lsa, kuch qancha?", "800 N", "50 N", "204 N", "196 N"],
      ["Kinetik energiya formulasi qaysi?", "Ek = mv²/2", "Ek = mgh", "Ek = Fs", "Ek = IR"],
      ["Massasi 2 kg jism 10 m balandlikda. g=10 bo'lsa, potensial energiya qancha?", "200 J", "20 J", "100 J", "400 J"],
      ["Tok kuchi 4 A, kuchlanish 12 V bo'lsa, elektr quvvat qancha?", "48 W", "3 W", "16 W", "96 W"],
      ["Suvda tovush havoga nisbatan qanday tarqaladi?", "Tezroq", "Sekinroq", "Umuman tarqalmaydi", "Bir xil"],
      ["Linzaning optik kuchi 2 dioptriya bo'lsa, fokus masofasi qancha?", "0.5 m", "2 m", "4 m", "1 m"],
      ["Parallel ulashda umumiy qarshilik qanday bo'ladi?", "Eng kichik qarshilikdan ham kichik bo'lishi mumkin", "Har doim yig'indiga teng", "Har doim eng kattasiga teng", "Nol bo'ladi"],
      ["Suyuqlik bosimi qaysi kattalikka bog'liq?", "Chuqurlikka", "Faqat rangga", "Faqat idish shakliga", "Faqat hajmga"],
      ["Issiqlik miqdori qaysi birlikda o'lchanadi?", "Joul", "Volt", "Om", "Tesla"],
      ["Erkin tushishda havo qarshiligi hisobga olinmasa, tezlanish qanday?", "Doimiy", "Har doim nol", "Kamayuvchi", "Faqat massaga bog'liq"],
      ["Magnit maydon tokli o'tkazgichga qanday ta'sir qilishi mumkin?", "Kuch bilan", "Massani yo'q qilib", "Zaryadni yo'qotib", "Vaqtni to'xtatib"],
      ["Yorug'lik sinishi qachon yuz beradi?", "Muhit almashganda", "Faqat vakuumda", "Faqat qorong'ida", "Faqat tovush bilan"],
      ["Mexanik ish bajarilishi uchun nima zarur?", "Kuch va ko'chish", "Faqat massa", "Faqat vaqt", "Faqat harorat"],
      ["To'lqin chastotasi ortsa, davri qanday o'zgaradi?", "Kamayadi", "Ortadi", "O'zgarmaydi", "Yo'qoladi"]
    ],
    hard: [
      ["2 kg jism 5 m/s dan 15 m/s gacha tezlashdi. Kinetik energiya o'zgarishi qancha?", "200 J", "100 J", "225 J", "250 J"],
      ["R1=6 Om va R2=3 Om parallel ulangan. Umumiy qarshilik qancha?", "2 Om", "9 Om", "3 Om", "6 Om"],
      ["1000 kg/m³ suyuqlikda 0.2 m chuqurlikdagi bosim ortishi g=10 bo'lsa qancha?", "2000 Pa", "200 Pa", "20000 Pa", "1000 Pa"],
      ["Jism yuqoriga 20 m/s tezlik bilan otildi. g=10 bo'lsa, maksimal balandlik qancha?", "20 m", "10 m", "40 m", "30 m"],
      ["Transformator N1=500, N2=100. U1=220 V bo'lsa, U2 qancha?", "44 V", "1100 V", "120 V", "22 V"],
      ["Massasi 4 kg jism 8 m balandlikdan tushsa, potensial energiya yo'qotilishi g=10 da qancha?", "320 J", "32 J", "400 J", "80 J"],
      ["Fokus masofasi 25 cm bo'lgan linzaning optik kuchi qancha?", "4 D", "0.25 D", "2.5 D", "25 D"],
      ["Tok 5 A, vaqt 2 minut. O'tgan zaryad qancha?", "600 C", "10 C", "300 C", "120 C"],
      ["Tormozlanayotgan jism tezligi 30 m/s dan 10 m/s ga 4 s da tushdi. Tezlanish qancha?", "-5 m/s²", "-10 m/s²", "5 m/s²", "-4 m/s²"],
      ["Issiqlik mashinasi 600 J oladi, 420 J chiqaradi. FIK qancha?", "30%", "70%", "42%", "60%"],
      ["Suvga botgan jismga ta'sir etuvchi Arximed kuchi nimaga teng?", "Siqib chiqarilgan suyuqlik og'irligiga", "Jism rangiga", "Faqat jism massasiga", "Idish hajmiga"],
      ["3 kg jismga 12 N kuch 5 s ta'sir etdi. Boshlang'ich tezlik nol bo'lsa, oxirgi tezlik qancha?", "20 m/s", "15 m/s", "12 m/s", "25 m/s"],
      ["2 kg va 3 kg jismlar bir xil tezlikda harakat qilsa, qaysi impuls katta?", "3 kg jismniki", "2 kg jismniki", "Teng", "Tezliksiz aniqlanmaydi"],
      ["Elektromagnit induksiya yuz berishi uchun nima o'zgarishi kerak?", "Magnit oqimi", "Faqat massa", "Faqat harorat", "Faqat zichlik"],
      ["10 Om qarshilikdan 2 A tok o'tsa, 5 s da ajralgan issiqlik qancha?", "200 J", "100 J", "20 J", "400 J"],
      ["Tebranish davri 0.25 s bo'lsa, chastota qancha?", "4 Hz", "2 Hz", "0.25 Hz", "8 Hz"],
      ["Ideal gaz bosimi hajm ikki marta kamayganda, temperatura o'zgarmasa qanday bo'ladi?", "2 marta ortadi", "2 marta kamayadi", "O'zgarmaydi", "4 marta kamayadi"],
      ["Yorug'lik optik zichroq muhitga o'tganda odatda qanday sinadi?", "Normalga yaqinlashadi", "Normaldan uzoqlashadi", "Sinmaydi", "To'xtaydi"],
      ["Satelit orbitada erkin tushishda bo'lsa, og'irlik holati qanday seziladi?", "Vaznsizlik", "Ikki baravar og'irlik", "Faqat ishqalanish", "Bosim yo'qolishi"],
      ["1 kg suvni 20°C ga isitish uchun c=4200 J/kg°C bo'lsa, qancha issiqlik kerak?", "84000 J", "4200 J", "21000 J", "42000 J"]
    ]
  }
};

Object.assign(difficultyQuestionBanks, {
  "Ingliz tili": {
    medium: [
      ["Choose the correct sentence.", "I have been studying English for two years.", "I study English since two years.", "I am study English for two years.", "I studied English since two years."],
      ["If she ___ earlier, she would not miss the bus.", "left", "leaves", "will leave", "has left"],
      ["The report ___ by the manager yesterday.", "was approved", "approved", "has approved", "is approving"],
      ["I am used to ___ early.", "waking up", "wake up", "woke up", "to wake up"],
      ["Neither the teacher nor the students ___ ready.", "are", "is", "was", "be"],
      ["This is the reason ___ I changed my plan.", "why", "who", "where", "whose"],
      ["He denied ___ the window.", "breaking", "to break", "broke", "break"],
      ["Choose the word closest to 'reluctant'.", "unwilling", "careless", "brave", "silent"],
      ["By next Monday, we ___ the project.", "will have finished", "finished", "will finish", "have finished"],
      ["The more you practice, ___ you become.", "the better", "better", "the best", "more better"],
      ["She asked me where I ___.", "lived", "live", "am living", "will live"],
      ["I wish I ___ more time.", "had", "have", "will have", "having"],
      ["Choose the correct preposition: capable ___ solving it.", "of", "for", "to", "with"],
      ["The book, ___ cover is blue, is mine.", "whose", "which", "who", "that"],
      ["He suggested that she ___ a doctor.", "see", "sees", "saw", "to see"],
      ["Hardly had we arrived ___ it started raining.", "when", "than", "then", "while"],
      ["This problem is too difficult ___ quickly.", "to solve", "solving", "solve", "solved"],
      ["Choose the correct phrasal verb: She ___ the offer.", "turned down", "turned in", "turned off", "turned over"],
      ["The article needs ___.", "editing", "to editing", "edit", "edited"],
      ["Had I known, I ___ you.", "would have called", "will call", "called", "would call"]
    ],
    hard: [
      ["No sooner ___ the door than the alarm rang.", "had he opened", "he opened", "has he opened", "did he opened"],
      ["Choose the sentence with correct inversion.", "Rarely have I seen such accuracy.", "Rarely I have seen such accuracy.", "Rarely did I have seen such accuracy.", "Rarely have seen I such accuracy."],
      ["If the data ___ reliable, the conclusion would have been accepted.", "had been", "were", "has been", "would be"],
      ["The committee insisted that the proposal ___ revised.", "be", "is", "was", "being"],
      ["Choose the most precise synonym of 'mitigate'.", "alleviate", "imitate", "magnify", "interrupt"],
      ["It was not until midnight ___ the error was found.", "that", "when", "which", "where"],
      ["The results are inconsistent, ___ suggests a measurement error.", "which", "that", "what", "who"],
      ["Were it not for your help, I ___ failed.", "would have", "will have", "had", "would"],
      ["Choose the correct reduced clause: Students who were selected received letters.", "Selected students received letters.", "Selecting students received letters.", "Students selected were received letters.", "Selected receiving students letters."],
      ["The phrase 'to call off' means ...", "to cancel", "to invite", "to remember", "to improve"],
      ["Choose the correct form: The evidence is not sufficient ___ the claim.", "to support", "supporting", "support", "supported"],
      ["He spoke as though he ___ everything.", "knew", "knows", "has known", "will know"],
      ["Which sentence uses a mixed conditional?", "If I had studied medicine, I would be a doctor now.", "If I study, I pass.", "If I studied, I passed.", "If I had studied, I would have passed."],
      ["Choose the correct collocation.", "pose a threat", "make a threatness", "do a threat", "give a threat"],
      ["The manager had the documents ___ before noon.", "checked", "checking", "to check", "check"],
      ["Choose the best academic word for 'use'.", "utilize", "occur", "derive", "retain"],
      ["Not only ___ late, but he also forgot the files.", "was he", "he was", "did he was", "he did"],
      ["The clause 'although it was expensive' expresses ...", "concession", "purpose", "result", "condition"],
      ["Choose the correct ellipsis: I can solve it faster than she ___.", "can", "solves", "does solve", "is"],
      ["The word 'notwithstanding' is closest to ...", "despite", "because", "therefore", "unless"]
    ]
  },
  "Tarix": {
    medium: [
      ["Amir Temur davlatida markazlashuvni kuchaytirgan asosiy omil qaysi?", "Harbiy va ma'muriy islohotlar", "Faqat savdo", "Faqat dehqonchilik", "Dengiz floti"],
      ["Somoniylar davrida Buxoroning ahamiyati nimada edi?", "Ilm-fan va boshqaruv markazi", "Faqat harbiy lager", "Faqat port", "Faqat kon shahri"],
      ["Buyuk ipak yo'li Movarounnahrga qanday ta'sir ko'rsatgan?", "Savdo va madaniy almashinuvni kuchaytirgan", "Shaharlarni butunlay yopgan", "Dehqonchilikni tugatgan", "Til almashinuvini to'xtatgan"],
      ["Jaloliddin Manguberdi kurashining tarixiy ahamiyati qaysi?", "Mustaqillik va qarshilik ramzi", "Dengiz yurishi", "Faqat ilmiy kashfiyot", "Savdo shartnomasi"],
      ["Ulug'bek rasadxonasi nimasi bilan mashhur?", "Aniq astronomik kuzatuvlar", "Harbiy qurol ishlab chiqarish", "Dengiz xaritalari", "Qog'oz pul"],
      ["Boburnoma qanday turdagi manba?", "Tarixiy-memuar asar", "Faqat she'riy devon", "Qonunlar to'plami", "Kimyo risolasi"],
      ["1917-yil voqealari Turkistonga qanday ta'sir qilgan?", "Siyosiy beqarorlik va yangi harakatlar kuchaygan", "Barcha xonliklar tiklangan", "Savdo butunlay yo'qolgan", "Dengiz floti tuzilgan"],
      ["Konstitutsiya qabul qilinishi davlat uchun nimani bildiradi?", "Huquqiy asos mustahkamlanishini", "Faqat bayram kunini", "Faqat harbiy buyruqni", "Savdo tarifini"],
      ["Qadimgi Afina tarixda nimasi bilan ajraladi?", "Demokratiya tajribasi", "Porox ixtirosi", "Kompas yaratish", "Temir yo'l"],
      ["Rim huquqi keyingi davrlarga qanday ta'sir qilgan?", "Yuridik tizimlarga asos bo'lgan", "Faqat san'atga", "Faqat ovchilikka", "Faqat sportga"],
      ["Temuriylar davridagi madaniy yuksalish sababi qaysi?", "Ilm va san'at homiyligi", "Shaharlarning yopilishi", "Savdoning taqiqlanishi", "Yozuvning bekor qilinishi"],
      ["Xiva va Qo'qon xonliklari qaysi jarayon bilan bog'liq?", "Markaziy Osiyodagi siyosiy bo'linish", "Yevropa uyg'onishi", "Misr piramidalari", "Rim respublikasi"],
      ["Ikkinchi jahon urushi boshlanishiga bevosita sabab bo'lgan voqea qaysi?", "Germaniyaning Polshaga bostirib kirishi", "Versal saroyi qurilishi", "Buxoro amirligi tugashi", "Nil toshqini"],
      ["Al-Xorazmiy merosining jahon tarixidagi o'rni qaysi?", "Algebra va algoritm tushunchalariga hissa", "Faqat me'morchilik", "Faqat musiqa", "Faqat harbiy yurish"],
      ["Shayboniylar davlati Temuriylardan keyin qaysi hududda kuchaydi?", "Movarounnahrda", "Skandinaviyada", "Misrda", "Amerikada"],
      ["Qadimgi Misrda Nil daryosi qanday rol o'ynagan?", "Dehqonchilik va davlat hayotida asosiy omil", "Faqat chegarani yopgan", "Faqat tog' qazigan", "Savdoni yo'q qilgan"],
      ["Renessans davrining asosiy belgisi qaysi?", "Inson va ilmga qiziqish kuchayishi", "Ilmning taqiqlanishi", "Shaharlarning yo'qolishi", "Yozuvsiz jamiyat"],
      ["Mustaqillik deklaratsiyasi va mustaqillik e'lonining farqi nimada?", "Biri siyosiy-huquqiy yo'nalish, biri davlat mustaqilligini e'lon qilish", "Ikkalasi bir xil sana", "Ikkalasi harbiy shartnoma", "Ikkalasi savdo narxi"],
      ["Spitamen qo'zg'oloni qaysi jarayon bilan bog'liq?", "Aleksandr yurishlariga qarshilik", "Arab xalifaligi qulashi", "Mo'g'ul istilosi", "Rus inqilobi"],
      ["Turkiston jadidlari asosiy e'tiborni nimaga qaratgan?", "Ta'lim va islohotga", "Faqat ovchilikka", "Faqat dengizchilikka", "Faqat sportga"]
    ],
    hard: [
      ["Temuriylar renessansi kuchayishida qaysi omillar birgalikda hal qiluvchi bo'lgan?", "Markazlashgan hokimiyat, savdo va ilm homiyligi", "Faqat harorat", "Faqat chorvachilik", "Yozuvning yo'qolishi"],
      ["Somoniylar davlati qulashiga olib kelgan murakkab sabablar qaysi?", "Ichki zaiflashuv va turkiy sulolalar bosimi", "Faqat Nil toshqini", "Dengiz blokadasi", "Rim bosqini"],
      ["Jadidchilik harakatini modernizatsiya harakati deb baholashga asos qaysi?", "Yangi usul maktablari va matbuot orqali islohot g'oyalari", "Faqat harbiy yurish", "Faqat soliq oshishi", "Faqat ovchilik"],
      ["Mo'g'ullar istilosining Movarounnahrga uzoq muddatli ta'siri qaysi?", "Shaharlar va xo'jalik tizimida chuqur inqiroz", "Darhol sanoat inqilobi", "Dengiz savdosi ko'payishi", "Yozuv bekor qilinishi"],
      ["Ulug'bek ilmiy maktabining tarixiy ahamiyati nimada?", "Astronomik jadval va kuzatuv aniqligida", "Faqat jangovar taktika", "Qog'oz pulda", "Dengiz floti"],
      ["Buxoro, Xiva, Qo'qon xonliklarining alohida mavjudligi nimani kuchsizlantirdi?", "Siyosiy birlik va tashqi bosimga qarshilikni", "Iqlimni", "Tilni butunlay", "Dengiz yo'lini"],
      ["Versal tizimi Ikkinchi jahon urushiga qanday zamin yaratgan?", "Germaniyada revanshizm va siyosiy norozilikni kuchaytirgan", "Rimni tiklagan", "Misrni kengaytirgan", "Ipak yo'lini yopgan"],
      ["Afina demokratiyasining cheklangan tomoni qaysi?", "Ayollar, qullar va chet elliklar siyosiy huquqsiz bo'lgan", "Hamma teng ovoz bergan", "Podsho mutlaq bo'lgan", "Yozuv bo'lmagan"],
      ["Rim huquqining barqaror ta'siri qaysi sohada ko'proq seziladi?", "Fuqarolik huquqi va mulk munosabatlarida", "Faqat sportda", "Faqat ovda", "Faqat iqlimda"],
      ["Buyuk geografik kashfiyotlar jahon tarixida qanday burilish yasadi?", "Savdo yo'llari va mustamlakachilik tizimini o'zgartirdi", "Barcha urushlarni to'xtatdi", "Yozuvni yo'q qildi", "Dehqonchilikni bekor qildi"],
      ["Boburnoma tarixiy manba sifatida nimasi bilan qimmatli?", "Muallif kuzatuvlari va davr tafsilotlarini berishi bilan", "Faqat matematik jadval", "Faqat tibbiy retsept", "Faqat qo'shiq matni"],
      ["Al-Xorazmiy nomi algoritm atamasi bilan bog'lanishiga sabab nima?", "Uning lotinlashgan nomi va hisob usullari tarqalishi", "U dengizchi bo'lgani", "U shoir bo'lgani", "U faqat tarix yozgani"],
      ["Qadimgi Misr davlat tizimi Nil bilan qanday bog'langan?", "Sug'orish, soliq va markazlashgan boshqaruv orqali", "Faqat tog' konlari bilan", "Faqat qor bilan", "Faqat ko'chmanchilik bilan"],
      ["Rossiya imperiyasi Turkistonga kirib kelgach, boshqaruvda nima o'zgardi?", "Mustamlaka ma'muriy tizimi shakllandi", "Xonliklar kuchaydi", "Barcha soliqlar bekor bo'ldi", "Dengiz respublikasi tuzildi"],
      ["1916-yil qo'zg'oloni asosiy sabablaridan biri qaysi?", "Mardikorlikka olish va mustamlaka siyosati", "Kompas ixtirosi", "Renessans boshlanishi", "Nil toshqini"],
      ["Mustaqillikdan keyingi davlat ramzlari qabul qilinishi nimani anglatadi?", "Suveren davlat belgilarining huquqiy mustahkamlanishini", "Faqat san'at tanlovini", "Faqat sport jadvalini", "Faqat savdo chegirmasini"],
      ["Industrial inqilob jamiyat tuzilmasiga qanday ta'sir qildi?", "Urbanizatsiya va ishchi sinf o'sishi", "Shaharlar yo'qolishi", "Savdo tugashi", "Yozuv bekor bo'lishi"],
      ["Sovuq urush mohiyati nimada edi?", "Ikki tizimning siyosiy, harbiy va mafkuraviy raqobati", "Faqat issiq iqlim", "Faqat bitta davlat ichki urushi", "Qadimgi urush"],
      ["Amir Temur tuzuklari tarixiy manba sifatida nimani ochib beradi?", "Boshqaruv, harbiy tartib va davlat tamoyillarini", "Faqat she'riy vaznni", "Faqat tibbiy dorini", "Faqat savdo narxini"],
      ["Markaziy Osiyo tarixida karvon yo'llari shaharlar rivojiga qanday ta'sir qilgan?", "Hunarmandchilik, savdo va madaniy almashinuvni kuchaytirgan", "Shaharlarni butunlay bo'shatgan", "Fanni to'xtatgan", "Dehqonchilikni imkonsiz qilgan"]
    ]
  }
});

Object.assign(difficultyQuestionBanks, {
  "Biologiya": {
    medium: [
      ["Mitoxondriyaning asosiy vazifasi qaysi?", "Energiya hosil qilish", "Irsiy axborotni saqlash", "Fotosintez qilish", "Suv bug'latish"],
      ["Fotosintezning yorug'lik bosqichi qayerda kechadi?", "Xloroplast tilakoidlarida", "Yadroda", "Ribosomada", "Mitoxondriyada"],
      ["DNK nukleotidlarida qaysi azotli asos RNKda uchramaydi?", "Timin", "Adenin", "Guanin", "Sitozin"],
      ["Qonning ivishida qaysi hujayra bo'laklari muhim?", "Trombotsitlar", "Eritrotsitlar", "Neyronlar", "Osteotsitlar"],
      ["Oqsil sintezi qaysi organoidda amalga oshadi?", "Ribosomada", "Lizosomada", "Vakuolada", "Yadrochada"],
      ["Genotip nima?", "Organizm irsiy belgilar majmui", "Faqat tashqi belgi", "Faqat yashash muhiti", "Faqat ovqat turi"],
      ["Dominant belgi qanday holatda namoyon bo'ladi?", "Gomozigotada ham, geterozigotada ham", "Faqat retsessivda", "Faqat muhitda", "Hech qachon"],
      ["Kapillyarlar vazifasi qaysi?", "Moddalar almashinuvini ta'minlash", "Faqat qon saqlash", "Faqat suyak hosil qilish", "Faqat impuls o'tkazish"],
      ["Nefron qaysi organning tuzilma birligi?", "Buyrak", "O'pka", "Yurak", "Jigar"],
      ["Immunitetda antitanachalarni qaysi hujayralar ishlab chiqaradi?", "B-limfotsitlar", "Eritrotsitlar", "Trombotsitlar", "Osteoblastlar"],
      ["Ekotizimda produsentlar kimlar?", "Organik modda hosil qiluvchilar", "Faqat yirtqichlar", "Faqat parazitlar", "Faqat chirindilar"],
      ["Meioz natijasida qanday hujayralar hosil bo'ladi?", "Gaploid hujayralar", "Diploid somatik hujayralar", "Faqat bakteriyalar", "Faqat nerv hujayralari"],
      ["Fermentlar nima vazifa bajaradi?", "Biokimyoviy reaksiyalarni tezlashtiradi", "Genlarni yo'q qiladi", "Suvni metallga aylantiradi", "Hujayrani muzlatadi"],
      ["Gomeostaz nimani anglatadi?", "Ichki muhit barqarorligi", "Faqat o'sish", "Faqat ko'payish", "Faqat oziqlanish"],
      ["Transpiratsiya qaysi jarayon?", "O'simlikdan suv bug'lanishi", "Qon ivishi", "Nerv impulsi", "Oqsil parchalanishi"],
      ["Alveolalarda qanday jarayon boradi?", "Gaz almashinuvi", "Ovqat hazmi", "Qon ivishi", "DNK replikatsiyasi"],
      ["Mutatsiya nima?", "Genetik material o'zgarishi", "Faqat harakat", "Faqat nafas", "Faqat rang ko'rish"],
      ["Populyatsiyada tabiiy tanlanish nimaga olib keladi?", "Moslashgan belgilar ko'payishiga", "Barcha belgilar yo'qolishiga", "Faqat tasodifsiz jarayonga", "Genlar o'zgarmasligiga"],
      ["Xlorofill asosan qaysi nurni yutadi?", "Qizil va ko'k", "Faqat yashil", "Faqat oq", "Faqat infraqizil"],
      ["Refleks yoyi tarkibiga nima kiradi?", "Retseptor, nerv markazi va effektor", "Faqat suyak", "Faqat qon", "Faqat ferment"]
    ],
    hard: [
      ["AaBb × AaBb chatishtirishda ikki dominant fenotip nisbatining klassik qiymati qaysi?", "9:3:3:1", "3:1", "1:2:1", "1:1"],
      ["DNK replikatsiyasi yarim konservativ deyilishiga sabab nima?", "Har yangi DNKda bitta eski zanjir saqlanadi", "Ikkala zanjir ham yangilanmaydi", "RNK DNKga aylanadi", "Oqsil DNKni almashtiradi"],
      ["Krebs sikli qaysi joyda kechadi?", "Mitoxondriya matriksida", "Xloroplast stromasida", "Yadro membranasida", "Ribosomada"],
      ["Fotosintezda Kalvin sikli uchun bevosita zarur mahsulotlar qaysi?", "ATP va NADPH", "O2 va glyukoza", "DNK va RNK", "Kraxmal va lipid"],
      ["Meiozda krossingover qaysi bosqichda yuz beradi?", "Profaza I", "Anafaza II", "Telofaza I", "Metafaza II"],
      ["Hardy-Weinberg muvozanati qaysi holatda saqlanadi?", "Tanlanish, migratsiya va mutatsiya bo'lmasa", "Kuchli tanlanishda", "Doimiy mutatsiyada", "Populyatsiya juda kichik bo'lsa"],
      ["Ferment faolligi keskin pasayishiga eng ko'p nima sabab bo'lishi mumkin?", "Faol markaz denaturatsiyasi", "Substrat ko'payishi har doim", "pH ideal bo'lishi", "Harorat optimal bo'lishi"],
      ["Nerv impulsida depolyarizatsiya asosan nima bilan bog'liq?", "Na+ ionlarining kirishi", "DNK sintezi", "Oqsil ivishi", "Xlorofill parchalanishi"],
      ["Antigen taqdim etuvchi hujayralar immun javobda nimani boshlaydi?", "T-limfotsitlarni faollashtirishni", "Eritrotsitlarni ko'paytirishni", "Suyaklarni qisqartirishni", "Insulinni parchalashni"],
      ["Ekologik piramidada energiya yuqori trofik pog'onaga o'tganda qanday bo'ladi?", "Keskin kamayadi", "To'liq saqlanadi", "Har doim ortadi", "Yo'qolmaydi va ko'payadi"],
      ["Gen ekspressiyasi nimani bildiradi?", "Gen axborotining mahsulotga aylanishini", "Faqat DNK buzilishini", "Faqat mitozni", "Faqat hujayra o'lishini"],
      ["Osmos jarayoni qaysi sharoitda sodir bo'ladi?", "Yarim o'tkazuvchi membrana orqali suv o'tganda", "Faqat gazda", "Faqat yorug'likda", "Faqat suyakda"],
      ["Qon guruhlarida AB fenotipi qanday irsiylanishga misol?", "Kodominantlik", "To'liq retsessivlik", "Jinsga birikkanlik", "Poliploidiya"],
      ["O'simliklarda floema asosan nimani tashiydi?", "Organik moddalarni", "Faqat kislorodni", "Faqat DNKni", "Faqat suyak hujayrasini"],
      ["Nefronda qayta so'rilish nima uchun kerak?", "Foydali moddalarni qonga qaytarish uchun", "Qonni yurakka haydash uchun", "O'pka hajmini oshirish uchun", "Nerv impulsini to'xtatish uchun"],
      ["Viruslarning obligat parazit deyilishiga sabab nima?", "Faqat tirik hujayrada ko'payadi", "Mustaqil oziqlanadi", "Fotosintez qiladi", "Mitoz bilan bo'linadi"],
      ["Apoptoz qanday jarayon?", "Dasturlangan hujayra o'limi", "Tasodifiy suyak o'sishi", "Qon bosimi", "Faqat ovqat hazmi"],
      ["Biogeotsenoz barqarorligiga nima ko'proq yordam beradi?", "Turlar xilma-xilligi", "Faqat bitta tur", "Energiya oqimining yo'qligi", "Modda aylanishining to'xtashi"],
      ["Oqsilning uchlamchi strukturasi nima bilan belgilanadi?", "Polipeptidning fazoviy buklanishi", "Faqat nukleotid tartibi", "Faqat hujayra devori", "Faqat riboza"],
      ["Endokrin tizim signallari nerv tizimidan nimasi bilan farq qiladi?", "Gormonlar orqali sekinroq va uzoqroq ta'sir qiladi", "Elektr impuls bilan darhol", "Faqat suyak orqali", "Faqat tashqi muhitda"]
    ]
  }
});

Object.assign(difficultyQuestionBanks, {
  "Kimyo": {
    medium: [
      ["2H2 + O2 -> 2H2O reaksiyasida H2 oldidagi koeffitsiyent qaysi?", "2", "1", "3", "4"],
      ["NaOH va HCl reaksiyasi natijasida nima hosil bo'ladi?", "NaCl va H2O", "Na va Cl2", "H2 va O2", "Na2O va HCl"],
      ["pH=3 bo'lgan eritma qanday muhitga ega?", "Kislotali", "Neytral", "Ishqoriy", "Metallik"],
      ["CaCO3 parchalanganda qaysi gaz ajraladi?", "CO2", "O2", "H2", "N2"],
      ["Elektron yo'qotish jarayoni nima deyiladi?", "Oksidlanish", "Qaytarilish", "Neytrallanish", "Gidroliz"],
      ["1 mol moddadagi zarrachalar soni nima deyiladi?", "Avogadro soni", "Faradey soni", "Nyuton soni", "Paskal soni"],
      ["Kovalent bog'lanish asosan qanday hosil bo'ladi?", "Elektron juftlik almashish orqali", "Proton almashish orqali", "Faqat ion tortishish orqali", "Neytron ajratish orqali"],
      ["NaCl kristall panjarasida bog'lanish turi qaysi?", "Ion bog'lanish", "Metall bog'lanish", "Vodorod bog'", "Kovalent qutbsiz"],
      ["Suv molekulasi qutbli bo'lishiga sabab nima?", "Bog'lar qutbli va molekula burchakli", "Atomlar bir xil", "Elektronlar yo'q", "Molekula chiziqli"],
      ["Katalizator reaksiyada qanday o'zgaradi?", "Sarflanmay tezlikni oshiradi", "Har doim mahsulotga aylanadi", "Massani yo'q qiladi", "Atomlarni yo'qotadi"],
      ["H2SO4 tarkibidagi oltingugurtning oksidlanish darajasi qaysi?", "+6", "+4", "-2", "0"],
      ["CO2 da uglerodning oksidlanish darajasi qaysi?", "+4", "+2", "-4", "0"],
      ["Ishqoriy metallar davriy jadvalning qaysi guruhida?", "1-guruh", "7-guruh", "17-guruh", "18-guruh"],
      ["Galogenlarga qaysi element kiradi?", "Xlor", "Natriy", "Kalsiy", "Temir"],
      ["Eritmada erigan modda miqdori ko'p bo'lsa, eritma qanday?", "Konsentrlangan", "Suyultirilgan", "Toza", "Gazsimon"],
      ["Molekulyar massa H2O uchun nechaga teng?", "18", "16", "20", "2"],
      ["NH3 molekulasida azot valentligini toping.", "3", "1", "2", "5"],
      ["Metall oksidlari suv bilan ko'pincha nima hosil qiladi?", "Asos", "Kislota", "Tuz va vodorod", "Faqat gaz"],
      ["Kislota va asos reaksiyasi qanday ataladi?", "Neytrallanish", "Polimerlanish", "Yonish", "Sublimatsiya"],
      ["Endotermik jarayon qanday?", "Issiqlik yutadi", "Issiqlik chiqaradi", "Faqat yorug'lik chiqaradi", "Hech qanday energiya almashmaydi"]
    ],
    hard: [
      ["Fe2O3 da temirning oksidlanish darajasi qaysi?", "+3", "+2", "+6", "0"],
      ["KMnO4 da marganesning oksidlanish darajasi qaysi?", "+7", "+4", "+2", "-1"],
      ["0.5 mol CO2 normal sharoitda qancha hajm egallaydi?", "11.2 L", "22.4 L", "5.6 L", "44.8 L"],
      ["36 g suv necha molga teng?", "2 mol", "1 mol", "3 mol", "0.5 mol"],
      ["HCl + NaOH -> NaCl + H2O reaksiyasida ionik qisqa tenglama qaysi?", "H+ + OH- -> H2O", "Na+ + Cl- -> NaCl", "H2 + O2 -> H2O", "Na -> Na+"],
      ["Le Shatelye prinsipiga ko'ra bosim oshsa gazli muvozanat qaysi tomonga siljiydi?", "Molekulalar soni kam tomonga", "Molekulalar soni ko'p tomonga", "Har doim chapga", "Hech qachon siljimaydi"],
      ["sp3 gibridlanish odatda qanday geometriyaga mos?", "Tetraedrik", "Chiziqli", "Trigonal tekis", "Oktaedrik"],
      ["CH4 yonishida 1 mol CH4 uchun necha mol O2 kerak?", "2 mol", "1 mol", "4 mol", "0.5 mol"],
      ["Buffer eritmaning asosiy xususiyati qaysi?", "pH ni nisbatan barqaror saqlash", "Har doim qaynash", "Metallga aylanish", "Faqat rangsiz bo'lish"],
      ["Elektrolizda katodda qanday jarayon boradi?", "Qaytarilish", "Oksidlanish", "Neytrallanish", "Bug'lanish"],
      ["Galvanik elementda anodda nima sodir bo'ladi?", "Oksidlanish", "Qaytarilish", "Kondensatsiya", "Kristallanish"],
      ["Aromatik halqaga xos asosiy belgi qaysi?", "Delokallashgan pi-elektronlar", "Faqat ion bog'", "Faqat bitta atom", "Elektronsiz tuzilish"],
      ["Esterifikatsiya reaksiyasida odatda nima hosil bo'ladi?", "Ester va suv", "Tuz va vodorod", "Metall va kislorod", "Faqat kislota"],
      ["Qaysi omil reaksiya tezligini oshiradi?", "Haroratni oshirish", "Zarralar to'qnashuvini kamaytirish", "Katalizatorni olib tashlash", "Konsentratsiyani nol qilish"],
      ["Qattiq moddaning suyuqlanmasdan gazga o'tishi nima?", "Sublimatsiya", "Kondensatsiya", "Kristallanish", "Gidroliz"],
      ["Alkanlarning umumiy formulasi qaysi?", "CnH2n+2", "CnH2n", "CnH2n-2", "CnHn"],
      ["Karbon kislotalar funksional guruhi qaysi?", "-COOH", "-OH", "-CHO", "-NH2"],
      ["Oksidlovchi modda reaksiyada nima qiladi?", "Elektron qabul qiladi", "Elektron beradi", "Massasini yo'qotadi", "Hech qatnashmaydi"],
      ["Tuz gidrolizi qachon sezilarli bo'ladi?", "Kuchsiz kislota yoki asos tuzlarida", "Faqat inert gazlarda", "Faqat sof metallarda", "Har doim neytral tuzlarda"],
      ["Ideal gaz tenglamasi qaysi?", "pV = nRT", "F = ma", "E = mc2", "I = U/R"]
    ]
  }
});

Object.assign(difficultyQuestionBanks, {
  "Geografiya": {
    medium: [
      ["Musson shamollari asosan nimaga bog'liq?", "Quruqlik va okean qizishidagi farqqa", "Yer yadrosiga", "Faqat vulqonga", "Oy fazasiga"],
      ["Izobar xaritada nimani birlashtiradi?", "Bir xil havo bosimi nuqtalarini", "Bir xil balandlikni", "Bir xil haroratni", "Bir xil yog'inni"],
      ["Urbanizatsiya nima?", "Shahar aholisi ulushi ortishi", "Tog' yemirilishi", "Daryo sathi pasayishi", "Cho'l kengaymasligi"],
      ["Daryo havzasi deganda nima tushuniladi?", "Daryoga suv yig'iladigan hudud", "Faqat daryo o'zani", "Faqat ko'l tubi", "Faqat muzlik"],
      ["Antitsiklon odatda qanday ob-havo keltiradi?", "Ochiq va barqaror", "Doim kuchli yomg'ir", "Faqat qor bo'roni", "Doim tuman"],
      ["Materik shelf qaysi hudud?", "Qit'a sayoz dengiz chekkasi", "Okean eng chuqur joyi", "Cho'l markazi", "Vulqon krateri"],
      ["Demografik portlash nimani bildiradi?", "Aholi sonining juda tez o'sishi", "Aholi soni nol bo'lishi", "Faqat migratsiya yo'qligi", "Shaharlar kamayishi"],
      ["Laterit tuproqlar ko'proq qayerda uchraydi?", "Nam tropiklarda", "Arktikada", "Cho'llarda", "Tundrada"],
      ["Seysmik faol zonalar ko'proq qayerda?", "Litosfera plitalari chegaralarida", "Faqat tekislik markazida", "Faqat ko'llarda", "Faqat daryolarda"],
      ["Okean oqimlari iqlimga qanday ta'sir qiladi?", "Issiqlik va namlikni qayta taqsimlaydi", "Yer aylanishini to'xtatadi", "Tog'larni yo'q qiladi", "Bosimni nol qiladi"],
      ["Masshtab 1:100000 bo'lsa, xaritadagi 1 sm joyda qancha?", "1 km", "100 m", "10 km", "10 m"],
      ["Aholi zichligi qanday topiladi?", "Aholi soni maydonga bo'linadi", "Maydon aholiga ko'paytiriladi", "Yog'in haroratga bo'linadi", "Daryo uzunligi olinadi"],
      ["Orol dengizi inqirozining asosiy sababi qaysi?", "Daryo suvlarining sug'orishga haddan tashqari olinishi", "Faqat vulqon", "Faqat muzlik", "Faqat shamol"],
      ["Fyon shamoli qanday xususiyatga ega?", "Iliq va quruq", "Sovuq va nam", "Faqat dengizda", "Doim qorli"],
      ["Meridianlar qaysi qutblarni tutashtiradi?", "Shimoliy va janubiy qutbni", "Sharq va g'arbni", "Faqat ekvatorni", "Faqat tropiklarni"],
      ["Tog'larda balandlik ortishi bilan harorat odatda qanday o'zgaradi?", "Pasayadi", "Ortadi", "O'zgarmaydi", "Nol bo'ladi"],
      ["Subduktsiya nima?", "Bir plitaning boshqasi ostiga kirishi", "Daryo toshishi", "Shamol eroziyasi", "Ko'l qurishi"],
      ["Tropik siklon energiyasi asosan nimadan keladi?", "Iliq okean suvlaridan", "Muzliklardan", "Cho'l qumidan", "Tog' jinsidan"],
      ["Agrosanoat majmuasi nimani birlashtiradi?", "Qishloq xo'jaligi, qayta ishlash va xizmatlarni", "Faqat konchilikni", "Faqat turizmni", "Faqat transportni"],
      ["Geografik kenglik nimaga ta'sir qiladi?", "Quyosh radiatsiyasi miqdoriga", "Faqat daryo nomiga", "Faqat aholi tiliga", "Faqat tog' shakliga"]
    ],
    hard: [
      ["El-Nino hodisasi global iqlimga qanday ta'sir qiladi?", "Okean-atmosfera aylanishini o'zgartiradi", "Yer orbitasini o'zgartiradi", "Materiklarni siljitadi", "Vulqonlarni to'xtatadi"],
      ["Koppen tasnifida iqlim ajratish asosan qaysi ko'rsatkichlarga tayanadi?", "Harorat va yog'in rejimiga", "Faqat aholi soniga", "Faqat foydali qazilmaga", "Faqat daryo uzunligiga"],
      ["Plitalar ajralish zonasida ko'proq nima hosil bo'ladi?", "O'rta okean tizmalari", "Faqat cho'l", "Faqat muzlik", "Faqat delta"],
      ["Geografik qobiqning yaxlitligi nimani bildiradi?", "Litosfera, atmosfera, gidrosfera va biosfera o'zaro bog'liqligini", "Qobiqlar alohida ishlashini", "Faqat havo mavjudligini", "Faqat suv aylanishini"],
      ["Demografik o'tish modelining so'nggi bosqichiga xos belgi qaysi?", "Tug'ilish va o'lim past darajada", "Tug'ilish juda yuqori", "O'lim juda yuqori", "Aholi umuman yo'q"],
      ["Cho'llanishning antropogen sababi qaysi?", "Noto'g'ri sug'orish va ortiqcha yaylov", "Faqat Yer aylanishi", "Faqat Oy tortishi", "Faqat okean oqimi"],
      ["Termik ekvator nima?", "Eng yuqori o'rtacha haroratlar chizig'i", "Qutblar chizig'i", "Meridian turi", "Daryo chegarasi"],
      ["Delta hosil bo'lishi uchun qaysi sharoit qulay?", "Daryo ko'p cho'kindi olib kelishi va oqim sustligi", "Faqat tik qirg'oq", "Faqat muzlik", "Faqat kuchli to'lqin"],
      ["Resurslar bilan ta'minlanganlik qanday baholanadi?", "Zaxira va iste'mol nisbatiga qarab", "Faqat xarita rangiga", "Faqat aholi yoshiga", "Faqat shamolga"],
      ["Global shaharlar nimasi bilan ajraladi?", "Moliyaviy, boshqaruv va axborot markazligi bilan", "Faqat maydoni katta", "Faqat sovuq iqlim", "Faqat tog'da joylashgan"],
      ["Okean sho'rligi qayerda ko'proq ortadi?", "Bug'lanish yuqori, yog'in kam joylarda", "Daryo quyilishida", "Muz erigan hududda", "Yog'in ko'p joyda"],
      ["Atmosfera fronti nima?", "Turli havo massalari chegarasi", "Daryo manbai", "Tog' yonbag'ri", "Vulqon og'zi"],
      ["Aholi piramidasida keng poydevor nimani bildiradi?", "Yoshlar ulushi yuqoriligini", "Qariyalar ko'pligini", "Migratsiya yo'qligini", "Urbanizatsiya tugaganini"],
      ["Geosinklinal tushunchasi nimaga bog'liq?", "Tog' hosil bo'lish zonalariga", "Daryo deltalariga", "Aholi zichligiga", "Qor chizig'iga"],
      ["Qutbiy tun sababi qaysi?", "Yer o'qi qiyaligi va aylanishi", "Oy tutilishi", "Daryo muzlashi", "Shamol yo'qligi"],
      ["Iqlim kontinentalligi qachon kuchayadi?", "Okeandan uzoqlashganda", "Dengizga yaqinlashganda", "Namlik ortganda", "Bulut ko'payganda"],
      ["Karst relyefi qaysi jinslarda rivojlanadi?", "Ohaktosh kabi eruvchan jinslarda", "Granitda har doim", "Bazaltda faqat", "Qumda hech qachon"],
      ["Migratsiya saldosi qanday topiladi?", "Kelganlar minus ketganlar", "Tug'ilganlar minus o'lganlar", "Aholi maydonga bo'linadi", "Yog'in haroratga bo'linadi"],
      ["Geografik mehnat taqsimoti nimani anglatadi?", "Hududlarning muayyan ishlab chiqarishga ixtisoslashuvi", "Barcha hudud bir xil ishlab chiqarishi", "Faqat tabiiy ofat", "Faqat xarita tuzish"],
      ["Barqaror rivojlanishning asosiy mazmuni qaysi?", "Bugungi ehtiyojni kelajak imkoniyatini yemirmay qondirish", "Resurslarni tez tugatish", "Faqat sanoatni ko'paytirish", "Tabiatni hisobga olmaslik"]
    ]
  }
});

Object.assign(difficultyQuestionBanks, {
  "Ona tili": {
    medium: [
      ["Kesimi ot bilan ifodalangan gap qaysi?", "Bilim - kuch.", "Men bordim.", "U tez yugurdi.", "Bahor keldi."],
      ["Sifatdosh qatnashgan birikmani toping.", "O'qilgan kitob", "Yashil dala", "Beshta daftar", "Tez yurdi"],
      ["Ravish holi qatnashgan gap qaysi?", "U sekin gapirdi.", "Kitob qiziqarli.", "Daraxt baland.", "Men o'quvchiman."],
      ["Ko'makchi bilan kelgan so'zni toping.", "Vatan uchun", "Yurtimiz go'zal", "Kitob o'qildi", "Yetti kun"],
      ["Qo'shma gapni toping.", "Quyosh chiqdi va kun yorishdi.", "Oppoq tong.", "Tez yugurdi.", "Katta maktab."],
      ["Aniqlovchi qatnashgan birikma qaysi?", "Yangi daftar", "Tez keldi", "Uxladi", "Borib keldi"],
      ["Fe'lning orttirma nisbat shakli qaysi?", "O'qitdi", "O'qidi", "O'qildi", "O'qishdi"],
      ["Majhul nisbatdagi fe'lni toping.", "Yozildi", "Yozdi", "Yozishdi", "Yozdir"],
      ["Uyushiq bo'lakli gap qaysi?", "Ali, Vali va Salim keldi.", "Ali keldi.", "Keldi Ali.", "Katta uy."],
      ["Undalma qatnashgan gapni toping.", "Aziz do'stim, meni tingla.", "Do'stim keldi.", "Men do'stimni ko'rdim.", "Do'stlik muhim."],
      ["Paronim so'zlar qaysi qatorda?", "asr - asir", "katta - ulkan", "oq - qora", "tez - chaqqon"],
      ["Ibora ma'nosini toping: ko'ngli tog'dek ko'tarildi.", "Juda xursand bo'ldi", "Qo'rqdi", "Uxlab qoldi", "Arazladi"],
      ["Bog'lovchisiz qo'shma gapni toping.", "Bulut tarqaldi, quyosh chiqdi.", "Men va sen keldik.", "U yoki bu.", "Kitob ham daftar ham"],
      ["Qaratqich kelishigi qo'shimchasi qaysi?", "-ning", "-ni", "-ga", "-dan"],
      ["Turlanadigan so'z turkumini toping.", "Ot", "Ravish", "Ko'makchi", "Bog'lovchi"],
      ["Sodda yasama so'zni toping.", "Ishchi", "Qo'lqop", "Ona yurt", "Bordi"],
      ["Kesimlik qo'shimchasi qatnashgan so'z qaysi?", "O'quvchiman", "O'quvchi", "Maktab", "Darslik"],
      ["Modal so'z qatnashgan gap qaysi?", "Ehtimol, u kelar.", "U keldi.", "Men yozdim.", "Kitob ochiq."],
      ["Tinish belgisi to'g'ri qo'yilgan gap qaysi?", "Bahor keldi, gullar ochildi.", "Bahor keldi gullar ochildi.", "Bahor, keldi gullar.", "Bahor keldi gullar, ochildi."],
      ["Ko'chirma gapli gapni toping.", "U: “Men tayyorman”, dedi.", "U tayyor edi.", "Men uni ko'rdim.", "U tez keldi."]
    ],
    hard: [
      ["Ergash gap bosh gapdagi qaysi bo'lakni izohlasa, ega ergash gap bo'ladi?", "Egani", "Kesimni", "Holni", "Aniqlovchini"],
      ["Fe'lning o'zlik nisbatini toping.", "Yuvindi", "Yuvdi", "Yuvildi", "Yuvdir"],
      ["Sifatdosh va ravishdosh farqi nimada?", "Sifatdosh belgi, ravishdosh harakat holatini bildiradi", "Ikkalasi ot", "Ikkalasi son", "Farqi yo'q"],
      ["Qaysi gapda vergul undalma sabab qo'yilgan?", "Bolalar, dars boshlandi.", "Men keldim, u ketdi.", "U keldi va ketdi.", "Katta, chiroyli uy"],
      ["Kesim uyushgan gapni toping.", "U o'qidi, yozdi va chizdi.", "Ali va Vali keldi.", "Yangi daftar oldim.", "Dars boshlandi."],
      ["Qo'shma so'z qaysi qatorda?", "Gultojixo'roz", "Kitoblar", "Ishchi", "Yozildi"],
      ["Metafora ishlatilgan birikma qaysi?", "Ilm chirog'i", "Qizil olma", "Yangi daftar", "Katta xona"],
      ["Metonimiya namunasini toping.", "Butun zal kuldi.", "Tog'dek odam", "Oltin kuz", "Oq qor"],
      ["Sintaktik aloqa turi qaysi qatorda to'g'ri?", "Moslashuv, boshqaruv, bitishuv", "Sinonim, antonim, omonim", "Ot, sifat, son", "Ega, kesim, undalma"],
      ["Boshqaruv aloqasiga misol qaysi?", "Kitobni o'qimoq", "Katta uy", "Bizning maktab", "Tez yurmoq"],
      ["Bitishuv aloqasiga misol qaysi?", "Tez gapirmoq", "Maktabning hovlisi", "Kitobni oldi", "Uyga keldi"],
      ["Murakkab kesimli gapni toping.", "U shifokor bo'ldi.", "U keldi.", "Bahor.", "Kitob yangi."],
      ["Shart ergash gapli qo'shma gapni toping.", "Agar o'qisang, biliming ortadi.", "Men keldim va ko'rdim.", "U tez yurdi.", "Kitob qiziq."],
      ["Fonetik hodisa bor so'zni toping.", "Burni", "Kitob", "Daftar", "Qalam"],
      ["Omonim so'zlar qaysi qatorda?", "ot - ot", "katta - ulkan", "oq - qora", "tez - ildam"],
      ["Tasviriy ifoda qaysi?", "Qalam ahli", "Ko'k daftar", "Beshta kitob", "Tez yurish"],
      ["Nutq uslublaridan rasmiy uslubga xos birlik qaysi?", "Ariza", "Ertak", "Hazil", "Lirik she'r"],
      ["Ilmiy uslubga xos belgi qaysi?", "Terminlarning aniq qo'llanishi", "Faqat hayajon", "Faqat so'zlashuv", "Qofiya shartligi"],
      ["Qo'shma gap qismlari orasida sabab munosabati bor gap qaysi?", "Yomg'ir yog'di, shuning uchun yo'l loy bo'ldi.", "U keldi va ketdi.", "Men kitob oldim.", "Dars boshlandi."],
      ["Frazeologik birlik qaysi qatorda?", "Ko'z ochib yumguncha", "Katta bino", "Yangi mavzu", "Beshta olma"]
    ]
  }
});

Object.assign(difficultyQuestionBanks, {
  "Rus tili": {
    medium: [
      ["В каком слове пишется безударная проверяемая гласная?", "леса", "жираф", "шоссе", "кафе"],
      ["Найдите предложение с причастным оборотом.", "Книга, прочитанная учеником, лежала на столе.", "Ученик читал книгу.", "Книга интересна.", "Он быстро читал."],
      ["Какой падеж у слова 'к другу'?", "Дательный", "Родительный", "Винительный", "Творительный"],
      ["Выберите глагол совершенного вида.", "прочитать", "читать", "писать", "бегать"],
      ["Где нужна запятая?", "Когда пришла весна, стало тепло.", "Весна пришла тепло стало.", "Я читаю книгу.", "Он быстро идет."],
      ["Найдите наречие.", "внимательно", "внимательный", "внимание", "внимать"],
      ["Какое слово является кратким прилагательным?", "готов", "готовый", "готовить", "готовность"],
      ["Выберите слово с приставкой.", "подписать", "письмо", "писатель", "письменный"],
      ["Какой член предложения выделен: 'Утром мы ушли' - утром?", "Обстоятельство", "Подлежащее", "Сказуемое", "Дополнение"],
      ["Найдите сложное предложение.", "Солнце взошло, и птицы запели.", "Я читаю.", "Большой дом.", "Он весел."],
      ["Какой род у слова 'путь'?", "Мужской", "Женский", "Средний", "Общий"],
      ["Выберите форму творительного падежа.", "книгой", "книгу", "книги", "книге"],
      ["Что такое синоним?", "Слово близкое по значению", "Слово противоположное", "Одинаковое звучание", "Служебное слово"],
      ["Выберите деепричастие.", "прочитав", "прочитанный", "прочитал", "прочтение"],
      ["Какая частица пишется раздельно с глаголами?", "не", "нибудь", "то", "кое"],
      ["Найдите слово с суффиксом.", "лесник", "лес", "в лесу", "лесом"],
      ["Какой знак ставится в конце вопросительного предложения?", "?", ".", "!", ","],
      ["Выберите односоставное безличное предложение.", "Темнеет.", "Мальчик читает.", "Дом высок.", "Птицы летят."],
      ["В каком слове ударение падает на последний слог?", "договор", "звонит", "торты", "красивее"],
      ["Какое предложение осложнено обращением?", "Мама, я пришёл.", "Мама пришла.", "Я люблю маму.", "Мама дома."]
    ],
    hard: [
      ["Найдите предложение с обособленным обстоятельством.", "Улыбаясь, он вошёл в комнату.", "Он вошёл в комнату.", "Комната была светлой.", "Он улыбнулся."],
      ["Как объяснить постановку двоеточия: Я понял одно: времени мало.", "Вторая часть раскрывает содержание первой", "Перечисление подлежащих", "Прямая речь", "Сравнение"],
      ["В каком варианте есть грамматическая ошибка?", "Благодаря ошибки мы всё исправили.", "Благодаря помощи мы успели.", "Согласно приказу началась работа.", "Вопреки прогнозу было тепло."],
      ["Выберите предложение с придаточным уступки.", "Хотя было поздно, мы продолжали работать.", "Когда стемнело, мы ушли.", "Если будет дождь, останемся.", "Я знаю, что он придёт."],
      ["Какой тип связи в словосочетании 'очень быстро'?", "Примыкание", "Согласование", "Управление", "Координация"],
      ["Какой тип связи в словосочетании 'читать книгу'?", "Управление", "Согласование", "Примыкание", "Сочинение"],
      ["Найдите страдательное причастие прошедшего времени.", "прочитанный", "читающий", "прочитав", "читал"],
      ["В каком слове пишется НН?", "искусственный", "ветреный", "юный", "румяный"],
      ["Найдите вводное слово.", "к счастью", "быстро", "дом", "читать"],
      ["Какой вариант содержит паронимы?", "адресат - адресант", "большой - огромный", "свет - тьма", "ключ - ключ"],
      ["В каком предложении нужна тире между подлежащим и сказуемым?", "Знание - сила.", "Он врачом стал.", "Весна пришла.", "Дом высокий."],
      ["Какой вид придаточного: Я пришёл, чтобы помочь.", "Цели", "Причины", "Уступки", "Определительное"],
      ["Выберите правильное управление.", "оплатить проезд", "оплатить за проезд", "скучать за другом", "указать о проблеме"],
      ["Найдите предложение с косвенной речью.", "Он сказал, что придёт завтра.", "Он сказал: «Приду завтра».", "Приди завтра!", "Завтра он придёт."],
      ["Какой вариант содержит фразеологизм?", "спустя рукава", "быстрая река", "новый дом", "синий цвет"],
      ["В каком слове приставка заканчивается на З по правилу звонкости?", "разбить", "расписать", "испечь", "бесшумный"],
      ["Найдите сложноподчинённое предложение.", "Я знаю, что ты прав.", "Солнце взошло, птицы запели.", "Он пришёл и сел.", "Книга интересна."],
      ["Какая характеристика подходит слову 'прочитав'?", "Деепричастие совершенного вида", "Причастие настоящего времени", "Существительное", "Краткое прилагательное"],
      ["В каком варианте неверно образована форма?", "ихний", "красивее", "пятью", "лягте"],
      ["Какой художественный приём: 'море смеялось'?", "Олицетворение", "Гипербола", "Литота", "Антитеза"]
    ]
  }
});

function buildDifficultyQuestions(subject, difficulty, variant) {
  const bank = difficultyQuestionBanks[subject]?.[difficulty];
  if (bank?.length) {
    const shift = (variant * 7) % bank.length;
    const rows = [...bank.slice(shift), ...bank.slice(0, shift)];
    return fromRows(rows, variant + (difficulty === "hard" ? 2 : 1));
  }
  const sourceVariant = difficulty === "hard" ? (variant + 2) % 3 : (variant + 1) % 3;
  const source = buildSubjectQuestions(subject, sourceVariant);
  return source.map(item => ({ ...item, question: item.question.replace(/^(Mustahkamlash:|Aralash savol:)\s*/i, "") }));
}

const generatedDifficultyTestSets = catalogSubjects.flatMap(subject => {
  return ["medium", "hard"].flatMap((difficulty, difficultyIndex) => {
    return [0, 1, 2].map(variant => ({
      id: `${subjectSlug(subject)}-${difficulty === "hard" ? "juda-qiyin" : "orta-daraja"}-${variant + 1}`,
      subject,
      title: difficultyTitle(subject, difficulty, variant),
      rating: Number((4.73 + difficultyIndex * .11 + variant * .03).toFixed(2)),
      seedViews: 3600 + difficultyIndex * 1900 + variant * 620 + subject.length * 37,
      questions: buildDifficultyQuestions(subject, difficulty, variant)
    }));
  });
});

const mediumDifficultyTestSets = [
  {
    id: "matematika-orta-daraja-1",
    subject: "Matematika",
    title: "Matematika. O'rta daraja aralash test.",
    rating: 4.82,
    seedViews: 4216,
    questions: fromRows([
      ["(18 + 12) : 5 nechaga teng?", "6", "5", "7", "8"],
      ["2x + 7 = 19 bo'lsa, x nechaga teng?", "6", "5", "7", "8"],
      ["144 ning kvadrat ildizi nechaga teng?", "12", "10", "14", "16"],
      ["240 ning 15 foizi nechaga teng?", "36", "24", "30", "48"],
      ["3/4 + 1/8 nechaga teng?", "7/8", "4/12", "5/8", "1"],
      ["0.6 × 0.5 nechaga teng?", "0.3", "0.03", "0.11", "1.1"],
      ["Perimetri 36 cm bo'lgan kvadratning tomoni nechaga teng?", "9 cm", "6 cm", "8 cm", "12 cm"],
      ["Uchburchak burchaklari yig'indisi nechaga teng?", "180 daraja", "90 daraja", "270 daraja", "360 daraja"],
      ["5a - 2a + 7 ifoda soddalashsa nima bo'ladi?", "3a + 7", "7a", "3a - 7", "10a"],
      ["x/4 = 9 bo'lsa, x nechaga teng?", "36", "13", "27", "32"],
      ["Son 20% ga oshsa 72 bo'ldi. Dastlabki son nechaga teng?", "60", "58", "64", "66"],
      ["2, 5, 11, 23 ketma-ketlikda keyingi son qaysi?", "47", "35", "43", "50"],
      ["To'g'ri to'rtburchak yuzi 48, eni 6 bo'lsa, bo'yi nechaga teng?", "8", "6", "10", "12"],
      ["(-3)² + 4² nechaga teng?", "25", "7", "14", "49"],
      ["3(x - 2) = 15 bo'lsa, x nechaga teng?", "7", "5", "6", "9"],
      ["1 km ning 35 foizi necha metr?", "350 m", "35 m", "305 m", "650 m"],
      ["Aylana diametri 14 cm bo'lsa, radiusi nechaga teng?", "7 cm", "14 cm", "28 cm", "3.5 cm"],
      ["7 va 12 sonlarining EKUKi nechaga teng?", "84", "19", "42", "7"],
      ["48 va 60 sonlarining EKUBi nechaga teng?", "12", "6", "24", "4"],
      ["x² = 49 tenglamaning musbat yechimi qaysi?", "7", "6", "8", "49"]
    ], 1)
  },
  {
    id: "fizika-orta-daraja-1",
    subject: "Fizika",
    title: "Fizika. O'rta daraja masalalar.",
    rating: 4.77,
    seedViews: 3364,
    questions: fromRows([
      ["Jism 120 m masofani 10 s da bosib o'tsa, tezligi qancha?", "12 m/s", "10 m/s", "14 m/s", "1200 m/s"],
      ["Massa 4 kg, tezlanish 3 m/s² bo'lsa, kuch qancha?", "12 N", "7 N", "1.3 N", "24 N"],
      ["Ish formulasi qaysi?", "A = F × s", "P = A/t", "I = U/R", "rho = m/V"],
      ["60 J ish 5 s da bajarilsa, quvvat qancha?", "12 W", "300 W", "55 W", "65 W"],
      ["Zichlik 2 g/cm³, hajm 6 cm³ bo'lsa, massa qancha?", "12 g", "3 g", "8 g", "18 g"],
      ["Ohm qonuni bo'yicha U = 24 V, R = 6 Om bo'lsa, I qancha?", "4 A", "18 A", "30 A", "144 A"],
      ["Impuls formulasi qaysi?", "p = m × v", "F = m × a", "A = F × s", "Q = cmt"],
      ["Massasi 2 kg jism 5 m/s tezlikda harakatlansa, impulsi qancha?", "10 kg m/s", "7 kg m/s", "2.5 kg m/s", "25 kg m/s"],
      ["Erkin tushish tezlanishi taxminan qancha?", "9.8 m/s²", "98 m/s²", "0.98 m/s²", "1.8 m/s²"],
      ["Bosim formulasi qaysi?", "p = F/S", "F = p/S", "S = p/F", "p = F × S"],
      ["Kuch 50 N, yuza 5 m² bo'lsa, bosim qancha?", "10 Pa", "55 Pa", "250 Pa", "45 Pa"],
      ["Issiqlik miqdori formulasi qaysi?", "Q = cmt", "I = U/R", "A = Fs", "p = mv"],
      ["Tok kuchi 2 A, qarshilik 8 Om bo'lsa, kuchlanish qancha?", "16 V", "4 V", "10 V", "6 V"],
      ["Linza fokus masofasi nimani bildiradi?", "Optik markazdan fokusgacha masofa", "Jism massasini", "Tok kuchini", "Issiqlik miqdorini"],
      ["Tovush balandligi asosan nimaga bog'liq?", "Chastotaga", "Massaga", "Zichlikka", "Rangga"],
      ["Mexanik energiya qaysi energiyalar yig'indisi?", "Kinetik va potensial", "Faqat issiqlik", "Faqat elektr", "Faqat yorug'lik"],
      ["Kinetik energiya qachon ortadi?", "Tezlik ortganda", "Rang o'zgarganda", "Vaqt kamayganda", "Massa nol bo'lganda"],
      ["Suyuqlik bosimi chuqurlik ortganda qanday o'zgaradi?", "Ortadi", "Kamayadi", "O'zgarmaydi", "Yo'qoladi"],
      ["Parallel ulangan lampalarda kuchlanish qanday bo'ladi?", "Bir xil", "Har doim nol", "Tokka teng", "Qarshilikka teng"],
      ["Magnit maydon kuch chiziqlari qayerdan qayerga yo'naladi?", "Shimoliy qutbdan janubiy qutbga", "Janubdan shimolga ichkarida emas", "Faqat markazda", "Faqat yuqoriga"]
    ], 2)
  },
  {
    id: "ingliz-orta-daraja-1",
    subject: "Ingliz tili",
    title: "English. Intermediate grammar test.",
    rating: 4.79,
    seedViews: 5128,
    questions: fromRows([
      ["Choose the correct sentence.", "She has lived here since 2020.", "She lives here since 2020.", "She lived here since 2020.", "She is live here since 2020."],
      ["If I ___ enough time, I would help you.", "had", "have", "will have", "has"],
      ["Choose the correct passive form: They built the bridge in 1990.", "The bridge was built in 1990.", "The bridge built in 1990.", "The bridge is built in 1990.", "The bridge has built in 1990."],
      ["He is interested ___ science.", "in", "on", "at", "for"],
      ["Choose the correct form: I have never ___ to London.", "been", "went", "go", "going"],
      ["Which word is closest in meaning to “rapid”?", "fast", "late", "small", "silent"],
      ["Choose: By the time we arrived, the movie ___.", "had started", "started", "has started", "starts"],
      ["Choose the correct tag question: You are coming, ___?", "aren't you", "are you", "do you", "isn't it"],
      ["Find the adjective in the sentence: The careful student checked every answer.", "careful", "student", "checked", "answer"],
      ["Choose: This is the book ___ I told you about.", "that", "who", "where", "when"],
      ["Choose the correct form: She speaks English ___ than me.", "better", "gooder", "best", "more better"],
      ["Which sentence uses present perfect correctly?", "They have finished their homework.", "They has finished their homework.", "They finished their homework yesterday already.", "They have finish their homework."],
      ["Choose: I look forward to ___ from you.", "hearing", "hear", "heard", "to hear"],
      ["Reported speech: He said, “I am tired.”", "He said that he was tired.", "He said that I am tired.", "He says that he tired.", "He said he is tired."],
      ["Choose the correct modal: You ___ wear a seat belt in a car.", "must", "can to", "may to", "would to"],
      ["Which one is an uncountable noun?", "advice", "chairs", "books", "apples"],
      ["Choose: Neither Ali nor his friends ___ late.", "are", "is", "was", "be"],
      ["Choose the correct preposition: responsible ___ the project.", "for", "of", "at", "with"],
      ["Find the correct conditional: If it rains, we ___ at home.", "will stay", "would stayed", "stayed", "stay would"],
      ["Choose the correct infinitive/gerund: She decided ___ harder.", "to study", "studying", "study", "studied"]
    ], 3)
  }
];

subjectTestSets.splice(0, subjectTestSets.length, ...generatedSubjectTestSets, ...generatedDifficultyTestSets);

function testQuestionList(test) {
  const source = test.questions?.length ? test.questions : onaTiliTests;
  return source.slice(0, 20);
}

const contentTypes = {
  lessons: { label: "Dars", plural: "Darslar", icon: "📚" },
  tasks: { label: "Test", plural: "Testlar", icon: "✅" },
  tests: { label: "Olimpiada", plural: "Olimpiadalar", icon: "🏅" },
  goals: { label: "Maqsad", plural: "Maqsadlar", icon: "🎯" }
};

const officialOlympiads = [
  {
    title: "Talant FOT",
    icon: "🏆",
    tone: "pink",
    badge: "Respublika bo'ylab",
    subjects: "IT, Matematika va fan olimpiadalari",
    description: "O'zbekiston bo'ylab fan olimpiadalari platformasi.",
    registerUrl: "https://uztalent.uz/",
    infoUrl: "https://uztalent.uz/"
  },
  {
    title: "RANCH Olympiad",
    icon: "🏛",
    tone: "blue",
    badge: "Maktab o'quvchilari",
    subjects: "Matematika, fizika, informatika, kimyo, biologiya",
    description: "Maktab o'quvchilari uchun fan olimpiadalari.",
    registerUrl: "https://olympics.ranch.university/",
    infoUrl: "https://olympics.ranch.university/"
  },
  {
    title: "National Academic Challenge",
    icon: "★",
    tone: "green",
    badge: "1-6-sinflar",
    subjects: "Matematika, ingliz tili va biologiya",
    description: "Respublika miqyosidagi akademik olimpiada.",
    registerUrl: "https://www.nationalacademicchallenge.uz/",
    infoUrl: "https://www.nationalacademicchallenge.uz/"
  },
  {
    title: "IRN Olympiads",
    icon: "🏅",
    tone: "orange",
    badge: "1-11-sinflar",
    subjects: "Davlat va nodavlat maktablari uchun ochiq",
    description: "1-11-sinf o'quvchilari uchun ochiq olimpiada.",
    registerUrl: "https://irnolympiad.uz/",
    infoUrl: "https://irnolympiad.uz/"
  },
  {
    title: "BOND Olympiad",
    icon: "🎓",
    tone: "violet",
    badge: "Bolalar olimpiadasi",
    subjects: "Maktabgacha va maktab yoshidagi bolalar",
    description: "Bolalar uchun rasmiy BOND olimpiadasi.",
    registerUrl: "https://bondolympiad.uz/",
    infoUrl: "https://bondolympiad.uz/"
  },
  {
    title: "Maktab.uz Onlayn Olimpiada",
    icon: "💻",
    tone: "cyan",
    badge: "4-11-sinflar",
    subjects: "Umumta'lim maktablari, akademik litsey va kollej o'quvchilari",
    description: "Onlayn fan olimpiadalari axborot tizimi.",
    registerUrl: "https://olympiad.maktab.uz/",
    infoUrl: "https://olympiad.maktab.uz/"
  },
  {
    title: "ICO O'zbekiston 2026",
    icon: "🛡",
    tone: "blue",
    badge: "Milliy tanlov",
    subjects: "Kiberxavfsizlik olimpiadasi",
    description: "Kiberxavfsizlik bo'yicha milliy tanlov portali.",
    registerUrl: "https://ico26.uz/uz",
    infoUrl: "https://ico26.uz/uz"
  },
  {
    title: "Al-Xorazmiy Olimpiadasi",
    icon: "∑",
    tone: "orange",
    badge: "Aniq va tabiiy fanlar",
    subjects: "Science yo'nalishidagi respublika bosqichlari",
    description: "Al-Xorazmiy nomidagi fan olimpiadasi.",
    registerUrl: "https://olimpiada.uzedu.uz/",
    infoUrl: "https://olimpiada.uzedu.uz/"
  }
];

function isAdmin(user = currentUser) {
  return user?.email?.toLowerCase() === ADMIN_EMAIL || user?.role === "Admin";
}

function saveUsers() {
  localStorage.setItem("mindoraUsers", JSON.stringify(registeredUsers));
  updateLandingStats();
}

function saveAdminItems() {
  localStorage.setItem("mindoraAdminItems", JSON.stringify(adminItems));
}

function savePremiumCards() {
  localStorage.setItem("mindoraPremiumCards", JSON.stringify(premiumCards));
}

function savePremiumPayments() {
  localStorage.setItem("mindoraPremiumPayments", JSON.stringify(premiumPayments));
}

function saveUserGoals() {
  localStorage.setItem("mindoraUserGoals", JSON.stringify(userGoals));
}

function updateLandingStats() {
  const users = JSON.parse(localStorage.getItem("mindoraUsers") || "[]");
  const userCount = Math.max(users.length, currentUser ? 1 : 0);
  const values = {
    users: String(userCount),
    tests: `${subjectTestSets.length}+`,
    subjects: `${subjects.length}`,
    ai: "Faol"
  };
  Object.entries(values).forEach(([key, value]) => {
    const node = document.querySelector(`[data-landing-stat="${key}"]`);
    if (node) node.textContent = value;
  });
}

function testStatsKey(testId) {
  return `mindoraTestStats:${currentUser?.email || "guest"}:${testId}`;
}

function testViewsKey(testId) {
  return `mindoraTestViews:${testId}`;
}

function getTestStats(testId) {
  return JSON.parse(localStorage.getItem(testStatsKey(testId)) || "{\"views\":0,\"completed\":0}");
}

function getTestViews(testId) {
  return Number(localStorage.getItem(testViewsKey(testId)) || "0");
}

function saveTestStats(testId, stats) {
  localStorage.setItem(testStatsKey(testId), JSON.stringify(stats));
}

function countTestView(testId) {
  const stats = getTestStats(testId);
  stats.views = Number(stats.views || 0) + 1;
  saveTestStats(testId, stats);
  const views = getTestViews(testId) + 1;
  localStorage.setItem(testViewsKey(testId), String(views));
  return { ...stats, views };
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function itemsByType(type) {
  return adminItems.filter(item => item.type === type);
}

function formatName(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function saveLearningStats() {
  normalizeLearningStats();
  localStorage.setItem("mindoraLearningStats", JSON.stringify(learningStats));
}

function normalizeLearningStats() {
  learningStats.subjectProgress = learningStats.subjectProgress || {};
  learningStats.subjectMinutes = learningStats.subjectMinutes || {};
  learningStats.studyLog = Array.isArray(learningStats.studyLog) ? learningStats.studyLog : [];
}

function userXpKey(user = currentUser) {
  const email = user?.email?.toLowerCase();
  return email ? `mindoraUserXp:${email}` : "";
}

function storedUserXp(user = currentUser) {
  const email = user?.email?.toLowerCase();
  const saved = Number(localStorage.getItem(userXpKey(user)) || 0);
  const registered = registeredUsers.find(item => item.email?.toLowerCase() === email);
  const isCurrent = email && email === currentUser?.email?.toLowerCase();
  return Math.min(MAX_USER_XP, Math.max(
    Number(user?.xp || 0),
    Number(registered?.xp || 0),
    isCurrent && isAdminEmail(email) ? Number(learningStats.points || 0) : 0,
    saved,
    Number(defaultUserXp[email] || 0)
  ));
}

function isAdminEmail(email = "") {
  return String(email).toLowerCase() === ADMIN_EMAIL;
}

function sanitizeInheritedXp() {
  const inheritedXp = Number(defaultUserXp[ADMIN_EMAIL] || 0);
  let changed = false;
  registeredUsers = registeredUsers.map(user => {
    const email = user.email?.toLowerCase() || "";
    if (isAdminEmail(email)) return user;
    const key = userXpKey(user);
    const saved = Number(localStorage.getItem(key) || 0);
    if (Number(user.xp || 0) === inheritedXp || saved === inheritedXp) {
      localStorage.setItem(key, "0");
      changed = true;
      return { ...user, xp: 0, premium: false, premiumPaid: false, premiumPlan: "" };
    }
    return user;
  });
  if (currentUser && !isAdminEmail(currentUser.email) && Number(currentUser.xp || 0) === inheritedXp) {
    currentUser.xp = 0;
    if (Number(learningStats.points || 0) === inheritedXp) {
      learningStats.points = 0;
      learningStats.newPoints = 0;
      localStorage.setItem("mindoraLearningStats", JSON.stringify(learningStats));
    }
    localStorage.setItem(userXpKey(), "0");
    localStorage.setItem("mindoraUser", JSON.stringify(currentUser));
    changed = true;
  }
  if (changed) saveUsers();
}

function syncUserXp(nextXp = storedUserXp()) {
  if (!currentUser) return 0;
  const xp = Math.min(MAX_USER_XP, Math.max(0, Math.round(Number(nextXp) || 0)));
  currentUser.xp = xp;
  normalizeLearningStats();
  learningStats.points = Math.min(MAX_USER_XP, Math.max(Number(learningStats.points || 0), xp));
  localStorage.setItem(userXpKey(), String(xp));
  localStorage.setItem("mindoraUser", JSON.stringify(currentUser));
  localStorage.setItem("mindoraLearningStats", JSON.stringify(learningStats));
  const stored = registeredUsers.find(user => user.email?.toLowerCase() === currentUser.email?.toLowerCase());
  if (stored) {
    stored.xp = xp;
  } else {
    registeredUsers.unshift({ ...currentUser, xp, status: "Online", joined: new Date().toLocaleDateString("uz-UZ") });
  }
  saveUsers();
  return xp;
}

function progressSnapshot() {
  return [
    localStorage.getItem("mindoraLearningStats") || "",
    currentUser ? localStorage.getItem(userXpKey()) || "" : ""
  ].join("|");
}

function addLearningPoints(points) {
  const earned = Math.max(0, Math.round(Number(points) || 0));
  normalizeLearningStats();
  learningStats.points = Math.min(MAX_USER_XP, Number(learningStats.points || 0) + earned);
  learningStats.newPoints = Number(learningStats.newPoints || 0) + earned;
  syncUserXp(learningStats.points);
}

function grantPremiumToLeaderboardLeader(users) {
  const leader = users[0];
  const email = leader?.email?.toLowerCase();
  if (!email || storedUserXp(leader) <= 0) return;
  let changed = false;
  const stored = registeredUsers.find(user => user.email?.toLowerCase() === email);
  if (stored && !(stored.premium && stored.premiumPaid)) {
    unlockUserFeatures(stored, "leaderboard");
    changed = true;
  }
  if (currentUser?.email?.toLowerCase() === email && !(currentUser.premium && currentUser.premiumPaid)) {
    unlockUserFeatures(currentUser, "leaderboard");
    localStorage.setItem("mindoraUser", JSON.stringify(currentUser));
    changed = true;
  }
  if (changed) saveUsers();
  if (changed) {
    users.forEach(user => {
      if (user.email?.toLowerCase() === email) {
        unlockUserFeatures(user, "leaderboard");
      }
    });
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function activeStudySubject() {
  const route = currentRoute();
  const page = route.split("?")[0];
  const params = new URLSearchParams(route.split("?")[1] || "");
  if (page === "lesson-videos") {
    const slug = params.get("subject") || "";
    const subject = subjects.find(item => subjectSlug(item[0]) === slug);
    return subject?.[0] || "Darslar";
  }
  if (page === "tasks" || page.startsWith("tests")) return "Testlar";
  if (page === "ai-tutor") return "AI Ustoz";
  return "";
}

function recordStudyUsage(subject, minutes = 1) {
  if (!subject || !currentUser) return;
  normalizeLearningStats();
  const cleanMinutes = Math.max(1, Math.round(Number(minutes) || 1));
  learningStats.minutes = Number(learningStats.minutes || 0) + cleanMinutes;
  learningStats.subjectMinutes[subject] = Number(learningStats.subjectMinutes[subject] || 0) + cleanMinutes;
  const date = todayKey();
  const log = learningStats.studyLog.find(item => item.date === date);
  if (log) {
    log.minutes = Number(log.minutes || 0) + cleanMinutes;
  } else {
    learningStats.studyLog.push({ date, minutes: cleanMinutes });
  }
  learningStats.studyLog = learningStats.studyLog.slice(-400);
  const totalSubjectMinutes = Object.values(learningStats.subjectMinutes).reduce((sum, value) => sum + Number(value || 0), 0) || 1;
  learningStats.subjectProgress = Object.fromEntries(
    Object.entries(learningStats.subjectMinutes).map(([name, value]) => [name, Math.round(Number(value || 0) / totalSubjectMinutes * 100)])
  );
  saveLearningStats();
}

function saveLatestMistakes() {
  sessionStorage.setItem("mindoraLatestMistakes", JSON.stringify(latestMistakes));
}

function saveQuestionReports() {
  localStorage.setItem("mindoraQuestionReports", JSON.stringify(questionReports));
}

function formatStudyTime(minutes) {
  if (!minutes) return "0 soat";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? `${hours}h ${mins}m` : `${mins}m`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("en-US")}`;
}

function digitsOnly(value = "") {
  return String(value || "").replace(/\D/g, "");
}

function formatCardNumber(value = "") {
  return digitsOnly(value).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function maskedCard(value = "") {
  const digits = digitsOnly(value);
  return digits ? `•••• ${digits.slice(-4)}` : "Karta yo'q";
}

function progressPercent(value, max) {
  return Math.min(100, Math.round((Number(value || 0) / max) * 100));
}

function subjectValue(name, fallback = 0) {
  return learningStats.subjectProgress[name] ?? fallback;
}

function subjectSlug(name) {
  return encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));
}

function subjectImage(name) {
  const files = {
    "Ona tili": "ona-tili",
    "Adabiyot": "adabiyot",
    "Matematika": "matematika",
    "Algebra": "algebra",
    "Geometriya": "geometriya",
    "Fizika": "fizika",
    "Kimyo": "kimyo",
    "Biologiya": "biologiya",
    "Tarix": "tarix",
    "Geografiya": "geografiya",
    "Ingliz tili": "ingliz-tili",
    "Rus tili": "rus-tili",
    "Informatika": "informatika",
    "Huquq": "huquq",
    "Iqtisod": "iqtisod",
    "Astronomiya": "astronomiya",
    "Chizmachilik": "chizmachilik",
    "Tarbiya": "tarbiya",
    "SAT": "sat",
    "IELTS": "ielts"
  };
  return `assets/subject-art/${files[name] || subjectSlug(name)}.png`;
}

function subjectFromSlug(slug) {
  const decoded = decodeURIComponent(slug || "");
  return subjects.find(subject => subjectSlug(subject[0]) === decoded)?.[0] || subjects[0][0];
}

function youtubeEmbedFromUrl(url = "") {
  const value = String(url).trim();
  const idMatch = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  if (idMatch) return `https://www.youtube.com/embed/${idMatch[1]}?autoplay=1&rel=0`;
  return "";
}

function youtubeSearchEmbed(query = "") {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}&autoplay=1&rel=0`;
}

function subjectVideoList(subjectName) {
  const saved = (lessonVideos[subjectName] || []).map(video => ({
    title: video.title,
    description: video.description || "Admin tomonidan qo'shilgan video dars.",
    src: youtubeEmbedFromUrl(video.url),
    url: video.url
  }));
  const defaults = (defaultLessonVideos[subjectName] || []).map(([title, description, query]) => ({
    title,
    description,
    src: youtubeSearchEmbed(query),
    query
  }));
  return [...defaults, ...saved].filter(video => video.src || video.url);
}

function currentRoute() {
  return location.hash.replace("#", "") || localStorage.getItem("mindoraLastPage") || "dashboard";
}

function normalizeUser(user) {
  const email = user.email.toLowerCase();
  const existing = registeredUsers.find(item => item.email.toLowerCase() === email);
  const emailName = email.split("@")[0];
  const existingName = existing?.name || "";
  const brokenSavedName = !existingName || existingName.toLowerCase() === emailName || existingName.includes("@");
  const savedName = user.name || (email === ADMIN_EMAIL && brokenSavedName ? "Asadbek" : existingName || emailName);
  const savedPhone = user.phone || existing?.phone || "";
  const isSameCurrentUser = email && email === currentUser?.email?.toLowerCase();
  const isAdminUser = isAdminEmail(email);
  const savedXp = Math.min(MAX_USER_XP, Math.max(
    Number(existing?.xp || 0),
    isAdminUser ? Number(user.xp || 0) : 0,
    Number(localStorage.getItem(`mindoraUserXp:${email}`) || 0),
    isSameCurrentUser && isAdminUser ? Number(learningStats.points || 0) : 0,
    Number(defaultUserXp[email] || 0)
  ));
  const next = {
    name: formatName(savedName),
    email,
    phone: savedPhone,
    gender: user.gender || existing?.gender || "male",
    role: email === ADMIN_EMAIL ? "Admin" : existing?.role || user.role || "Foydalanuvchi",
    premium: existing?.premium || user.premium || false,
    premiumPaid: existing?.premiumPaid || user.premiumPaid || false,
    premiumPlan: existing?.premiumPlan || user.premiumPlan || "",
    xp: savedXp,
    status: "Online",
    joined: existing?.joined || new Date().toLocaleDateString("uz-UZ")
  };
  if (existing) Object.assign(existing, next);
  else registeredUsers.unshift(next);
  saveUsers();
  return next;
}

function updateCurrentUser(user) {
  currentUser = user;
  syncUserXp(storedUserXp(user));
  localStorage.setItem("mindoraUser", JSON.stringify(user));
}

function activatePremium(plan) {
  unlockUserFeatures(currentUser, plan);
  updateCurrentUser(currentUser);
  const stored = registeredUsers.find(user => user.email === currentUser.email);
  if (stored) {
    unlockUserFeatures(stored, plan);
    saveUsers();
  }
}

function recordPremiumPayment(planId, cardNumber, method = "card") {
  const plan = premiumPlanDetails(planId);
  const payment = {
    id: `pay-${Date.now().toString(36)}`,
    userEmail: currentUser.email,
    userName: currentUser.name,
    plan: plan.id,
    amount: plan.amount,
    method,
    cardLast4: digitsOnly(cardNumber).slice(-4),
    createdAt: new Date().toLocaleString("uz-UZ")
  };
  premiumPayments.unshift(payment);
  premiumPayments = premiumPayments.slice(0, 200);
  savePremiumPayments();
  return payment;
}

function hasPremiumAccess() {
  return Boolean((currentUser?.premium && currentUser?.premiumPaid) || isAdmin());
}

function canOpenPage(page) {
  if (page.startsWith("admin")) return isAdmin();
  if (premiumLockedPages.has(page)) return hasPremiumAccess();
  return true;
}

function unlockUserFeatures(user, plan = "admin") {
  if (!user) return;
  user.premium = true;
  user.premiumPaid = true;
  user.premiumPlan = user.premiumPlan || plan;
}

function avatar(user, big = false) {
  const gender = user?.gender || "male";
  const initials = (user?.name || "User")
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return `<div class="avatar ${gender === "female" ? "female" : ""} ${big ? "big" : ""}"><span>${initials}</span></div>`;
}

function toastMsg(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastMsg.t);
  toastMsg.t = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openAuth(nextMode) {
  mode = nextMode;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("#login-tab").classList.toggle("active", mode === "login");
  document.querySelector("#register-tab").classList.toggle("active", mode === "register");
  document.querySelector("#name-row").style.display = mode === "register" ? "grid" : "none";
  document.querySelector("#phone-row").style.display = mode === "register" ? "grid" : "none";
  document.querySelector("#phone-field").required = mode === "register";
  document.querySelector("#gender-row").style.display = mode === "register" ? "grid" : "none";
  const isRegister = mode === "register";
  document.querySelector("#auth-title").textContent = isRegister ? "Ro'yxatdan o'tish" : "Tizimga kirish";
  document.querySelector("#auth-subtitle").textContent = isRegister ? "Profilingizni yaratish uchun ma'lumot kiriting" : "Farzand va yutuqlaringizni kuzating";
  document.querySelector("#auth-submit").textContent = isRegister ? "Ro'yxatdan o'tish" : "Kirish";
  document.querySelector("#auth-switch-copy").innerHTML = isRegister
    ? `Hisobingiz bormi? <button id="auth-switch" type="button">Kirish</button>`
    : `Hisobingiz yo'qmi? <button id="auth-switch" type="button">Ro'yxatdan o'ting</button>`;
}

function renderLandingPage() {
  if (currentUser) return;
  document.querySelectorAll(".landing-home").forEach(section => section.classList.remove("hidden"));
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
}

function login(user) {
  updateCurrentUser(normalizeUser(user));
  modal.classList.remove("show");
  landing.classList.add("hidden");
  app.classList.remove("hidden");
  buildNav();
  render();
}

function buildNav() {
  nav.innerHTML = pages.map(([id, icon, label]) => {
    const locked = premiumLockedPages.has(id) && !hasPremiumAccess();
    return `<a href="#${id}" data-page="${id}" class="${locked ? "locked" : ""}" ${locked ? `aria-label="${label} premium bilan ochiladi"` : ""}><span>${locked ? "🔒" : icon}</span>${label}</a>`;
  }).join("");
  document.querySelector("#mini-profile").innerHTML = `
    <img class="mindora-chip-img" src="mindora.png" alt="Mindora AI Ustoz" />
  `;
  document.querySelector("#mini-profile").removeAttribute("data-go-page");
  document.querySelector("#profile-shortcut").innerHTML = `
    <img class="mindora-chip-img" src="mindora.png" alt="Mindora AI Ustoz" />
  `;
  document.querySelector("#profile-menu").innerHTML = `
    <button data-go-page="profile" type="button">Dashboard</button>
    ${isAdmin() ? `<button data-go-page="admin" type="button">Admin Panel</button>` : ""}
    <button data-logout type="button">Chiqish</button>
  `;
  document.querySelector(".upgrade-btn").onclick = () => { location.hash = "premium"; };
}

function pageHead(title, copy) {
  return `<div class="page-head"><div><p class="eyebrow">Mindora personal workspace</p><h1>${title}</h1><p>${copy}</p></div></div>`;
}

function metricCards() {
  const timeProgress = progressPercent(learningStats.minutes, 1440);
  const pointProgress = progressPercent(learningStats.points, 12560);
  return `<div class="grid cols-4">
    ${[
      ["O'rganish seriyasi", `${learningStats.streak} kun`, learningStats.streak ? "Davom etyapsiz" : "Hali boshlanmagan", progressPercent(learningStats.streak, 7)],
      ["O'rganish vaqti", formatStudyTime(learningStats.minutes), "Bu hafta", timeProgress],
      ["To'plangan ball", formatNumber(learningStats.points), learningStats.newPoints ? `+${formatNumber(learningStats.newPoints)} bu hafta` : "0 dan boshlanadi", pointProgress],
      ["Holatingiz", isAdmin() ? "Admin" : hasPremiumAccess() ? "Premium" : "Free", hasPremiumAccess() ? "Premium faol" : "Premium yoqilmagan", hasPremiumAccess() ? 100 : 0]
    ].map(([a,b,c,w]) => `<article class="card"><span>${a}</span><strong>${b}</strong><p>${c}</p><div class="progress"><i style="--w:${w}%"></i></div></article>`).join("")}
  </div>`;
}

function lessonsList() {
  return subjects.map((s, i) => {
    const progress = subjectValue(s[0], s[2]);
    return `<button class="lesson-row subject-row" data-subject="${subjectSlug(s[0])}" type="button"><div class="lesson-icon">${s[4]}</div><div><b>${s[0]}</b><p>${s[1]}</p></div><span>${s[3]}</span><b>${progress}%</b><div class="progress"><i style="--w:${progress}%"></i></div></button>`;
  }).join("");
}

function lessonsPage() {
  return `
    ${pageHead("Darslar sahifasi", "Maktab fanlari, SAT va IELTS bo'yicha video darslar katalogi.")}
    ${customContentSection("lessons", itemsByType("lessons"))}
    <article class="panel">
      <div class="section-title">
        <div><h2>Barcha fanlar</h2></div>
      </div>
      <div class="subject-grid">
        ${subjects.map(subjectCard).join("")}
      </div>
    </article>
  `;
}

function subjectCard(subject) {
  const [name, description] = subject;
  const videos = lessonVideos[name] || [];
  return `
    <button class="subject-card image-subject-card" data-subject="${subjectSlug(name)}" type="button" aria-label="${escapeHtml(name)} darslari" style="--subject-bg:url('${subjectImage(name)}')">
      <div class="subject-copy">
        <strong>${escapeHtml(name)}</strong>
        <p>${escapeHtml(description)}</p>
      </div>
      ${videos.length ? `<span>${videos.length} video</span>` : ""}
    </button>
  `;
}

function lessonVideosPage() {
  const params = new URLSearchParams(currentRoute().split("?")[1] || "");
  const subjectName = subjectFromSlug(params.get("subject"));
  const subject = subjects.find(item => item[0] === subjectName) || subjects[0];
  const videos = subjectVideoList(subjectName);
  return `
    <div class="page-head lesson-page-head">
      <div>
        <p class="eyebrow">Mindora personal workspace</p>
        <h1>${escapeHtml(subjectName)} video darslari</h1>
        <p>${escapeHtml(subject[1])}</p>
      </div>
      <button class="back-pill-btn" data-go-page="lessons" type="button">Fanlarga qaytish</button>
    </div>
    <section class="lesson-video-layout">
      <article class="panel video-list-panel">
        <div class="youtube-player" id="youtube-player">
          <div>
            <strong>Video player</strong>
            <p>Darsni boshlash uchun pastdagi “Ijro etish” tugmasini bosing.</p>
          </div>
        </div>
        <div class="section-title">
          <div><h2>Video darslar ro'yxati</h2><p>Hozircha ${videos.length} ta video. Keyin shu yerga video darslar qo'shasiz.</p></div>
        </div>
        <div class="video-list">
          ${videos.length ? videos.map((video, index) => `
            <article class="video-row">
              <span>${index + 1}</span>
              <div><strong>${escapeHtml(video.title)}</strong><p>${escapeHtml(video.description || "")}</p></div>
              <button class="primary-btn" data-play-video="${escapeHtml(video.src || video.url)}" type="button">Ijro etish</button>
            </article>
          `).join("") : `<div class="empty-state">Bu fan uchun video darslar keyin qo'shiladi.</div>`}
        </div>
      </article>
    </section>
  `;
}

function chart(id, type = "line", values = "") {
  const dataValues = values ? ` data-values="${escapeHtml(values)}"` : "";
  return `<div class="chart"><canvas id="${id}" data-chart="${type}"${dataValues}></canvas></div>`;
}

function adminSparkline(values, labels = [], tone = "cyan") {
  const safeValues = values.map(value => Math.max(0, Number(value) || 0));
  const max = Math.max(...safeValues, 1);
  const points = safeValues.map((value, index) => {
    const x = 8 + index * (284 / Math.max(safeValues.length - 1, 1));
    const y = 118 - (value / max) * 92;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const areaPoints = `8,124 ${points} 292,124`;
  return `
    <div class="admin-sparkline ${tone}">
      <svg viewBox="0 0 300 132" role="img" aria-label="Admin statistikasi">
        <defs>
          <linearGradient id="${tone}-line" x1="0" x2="1">
            <stop offset="0%" stop-color="#32e8ff" />
            <stop offset="55%" stop-color="#7a35ff" />
            <stop offset="100%" stop-color="#ff38d2" />
          </linearGradient>
          <linearGradient id="${tone}-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#7a35ff" stop-opacity=".34" />
            <stop offset="100%" stop-color="#32e8ff" stop-opacity="0" />
          </linearGradient>
        </defs>
        ${[26, 49, 72, 95, 118].map(y => `<line x1="8" y1="${y}" x2="292" y2="${y}" />`).join("")}
        <polygon points="${areaPoints}" />
        <polyline points="${points}" />
        ${safeValues.map((value, index) => {
          const [x, y] = points.split(" ")[index].split(",");
          return `<circle cx="${x}" cy="${y}" r="${index === safeValues.length - 1 ? 5 : 3.4}" /><text x="${x}" y="${Math.max(14, Number(y) - 10)}">${value}</text>`;
        }).join("")}
      </svg>
      <div class="admin-chart-labels">
        ${labels.map(label => `<span>${escapeHtml(label)}</span>`).join("")}
      </div>
    </div>
  `;
}

function adminRoleBreakdown(totalUsers, premiumUsers, adminUsers) {
  const regularUsers = Math.max(totalUsers - premiumUsers - adminUsers, 0);
  const rows = [
    ["Admin", adminUsers, "#ff38d2"],
    ["Premium", premiumUsers, "#ffc447"],
    ["User", regularUsers, "#32e8ff"]
  ];
  const total = Math.max(rows.reduce((sum, row) => sum + row[1], 0), 1);
  const adminStop = adminUsers / total * 100;
  const premiumStop = adminStop + premiumUsers / total * 100;
  return `
    <div class="admin-role-breakdown">
      <div class="role-ring" style="--admin-stop:${adminStop}%;--premium-stop:${premiumStop}%;">
        <strong>${totalUsers}</strong>
        <span>jami</span>
      </div>
      <div class="role-bars">
        ${rows.map(([label, value, color]) => `
          <div class="role-bar" style="--role-color:${color};--role-width:${Math.max(8, value / total * 100)}%">
            <div><span>${label}</span><b>${value}</b></div>
            <i></i>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function heatmap() {
  return `<div class="heatmap">${Array.from({ length: 112 }, (_, i) => `<i class="heat" style="--h:${18 + (i * 23) % 82}"></i>`).join("")}</div>`;
}

function recommendations() {
  return `<div class="grid">${[
    `${currentUser.name}, bugun matematika bo'yicha 18% o'sish uchun 45 daqiqa chuqur mashq qiling.`,
    "Ingliz tili so'zlarini kechqurun emas, ertalab takrorlash sizda yaxshiroq natija beradi.",
    "AI xotira xaritasi kimyo mavzusini 24 soat ichida qaytarishni tavsiya qildi.",
    "Career agent sizga Data/AI yo'nalishi uchun portfolio reja tuzdi."
  ].map((t, i) => `<article class="lesson-row"><div class="lesson-icon">AI</div><div><b>Tavsiya ${i + 1}</b><p>${t}</p></div><button class="ghost-btn action" type="button">Qo'llash</button></article>`).join("")}</div>`;
}

function dashboardTiles() {
  return `
    <section class="dashboard-tiles">
      ${[
        ["lessons", "Darslar", "Video darslar va fanlar ro'yxati.", "Darslar.png"],
        ["ai-tutor", "AI Ustoz", "Savollaringizga AI yordamida javob oling.", "AI.png"],
        ["memory", "Xotira", "Takrorlash va eslab qolish xaritasi.", "Xotira.png"],
        ["premium", "Premium", "Premium imkoniyatlar va status.", "premium.png"],
        ["statistics", "Statistika", "O'qish natijalari va ballar.", "Statistika.png"],
        ["leaderboard", "Leaderboard", "Reyting va yutuqlar jadvali.", "leaderboard.png"]
      ].map(([page, title, copy, image]) => `
        <article class="dashboard-tile" data-go-page="${page}">
          <div class="tile-image"><img src="${image}" alt="${title} preview" loading="lazy" /></div>
          <h3>${title}</h3>
          <p>${copy}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function todayPlan() {
  const plans = [
    {
      copy: "Bugun bitta darsni yakunlab, qisqa test bilan natijani mustahkamlang.",
      quote: "Dars + test = aniq progress.",
      primary: ["lessons", "Darslarni boshlash"],
      secondary: ["tasks", "Test ishlash"]
    },
    {
      copy: "Bugun maqsadingizni yangilang va eng muhim bitta vazifani belgilang.",
      quote: "Aniq maqsad o'qishni yengillashtiradi.",
      primary: ["goals", "Maqsad qo'shish"],
      secondary: ["ai-tutor", "AI reja so'rash"]
    },
    {
      copy: "Bugun AI Ustozdan qiyin mavzuni so'rang, keyin tavsiyani amalda bajaring.",
      quote: "Savol berish ham o'rganishning bir qismi.",
      primary: ["ai-tutor", "AI Ustozga o'tish"],
      secondary: ["lessons", "Darslarni ko'rish"]
    },
    {
      copy: "Bugun xotira bo'limida eski mavzuni qaytaring va bilimni yangilang.",
      quote: "Takrorlash bilimni mustahkamlaydi.",
      primary: ["memory", "Xotirani ochish"],
      secondary: ["tasks", "Tekshirib ko'rish"]
    },
    {
      copy: "Bugun statistikangizni ko'rib, qaysi fan ko'proq e'tibor talab qilishini tanlang.",
      quote: "Raqamlar keyingi qadamni ko'rsatadi.",
      primary: ["statistics", "Statistikani ko'rish"],
      secondary: ["lessons", "Dars tanlash"]
    },
    {
      copy: "Bugun leaderboarddan ilhom oling va reyting uchun kamida bitta topshiriq bajaring.",
      quote: "Kichik yutuq ham reytingni siljitadi.",
      primary: ["leaderboard", "Reytingni ko'rish"],
      secondary: ["tasks", "Ball yig'ish"]
    },
    {
      copy: "Bugun haftalik o'qishni sarhisob qiling va keyingi haftaga yengil reja tuzing.",
      quote: "Tartibli reja ertangi startni oson qiladi.",
      primary: ["goals", "Reja tuzish"],
      secondary: ["ai-tutor", "AI tavsiya olish"]
    }
  ];
  const today = new Date();
  const dayNumber = Math.floor(new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 86400000);
  return plans[dayNumber % plans.length];
}

function dashboard() {
  const plan = todayPlan();
  return `
    <section class="home-os">
      <div class="home-main">
        <section class="home-showcase">
          <aside class="home-side-panel home-achievement-panel">
            <h3>Nimalarga <span>erishasiz?</span></h3>
            ${[
              ["lessons", "assets/a.png", "Bilimingizni oshirasiz", "Interaktiv darslar va testlar bilan bilim oling.", "cyan"],
              ["goals", "assets/b.png", "Maqsadlaringizga erishasiz", "Shaxsiy reja orqali oldinga boring.", "pink"],
              ["ai-tutor", "assets/s.png", "AI yordamida o'rganasiz", "Sun'iy intellekt sizga eng yaxshi yo'lni tanlaydi.", "violet"],
              ["statistics", "assets/d.png", "Natijalaringizni kuzatasiz", "Statistika orqali yutuqlaringizni ko'ring.", "cyan"],
              ["leaderboard", "assets/e.png", "Yetakchilardan bo'lasiz", "Leaderboard orqali o'rningizni ko'taring.", "gold"]
            ].map(([page, image, title, copy, tone]) => `
              <article class="home-benefit home-achievement-card ${tone}" data-go-page="${page}">
                <img src="${image}" alt="${title}" loading="lazy" />
                <div><b>${title}</b><p>${copy}</p></div>
                <span aria-hidden="true">›</span>
              </article>
            `).join("")}
          </aside>
          <div class="home-center-stage">
            <div class="welcome-row">
              <div>
                <p class="eyebrow">Shaxsiy ta'lim paneli</p>
                <h1>Xush kelibsiz, ${currentUser.name}!</h1>
                <p>Bugungi darslar, testlar, maqsadlar va AI tavsiyalar sizning o'quv rejangizga moslab tayyorlandi.</p>
              </div>
            </div>
            <div class="brain-dashboard">
              <div class="brain-stage"></div>
            </div>
          </div>
          <aside class="home-side-panel home-start-panel">
            <div class="home-start-title"><span></span><h3>Bugungi reja</h3></div>
            <p>${plan.copy}</p>
            <div class="home-quote">${plan.quote}</div>
            <button class="primary-btn" data-go-page="${plan.primary[0]}" type="button">${plan.primary[1]}</button>
            <button class="ghost-btn" data-go-page="${plan.secondary[0]}" type="button">${plan.secondary[1]}</button>
          </aside>
        </section>
        ${metricCards()}
        ${dashboardTiles()}
      </div>
    </section>
  `;
}

function adminPanel() {
  const users = registeredUsers.length ? registeredUsers : [normalizeUser(currentUser)];
  const totalUsers = users.length;
  const premiumUsers = users.filter(user => user.premium).length;
  const adminUsers = users.filter(user => user.role === "Admin" || user.email === ADMIN_EMAIL).length;
  const revenue = premiumPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const lessonCount = itemsByType("lessons").length;
  const taskCount = itemsByType("tasks").length;
  const overviewValues = [
    Math.max(1, totalUsers),
    Math.max(2, totalUsers + lessonCount),
    Math.max(3, totalUsers + lessonCount + taskCount),
    Math.max(4, totalUsers + premiumUsers + taskCount + 2),
    Math.max(5, totalUsers + lessonCount + taskCount + premiumUsers + 4)
  ];
  const revenueValues = premiumPayments.length
    ? premiumPayments.slice(0, 6).reverse().map(payment => Math.round(Number(payment.amount || 0) / 1000))
    : [12, 18, 24, 30, 42, 56];
  return `
    ${pageHead("Admin Panel", "")}
    <div class="admin-dashboard pro-admin">
      <div class="admin-top">
        <div>
          <p class="eyebrow">Platform boshqaruvi</p>
          <h2>Mindora AI admin markazi</h2>
        </div>
        <button class="primary-btn" data-open-create type="button">+ Qo'shish</button>
      </div>
      <div class="admin-metrics">
        ${[
          ["Users", totalUsers, "ro'yxatdan o'tgan", "👥"],
          ["Online", users.filter(u => u.status === "Online").length, "faol userlar", "🧑‍💻"],
          ["Premium", premiumUsers, "premium yoqilgan", "👑"],
          ["Adminlar", adminUsers, "boshqaruv huquqi", "🛡️"],
          ["Xato savollar", questionReports.length, "ko'rib chiqish kerak", "⚠"],
          ["Daromad", formatMoney(revenue), `${premiumPayments.length} ta to'lov`, "💵"]
        ].map(([label, value, hint, icon]) => `<article class="admin-metric"><i>${icon}</i><span>${label}</span><strong>${value}</strong><small>${hint}</small></article>`).join("")}
      </div>
      ${adminQuestionReports()}
      ${adminPaymentPanel()}
      <div class="admin-grid">
        <article class="panel admin-chart"><div class="section-title"><h2>Overview Analytics</h2><span class="badge">This month</span></div>${adminSparkline(overviewValues, ["Users", "Darslar", "Testlar", "Premium", "O'sish"], "cyan")}</article>
        <article class="panel admin-chart small"><div class="section-title"><h2>Users by Role</h2><span class="badge">Live</span></div>${adminRoleBreakdown(totalUsers, premiumUsers, adminUsers)}</article>
        <article class="panel admin-chart small"><div class="section-title"><h2>System Status</h2><span class="badge">Operational</span></div>${["AI Services","Database","Storage","Server Load"].map((t, i) => `<div class="status-row"><span>${t}</span><b>${i === 3 ? "48%" : "100%"}</b></div>`).join("")}</article>
        <article class="panel admin-chart"><div class="section-title"><h2>Revenue Overview</h2><span class="badge">${formatMoney(revenue)}</span></div>${adminSparkline(revenueValues, ["Yan", "Fev", "Mar", "Apr", "May", "Iyun"], "gold")}</article>
        <article class="panel admin-chart"><div class="section-title"><h2>Top Countries</h2><span class="badge">Online</span></div><div class="country-map"></div></article>
      </div>
      <article class="panel admin-users">
        <div class="section-title">
          <div><h2>Ro'yxatdan o'tganlar</h2><p>Haqiqiy kirgan userlar. Premium va admin huquqi shu yerdan beriladi.</p></div>
          <label class="admin-search"><input type="search" placeholder="Search user..." /></label>
        </div>
        <div class="user-list">
          ${users.map(user => `
            <div class="admin-user-row">
              <div class="user-avatar ${user.gender === "female" ? "female" : ""}">${user.name.split(" ").map(x => x[0]).join("").slice(0,2).toUpperCase()}</div>
              <div><strong>${user.name}</strong><span>${escapeHtml(user.phone || "Telefon raqam kiritilmagan")}</span><span>${escapeHtml(user.email)}</span></div>
              <span class="role-pill">${user.email === ADMIN_EMAIL || user.role === "Admin" ? "Admin" : "User"}</span>
              <span class="status-pill ${user.premium ? "" : "off"}">${user.premium ? "Premium" : "Free"}</span>
              <button class="ghost-btn admin-user-action" data-email="${user.email}" data-action="admin" type="button">${user.role === "Admin" || user.email === ADMIN_EMAIL ? "Adminni olish" : "Admin berish"}</button>
              <button class="primary-btn admin-user-action" data-email="${user.email}" data-action="premium" type="button">${user.premium ? "Premiumni olish" : "Premium berish"}</button>
            </div>`).join("")}
        </div>
      </article>
      <div class="admin-bottom">
        ${[["Total Sessions","0","+0%"],["Avg Session Time","0m","0%"],["Pages Viewed","0","0%"],["Bounce Rate","0%","0%"],["New Users","0","+0%"],["Satisfaction","0/5","+0"]].map(x => `<article class="bottom-stat"><span>${x[0]}</span><strong>${x[1]}</strong><small>${x[2]}</small></article>`).join("")}
      </div>
    </div>
  `;
}

function adminQuestionReports() {
  return `
    <article class="panel admin-report-panel">
      <div class="section-title">
        <div><h2>Xato topilgan savollar</h2><p>Foydalanuvchi “Xatolik topdim” bosgan savollar shu yerda yig'iladi.</p></div>
        <span class="badge">${questionReports.length} ta</span>
      </div>
      <div class="admin-report-list">
        ${questionReports.length ? questionReports.map(report => `
          <div class="admin-report-row">
            <div>
              <span>${escapeHtml(report.subject)} • ${escapeHtml(report.testTitle)}</span>
              <b>${escapeHtml(report.question)}</b>
              <small>${escapeHtml(report.user || "Foydalanuvchi")} • ${escapeHtml(report.createdAt)}</small>
            </div>
            <button class="ghost-btn" data-resolve-report="${escapeHtml(report.id)}" type="button">Tuzatildi</button>
          </div>
        `).join("") : `<div class="empty-state">Hozircha xato deb belgilangan savol yo'q.</div>`}
      </div>
    </article>
  `;
}

function adminPaymentPanel() {
  return `
    <article class="panel admin-payment-panel">
      <div class="section-title">
        <div>
          <h2>Premium karta sozlamalari</h2>
          <p>Checkout faqat shu yerga qo'shilgan karta raqamlarini qabul qiladi.</p>
        </div>
        <span class="badge">${premiumCards.length} ta karta</span>
      </div>
      <form id="admin-card-form" class="admin-card-form">
        <label><span>Karta raqami</span><input name="allowedCardNumber" inputmode="numeric" maxlength="19" placeholder="8600 0000 0000 0000" required /></label>
        <label><span>Karta egasi</span><input name="cardOwner" placeholder="Masalan: Asadbek" /></label>
        <button class="primary-btn" type="submit">Kartani qo'shish</button>
      </form>
      <div class="admin-payment-grid">
        <div>
          <h3>Ruxsat berilgan kartalar</h3>
          <div class="admin-card-list">
            ${premiumCards.length ? premiumCards.map(card => `
              <div class="admin-card-row">
                <b>${maskedCard(card.number)}</b>
                <span>${escapeHtml(card.owner || "Premium karta")}</span>
                <button class="ghost-btn" data-delete-card="${card.id}" type="button">O'chirish</button>
              </div>
            `).join("") : `<div class="empty-state">Hali karta qo'shilmagan. Premium checkout to'lovni qabul qilishi uchun karta kiriting.</div>`}
          </div>
        </div>
        <div>
          <h3>To'lovlar tarixi</h3>
          <div class="admin-card-list">
            ${premiumPayments.length ? premiumPayments.slice(0, 5).map(payment => `
              <div class="admin-card-row payment">
                <b>${escapeHtml(payment.userName)} · ${formatMoney(payment.amount)}</b>
                <span>${maskedCard(payment.cardLast4)} · ${escapeHtml(payment.createdAt)}</span>
              </div>
            `).join("") : `<div class="empty-state">Hali premium to'lovi yo'q.</div>`}
          </div>
        </div>
      </div>
    </article>
  `;
}

function adminContentList() {
  const latestItems = adminItems.slice(0, 6);
  return `
    <article class="panel admin-content-panel">
      <div class="section-title">
        <div><h2>Qo'shilgan kontentlar</h2><p>Admin yaratgan test, dars, topshiriq va boshqa sahifa materiallari.</p></div>
        <button class="ghost-btn" data-open-create type="button">Yangi qo'shish</button>
      </div>
      <div class="admin-create-shortcuts">
        ${Object.entries(contentTypes).map(([id, type]) => `
          <button class="create-shortcut" data-open-create="${id}" type="button">
            <span>${type.icon}</span>
            <b>${type.plural}</b>
          </button>
        `).join("")}
      </div>
      <div class="content-list">
        ${latestItems.length ? latestItems.map(contentCard).join("") : `<div class="empty-state">Hali kontent qo'shilmagan. Add New orqali birinchi test yoki darsni yarating.</div>`}
      </div>
    </article>
  `;
}

function contentCard(item) {
  const meta = contentTypes[item.type] || contentTypes.lessons;
  const details = [
    item.subject,
    item.period,
    item.deadline,
    item.duration,
    item.questions ? `${item.questions} ta savol` : "",
    item.points ? `${item.points} ball` : ""
  ].filter(Boolean);
  return `
    <article class="content-card">
      <div class="content-icon">${meta.icon}</div>
      <div>
        <span>${meta.label}${item.level ? ` • ${escapeHtml(item.level)}` : ""}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.description || "Tavsif qo'shilmagan.")}</p>
        ${details.length ? `<small>${details.map(escapeHtml).join(" • ")}</small>` : ""}
      </div>
      <div class="content-actions">
        <button class="ghost-btn" data-go-page="${item.type === "tests" ? "tests-closed" : item.type}" type="button">Ochish</button>
        ${isAdmin() ? `<button class="ghost-btn danger-btn" data-delete-content="${item.id}" type="button">O'chirish</button>` : ""}
      </div>
    </article>
  `;
}

function adminFormFields(type) {
  if (type === "lessons") {
    return `
      <div class="form-grid">
        <label>Fan
          <select name="subject">
            ${subjects.map(subject => `<option>${escapeHtml(subject[0])}</option>`).join("")}
          </select>
        </label>
        <label>Video havola
          <input name="url" type="url" placeholder="https://youtube.com/..." />
        </label>
        <label>Dars davomiyligi
          <input name="duration" type="text" placeholder="12 daqiqa" />
        </label>
        <label>Daraja
          <select name="level"><option>Boshlang'ich</option><option>O'rta</option><option>Murakkab</option></select>
        </label>
      </div>
      <label>Dars matni
        <textarea name="body" rows="5" placeholder="Darsda o'tiladigan asosiy mavzular..."></textarea>
      </label>
    `;
  }
  if (type === "tasks" || type === "tests") {
    return `
      <div class="form-grid">
        <label>Daraja
          <select name="level"><option>Oson</option><option>O'rta</option><option>Qiyin</option><option>Premium</option></select>
        </label>
        <label>Savollar soni
          <input name="questions" type="number" min="0" max="200" placeholder="10" />
        </label>
        <label>Vaqt
          <input name="duration" type="text" placeholder="30 daqiqa" />
        </label>
        <label>Ball / XP
          <input name="points" type="number" min="0" max="1000" placeholder="100" />
        </label>
      </div>
      <label>Savollar
        <textarea name="body" rows="6" placeholder="1. Savol...&#10;A) Javob..."></textarea>
      </label>
    `;
  }
  if (type === "goals") {
    return `
      <div class="form-grid">
        <label>Muddat
          <input name="deadline" type="text" placeholder="Masalan: 7 kun" />
        </label>
        <label>Davr
          <select name="period"><option>Kunlik</option><option>Haftalik</option><option>Oylik</option><option>Yillik</option></select>
        </label>
        <label>Boshlang'ich progress
          <input name="points" type="number" min="0" max="100" placeholder="0" />
        </label>
        <label>Ustuvorlik
          <select name="level"><option>Oddiy</option><option>Muhim</option><option>Shoshilinch</option></select>
        </label>
      </div>
      <label>Reja bosqichlari
        <textarea name="body" rows="5" placeholder="1. Bugun...&#10;2. Ertaga..."></textarea>
      </label>
    `;
  }
  return `
    <div class="form-grid">
      <label>Turi
        <select name="level"><option>Konspekt</option><option>Formula</option><option>Qoida</option><option>Premium</option></select>
      </label>
      <label>Mavzu
        <input name="subject" type="text" placeholder="Masalan: Algebra" />
      </label>
    </div>
    <label>Konspekt matni
      <textarea name="body" rows="8" placeholder="Konspektni shu yerga yozing..."></textarea>
    </label>
  `;
}

function adminCreatePage() {
  const requestedType = new URLSearchParams(currentRoute().split("?")[1] || "").get("type") || "tests";
  const selectedType = contentTypes[requestedType] ? requestedType : "tests";
  const selectedMeta = contentTypes[selectedType];
  const items = adminItems.slice(0, 8);
  return `
    ${pageHead(`${selectedMeta.plural} qo'shish`, "Har bir bo'lim uchun mos forma ochiladi va saqlangandan keyin material o'z sahifasida ko'rinadi.")}
    <section class="create-layout">
      <article class="panel create-form-panel">
        <div class="section-title">
          <div><h2>${selectedMeta.icon} ${selectedMeta.label} yaratish</h2><p>Turini almashtirsangiz forma ham shu bo'limga moslashadi.</p></div>
          <button class="ghost-btn" data-go-page="admin" type="button">Admin panel</button>
        </div>
        <form id="admin-create-form" class="admin-create-form">
          <label>Qaysi sahifaga qo'shiladi?
            <select name="type" id="content-type">
              ${Object.entries(contentTypes).map(([id, type]) => `<option value="${id}" ${id === selectedType ? "selected" : ""}>${type.plural}</option>`).join("")}
            </select>
          </label>
          <label>Nomi
            <input name="title" type="text" placeholder="Masalan: Algebra boshlang'ich testi" required />
          </label>
          <label>Qisqa tavsif
            <textarea name="description" rows="4" placeholder="O'quvchi ko'radigan izoh yoki vazifa mazmuni"></textarea>
          </label>
          ${adminFormFields(selectedType)}
          <button class="primary-btn full" type="submit">Saqlash va sahifaga qo'shish</button>
        </form>
      </article>
      <aside class="panel create-preview-panel">
        <div class="section-title">
          <div><h2>Oxirgi qo'shilganlar</h2><p>Yangi materiallar shu ro'yxatda ham ko'rinadi.</p></div>
        </div>
        <div class="content-list compact">
          ${items.length ? items.map(contentCard).join("") : `<div class="empty-state">Hozircha ro'yxat bo'sh.</div>`}
        </div>
      </aside>
    </section>
  `;
}

function profilePage() {
  const role = isAdmin() ? "Admin" : "User";
  const verified = isAdmin() ? "Admin verified" : hasPremiumAccess() ? "Premium user" : "User verified";
  const joined = currentUser.joined || new Date().toLocaleDateString("uz-UZ");
  const skillRows = profileSkills();
  const activityRows = profileActivities();
  return `
    <section class="profile-page">
      <div class="profile-hero">
        <span class="profile-crest">✯</span>
        <div>
          <p class="eyebrow">Mindora personal workspace</p>
          <h1>Profile Overview</h1>
          <p>${role} profilingiz, avatar, vazifalar va o'quv statistikasi.</p>
        </div>
      </div>
      <section class="profile-layout profile-grid-main">
        <article class="panel profile-card profile-user-card">
          <div class="profile-orb"><span>${escapeHtml((currentUser.name || "U").charAt(0).toUpperCase())}</span><i>♛</i></div>
          <h2>${escapeHtml(currentUser.name)}</h2>
          <p>${role}</p>
          <span class="profile-role-badge">${verified}</span>
          <div class="profile-rating">✦ ✦ ✦ ✦ ✦</div>
          <div class="profile-meta">
            <button data-profile-action="avatar" type="button"><span>♙</span><small>Gender avatar</small><b>${currentUser.gender === "female" ? "Qiz bola" : "O'g'il bola"}</b></button>
            <button data-profile-action="phone" type="button"><span>☎</span><small>Phone</small><b>${escapeHtml(currentUser.phone || "Telefon raqam kiritilmagan")}</b></button>
            <button data-profile-action="location" type="button"><span>📍</span><small>Location</small><b>${escapeHtml(currentUser.location || "Tashkent, Uzbekistan")}</b></button>
            <button data-profile-action="joined" type="button"><span>▣</span><small>Joined</small><b>${escapeHtml(joined)}</b></button>
          </div>
        </article>
        <article class="panel profile-skill-card">
          <div class="profile-panel-head"><h2>Skills & Expertise</h2></div>
          <div class="profile-crystal"><span>◇</span></div>
          <div class="profile-skill-list">
            ${skillRows.map(skill => `
              <button class="profile-skill-row" data-profile-skill="${escapeHtml(skill.target)}" type="button">
                <span>${skill.icon}</span><div><b>${escapeHtml(skill.name)}</b><i><em style="--w:${skill.value}%"></em></i></div><strong>${skill.value}%</strong>
              </button>
            `).join("")}
          </div>
          <button class="profile-all-btn" data-go-page="statistics" type="button">Barcha ko'nikmalar →</button>
        </article>
        <article class="panel profile-activity-card">
          <div class="profile-panel-head"><h2>Recent activity</h2></div>
          <div class="profile-activity-grid">
            ${activityRows.map((item, index) => `
              <article class="profile-activity-item tone-${index + 1}">
                <i aria-hidden="true"></i>
                <div><span>${item.icon}</span><b>Tavsiya ${index + 1}</b></div>
                <p>${escapeHtml(item.text)}</p>
                <button data-profile-activity="${escapeHtml(item.target)}" type="button">Qo'llash →</button>
              </article>
            `).join("")}
          </div>
        </article>
      </section>
    </section>
  `;
}

function profileSkills() {
  const subjectValues = Object.entries(learningStats.subjectProgress || {}).sort((a, b) => b[1] - a[1]);
  return [
    { name: "AI & Automation", value: Math.max(60, hasPremiumAccess() ? 92 : 72), icon: "⚙", target: "ai-tutor" },
    { name: "Data Analysis", value: Number(subjectValues[0]?.[1] || 88), icon: "▣", target: "statistics" },
    { name: "Web Development", value: Number(subjectValues[1]?.[1] || 85), icon: "▱", target: "lessons" },
    { name: "UI/UX Design", value: Number(subjectValues[2]?.[1] || 80), icon: "◎", target: "goals" },
    { name: "Problem Solving", value: Math.max(65, learningStats.testScore || 90), icon: "♢", target: "tasks" }
  ].map(skill => ({ ...skill, value: Math.min(100, Math.round(skill.value)) }));
}

function profileActivities() {
  const name = currentUser.name || "User";
  return [
    { icon: "▣", target: "lessons", text: `${name}, bugun matematika bo'yicha 18% o'sish uchun 45 daqiqa chuqur mashq qiling.` },
    { icon: "📘", target: "lessons", text: "Ingliz tili so'zlarini ertalab takrorlash sizda yaxshiroq natija beradi." },
    { icon: "🎯", target: "memory", text: "AI xotira xaritasi zaif mavzularni 24 soat ichida qaytarishni tavsiya qildi." },
    { icon: "📈", target: "goals", text: "Career agent sizga AI loyihani yo'naltirish uchun portfolio yaratishni tavsiya qiladi." }
  ];
}

function premiumPage() {
  const active = hasPremiumAccess();
  const plans = [
    ["monthly", "Oylik", "UZS 30 000", "/ oy", "Har oy yangilanadi"],
    ["yearly", "Yillik", "UZS 330 000", "/ yil", "2 oy tejaladi"],
    ["lifetime", "Umrbod", "UZS 900 000", "", "Bir marta to'lov"]
  ];
  const freeFeatures = [
    "Asosiy darslar va testlar",
    "AI Ustozdan cheklangan yordam",
    "Oddiy statistika va maqsadlar",
    "Premiumga istalgan vaqtda o'tish"
  ];
  const proFeatures = [
    "AI Ustoz to'liq ochiladi",
    "Xotira bo'limi ochiladi",
    "Leaderboard ochiladi",
    "Cheksiz dars va testlar",
    "Statistika va progress",
    "Premium materiallar"
  ];
  return `
    <section class="premium-page ${active ? "premium-active" : ""}">
      <div class="premium-pricing-grid">
        <article class="premium-tier-card free-tier">
          <div class="premium-card-head">
            <div class="premium-tier-icon">0</div>
            <span class="premium-plan-label">Boshlash uchun</span>
          </div>
          <div class="premium-tier-title">
            <h1>Free</h1>
            <p>Asosiy imkoniyatlar bilan davom eting.</p>
          </div>
          <div class="premium-feature-list compact">
            ${freeFeatures.map(feature => `<button class="premium-feature" data-premium-feature="dashboard" type="button"><span>✓</span><b>${feature}</b></button>`).join("")}
          </div>
          <button class="premium-free-btn" type="button">Free</button>
        </article>

        <article class="premium-tier-card pro-tier">
          <div class="premium-card-head">
            <div class="premium-tier-icon crown">♕</div>
            <span class="premium-plan-label">Tavsiya etiladi</span>
          </div>
          <div class="premium-tier-title pro-price">
            <h1 data-premium-price>UZS 30 000</h1>
            <span data-premium-period>/ oy</span>
            <p>Premium darslar, AI yordam va progress nazorati.</p>
          </div>
          <div class="premium-plan-tabs" aria-label="Premium tariflar">
            ${plans.map((plan, index) => `
              <button class="${index === 0 ? "active" : ""}" data-premium-select="${plan[0]}" data-price="${plan[2]}" data-period="${plan[3]}" type="button">
                <b>${plan[1]}</b>
                <span>${plan[2]}</span>
                <small>${plan[3] || "bir marta"} · ${plan[4]}</small>
              </button>
            `).join("")}
          </div>
          <div class="premium-feature-list compact pro-list">
            ${proFeatures.map(feature => `<button class="premium-feature" data-premium-feature="premium" type="button"><span>✓</span><b>${feature}</b></button>`).join("")}
          </div>
          <div class="premium-manual-pay">
            <b>Manual to'lov</b>
            <p><strong>Karta raqami:</strong> ${manualPaymentDetails.cardNumber}</p>
            <p><strong>Karta egasi:</strong> ${manualPaymentDetails.owner}</p>
            <p><strong>Telegram:</strong> <span>${manualPaymentDetails.telegram}</span></p>
            <small>To'lovdan keyin skrinshotni Telegram orqali yuboring. Admin tasdiqlagach Pro ochiladi.</small>
          </div>
          <button class="primary-btn premium-activate-btn" data-premium-plan="monthly" type="button">${active ? "Pro faol" : "Pro ni faollashtirish"}</button>
        </article>
      </div>
    </section>
  `;
}

function premiumPlanDetails(id = "monthly") {
  return {
    monthly: { id: "monthly", label: "Oylik", price: "UZS 30 000", amount: 30000 },
    yearly: { id: "yearly", label: "Yillik", price: "UZS 330 000", amount: 330000 },
    lifetime: { id: "lifetime", label: "Umrbod", price: "UZS 900 000", amount: 900000 }
  }[id] || { id: "monthly", label: "Oylik", price: "UZS 30 000", amount: 30000 };
}

function premiumCheckoutPage() {
  const params = new URLSearchParams(currentRoute().split("?")[1] || "");
  const plan = premiumPlanDetails(params.get("plan"));
  return `
    <section class="checkout-page">
      <article class="checkout-card manual-checkout-card">
        <div class="manual-checkout-top">
          <div>
            <span>Manual Checkout</span>
            <b>${escapeHtml(plan.label)} Pro</b>
          </div>
          <div>
            <button data-go-page="premium" type="button" aria-label="Yopish">×</button>
          </div>
        </div>
        <div class="manual-checkout-body">
          <h1>Pro ni faollashtirish</h1>
          <p>Pastdagi kartaga to'lov qiling va to'lov skrinshotini Telegram orqali admin'ga yuboring.</p>
          <div class="manual-total-card">
            <div>
              <span>Jami to'lov</span>
              <strong>${plan.price}</strong>
              <small>${escapeHtml(plan.label)} tarif</small>
            </div>
            <i>▰</i>
          </div>
          <div class="manual-pay-panel">
            <article>
              <b>Karta raqami: <span>${manualPaymentDetails.cardNumber}</span></b>
              <b>Karta egasi: <span>${manualPaymentDetails.owner}</span></b>
              <b>Skrinshot uchun Telegram: <span>${manualPaymentDetails.telegram}</span></b>
            </article>
            <article>
              <b>To'lov eslatmasi</b>
              <p>To'lovdan keyin skrinshotni ${manualPaymentDetails.telegram} ga yuboring. Admin tekshirganidan keyin Pro profilingizga ulanadi.</p>
            </article>
          </div>
          <p class="manual-confirm-note">Admin tomonidan qo'lda tasdiqlanadi</p>
        </div>
      </article>
    </section>
  `;
}

function fillDemoPayment(form) {
  const card = form?.elements.cardNumber;
  const expiry = form?.elements.expiry;
  const cvc = form?.elements.cvc;
  const sms = form?.elements.smsCode;
  const adminCard = premiumCards[0]?.number;
  if (!adminCard) {
    toastMsg("Avval admin panelda premium karta qo'shing.");
    return;
  }
  if (card) card.value = formatCardNumber(adminCard);
  if (expiry) expiry.value = "12/29";
  if (cvc) cvc.value = "123";
  if (sms) sms.value = "1111";
}

function showCheckoutSms(form) {
  form.classList.add("checkout-awaiting-sms");
  form.querySelector("#checkout-sms")?.classList.remove("hidden");
  form.querySelector("[name='smsCode']")?.focus();
  toastMsg("SMS tasdiqlash kodi yuborildi: 1111");
}

function genericPage(title, copy, kind = "mixed", type = "") {
  const visual = kind === "heat" ? heatmap() : kind === "lessons" ? lessonsList() : recommendations();
  const customItems = type ? itemsByType(type) : [];
  return `${pageHead(title, copy)}${customContentSection(type, customItems)}<article class="panel wide-list-panel"><h2>${title}</h2>${visual}</article>`;
}

function testPage() {
  const tests = itemsByType("tasks");
  const testSubjects = catalogSubjects;
  const activeSubject = new URLSearchParams(currentRoute().split("?")[1] || "").get("subject") || "";
  const activeTest = new URLSearchParams(currentRoute().split("?")[1] || "").get("test") || "";
  const selectedSubject = activeSubject ? subjectFromSlug(activeSubject) : "";
  if (activeTest) return subjectTestRunner(activeTest);
  const visibleTests = selectedSubject ? subjectTestSets.filter(test => test.subject === selectedSubject) : subjectTestSets;
  return `
    <section class="test-catalog-shell">
      <div class="test-catalog-hero">
        <p>Bilimingizni sinovdan o'tkazadigan joy</p>
        <h1>Mavzuli testlar</h1>
      </div>
      <div class="test-topic-sidebar">
        <button class="${selectedSubject ? "" : "active"}" data-test-all type="button">Barchasi</button>
        ${testSubjects.map(subject => `<button class="${selectedSubject === subject ? "active" : ""}" data-test-subject="${subjectSlug(subject)}" type="button">${subject}</button>`).join("")}
      </div>
      <section class="test-card-grid">
        ${visibleTests.map(testCatalogCard).join("")}
        ${tests.length && !selectedSubject ? tests.map((item, index) => testQuizCard(item, index)).join("") : ""}
      </section>
    </section>
  `;
}

function parseQuizBody(item) {
  try {
    const data = JSON.parse(item.body || "{}");
    if (data.question && Array.isArray(data.answers)) return data;
  } catch {}
  return {
    question: item.body || item.description || item.title,
    answers: ["A javob", "B javob", "C javob", "D javob"],
    correct: "A"
  };
}

function testQuizSection(tests) {
  return `
    <section class="test-quiz-list">
      ${tests.length ? tests.map((item, index) => testQuizCard(item, index)).join("") : `<div class="empty-state">Hozircha test yo'q. Admin test yaratgandan keyin shu yerda ko'rinadi.</div>`}
    </section>
  `;
}

function testQuizCard(item, index) {
  const quiz = parseQuizBody(item);
  const labels = ["A", "B", "C", "D"];
  return `
    <article class="quiz-card" data-quiz-card>
      <div class="quiz-card-head">
        <span>SAVOL ${index + 1}</span>
        <b>${escapeHtml(item.subject || "Test")}${item.points ? ` • ${escapeHtml(item.points)} XP` : ""}</b>
      </div>
      <h2>${escapeHtml(quiz.question)}</h2>
      <div class="quiz-options">
        ${quiz.answers.slice(0, 4).map((answer, i) => `
          <button class="quiz-option" data-answer="${labels[i]}" data-correct="${escapeHtml(quiz.correct || "A")}" data-subject="${escapeHtml(item.subject || "Test")}" data-topic="${escapeHtml(item.title || item.subject || "Test mavzusi")}" type="button">
            <span>${labels[i]}</span>
            ${escapeHtml(answer)}
          </button>
        `).join("")}
      </div>
      ${item.staticQuiz ? "" : `<div class="quiz-actions">
        <button class="ghost-btn" type="button">O'tkazib yuborish</button>
        <button class="primary-btn" type="button">Keyingisi →</button>
      </div>`}
    </article>
  `;
}

function testCatalogCard(test) {
  const views = getTestViews(test.id);
  const total = testQuestionList(test).length;
  return `
    <button class="test-topic-card" data-open-test="${escapeHtml(test.id)}" type="button">
      <span>${escapeHtml(test.subject)}</span>
      <h2>${escapeHtml(test.title)}</h2>
      <div class="test-topic-meta">
        <b>${escapeHtml(test.rating)}</b>
        <b>${total} test</b>
        <b>${views} ko'rgan</b>
      </div>
    </button>
  `;
}

function subjectTestRunner(testId) {
  const test = subjectTestSets.find(item => item.id === testId) || subjectTestSets[0];
  const questions = testQuestionList(test);
  onaTiliRun = {
    testId: test.id,
    index: 0,
    selected: "",
    checked: false,
    score: 0,
    answers: Array(questions.length).fill(null),
    finished: false
  };
  const stats = countTestView(test.id);
  return `
    <section class="single-test-layout" id="subject-test-app">
      ${renderSubjectSingleQuiz(test, stats)}
    </section>
  `;
}

function activeSubjectTest() {
  return subjectTestSets.find(item => item.id === onaTiliRun?.testId) || subjectTestSets[0];
}

function renderSubjectSingleQuiz(test = activeSubjectTest(), stats = getTestStats(test.id)) {
  const questions = testQuestionList(test);
  const total = questions.length;
  const run = onaTiliRun || { index: 0, selected: "", checked: false, score: 0, answers: [], finished: false };
  const question = questions[run.index] || questions[0];
  const labels = ["A", "B", "C", "D"];
  const progress = Math.round(((run.index + 1) / total) * 100);
  const views = Number(stats.views || getTestViews(test.id) || 0);
  if (run.finished) {
    return `
      <article class="single-test-finish">
        <span>Natija</span>
        <h2>${total} tadan ${run.score} ta to'g'ri</h2>
        <p>${run.score >= 16 ? `Ajoyib natija. ${escapeHtml(test.subject)} bo'yicha bilimingiz yaxshi mustahkamlangan.` : "Yana bir marta ishlab ko'ring, xatolar tezda kamayadi."}</p>
        <button class="primary-btn" data-test-restart type="button">Qayta ishlash</button>
      </article>
    `;
  }
  return `
    <aside class="single-test-side">
      <article class="single-test-info">
        <span>${escapeHtml(test.subject)}</span>
        <h2>${escapeHtml(test.title)}</h2>
        <div class="single-test-meta">
          <b>${total} test</b><b>${Number(stats.completed || 0)} ishlagan</b><b>${views} ko'rgan</b>
        </div>
      </article>
      <article class="single-test-progress">
        <h3>Savollar</h3>
        <div><i style="--w:${progress}%"></i></div>
        <strong>${run.index + 1}/${total}</strong>
      </article>
    </aside>
    <section class="single-test-main">
      <article class="single-question-card">
        <div class="single-question-top">
          <span>${run.index + 1}/${total} • ${escapeHtml(test.subject)}</span>
          <button data-report-question type="button">Xatolik topdim</button>
        </div>
        <h2>${escapeHtml(question.question)}</h2>
      </article>
      <article class="single-answer-card">
        ${question.answers.map((answer, i) => {
          const label = labels[i];
          const isSelected = run.selected === label;
          const isCorrect = run.checked && question.correct === label;
          const isWrong = run.checked && isSelected && question.correct !== label;
          return `
            <button class="single-quiz-option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}" data-ona-answer="${label}" type="button" ${run.checked ? "disabled" : ""}>
              <b>${label.toLowerCase()})</b>
              <span>${escapeHtml(answer)}</span>
            </button>
          `;
        }).join("")}
        <div class="single-test-actions">
          <button class="single-finish-btn" data-test-finish type="button">Yakunlash</button>
          <button class="single-check-btn" data-test-check type="button" ${run.selected ? "" : "disabled"}>${run.checked ? (run.index + 1 === total ? "Natijani ko'rish" : "Keyingisi") : "Tekshirish"}</button>
        </div>
      </article>
    </section>
  `;
}

function refreshSubjectQuiz() {
  const appShell = document.querySelector("#subject-test-app");
  if (appShell) {
    appShell.classList.toggle("is-finished", Boolean(onaTiliRun?.finished));
    appShell.innerHTML = renderSubjectSingleQuiz();
  }
}

function finishSubjectQuiz() {
  if (!onaTiliRun || onaTiliRun.finished) return;
  onaTiliRun.finished = true;
  const stats = getTestStats(onaTiliRun.testId);
  stats.completed = Number(stats.completed || 0) + 1;
  saveTestStats(onaTiliRun.testId, stats);
  refreshSubjectQuiz();
}

function officialOlympiadCard(item) {
  return `
    <article class="official-olympiad-card ${escapeHtml(item.tone || "blue")}">
      <div class="official-olympiad-icon">${escapeHtml(item.icon || "🏅")}</div>
      <div class="official-olympiad-content">
        <div class="official-olympiad-top">
          <span>${escapeHtml(item.badge)}</span>
          <b>Rasmiy</b>
        </div>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.description)}</p>
        <small>${escapeHtml(item.subjects)}</small>
        <div class="olympiad-card-actions">
          <a class="primary-btn" href="${escapeHtml(item.registerUrl)}" target="_blank" rel="noopener">🚀 Ro'yxatdan o'tish</a>
          <a class="ghost-btn" href="${escapeHtml(item.infoUrl)}" target="_blank" rel="noopener">ⓘ Ma'lumot</a>
        </div>
      </div>
    </article>
  `;
}

function olympiadNav(active = "official") {
  return `
    <section class="olympiad-tabs">
      <button class="olympiad-tab ${active === "official" ? "active" : ""}" data-go-page="tests" type="button">🏅 Rasmiy olimpiadalar</button>
      <button class="olympiad-tab ${active === "closed" ? "active" : ""}" data-go-page="tests-closed" type="button">🏛 Yopiq musobaqalar</button>
    </section>
  `;
}

function olympiadPage() {
  return officialOlympiadPage();
}

function officialOlympiadPage() {
  return `
    ${pageHead("Rasmiy olimpiadalar", "O'zbekiston bo'ylab e'lon qilingan ochiq olimpiadalar va rasmiy sahifalar.")}
    ${olympiadNav("official")}
    <section class="official-olympiads-hero">
      <div class="official-hero-icon">🏆</div>
      <div>
        <h2>Rasmiy olimpiadalar</h2>
      </div>
    </section>
    <section class="official-olympiad-grid">
      ${officialOlympiads.map(officialOlympiadCard).join("")}
    </section>
  `;
}

function closedOlympiadPage() {
  const olympiads = itemsByType("tests");
  return `
    ${pageHead("Yopiq musobaqalar", "Siz admin paneldan qo'shgan olimpiadalar hammaga shu yerda ko'rinadi.")}
    ${olympiadNav("closed")}
    <section class="panel closed-olympiads-panel">
      <div class="section-title">
        <div><h2>Yopiq musobaqalar</h2><p>Siz admin paneldan qo'shgan olimpiadalar hammaga shu yerda ko'rinadi.</p></div>
        ${isAdmin() ? `<button class="primary-btn" data-open-create="tests" type="button">+ Yopiq olimpiada qo'shish</button>` : ""}
      </div>
      ${olympiads.length ? `<div class="olympiad-alert">Yangi yopiq olimpiada qo'shildi. Ishtirokchilar ushbu bo'limdan xabar topadi.</div><div class="content-list">${olympiads.map(contentCard).join("")}</div>` : `<div class="empty-state">Hozircha yopiq olimpiada yo'q. Admin qo'shgandan keyin bu yerda hammaga ko'rinadi.</div>`}
    </section>
  `;
}

function solveMathExpression(question) {
  const normalized = question
    .replace(/,/g, ".")
    .replace(/\^/g, "**")
    .replace(/[×x]/gi, "*")
    .replace(/÷/g, "/")
    .match(/[-+*/().\d\s*]+/g)
    ?.sort((a, b) => b.length - a.length)[0]
    ?.trim();
  if (!normalized || normalized.length < 3) return "";
  if (!/^[\d\s+\-*/().*]+$/.test(normalized)) return "";
  try {
    const result = Function(`"use strict"; return (${normalized});`)();
    if (!Number.isFinite(result)) return "";
    return `Hisoblab ko'rsam: ${normalized.replace(/\*\*/g, "^")} = ${Number.isInteger(result) ? result : result.toFixed(3)}.`;
  } catch {
    return "";
  }
}

function topicFromPrompt(text = "") {
  const cleaned = String(text || "")
    .replace(/menga|bizga|iltimos|test|quiz|savol(?:lar)?|mashq|qilib|tuzib|ber|yarat|bo'yicha|haqida|dan|ga|ni|lar/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "Umumiy bilim";
}

function buildGenericTopicQuestions(topic, isHard = false) {
  const cleanTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  const rows = isHard ? [
    [`${cleanTopic} mavzusida eng muhim nazariy asos nimaga tayanadi?`, "Tushuncha, sabab va natija bog'lanishiga", "Faqat yodlashga", "Faqat tasodifiy javobga", "Faqat rasmga"],
    [`${cleanTopic} bo'yicha murakkab testda avval nimani aniqlash kerak?`, "Savol sharti va kalit so'zlarni", "Variantlar rangini", "Savol uzunligini", "Nechanchi savol ekanini"],
    [`${cleanTopic} mavzusida xatoni kamaytirish uchun qaysi usul foydali?`, "Qoida, misol va istisnoni solishtirish", "Javobni taxmin qilish", "Savolni o'qimaslik", "Faqat bir variantni belgilash"],
    [`${cleanTopic} bo'yicha tahliliy savol nimani talab qiladi?`, "Ma'lumotlarni bog'lab xulosa chiqarishni", "Faqat bitta so'zni yodlashni", "Matnni ko'chirishni", "Variantlarni sanashni"],
    [`${cleanTopic} mavzusidagi eng ishonchli javob qanday tanlanadi?`, "Dalil va qoida bilan mos kelgani", "Eng uzun variant", "Birinchi variant", "Tasodifiy variant"]
  ] : [
    [`${cleanTopic} mavzusini o'rganishda birinchi qadam qaysi?`, "Asosiy tushunchani bilish", "Variantlarni yodlash", "Savolni tashlab ketish", "Faqat rasm chizish"],
    [`${cleanTopic} bo'yicha test ishlaganda nimaga e'tibor beriladi?`, "Kalit so'zlarga", "Faqat variant uzunligiga", "Faqat raqam tartibiga", "Fon rangiga"],
    [`${cleanTopic} mavzusida bilimni mustahkamlash uchun nima qilish kerak?`, "Misol va savollar yechish", "Mavzuni o'qimaslik", "Faqat taxmin qilish", "Javoblarni ko'chirish"],
    [`${cleanTopic} bo'yicha noto'g'ri javobni topishda nima yordam beradi?`, "Qoidaga mos kelmaydigan variantni ajratish", "Eng qisqa variantni tanlash", "Tasodifiy belgilash", "Savolni yopish"],
    [`${cleanTopic} mavzusida yaxshi natija uchun qaysi yo'l to'g'ri?`, "Avval qoida, keyin amaliy mashq", "Faqat bir marta o'qish", "Faqat yodlash", "Savolsiz o'rganish"]
  ];
  return fromRows(rows, isHard ? 2 : 1);
}

function parseTutorQuizAnswers(text = "") {
  const matches = [...String(text).toUpperCase().matchAll(/(?:^|\s)(\d{1,2})\s*[-.):]?\s*([ABCD])(?=\s|$)/g)];
  if (!matches.length) return null;
  return Object.fromEntries(matches.map(match => [Number(match[1]), match[2]]));
}

function gradeTutorQuiz(answerText = "") {
  const answers = parseTutorQuizAnswers(answerText);
  if (!answers || !aiTutorLastQuiz?.questions?.length) return "";
  const rows = aiTutorLastQuiz.questions.map((item, index) => {
    const number = index + 1;
    const selected = answers[number] || "-";
    const correct = item.correct;
    const ok = selected === correct;
    return { number, selected, correct, ok, question: item.question };
  });
  const answered = rows.filter(row => row.selected !== "-").length;
  const score = rows.filter(row => row.ok).length;
  const wrongRows = rows.filter(row => !row.ok);
  return `
    <b>Natija: ${score}/${rows.length} ta to'g'ri</b><br>
    ${answered < rows.length ? `<span>${rows.length - answered} ta savolga javob belgilanmagan.</span><br>` : ""}
    ${wrongRows.length ? `<br><b>Xatolar:</b><br>${wrongRows.map(row => `${row.number}. Siz: ${row.selected}, to'g'ri javob: ${row.correct}`).join("<br>")}` : "<br>Ajoyib, hammasi to'g'ri!"}
    <br><br><b>AI maslahat:</b> ${wrongRows.length ? "xato chiqqan savollarni qayta o'qing, kalit so'zlarni ajrating va shu mavzudan yana 3 ta mashq ishlang." : "shu darajani oshirish uchun keyingi safar qiyinroq test so'rang."}
  `;
}

function generateTutorReply(question) {
  const q = question.toLowerCase();
  const mathAnswer = solveMathExpression(question);
  const quizGrade = gradeTutorQuiz(question);
  const wantsTest = /(test|quiz|savol|imtihon|mashq).*(ber|tuz|qil|yarat)|(?:menga|bizga)\s+test|test\s+qilib\s+ber|savol\s+ber/.test(q);
  const knownSubjects = [
    ["matematika", "Matematika"],
    ["algebra", "Matematika"],
    ["geometriya", "Matematika"],
    ["fizika", "Fizika"],
    ["kimyo", "Kimyo"],
    ["biologiya", "Biologiya"],
    ["tarix", "Tarix"],
    ["geografiya", "Geografiya"],
    ["ingliz", "Ingliz tili"],
    ["english", "Ingliz tili"],
    ["ona tili", "Ona tili"],
    ["rus", "Rus tili"]
  ];
  const subjectMatch = knownSubjects.find(([key]) => q.includes(key));
  if (quizGrade) return quizGrade;
  if (/^(salom|assalomu|hello|hi)\b/.test(q)) {
    return `Salom, ${escapeHtml(currentUser.name)}! Savolingizni yozing, men uni qisqa tushuntirib, kerak bo'lsa misol bilan yechib beraman.`;
  }
  if (mathAnswer) {
    return `${mathAnswer}<br><br>Yechish tartibi: avval qavslar, keyin daraja/ko'paytirish/bo'lish, oxirida qo'shish-ayirish bajariladi. Shunga o'xshash yana bitta misol bersangiz, bosqichma-bosqich yechib beraman.`;
  }
  if (wantsTest) {
    const subject = subjectMatch?.[1] || topicFromPrompt(question);
    const isHard = /(qiyin|juda|pro|murakkab)/.test(q);
    const questions = subjectMatch
      ? buildDifficultyQuestions(subject, isHard ? "hard" : "medium", 0).slice(0, 5)
      : buildGenericTopicQuestions(subject, isHard).slice(0, 5);
    aiTutorLastQuiz = { subject, questions };
    return `
      <b>${escapeHtml(subject)} bo'yicha ${isHard ? "qiyin" : "o'rta"} test</b><br>
      ${questions.map((item, index) => `
        <br><b>${index + 1}. ${escapeHtml(item.question)}</b><br>
        ${item.answers.map((answer, answerIndex) => `${["A", "B", "C", "D"][answerIndex]}) ${escapeHtml(answer)}`).join("<br>")}
      `).join("")}
      <br><br>Javoblaringizni masalan <b>1A 2C 3B 4D 5A</b> ko'rinishida yuboring, men tekshirib beraman.
    `;
  }
  if (/(yech|hisobla|javobini top|misol)/.test(q)) {
    return `Misolni aniq ko'rinishda yozing, men bosqichma-bosqich yechib beraman.<br><br>Masalan: <b>2x + 7 = 19 ni yech</b> yoki <b>(18+12)/5 ni hisobla</b>.`;
  }
  if (/(tushuntir|izohla|nima|qanday|nega)/.test(q)) {
    const topic = escapeHtml(question.replace(/tushuntir|izohla/gi, "").trim() || question);
    return `<b>${topic}</b> bo'yicha qisqa tushuntirish:<br><br>1. Avval asosiy tushunchani aniqlaymiz.<br>2. Keyin uni oddiy misol bilan ko'ramiz.<br>3. Oxirida testda adashtiradigan joyini ajratamiz.<br><br>Mavzuni aniqroq yozsangiz, shu mavzuni tayyor darsdek qilib tushuntirib beraman.`;
  }
  if (subjectMatch && q.trim().split(/\s+/).length <= 3) {
    const subject = subjectMatch[1];
    const questions = buildDifficultyQuestions(subject, "medium", 0).slice(0, 5);
    aiTutorLastQuiz = { subject, questions };
    return `
      <b>${escapeHtml(subject)} bo'yicha o'rta test</b><br>
      ${questions.map((item, index) => `
        <br><b>${index + 1}. ${escapeHtml(item.question)}</b><br>
        ${item.answers.map((answer, answerIndex) => `${["A", "B", "C", "D"][answerIndex]}) ${escapeHtml(answer)}`).join("<br>")}
      `).join("")}
      <br><br>Javoblaringizni <b>1A 2B 3C 4D 5A</b> ko'rinishida yuboring, men tekshirib beraman.
    `;
  }
  const subjectsMap = [
    ["matematika", "Matematikada asosiy narsa shartni formula yoki tenglamaga aylantirish. Avval berilganlarni yozing, keyin kerakli formulani tanlang, oxirida javobni tekshiring."],
    ["ingliz", "Ingliz tilida savolni avval grammatika yoki vocabulary turiga ajratamiz. Gapdagi zamon, fe'l va kalit so'zlarni topsak, javob tez chiqadi."],
    ["tarix", "Tarixda voqeani sana, sabab, natija va shaxslar bo'yicha ajratsak eslab qolish osonlashadi."],
    ["biologiya", "Biologiyada jarayonni bosqichlarga bo'lib tushunish kerak: tuzilish, vazifa, jarayon va natija."],
    ["kimyo", "Kimyoda avval modda/formula, keyin reaksiya turi va koeffitsiyentlar tekshiriladi."],
    ["fizika", "Fizikada berilgan kattaliklarni yozib, birliklarni bir xil qilib, mos formulaga qo'yish eng muhim qadam."],
    ["geografiya", "Geografiyada joylashuv, sabab, iqlim va ta'sirni alohida ko'rsak mavzu aniq ochiladi."],
    ["ona tili", "Ona tilida qoida, misol va istisnoni ajratib olsak, testdagi xatolar kamayadi."],
    ["rus", "Rus tilida rod, padej, zamon va so'z shakliga e'tibor berish kerak."]
  ];
  const match = subjectsMap.find(([key]) => q.includes(key));
  const base = match ? match[1] : "Savolingizni tushundim. Uni sodda qilib aytsam: avval asosiy tushunchani aniqlaymiz, keyin bitta misol bilan mustahkamlaymiz, oxirida testda uchraydigan xatoni ko'ramiz.";
  return `${base}<br><br><b>Savolingiz:</b> ${escapeHtml(question)}<br><b>Keyingi qadam:</b> mavzu, misol yoki test darajasini yozing, men shunga mos javob beraman.`;
}

function loadOcrLibrary() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (window.ocrLoading) return window.ocrLoading;
  window.ocrLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.onload = () => resolve(window.Tesseract);
    script.onerror = () => reject(new Error("OCR kutubxonasi yuklanmadi"));
    document.head.appendChild(script);
  });
  return window.ocrLoading;
}

async function readImageText(file) {
  const Tesseract = await loadOcrLibrary();
  const result = await Tesseract.recognize(file, "eng");
  return (result?.data?.text || "").replace(/\s+/g, " ").trim();
}

function aiTutorPage() {
  return `
    <section class="ai-hero">
      <div>
        <p class="eyebrow">Mindora personal workspace</p>
        <h1>AI Ustoz</h1>
        <p>Savolingizga qisqa, aniq va har safar mazmunga qarab javob beradi.</p>
      </div>
    </section>
    <section class="ai-tutor-shell">
      <div class="ai-chat" id="ai-chat-log">
        <div class="chat-bubble ai">Salom, ${currentUser.name}! Qaysi mavzuni tushuntirib beray?</div>
      </div>
      <form class="ai-chat-form" id="ai-chat-form">
        <label class="image-upload-btn" title="Rasm tashlash">
          📷
          <input id="ai-image-field" name="image" type="file" accept="image/*" />
        </label>
        <input name="question" autocomplete="off" placeholder="Savol yozing..." />
        <button class="primary-btn" type="submit">Yuborish</button>
      </form>
      <div class="ai-image-preview" id="ai-image-preview"></div>
    </section>
  `;
}

function mistakeRecommendations() {
  if (!latestMistakes.length) {
    return `<div class="tip-row">Hozircha yangi xato mavzu yo'q. Test ishlaganingizdan keyin tavsiyalar avtomatik yangilanadi.</div>`;
  }
  const grouped = latestMistakes.reduce((acc, item) => {
    const key = item.topic || item.subject || "Test mavzusi";
    acc[key] = acc[key] || { ...item, count: 0 };
    acc[key].count += 1;
    return acc;
  }, {});
  return Object.values(grouped).map(item => `
    <div class="tip-row">
      <b>${escapeHtml(item.subject || "Test")}</b>: ${escapeHtml(item.topic)} mavzusida xato qilding.
      <small>${memoryAdviceForMistake(item)}${item.count > 1 ? ` Bu mavzuda ${item.count} marta xato bo'lgan.` : ""}</small>
    </div>
  `).join("");
}

function memoryAdviceForMistake(item) {
  const subject = String(item.subject || "").toLowerCase();
  const topic = String(item.topic || "shu mavzu");
  if (subject.includes("matematika")) return `AI maslahat: ${escapeHtml(topic)} bo'yicha shartni tenglama yoki formulaga aylantirib, 3 ta o'xshash misolni bosqichma-bosqich yeching.`;
  if (subject.includes("fizika")) return `AI maslahat: berilgan kattaliklarni SI birlikka o'tkazing, formulani yozing, keyin sonlarni qo'ying.`;
  if (subject.includes("kimyo")) return `AI maslahat: formuladagi elementlar, koeffitsiyent va oksidlanish darajasini alohida tekshirib chiqing.`;
  if (subject.includes("biologiya")) return `AI maslahat: jarayonni "tuzilish - vazifa - natija" tartibida chizing va asosiy atamalarni qayta aytib bering.`;
  if (subject.includes("tarix")) return `AI maslahat: voqeani sana, sabab, shaxs va natija bo'yicha 4 bo'lakka ajrating.`;
  if (subject.includes("geografiya")) return `AI maslahat: xarita, joylashuv, iqlim va sabab-oqibat bog'lanishini birga tekshiring.`;
  if (subject.includes("ingliz")) return `AI maslahat: gapdagi zamon, yordamchi fe'l va kalit so'zni topib, shu qoidadan 5 ta gap tuzing.`;
  if (subject.includes("ona tili")) return `AI maslahat: so'z turkumi, qoida va istisnoni ajrating; keyin shu mavzudan 5 ta qisqa test yeching.`;
  if (subject.includes("rus")) return `AI maslahat: род, падеж, вид yoki zamonni toping, keyin shu shakl bilan 5 ta misol tuzing.`;
  return `AI maslahat: ${escapeHtml(topic)} bo'yicha xato sababini toping, qisqa qoida yozing va shu mavzudan 5 ta yangi savol yeching.`;
}

function memoryPage() {
  return `
    ${pageHead("Xotira (Memory) sahifasi", "Testdagi xato mavzular bo'yicha takrorlash tavsiyalari avtomatik yangilanadi.")}
    <section class="memory-layout">
      <article class="panel memory-map">
        <div class="brain-web"></div>
      </article>
      <article class="panel">
        <h2>Tavsiyalar</h2>
        ${mistakeRecommendations()}
      </article>
    </section>
  `;
}

function statisticsPage() {
  normalizeLearningStats();
  const activePeriod = currentStatsPeriod();
  const subjectFilter = currentStatsSubjectFilter();
  const periodMeta = {
    overall: { label: "Umumiy", range: "Bu oy", growthText: "o'tgan davrga nisbatan", avgDivisor: 5, scale: 1 },
    weekly: { label: "Haftalik", range: "Bu hafta", growthText: "o'tgan haftaga nisbatan", avgDivisor: 7, scale: .36 },
    monthly: { label: "Oylik", range: "Bu oy", growthText: "o'tgan oyga nisbatan", avgDivisor: 5, scale: 1 },
    yearly: { label: "Yillik", range: "Bu yil", growthText: "o'tgan yilga nisbatan", avgDivisor: 12, scale: 3.2 }
  };
  const meta = periodMeta[activePeriod];
  const subjectRows = personalizedSubjectStats(activePeriod, subjectFilter);
  const displaySubjectRows = subjectRows.length ? subjectRows : fallbackSubjectStats(subjectFilter);
  const totalSubjectMinutes = displaySubjectRows.reduce((sum, item) => sum + item.minutes, 0);
  const periodMinutes = studyMinutesForPeriod(activePeriod);
  const fallbackMinutes = displaySubjectRows.reduce((sum, item) => sum + item.minutes, 0);
  const shownMinutes = periodMinutes || fallbackMinutes;
  const periodHours = Math.round(shownMinutes / 60);
  const totalTimeLabel = formatStudyTime(shownMinutes);
  const lineValues = (studyValuesForPeriod(activePeriod).length ? studyValuesForPeriod(activePeriod) : fallbackStudyValues(activePeriod)).join(",");
  const bestDay = bestStudyDay(activePeriod);
  const avgHours = shownMinutes ? (shownMinutes / 60 / meta.avgDivisor).toFixed(1) : "0";
  const streakLabel = learningStats.streak || 0;
  const growth = realGrowthPercent(activePeriod);
  const periodTabs = [
    ["overall", "Umumiy"],
    ["weekly", "Haftalik"],
    ["monthly", "Oylik"],
    ["yearly", "Yillik"]
  ];
  return `
    <section class="stats-page">
      <div class="stats-hero">
        <p class="eyebrow">Mindora personal workspace</p>
        <h1>Statistika sahifasi</h1>
        <div class="stat-tabs">
          ${periodTabs.map(([period, label]) => `<button class="${period === activePeriod ? "active" : ""}" data-stat-period="${period}" type="button">${label}</button>`).join("")}
        </div>
      </div>
      <section class="stats-layout stats-grid-main">
        <article class="panel stats-chart-panel">
          <div class="stats-panel-head">
            <div><h2>O'rganish vaqti grafigi</h2><span>Soatlarda</span></div>
            <button class="stats-mini-select" type="button">${meta.range}</button>
          </div>
          ${chart("stats-line", "line", lineValues)}
          <div class="stats-chart-footer"><span>Soat</span><b>${growth >= 0 ? "+" : ""}${growth}% <small>${meta.growthText}</small></b></div>
        </article>
        <article class="panel stats-subject-panel">
          <div class="stats-panel-head">
            <div><h2>Fanlar bo'yicha</h2></div>
            <button class="stats-mini-select" data-stat-subject-filter type="button">${subjectFilter === "top" ? "Top fanlar" : "Barchasi"}</button>
          </div>
          <div class="stats-donut-wrap">
            ${chart("stats-donut", "doughnut", displaySubjectRows.map(item => item.percent).join(","))}
            <div class="stats-donut-center"><span>Jami</span><strong>${periodHours}</strong><small>soat</small></div>
          </div>
          <div class="stats-subject-list">
            ${displaySubjectRows.map(item => `
              <div class="stats-subject-row" style="--dot:${item.color}">
                <span></span><div><b>${escapeHtml(item.name)}</b><small>${formatStudyTime(item.minutes)}</small></div><em>${Math.round(item.minutes / Math.max(totalSubjectMinutes, 1) * 100)}%</em>
              </div>
            `).join("")}
          </div>
        </article>
      </section>
      <section class="stats-kpis">
        <article><span>◷</span><div><small>Jami vaqt</small><strong>${totalTimeLabel}</strong><em>${meta.label} davr uchun +10%</em></div></article>
        <article><span>◎</span><div><small>Maqsadlar</small><strong>${Math.min(87, progressPercent(learningStats.points, 12560) || 31)}%</strong><em>Bajarilish darajasi</em></div></article>
        <article><span>↗</span><div><small>Eng faol kun</small><strong>${bestDay}</strong><em>O'rtacha ${avgHours} soat</em></div></article>
        <article><span>🔥</span><div><small>Seriya</small><strong>${streakLabel} kun</strong><em>Uzluksiz davom etmoqda</em></div></article>
      </section>
      <div class="stats-quote"><b>“</b><span>Har kuni biroz o'rganish katta yutuqlarga olib keladi.</span><b>★</b></div>
    </section>
  `;
}

function currentStatsPeriod() {
  const value = new URLSearchParams(currentRoute().split("?")[1] || "").get("period") || "overall";
  return ["overall", "weekly", "monthly", "yearly"].includes(value) ? value : "overall";
}

function currentStatsSubjectFilter() {
  const value = new URLSearchParams(currentRoute().split("?")[1] || "").get("subject") || "all";
  return ["all", "top"].includes(value) ? value : "all";
}

function daysAgo(count) {
  const date = new Date();
  date.setDate(date.getDate() - count);
  return date.toISOString().slice(0, 10);
}

function periodDayCount(period = "overall") {
  return { weekly: 7, monthly: 30, yearly: 365, overall: 3650 }[period] || 3650;
}

function studyLogForPeriod(period = "overall") {
  normalizeLearningStats();
  const days = periodDayCount(period);
  const start = daysAgo(days - 1);
  return learningStats.studyLog
    .filter(item => item.date >= start)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function studyMinutesForPeriod(period = "overall") {
  return studyLogForPeriod(period).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}

function studyValuesForPeriod(period = "overall") {
  const log = studyLogForPeriod(period);
  if (!log.length) return [];
  const buckets = period === "weekly" ? 7 : period === "monthly" ? 8 : period === "yearly" ? 12 : 5;
  const values = Array.from({ length: buckets }, () => 0);
  log.forEach(item => {
    const date = new Date(`${item.date}T00:00:00`);
    let index = 0;
    if (period === "weekly") {
      index = Math.min(6, Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000)));
      index = 6 - index;
    } else if (period === "yearly") {
      index = date.getMonth();
    } else {
      const daysBack = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
      index = Math.min(buckets - 1, Math.max(0, buckets - 1 - Math.floor(daysBack / 4)));
    }
    values[index] += Number(item.minutes || 0) / 60;
  });
  return values.map(value => Number(value.toFixed(2)));
}

function fallbackStudyValues(period = "overall") {
  return {
    overall: [7, 15, 10, 6, 10],
    weekly: [3, 5, 8, 6, 9, 7, 11],
    monthly: [4, 9, 7, 12, 14, 11, 16, 19],
    yearly: [8, 11, 15, 14, 18, 21, 24, 22, 26, 29, 28, 31]
  }[period] || [7, 15, 10, 6, 10];
}

function bestStudyDay(period = "overall") {
  const labels = {
    overall: ["1-hafta", "2-hafta", "3-hafta", "4-hafta", "5-hafta"],
    weekly: ["Dush", "Sesh", "Chor", "Pay", "Juma", "Shan", "Yak"],
    monthly: ["1-hafta", "2-hafta", "3-hafta", "4-hafta", "5-hafta", "6-hafta", "7-hafta", "8-hafta"],
    yearly: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"]
  }[period] || ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"];
  const values = studyValuesForPeriod(period);
  if (!values.length || Math.max(...values) <= 0) return "Hali yo'q";
  const bestIndex = values.indexOf(Math.max(...values));
  return labels[bestIndex] || labels[labels.length - 1];
}

function personalizedSubjectStats(period = "overall", filter = "all") {
  const palette = ["#ff2bd6", "#0aa8ff", "#ffb43b", "#13d6a5"];
  normalizeLearningStats();
  const entries = Object.entries(learningStats.subjectMinutes || {})
    .filter(([, value]) => Number(value) > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const sourceRows = filter === "top" ? entries.slice(0, 3) : entries;
  const rows = sourceRows.map(([name, value], index) => ({
    name,
    minutes: Number(value || 0),
    percent: Number(value || 0),
    color: palette[index % palette.length]
  }));
  const total = rows.reduce((sum, item) => sum + item.percent, 0) || 1;
  return rows.map(item => ({ ...item, percent: Math.round(item.percent / total * 100) }));
}

function fallbackSubjectStats(filter = "all") {
  const rows = [
    { name: "Matematika", minutes: 420, percent: 30, color: "#ff2bd6" },
    { name: "Dasturlash", minutes: 360, percent: 26, color: "#0aa8ff" },
    { name: "Fizika", minutes: 300, percent: 22, color: "#ffb43b" },
    { name: "Ingliz tili", minutes: 300, percent: 22, color: "#13d6a5" }
  ];
  return filter === "top" ? rows.slice(0, 3) : rows;
}

function realGrowthPercent(period = "overall") {
  const days = periodDayCount(period);
  if (days > 1000) return 0;
  const currentStart = daysAgo(days - 1);
  const previousStart = daysAgo(days * 2 - 1);
  const previousEnd = daysAgo(days);
  const current = learningStats.studyLog
    .filter(item => item.date >= currentStart)
    .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const previous = learningStats.studyLog
    .filter(item => item.date >= previousStart && item.date <= previousEnd)
    .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function goalsPage() {
  const goals = normalizedGoals();
  const params = new URLSearchParams(currentRoute().split("?")[1] || "");
  const activeId = params.get("goal") || goals[0]?.id || "";
  const activeGoal = goals.find(goal => goal.id === activeId) || goals[0];
  const showForm = params.get("action") === "new";
  const totalProgress = Math.round(goals.reduce((sum, goal) => sum + Number(goal.progress || 0), 0) / Math.max(goals.length, 1));
  const completedGoals = goals.filter(goal => Number(goal.progress || 0) >= 100).length;
  const tests = learningStats.tests || 0;
  const bestSubject = Object.entries(learningStats.subjectProgress || {}).sort((a, b) => b[1] - a[1])[0]?.[0] || "Matematika";
  return `
    <section class="goals-page">
      <div class="goals-hero">
        <p class="eyebrow">Mindora personal workspace</p>
        <h1>Maqsadlar sahifasi</h1>
        <p>Maqsadlarni boshqaring, bajarilgan testlar va progress alohida ko'rinadi.</p>
      </div>
      <section class="goals-layout goals-grid-main">
        <article class="panel goals-list-panel">
          <div class="goals-panel-head">
            <h2>Maqsadlarim</h2>
            <button class="primary-btn" data-goal-new type="button">+ Yangi maqsad</button>
          </div>
          ${showForm ? goalForm() : ""}
          <div class="goals-list">
            ${goals.map(goal => goalCard(goal, activeGoal?.id === goal.id)).join("")}
          </div>
        </article>
        <article class="panel goals-stat-panel">
          <div class="goals-panel-head">
            <h2>Maqsad statistikasi</h2>
            <button class="goal-menu-btn" data-goal-boost="${escapeHtml(activeGoal?.id || "")}" type="button">⋮</button>
          </div>
          <div class="goal-trophy-scene"><img class="goal-trophy-img" src="aaaa.png" alt="Maqsad kubogi" /></div>
          <div class="goal-score-box">
            <p>To'plangan nuqtalar</p>
            <strong>${formatNumber(learningStats.points)}</strong>
            <div class="goal-scale"><span>0</span><i><b style="--w:${progressPercent(learningStats.points, 1000)}%"></b></i><span>1000</span></div>
            ${activeGoal ? `<button class="ghost-btn goal-boost-btn" data-goal-boost="${escapeHtml(activeGoal.id)}" type="button">📈 Progress +5%</button>` : ""}
          </div>
        </article>
      </section>
      <section class="goals-kpis">
        <article><span>▦</span><div><small>Faol kunlar</small><strong>${Math.max(learningStats.streak || 0, 12)} kun</strong><em>Ketma-ketlik davom etmoqda</em></div></article>
        <article><span>🔥</span><div><small>Umumiy progress</small><strong>${totalProgress}%</strong><em>Barcha maqsadlar bo'yicha</em></div></article>
        <article><span>◎</span><div><small>Bajarilgan testlar</small><strong>${tests} ta</strong><em>Testlar soni</em></div></article>
        <article><span>✺</span><div><small>Eng yuqori natija</small><strong>${Math.max(96, learningStats.testScore || 0)}%</strong><em>${escapeHtml(bestSubject)} fanidan</em></div></article>
      </section>
      <div class="goals-quote"><b>“</b><span>Har kuni biroz o'rganish katta yutuqlarga olib keladi.</span><b>”</b></div>
    </section>
  `;
}

function normalizedGoals() {
  const fallback = [
    { id: "monthly-hours", title: "Oylik maqsad", description: "Bu oy 30 soat o'rganish", progress: 75, tone: "violet", icon: "◷" },
    { id: "test-90", title: "Testdan 90%+ olish", description: "Matematika fanidan", progress: 60, tone: "blue", icon: "▥" },
    { id: "english-b2", title: "Ingliz tilida B2 darajaga chiqish", description: "6 oy ichida", progress: 30, tone: "green", icon: "★" }
  ];
  const customGoals = userGoals.map((goal, index) => ({
    id: goal.id || `user-goal-${index}`,
    title: goal.title || "Yangi maqsad",
    description: goal.description || "Shaxsiy maqsad",
    progress: Number(goal.progress || 0),
    tone: goal.tone || ["violet", "blue", "green", "orange"][index % 4],
    icon: goal.icon || "◎"
  }));
  const adminGoals = itemsByType("goals").map((goal, index) => ({
    id: goal.id || `admin-goal-${index}`,
    title: goal.title || "Maqsad",
    description: goal.description || goal.deadline || "",
    progress: Number(goal.progress || 0),
    tone: ["violet", "blue", "green", "orange"][index % 4],
    icon: "◎"
  }));
  const seen = new Set();
  return [...customGoals, ...adminGoals, ...fallback].filter(goal => {
    if (seen.has(goal.id)) return false;
    seen.add(goal.id);
    return true;
  }).slice(0, 8);
}

function goalCard(goal, active) {
  const progress = Math.max(0, Math.min(100, Number(goal.progress || 0)));
  return `
    <button class="goal-card ${active ? "active" : ""}" data-goal-open="${escapeHtml(goal.id)}" data-tone="${escapeHtml(goal.tone)}" type="button">
      <span class="goal-icon">${escapeHtml(goal.icon)}</span>
      <div>
        <b>${escapeHtml(goal.title)}</b>
        <small>${escapeHtml(goal.description)}</small>
        <i><em style="--w:${progress}%"></em></i>
      </div>
      <strong>${progress}%</strong>
      <span class="goal-arrow">›</span>
    </button>
  `;
}

function goalForm() {
  return `
    <form class="goal-form" id="goal-form">
      <input name="title" maxlength="48" required placeholder="Maqsad nomi" />
      <input name="description" maxlength="72" placeholder="Qisqa izoh" />
      <input name="progress" type="number" min="0" max="100" value="0" />
      <div>
        <button class="primary-btn" type="submit">Saqlash</button>
        <button class="ghost-btn" data-goal-cancel type="button">Bekor qilish</button>
      </div>
    </form>
  `;
}

function leaderboardPage() {
  const leaderboardUser = currentUser || registeredUsers[0] || { name: "Foydalanuvchi", xp: 0 };
  sanitizeInheritedXp();
  if (currentUser) syncUserXp(storedUserXp(leaderboardUser));
  const leaderboardUsers = [
    ...(currentUser ? [currentUser] : []),
    ...registeredUsers
  ].reduce((list, user) => {
    const email = user?.email?.toLowerCase() || `guest-${list.length}`;
    if (list.some(item => (item.email?.toLowerCase() || "") === email)) return list;
    list.push({ ...user, xp: storedUserXp(user) });
    return list;
  }, []).sort((a, b) => {
    const diff = storedUserXp(b) - storedUserXp(a);
    if (diff) return diff;
    if (isAdminEmail(a.email) && !isAdminEmail(b.email)) return -1;
    if (!isAdminEmail(a.email) && isAdminEmail(b.email)) return 1;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  grantPremiumToLeaderboardLeader(leaderboardUsers);
  const topUsers = leaderboardUsers.slice(0, 10);
  const adminUser = leaderboardUsers.find(user => isAdminEmail(user.email));
  const heroUser = adminUser || currentUser || leaderboardUser;
  const heroRank = Math.max(1, leaderboardUsers.findIndex(user => user.email?.toLowerCase() === heroUser.email?.toLowerCase()) + 1);
  const displayName = heroUser.name || "Foydalanuvchi";
  const userXp = storedUserXp(heroUser);
  const progress = progressPercent(userXp, MAX_USER_XP);
  return `
    ${pageHead("Leaderboard", "Reyting jadvalida foydalanuvchi natijasi ko'rsatiladi.")}
    <section class="leaderboard-hero">
      <article class="leaderboard-card">
        <div class="leaderboard-rank">#${heroRank}</div>
        ${avatar(heroUser, true)}
        <div class="leaderboard-info">
          <span>Sizning reytingingiz</span>
          <h2>${escapeHtml(displayName)}</h2>
          <p>XP avtomatik saqlanadi. Yangi userlar 0 XP dan boshlaydi, limit ${formatNumber(MAX_USER_XP)} XP.</p>
          <div class="leaderboard-progress"><i><b style="--w:${progress}%"></b></i><small>${formatNumber(userXp)} / ${formatNumber(MAX_USER_XP)} XP</small></div>
        </div>
        <div class="leaderboard-score"><strong>${formatNumber(userXp)}</strong><span>XP</span></div>
      </article>
    </section>
    <section class="panel leaderboard-list-panel">
      <div class="section-title">
        <div><h2>Ro'yxatdan o'tganlar reytingi</h2><p>Barcha foydalanuvchilar XP bo'yicha tartiblangan.</p></div>
        <span class="badge">Top ${topUsers.length} / ${leaderboardUsers.length}</span>
      </div>
      <div class="leaderboard-list">
        ${topUsers.map((user, index) => `
          <article class="leaderboard-user-row ${user.email?.toLowerCase() === currentUser?.email?.toLowerCase() ? "current" : ""}">
            <strong>#${index + 1}</strong>
            ${avatar(user)}
            <div>
              <b>${escapeHtml(user.name || "Foydalanuvchi")}</b>
              <span>${escapeHtml(user.role || "Foydalanuvchi")}${user.premium || index === 0 ? " · Premium" : ""}${index === 0 ? " · 1-o'rin" : ""}</span>
            </div>
            <em>${formatNumber(storedUserXp(user))} XP</em>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function customContentSection(type, items) {
  if (!type) return "";
  if (!items.length) return "";
  const meta = contentTypes[type];
  return `
    <article class="panel page-content-panel">
      <div class="section-title">
        <div><h2>${meta.plural}</h2><p>${meta.label} uchun qo'shilgan materiallar.</p></div>
      </div>
      <div class="content-list">
        ${items.map(contentCard).join("")}
      </div>
    </article>
  `;
}

const renderers = {
  dashboard,
  admin: adminPanel,
  "admin-create": adminCreatePage,
  profile: profilePage,
  lessons: lessonsPage,
  "lesson-videos": lessonVideosPage,
  tasks: testPage,
  tests: olympiadPage,
  "tests-official": officialOlympiadPage,
  "tests-closed": closedOlympiadPage,
  "ai-tutor": aiTutorPage,
  memory: memoryPage,
  statistics: statisticsPage,
  goals: goalsPage,
  leaderboard: leaderboardPage,
  premium: premiumPage,
  "premium-checkout": premiumCheckoutPage
};

function drawCharts() {
  document.querySelectorAll("canvas").forEach(canvas => {
    const ctx = canvas.getContext("2d");
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr; canvas.height = r.height * dpr; ctx.scale(dpr, dpr);
    const w = r.width, h = r.height;
    ctx.clearRect(0,0,w,h);
    const dataValues = (canvas.dataset.values || "").split(",").map(Number).filter(Number.isFinite);
    if (canvas.dataset.chart === "doughnut") {
      const colors = ["#ff2bd6", "#0aa8ff", "#ffc447", "#29e68b"];
      let start = -Math.PI / 2;
      const donutValues = dataValues.length ? dataValues : [36, 28, 20, 16];
      donutValues.forEach((v,i) => {
        ctx.beginPath(); ctx.strokeStyle = colors[i]; ctx.lineWidth = 24;
        ctx.arc(w/2, h/2, Math.min(w, h) * .28, start, start + Math.PI * 2 * v / 100); ctx.stroke();
        start += Math.PI * 2 * v / 100;
      });
      return;
    }
    ctx.strokeStyle = "rgba(255,255,255,.1)";
    for (let i = 0; i < 5; i++) { const y = 20 + i * ((h - 40) / 4); ctx.beginPath(); ctx.moveTo(10,y); ctx.lineTo(w-10,y); ctx.stroke(); }
    const vals = dataValues.length ? dataValues : Array.from({length: 10}, (_, i) => 30 + Math.sin(i * .9) * 18 + i * 5);
    const max = Math.max(...vals, 10);
    if (canvas.dataset.chart === "bar") {
      vals.forEach((v,i) => { ctx.fillStyle = i % 2 ? "#0aa8ff" : "#ff2bd6"; ctx.fillRect(20+i*((w-40)/10), h-20-v*1.7, 22, v*1.7); });
    } else {
      const g = ctx.createLinearGradient(0,0,w,0); g.addColorStop(0,"#7a2cff"); g.addColorStop(.5,"#ff2bd6"); g.addColorStop(1,"#39f3ff");
      const area = ctx.createLinearGradient(0, 35, 0, h - 20);
      area.addColorStop(0, "rgba(255, 43, 214, .28)");
      area.addColorStop(1, "rgba(10, 168, 255, 0)");
      ctx.beginPath();
      vals.forEach((v,i) => { const x = 20 + i*((w-40)/(vals.length - 1 || 1)), y = h - 24 - (v / max) * (h - 58); i ? ctx.lineTo(x,y) : ctx.moveTo(x,y); });
      ctx.lineTo(w - 20, h - 24); ctx.lineTo(20, h - 24); ctx.closePath(); ctx.fillStyle = area; ctx.fill();
      ctx.strokeStyle = g; ctx.lineWidth = 4; ctx.beginPath();
      vals.forEach((v,i) => { const x = 20 + i*((w-40)/(vals.length - 1 || 1)), y = h - 24 - (v / max) * (h - 58); i ? ctx.lineTo(x,y) : ctx.moveTo(x,y); });
      ctx.stroke();
      vals.forEach((v,i) => {
        const x = 20 + i*((w-40)/(vals.length - 1 || 1)), y = h - 24 - (v / max) * (h - 58);
        ctx.beginPath(); ctx.fillStyle = i === vals.length - 1 ? "#39f3ff" : "#ff2bd6"; ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      });
    }
  });
}

function render() {
  if (!currentUser) return;
  const route = currentRoute();
  const page = route.split("?")[0];
  const allowed = canOpenPage(page);
  const id = allowed && renderers[page] ? page : "dashboard";
  document.querySelectorAll(".app-nav a").forEach(a => a.classList.toggle("active", a.dataset.page === id));
  root.innerHTML = renderers[id]();
  localStorage.setItem("mindoraLastPage", allowed && renderers[page] ? route : id);
  if (!allowed && premiumLockedPages.has(page)) toastMsg("Bu bo'lim premiumdan keyin ochiladi.");
  drawCharts();
}

function syncStoredData() {
  currentUser = JSON.parse(localStorage.getItem("mindoraUser") || "null");
  registeredUsers = JSON.parse(localStorage.getItem("mindoraUsers") || "[]");
  adminItems = JSON.parse(localStorage.getItem("mindoraAdminItems") || "[]");
  userGoals = JSON.parse(localStorage.getItem("mindoraUserGoals") || "[]");
  lessonVideos = JSON.parse(localStorage.getItem("mindoraLessonVideos") || "{}");
  premiumCards = JSON.parse(localStorage.getItem("mindoraPremiumCards") || "[]");
  premiumPayments = JSON.parse(localStorage.getItem("mindoraPremiumPayments") || "[]");
  questionReports = JSON.parse(localStorage.getItem("mindoraQuestionReports") || "[]");
  latestMistakes = JSON.parse(sessionStorage.getItem("mindoraLatestMistakes") || "[]");
  learningStats = JSON.parse(localStorage.getItem("mindoraLearningStats") || "null") || learningStats;
  if (currentUser) syncUserXp(storedUserXp());
  if (currentUser && nav.childElementCount) buildNav();
}

function refreshStatisticsIfNeeded(force = false) {
  const page = currentRoute().split("?")[0];
  if (!["statistics", "leaderboard"].includes(page)) return;
  const nextSnapshot = progressSnapshot();
  if (!force && nextSnapshot === statsSnapshot) {
    if (page === "statistics") drawCharts();
    return;
  }
  statsSnapshot = nextSnapshot;
  syncStoredData();
  render();
}

document.querySelectorAll("[data-open-auth]").forEach(btn => btn.addEventListener("click", () => openAuth(btn.dataset.openAuth)));
document.querySelector("#close-auth").addEventListener("click", () => modal.classList.remove("show"));
document.querySelector("#login-tab").addEventListener("click", () => openAuth("login"));
document.querySelector("#register-tab").addEventListener("click", () => openAuth("register"));
document.querySelector("#auth-switch-copy").addEventListener("click", event => {
  if (event.target.id !== "auth-switch") return;
  openAuth(mode === "login" ? "register" : "login");
});
document.querySelector("#auth-form").addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#email-field").value.trim();
  const typedName = document.querySelector("#name-field").value.trim();
  const name = mode === "register" ? typedName || email.split("@")[0] : "";
  const phone = document.querySelector("#phone-field").value.trim();
  const gender = document.querySelector("#gender-field").value;
  login({ name, email, phone, gender });
});
nav.addEventListener("click", event => {
  const link = event.target.closest("[data-page]");
  if (!link) return;
  const page = link.dataset.page;
  if (canOpenPage(page)) return;
  event.preventDefault();
  toastMsg("Bu bo'lim premiumdan keyin ochiladi.");
  location.hash = "premium";
});
document.querySelector("#profile-shortcut").addEventListener("click", e => {
  e.stopPropagation();
  const menu = document.querySelector("#profile-menu");
  const isOpen = menu.classList.toggle("show");
  document.querySelector(".app-main")?.classList.toggle("profile-open", isOpen);
  menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
});
document.addEventListener("click", e => {
  const menu = document.querySelector("#profile-menu");
  if (!menu || e.target.closest(".profile-menu-wrap")) return;
  menu.classList.remove("show");
  document.querySelector(".app-main")?.classList.remove("profile-open");
  menu.setAttribute("aria-hidden", "true");
});
document.addEventListener("click", e => {
  if (!e.target.closest(".action")) return;
  toastMsg("AI amal bajarildi. Sahifa sizga mos qayta hisoblandi.");
});
document.addEventListener("click", e => {
  const createBtn = e.target.closest("[data-open-create]");
  if (!createBtn) return;
  if (!isAdmin()) {
    toastMsg("Qo'shish faqat admin uchun.");
    return;
  }
  const type = createBtn.dataset.openCreate;
  location.hash = type ? `admin-create?type=${type}` : "admin-create";
});
document.addEventListener("change", e => {
  if (e.target.id !== "content-type") return;
  location.hash = `admin-create?type=${e.target.value}`;
});
document.addEventListener("click", e => {
  const profileActionBtn = e.target.closest("[data-profile-action]");
  if (profileActionBtn) {
    const messages = {
      avatar: "Avatar ro'yxatdan o'tgan profilingizga mos ko'rsatilmoqda.",
      phone: "Telefon raqamini profil sozlamalarida yangilash mumkin.",
      location: "Joylashuv profilingizga biriktirilgan.",
      joined: "Ro'yxatdan o'tgan sana profilingizda saqlangan."
    };
    toastMsg(messages[profileActionBtn.dataset.profileAction] || "Profil ma'lumoti faol.");
    return;
  }
  const profileSkillBtn = e.target.closest("[data-profile-skill]");
  if (profileSkillBtn) {
    location.hash = profileSkillBtn.dataset.profileSkill;
    return;
  }
  const profileActivityBtn = e.target.closest("[data-profile-activity]");
  if (profileActivityBtn) {
    location.hash = profileActivityBtn.dataset.profileActivity;
    return;
  }
  const premiumSelectBtn = e.target.closest("[data-premium-select]");
  if (premiumSelectBtn) {
    const premiumPageEl = premiumSelectBtn.closest(".premium-page");
    premiumPageEl?.querySelectorAll("[data-premium-select]").forEach(btn => btn.classList.toggle("active", btn === premiumSelectBtn));
    premiumPageEl?.querySelector("[data-premium-price]")?.replaceChildren(premiumSelectBtn.dataset.price || "UZS 30 000");
    premiumPageEl?.querySelector("[data-premium-period]")?.replaceChildren(premiumSelectBtn.dataset.period || "/ oy");
    const activateBtn = premiumPageEl?.querySelector(".premium-activate-btn");
    if (activateBtn) activateBtn.dataset.premiumPlan = premiumSelectBtn.dataset.premiumSelect || "monthly";
    return;
  }
  const premiumPlanBtn = e.target.closest("[data-premium-plan]");
  if (premiumPlanBtn) {
    location.hash = `premium-checkout?plan=${premiumPlanBtn.dataset.premiumPlan}`;
    return;
  }
  const premiumFeatureBtn = e.target.closest("[data-premium-feature]");
  if (premiumFeatureBtn) {
    if (!hasPremiumAccess() && !isAdmin()) {
      toastMsg("Avval premium tarifni tanlang.");
      return;
    }
    const target = premiumFeatureBtn.dataset.premiumFeature;
    if (target === "dashboard") {
      toastMsg("Reklamasiz foydalanish yoqildi.");
      return;
    }
    if (target === "profile") {
      toastMsg("Priority support premium profilingizda faol.");
    }
    location.hash = target;
    return;
  }
  const newGoalBtn = e.target.closest("[data-goal-new]");
  if (newGoalBtn) {
    location.hash = "goals?action=new";
    return;
  }
  const cancelGoalBtn = e.target.closest("[data-goal-cancel]");
  if (cancelGoalBtn) {
    location.hash = "goals";
    return;
  }
  const openGoalBtn = e.target.closest("[data-goal-open]");
  if (openGoalBtn) {
    location.hash = `goals?goal=${openGoalBtn.dataset.goalOpen}`;
    return;
  }
  const boostGoalBtn = e.target.closest("[data-goal-boost]");
  if (boostGoalBtn) {
    const id = boostGoalBtn.dataset.goalBoost;
    let target = userGoals.find(goal => goal.id === id);
    if (!target) {
      const source = normalizedGoals().find(goal => goal.id === id);
      if (!source) return;
      target = { ...source };
      userGoals.unshift(target);
    }
    target.progress = Math.min(100, Number(target.progress || 0) + 5);
    saveUserGoals();
    toastMsg("Maqsad progressi yangilandi.");
    render();
    return;
  }
  const statPeriodBtn = e.target.closest("[data-stat-period]");
  if (statPeriodBtn) {
    location.hash = `statistics?period=${statPeriodBtn.dataset.statPeriod}`;
    return;
  }
  const statSubjectBtn = e.target.closest("[data-stat-subject-filter]");
  if (statSubjectBtn) {
    const current = currentStatsSubjectFilter();
    const next = current === "all" ? "top" : "all";
    location.hash = `statistics?period=${currentStatsPeriod()}&subject=${next}`;
    return;
  }
  const pageBtn = e.target.closest("[data-go-page]");
  if (!pageBtn) return;
  const targetPage = pageBtn.dataset.goPage.split("?")[0];
  if (targetPage.startsWith("admin") && !isAdmin()) {
    toastMsg("Admin panel faqat adminlar uchun.");
    return;
  }
  if (!canOpenPage(targetPage)) {
    toastMsg("Bu bo'lim premiumdan keyin ochiladi.");
    location.hash = "premium";
    return;
  }
  document.querySelector("#profile-menu")?.classList.remove("show");
  document.querySelector(".app-main")?.classList.remove("profile-open");
  location.hash = pageBtn.dataset.goPage;
});
document.addEventListener("click", e => {
  const demoPaymentBtn = e.target.closest("[data-demo-payment]");
  if (demoPaymentBtn) {
    const form = demoPaymentBtn.closest("#premium-checkout-form");
    fillDemoPayment(form);
    toastMsg("Demo to'lov ma'lumotlari to'ldirildi.");
    return;
  }
  const confirmPremiumBtn = e.target.closest("[data-confirm-premium]");
  if (confirmPremiumBtn) {
    const form = confirmPremiumBtn.closest("#premium-checkout-form");
    const code = String(form?.elements.smsCode?.value || "").replace(/\D/g, "");
    if (code !== "1111") {
      toastMsg("SMS kod noto'g'ri. Demo kod: 1111");
      return;
    }
    recordPremiumPayment(form?.dataset.plan || "monthly", form?.dataset.pendingCard || "", "card");
    activatePremium(form?.dataset.plan || "monthly");
    buildNav();
    toastMsg("SMS tasdiqlandi. Premium faollashtirildi.");
    location.hash = "premium";
    return;
  }
  const deleteCardBtn = e.target.closest("[data-delete-card]");
  if (deleteCardBtn) {
    premiumCards = premiumCards.filter(card => card.id !== deleteCardBtn.dataset.deleteCard);
    savePremiumCards();
    toastMsg("Karta o'chirildi.");
    render();
    return;
  }
  const subjectBtn = e.target.closest(".subject-row[data-subject], .subject-card[data-subject]");
  if (!subjectBtn) return;
  location.hash = `lesson-videos?subject=${subjectBtn.dataset.subject}`;
});
document.addEventListener("click", e => {
  const playBtn = e.target.closest("[data-play-video]");
  if (!playBtn) return;
  const player = document.querySelector("#youtube-player");
  if (!player) return;
  player.innerHTML = `
    <iframe
      src="${escapeHtml(playBtn.dataset.playVideo)}"
      title="YouTube video dars"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;
  player.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
document.addEventListener("click", e => {
  if (!e.target.closest("[data-logout]")) return;
  currentUser = null;
  localStorage.removeItem("mindoraUser");
  app.classList.add("hidden");
  landing.classList.remove("hidden");
  document.querySelector("#profile-menu")?.classList.remove("show");
  document.querySelector(".app-main")?.classList.remove("profile-open");
  location.hash = "";
  toastMsg("Akkauntdan chiqildi.");
});
document.addEventListener("click", e => {
  const adminBtn = e.target.closest(".admin-user-action");
  if (!adminBtn) return;
  const email = adminBtn.dataset.email;
  const action = adminBtn.dataset.action;
  const user = registeredUsers.find(item => item.email === email);
  if (!user) return;
  if (action === "admin" && user.email !== ADMIN_EMAIL) {
    const nextAdmin = user.role !== "Admin";
    user.role = nextAdmin ? "Admin" : "Foydalanuvchi";
    if (nextAdmin) unlockUserFeatures(user, "admin");
  }
  if (action === "premium") {
    const nextPremium = !(user.premium && user.premiumPaid);
    if (nextPremium) {
      unlockUserFeatures(user, "manual");
    } else {
      user.premium = false;
      user.premiumPaid = false;
      user.premiumPlan = "";
    }
  }
  saveUsers();
  if (currentUser.email === user.email) {
    updateCurrentUser(user);
    buildNav();
  }
  toastMsg(`${user.name} huquqlari yangilandi.`);
  render();
});
document.addEventListener("click", e => {
  const deleteBtn = e.target.closest("[data-delete-content]");
  if (!deleteBtn) return;
  const id = deleteBtn.dataset.deleteContent;
  const item = adminItems.find(content => content.id === id);
  adminItems = adminItems.filter(content => content.id !== id);
  saveAdminItems();
  toastMsg(`${item?.title || "Material"} o'chirildi.`);
  render();
});
document.addEventListener("click", e => {
  const resolveBtn = e.target.closest("[data-resolve-report]");
  if (!resolveBtn) return;
  questionReports = questionReports.filter(report => report.id !== resolveBtn.dataset.resolveReport);
  saveQuestionReports();
  toastMsg("Xato ro'yxatdan olib tashlandi.");
  render();
});
document.addEventListener("click", e => {
  if (!e.target.closest("[data-test-all]")) return;
  location.hash = "tasks";
});
document.addEventListener("click", e => {
  const openTestBtn = e.target.closest("[data-open-test]");
  if (!openTestBtn) return;
  location.hash = `tasks?test=${openTestBtn.dataset.openTest}`;
});
document.addEventListener("click", e => {
  const testSubjectBtn = e.target.closest("[data-test-subject]");
  if (!testSubjectBtn) return;
  location.hash = `tasks?subject=${testSubjectBtn.dataset.testSubject}`;
});
document.addEventListener("click", e => {
  const answerBtn = e.target.closest("[data-ona-answer]");
  if (!answerBtn || !onaTiliRun || onaTiliRun.checked || onaTiliRun.finished) return;
  onaTiliRun.selected = answerBtn.dataset.onaAnswer;
  refreshSubjectQuiz();
});
document.addEventListener("click", e => {
  const checkBtn = e.target.closest("[data-test-check]");
  if (!checkBtn || !onaTiliRun || onaTiliRun.finished) return;
  const test = activeSubjectTest();
  const questions = testQuestionList(test);
  const question = questions[onaTiliRun.index];
  if (!onaTiliRun.selected) return;
  if (!onaTiliRun.checked) {
    const isCorrect = onaTiliRun.selected === question.correct;
    onaTiliRun.checked = true;
    onaTiliRun.answers[onaTiliRun.index] = { selected: onaTiliRun.selected, correct: question.correct };
    if (isCorrect) onaTiliRun.score += 1;
    recordStudyUsage(test.subject, 1);
    learningStats.tests = Number(learningStats.tests || 0) + 1;
    addLearningPoints(isCorrect ? 10 : 2);
    learningStats.testScore = Math.max(Number(learningStats.testScore || 0), Math.round((onaTiliRun.score / (onaTiliRun.index + 1)) * 100));
    saveLearningStats();
    if (!isCorrect) {
      latestMistakes = [
        { subject: test.subject, topic: question.question, createdAt: new Date().toLocaleString("uz-UZ") },
        ...latestMistakes.filter(item => item.topic !== question.question)
      ].slice(0, 12);
      saveLatestMistakes();
    } else {
      latestMistakes = latestMistakes.filter(item => item.topic !== question.question);
      saveLatestMistakes();
    }
    refreshSubjectQuiz();
    return;
  }
  if (onaTiliRun.index + 1 >= questions.length) {
    finishSubjectQuiz();
    return;
  }
  onaTiliRun.index += 1;
  onaTiliRun.selected = "";
  onaTiliRun.checked = false;
  refreshSubjectQuiz();
});
document.addEventListener("click", e => {
  if (!e.target.closest("[data-test-finish]")) return;
  finishSubjectQuiz();
});
document.addEventListener("click", e => {
  if (!e.target.closest("[data-test-restart]")) return;
  const test = activeSubjectTest();
  const questions = testQuestionList(test);
  onaTiliRun = {
    testId: test.id,
    index: 0,
    selected: "",
    checked: false,
    score: 0,
    answers: Array(questions.length).fill(null),
    finished: false
  };
  refreshSubjectQuiz();
});
document.addEventListener("click", e => {
  if (!e.target.closest("[data-report-question]")) return;
  const test = activeSubjectTest();
  const questions = testQuestionList(test);
  const question = questions[onaTiliRun?.index || 0] || questions[0];
  const id = `${test.id}-${onaTiliRun?.index || 0}`;
  const report = {
    id,
    subject: test.subject,
    testTitle: test.title,
    question: question.question,
    user: currentUser?.name || currentUser?.email || "Foydalanuvchi",
    createdAt: new Date().toLocaleString("uz-UZ")
  };
  questionReports = [report, ...questionReports.filter(item => item.id !== id)].slice(0, 80);
  saveQuestionReports();
  toastMsg("Xatolik admin panelga yuborildi.");
});
document.addEventListener("click", e => {
  const option = e.target.closest(".quiz-option");
  if (!option) return;
  const card = option.closest(".quiz-card");
  if (!card || card.dataset.answered === "true") return;
  card.dataset.answered = "true";
  card.querySelectorAll(".quiz-option").forEach(btn => btn.classList.remove("selected", "wrong", "correct"));
  const isCorrect = option.dataset.answer === option.dataset.correct;
  const correctOption = card.querySelector(`.quiz-option[data-answer="${option.dataset.correct}"]`);
  option.classList.add("selected", isCorrect ? "correct" : "wrong");
  correctOption?.classList.add("correct");
  recordStudyUsage(option.dataset.subject || "Testlar", 1);
  learningStats.tests = Number(learningStats.tests || 0) + 1;
  addLearningPoints(isCorrect ? 10 : 2);
  learningStats.testScore = isCorrect ? Math.max(Number(learningStats.testScore || 0), 100) : Number(learningStats.testScore || 0);
  saveLearningStats();
  if (!isCorrect) {
    latestMistakes = [
      {
        subject: option.dataset.subject,
        topic: option.dataset.topic,
        createdAt: new Date().toLocaleString("uz-UZ")
      },
      ...latestMistakes.filter(item => item.topic !== option.dataset.topic)
    ].slice(0, 12);
    saveLatestMistakes();
    toastMsg(`${option.dataset.topic} mavzusida xato qilding. Xotira tavsiyasi yangilandi.`);
  } else {
    latestMistakes = latestMistakes.filter(item => item.topic !== option.dataset.topic);
    saveLatestMistakes();
    toastMsg("To'g'ri! Xotira tavsiyalari yangilandi.");
  }
  updateQuizScore();
});
document.addEventListener("input", e => {
  const input = e.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (input.name === "cardNumber" || input.name === "allowedCardNumber") {
    input.value = formatCardNumber(input.value);
  }
  if (input.name === "expiry") {
    const digits = input.value.replace(/\D/g, "").slice(0, 4);
    input.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  }
  if (input.name === "cvc") {
    input.value = input.value.replace(/\D/g, "").slice(0, 4);
  }
  if (input.name === "smsCode") {
    input.value = input.value.replace(/\D/g, "").slice(0, 4);
  }
});
document.addEventListener("submit", e => {
  if (e.target.id === "premium-checkout-form") {
    e.preventDefault();
    const form = new FormData(e.target);
    const method = form.get("method");
    const cardNumber = String(form.get("cardNumber") || "").replace(/\D/g, "");
    const expiry = String(form.get("expiry") || "").trim();
    const cvc = String(form.get("cvc") || "").replace(/\D/g, "");
    if (method === "card") {
      if (cardNumber.length < 12 || !/^\d{2}\/\d{2}$/.test(expiry) || cvc.length < 3) {
        toastMsg("Karta ma'lumotlarini to'liq kiriting.");
        return;
      }
      const allowedCard = premiumCards.find(card => digitsOnly(card.number) === cardNumber);
      if (!allowedCard) {
        toastMsg("Bu karta admin panelda ro'yxatdan o'tmagan.");
        return;
      }
      e.target.dataset.pendingCard = allowedCard.number;
    } else {
      toastMsg("Hozircha premium faqat admin paneldagi karta orqali ochiladi.");
      return;
    }
    showCheckoutSms(e.target);
    return;
  }
  if (e.target.id === "admin-card-form") {
    e.preventDefault();
    const form = new FormData(e.target);
    const number = digitsOnly(form.get("allowedCardNumber"));
    const owner = String(form.get("cardOwner") || "").trim();
    if (number.length < 12) {
      toastMsg("Karta raqamini to'liq kiriting.");
      return;
    }
    if (premiumCards.some(card => digitsOnly(card.number) === number)) {
      toastMsg("Bu karta allaqachon qo'shilgan.");
      return;
    }
    premiumCards.unshift({
      id: `card-${Date.now().toString(36)}`,
      number,
      owner,
      createdAt: new Date().toLocaleString("uz-UZ")
    });
    savePremiumCards();
    toastMsg("Premium karta qo'shildi.");
    render();
    return;
  }
  if (e.target.id === "goal-form") {
    e.preventDefault();
    const form = new FormData(e.target);
    const goal = {
      id: `goal-${Date.now().toString(36)}`,
      title: String(form.get("title") || "").trim(),
      description: String(form.get("description") || "").trim(),
      progress: Math.max(0, Math.min(100, Number(form.get("progress") || 0))),
      tone: ["violet", "blue", "green", "orange"][userGoals.length % 4],
      icon: "◎"
    };
    if (!goal.title) return;
    userGoals.unshift(goal);
    saveUserGoals();
    toastMsg("Yangi maqsad qo'shildi.");
    location.hash = `goals?goal=${goal.id}`;
    return;
  }
  if (e.target.id !== "admin-create-form") return;
  e.preventDefault();
  const form = new FormData(e.target);
  const type = form.get("type");
  const item = {
    id: Date.now().toString(36),
    type,
    title: form.get("title").trim(),
    description: form.get("description").trim(),
    level: form.get("level"),
    subject: form.get("subject") || "",
    url: form.get("url") || "",
    period: form.get("period") || "",
    deadline: form.get("deadline") || "",
    questions: form.get("questions"),
    duration: String(form.get("duration") || "").trim(),
    points: form.get("points"),
    body: String(form.get("body") || "").trim(),
    createdAt: new Date().toLocaleString("uz-UZ")
  };
  adminItems.unshift(item);
  saveAdminItems();
  toastMsg(type === "tests" ? "Yopiq olimpiada saqlandi va hammaga e'lon qilindi." : `${contentTypes[type].label} saqlandi va sahifaga qo'shildi.`);
  location.hash = type;
});
document.addEventListener("change", e => {
  if (e.target.id !== "ai-image-field") return;
  const preview = document.querySelector("#ai-image-preview");
  const file = e.target.files?.[0];
  if (!preview) return;
  if (!file) {
    preview.innerHTML = "";
    return;
  }
  preview.innerHTML = `<span>Tanlangan rasm: ${escapeHtml(file.name)}</span><img src="${URL.createObjectURL(file)}" alt="Yuklangan rasm" />`;
});
document.addEventListener("submit", async e => {
  if (e.target.id !== "ai-chat-form") return;
  e.preventDefault();
  const input = e.target.elements.question;
  const imageInput = e.target.elements.image;
  const imageFile = imageInput.files?.[0];
  let question = input.value.trim();
  if (!question && !imageFile) return;
  const log = document.querySelector("#ai-chat-log");
  if (imageFile) {
    log.insertAdjacentHTML("beforeend", `<div class="chat-bubble user">📷 ${escapeHtml(imageFile.name)}${question ? `<br>${escapeHtml(question)}` : ""}</div><div class="chat-bubble ai" id="ocr-working">Rasmni o'qiyapman...</div>`);
    try {
      const imageText = await readImageText(imageFile);
      const prompt = [question, imageText].filter(Boolean).join("\n\n");
      const answer = imageText
        ? generateTutorReply(prompt)
        : "Rasmdan matn topa olmadim. Rasm tiniqroq bo'lsa yoki savolni matn qilib yozsangiz, darhol ishlab beraman.";
      document.querySelector("#ocr-working")?.remove();
      log.insertAdjacentHTML("beforeend", `<div class="chat-bubble ai">${imageText ? `<b>Rasmdan o'qilgan matn:</b> ${escapeHtml(imageText)}<br><br>` : ""}${answer}</div>`);
    } catch {
      document.querySelector("#ocr-working")?.remove();
      log.insertAdjacentHTML("beforeend", `<div class="chat-bubble ai">Rasmni o'qish uchun OCR kutubxonasi yuklanmadi. Internet bo'lsa qayta urinib ko'ring yoki savolni matn qilib tashlang.</div>`);
    }
  } else {
    const answer = generateTutorReply(question);
    log.insertAdjacentHTML("beforeend", `<div class="chat-bubble user">${escapeHtml(question)}</div><div class="chat-bubble ai">${answer}</div>`);
  }
  input.value = "";
  if (imageInput) imageInput.value = "";
  document.querySelector("#ai-image-preview").innerHTML = "";
  log.scrollTop = log.scrollHeight;
});
window.addEventListener("hashchange", () => {
  syncStoredData();
  render();
});
window.addEventListener("hashchange", renderLandingPage);
window.addEventListener("resize", () => window.requestAnimationFrame(drawCharts));
window.addEventListener("storage", e => {
  const autoRefreshKeys = [
    "mindoraUser",
    "mindoraUsers",
    "mindoraAdminItems",
    "mindoraUserGoals",
    "mindoraLessonVideos",
    "mindoraLearningStats"
  ];
  if (!autoRefreshKeys.includes(e.key) && !String(e.key || "").startsWith("mindoraUserXp:")) return;
  syncStoredData();
  if (e.key === "mindoraLearningStats" || String(e.key || "").startsWith("mindoraUserXp:")) statsSnapshot = progressSnapshot();
  if (currentUser) render();
});
setInterval(refreshStatisticsIfNeeded, 4000);
setInterval(() => {
  if (document.hidden || !currentUser) return;
  const subject = activeStudySubject();
  if (subject) recordStudyUsage(subject, 1);
}, 60000);

updateLandingStats();
if (currentUser) login(currentUser);
else renderLandingPage();
