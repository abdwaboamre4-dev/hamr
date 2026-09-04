/**
 * Centralized Configuration for Hamra Grills
 * مطاعم مشويات الحمراء
 * 
 * Single source of truth for restaurant information, contact numbers,
 * branch network (10 branches in Jeddah + 2 in Makkah), and location link.
 */

const restaurantConfig = {
  // Brand Names & Slogans
  nameAr: "مطاعم مشويات الحمراء",
  nameEn: "Hamra Grills",
  shortNameAr: "مشويات الحمراء",
  shortNameEn: "Hamra Grills",
  taglineAr: "متخصصون في مشاوي الجمعات والعزايم 🔥",
  taglineEn: "Specialists in Barbecue for Gatherings & Banquets 🔥",

  // Official Logo & Local Media
  logoUrl: "hamra-grills-images-assets/logo.jpg",
  heroImageUrl: "hamra-grills-images-assets/hero_mixed_grill.webp",

  // Official Contact Information (Single unified number)
  whatsappNumber: "201104689702", // International raw format without +
  phoneNumber: "01104689702",
  displayPhone: "01104689702",
  formattedPhone: "01104689702",
  whatsappUrl: "https://wa.me/201104689702",
  telUrl: "tel:01104689702",
  email: "info@hamragrills.com",

  // Official Main Location & Map Directions Link
  locationUrl: "https://tr.ee/u9SmzohT1j",
  googleMapsUrl: "https://tr.ee/u9SmzohT1j",

  // Ratings & Social Proof
  googleRating: 4.8,
  googleReviewsCount: 1850,

  // Currency
  currencyAr: "ر.س",
  currencyEn: "SAR",

  // Brand Pillars & Value Points
  brandHighlights: [
    {
      icon: "🔥",
      textAr: "متخصصون في مشاوي الجمعات والعزايم",
      textEn: "Specialists in BBQ for Gatherings & Banquets"
    },
    {
      icon: "✨",
      textAr: "تقديم فاخر يليق بذوقكم",
      textEn: "Luxurious Presentation Fitting Your Taste"
    },
    {
      icon: "📞",
      textAr: "للتواصل والطلب: 01104689702",
      textEn: "Contact & Order: 01104689702"
    },
    {
      icon: "🚗",
      textAr: "متوفر التوصيل داخل جدة ومكة المكرمة",
      textEn: "Delivery Available in Jeddah & Makkah"
    },
    {
      icon: "📍",
      textAr: "10 فروع في جدة وفرعين في مكة المكرمة",
      textEn: "10 Branches in Jeddah & 2 in Makkah"
    }
  ],

  // Delivery Settings (Jeddah & Makkah Coverage)
  delivery: {
    enabled: true,
    baseFee: 15,
    freeDeliveryThreshold: 250,
    estimatedTimeAr: "35 - 50 دقيقة",
    estimatedTimeEn: "35 - 50 mins",
    serviceAreas: [
      { id: "area-jeddah-all", nameAr: "جدة — جميع الأحياء (أبحر، السامر، الصفا، المرجان، وغيرها)", nameEn: "Jeddah — All Districts", fee: 15 },
      { id: "area-makkah-awali", nameAr: "مكة المكرمة — فرع العوالي والمناطق المحيطة", nameEn: "Makkah — Al-Awali & Surrounding", fee: 20 },
      { id: "area-makkah-zaidi", nameAr: "مكة المكرمة — فرع الزايدي والمناطق المحيطة", nameEn: "Makkah — Al-Zaidi & Surrounding", fee: 20 }
    ]
  },

  // Pickup Settings
  pickup: {
    enabled: true,
    estimatedTimeAr: "15 - 25 دقيقة",
    estimatedTimeEn: "15 - 25 mins"
  },

  // Reservation Settings
  reservations: {
    enabled: true,
    minPartySize: 1,
    maxPartySize: 30,
    timeSlots: [
      "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
      "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM",
      "11:00 PM", "12:00 AM", "01:00 AM"
    ],
    sections: [
      { id: "families", nameAr: "قسم العوائل (خصوصية تامة)", nameEn: "Family Section (Private)" },
      { id: "singles", nameAr: "قسم الأفراد", nameEn: "Singles Section" },
      { id: "outdoor", nameAr: "الجلسات الخارجية", nameEn: "Outdoor Terrace" }
    ]
  },

  // Branch Network Hierarchy (10 branches in Jeddah + 2 in Makkah)
  networkSummary: {
    titleAr: "10 فروع في جدة + فرعين في مكة المكرمة",
    titleEn: "10 Branches in Jeddah + 2 Branches in Makkah",
    jeddahCount: 10,
    makkahCount: 2,
    totalBranches: 12
  },

  // Branches
  branches: [
    {
      id: "obhur-branch",
      nameAr: "مطاعم مشويات الحمراء فرع ابحر · Jeddah",
      nameEn: "Hamra Grills - Obhur Branch · Jeddah",
      isMain: true,
      city: "jeddah",
      cityNameAr: "جدة",
      cityNameEn: "Jeddah",
      badgeAr: "الفرع الرئيسي",
      badgeEn: "Main Branch",
      addressAr: "فرع ابحر، جدة، المملكة العربية السعودية",
      addressEn: "Obhur Branch, Jeddah, Saudi Arabia",
      googleMapsUrl: "https://tr.ee/u9SmzohT1j",
      phone: "01104689702",
      formattedPhone: "01104689702",
      whatsapp: "201104689702",
      workingHours: {
        satWed: "01:00 ظهراً – 02:00 بعد منتصف الليل",
        thuFri: "01:00 ظهراً – 02:00 بعد منتصف الليل",
        satWedEn: "01:00 PM – 02:00 AM",
        thuFriEn: "01:00 PM – 02:00 AM"
      }
    },
    {
      id: "samar-branch",
      nameAr: "فرع السامر",
      nameEn: "Al-Samar Branch",
      isMain: false,
      city: "jeddah",
      cityNameAr: "جدة",
      cityNameEn: "Jeddah",
      phone: "01104689702",
      whatsapp: "201104689702"
    },
    {
      id: "haramain-branch",
      nameAr: "فرع الحرمين",
      nameEn: "Al-Haramain Branch",
      isMain: false,
      city: "jeddah",
      cityNameAr: "جدة",
      cityNameEn: "Jeddah",
      phone: "01104689702",
      whatsapp: "201104689702"
    },
    {
      id: "hamdaniyah-branch",
      nameAr: "فرع الحمدانية",
      nameEn: "Al-Hamdaniyah Branch",
      isMain: false,
      city: "jeddah",
      cityNameAr: "جدة",
      cityNameEn: "Jeddah",
      phone: "01104689702",
      whatsapp: "201104689702"
    },
    {
      id: "safa-branch",
      nameAr: "فرع الصفا",
      nameEn: "Al-Safa Branch",
      isMain: false,
      city: "jeddah",
      cityNameAr: "جدة",
      cityNameEn: "Jeddah",
      phone: "01104689702",
      whatsapp: "201104689702"
    },
    {
      id: "murjan-branch",
      nameAr: "فرع المرجان",
      nameEn: "Al-Murjan Branch",
      isMain: false,
      city: "jeddah",
      cityNameAr: "جدة",
      cityNameEn: "Jeddah",
      phone: "01104689702",
      whatsapp: "201104689702"
    },
    {
      id: "awali-branch",
      nameAr: "فرع العوالي",
      nameEn: "Al-Awali Branch",
      isMain: false,
      city: "makkah",
      cityNameAr: "مكة المكرمة",
      cityNameEn: "Makkah",
      phone: "01104689702",
      whatsapp: "201104689702"
    },
    {
      id: "zaidi-branch",
      nameAr: "فرع الزايدي",
      nameEn: "Al-Zaidi Branch",
      isMain: false,
      city: "makkah",
      cityNameAr: "مكة المكرمة",
      cityNameEn: "Makkah",
      phone: "01104689702",
      whatsapp: "201104689702"
    }
  ],

  // Google Reviews
  reviews: [
    {
      id: "rev-1",
      rating: 5,
      author: "سلطان العتيبي",
      authorEn: "Sultan Al-Otaibi",
      text: "مشاوي على أصولها! كباب اللحم طري وتتبيلته موزونة جداً، ووجبة التوفير العائلي خيار ممتاز للجمعات. التوصيل في جدة وصل حار وسريع.",
      textEn: "Authentic charcoal grills! The lamb kebab was so tender and well-seasoned. The family meal is unbeatable for gatherings. Piping hot delivery in Jeddah.",
      date: "منذ أسبوع",
      dateEn: "1 week ago",
      source: "Google"
    },
    {
      id: "rev-2",
      rating: 5,
      author: "نورة الدوسري",
      authorEn: "Noura Al-Dossari",
      text: "كباب الخشخاش وطاجن اللحم لذيذين جداً! تقديم فاخر يليق بالضيوف والخدمة في فرع ابحر ممتازة.",
      textEn: "The Khashkhash kebab and meat casseroles are outstanding! Luxurious presentation fitting for guests and top-tier service at Obhur branch.",
      date: "منذ أسبوعين",
      dateEn: "2 weeks ago",
      source: "Google"
    },
    {
      id: "rev-3",
      rating: 5,
      author: "خالد الشهري",
      authorEn: "Khaled Al-Shehri",
      text: "متخصصون في مشاوي الجمعات والعزايم بحق، طلبت صينية مشويات مشكلة لعزيمة عائلية، بيّضوا الوجه جودة وطعم وكمية تكفي وتزيد.",
      textEn: "Truly specialists in barbecue for gatherings and banquets. Ordered mixed grill platters for our family event—exquisite quality and generous portions.",
      date: "منذ 3 أسابيع",
      dateEn: "3 weeks ago",
      source: "Google"
    }
  ],

  // Social Links
  socials: {
    instagram: "https://instagram.com/hamragrills",
    twitter: "https://x.com/hamragrills",
    tiktok: "https://tiktok.com/@hamragrills"
  }
};

// Export to global scope
if (typeof window !== "undefined") {
  window.restaurantConfig = restaurantConfig;
}
