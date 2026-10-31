// Saytdagi barcha matnlar shu yerda — tahrirlash uchun faqat shu faylni o'zgartiring.

export const EVENT = {
  title: "AI xodimlar orqali biznesni oson boshqaring",
  subtitle:
    "Viloyatda xodim qidirib o'tirmasdan — video, dizayn, SMM, sotuv va hisob-kitob ishlarini sun'iy intellekt xodimlariga topshirishni o'rganing. Darsning o'zida o'z biznesingiz uchun birinchi AI xodimni yasab chiqasiz.",
  region: "Surxondaryo viloyati tadbirkorlari uchun",
  format: "Oflayn intensiv · 1 kun · 4 soat",
  cities: [
    { city: "Denov", date: "7-noyabr", weekday: "shanba", iso: "2026-11-07T14:00:00+05:00" },
    { city: "Termiz", date: "8-noyabr", weekday: "yakshanba", iso: "2026-11-08T14:00:00+05:00" },
  ],
  time: "14:00–18:00",
};

export const SPEAKER = {
  name: "Bobur Mirzo Yo'ldoshboyev",
  role: "HR, xodimlarni boshqarish va biznesni tizimlashtirish bo'yicha 10 yillik amaliy tajribaga ega mutaxassis",
  quote:
    "10 yildan beri jamoa quradi va bizneslarni tizimga soladi. Endi sun'iy intellekt xodimlari yordamida buni tez, arzon va xodim qidirmasdan qilishni o'rgatadi.",
  stats: [
    { value: "10 yil", label: "amaliy tajriba" },
    { value: "3 ta", label: "mualliflik kursi" },
    { value: "“Mard o'g'lon”", label: "davlat mukofoti sohibi" },
    { value: "5 yil", label: "deputatlik faoliyati" },
  ],
  now: [
    "Bobur Mirzo Akademiyasi asoschisi va rahbari (2020-yildan)",
    "O'zbekiston intellektual trenerlar federatsiyasi prezidenti (2021-yildan)",
    "“Alfa Group” kompaniyasi direktori",
    "“Aksariy Development” — marketing va sotuv jarayonlarini boshqarish bo'yicha loyiha rahbari",
  ],
  courses: ["Biznes Restart", "HR direktor", "Sun'iy intellekt orqali biznesni tizimlashtirish"],
  path: [
    { years: "2016–2020", text: "“Modern Education” intellektni rivojlantirish markazi direktori" },
    { years: "2019–2024", text: "Xalq deputatlari tuman kengashi deputati" },
    { years: "2019–2024", text: "Oliy Majlis Senati huzuridagi Yoshlar parlamenti deputati" },
    { years: "2020 — hozir", text: "Bobur Mirzo Akademiyasi asoschisi va rahbari" },
    { years: "2021 — hozir", text: "O'zbekiston intellektual trenerlar federatsiyasi prezidenti" },
    { years: "2023–2024", text: "“Perfect Consulting Group” bosh ijrochi direktori" },
  ],
};

export const PAINS = [
  {
    tag: "01",
    title: "Zamonaviy mutaxassis topilmaydi",
    text: "Mobilograf, montajchi, dizayner, SMM, marketolog, sotuvchi — viloyatda bunday kadrni topish qiyin. Eng og'rig'i esa sotuv bo'limi rahbari va ijrochi direktor.",
  },
  {
    tag: "02",
    title: "Bor xodimni boshqarish qiyin",
    text: "Mas'uliyatdan qochish, tez-tez ishdan ketish, katta kadrlar oqimi. Yangi xodimni tez moslashtiradigan tizim yo'q — har safar hammasi boshidan.",
  },
  {
    tag: "03",
    title: "Tizimsizlik",
    text: "Ma'lumotlar tartibsiz, hisob-kitob chalkash, shaxsiy pul bilan kompaniya puli aralashgan. Biznes foydadami yoki zararda — aniq bilinmaydi.",
  },
  {
    tag: "04",
    title: "Raqobat va marja",
    text: "Mijozni jalb qilish narxi qimmatlashmoqda, savdo tushadi, o'zgarmas xarajatlar tannarxni yeb qo'yadi. Marja pasayadi, foyda kamayadi.",
  },
];

export const AI_PERKS = [
  { title: "24/7 ishlaydi", text: "Tunda ham, bayramda ham mijozga darhol javob beradi." },
  { title: "Ketib qolmaydi", text: "Bilim xodim bilan ketmaydi — kompaniyada qoladi." },
  { title: "Oylik so'ramaydi", text: "Deyarli tekin: zamonaviy kasb ishini arzon narxda bajaradi." },
  { title: "“Yulduz” bo'lmaydi", text: "Yo'riqnomaga amal qiladi, kayfiyatga qaramaydi." },
];

