// ─────────────────────────────────────────────
// Open positions — edit this file to add/remove
// positions shown on the Career page.
// ─────────────────────────────────────────────

const facilityImage = "https://media.base44.com/images/public/6a42ca6def2b3fde835b3720/abdf0ee40_IMG_06852Large.jpg";

const whatWeOffer = {
  cs: [
    "Stabilní zaměstnání na plný úvazek v rychle rostoucí technologické firmě",
    "Dlouhodobou perspektivu a jistotu do budoucna",
    "Moderní pracovní prostředí v nově budovaném provozu v Příbrami",
    "Práce s unikátní automatickou recyklační linkou",
    "Možnost profesního růstu při expanzi firmy do zahraničí",
    "Adekvátní mzdové ohodnocení odpovídající kvalifikaci a praxi",
  ],
  en: [
    "Stable full-time employment in a fast-growing technology company",
    "Long-term perspective and future security",
    "Modern work environment in a newly built facility in Příbram",
    "Work with a unique automated recycling line",
    "Career growth opportunities as the company expands internationally",
    "Competitive compensation matching qualifications and experience",
  ],
};

export const careerPositions = [
  {
    id: "material-flow-operator",
    title: { cs: "Obsluha materiálového toku linky", en: "Material Flow Operator" },
    location: { cs: "Příbram", en: "Příbram" },
    type: { cs: "Plný úvazek", en: "Full-time" },
    salary: { cs: "40 000–44 000 Kč / měsíc", en: "40,000–44,000 CZK / month" },
    positionsAvailable: 4,
    workHours: { cs: "Směnný provoz", en: "Shift work" },
    startDate: { cs: "Ihned", en: "Immediate" },
    image: facilityImage,
    shortDescription: {
      cs: "Manipulace se solárními panely a recyklovanými materiály, obsluha vysokozdvižného vozíku, vážení materiálu a udržování čistoty pracoviště.",
      en: "Handling of solar panels and recycled materials, forklift operation, material weighing, and maintaining workplace cleanliness.",
    },
    description: {
      cs: "Hledáme spolehlivé pracovníky pro obsluhu materiálového toku na naší recyklační lince. Vaší náplní bude manipulace se solárními panely a recyklovanými materiály, obsluha vysokozdvižného vozíku a zajištění plynulého průběhu materiálových toků v provozu.",
      en: "We are looking for reliable workers to operate the material flow on our recycling line. Your role will involve handling solar panels and recycled materials, operating a forklift, and ensuring smooth material flow throughout the facility.",
    },
    responsibilities: {
      cs: [
        "Manipulace se solárními panely a recyklovanými materiály",
        "Obsluha vysokozdvižného vozíku (VZV)",
        "Vážení materiálu a evidence množství",
        "Udržování čistoty a pořádku na pracovišti",
        "Spolupráce s obsluhou recyklační linky",
      ],
      en: [
        "Handling of solar panels and recycled materials",
        "Forklift (VZV) operation",
        "Material weighing and quantity recording",
        "Maintaining workplace cleanliness and order",
        "Cooperation with recycling line operators",
      ],
    },
    requirements: {
      cs: [
        "Průkaz vysokozdvižného vozíku (VZV)",
        "Zkušenost s řízením VZV",
        "Dobrý zdravotní stav",
        "Spolehlivost a pečlivost",
      ],
      en: [
        "Forklift (VZV) license",
        "Experience operating a forklift",
        "Good health condition",
        "Reliability and diligence",
      ],
    },
    whatWeOffer,
  },
  {
    id: "line-operator",
    title: { cs: "Operátor linky", en: "Line Operator" },
    location: { cs: "Příbram", en: "Příbram" },
    type: { cs: "Plný úvazek", en: "Full-time" },
    salary: { cs: "42 000–46 000 Kč / měsíc", en: "42,000–46,000 CZK / month" },
    positionsAvailable: 2,
    workHours: { cs: "Směnný provoz", en: "Shift work" },
    startDate: { cs: "Ihned", en: "Immediate" },
    image: facilityImage,
    shortDescription: {
      cs: "Obsluha recyklační linky, kontrola parametrů, kalibrace zařízení, řešení provozních závad a každodenní kontrola technologie.",
      en: "Operation of the recycling line, parameter monitoring, equipment calibration, troubleshooting, and daily technology inspection.",
    },
    description: {
      cs: "Hledáme operátora recyklační linky, který se bude starat o chod naší unikátní automatické technologie. Vaším úkolem bude obsluha linky, sledování provozních parametrů, kalibrace zařízení a včasná reakce na případné provozní závady.",
      en: "We are looking for a recycling line operator to manage our unique automated technology. Your tasks will include line operation, monitoring operational parameters, equipment calibration, and timely response to any operational issues.",
    },
    responsibilities: {
      cs: [
        "Obsluha recyklační linky",
        "Kontrola provozních parametrů",
        "Kalibrace a seřizování zařízení",
        "Řešení provozních závad",
        "Každodenní kontrola a údržba technologie",
      ],
      en: [
        "Operation of the recycling line",
        "Monitoring of operational parameters",
        "Equipment calibration and adjustment",
        "Troubleshooting operational issues",
        "Daily inspection and maintenance of technology",
      ],
    },
    requirements: {
      cs: [
        "Technické zkušenosti",
        "Ideálně mechanik nebo seřizovač",
        "Schopnost samostatné práce",
        "Zodpovědnost a pečlivost",
      ],
      en: [
        "Technical experience",
        "Ideally a mechanic or fitter background",
        "Ability to work independently",
        "Responsibility and diligence",
      ],
    },
    whatWeOffer,
  },
  {
    id: "chemist-junior",
    title: { cs: "Chemik junior", en: "Junior Chemist" },
    location: { cs: "Příbram", en: "Příbram" },
    type: { cs: "Plný úvazek", en: "Full-time" },
    salary: { cs: "50 000–55 000 Kč / měsíc", en: "50,000–55,000 CZK / month" },
    positionsAvailable: 2,
    workHours: { cs: "Pondělí – pátek", en: "Monday – Friday" },
    startDate: { cs: "Ihned", en: "Immediate" },
    image: facilityImage,
    shortDescription: {
      cs: "Obsluha chemické části technologie, manipulace s přísadami, sledování procesu a běžná údržba.",
      en: "Operating the chemical part of the technology, handling additives, process monitoring, and routine maintenance.",
    },
    description: {
      cs: "Hledáme chemika juniora, který se podílí na obsluze chemické části naší recyklační technologie. Budete pracovat pod vedením zkušenějšího chemika, manipulovat s chemickými přísadami, sledovat průběh procesu a provádět běžnou údržbu zařízení.",
      en: "We are looking for a junior chemist to participate in operating the chemical part of our recycling technology. You will work under the guidance of a senior chemist, handle chemical additives, monitor the process, and perform routine equipment maintenance.",
    },
    responsibilities: {
      cs: [
        "Obsluha chemické části technologie",
        "Manipulace s chemickými přísadami",
        "Sledování průběhu procesu",
        "Běžná údržba zařízení",
        "Evidence a reportování dat",
      ],
      en: [
        "Operating the chemical part of the technology",
        "Handling chemical additives",
        "Monitoring process progress",
        "Routine equipment maintenance",
        "Data recording and reporting",
      ],
    },
    requirements: {
      cs: [
        "Základní technické nebo chemické znalosti",
        "Ochota učit se novým postupům",
        "Spolehlivost a pečlivost",
        "Zodpovědný přístup k práci",
      ],
      en: [
        "Basic technical or chemical knowledge",
        "Willingness to learn new procedures",
        "Reliability and diligence",
        "Responsible approach to work",
      ],
    },
    whatWeOffer,
  },
  {
    id: "chemist-senior",
    title: { cs: "Chemik senior", en: "Senior Chemist" },
    location: { cs: "Příbram", en: "Příbram" },
    type: { cs: "Plný úvazek", en: "Full-time" },
    salary: { cs: "55 000–60 000 Kč / měsíc", en: "55,000–60,000 CZK / month" },
    positionsAvailable: 1,
    workHours: { cs: "Pondělí – pátek", en: "Monday – Friday" },
    startDate: { cs: "Ihned", en: "Immediate" },
    image: facilityImage,
    shortDescription: {
      cs: "Řízení chemické části recyklačního procesu, práce s reagenciemi, kontrola chemických parametrů a údržba zařízení.",
      en: "Managing the chemical part of the recycling process, working with reagents, monitoring chemical parameters, and equipment maintenance.",
    },
    description: {
      cs: "Hledáme zkušeného chemika, který převezme odpovědnost za chemickou část našeho recyklačního procesu. Budete řídit chemické procesy, pracovat s reagenciemi, monitorovat klíčové parametry a dbát na bezpečnost a kvalitu celého procesu.",
      en: "We are looking for an experienced chemist to take responsibility for the chemical part of our recycling process. You will manage chemical processes, work with reagents, monitor key parameters, and ensure safety and quality throughout the process.",
    },
    responsibilities: {
      cs: [
        "Řízení chemické části recyklačního procesu",
        "Práce s reagenciemi a chemickými látkami",
        "Kontrola chemických parametrů procesu",
        "Údržba a kalibrace chemického zařízení",
        "Dodržování bezpečnostních předpisů",
      ],
      en: [
        "Managing the chemical part of the recycling process",
        "Working with reagents and chemical substances",
        "Monitoring chemical process parameters",
        "Maintenance and calibration of chemical equipment",
        "Compliance with safety regulations",
      ],
    },
    requirements: {
      cs: [
        "Střední chemická průmyslová škola nebo vyšší vzdělání v chemii",
        "Praxe v chemickém provozu výhodou",
        "Znalost bezpečnosti práce s chemickými látkami",
        "Samostatnost a odpovědnost",
      ],
      en: [
        "Secondary chemical industrial school or higher education in chemistry",
        "Experience in chemical operations is an advantage",
        "Knowledge of safety practices with chemical substances",
        "Independence and responsibility",
      ],
    },
    whatWeOffer,
  },
];

export const getPositionById = (id) => careerPositions.find((p) => p.id === id);