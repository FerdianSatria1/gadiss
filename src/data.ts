import { GirlProfile, GiftItem, DatingPackage, FakeReview } from "./types";

export const GIRL_PROFILES: GirlProfile[] = [
  {
    id: "g1",
    name: "Amanda Skena",
    age: 22,
    avatar: "bg-emerald-500",
    mood: "Skena Jaksel Overthinker",
    description: "Selalu bawa tumbler besar, kalau bicara campur aduk 'literally', 'basically', 'which is'. Kolektor piringan hitam band indie indie lokal & pecinta kopi charcoal Blok M.",
    pricePerDay: 450000,
    stats: { charm: 88, chillRate: 40, patience: 60, demands: 75 },
    catchphrases: ["Which is kan ya gitu...", "Basically ya kita se-vibe sih", "Kamu dengerin band ini ga? Relate parah."],
    hobbies: ["Vinyl hunting", "Ngopi kopi arang", "Nonton gig di Melawai"],
    likes: ["Kopi susu oats", "Sepatu Docmart", "Kaos band oversized"],
    dislikes: ["Musik koplo jedag-jedug", "Kemacetan Margonda", "Minuman manis boba franchised"]
  },
  {
    id: "g2",
    name: "Yuki Kawaii",
    age: 20,
    avatar: "bg-rose-400",
    mood: "Wibu Akut Gacor",
    description: "Cosplayer hobi gacha game, sering nambah 'UwU' dan manggil dengan sebutan 'Onii-chan/Anata'. Terobsesi ramen extra pedas & benci orang normis.",
    pricePerDay: 350000,
    stats: { charm: 95, chillRate: 70, patience: 85, demands: 50 },
    catchphrases: ["Yamete kudasai, b-baka!", "Okaeri Onii-chan! UwU", "Wibu gak bau bawang kok senpai!"],
    hobbies: ["Cosplay", "Mabar game gacha", "Melihat poster husbando"],
    likes: ["Ramen kuah pedas", "Pocky Stroberi", "Event animax"],
    dislikes: ["Normis gak asik", "Diajak lari pagi dilarang pegang HP", "Spoiler anime"]
  },
  {
    id: "g3",
    name: "Siska Ambyar",
    age: 24,
    avatar: "bg-amber-500",
    mood: "Melankolis Overthinking",
    description: "Pendengar setia lagu-lagu sedih & galau Nusantara. Memiliki kecenderungan menganalisis letak spasi chat dari pacar sewaan secara mendalam.",
    pricePerDay: 280000,
    stats: { charm: 82, chillRate: 30, patience: 95, demands: 40 },
    catchphrases: ["Kenapa chat-mu ga pake emotikon?", "Apakah besok kamu masih ingat namaku?", "Duh aku denger lagu ambyar lagi..."],
    hobbies: ["Nangis pas denger lagu Jawa koplo", "Menulis puisi galau di X/Twitter", "Bengong nikmatin senja"],
    likes: ["Teh anget manis", "Nasi kucing", "Bakso kuah pedes pas ujan"],
    dislikes: ["Selingkuh virtual", "Pria tidak peka", "Ditinggal tidur tanpa info 'good night'"]
  },
  {
    id: "g4",
    name: "Clara Glamour",
    age: 23,
    avatar: "bg-indigo-500",
    mood: "Matre Berkelas (Glam)",
    description: "Hobinya nongkrong di mall elit, ga mau diajak kencan pakai motor bebek kecuali motor gede 1000cc. Rating demands sangat tinggi, tapii pesonanya luar biasa.",
    pricePerDay: 990000,
    stats: { charm: 99, chillRate: 15, patience: 20, demands: 99 },
    catchphrases: ["Eh mampir ke butik itu bentar ya, lucu deh", "Masa kencan pertama ga bawain aku bouquet uang?", "No money no honey beb."],
    hobbies: ["Window shopping barang branded", "Spa kecantikan", "OOTD di Senayan City"],
    likes: ["Bouquet uang tunai", "Kartu kredit platinum", "Restoran fine dining"],
    dislikes: ["Kembalian receh logam", "Makan dipinggir jalan kena asep kopaja", "Diskonan baju rombeng"]
  },
  {
    id: "g5",
    name: "Rani Pemarah",
    age: 21,
    avatar: "bg-red-500",
    mood: "Savage Galak Sayang",
    description: "Galak luar biasa, gampang ngambek & sering marah-marah. Namun dibalik itu, dia sangat perhatian; tipe tsundere tertinggi yang bakal masakin mie instan pas kamu kelaparan.",
    pricePerDay: 400000,
    stats: { charm: 90, chillRate: 10, patience: 10, demands: 80 },
    catchphrases: ["HEH dibilangin jangan ngerokok malah ngeyel!", "Ngapain liat-liat cewe lain hah?!", "Cepetan habisin nasinya, cerewet lu!"],
    hobbies: ["Ngoceh berjam-jam", "Tinju samsak", "Nonton drakor thriller"],
    likes: ["Nasi goreng pedes buatan sendiri", "Dibelikan seblak mercon", "Dipeluk pas lagi ngambek"],
    dislikes: ["Pria lambat/lelet", "Cowok bohong", "Es teh tawar anget (ga konsisten katanya)"]
  },
  {
    id: "g6",
    name: "Fitri Anak Kosan",
    age: 19,
    avatar: "bg-sky-500",
    mood: "Hemat Sederhana Pol",
    description: "Mahasiswi rantau super praktis. Ga neko-neko, diajak makan bubur ayam pinggir jalan udah seneng banget. Ahli menghemat gas melon 3kg.",
    pricePerDay: 150000,
    stats: { charm: 78, chillRate: 90, patience: 90, demands: 10 },
    catchphrases: ["Sini bagi dua mie instannya biar irit gas!", "Gak usah naik taksi mas, numpang truk aja free", "Simpen aja uangnya buat bayar UKT mas."],
    hobbies: ["Berburu diskon Shopee", "Nyamuk hunting di kosan", "Tidur siang hemat energi"],
    likes: ["Promo buy 1 get 1", "Sisa nasi kemarin digoreng", "WiFi gratisan McD"],
    dislikes: ["Parkir liar bayar 5 ribu", "Kafe estetik overpriced", "Toko kelontong ga ada kembalian jajan"]
  }
];

