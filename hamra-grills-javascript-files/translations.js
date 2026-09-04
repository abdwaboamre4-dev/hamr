/**
 * Hamra Grills - Bilingual Translations Dictionary
 * Full Arabic (Default, RTL) and English (LTR) support
 */

const TRANSLATIONS = {
  ar: {
    // Brand & Header
    brandName: "مطاعم مشويات الحمراء",
    brandShort: "مشويات الحمراء",
    brandTagline: "متخصصون في مشاوي الجمعات والعزايم 🔥",
    brandSub: "تقديم فاخر يليق بذوقكم • توصيل داخل جدة ومكة المكرمة",
    locationBadge: "جدة ومكة المكرمة",
    switchLang: "English",
    flag: "🇺🇸",

    // Navigation
    navHome: "الرئيسية",
    navMenu: "المنيو",
    navFamilySpotlight: "صواني العائلة",
    navBranches: "فروعنا",
    navCart: "طلباتي",
    navReservations: "الحجز",
    navLocation: "الموقع",
    navReviews: "آراء العملاء",
    desktopOrderCall: "اتصال ومساعدة",

    // Hero
    heroBadge: "مشاوي فاخرة على الفحم",
    heroTitlePart1: "مشويات الحمراء",
    heroTitlePart2: "مشاوي الجمعات والعزايم 🔥",
    heroSubtitle: "متخصصون في مشاوي الجمعات والعزايم بتقديم فاخر يليق بذوقكم. متوفر التوصيل داخل جدة ومكة المكرمة عبر 10 فروع في جدة وفرعين في مكة المكرمة.",
    heroOrderBtn: "🍽️ اطلب الآن",
    heroReserveBtn: "🪑 احجز طاولة",
    googleRatingText: "4.8 / 5.0 تقييم موثّق على Google",
    verifiedReviewsCount: "أكثر من 1,850 تقييم حقيقي",
    heroQuoteReview: "أفضل مشاوي وكباب وطواجن للجمعات والعزايم بلا منازع!",
    heroReviewAuthor: "عبدالعزيز السبيعي • عميل موثّق",
    heroFeatureMeat: "لحوم نعيمي ودواجن طازجة يومياً",
    heroFeatureGrill: "شواء أصيل على الفحم الطبيعي",
    heroFeatureFamily: "صواني ملكية ووجبات عائلية راهية",
    heroFeatureSpeed: "توصيل حراري فوري وساخن",
    desktopReservationPerk1: "صالات عائلية رحبة مع بارتشن لخصوصية تامة",
    desktopReservationPerk2: "أجواء ضيافة راقية وشواء أصيل على الجمر",
    desktopReservationPerk3: "مواقف سيارات واسعة وخدمة ضيافة رفيعة",

    // Quick Actions
    qaOrder: "اطلب الآن",
    qaLocation: "موقعنا",
    qaContact: "تواصل معنا",
    qaReserve: "احجز طاولة",
    qaWhatsapp: "واتساب",

    // Menu Experience
    menuTitle: "قائمة الطعام الرقمية",
    menuSubtitle: "اختر وجبتك واستمتع بالمذاق الأصيل",
    searchPlaceholder: "ابحث في المشاوي، الكباب، الطواجن، والمقبلات...",
    allCategories: "جميع الأطباق",
    popularBadge: "🔥 الأكثر طلباً",
    customizableBadge: "تخصيص الخيارات",
    caloriesSuffix: "سعرة",
    currency: "ر.س",
    addToCart: "إضافة للسلة",
    customizeBtn: "تخصيص وإضافة",
    noResultsTitle: "لم يتم العثور على أطباق!",
    noResultsDesc: "جرّب البحث بكلمات أخرى أو تصفح الأقسام مباشرة.",
    clearSearch: "إعادة ضبط البحث",

    // Family Meals Spotlight
    familySpotlightTitle: "مشاوي وصواني العائلة الملكية",
    familySpotlightDesc: "صواني المشاوي المشكلة ووجبات التوفير تكفي جميع العائلة والجمعات",
    browseFamilyTraysBtn: "استعراض صواني العائلة",
    hamraGrillsSpecial: "مشويات الحمراء سبيشال",
    heroSubtitleBrand: "مطاعم مشويات الحمراء",
    resSeatsRequired: "عدد المقاعد المطلوبة:",
    resSectionFamilies: "عوائل (خصوصية)",
    resSectionSingles: "أفراد",
    resSectionOutdoor: "جلسات خارجية",
    closeWindow: "إغلاق النافذة",

    // Why Us / Trust Section
    whyTitle: "ليش تختار مشاوي الحمراء؟",
    whySubtitle: "الجودة والأصالة هي سر محبتكم وثقتكم بنا",
    feature1Title: "لحوم طازجة يومياً",
    feature1Desc: "نعتمد أجود لحوم النعيمي والدجاج الطازج المذبوح محلياً بشكل يومي.",
    feature2Title: "شواء على الفحم الطبيعي",
    feature2Desc: "نشوي أطباقنا على الجمر الهادئ ليكتسب اللحم نكهة الفحم الشهية وطراوته الطبيعية.",
    feature3Title: "وجبات عائلية راهية",
    feature3Desc: "صواني كريمة ووجبات متكاملة تلبي رغبات العائلة والولائم بأفضل الأسعار.",
    feature4Title: "توصيل سريع وساخن",
    feature4Desc: "نغلف وجباتنا بعناية فائقة لتصلك ساخنة وطازجة كأنك جالس داخل المطعم.",

    // Allergen Warning
    allergenTitle: "⚠️ تنبيه الحساسية الغذائية",
    allergenNotice: "قد تحتوي بعض الأطباق على مسببات حساسية مثل الحليب، المكسرات، القمح، أو السمسم. يرجى إبلاغ فريق المطعم بأي حساسية غذائية قبل إتمام طلبك.",

    // Customization Modal / Bottom Sheet
    optionsTitle: "تخصيص وجبتك",
    selectRequired: "مطلوب اختيار واحد",
    selectOptional: "اختياري",
    customerNotesLabel: "ملاحظات أو طلبات خاصة",
    customerNotesPlaceholder: "مثال: بدون بصل، زيادة صوص طحينة، تحمير إضافي...",
    quantity: "الكمية",
    totalPrice: "المجموع",
    addCustomizedToCart: "تأكيد وإضافة للسلة",

    // Cart & Sticky Bar
    cartTitle: "سلة الطلبات",
    stickyCartItems: "منتجات",
    stickyCartView: "عرض السلة والدفع",
    emptyCartTitle: "السلة فاضية 🍽️",
    emptyCartDesc: "ابدأ باختيار أطباقك المفضلة من المنيو وستظهر طلباتك هنا.",
    browseMenuBtn: "تصفح المنيو الآن",
    orderSummary: "ملخص الحساب",
    subtotal: "المجموع الفرعي",
    deliveryFee: "رسوم التوصيل",
    freeDelivery: "مجاناً (عرض الطلب الكبير)",
    orderTotal: "الإجمالي النهائي",
    clearCart: "إفراغ السلة",

    // Delivery vs Pickup
    orderTypeTitle: "نوع الاستلام",
    deliveryType: "🚗 توصيل للموقع",
    pickupType: "🏃 استلام من الفرع",
    deliveryInfo: "بيانات التوصيل",
    pickupInfo: "بيانات الاستلام من الفرع",
    customerName: "الاسم الكريم",
    customerPhone: "رقم الجوال (للتواصل والواتساب)",
    phonePlaceholder: "011xxxxxxxx",
    deliveryArea: "المنطقة / الحي",
    selectArea: "اختر الحي أو المنطقة",
    streetDetails: "تفاصيل العنوان (الشارع، رقم المبنى، المعلم)",
    deliveryNotes: "تعليمات لسائق التوصيل",
    deliveryNotesPlaceholder: "مثال: رن الجرس، ترك الطلب عند الباب...",
    selectBranch: "اختر الفرع للاستلام",
    estimatedTime: "الوقت المقدر للتحضير",

    // Checkout Steps
    checkoutStep1: "1. مراجعة السلة",
    checkoutStep2: "2. طريقة الاستلام",
    checkoutStep3: "3. بيانات العميل",
    checkoutStep4: "4. تأكيد الطلب",
    nextStep: "متابعة الطلب",
    prevStep: "رجوع",
    confirmOrderWhatsApp: "تأكيد الطلب عبر الواتساب 🔥",

    // Order Success Modal
    orderSuccessTitle: "تم إنشاء طلبك بنجاح! 🎉",
    orderNumber: "رقم الطلب",
    orderSuccessDesc: "سيتم فتح محادثة الواتساب مع المطعم الآن لتأكيد طلبك وتجهيزه مباشرة.",
    openWhatsAppDirectly: "إرسال الطلب في الواتساب الآن",
    orderCompletedClose: "تم الإرسال - إغلاق",

    // Table Reservation
    reservationTitle: "حجز طاولة في المطعم",
    reservationSubtitle: "احجز طاولتك مسبقاً وتجنب فترات الانتظار لتجربة ضيافة استثنائية",
    resDate: "تاريخ الحجز",
    resTime: "وقت الحضور",
    resGuests: "عدد الأشخاص / الضيوف",
    resSection: "قسم الجلوس المفضل",
    resName: "الاسم",
    resPhone: "رقم الجوال",
    resSpecialRequests: "طلبات خاصة أو مناسبة (عيد ميلاد، ذكرى، جلسة هادئة)",
    resSpecialRequestsPlaceholder: "اكتب أي ترتيبات ترغب بتجهيزها لطاولتك...",
    confirmReservationBtn: "تأكيد طلب الحجز 🪑",
    resSuccessTitle: "تم استلام طلب الحجز بنجاح 🎉",
    resSuccessDesc: "تأكيد سريع عبر الواتساب لضمان حجز وتجهيز طاولتك في الموعد المحدد.",
    resCode: "رمز الحجز",
    sendResWhatsApp: "تأكيد الحجز عبر الواتساب",

    // Location & Main Branch
    locationTitle: "موقعنا وساعات العمل",
    locationSubtitle: "نتشرف بزيارتكم في صالات الضيافة الفاخرة",
    branchMainName: "مطاعم مشويات الحمراء فرع ابحر · Jeddah",
    branchAddress: "فرع ابحر، جدة، المملكة العربية السعودية",
    workingHoursTitle: "أوقات العمل اليومية",
    workingHoursDaily: "يومياً: 01:00 ظهراً – 02:00 بعد منتصف الليل",
    workingHoursSatWed: "يومياً: 01:00 ظهراً – 02:00 بعد منتصف الليل",
    workingHoursThuFri: "خدمة التوصيل والاستلام: 01:00 م – 02:00 ص",
    openNowBadge: "مفتوح الآن ويستقبلكم",
    getDirectionsBtn: "📍 الاتجاهات للفرع (خريطة الموقع)",
    callBranchBtn: "📞 اتصال هاتفي: 01104689702",
    whatsappBranchBtn: "💬 محادثة واتساب",

    // Branch Network Section
    branchesTitle: "شبكة فروعنا",
    branchesSubtitle: "10 فروع في جدة + فرعين في مكة المكرمة لخدمتكم بأشهى مشاوي الجمعات والعزايم",
    branchesScaleHighlight: "🔥 10 فروع في جدة وفرعين في مكة المكرمة",
    branchesJeddahHeading: "فروع جدة (10 فروع)",
    branchesMakkahHeading: "فروع مكة المكرمة (فرعين)",
    branchObhurLabel: "فرع ابحر (الفرع الرئيسي)",
    branchSamarLabel: "فرع السامر",
    branchHaramainLabel: "فرع الحرمين",
    branchHamdaniyahLabel: "فرع الحمدانية",
    branchSafaLabel: "فرع الصفا",
    branchMurjanLabel: "فرع المرجان",
    branchOtherJeddahLabel: "بالإضافة إلى باقي فروع جدة",
    branchAwaliLabel: "فرع العوالي",
    branchZaidiLabel: "فرع الزايدي",
    mainBranchTag: "الفرع الرئيسي",
    contactAndOrderText: "للتواصل والطلب: 01104689702",
    deliveryAvailableText: "🚗 متوفر التوصيل داخل جدة ومكة المكرمة",
    specialistsText: "🔥 متخصصون في مشاوي الجمعات والعزايم",
    luxuryPresentationText: "✨ تقديم فاخر يليق بذوقكم",

    // Google Reviews
    reviewsTitle: "آراء وتقييمات ضيوفنا",
    reviewsSubtitle: "تجارب حقيقية وموثقة على Google Maps",
    googleVerifiedLabel: "تقييم Google موثّق",
    reviewsPlaceholderNote: "ملاحظة: تقييمات موثقة من ضيوفنا الكرام في جدة ومكة المكرمة.",

    // Floating WhatsApp
    floatingWhatsappText: "اطلب عبر واتساب (01104689702)",

    // Footer
    footerAbout: "مطاعم مشويات الحمراء — متخصصون في مشاوي الجمعات والعزايم، تقديم فاخر يليق بذوقكم، وتوصيل سريع داخل جدة ومكة المكرمة.",
    quickLinksTitle: "روابط سريعة",
    contactUsTitle: "تواصل معنا",
    allRightsReserved: "جميع الحقوق محفوظة © مطاعم مشويات الحمراء",

    // Toasts
    itemAddedToast: "تمت إضافة الطبق إلى السلة بنجاح! 🛒",
    itemUpdatedToast: "تم تحديث السلة بنجاح",
    itemRemovedToast: "تم حذف الطبق من السلة",
    cartClearedToast: "تم إفراغ سلة الطلبات",
    fillRequiredFields: "يرجى تعبئة كافة الحقول المطلوبة للمتابعة"
  },

  en: {
    // Brand & Header
    brandName: "Hamra Grills",
    brandShort: "Hamra Grills",
    brandTagline: "Specialists in BBQ for Gatherings & Banquets 🔥",
    brandSub: "Luxurious Presentation • Delivery in Jeddah & Makkah",
    locationBadge: "Jeddah & Makkah",
    switchLang: "العربية",
    flag: "🇸🇦",

    // Navigation
    navHome: "Home",
    navMenu: "Menu",
    navFamilySpotlight: "Family Trays",
    navBranches: "Branches",
    navCart: "My Cart",
    navReservations: "Reserve Table",
    navLocation: "Location",
    navReviews: "Reviews",
    desktopOrderCall: "Call & Orders",

    // Hero
    heroBadge: "Authentic Charcoal Barbecue",
    heroTitlePart1: "Hamra Grills",
    heroTitlePart2: "Gatherings & Banquets BBQ 🔥",
    heroSubtitle: "Specialists in barbecue for gatherings and banquets, with luxurious presentation fitting your taste. Fast delivery across Jeddah & Makkah across 10 Jeddah branches and 2 Makkah branches.",
    heroOrderBtn: "🍽️ Order Now",
    heroReserveBtn: "🪑 Book Table",
    googleRatingText: "4.8 / 5.0 Verified on Google",
    verifiedReviewsCount: "Over 1,850 Real Reviews",
    heroQuoteReview: "Undoubtedly the finest authentic charcoal grills and platters for family gatherings!",
    heroReviewAuthor: "Abdulaziz Al-Subaie • Verified Guest",
    heroFeatureMeat: "Daily Fresh Meats & Local Poultry",
    heroFeatureGrill: "Natural Glowing Charcoal Grilling",
    heroFeatureFamily: "Royal Generous Family Feasts",
    heroFeatureSpeed: "Fast & Piping Hot Delivery",
    desktopReservationPerk1: "Spacious family dining with private partitions",
    desktopReservationPerk2: "First-class hospitality & authentic charcoal grilling",
    desktopReservationPerk3: "Ample parking and premium hospitality",

    // Quick Actions
    qaOrder: "Order Now",
    qaLocation: "Location",
    qaContact: "Call Us",
    qaReserve: "Book Table",
    qaWhatsapp: "WhatsApp",

    // Menu Experience
    menuTitle: "Digital Ordering Menu",
    menuSubtitle: "Choose your favorite dishes and taste the difference",
    searchPlaceholder: "Search grills, kebabs, casseroles, appetizers...",
    allCategories: "All Dishes",
    popularBadge: "🔥 Most Popular",
    customizableBadge: "Customizable",
    caloriesSuffix: "Kcal",
    currency: "SAR",
    addToCart: "Add to Cart",
    customizeBtn: "Customize & Add",
    noResultsTitle: "No dishes found!",
    noResultsDesc: "Try searching with different terms or browse categories.",
    clearSearch: "Reset Search",

    // Family Meals Spotlight
    familySpotlightTitle: "Royal Family Feasts & Trays",
    familySpotlightDesc: "Generous charcoal mixed grill platters & value meals designed for gatherings",
    browseFamilyTraysBtn: "Browse Family Trays",
    hamraGrillsSpecial: "Hamra Grills Special",
    heroSubtitleBrand: "Hamra Grills",
    resSeatsRequired: "Required Seats:",
    resSectionFamilies: "Families (Private)",
    resSectionSingles: "Singles",
    resSectionOutdoor: "Outdoor Terrace",
    closeWindow: "Close Window",

    // Why Us / Trust Section
    whyTitle: "Why Choose Hamra Grills?",
    whySubtitle: "Quality and authenticity are why our guests keep coming back",
    feature1Title: "Daily Fresh Meats",
    feature1Desc: "Only the finest local lamb and daily fresh poultry, butchered to exacting standards.",
    feature2Title: "Natural Charcoal Grilling",
    feature2Desc: "Slow-grilled over natural coals to seal in rich juices and irresistible smoky aroma.",
    feature3Title: "Generous Family Meals",
    feature3Desc: "Abundant royal trays and complete banquets that satisfy everyone at great value.",
    feature4Title: "Hot & Speedy Delivery",
    feature4Desc: "Specially packaged to arrive piping hot and fresh at your door.",

    // Allergen Warning
    allergenTitle: "⚠️ Food Allergy Warning",
    allergenNotice: "Some items may contain potential allergens including dairy, nuts, gluten, or sesame. Please notify our staff of any food allergies prior to ordering.",

    // Customization Modal / Bottom Sheet
    optionsTitle: "Customize Your Order",
    selectRequired: "One selection required",
    selectOptional: "Optional",
    customerNotesLabel: "Special Instructions / Notes",
    customerNotesPlaceholder: "E.g., Extra crispy, no onions, extra tahini sauce...",
    quantity: "Quantity",
    totalPrice: "Total",
    addCustomizedToCart: "Confirm & Add to Cart",

    // Cart & Sticky Bar
    cartTitle: "Your Shopping Cart",
    stickyCartItems: "items",
    stickyCartView: "View Cart & Checkout",
    emptyCartTitle: "Your Cart is Empty 🍽️",
    emptyCartDesc: "Explore our menu and add your favorite dishes to begin.",
    browseMenuBtn: "Browse Menu Now",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    freeDelivery: "Free (Special Offer)",
    orderTotal: "Total Amount",
    clearCart: "Clear Cart",

    // Delivery vs Pickup
    orderTypeTitle: "Fulfillment Method",
    deliveryType: "🚗 Delivery",
    pickupType: "🏃 Branch Pickup",
    deliveryInfo: "Delivery Details",
    pickupInfo: "Branch Pickup Details",
    customerName: "Full Name",
    customerPhone: "Mobile Phone (WhatsApp)",
    phonePlaceholder: "011xxxxxxxx",
    deliveryArea: "District / Area",
    selectArea: "Select your neighborhood",
    streetDetails: "Address Details (Street, building number, landmark)",
    deliveryNotes: "Delivery Driver Notes",
    deliveryNotesPlaceholder: "E.g., Ring bell, leave at apartment door...",
    selectBranch: "Select Pickup Branch",
    estimatedTime: "Estimated Prep Time",

    // Checkout Steps
    checkoutStep1: "1. Review Cart",
    checkoutStep2: "2. Order Method",
    checkoutStep3: "3. Contact Info",
    checkoutStep4: "4. Confirmation",
    nextStep: "Continue",
    prevStep: "Back",
    confirmOrderWhatsApp: "Confirm Order via WhatsApp 🔥",

    // Order Success Modal
    orderSuccessTitle: "Order Created Successfully! 🎉",
    orderNumber: "Order ID",
    orderSuccessDesc: "WhatsApp will open with our restaurant team to confirm and process your order immediately.",
    openWhatsAppDirectly: "Send Order in WhatsApp Now",
    orderCompletedClose: "Sent & Close",

    // Table Reservation
    reservationTitle: "Book a Table",
    reservationSubtitle: "Reserve your table in advance and skip the wait for an exceptional dining experience",
    resDate: "Reservation Date",
    resTime: "Arrival Time",
    resGuests: "Number of Guests",
    resSection: "Preferred Seating Area",
    resName: "Your Name",
    resPhone: "Mobile Phone",
    resSpecialRequests: "Special Requests (Occasion, anniversary, quiet corner)",
    resSpecialRequestsPlaceholder: "Let us know any special setup you need...",
    confirmReservationBtn: "Confirm Table Reservation 🪑",
    resSuccessTitle: "Reservation Request Received! 🎉",
    resSuccessDesc: "Fast WhatsApp confirmation to finalize your table reservation at your desired time.",
    resCode: "Booking Code",
    sendResWhatsApp: "Confirm Reservation via WhatsApp",

    // Location & Main Branch
    locationTitle: "Location & Working Hours",
    locationSubtitle: "We look forward to welcoming you in our dining hall",
    branchMainName: "Hamra Grills - Obhur Branch · Jeddah",
    branchAddress: "Obhur Branch, Jeddah, Saudi Arabia",
    workingHoursTitle: "Opening Hours",
    workingHoursDaily: "Daily: 01:00 PM – 02:00 AM",
    workingHoursSatWed: "Daily: 01:00 PM – 02:00 AM",
    workingHoursThuFri: "Dine-in, Takeout & Delivery: 01:00 PM – 02:00 AM",
    openNowBadge: "Open Now • Welcoming Guests",
    getDirectionsBtn: "📍 Get Directions (Map Link)",
    callBranchBtn: "📞 Call Restaurant: 01104689702",
    whatsappBranchBtn: "💬 WhatsApp Chat",

    // Branch Network Section
    branchesTitle: "Our Branch Network",
    branchesSubtitle: "10 Branches in Jeddah + 2 Branches in Makkah serving you the finest BBQ for gatherings and feasts",
    branchesScaleHighlight: "🔥 10 Branches in Jeddah & 2 Branches in Makkah",
    branchesJeddahHeading: "Jeddah Branches (10 Branches)",
    branchesMakkahHeading: "Makkah Branches (2 Branches)",
    branchObhurLabel: "Obhur Branch (Main Branch)",
    branchSamarLabel: "Al-Samar Branch",
    branchHaramainLabel: "Al-Haramain Branch",
    branchHamdaniyahLabel: "Al-Hamdaniyah Branch",
    branchSafaLabel: "Al-Safa Branch",
    branchMurjanLabel: "Al-Murjan Branch",
    branchOtherJeddahLabel: "In addition to remaining Jeddah branches",
    branchAwaliLabel: "Al-Awali Branch",
    branchZaidiLabel: "Al-Zaidi Branch",
    mainBranchTag: "Main Branch",
    contactAndOrderText: "Contact & Orders: 01104689702",
    deliveryAvailableText: "🚗 Delivery Available in Jeddah & Makkah",
    specialistsText: "🔥 Specialists in BBQ for Gatherings & Banquets",
    luxuryPresentationText: "✨ Luxurious Presentation Fitting Your Taste",

    // Google Reviews
    reviewsTitle: "Guest Experiences & Ratings",
    reviewsSubtitle: "Real verified feedback from Google Maps",
    googleVerifiedLabel: "Google Verified Review",
    reviewsPlaceholderNote: "Note: Verified reviews from our distinguished guests across Jeddah and Makkah.",

    // Floating WhatsApp
    floatingWhatsappText: "Order via WhatsApp (01104689702)",

    // Footer
    footerAbout: "Hamra Grills — Specialists in barbecue for gatherings and banquets. Luxurious presentation fitting your taste, with delivery across Jeddah and Makkah.",
    quickLinksTitle: "Quick Navigation",
    contactUsTitle: "Contact Us",
    allRightsReserved: "All Rights Reserved © Hamra Grills",

    // Toasts
    itemAddedToast: "Dish added to cart! 🛒",
    itemUpdatedToast: "Cart updated",
    itemRemovedToast: "Item removed from cart",
    cartClearedToast: "Cart has been cleared",
    fillRequiredFields: "Please complete all required fields to proceed"
  }
};

// Current language state helper
let currentLang = "ar";

function getTranslation(key) {
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
    return TRANSLATIONS[currentLang][key];
  }
  if (TRANSLATIONS.ar && TRANSLATIONS.ar[key]) {
    return TRANSLATIONS.ar[key];
  }
  return key;
}

// Export to window
if (typeof window !== "undefined") {
  window.TRANSLATIONS = TRANSLATIONS;
  window.currentLang = currentLang;
  window.t = getTranslation;
}