export const OUTCOMES = [
  "O'z biznesingiz uchun yasalgan birinchi AI xodim — Telegram'da ishlaydi",
  "Yaxshi prompt yozish formulasi: Rol + Vazifa + Kontekst + Format + Cheklov",
  "Sohangizda AI qo'llash mumkin bo'lgan 3–5 aniq yo'nalish",
  "CRM va ERP'ni dasturchisiz qurish mumkinligini o'z ko'zingiz bilan ko'rasiz",
  "Butun biznesni tizimlashtirish uchun keyingi qadam rejasi",
];

export const PROGRAM = [
  { time: "14:00", dur: 20, title: "Ochilish va tanishuv", result: "Har biringiz o'z og'rig'ini aniq ko'radi", points: ["Spiker va intensiv haqida", "Zal bilan uchta savol: xodim, foyda, mijoz narxi", "Kun xaritasi va intensiv guruhiga QR orqali qo'shilish"] },
  { time: "14:20", dur: 35, title: "Sun'iy intellekt: imkoniyat, tarix, bozor", result: "“AI bu shunchaki chat emas”", points: ["AI matn yozadi, gapiradi, rasm va video yasaydi, hisob qiladi", "Jonli mini-demo: bir daqiqada reklama rasmi", "Dunyo va O'zbekiston bozori — kim birinchi boshlasa, oldinga chiqadi"] },
  { time: "14:55", dur: 45, title: "Real biznes keyslar", result: "“Bu mening sohamda ham ishlaydi”", points: ["Video generatsiya — videograf va montajchisiz", "CRM va ERP — dasturchisiz, o'z qo'lingiz bilan", "Veb-dizayn, mobil ilova va Telegram bot"] },
  { time: "15:40", dur: 25, title: "Prompt injiniring", result: "AI'ga to'g'ri vazifa berishni o'rganasiz", points: ["Yomon va yaxshi prompt — ekranda solishtirish", "5 qismli prompt formulasi", "Mashq: o'z biznesingiz uchun birinchi prompt"] },
  { time: "16:05", dur: 30, title: "Jonli demo: sahnada AI menejer", result: "Ko'z oldingizda AI menejer ishga tushadi", points: ["Zaldan ko'ngilli tadbirkor sahnaga chiqadi", "Bilim bazasi + yo'riqnoma + Telegram'ga ulash", "Butun zal AI menejerga yozadi — lidlar real vaqtda tushadi"] },
  { time: "16:35", dur: 20, title: "Coffee break", result: "Demo botni sinash va tanishuvlar", points: ["AI menejer bilan erkin suhbat", "Amaliyotga tayyorgarlik tekshiruvi", "Networking"] },
  { time: "16:55", dur: 40, title: "Amaliyot: har kim o'z AI xodimini yasaydi", result: "Birinchi AI xodimingiz tayyor", points: ["Rol tanlash: sotuvchi, SMM, HR yoki administrator", "Biznes ma'lumoti va yo'riqnoma shablon bo'yicha", "Ulash, sinash va to'g'rilash — yordamchilar bilan"] },
  { time: "17:35", dur: 25, title: "Keyingi qadam", result: "Butun biznesni tizimlashtirish yo'li", points: ["1 oylik “AI orqali biznesni tizimlashtirish” kursi taqdimoti", "Intensiv ishtirokchilari uchun maxsus shartlar", "Savol-javob va umumiy surat"] },
];

export const INDUSTRIES = [
  { name: "Mebel ishlab chiqarish", ai: "Buyurtma qabul qiluvchi va o'lcham yozuvchi menejer, sex buyurtmalari CRM'i" },
  { name: "Mebel savdosi", ai: "Telegram'da katalog ko'rsatib, narx aytib, kontakt oluvchi sotuvchi" },
  { name: "Oziq-ovqat do'konlari", ai: "Ombor qoldig'i va kunlik savdo hisoboti, aksiya kontenti" },
  { name: "Distribyutsiya", ai: "Agentlar buyurtmasi, qarzdorlik nazorati, marshrut hisobi" },
  { name: "Ta'lim, maktab, bog'cha", ai: "Ota-onalarga javob beruvchi administrator, to'lov nazorati, yangi o'qituvchiga yo'riqnoma" },
  { name: "Qurilish", ai: "Smeta tayyorlovchi yordamchi, material xarajati hisobi" },
  { name: "Savdo", ai: "24/7 sotuvchi, reklama kreativlari va video" },
  { name: "Meditsina", ai: "Qabulga yozuvchi administrator, bemorlarga eslatma" },
];