export const DATING_PACKAGES: DatingPackage[] = [
  {
    id: "pkg1",
    name: "Paket Nobar Estetik Blok M",
    description: "Dating keliling Blok M dengerin piringan hitam, jajan kopi arang, trus sok-sok diskusi filsafat kehidupan.",
    durationCostMultiplier: 1.0,
    perDatingPointBonuses: 15
  },
  {
    id: "pkg2",
    name: "Paket Satnight Seblak Mercon",
    description: "Kencan sederhana di pinggir trotoar sambil kepedesan makan seblak level 10. Cocok buat yang mau uji nyali lambung.",
    durationCostMultiplier: 1.2,
    perDatingPointBonuses: 20
  },
  {
    id: "pkg3",
    name: "Paket Halu Mewah VIP PP",
    description: "Kencan keliling butik branded di mall megah sambil membicarakan masa depan investasi bodong berdua.",
    durationCostMultiplier: 2.5,
    perDatingPointBonuses: 45
  },
  {
    id: "pkg4",
    name: "Paket Mabar Genshin/ML Malam Minggu",
    description: "Kencan hemat rebahan di discord mabar sambil teriak-teriak kena ganking musuh offline malam minggu.",
    durationCostMultiplier: 0.8,
    perDatingPointBonuses: 10
  }
];

