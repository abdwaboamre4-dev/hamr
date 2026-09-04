/**
 * Hamra Grills - Centralized Menu Catalog
 * مطاعم مشويات الحمراء
 * 
 * Contains all 8 core categories with exact caloric values, pricing,
 * customizable variants (single & multiple modifiers), descriptions, and image mappings.
 */

const MENU_CATEGORIES = [
  { id: "family-meals", icon: "fa-users-roof", name_ar: "مشاوي العائلة", name_en: "Family Grills" },
  { id: "grills-kebabs", icon: "fa-fire-burner", name_ar: "المشاوي والكباب", name_en: "Grills & Kebabs" },
  { id: "casseroles-seafood", icon: "fa-bowl-rice", name_ar: "الطواجن والبحريات", name_en: "Casseroles & Seafood" },
  { id: "appetizers-salads", icon: "fa-leaf", name_ar: "المقبلات والسلطات", name_en: "Appetizers & Salads" },
  { id: "sandwiches", icon: "fa-burger", name_ar: "الساندويتشات", name_en: "Sandwiches" },
  { id: "sides", icon: "fa-plus-circle", name_ar: "الإضافات", name_en: "Sides & Extras" },
  { id: "desserts", icon: "fa-ice-cream", name_ar: "الحلى", name_en: "Desserts" },
  { id: "drinks", icon: "fa-bottle-water", name_en: "Drinks", name_ar: "المشروبات" }
];

