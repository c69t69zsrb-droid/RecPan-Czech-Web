// ── Napsali o nás / In the media ────────────────────────────
// Pro přidání dalšího článku stačí přidat jeden objekt do pole níže.
// Pořadí v souboru není důležité – sekce řadí články podle `date` od nejnovějšího.
// Položky:
//   medium – název média
//   date   – datum ve formátu RRRR-MM-DD
//   title  – titulek článku
//   perex  – krátké shrnutí (1–2 řádky)
//   image  – úvodní obrázek článku (URL). Zobrazuje se nahoře v kartě.
//   url    – odkaz na článek
export const mediaArticles = [
  {
    medium: "TN.cz / TV Nova",
    date: "2026-10-18",
    title: "Solární panely je nutné občas vyměnit. V Příbrami otevřeli centrum, kde je recyklují",
    perex: "Reportáž Televizních novin přímo z příbramského závodu: linka rozebírá vysloužilý panel na sklo, hliník, křemík, stříbro a měď.",
    image: "https://cloudia.cms.nova.cz/r800x/826ec855-fef8-4748-8837-6b8f516cb31a",
    url: "https://tn.nova.cz/zpravodajstvi/clanek/659344-solarni-panely-je-nutne-obcas-vymenit-v-pribrami-otevreli-centrum-kde-je-recykluji",
  },
  {
    medium: "Ekonomický deník",
    date: "2026-10-17",
    title: "Napravo padá drcené sklo, nalevo měď. RecPan spustil recyklaci solárních panelů",
    perex: "Reportáž z otevření prvního závodu RecPan v Příbrami. Plně automatizovaná linka zpracuje až 7 000 tun panelů ročně.",
    image: "https://ekonomickydenik.cz/app/uploads/2026/10/20261015-151910-scaled.jpg",
    url: "https://ekonomickydenik.cz/recpan-spustil-recyklaci-solarnich-panelu/",
  },
  {
    medium: "Ministerstvo životního prostředí",
    date: "2026-10-16",
    title: "V Příbrami začal fungovat závod na recyklaci fotovoltaických panelů",
    perex: "Tisková zpráva MŽP k zahájení provozu závodu s materiálovým využitím přes 97 % hmotnosti panelu.",
    image: "https://mzp.gov.cz/sites/default/files/styles/facebook/public/2026-10/mzp_recyklacni_linka_FVE.jpg?itok=A7C_byXp",
    url: "https://mzp.gov.cz/cz/pro-media-a-verejnost/aktuality/archiv-tiskovych-zprav/v-pribrami-zacal-fungovat-zavod-na-recyklaci-fotovoltaickych-panelu",
  },
  {
    medium: "ČTK / Ekolist.cz",
    date: "2026-10-15",
    title: "V Příbrami zahájil provoz závod na recyklaci fotovoltaických panelů",
    perex: "RecPan otevřel v Příbrami první závod. Linka rozebírá panely na sklo, hliník, křemík, měď a drahé kovy.",
    image: "https://aa.ecn.cz/img_upload/e6ffb6c50bc1424ab10ecf09e063cd63/2374820586_03db26d1bd_k.jpg",
    url: "https://ekolist.cz/cz/zpravodajstvi/zpravy/v-pribrami-zahajil-provoz-zavod-na-recyklaci-fotovoltaickych-panelu",
  },
  {
    medium: "Ekonomický deník",
    date: "2026-10-14",
    title: "Staré solární panely na smetišti neskončí. Jejich recyklace se ujme nový závod v Příbrami",
    perex: "„Vysloužilý panel pro nás není odpad, ale zdroj surovin.“ Proč přichází čas na recyklaci fotovoltaiky.",
    image: "https://ekonomickydenik.cz/app/uploads/2026/10/20261015-140536-scaled.jpg",
    url: "https://ekonomickydenik.cz/stare-solarni-panely-recyklace-pribram/",
  },
];