export const GIFT_ITEMS: GiftItem[] = [
  {
    id: "gift1",
    name: "Seblak Mercon Level 50",
    icon: "🌶️",
    cost: 15000,
    description: "Seblak panas dengan kuah merah membara yang sanggup merontokkan dinding lambung.",
    affectionBonus: 10,
    funnyReply: "Duh gila mas! Pedesnya langsung menusuk sanubari, aku suka banget tapi besok ijin ga masuk ya mules wkwk."
  },
  {
    id: "gift2",
    name: "Kopi Susu Oats Skena",
    icon: "☕",
    cost: 45000,
    description: "Kopi dengan susu gandum mahal yang rasanya hambar tapi estetik buat story Instagram.",
    affectionBonus: 15,
    funnyReply: "Oh my god thank you! Literally ini kopsus favorit aku, which is bikin makin betah kencan online sama kamu."
  },
  {
    id: "gift3",
    name: "Tas Hermes KW Super Ciledug",
    icon: "👜",
    cost: 125000,
    description: "Tas mewah tiruan bersertifikat fiktif yang jahitan pinggirnya agak melenceng sedikit.",
    affectionBonus: 25,
    funnyReply: "OMG beb gilaaa! Kulit jeruknya mirip banget aslinya! Temen-temen arisan ku ga bakal sadar nih!"
  },
  {
    id: "gift4",
    name: "Bouquet Uang Mainan Monopoli",
    icon: "💐",
    cost: 80000,
    description: "Kumpulan lembaran uang pink, merah, hijau yang kelihatannya tebal tapi gambarnya bapak berkumis.",
    affectionBonus: 35,
    funnyReply: "Ih tebel banget bunganya beb! Pas aku liat rupiahnya kok ada logo Monopoli-nya?! Tapi gapapa, niatnya aku hargai wkwk."
  },
  {
    id: "gift5",
    name: "Mie Instan Dobel Telor Dadar",
    icon: "🍜",
    cost: 12000,
    description: "Makanan penyelamat akhir bulan yang wanginya menyebar ke seluruh penjuru mata angin.",
    affectionBonus: 20,
    funnyReply: "Aaaah penyelamat hidup ku! Nasi kosanku udah abis dari kemarin, mas ganteng banget deh bawain ginian!"
  },
  {
    id: "gift6",
    name: "Sertifikat Bintang di Langit fiktif",
    icon: "🌟",
    cost: 250000,
    description: "Sertifikat resmi bahwa ada satu bintang kecil di galaksi bima sakti yang dinamai atas nama dia.",
    affectionBonus: 50,
    funnyReply: "Halu parah sumpah! Tapi kok so sweet beneran... Aku pajang di profil WA ya mas!"
  }
];

export const FAKE_REVIEWS: FakeReview[] = [
  {
    id: "rev1",
    author: "Budi Jomblo",
    age: 23,
    rating: 5,
    reviewText: "Sewa Amanda Skena kemaren seru bgt. Sepanjang jalan diajak bahas piringan hitam walau saya cuma manggut-manggut padahal aslinya dengerin koplo. Dompet halu terkuras tapi hati gembira.",
    girlName: "Amanda Skena",
    hilariousOutcome: "Budi akhirnya kecanduan kopi charcoal dan sekarang bicaranya dicampur 'Which is'."
  },
  {
    id: "rev2",
    author: "Anto Wibu",
    age: 21,
    rating: 4,
    reviewText: "Yuki Kawaii pinter bgt impersonate anime. Diajak makan ramen dia teriak 'Oishii Onii-chan' kenceng bgt sampe pengunjung warung sebelah ngeliatin semua. Malu tapi ketagihan sih wkwk.",
    girlName: "Yuki Kawaii",
    hilariousOutcome: "Anto sukses gacha SSR malamnya berkat berkah doa sewa Yuki."
  },
  {
    id: "rev3",
    author: "Joko Setiawan",
    age: 27,
    rating: 2,
    reviewText: "Nyoba sewa Clara Glamour, dompet virtual langsung kosong melompong dipalak beli tas impor fiktif. Tapi dia senyum dikit aja saya langsung maafin semuanya... ampun bener dah pesonanya.",
    girlName: "Clara Glamour",
    hilariousOutcome: "Joko sekarang kerja lembur fiktif 24 jam demi bayar cicilan sewa Clara."
  },
  {
    id: "rev4",
    author: "Indra Galau",
    age: 25,
    rating: 5,
    reviewText: "Sewa Rani Pemarah beneran seru gila, pas kencan saya malah dimarahin gara-gara pake sendal jepit ke mall. Tapi pas pulang tiba-tiba dapet chat 'awas ya kalo ga mimpiin gw tar gw tabok', tsundere abis!",
    girlName: "Rani Pemarah",
    hilariousOutcome: "Indra sekarang gemetar bahagia setiap kali mendengar ucapan bernada tinggi."
  }
];