export const FAQ = [
  { q: "Men texnikadan uzoqman. Uddalay olamanmi?", a: "Ha. Intensiv dasturchilar uchun emas, biznesni o'zi boshqarayotgan tadbirkorlar uchun tuzilgan. Hammasi tayyor shablon bo'yicha qadam-baqadam qilinadi, amaliyotda har 10–15 ishtirokchiga bitta yordamchi biriktiriladi." },
  { q: "O'zim bilan nima olib kelishim kerak?", a: "Zaryadlangan telefon (yoki noutbuk) va ochiq Telegram. Biznesingiz haqidagi asosiy ma'lumotlar — mahsulot, narx, mijozlar ko'p beradigan savollar — yodingizda bo'lsa yetarli. A4 shablon zalda beriladi." },
  { q: "AI mening sohamga to'g'ri keladimi?", a: "Mebel, savdo, distribyutsiya, qurilish, ta'lim, meditsina — real keyslar bloki aynan shu savolga javob beradi. Har bir soha uchun aniq AI xodim misollari ko'rsatiladi." },
  { q: "Intensivdan keyin AI xodim ishlashda davom etadimi?", a: "Ha. Siz yasagan AI xodim Telegram'da ishlaydi va intensivdan keyin ham biznesingizda qoladi." },
  { q: "Joylar soni cheklanganmi?", a: "Ha. Amaliyot sifatli o'tishi uchun har bir shaharda joylar soni cheklangan. Joyni oldindan band qilib qo'yishni tavsiya qilamiz." },
];

// ───── Yangi dizayn (ai-xodimlar) bo'limlari uchun matnlar ─────

export const CONTACT = { phone: "+998 99 999 00 38", tel: "+998999990038" };

export const PRICE = { value: "197 000", currency: "so'm" };

export const HERO_PROMISES = [
  "O'z AI xodimlaringizni yarata olasiz;",
  "O'zingizga mos CRM qura olasiz;",
  "Mobil ilova va veb sayt yarata olasiz.",
];

export const BIO = [
  "O'zbekiston Intellektual trenerlar federatsiyasi prezidenti",
  "BM Akademiyasi asoschisi va rahbari",
];

export const PROJECT_LOGOS = [
  { src: "/assets/web/aksaray.webp", alt: "Aksaray" },
  { src: "/assets/web/yangi-denov.webp", alt: "Yangi Denov" },
  { src: "/assets/web/v-logo.webp", alt: "Hamkor loyiha" },
  { src: "/assets/web/asqar-mall.webp", alt: "Asqar Mall" },
  { src: "/assets/web/mirzo-buildings.webp", alt: "Mirzo Buildings" },
  { src: "/assets/web/caravan-mall.webp", alt: "Caravan Mall" },
];

export const DENOV_VIDEOS = [13, 14, 4, 5, 6, 7, 8, 9];

export const PROBLEMS = [
  { title: "Zamonaviy mutaxassis topilmaydi", text: "Sotuvchi, marketolog, SMM, dizayner, montajchi topish qiyin. Kuchli kadrlar esa Toshkentga ketib qoladi." },
  { title: "Bor xodimni boshqarish qiyin", text: "Xodimlar mas'uliyatdan qochadi, tez-tez almashadi, yangi xodimni ishga moslashtirish tizimi yo'q." },
  { title: "Biznesda tizim yo'q", text: "Hisob-kitob chalkash, shaxsiy pul bilan kompaniya puli aralashgan, foyda yoki zarar aniq emas." },
  { title: "Mijoz qimmatlashdi, foyda kamaydi", text: "Raqobat kuchaygan, bitta mijozni jalb qilish narxi oshmoqda, marja pasaymoqda." },
  { title: "Tadbirkor operatsion ishdan chiqa olmaydi", text: "Hamma ish egasiga bog'liq, biznesni raqamlar asosida boshqarishga vaqt qolmaydi." },
  { title: "AI haqida tasavvur yo'q", text: "Ko'pchilik sun'iy intellektni oddiy chat deb o'ylaydi yoki «mening biznesimga mos kelmaydi» deydi." },
];

export const DAY_PROGRAM: { time: string; title: string; text?: string; hl?: boolean }[] = [
  { time: "14:00", title: "Ochilish va tanishuv" },
  { time: "14:20", title: "Sun'iy intellekt: imkoniyatlar va bozor", text: "Nega AI bu shunchaki chat emas" },
  { time: "14:55", title: "Real biznes keyslar", text: "Video, CRM va ERP, sayt, mobil ilova va Telegram bot" },
  { time: "15:40", title: "AI'ga to'g'ri topshiriq berish", text: "Formula va o'z biznesingiz uchun mashq" },
  { time: "16:05", title: "Jonli demo: sahnada AI menejer", text: "Zaldagi tadbirkor biznesi uchun jonli yasaymiz" },
  { time: "16:35", title: "Coffee break" },
  { time: "16:55", title: "Amaliyot: har kim o'z AI xodimini yasaydi", text: "Sotuvchi, SMM yordamchi, HR yoki administrator", hl: true },
  { time: "17:35", title: "1 oylik «AI orqali biznesni tizimlashtirish» kursi taqdimoti" },
  { time: "17:55", title: "Bonus sovg'alar", text: "Dars oxirigacha o'tirgan ishtirokchilarga bonus beriladi", hl: true },
];