const MENU_ITEMS = [
  // =========================================================================
  // 1. مشاوي العائلة (Family Grills & Signature Trays)
  // =========================================================================
  {
    id: "family-saving-meal",
    category: "family-meals",
    name_ar: "وجبة التوفير العائلي",
    name_en: "Family Value Meal",
    description_ar: "10 أسياخ مشاوي مشكلة + 3 نفر رز مبهر فاخر + مقبلات الشيف الخاصة + مكرونة بشاميل غنية باللحم المفروم. الخيار الأمثل للمة العائلة.",
    description_en: "10 mixed grill skewers + 3 portions of spiced golden rice + chef's signature appetizers + rich homemade beef bechamel pasta.",
    calories: 3450,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 159,
    popular: true,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "نوع اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج فقط", label_en: "Chicken Only", price: 159 },
          { id: "mixed", label_ar: "مشكل (لحم ودجاج)", label_en: "Mixed (Beef & Chicken)", price: 164 },
          { id: "meat", label_ar: "لحم فقط (نعيمي طازج)", label_en: "Fresh Beef/Lamb Only", price: 169 }
        ]
      },
      {
        id: "extras",
        name_ar: "إضافات مع الوجبة",
        name_en: "Meal Add-ons",
        type: "multiple",
        required: false,
        values: [
          { id: "extra-rice", label_ar: "نفر أرز إضافي", label_en: "Extra Rice Portion", priceDelta: 6 },
          { id: "extra-sauces", label_ar: "تشكيلة صوصات خاصة (طحينة + ثوم + حار)", label_en: "Assorted Sauces Trio", priceDelta: 5 },
          { id: "pepsi-family", label_ar: "بيبسي عائلي 2.25 لتر", label_en: "Family Pepsi 2.25L", priceDelta: 12 }
        ]
      }
    ]
  },
  {
    id: "hospitality-meal",
    category: "family-meals",
    name_ar: "وجبة الضيافة",
    name_en: "Hospitality Feast",
    description_ar: "15 سيخ مشاوي مشكلة فاخرة + 3 نفر رز + 2 طبق مقبلات الشيف المشكلة + صينية مكرونة بشاميل. تليق بضيوفك الكرام.",
    description_en: "15 premium mixed grill skewers + 3 portions spiced rice + 2 chef appetizer platters + beef bechamel pasta tray.",
    calories: 4680,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 209,
    popular: true,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "نوع اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج فاخر", label_en: "Chicken Only", price: 209 },
          { id: "mixed", label_ar: "مشكل (لحم ودجاج)", label_en: "Mixed (Beef & Chicken)", price: 215 },
          { id: "meat", label_ar: "لحم فقط", label_en: "Meat Only", price: 224 }
        ]
      }
    ]
  },
  {
    id: "super-giant-grill-meal",
    category: "family-meals",
    name_ar: "وجبة المشويات سوبر العملاقة",
    name_en: "Super Giant Grill Feast",
    description_ar: "20 سيخ مشاوي مشكلة + 3 نفر رز + 2 مقبلات الشيف + 2 مكرونة بشاميل بالفرن. وجبة عملاقة تكفي الجمعات الكبيرة.",
    description_en: "20 mixed grill skewers + 3 portions rice + 2 chef appetizers + 2 baked bechamel trays. Giant feast for large gatherings.",
    calories: 6200,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 284,
    popular: true,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "نوع اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج", label_en: "Chicken Only", price: 284 },
          { id: "mixed", label_ar: "مشكل (لحم ودجاج)", label_en: "Mixed", price: 294 },
          { id: "meat", label_ar: "لحم طازج", label_en: "Fresh Meat Only", price: 299 }
        ]
      }
    ]
  },
  {
    id: "tray-small-no-rice",
    category: "family-meals",
    name_ar: "صينية الحمراء صغير — 10 أسياخ بدون رز",
    name_en: "Hamra Tray Small — 10 Skewers (No Rice)",
    description_ar: "صينية مشاوي مشوية على الفحم تضم 10 أسياخ طازجة بدون أرز، تقدم مع خبز طازج وبصل مشوي وبقدونس وسماق.",
    description_en: "10 charcoal-grilled fresh skewers without rice, served with fresh bread, grilled onions, parsley, and sumac.",
    calories: 1950,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 124,
    popular: false,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "اختيار اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج — 124 ر.س", label_en: "Chicken — 124 SAR", price: 124 },
          { id: "mixed", label_ar: "مشكل — 129 ر.س", label_en: "Mixed — 129 SAR", price: 129 },
          { id: "meat", label_ar: "لحم — 134 ر.س", label_en: "Meat — 134 SAR", price: 134 }
        ]
      }
    ]
  },
  {
    id: "tray-small-with-rice",
    category: "family-meals",
    name_ar: "صينية الحمراء صغير — 10 أسياخ مع رز",
    name_en: "Hamra Tray Small — 10 Skewers (With Rice)",
    description_ar: "صينية مشاوي مشوية على الفحم تضم 10 أسياخ مع تشكيلة أرز مطهو بعناية وتتبيلة الحمراء الخاصة.",
    description_en: "10 fresh charcoal-grilled skewers layered on fragrant seasoned rice.",
    calories: 2550,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 134,
    popular: false,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "اختيار اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج — 134 ر.س", label_en: "Chicken — 134 SAR", price: 134 },
          { id: "mixed", label_ar: "مشكل — 139 ر.س", label_en: "Mixed — 139 SAR", price: 139 },
          { id: "meat", label_ar: "لحم — 144 ر.س", label_en: "Meat — 144 SAR", price: 144 }
        ]
      }
    ]
  },
  {
    id: "tray-medium-with-rice",
    category: "family-meals",
    name_ar: "صينية الحمراء وسط — 15 سيخ مع رز",
    name_en: "Hamra Tray Medium — 15 Skewers (With Rice)",
    description_ar: "15 سيخ مشاوي غنية بالنكهة مع أرز الحمراء المبهر تكفي 4 إلى 5 أشخاص.",
    description_en: "15 skewers on aromatic seasoned rice, perfect for 4-5 persons.",
    calories: 3750,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 179,
    popular: true,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "اختيار اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج — 179 ر.س", label_en: "Chicken — 179 SAR", price: 179 },
          { id: "mixed", label_ar: "مشكل — 184 ر.س", label_en: "Mixed — 184 SAR", price: 184 },
          { id: "meat", label_ar: "لحم — 189 ر.س", label_en: "Meat — 189 SAR", price: 189 }
        ]
      }
    ]
  },
  {
    id: "tray-large-with-rice",
    category: "family-meals",
    name_ar: "صينية الحمراء كبير — 20 سيخ مع رز",
    name_en: "Hamra Tray Large — 20 Skewers (With Rice)",
    description_ar: "20 سيخ من أجود أنواع اللحوم والدجاج المشوي على الفحم مع صينية رز عائلية.",
    description_en: "20 charcoal-grilled skewers on a large family rice platter.",
    calories: 4900,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 229,
    popular: false,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "اختيار اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج — 229 ر.س", label_en: "Chicken — 229 SAR", price: 229 },
          { id: "mixed", label_ar: "مشكل — 239 ر.س", label_en: "Mixed — 239 SAR", price: 239 },
          { id: "meat", label_ar: "لحم — 249 ر.س", label_en: "Meat — 249 SAR", price: 249 }
        ]
      }
    ]
  },
  {
    id: "tray-super-with-rice",
    category: "family-meals",
    name_ar: "صينية الحمراء سوبر — 25 سيخ مع رز",
    name_en: "Hamra Tray Super — 25 Skewers (With Rice)",
    description_ar: "الصينية الملكية الأكبر: 25 سيخ مشاوي مع كمية وفيرة من الأرز المبهر، مقبلات وسلطات خضراء.",
    description_en: "The royal feast: 25 premium skewers with a huge bed of fragrant rice and garnish.",
    calories: 6150,
    image: "hamra-grills-images-assets/hero_mixed_grill.webp",
    basePrice: 259,
    popular: true,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "اختيار اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج — 259 ر.س", label_en: "Chicken — 259 SAR", price: 259 },
          { id: "mixed", label_ar: "مشكل — 269 ر.س", label_en: "Mixed — 269 SAR", price: 269 },
          { id: "meat", label_ar: "لحم — 279 ر.س", label_en: "Meat — 279 SAR", price: 279 }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. المشاوي والكباب (Grills & Kebabs)
  // =========================================================================
  {
    id: "kebab-meat",
    category: "grills-kebabs",
    name_ar: "كباب لحم",
    name_en: "Beef / Lamb Kebab",
    description_ar: "كباب لحم طازج مفروم مع التوابل النجدية الأصيلة وشحم اللية الطبيعي، مشوي بعناية على الجمر.",
    description_en: "Fresh minced meat blended with traditional spices and charcoal grilled to juicy perfection.",
    calories: 1029,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 29,
    popular: true,
    available: true,
    options: [
      {
        id: "size",
        name_ar: "الحجم والكمية",
        name_en: "Portion & Size",
        type: "single",
        required: true,
        values: [
          { id: "2-skewers", label_ar: "2 أسياخ (240g)", label_en: "2 Skewers (240g)", price: 29 },
          { id: "3-skewers", label_ar: "3 أسياخ (360g)", label_en: "3 Skewers (360g)", price: 39 },
          { id: "half-kg", label_ar: "نصف كيلو (600g)", label_en: "Half Kilo (600g)", price: 68 },
          { id: "1-kg", label_ar: "1 كيلو (1200g)", label_en: "1 Kilogram (1200g)", price: 134 }
        ]
      },
      {
        id: "rice-option",
        name_ar: "الأرز",
        name_en: "Rice Option",
        type: "single",
        required: false,
        values: [
          { id: "no-rice", label_ar: "بدون رز (مع خبز طازج)", label_en: "No Rice (With fresh bread)", priceDelta: 0 },
          { id: "with-rice", label_ar: "مع صحن رز مبهر (+6 ر.س)", label_en: "With Spiced Rice (+6 SAR)", priceDelta: 6 }
        ]
      }
    ]
  },
  {
    id: "kebab-chicken",
    category: "grills-kebabs",
    name_ar: "كباب دجاج",
    name_en: "Chicken Kebab",
    description_ar: "صدور وأوراك دجاج طازجة متبلة بالليمون والزعفران والبهارات الخاصة، مشوية بلون ذهبي شهي.",
    description_en: "Tender chicken fillets minced and marinated with saffron, lemon, and aromatic spices.",
    calories: 1015,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 26,
    popular: true,
    available: true,
    options: [
      {
        id: "size",
        name_ar: "الحجم والكمية",
        name_en: "Portion & Size",
        type: "single",
        required: true,
        values: [
          { id: "2-skewers", label_ar: "2 أسياخ (240g)", label_en: "2 Skewers (240g)", price: 26 },
          { id: "3-skewers", label_ar: "3 أسياخ (360g)", label_en: "3 Skewers (360g)", price: 29 },
          { id: "half-kg", label_ar: "نصف كيلو (600g)", label_en: "Half Kilo (600g)", price: 63 },
          { id: "1-kg", label_ar: "1 كيلو (1200g)", label_en: "1 Kilogram (1200g)", price: 124 }
        ]
      },
      {
        id: "rice-option",
        name_ar: "الأرز",
        name_en: "Rice Option",
        type: "single",
        required: false,
        values: [
          { id: "no-rice", label_ar: "بدون رز", label_en: "No Rice", priceDelta: 0 },
          { id: "with-rice", label_ar: "مع رز مبهر (+6 ر.س)", label_en: "With Spiced Rice (+6 SAR)", priceDelta: 6 }
        ]
      }
    ]
  },
  {
    id: "mushakkal-hamra",
    category: "grills-kebabs",
    name_ar: "مشكل الحمراء (6 أسياخ)",
    name_en: "Hamra Mixed Grill (6 Skewers)",
    description_ar: "تشكيلة من كباب اللحم، كباب الدجاج، وأوصال الشواء الفاخرة (720g) مشوية على الفحم مع الطماطم والفلفل.",
    description_en: "Signature platter of 6 skewers (720g) featuring lamb kebab, chicken kebab, and skewers with grilled garnish.",
    calories: 2940,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 65,
    popular: true,
    available: true,
    options: [
      {
        id: "type",
        name_ar: "نوع المشكل",
        name_en: "Platter Variety",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج (65 ر.س)", label_en: "Chicken (65 SAR)", price: 65 },
          { id: "mixed", label_ar: "مشكل مشويات (69 ر.س)", label_en: "Mixed Grills (69 SAR)", price: 69 },
          { id: "meat", label_ar: "لحم (75 ر.س)", label_en: "Meat (75 SAR)", price: 75 }
        ]
      }
    ]
  },
  {
    id: "mushakkal-chef",
    category: "grills-kebabs",
    name_ar: "مشكل الشيف (4 أسياخ)",
    name_en: "Chef's Special Mix (4 Skewers)",
    description_ar: "4 أسياخ مشوية وموزونة (480g) تجمع بين الكباب والأوصال بتتبيلة الشيف السرية.",
    description_en: "4 balanced skewers (480g) combining succulent kebabs and cubes with chef's secret rub.",
    calories: 1960,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 43,
    popular: false,
    available: true,
    options: [
      {
        id: "type",
        name_ar: "نوع المشكل",
        name_en: "Platter Variety",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج (43 ر.س)", label_en: "Chicken (43 SAR)", price: 43 },
          { id: "mixed", label_ar: "مشكل (48 ر.س)", label_en: "Mixed (48 SAR)", price: 48 },
          { id: "meat", label_ar: "لحم (52 ر.س)", label_en: "Meat (52 SAR)", price: 52 }
        ]
      }
    ]
  },
  {
    id: "kebab-khashkhash",
    category: "grills-kebabs",
    name_ar: "كباب خشخاش",
    name_en: "Khashkhash Kebab",
    description_ar: "أسياخ كباب مشوية مغمورة بصلصة الطماطم المشوية والثوم الحار والبقدونس ودبس الرمان.",
    description_en: "Charcoal skewers bathed in crushed roasted tomatoes, garlic, parsley, and tangy pomegranate glaze.",
    calories: 1129,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 28,
    popular: false,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "نوع الكباب",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج (28 ر.س)", label_en: "Chicken (28 SAR)", price: 28 },
          { id: "meat", label_ar: "لحم (32 ر.س)", label_en: "Meat (32 SAR)", price: 32 }
        ]
      }
    ]
  },
  {
    id: "charcoal-chicken",
    category: "grills-kebabs",
    name_ar: "دجاج على الفحم",
    name_en: "Charcoal Grilled Chicken",
    description_ar: "دجاج محلي طازج متبل ببهارات الحمراء ومشوي ببطء على الجمر حتى يكتسب القرمشة والطراوة.",
    description_en: "Fresh local chicken seasoned with house rub and slow grilled over glowing charcoal.",
    calories: 156,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 16,
    popular: true,
    available: true,
    options: [
      {
        id: "portion",
        name_ar: "الحجم",
        name_en: "Portion",
        type: "single",
        required: true,
        values: [
          { id: "half", label_ar: "نصف حبة (16 ر.س)", label_en: "Half Chicken (16 SAR)", price: 16 },
          { id: "full", label_ar: "حبة كاملة (32 ر.س)", label_en: "Whole Chicken (32 SAR)", price: 32 }
        ]
      },
      {
        id: "rice",
        name_ar: "الأرز",
        name_en: "Rice",
        type: "single",
        required: false,
        values: [
          { id: "no-rice", label_ar: "بدون رز", label_en: "No Rice", priceDelta: 0 },
          { id: "with-rice", label_ar: "مع رز مبهر (+6 ر.س)", label_en: "With Spiced Rice (+6 SAR)", priceDelta: 6 }
        ]
      }
    ]
  },
  {
    id: "lamb-chops",
    category: "grills-kebabs",
    name_ar: "ريش غنم طازجة",
    name_en: "Fresh Lamb Chops",
    description_ar: "ريش نعيمي بلدي طازجة متبلة بالبهارات النجدية وزيت الزيتون، مشوية حتى الذوبان.",
    description_en: "Fresh tender local lamb chops grilled on glowing charcoal to melt-in-mouth perfection.",
    calories: 756,
    image: "hamra-grills-images-assets/lamb_kebab_skewers.webp",
    basePrice: 64,
    popular: true,
    available: true,
    options: []
  },

  // =========================================================================
  // 3. الطواجن والبحريات (Casseroles & Seafood)
  // =========================================================================
  {
    id: "tagine-mexican-spicy",
    category: "casseroles-seafood",
    name_ar: "طاجن مكسيكي حار",
    name_en: "Spicy Mexican Tagine",
    description_ar: "طاجن فخار ساخن من الفرن مع الفلفل المكسيكي، الخضار الطازجة، والجبن الذائب وصلصة الطماطم الحارة.",
    description_en: "Sizzling clay tagine with peppers, onions, melted cheese, and piquant Mexican spiced sauce.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 35,
    popular: true,
    available: true,
    options: [
      {
        id: "filling",
        name_ar: "اللحم أو الدجاج",
        name_en: "Protein Choice",
        type: "single",
        required: true,
        values: [
          { id: "meat", label_ar: "لحم (35 ر.س)", label_en: "Meat (35 SAR)", price: 35 },
          { id: "chicken", label_ar: "دجاج (35 ر.س)", label_en: "Chicken (35 SAR)", price: 35 }
        ]
      }
    ]
  },
  {
    id: "tagine-tahini",
    category: "casseroles-seafood",
    name_ar: "طاجن بالطحينية",
    name_en: "Tahini Casserole Tagine",
    description_ar: "طاجن بالفرن مطهو بصلصة الطحينة الملكية وعصير الليمون وزيت الزيتون مع الصنوبر المحمص.",
    description_en: "Rich oven-baked tagine smothered in velvety tahini lemon sauce and roasted pine nuts.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 34,
    popular: true,
    available: true,
    options: [
      {
        id: "filling",
        name_ar: "اللحم أو الدجاج",
        name_en: "Protein Choice",
        type: "single",
        required: true,
        values: [
          { id: "meat", label_ar: "لحم (34 ر.س)", label_en: "Meat (34 SAR)", price: 34 },
          { id: "chicken", label_ar: "دجاج (34 ر.س)", label_en: "Chicken (34 SAR)", price: 34 }
        ]
      }
    ]
  },
  {
    id: "tagine-cream",
    category: "casseroles-seafood",
    name_ar: "طاجن بالكريمة",
    name_en: "Creamy Tagine",
    description_ar: "طاجن غني بكريمة الطبخ الفاخرة والمشروم وجبن الموزاريلا المحمر في الفرن.",
    description_en: "Decadent casserole baked with rich cooking cream, fresh mushrooms, and golden mozzarella.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 34,
    popular: true,
    available: true,
    options: [
      {
        id: "filling",
        name_ar: "اللحم أو الدجاج",
        name_en: "Protein Choice",
        type: "single",
        required: true,
        values: [
          { id: "meat", label_ar: "لحم (34 ر.س)", label_en: "Meat (34 SAR)", price: 34 },
          { id: "chicken", label_ar: "دجاج (34 ر.س)", label_en: "Chicken (34 SAR)", price: 34 }
        ]
      }
    ]
  },
  {
    id: "tagine-meat",
    category: "casseroles-seafood",
    name_ar: "طاجن لحم كلاسيك",
    name_en: "Classic Meat Tagine",
    description_ar: "قطع لحم بلدي مطهوة ببطء في الفخار مع البصل والبهارات النجدية حتى النضج التام.",
    description_en: "Slow-simmered tender meat chunks cooked with aromatic onions and heritage spices.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 33,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "tagine-chicken",
    category: "casseroles-seafood",
    name_ar: "طاجن دجاج بالفرن",
    name_en: "Oven Chicken Tagine",
    description_ar: "دجاج طازج مطهو في صلصة الطماطم الغنية مع قطع البطاطس والفلفل الرومي.",
    description_en: "Tender chicken simmered in clay dish with rich tomato gravy, bell peppers, and potatoes.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 30,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "tagine-shrimp",
    category: "casseroles-seafood",
    name_ar: "طاجن جمبري بحري",
    name_en: "Seafood Shrimp Tagine",
    description_ar: "حبات الجمبري الطازجة مطهوة في طاجن فخار مع الكزبرة، الثوم، وزيت الزيتون وصلصة الطماطم الشهية.",
    description_en: "Plump fresh gulf shrimp baked in clay with garlic, cilantro, olive oil, and tomato reduction.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 35,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "tagine-fish",
    category: "casseroles-seafood",
    name_ar: "طاجن سمك فيليه",
    name_en: "Fish Fillet Tagine",
    description_ar: "فيليه سمك طازج متبل بالكمون والليمون والثوم ومخبوز بصلصة الطماطم والفلفل الحار.",
    description_en: "Fresh fish fillet baked with cumin, lemon, garlic, and savory herb tomato reduction.",
    calories: 700,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 30,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "shish-arab",
    category: "casseroles-seafood",
    name_ar: "شيش عرب",
    name_en: "Shish Arab",
    description_ar: "قطع اللحم أو الدجاج المتبلة والمشوية داخل خبز الصاج مع الطحينة والبقدونس ودبس الرمان.",
    description_en: "Grilled marinated skewer meat wrapped in toasted saj bread with tahini, greens, and sauce.",
    calories: 1329,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 23,
    popular: false,
    available: true,
    options: [
      {
        id: "meat-type",
        name_ar: "نوع اللحم",
        name_en: "Meat Choice",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج (23 ر.س)", label_en: "Chicken (23 SAR)", price: 23 },
          { id: "meat", label_ar: "لحم (28 ر.س)", label_en: "Meat (28 SAR)", price: 28 }
        ]
      }
    ]
  },
  {
    id: "arais",
    category: "casseroles-seafood",
    name_ar: "عرائس على الفحم",
    name_en: "Charcoal Grilled Arais",
    description_ar: "خبز عربي محشو باللحم أو الدجاج المفروم مع التوابل ودبس الرمان ومشوي على الفحم بقرمشة ذهبية.",
    description_en: "Pita bread stuffed with spiced minced meat or chicken, charcoal-grilled until crispy and aromatic.",
    calories: 1200,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 29,
    popular: true,
    available: true,
    options: [
      {
        id: "filling",
        name_ar: "الحشوة",
        name_en: "Filling",
        type: "single",
        required: true,
        values: [
          { id: "chicken", label_ar: "دجاج (29 ر.س)", label_en: "Chicken (29 SAR)", price: 29 },
          { id: "meat", label_ar: "لحم (32 ر.س)", label_en: "Meat (32 SAR)", price: 32 }
        ]
      }
    ]
  },
  {
    id: "macaroni-bechamel-meat",
    category: "casseroles-seafood",
    name_ar: "مكرونة بشاميل لحم",
    name_en: "Beef Bechamel Pasta",
    description_ar: "مكرونة فرن كلاسيكية بالصلصة البيضاء الغنية (البشاميل) واللحم المفروم والجبنة الذهبية المقرمشة.",
    description_en: "Classic oven-baked pasta layered with spiced minced beef, velvety creamy bechamel, and golden crust.",
    calories: 400,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 22,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "grilled-shrimp",
    category: "casseroles-seafood",
    name_ar: "جمبري مشوي على الفحم",
    name_en: "Charcoal Grilled Shrimp",
    description_ar: "جمبري كبير متبل بالليمون، زيت الزيتون، والبابريكا، مشوي على الجمر ويقدم مع صوص التارتار والثومية.",
    description_en: "Jumbo Gulf shrimp marinated with lemon, olive oil, and paprika, grilled over charcoal.",
    calories: 938,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 43,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "grilled-fish",
    category: "casseroles-seafood",
    name_ar: "سمك مشوي على الجمر",
    name_en: "Charcoal Grilled Fish",
    description_ar: "سمكة طازجة مفتوحة متبلة بتتبيلة الحمراء الخاصة ومشوية على شبك الفحم مع الليمون الحامض.",
    description_en: "Fresh whole fish butterfly-cut, rubbed with house spices, and grilled over open embers.",
    calories: 953,
    image: "hamra-grills-images-assets/khashkhash_kebab.webp",
    basePrice: 42,
    popular: false,
    available: true,
    options: []
  },

  // =========================================================================
  // 4. المقبلات والسلطات (Appetizers & Salads)
  // =========================================================================
  {
    id: "hummus",
    category: "appetizers-salads",
    name_ar: "حمص ناعم بزيت الزيتون",
    name_en: "Creamy Hummus with Olive Oil",
    description_ar: "حمص بلدي كريمي معجون بالطحينة الصافية وعصير الليمون ومزين بزيت الزيتون البكر والبابريكا.",
    description_en: "Silky smooth blended chickpeas with virgin olive oil, tahini, and lemon juice.",
    calories: 580,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 12,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "mutabbal",
    category: "appetizers-salads",
    name_ar: "متبل باذنجان مشوي",
    name_en: "Smoked Mutabbal",
    description_ar: "باذنجان مشوي على الفحم ومهروس مع الطحينة والثوم والزبادي وزيت الزيتون.",
    description_en: "Smoky charcoal-roasted eggplant mashed with velvety tahini, garlic, and olive oil.",
    calories: 410,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 9,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "baba-ghanoush",
    category: "appetizers-salads",
    name_ar: "بابا غنوج",
    name_en: "Baba Ghanoush",
    description_ar: "باذنجان مشوي ومقطع مع الطماطم، الفلفل الملون، النعناع، ودبس الرمان وزيت الزيتون.",
    description_en: "Roasted smoky eggplant tossed with diced tomatoes, bell peppers, mint, and pomegranate molasses.",
    calories: 174,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 9,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "muhammara-salad",
    category: "appetizers-salads",
    name_ar: "سلطة المحمرة",
    name_en: "Muhammara Dip",
    description_ar: "مزيج الفلفل الأحمر المشوي مع الجوز ودبس الرمان وزيت الزيتون والكمون.",
    description_en: "Roasted red pepper dip blended with crushed walnuts, cumin, and sweet-tart pomegranate molasses.",
    calories: 287,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 9,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "stuffed-grape-leaves",
    category: "appetizers-salads",
    name_ar: "ورق عنب يلانجي",
    name_en: "Stuffed Grape Leaves (Yalanji)",
    description_ar: "ورق عنب طري محشو بالأرز المصري والخضار والنعناع ومتبل بزيت الزيتون والليمون ودبس الرمان.",
    description_en: "Tender vine leaves stuffed with seasoned herb rice, simmered in olive oil and lemon juice.",
    calories: 422,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 10,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "tabbouleh",
    category: "appetizers-salads",
    name_ar: "تبولة لبنانية طازجة",
    name_en: "Fresh Lebanese Tabbouleh",
    description_ar: "بقدونس طازج مفروم ناعم مع الطماطم، النعناع، البرغل الناعم، عصير الليمون، وزيت الزيتون البكر.",
    description_en: "Finely chopped parsley, mint, tomatoes, fine bulgur, fresh lemon juice, and virgin olive oil.",
    calories: 80,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 9,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "chef-mixed-appetizers",
    category: "appetizers-salads",
    name_ar: "مقبلات الشيف مشكل",
    name_en: "Chef's Mixed Appetizers Platter",
    description_ar: "صحن مشكل فاخر يجمع بين: حمص، متبل، بابا غنوج، محمرة، وورق عنب مع خبز تنور ساخن.",
    description_en: "Grand tasting platter of hummus, mutabbal, baba ghanoush, muhammara, and grape leaves.",
    calories: 620,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 19,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "beetroot-salad",
    category: "appetizers-salads",
    name_ar: "سلطة البنجر (الشمندر)",
    name_en: "Beetroot Salad",
    description_ar: "قطع الشمندر المسلوقة الطازجة متبلة بالليمون والكزبرة وزيت الزيتون ورشة سماق.",
    description_en: "Tender earthy beetroots tossed with cilantro, fresh lemon dressing, and sumac.",
    calories: 290,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 9,
    popular: false,
    available: true,
    options: []
  },

  // =========================================================================
  // 5. الساندويتشات (Sandwiches)
  // =========================================================================
  {
    id: "sandwich-chicken-kebab",
    category: "sandwiches",
    name_ar: "ساندويتش كباب دجاج",
    name_en: "Chicken Kebab Sandwich",
    description_ar: "سيخ كباب دجاج مشوي على الفحم في خبز طازج مع الثومية، المخلل، والبطاطس المقرمشة.",
    description_en: "Charcoal-grilled chicken kebab skewer wrapped in fresh bread with garlic sauce and pickles.",
    calories: 360,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 11,
    popular: true,
    available: true,
    options: [
      {
        id: "bread-type",
        name_ar: "نوع الخبز",
        name_en: "Bread Type",
        type: "single",
        required: false,
        values: [
          { id: "shami", label_ar: "خبز شامي كلاسيك", label_en: "Classic Shami Pita", priceDelta: 0 },
          { id: "saj", label_ar: "خبز صاج مقمر (+1 ر.س)", label_en: "Toasted Saj Bread (+1 SAR)", priceDelta: 1 }
        ]
      }
    ]
  },
  {
    id: "sandwich-mabshoor-chicken",
    category: "sandwiches",
    name_ar: "ساندويتش مبشور دجاج",
    name_en: "Mabshoor Chicken Sandwich",
    description_ar: "دجاج مبشور بنكهة الشواء والبهارات مع صوص الثوم والبطاطس والخيار المخلل.",
    description_en: "Savory shredded grilled chicken wrapped with house garlic sauce and crispy fries.",
    calories: 360,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 11,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "sandwich-awsal-chicken",
    category: "sandwiches",
    name_ar: "ساندويتش أوصال دجاج (شيش طاووق)",
    name_en: "Chicken Shish Tawook Sandwich",
    description_ar: "مكعبات شيش طاووق طرية متبلة بالزبادي والزعفران مع صوص الثوم وسلطة البيواز.",
    description_en: "Marinated tender chicken cubes with garlic cream, pickles, and sumac onion salad.",
    calories: 360,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 11,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "sandwich-meat-kebab",
    category: "sandwiches",
    name_ar: "ساندويتش كباب لحم",
    name_en: "Beef / Lamb Kebab Sandwich",
    description_ar: "سيخ كباب لحم مشوي على الفحم في خبز طازج مع سلطة البيواز، الطحينة، ورشة سماق نجدية.",
    description_en: "Charcoal grilled juicy beef kebab wrapped with biwaz onion-parsley salad and creamy tahini.",
    calories: 530,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 13,
    popular: true,
    available: true,
    options: [
      {
        id: "bread-type",
        name_ar: "نوع الخبز",
        name_en: "Bread Type",
        type: "single",
        required: false,
        values: [
          { id: "shami", label_ar: "خبز شامي كلاسيك", label_en: "Classic Shami Pita", priceDelta: 0 },
          { id: "saj", label_ar: "خبز صاج مقمر (+1 ر.س)", label_en: "Toasted Saj Bread (+1 SAR)", priceDelta: 1 }
        ]
      }
    ]
  },
  {
    id: "sandwich-mabshoor-meat",
    category: "sandwiches",
    name_ar: "ساندويتش مبشور لحم",
    name_en: "Mabshoor Beef Sandwich",
    description_ar: "لحم مبشور مشوي على الجمر ممزوج باللية والبهارات مع سلطة الطحينة والبقدونس في خبز طازج.",
    description_en: "Charcoal grated spiced beef rolled in fresh bread with rich tahini and herb garnish.",
    calories: 530,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 13,
    popular: false,
    available: true,
    options: []
  },

  // =========================================================================
  // 6. الإضافات (Sides & Extras)
  // =========================================================================
  {
    id: "side-rice",
    category: "sides",
    name_ar: "صحن أرز مبهر فاخر",
    name_en: "Spiced Golden Rice Portion",
    description_ar: "أرز طويل الحبة مبهر بتوابل الكبسة النجدية والزعفران ومزين بالبصل المقرمش والزبيب.",
    description_en: "Fragrant long-grain basmati rice spiced with saffron, cardamom, and fried onions.",
    calories: 246,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 6,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "side-fries",
    category: "sides",
    name_ar: "بطاطس مقلية مقرمشة",
    name_en: "Crispy Golden Fries",
    description_ar: "أصابع بطاطس مقلية ذهبية ومقرمشة متبلة بملح خفيف ورشة بهار الحمراء اللذيذ.",
    description_en: "Crispy golden cut potato fries seasoned with house savory spice mix.",
    calories: 500,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 9,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "extra-tahini",
    category: "sides",
    name_ar: "علبة صوص طحينة إضافية",
    name_en: "Extra Tahini Sauce Cup",
    description_ar: "صوص طحينة بلدي كريمي مع الليمون والكمون وزيت الزيتون.",
    description_en: "Creamy traditional sesame tahini with lemon and touch of garlic.",
    calories: 120,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 3,
    popular: false,
    available: true,
    options: []
  },
  {
    id: "extra-garlic",
    category: "sides",
    name_ar: "علبة ثومية الحمراء الكريمية",
    name_en: "Extra Garlic Dip",
    description_ar: "ثومية بيضاء كريمية مخفوقة بنعومة فائقة وطعم رائع.",
    description_en: "Whipped fluffy authentic garlic toum.",
    calories: 140,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 3,
    popular: false,
    available: true,
    options: []
  },

  // =========================================================================
  // 7. الحلى (Desserts)
  // =========================================================================
  {
    id: "um-ali",
    category: "desserts",
    name_ar: "أم علي بالمكسرات والقشطة",
    name_en: "Um Ali with Nuts & Cream",
    description_ar: "حلى أم علي الدافئ في الفخار مع رقائق البف باستري والحليب الساخن والمكسرات المحمصة والقشطة الطازجة.",
    description_en: "Warm traditional pastry pudding with hot milk, roasted nuts, raisins, and rich fresh cream.",
    calories: 176,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 10,
    popular: true,
    available: true,
    options: []
  },
  {
    id: "rice-pudding",
    category: "desserts",
    name_ar: "أرز بالحليب والمستكة",
    name_en: "Chilled Rice Pudding with Mastic",
    description_ar: "أرز بالحليب مطبوخ على أصوله بنكهة المستكة وماء الورد ومزين بالفستق الحلبي المجروش.",
    description_en: "Silky chilled rice pudding delicately infused with mastic, rosewater, and crushed pistachios.",
    calories: 170,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 6,
    popular: false,
    available: true,
    options: []
  },

  // =========================================================================
  // 8. المشروبات (Drinks)
  // =========================================================================
  {
    id: "soft-drinks",
    category: "drinks",
    name_ar: "مشروبات غازية متنوعة",
    name_en: "Assorted Soft Drinks",
    description_ar: "علبة معدنية مثلجة منعشة من اختيارك (بيبسي، دايت بيبسي، سفن أب، ميرندا، كود ريد).",
    description_en: "Chilled canned refreshing sodas of your choice (Pepsi, Diet, 7Up, Mirinda).",
    calories: 140,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 2.5,
    popular: true,
    available: true,
    options: [
      {
        id: "flavor",
        name_ar: "اختر المشروب",
        name_en: "Select Drink",
        type: "single",
        required: true,
        values: [
          { id: "pepsi", label_ar: "بيبسي", label_en: "Pepsi", price: 2.5 },
          { id: "pepsi-diet", label_ar: "بيبسي دايت", label_en: "Pepsi Diet", price: 2.5 },
          { id: "7up", label_ar: "سفن أب", label_en: "7Up", price: 2.5 },
          { id: "mirinda", label_ar: "ميرندا حمضيات", label_en: "Mirinda Citrus", price: 2.5 }
        ]
      }
    ]
  },
  {
    id: "mineral-water",
    category: "drinks",
    name_ar: "مياه معدنية نقية",
    name_en: "Pure Mineral Water",
    description_ar: "مياه معدنية نقية باردة 330 مل.",
    description_en: "Cold pure mineral bottled water 330ml.",
    calories: 0,
    image: "hamra-grills-images-assets/vibrant_grill_platter.webp",
    basePrice: 1,
    popular: false,
    available: true,
    options: []
  }
];

// Helper to look up items by ID
function getMenuItemById(id) {
  return MENU_ITEMS.find(item => item.id === id) || null;
}

// Helper to filter items by category
function getMenuItemsByCategory(catId) {
  if (!catId || catId === 'all') return MENU_ITEMS;
  return MENU_ITEMS.filter(item => item.category === catId);
}

// Export to window
if (typeof window !== "undefined") {
  window.MENU_CATEGORIES = MENU_CATEGORIES;
  window.MENU_ITEMS = MENU_ITEMS;
  window.getMenuItemById = getMenuItemById;
  window.getMenuItemsByCategory = getMenuItemsByCategory;
}

