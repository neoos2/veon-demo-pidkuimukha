// All facts come from veon/client.json (ids in comments). Nothing here is invented.

export const clinic = {
  name: "Стоматологічна клініка д-ра Підкуймухи", // company.name
  since: 2003, // B-F005
  street: "вул. Миколи Коперника, 62/1", // company.contacts.addresses[0]
  city: "Львів",
  district: "центр міста", // company.geography[0]
};

// company.contacts.phones: [1] — the booking number («Записатись онлайн», B-F018), [0] — city line.
export const phones = {
  booking: { href: "tel:+380677818385", label: "+38 (067) 781 83 85", short: "067 781 83 85", note: "для запису" },
  city: { href: "tel:+380322387072", label: "+38 (032) 238 70 72", short: "032 238 70 72", note: "міський" },
};

export const links = {
  telegram: "https://t.me/PidkuimukhaDental", // company.contacts.messengers[0]
  instagram: "https://www.instagram.com/dr.pidkuimukha/", // socials (confirmed)
  facebook: "https://www.facebook.com/Dr.Pidkuimukha", // socials (confirmed)
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Львів, вул. Миколи Коперника, 62/1"),
};

export const SOON = "Розділ у розробці";

export interface Doctor {
  key: "yurii" | "iryna" | "dmytro";
  first: string;
  full: string;
  years: number;
  role: string;
  extra?: string;
}

// B-F001 — B-F003 (сторінка «Про нас»)
export const doctors: Doctor[] = [
  {
    key: "yurii",
    first: "Юрій",
    full: "Юрій Богданович Підкуймуха",
    years: 30,
    role: "Лікар-стоматолог вищої категорії",
    extra: "Член асоціації імплантологів України, учасник наукових конгресів",
  },
  {
    key: "iryna",
    first: "Ірина",
    full: "Ірина Підкуймуха",
    years: 27,
    role: "Лікар-стоматолог вищої категорії",
  },
  {
    key: "dmytro",
    first: "Дмитро",
    full: "Дмитро Підкуймуха",
    years: 14,
    role: "Лікар-стоматолог, хірург",
    extra: "Член асоціації стоматологів України, учасник світових наукових конференцій",
  },
];

export interface Direction { name: string; text: string; rec?: string }
export interface Branch { id: string; title: string; text: string; items: Direction[] }

// company.business_lines + products_services, grouped by «для кого» (B-F007).
export const branches: Branch[] = [
  {
    id: "kids",
    title: "Дітям",
    text: "Лікування карієсу і коренів молочних зубів, видалення молочного зуба.",
    items: [{ name: "Дитяча стоматологія", text: "" }],
  },
  {
    id: "pregnancy",
    title: "Під час вагітності",
    text: "Окремий напрям клініки — стоматологія для вагітних.",
    items: [{ name: "Стоматологія для вагітних", text: "" }],
  },
  {
    id: "adults",
    title: "Дорослим",
    text: "Від гігієни й діагностики до лікування каналів під мікроскопом і брекетів.",
    items: [
      { name: "Естетична та терапевтична стоматологія", text: "зокрема ендодонтія під мікроскопом" },
      { name: "Ортодонтія", text: "встановлення брекетів", rec: "UX-R010" },
      { name: "Діагностика та профілактика", text: "професійна гігієна, консультація" },
      { name: "Хірургія та пародонтологія", text: "" },
    ],
  },
  {
    id: "parents",
    title: "Батькам",
    text: "Повертаємо якість життя для ваших батьків.",
    items: [{ name: "Протезування та імплантація", text: "" }],
  },
];

export interface PriceRow { name: string; from: number }
export interface PriceGroup { title: string; rows: PriceRow[] }

// Прайс клініки (сторінка «Ціни», 2025-10-23): B-F011, B-F012, B-F014, B-F015. Only «від» positions.
export const prices: PriceGroup[] = [
  {
    title: "Дітям",
    rows: [
      { name: "Лікування карієсу молочних зубів", from: 1200 }, // B-F015
      { name: "Лікування коренів молочних зубів", from: 2500 }, // B-F015
    ],
  },
  {
    title: "Дорослим",
    rows: [
      { name: "Професійна гігієна", from: 2000 }, // B-F011
      { name: "Первинне ендодонтичне лікування", from: 4000 }, // B-F014
      { name: "Брекети", from: 21500 }, // B-F014
    ],
  },
  {
    title: "Батькам",
    rows: [{ name: "Імплантація зуба", from: 13000 }], // B-F012
  },
];

// B-F010
export const payment = "готівка, картки Visa і Mastercard, розстрочка monobank або ПриватБанк, страхові компанії — зокрема Уніка, AXA, Універсальна";

// B-F006, B-F017
export const equipment = [
  { brand: "MELAG", text: "системи дезінфекції й обробки стоматологічного обладнання" },
  { brand: "Carl Zeiss", text: "мікроскоп: ендодонтія під мікроскопом" },
  { brand: "KaVo Dental", text: "стоматологічні установки" },
  { brand: "3D-сканування", text: "інтраоральне сканування" },
  { brand: "Picasso", text: "діодний лазер" },
  { brand: "Philips Zoom", text: "відбілювання, лампа WhiteSpeed" },
];

/** 21500 → «21 500» with a narrow no-break space. */
export const money = (n: number) => n.toLocaleString("uk-UA").replace(/\s/g, " ");
