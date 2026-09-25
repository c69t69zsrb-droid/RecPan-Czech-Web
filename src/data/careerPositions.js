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
    positionsAvailable: 3,
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
];

export const getPositionById = (id) => careerPositions.find((p) => p.id === id);