/**
 * Hamra Grills - Core Application Script
 * مطاعم مشويات الحمراء
 * 
 * Features: State management, live interactive catalog rendering, category filtering, instant search,
 * product customizer bottom-sheet, checkout steps, WhatsApp integration,
 * table reservation, and bilingual support.
 */

// =========================================================================
// 1. GLOBAL APPLICATION STATE
// =========================================================================
const AppState = {
  cart: [],
  selectedCategory: "all",
  searchQuery: "",
  activeOrderType: "delivery", // 'delivery' or 'pickup'
  selectedDeliveryAreaId: "area-1",
  checkoutStep: 1, // 1: Cart, 2: Method, 3: Details, 4: Summary
  customizingItem: null,
  customizingSelections: {},
  customizingQuantity: 1,
  customizingNotes: "",
  customerInfo: {
    name: "",
    phone: "",
    address: "",
    notes: ""
  },
  reservation: {
    date: "",
    time: "08:00 PM",
    guests: 4,
    section: "families",
    name: "",
    phone: "",
    specialRequests: ""
  }
};

// =========================================================================
// 2. INITIALIZATION & STORAGE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initLanguage();
  initCategories();
  renderMenu();
  renderReviews();
  initReservationDefaults();
  updateCartUI();
  setupEventListeners();
});

function initStorage() {
  try {
    const savedCart = localStorage.getItem("hamra_cart_v1");
    if (savedCart) {
      AppState.cart = JSON.parse(savedCart);
    }
    const savedCustomer = localStorage.getItem("hamra_customer_v1");
    if (savedCustomer) {
      AppState.customerInfo = { ...AppState.customerInfo, ...JSON.parse(savedCustomer) };
    }
  } catch (e) {
    console.warn("Storage access failed:", e);
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("hamra_cart_v1", JSON.stringify(AppState.cart));
  } catch (e) {
    console.warn("Cart save failed:", e);
  }
}

function saveCustomerToStorage() {
  try {
    localStorage.setItem("hamra_customer_v1", JSON.stringify(AppState.customerInfo));
  } catch (e) {
    console.warn("Customer save failed:", e);
  }
}

// =========================================================================
// 3. BILINGUAL SYSTEM (ARABIC RTL / ENGLISH LTR)
// =========================================================================
function initLanguage() {
  const savedLang = localStorage.getItem("hamra_lang_v1");
  if (savedLang === "en" || savedLang === "ar") {
    currentLang = savedLang;
  } else {
    currentLang = "ar"; // Arabic default
  }
  applyLanguage(currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("hamra_lang_v1", currentLang);
  applyLanguage(currentLang);
  initCategories();
  renderMenu();
  renderReviews();
  updateCartUI();
  showToast(currentLang === "ar" ? "تم التحويل إلى اللغة العربية" : "Switched to English", "info");
}

function applyLanguage(lang) {
  const html = document.documentElement;
  const isAr = lang === "ar";
  
  html.lang = lang;
  html.dir = isAr ? "rtl" : "ltr";

  // Body font
  if (isAr) {
    document.body.classList.remove("font-english");
    document.body.classList.add("font-arabic");
  } else {
    document.body.classList.remove("font-arabic");
    document.body.classList.add("font-english");
  }

  // Language button label
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (langToggleBtn) {
    langToggleBtn.innerHTML = `
      <span class="text-base">${t("flag")}</span>
      <span class="text-xs font-bold">${t("switchLang")}</span>
    `;
  }

  // Translate all DOM elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = t(key);
    }
  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.placeholder = t(key);
    }
  });

  // Update Dynamic Currency texts
  document.querySelectorAll(".currency-label").forEach(el => {
    el.textContent = t("currency");
  });
}

// =========================================================================
// 4. MENU & CATEGORIES RENDERING
// =========================================================================
function initCategories() {
  const container = document.getElementById("categoryTabsContainer");
  if (!container) return;

  const isAr = currentLang === "ar";
  let html = `
    <button 
      onclick="selectCategory('all')" 
      class="cat-pill flex-shrink-0 touch-target px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border border-charcoal-700 bg-charcoal-900/90 text-zinc-300 ${AppState.selectedCategory === 'all' ? 'active' : ''}"
      id="cat-tab-all"
    >
      <i class="fa-solid fa-utensils text-sm"></i>
      <span>${t("allCategories")}</span>
    </button>
  `;

  MENU_CATEGORIES.forEach(cat => {
    const isActive = AppState.selectedCategory === cat.id;
    const catName = isAr ? cat.name_ar : cat.name_en;
    html += `
      <button 
        onclick="selectCategory('${cat.id}')" 
        class="cat-pill flex-shrink-0 touch-target px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border border-charcoal-700 bg-charcoal-900/90 text-zinc-300 ${isActive ? 'active' : ''}"
        id="cat-tab-${cat.id}"
      >
        <i class="fa-solid ${cat.icon} text-sm"></i>
        <span>${catName}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

function selectCategory(catId) {
  AppState.selectedCategory = catId;
  
  // Update category pill styles
  document.querySelectorAll(".cat-pill").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`cat-tab-${catId}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    // Scroll active button into view horizontally
    activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  renderMenu();
}

function handleSearch(query) {
  AppState.searchQuery = query.trim().toLowerCase();
  renderMenu();
}

function clearSearchInput() {
  const searchInput = document.getElementById("menuSearchInput");
  if (searchInput) searchInput.value = "";
  AppState.searchQuery = "";
  renderMenu();
}

function renderMenu() {
  const container = document.getElementById("menuItemsGrid");
  if (!container) return;

  const isAr = currentLang === "ar";
  let items = MENU_ITEMS;

  // Filter by category
  if (AppState.selectedCategory !== "all") {
    items = items.filter(item => item.category === AppState.selectedCategory);
  }

  // Filter by search query
  if (AppState.searchQuery) {
    items = items.filter(item => {
      const nameAr = item.name_ar.toLowerCase();
      const nameEn = item.name_en.toLowerCase();
      const descAr = item.description_ar.toLowerCase();
      const descEn = item.description_en.toLowerCase();
      return nameAr.includes(AppState.searchQuery) ||
             nameEn.includes(AppState.searchQuery) ||
             descAr.includes(AppState.searchQuery) ||
             descEn.includes(AppState.searchQuery);
    });
  }

  // Empty state
  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 px-4 text-center bg-charcoal-900/50 rounded-3xl border border-charcoal-800">
        <div class="w-16 h-16 rounded-full bg-charcoal-800 flex items-center justify-center mx-auto mb-4 text-amber-400 text-2xl">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 class="text-base font-bold text-white mb-1">${t("noResultsTitle")}</h3>
        <p class="text-xs text-zinc-400 mb-5">${t("noResultsDesc")}</p>
        <button 
          onclick="clearSearchInput()"
          class="touch-target px-5 py-2.5 rounded-2xl bg-gold-primary hover:bg-gold-hover text-black font-black text-xs transition"
          style="background-color: var(--gold-primary);"
        >
          ${t("clearSearch")}
        </button>
      </div>
    `;
    return;
  }

  // Generate Product Cards
  let html = "";
  items.forEach(item => {
    const name = isAr ? item.name_ar : item.name_en;
    const desc = isAr ? item.description_ar : item.description_en;
    const hasOptions = item.options && item.options.length > 0;
    
    // Check if item has single size or starting price
    let priceDisplay = `${item.basePrice} ${t("currency")}`;
    if (hasOptions) {
      priceDisplay = `${isAr ? 'يبدأ من' : 'From'} ${item.basePrice} ${t("currency")}`;
    }

    // Check if any quantity of this product is in cart
    const inCartItems = AppState.cart.filter(c => c.id === item.id);
    const totalInCart = inCartItems.reduce((sum, c) => sum + c.quantity, 0);

    html += `
      <div class="product-card bg-charcoal-900/90 rounded-3xl border border-charcoal-800 overflow-hidden flex flex-col justify-between shadow-lg relative group">
        
        <!-- Top: Food Image & Badges -->
        <div class="relative aspect-[16/10] overflow-hidden bg-charcoal-950">
          <img 
            src="${item.image}" 
            alt="${name}" 
            loading="lazy"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onerror="this.onerror=null; this.src='hamra-grills-images-assets/hero_mixed_grill.webp';"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30"></div>

          <!-- Popular Badge -->
          ${item.popular ? `
            <div class="absolute top-3 right-3 rtl:right-3 rtl:left-auto left-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-black shadow-md">
                <i class="fa-solid fa-fire text-black text-[10px]"></i>
                ${t("popularBadge")}
              </span>
            </div>
          ` : ''}

          <!-- Calorie Badge -->
          ${item.calories ? `
            <div class="absolute bottom-2.5 right-3 rtl:right-3 rtl:left-auto left-3">
              <span class="calorie-badge shadow-sm">
                <i class="fa-solid fa-fire-flame-simple text-amber-400 text-[10px]"></i>
                <span>${item.calories} ${t("caloriesSuffix")}</span>
              </span>
            </div>
          ` : ''}

          <!-- In Cart Counter Badge -->
          ${totalInCart > 0 ? `
            <div class="absolute top-3 left-3 rtl:left-3 rtl:right-auto right-3 w-7 h-7 rounded-full bg-emerald-500 text-black font-black text-xs flex items-center justify-center shadow-lg border-2 border-charcoal-950">
              ${totalInCart}
            </div>
          ` : ''}
        </div>

        <!-- Middle: Product Info -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-sm sm:text-base font-black text-white mb-1.5 leading-snug group-hover:text-amber-400 transition-colors">
              ${name}
            </h4>
            <p class="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
              ${desc}
            </p>
          </div>

          <!-- Price & Action Button -->
          <div class="pt-2 border-t border-charcoal-800/80 flex items-center justify-between gap-2 mt-auto">
            <div>
              <span class="text-xs text-zinc-400 block -mb-0.5">${isAr ? 'السعر' : 'Price'}</span>
              <span class="text-sm sm:text-base font-black text-amber-400">
                ${priceDisplay}
              </span>
            </div>

            <button 
              onclick="openProductModal('${item.id}')"
              class="touch-target px-3.5 py-2 rounded-2xl bg-charcoal-800 hover:bg-gold-primary hover:text-black text-zinc-100 text-xs font-bold border border-charcoal-700/80 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
              style="--hover-bg: var(--gold-primary);"
              aria-label="${name}"
            >
              <i class="fa-solid ${hasOptions ? 'fa-sliders' : 'fa-plus'} text-xs text-amber-400"></i>
              <span>${hasOptions ? t("customizeBtn") : t("addToCart")}</span>
            </button>
          </div>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

// =========================================================================
// 5. PRODUCT CUSTOMIZATION BOTTOM SHEET / MODAL
// =========================================================================
function openProductModal(itemId) {
  const item = getMenuItemById(itemId);
  if (!item) return;

  AppState.customizingItem = item;
  AppState.customizingQuantity = 1;
  AppState.customizingSelections = {};
  AppState.customizingNotes = "";

  // Initialize default selections for required options
  if (item.options && item.options.length > 0) {
    item.options.forEach(opt => {
      if (opt.type === "single" && opt.values && opt.values.length > 0) {
        // Select first value by default
        AppState.customizingSelections[opt.id] = opt.values[0].id;
      } else if (opt.type === "multiple") {
        AppState.customizingSelections[opt.id] = [];
      }
    });
  }

  renderCustomizationContent();

  const modal = document.getElementById("productCustomizerModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (modal && backdrop) {
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      modal.classList.remove("sheet-closed");
      modal.classList.add("sheet-open");
    }, 10);
    document.body.classList.add("overflow-hidden");
  }
}

function closeProductModal() {
  const modal = document.getElementById("productCustomizerModal");
  const backdrop = document.getElementById("modalBackdrop");
  if (modal && backdrop) {
    modal.classList.remove("sheet-open");
    modal.classList.add("sheet-closed");
    backdrop.classList.add("opacity-0");
    setTimeout(() => {
      backdrop.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }, 300);
  }
}

function calculateCustomizedPrice() {
  const item = AppState.customizingItem;
  if (!item) return 0;

  let unitPrice = item.basePrice;

  if (item.options && item.options.length > 0) {
    item.options.forEach(opt => {
      if (opt.type === "single") {
        const selectedValId = AppState.customizingSelections[opt.id];
        const val = opt.values.find(v => v.id === selectedValId);
        if (val) {
          if (typeof val.price === "number") {
            unitPrice = val.price; // Replaces base price
          } else if (typeof val.priceDelta === "number") {
            unitPrice += val.priceDelta;
          }
        }
      } else if (opt.type === "multiple") {
        const selectedValIds = AppState.customizingSelections[opt.id] || [];
        selectedValIds.forEach(valId => {
          const val = opt.values.find(v => v.id === valId);
          if (val && typeof val.priceDelta === "number") {
            unitPrice += val.priceDelta;
          }
        });
      }
    });
  }

  return unitPrice * AppState.customizingQuantity;
}

function updateCustomizerLivePrice() {
  const total = calculateCustomizedPrice();
  const priceEl = document.getElementById("customizerTotalPrice");
  if (priceEl) {
    priceEl.textContent = `${total} ${t("currency")}`;
  }
}

function setSingleOption(optId, valId) {
  AppState.customizingSelections[optId] = valId;
  renderCustomizationContent();
}

function toggleMultipleOption(optId, valId) {
  if (!AppState.customizingSelections[optId]) {
    AppState.customizingSelections[optId] = [];
  }
  const index = AppState.customizingSelections[optId].indexOf(valId);
  if (index > -1) {
    AppState.customizingSelections[optId].splice(index, 1);
  } else {
    AppState.customizingSelections[optId].push(valId);
  }
  renderCustomizationContent();
}

function changeCustomizingQty(delta) {
  const newQty = AppState.customizingQuantity + delta;
  if (newQty >= 1 && newQty <= 50) {
    AppState.customizingQuantity = newQty;
    const qtyEl = document.getElementById("customizerQtyCount");
    if (qtyEl) qtyEl.textContent = newQty;
    updateCustomizerLivePrice();
  }
}

function renderCustomizationContent() {
  const container = document.getElementById("customizerContent");
  if (!container || !AppState.customizingItem) return;

  const item = AppState.customizingItem;
  const isAr = currentLang === "ar";
  const name = isAr ? item.name_ar : item.name_en;
  const desc = isAr ? item.description_ar : item.description_en;

  let optionsHtml = "";

  if (item.options && item.options.length > 0) {
    item.options.forEach(opt => {
      const optName = isAr ? opt.name_ar : opt.name_en;
      const isSingle = opt.type === "single";

      optionsHtml += `
        <div class="mb-5 pb-5 border-b border-charcoal-800/80 last:border-0 last:pb-0 last:mb-0">
          <div class="flex items-center justify-between mb-2.5">
            <span class="text-xs sm:text-sm font-black text-white">${optName}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full ${opt.required ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold' : 'bg-charcoal-800 text-zinc-400'}">
              ${opt.required ? t("selectRequired") : t("selectOptional")}
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      `;

      opt.values.forEach(val => {
        const valLabel = isAr ? val.label_ar : val.label_en;
        let isSelected = false;
        let priceTag = "";

        if (isSingle) {
          isSelected = AppState.customizingSelections[opt.id] === val.id;
          if (typeof val.price === "number") {
            priceTag = `${val.price} ${t("currency")}`;
          } else if (val.priceDelta) {
            priceTag = `+${val.priceDelta} ${t("currency")}`;
          }
        } else {
          isSelected = (AppState.customizingSelections[opt.id] || []).includes(val.id);
          if (val.priceDelta) {
            priceTag = `+${val.priceDelta} ${t("currency")}`;
          }
        }

        const clickHandler = isSingle 
          ? `setSingleOption('${opt.id}', '${val.id}')`
          : `toggleMultipleOption('${opt.id}', '${val.id}')`;

        optionsHtml += `
          <button 
            type="button"
            onclick="${clickHandler}"
            class="touch-target p-3 rounded-2xl border text-start flex items-center justify-between gap-3 transition-all ${
              isSelected 
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm' 
                : 'bg-charcoal-900 border-charcoal-800 text-zinc-300 hover:border-charcoal-700'
            }"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'border-amber-400 bg-amber-400 text-black' : 'border-zinc-600'
              }">
                ${isSelected ? '<i class="fa-solid fa-check text-[10px]"></i>' : ''}
              </div>
              <span class="text-xs font-bold truncate">${valLabel}</span>
            </div>
            ${priceTag ? `<span class="text-xs font-black text-amber-400 flex-shrink-0">${priceTag}</span>` : ''}
          </button>
        `;
      });

      optionsHtml += `</div></div>`;
    });
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
      
      <!-- Column 1 (Desktop: 5 cols): Food Image Showcase & Highlights -->
      <div class="md:col-span-5 md:sticky md:top-0 space-y-3.5">
        <div class="relative -mx-4 -mt-4 md:mx-0 md:mt-0 h-48 sm:h-56 md:h-64 rounded-none md:rounded-2xl overflow-hidden bg-charcoal-950 border border-charcoal-800 shadow-md">
          <img 
            src="${item.image}" 
            alt="${name}" 
            class="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='hamra-grills-images-assets/hero_mixed_grill.webp';"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent"></div>
          
          <!-- Close Button on Mobile -->
          <button 
            onclick="closeProductModal()"
            class="md:hidden touch-target absolute top-3 right-3 rtl:right-auto rtl:left-3 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-amber-400 flex items-center justify-center transition border border-white/20"
            aria-label="إغلاق"
          >
            <i class="fa-solid fa-xmark text-base"></i>
          </button>

          <div class="absolute bottom-3 right-3 rtl:right-3 rtl:left-auto left-3">
            <h3 class="text-base sm:text-lg md:text-xl font-black text-white">${name}</h3>
            ${item.calories ? `
              <span class="calorie-badge mt-1 shadow">
                <i class="fa-solid fa-fire text-amber-400 text-xs"></i>
                ${item.calories} ${t("caloriesSuffix")}
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Description & Saudi Heritage Quality Note -->
        <div class="bg-charcoal-900/60 p-3.5 rounded-2xl border border-charcoal-800 text-xs text-zinc-300 leading-relaxed">
          <p class="mb-2.5">${desc}</p>
          <div class="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-bold pt-2 border-t border-charcoal-800">
            <i class="fa-solid fa-shield-halved text-xs"></i>
            <span>${isAr ? 'شواء طازج 100% ولحوم بلدية مختارة' : '100% Fresh Charcoal Grilling & Selected Meats'}</span>
          </div>
        </div>
      </div>

      <!-- Column 2 (Desktop: 7 cols): Modifiers, Special Notes, Stepper -->
      <div class="md:col-span-7 space-y-4">
        <div class="hidden md:flex items-center justify-between pb-3 border-b border-charcoal-800">
          <div>
            <h4 class="text-base font-black text-white">${name}</h4>
            <span class="text-xs text-amber-400 font-bold">${isAr ? 'تخصيص الخيارات والإضافات' : 'Customize options & extras'}</span>
          </div>
          <button 
            onclick="closeProductModal()" 
            class="w-9 h-9 rounded-full bg-charcoal-900 border border-charcoal-800 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- Options Groups -->
        ${optionsHtml}

        <!-- Special Instructions / Notes -->
        <div class="pt-1">
          <label class="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-1.5">
            <i class="fa-regular fa-comment-dots text-amber-400"></i>
            <span>${t("customerNotesLabel")}</span>
          </label>
          <textarea 
            id="customizerNotesInput"
            rows="2"
            placeholder="${t("customerNotesPlaceholder")}"
            oninput="AppState.customizingNotes = this.value"
            class="w-full bg-charcoal-900 border border-charcoal-800 rounded-2xl p-3 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition resize-none"
          >${AppState.customizingNotes}</textarea>
        </div>
      </div>

    </div>
  `;

  // Update Footer Quantity & Price
  const qtyEl = document.getElementById("customizerQtyCount");
  if (qtyEl) qtyEl.textContent = AppState.customizingQuantity;
  updateCustomizerLivePrice();
}

function addCustomizedProductToCart() {
  const item = AppState.customizingItem;
  if (!item) return;

  const isAr = currentLang === "ar";
  let unitPrice = item.basePrice;
  const selectedOptionsSummary = [];

  if (item.options && item.options.length > 0) {
    item.options.forEach(opt => {
      const optName = isAr ? opt.name_ar : opt.name_en;
      if (opt.type === "single") {
        const valId = AppState.customizingSelections[opt.id];
        const val = opt.values.find(v => v.id === valId);
        if (val) {
          if (typeof val.price === "number") unitPrice = val.price;
          else if (val.priceDelta) unitPrice += val.priceDelta;
          const valLabel = isAr ? val.label_ar : val.label_en;
          selectedOptionsSummary.push(`${optName}: ${valLabel}`);
        }
      } else if (opt.type === "multiple") {
        const valIds = AppState.customizingSelections[opt.id] || [];
        valIds.forEach(vid => {
          const val = opt.values.find(v => v.id === vid);
          if (val) {
            if (val.priceDelta) unitPrice += val.priceDelta;
            const valLabel = isAr ? val.label_ar : val.label_en;
            selectedOptionsSummary.push(`${valLabel}`);
          }
        });
      }
    });
  }

  // Create unique signature to group identical customizations
  const uniqueKey = `${item.id}-${selectedOptionsSummary.sort().join('|')}-${AppState.customizingNotes.trim()}`;

  const existingIndex = AppState.cart.findIndex(c => c.uniqueKey === uniqueKey);
  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += AppState.customizingQuantity;
  } else {
    AppState.cart.push({
      uniqueKey: uniqueKey,
      id: item.id,
      name_ar: item.name_ar,
      name_en: item.name_en,
      image: item.image,
      unitPrice: unitPrice,
      quantity: AppState.customizingQuantity,
      optionsSummary: selectedOptionsSummary,
      notes: AppState.customizingNotes.trim()
    });
  }

  saveCartToStorage();
  updateCartUI();
  renderMenu(); // Updates in-cart badges on catalog
  closeProductModal();
  showToast(t("itemAddedToast"), "success");
}

// =========================================================================
// 6. CART MANAGEMENT & STICKY CART BAR
// =========================================================================
function updateCartItemQuantity(uniqueKey, delta) {
  const itemIndex = AppState.cart.findIndex(c => c.uniqueKey === uniqueKey);
  if (itemIndex === -1) return;

  const newQty = AppState.cart[itemIndex].quantity + delta;
  if (newQty <= 0) {
    AppState.cart.splice(itemIndex, 1);
    showToast(t("itemRemovedToast"), "info");
  } else {
    AppState.cart[itemIndex].quantity = newQty;
  }

  saveCartToStorage();
  updateCartUI();
  renderMenu();
}

function clearCart() {
  AppState.cart = [];
  saveCartToStorage();
  updateCartUI();
  renderMenu();
  showToast(t("cartClearedToast"), "info");
}

function calculateSubtotal() {
  return AppState.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
}

function calculateDeliveryFee(order) {
  if (AppState.activeOrderType === "pickup") return 0;
  
  const subtotal = calculateSubtotal();
  // Free delivery for orders above threshold
  if (restaurantConfig.delivery.freeDeliveryThreshold && subtotal >= restaurantConfig.delivery.freeDeliveryThreshold) {
    return 0;
  }

  const selectedArea = restaurantConfig.delivery.serviceAreas.find(a => a.id === AppState.selectedDeliveryAreaId);
  return selectedArea ? selectedArea.fee : restaurantConfig.delivery.baseFee;
}

function calculateTotal() {
  const subtotal = calculateSubtotal();
  if (subtotal === 0) return 0;
  const delivery = calculateDeliveryFee();
  return subtotal + delivery;
}

function updateCartUI() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  // 1. Top Header Cart Badge
  const headerBadges = document.querySelectorAll(".cart-count-badge");
  headerBadges.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });

  // Desktop Header Cart Total & Count Pill
  const desktopCartTotalEl = document.getElementById("desktopHeaderCartTotal");
  if (desktopCartTotalEl) {
    desktopCartTotalEl.textContent = totalCount > 0 ? `${total} ${t("currency")}` : '';
  }

  // 2. Sticky Bottom Cart Bar
  const stickyCart = document.getElementById("stickyCartBar");
  if (stickyCart) {
    if (totalCount > 0) {
      stickyCart.classList.remove("cart-bar-hidden");
      stickyCart.classList.add("cart-bar-visible");
      document.body.classList.add("has-sticky-cart");
      
      const stickyCountEl = document.getElementById("stickyCartCount");
      const stickyTotalEl = document.getElementById("stickyCartTotal");
      if (stickyCountEl) stickyCountEl.textContent = `${totalCount} ${t("stickyCartItems")}`;
      if (stickyTotalEl) stickyTotalEl.textContent = `${total} ${t("currency")}`;
    } else {
      stickyCart.classList.remove("cart-bar-visible");
      stickyCart.classList.add("cart-bar-hidden");
      document.body.classList.remove("has-sticky-cart");
    }
  }

  // 3. Render Cart Drawer if open
  renderCartDrawer();
}

function openCart() {
  AppState.checkoutStep = 1;
  renderCartDrawer();

  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer && backdrop) {
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      drawer.classList.remove("sheet-closed");
      drawer.classList.add("sheet-open");
    }, 10);
    document.body.classList.add("overflow-hidden");
  }
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("sheet-open");
    drawer.classList.add("sheet-closed");
    backdrop.classList.add("opacity-0");
    setTimeout(() => {
      backdrop.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }, 300);
  }
}

function renderCartDrawer() {
  const bodyContainer = document.getElementById("cartDrawerBody");
  const footerContainer = document.getElementById("cartDrawerFooter");
  if (!bodyContainer || !footerContainer) return;

  const isAr = currentLang === "ar";
  const subtotal = calculateSubtotal();
  const deliveryFee = calculateDeliveryFee();
  const total = calculateTotal();

  // If cart is empty
  if (AppState.cart.length === 0) {
    bodyContainer.innerHTML = `
      <div class="py-16 px-4 text-center">
        <div class="w-20 h-20 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center mx-auto mb-4 text-3xl text-amber-400">
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <h3 class="text-base font-black text-white mb-2">${t("emptyCartTitle")}</h3>
        <p class="text-xs text-zinc-400 max-w-xs mx-auto mb-6 leading-relaxed">${t("emptyCartDesc")}</p>
        <button 
          onclick="closeCart(); document.getElementById('menu').scrollIntoView({behavior: 'smooth'});"
          class="touch-target px-6 py-3 rounded-2xl font-black text-xs text-black transition active:scale-95 shadow-lg"
          style="background-color: var(--gold-primary);"
        >
          ${t("browseMenuBtn")}
        </button>
      </div>
    `;
    footerContainer.innerHTML = "";
    return;
  }

  const isDesktop = window.innerWidth >= 768;
  const drawerEl = document.getElementById("cartDrawer");
  if (drawerEl) {
    if (isDesktop && AppState.checkoutStep >= 2) {
      drawerEl.classList.add("desktop-wide");
    } else {
      drawerEl.classList.remove("desktop-wide");
    }
  }

  // DESKTOP UNIFIED 2-COLUMN CHECKOUT EXPERIENCE (≥ 768px)
  if (isDesktop && AppState.checkoutStep >= 2) {
    const isDelivery = AppState.activeOrderType === "delivery";
    let areasOptions = "";
    restaurantConfig.delivery.serviceAreas.forEach(area => {
      const areaName = isAr ? area.nameAr : area.nameEn;
      const isSelected = AppState.selectedDeliveryAreaId === area.id;
      areasOptions += `<option value="${area.id}" ${isSelected ? 'selected' : ''}>${areaName} (${area.fee} ${t("currency")})</option>`;
    });

    let orderItemsSummaryHtml = "";
    AppState.cart.forEach(item => {
      const name = isAr ? item.name_ar : item.name_en;
      orderItemsSummaryHtml += `
        <div class="py-2 border-b border-charcoal-800/60 last:border-0 flex justify-between text-xs">
          <div>
            <span class="font-bold text-white">${item.quantity} × ${name}</span>
            ${item.optionsSummary && item.optionsSummary.length > 0 ? `<div class="text-[10px] text-zinc-400">${item.optionsSummary.join(" · ")}</div>` : ''}
          </div>
          <span class="font-bold text-amber-400 flex-shrink-0">${item.unitPrice * item.quantity} ${t("currency")}</span>
        </div>
      `;
    });

    bodyContainer.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        <!-- Left Column (7 cols): Customer & Delivery Information -->
        <div class="md:col-span-7 space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-charcoal-800">
            <span class="text-xs font-bold text-zinc-400">${isAr ? 'بيانات الاستلام والتوصيل' : 'Fulfillment & Delivery Details'}</span>
            <button onclick="setCheckoutStep(1)" class="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold">
              <i class="fa-solid fa-arrow-right rtl:rotate-0 rotate-180 text-[10px]"></i>
              <span>${isAr ? 'تعديل السلة' : 'Edit Cart'}</span>
            </button>
          </div>

          <!-- Order Type Toggle -->
          <div class="grid grid-cols-2 gap-2 bg-charcoal-900 p-1.5 rounded-2xl border border-charcoal-800">
            <button onclick="setOrderType('delivery')" class="touch-target rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${isDelivery ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'}">
              <span>${t("deliveryType")}</span>
            </button>
            <button onclick="setOrderType('pickup')" class="touch-target rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${!isDelivery ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'}">
              <span>${t("pickupType")}</span>
            </button>
          </div>

          <!-- Customer Contact Details -->
          <div class="bg-charcoal-900/60 p-4 rounded-2xl border border-charcoal-800 space-y-3">
            <h5 class="text-xs font-bold text-white flex items-center gap-2">
              <i class="fa-regular fa-user text-amber-400"></i>
              <span>${isAr ? 'بيانات العميل' : 'Customer Info'}</span>
            </h5>
            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="block text-[11px] text-zinc-400 mb-1">${t("customerName")} *</label>
                <input type="text" id="checkoutCustomerName" value="${AppState.customerInfo.name}" oninput="AppState.customerInfo.name = this.value; saveCustomerToStorage();" placeholder="${isAr ? 'الاسم الكريم' : 'Your Name'}" class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
              <div>
                <label class="block text-[11px] text-zinc-400 mb-1">${t("customerPhone")} *</label>
                <input type="tel" id="checkoutCustomerPhone" value="${AppState.customerInfo.phone}" oninput="AppState.customerInfo.phone = this.value; saveCustomerToStorage();" placeholder="${t("phonePlaceholder")}" dir="ltr" class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white font-mono text-start focus:border-amber-400 focus:outline-none" />
              </div>
            </div>
          </div>

          <!-- Delivery Address or Branch Details -->
          ${isDelivery ? `
            <div class="bg-charcoal-900/60 p-4 rounded-2xl border border-charcoal-800 space-y-3">
              <h5 class="text-xs font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-location-dot text-amber-400"></i>
                <span>${t("deliveryInfo")}</span>
              </h5>
              <div>
                <label class="block text-[11px] text-zinc-400 mb-1">${t("deliveryArea")}</label>
                <select id="checkoutDeliveryArea" onchange="handleDeliveryAreaChange(this.value)" class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none">
                  ${areasOptions}
                </select>
              </div>
              <div>
                <label class="block text-[11px] text-zinc-400 mb-1">${t("streetDetails")} *</label>
                <input type="text" id="checkoutStreetDetails" value="${AppState.customerInfo.address}" oninput="AppState.customerInfo.address = this.value; saveCustomerToStorage();" placeholder="${isAr ? 'الشارع، رقم المبنى، الحي...' : 'Street name, building #, district...'}" class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
              <div>
                <label class="block text-[11px] text-zinc-400 mb-1">${t("deliveryNotes")}</label>
                <input type="text" id="checkoutDeliveryNotes" value="${AppState.customerInfo.notes}" oninput="AppState.customerInfo.notes = this.value; saveCustomerToStorage();" placeholder="${t("deliveryNotesPlaceholder")}" class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
            </div>
          ` : `
            <div class="bg-charcoal-900/60 p-4 rounded-2xl border border-charcoal-800 space-y-2 text-xs">
              <h5 class="text-xs font-bold text-white flex items-center gap-2">
                <i class="fa-solid fa-store text-amber-400"></i>
                <span>${t("pickupInfo")}</span>
              </h5>
              <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800">
                <div class="font-black text-amber-400 mb-1">${isAr ? restaurantConfig.branches[0].nameAr : restaurantConfig.branches[0].nameEn}</div>
                <div class="text-zinc-400 text-[11px]">${isAr ? restaurantConfig.branches[0].addressAr : restaurantConfig.branches[0].addressEn}</div>
              </div>
            </div>
          `}
        </div>

        <!-- Right Column (5 cols): Sticky Order Summary & Direct WhatsApp Action -->
        <div class="md:col-span-5 md:sticky md:top-0 space-y-3.5">
          <div class="p-4 bg-charcoal-900 rounded-2xl border border-charcoal-800">
            <h6 class="text-xs font-black text-white mb-2 pb-1.5 border-b border-charcoal-800">
              ${isAr ? 'ملخص الطلب النهائي' : 'Order Summary'}
            </h6>
            <div class="max-h-56 overflow-y-auto thin-scrollbar space-y-1">
              ${orderItemsSummaryHtml}
            </div>
          </div>

          <div class="p-4 bg-charcoal-950 rounded-2xl border border-charcoal-800 text-xs space-y-2">
            <div class="flex justify-between text-zinc-400">
              <span>${t("subtotal")}</span>
              <span class="font-bold text-white">${subtotal} ${t("currency")}</span>
            </div>
            <div class="flex justify-between text-zinc-400">
              <span>${t("deliveryFee")}</span>
              <span class="font-bold ${deliveryFee === 0 ? 'text-emerald-400' : 'text-white'}">
                ${deliveryFee === 0 ? t("freeDelivery") : `${deliveryFee} ${t("currency")}`}
              </span>
            </div>
            <div class="pt-2 border-t border-charcoal-800 flex justify-between text-sm font-black text-white">
              <span>${t("orderTotal")}</span>
              <span class="text-amber-400 text-base">${total} ${t("currency")}</span>
            </div>
          </div>

          <button 
            onclick="validateAndSubmitDirect()" 
            class="touch-target-lg w-full rounded-2xl font-black text-sm text-black flex items-center justify-center gap-2.5 transition active:scale-95 shadow-2xl bg-emerald-500 hover:bg-emerald-400"
            style="background-color: #25D366;"
          >
            <i class="fa-brands fa-whatsapp text-lg"></i>
            <span>${t("confirmOrderWhatsApp")}</span>
          </button>
        </div>

      </div>
    `;

    footerContainer.innerHTML = "";
    return;
  }

  // Multi-step Checkout Content (Mobile Linear Flow)
  if (AppState.checkoutStep === 1) {
    // Step 1: Review Cart Items
    let itemsHtml = "";
    AppState.cart.forEach(item => {
      const name = isAr ? item.name_ar : item.name_en;
      itemsHtml += `
        <div class="p-3.5 bg-charcoal-900/90 rounded-2xl border border-charcoal-800 flex items-start gap-3 relative">
          <img 
            src="${item.image}" 
            alt="${name}" 
            class="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-charcoal-950"
            onerror="this.onerror=null; this.src='hamra-grills-images-assets/hero_mixed_grill.webp';"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-xs sm:text-sm font-black text-white truncate">${name}</h4>
              <span class="text-xs font-black text-amber-400 flex-shrink-0">${item.unitPrice * item.quantity} ${t("currency")}</span>
            </div>

            <!-- Options summary -->
            ${item.optionsSummary && item.optionsSummary.length > 0 ? `
              <div class="text-[10px] text-zinc-400 mt-1 leading-snug">
                ${item.optionsSummary.join(" • ")}
              </div>
            ` : ''}

            <!-- Special notes -->
            ${item.notes ? `
              <div class="text-[10px] text-amber-400/90 italic mt-0.5">
                <i class="fa-regular fa-comment text-[9px]"></i> ${item.notes}
              </div>
            ` : ''}

            <!-- Quantity Controls -->
            <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-charcoal-800">
              <span class="text-[11px] text-zinc-400">${item.unitPrice} ${t("currency")} / ${isAr ? 'حبة' : 'pc'}</span>
              <div class="flex items-center gap-2 bg-charcoal-950 px-2 py-1 rounded-xl border border-charcoal-800">
                <button 
                  onclick="updateCartItemQuantity('${item.uniqueKey}', -1)" 
                  class="w-6 h-6 rounded-lg bg-charcoal-800 text-zinc-300 hover:text-white flex items-center justify-center text-xs"
                >
                  <i class="fa-solid fa-minus text-[10px]"></i>
                </button>
                <span class="text-xs font-black text-white w-4 text-center">${item.quantity}</span>
                <button 
                  onclick="updateCartItemQuantity('${item.uniqueKey}', 1)" 
                  class="w-6 h-6 rounded-lg bg-amber-500 text-black flex items-center justify-center text-xs"
                >
                  <i class="fa-solid fa-plus text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    bodyContainer.innerHTML = `
      <div class="space-y-3 mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-zinc-400">${t("checkoutStep1")}</span>
          <button onclick="clearCart()" class="text-xs text-rose-400 hover:underline flex items-center gap-1">
            <i class="fa-regular fa-trash-can text-[10px]"></i>
            ${t("clearCart")}
          </button>
        </div>
        ${itemsHtml}
      </div>
    `;

    footerContainer.innerHTML = `
      <div class="space-y-2 pt-2 border-t border-charcoal-800 mb-3 text-xs">
        <div class="flex justify-between text-zinc-400">
          <span>${t("subtotal")}</span>
          <span class="font-bold text-white">${subtotal} ${t("currency")}</span>
        </div>
      </div>
      <button 
        onclick="setCheckoutStep(2)" 
        class="touch-target-lg w-full rounded-2xl font-black text-sm text-black flex items-center justify-center gap-2 transition active:scale-95 shadow-xl"
        style="background-color: var(--gold-primary);"
      >
        <span>${t("nextStep")}</span>
        <i class="fa-solid fa-arrow-left rtl:rotate-0 rotate-180 text-xs"></i>
      </button>
    `;

  } else if (AppState.checkoutStep === 2) {
    // Step 2: Delivery or Pickup
    const isDelivery = AppState.activeOrderType === "delivery";
    
    let areasOptions = "";
    restaurantConfig.delivery.serviceAreas.forEach(area => {
      const areaName = isAr ? area.nameAr : area.nameEn;
      const isSelected = AppState.selectedDeliveryAreaId === area.id;
      areasOptions += `
        <option value="${area.id}" ${isSelected ? 'selected' : ''}>
          ${areaName} (${area.fee} ${t("currency")})
        </option>
      `;
    });

    bodyContainer.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-bold text-zinc-400 mb-1">${t("checkoutStep2")}</div>

        <!-- Order Type Toggle -->
        <div class="grid grid-cols-2 gap-2 bg-charcoal-900 p-1.5 rounded-2xl border border-charcoal-800">
          <button 
            onclick="setOrderType('delivery')"
            class="touch-target rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              isDelivery 
                ? 'bg-amber-500 text-black shadow' 
                : 'text-zinc-400 hover:text-white'
            }"
          >
            <span>${t("deliveryType")}</span>
          </button>
          <button 
            onclick="setOrderType('pickup')"
            class="touch-target rounded-xl text-xs font-black transition flex items-center justify-center gap-2 ${
              !isDelivery 
                ? 'bg-amber-500 text-black shadow' 
                : 'text-zinc-400 hover:text-white'
            }"
          >
            <span>${t("pickupType")}</span>
          </button>
        </div>

        <!-- Form depending on order type -->
        ${isDelivery ? `
          <div class="bg-charcoal-900/60 p-4 rounded-2xl border border-charcoal-800 space-y-3">
            <h5 class="text-xs font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-location-dot text-amber-400"></i>
              ${t("deliveryInfo")}
            </h5>

            <div>
              <label class="block text-[11px] text-zinc-400 mb-1">${t("deliveryArea")}</label>
              <select 
                id="checkoutDeliveryArea" 
                onchange="handleDeliveryAreaChange(this.value)"
                class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              >
                ${areasOptions}
              </select>
            </div>

            <div>
              <label class="block text-[11px] text-zinc-400 mb-1">${t("streetDetails")} *</label>
              <input 
                type="text" 
                id="checkoutStreetDetails"
                value="${AppState.customerInfo.address}"
                oninput="AppState.customerInfo.address = this.value; saveCustomerToStorage();"
                placeholder="${isAr ? 'الشارع، رقم المبنى، الحي...' : 'Street name, building #, district...'}"
                class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[11px] text-zinc-400 mb-1">${t("deliveryNotes")}</label>
              <input 
                type="text" 
                id="checkoutDeliveryNotes"
                value="${AppState.customerInfo.notes}"
                oninput="AppState.customerInfo.notes = this.value; saveCustomerToStorage();"
                placeholder="${t("deliveryNotesPlaceholder")}"
                class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div class="text-[11px] text-amber-400 flex items-center gap-1.5 pt-1">
              <i class="fa-regular fa-clock"></i>
              <span>${t("estimatedTime")}: ${isAr ? restaurantConfig.delivery.estimatedTimeAr : restaurantConfig.delivery.estimatedTimeEn}</span>
            </div>
          </div>
        ` : `
          <div class="bg-charcoal-900/60 p-4 rounded-2xl border border-charcoal-800 space-y-3">
            <h5 class="text-xs font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-store text-amber-400"></i>
              ${t("pickupInfo")}
            </h5>
            <div class="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs">
              <div class="font-black text-amber-400 mb-1">${isAr ? restaurantConfig.branches[0].nameAr : restaurantConfig.branches[0].nameEn}</div>
              <div class="text-zinc-400 text-[11px] mb-2">${isAr ? restaurantConfig.branches[0].addressAr : restaurantConfig.branches[0].addressEn}</div>
              <div class="text-[11px] text-emerald-400 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>${t("estimatedTime")}: ${isAr ? restaurantConfig.pickup.estimatedTimeAr : restaurantConfig.pickup.estimatedTimeEn}</span>
              </div>
            </div>
          </div>
        `}
      </div>
    `;

    footerContainer.innerHTML = `
      <div class="flex gap-2">
        <button 
          onclick="setCheckoutStep(1)" 
          class="touch-target px-4 rounded-2xl bg-charcoal-800 text-zinc-300 font-bold text-xs"
        >
          ${t("prevStep")}
        </button>
        <button 
          onclick="setCheckoutStep(3)" 
          class="touch-target-lg flex-1 rounded-2xl font-black text-sm text-black flex items-center justify-center gap-2 transition active:scale-95 shadow-xl"
          style="background-color: var(--gold-primary);"
        >
          <span>${t("nextStep")}</span>
          <i class="fa-solid fa-arrow-left rtl:rotate-0 rotate-180 text-xs"></i>
        </button>
      </div>
    `;

  } else if (AppState.checkoutStep === 3) {
    // Step 3: Customer Information
    bodyContainer.innerHTML = `
      <div class="space-y-4">
        <div class="text-xs font-bold text-zinc-400 mb-1">${t("checkoutStep3")}</div>

        <div class="bg-charcoal-900/60 p-4 rounded-2xl border border-charcoal-800 space-y-3.5">
          <div>
            <label class="block text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
              <i class="fa-regular fa-user text-amber-400"></i>
              ${t("customerName")} *
            </label>
            <input 
              type="text" 
              id="checkoutCustomerName"
              value="${AppState.customerInfo.name}"
              oninput="AppState.customerInfo.name = this.value; saveCustomerToStorage();"
              placeholder="${isAr ? 'الاسم الكريم' : 'Your Full Name'}"
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-3 text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
              <i class="fa-brands fa-whatsapp text-emerald-400"></i>
              ${t("customerPhone")} *
            </label>
            <input 
              type="tel" 
              id="checkoutCustomerPhone"
              value="${AppState.customerInfo.phone}"
              oninput="AppState.customerInfo.phone = this.value; saveCustomerToStorage();"
              placeholder="${t("phonePlaceholder")}"
              dir="ltr"
              class="w-full bg-charcoal-950 border border-charcoal-800 rounded-xl p-3 text-xs text-white text-start focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>
    `;

    footerContainer.innerHTML = `
      <div class="flex gap-2">
        <button 
          onclick="setCheckoutStep(2)" 
          class="touch-target px-4 rounded-2xl bg-charcoal-800 text-zinc-300 font-bold text-xs"
        >
          ${t("prevStep")}
        </button>
        <button 
          onclick="validateAndGoToSummary()" 
          class="touch-target-lg flex-1 rounded-2xl font-black text-sm text-black flex items-center justify-center gap-2 transition active:scale-95 shadow-xl"
          style="background-color: var(--gold-primary);"
        >
          <span>${t("nextStep")}</span>
          <i class="fa-solid fa-arrow-left rtl:rotate-0 rotate-180 text-xs"></i>
        </button>
      </div>
    `;

  } else if (AppState.checkoutStep === 4) {
    // Step 4: Final Summary & WhatsApp Confirmation CTA
    const isDelivery = AppState.activeOrderType === "delivery";

    let orderItemsSummaryHtml = "";
    AppState.cart.forEach(item => {
      const name = isAr ? item.name_ar : item.name_en;
      orderItemsSummaryHtml += `
        <div class="py-2 border-b border-charcoal-800/60 last:border-0 flex justify-between text-xs">
          <div>
            <span class="font-bold text-white">${item.quantity} × ${name}</span>
            ${item.optionsSummary && item.optionsSummary.length > 0 ? `
              <div class="text-[10px] text-zinc-400">${item.optionsSummary.join(" · ")}</div>
            ` : ''}
          </div>
          <span class="font-bold text-amber-400 flex-shrink-0">${item.unitPrice * item.quantity} ${t("currency")}</span>
        </div>
      `;
    });

    bodyContainer.innerHTML = `
      <div class="space-y-3.5">
        <div class="text-xs font-bold text-zinc-400">${t("checkoutStep4")}</div>

        <!-- Customer & Fulfillment Card -->
        <div class="p-3.5 bg-charcoal-900 rounded-2xl border border-charcoal-800 text-xs space-y-2">
          <div class="flex justify-between">
            <span class="text-zinc-400">${t("customerName")}:</span>
            <span class="font-bold text-white">${AppState.customerInfo.name}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">${t("customerPhone")}:</span>
            <span class="font-bold text-white font-mono" dir="ltr">${AppState.customerInfo.phone}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-400">${t("orderTypeTitle")}:</span>
            <span class="font-bold text-amber-400">${isDelivery ? t("deliveryType") : t("pickupType")}</span>
          </div>
          ${isDelivery ? `
            <div class="flex justify-between">
              <span class="text-zinc-400">${t("streetDetails")}:</span>
              <span class="font-bold text-white truncate max-w-[200px]">${AppState.customerInfo.address}</span>
            </div>
          ` : ''}
        </div>

        <!-- Order Items Breakdown -->
        <div class="p-3.5 bg-charcoal-900 rounded-2xl border border-charcoal-800">
          <h6 class="text-xs font-black text-white mb-2 pb-1.5 border-b border-charcoal-800">
            ${isAr ? 'تفاصيل الأطباق المطلوبة' : 'Ordered Items'}
          </h6>
          ${orderItemsSummaryHtml}
        </div>

        <!-- Financial Summary -->
        <div class="p-3.5 bg-charcoal-950 rounded-2xl border border-charcoal-800 text-xs space-y-2">
          <div class="flex justify-between text-zinc-400">
            <span>${t("subtotal")}</span>
            <span class="font-bold text-white">${subtotal} ${t("currency")}</span>
          </div>
          <div class="flex justify-between text-zinc-400">
            <span>${t("deliveryFee")}</span>
            <span class="font-bold ${deliveryFee === 0 ? 'text-emerald-400' : 'text-white'}">
              ${deliveryFee === 0 ? t("freeDelivery") : `${deliveryFee} ${t("currency")}`}
            </span>
          </div>
          <div class="pt-2 border-t border-charcoal-800 flex justify-between text-sm font-black text-white">
            <span>${t("orderTotal")}</span>
            <span class="text-amber-400 text-base">${total} ${t("currency")}</span>
          </div>
        </div>
      </div>
    `;

    footerContainer.innerHTML = `
      <div class="space-y-2">
        <button 
          onclick="submitAndOpenWhatsAppOrder()" 
          class="touch-target-lg w-full rounded-2xl font-black text-sm text-black flex items-center justify-center gap-2.5 transition active:scale-95 shadow-2xl bg-emerald-500 hover:bg-emerald-400"
          style="background-color: #25D366;"
        >
          <i class="fa-brands fa-whatsapp text-lg"></i>
          <span>${t("confirmOrderWhatsApp")}</span>
        </button>
        <button 
          onclick="setCheckoutStep(3)" 
          class="w-full py-2 text-xs text-zinc-400 hover:text-white"
        >
          ${t("prevStep")}
        </button>
      </div>
    `;
  }
}

function setCheckoutStep(step) {
  AppState.checkoutStep = step;
  renderCartDrawer();
}

function setOrderType(type) {
  AppState.activeOrderType = type;
  renderCartDrawer();
  updateCartUI();
}

function handleDeliveryAreaChange(areaId) {
  AppState.selectedDeliveryAreaId = areaId;
  renderCartDrawer();
  updateCartUI();
}

function validateAndGoToSummary() {
  const isDelivery = AppState.activeOrderType === "delivery";
  if (!AppState.customerInfo.name.trim()) {
    showToast(currentLang === "ar" ? "يرجى كتابة الاسم الكريم" : "Please enter your name", "error");
    return;
  }
  if (!AppState.customerInfo.phone.trim() || AppState.customerInfo.phone.trim().length < 8) {
    showToast(currentLang === "ar" ? "يرجى إدخال رقم جوال صحيح" : "Please enter a valid phone number", "error");
    return;
  }
  if (isDelivery && !AppState.customerInfo.address.trim()) {
    showToast(currentLang === "ar" ? "يرجى إدخال تفاصيل العنوان للتوصيل" : "Please enter your delivery address", "error");
    return;
  }

  setCheckoutStep(4);
}

function validateAndSubmitDirect() {
  const isDelivery = AppState.activeOrderType === "delivery";
  if (!AppState.customerInfo.name.trim()) {
    showToast(currentLang === "ar" ? "يرجى كتابة الاسم الكريم" : "Please enter your name", "error");
    return;
  }
  if (!AppState.customerInfo.phone.trim() || AppState.customerInfo.phone.trim().length < 8) {
    showToast(currentLang === "ar" ? "يرجى إدخال رقم جوال صحيح" : "Please enter a valid phone number", "error");
    return;
  }
  if (isDelivery && !AppState.customerInfo.address.trim()) {
    showToast(currentLang === "ar" ? "يرجى إدخال تفاصيل العنوان للتوصيل" : "Please enter your delivery address", "error");
    return;
  }
  submitAndOpenWhatsAppOrder();
}

// =========================================================================
// 7. WHATSAPP ORDER INTEGRATION
// =========================================================================
function generateWhatsAppOrder(order) {
  const isAr = currentLang === "ar";
  const subtotal = calculateSubtotal();
  const deliveryFee = calculateDeliveryFee();
  const total = calculateTotal();
  const orderId = "HG" + Math.floor(1000 + Math.random() * 9000);

  let message = "";

  if (isAr) {
    message += `مرحباً، أريد طلب من ${restaurantConfig.shortNameAr} 🔥\n\n`;
    message += `رقم الطلب: #${orderId}\n`;
    message += `الاسم: ${AppState.customerInfo.name}\n`;
    message += `الجوال: ${AppState.customerInfo.phone}\n`;
    message += `نوع الطلب: ${AppState.activeOrderType === 'delivery' ? '🚗 توصيل' : '🏃 استلام من الفرع'}\n`;
    
    if (AppState.activeOrderType === 'delivery') {
      const selectedArea = restaurantConfig.delivery.serviceAreas.find(a => a.id === AppState.selectedDeliveryAreaId);
      const areaName = selectedArea ? selectedArea.nameAr : '';
      message += `المنطقة: ${areaName}\n`;
      message += `العنوان: ${AppState.customerInfo.address}\n`;
      if (AppState.customerInfo.notes) {
        message += `ملاحظات التوصيل: ${AppState.customerInfo.notes}\n`;
      }
    } else {
      message += `الفرع: ${restaurantConfig.branches[0].nameAr}\n`;
    }

    message += `\nالطلب:\n`;
    AppState.cart.forEach(item => {
      message += `• ${item.quantity} × ${item.name_ar} (${item.unitPrice * item.quantity} ر.س)\n`;
      if (item.optionsSummary && item.optionsSummary.length > 0) {
        item.optionsSummary.forEach(opt => {
          message += `   - ${opt}\n`;
        });
      }
      if (item.notes) {
        message += `   - ملاحظة: ${item.notes}\n`;
      }
    });

    message += `\n------------------\n`;
    message += `المجموع الفرعي: ${subtotal} ر.س\n`;
    message += `رسوم التوصيل: ${deliveryFee === 0 ? 'مجاناً' : `${deliveryFee} ر.س`}\n`;
    message += `الإجمالي النهائي: ${total} ر.س\n`;
    message += `\nيرجى تأكيد استلام الطلب وتزويدي بوقت التجهيز. شكراً لكم!`;
  } else {
    message += `Hello, I'd like to place an order from ${restaurantConfig.shortNameEn} 🔥\n\n`;
    message += `Order Number: #${orderId}\n`;
    message += `Name: ${AppState.customerInfo.name}\n`;
    message += `Phone: ${AppState.customerInfo.phone}\n`;
    message += `Fulfillment: ${AppState.activeOrderType === 'delivery' ? '🚗 Delivery' : '🏃 Branch Pickup'}\n`;

    if (AppState.activeOrderType === 'delivery') {
      const selectedArea = restaurantConfig.delivery.serviceAreas.find(a => a.id === AppState.selectedDeliveryAreaId);
      const areaName = selectedArea ? selectedArea.nameEn : '';
      message += `Area: ${areaName}\n`;
      message += `Address: ${AppState.customerInfo.address}\n`;
      if (AppState.customerInfo.notes) {
        message += `Delivery Notes: ${AppState.customerInfo.notes}\n`;
      }
    } else {
      message += `Branch: ${restaurantConfig.branches[0].nameEn}\n`;
    }

    message += `\nOrder Details:\n`;
    AppState.cart.forEach(item => {
      message += `• ${item.quantity} × ${item.name_en} (${item.unitPrice * item.quantity} SAR)\n`;
      if (item.optionsSummary && item.optionsSummary.length > 0) {
        item.optionsSummary.forEach(opt => {
          message += `   - ${opt}\n`;
        });
      }
      if (item.notes) {
        message += `   - Notes: ${item.notes}\n`;
      }
    });

    message += `\n------------------\n`;
    message += `Subtotal: ${subtotal} SAR\n`;
    message += `Delivery Fee: ${deliveryFee === 0 ? 'Free' : `${deliveryFee} SAR`}\n`;
    message += `Total Amount: ${total} SAR\n`;
    message += `\nPlease confirm my order and estimated delivery/prep time. Thank you!`;
  }

  return { message, orderId };
}

function openWhatsAppOrder(order) {
  const { message, orderId } = generateWhatsAppOrder(order);
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodedText}`;
  
  // Open WhatsApp in new tab/window
  window.open(waUrl, "_blank");

  return orderId;
}

function submitAndOpenWhatsAppOrder() {
  const orderId = openWhatsAppOrder();
  
  // Show order success modal
  showOrderSuccessModal(orderId);

  // Clear cart after placing order
  clearCart();
  closeCart();
}

function showOrderSuccessModal(orderId) {
  const modal = document.getElementById("orderSuccessModal");
  const codeEl = document.getElementById("orderSuccessCode");
  if (modal && codeEl) {
    codeEl.textContent = `#${orderId}`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeOrderSuccessModal() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// =========================================================================
// 8. TABLE RESERVATION FLOW
// =========================================================================
function initReservationDefaults() {
  const dateInput = document.getElementById("resDateInput");
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    AppState.reservation.date = dateInput.value;
  }

  // Pre-fill user info if saved
  if (AppState.customerInfo.name) {
    const nameInput = document.getElementById("resNameInput");
    if (nameInput) nameInput.value = AppState.customerInfo.name;
    AppState.reservation.name = AppState.customerInfo.name;
  }
  if (AppState.customerInfo.phone) {
    const phoneInput = document.getElementById("resPhoneInput");
    if (phoneInput) phoneInput.value = AppState.customerInfo.phone;
    AppState.reservation.phone = AppState.customerInfo.phone;
  }
}

function changeGuestCount(delta) {
  const newCount = AppState.reservation.guests + delta;
  if (newCount >= 1 && newCount <= 30) {
    AppState.reservation.guests = newCount;
    const countEl = document.getElementById("resGuestsCount");
    if (countEl) countEl.textContent = newCount;
  }
}

function setReservationSection(sectionId) {
  AppState.reservation.section = sectionId;
  document.querySelectorAll(".res-section-btn").forEach(btn => {
    btn.classList.remove("bg-amber-500", "text-black", "border-amber-400");
    btn.classList.add("bg-charcoal-900", "text-zinc-300", "border-charcoal-800");
  });
  const activeBtn = document.getElementById(`res-sec-${sectionId}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-charcoal-900", "text-zinc-300", "border-charcoal-800");
    activeBtn.classList.add("bg-amber-500", "text-black", "border-amber-400");
  }
}

function generateWhatsAppReservation(reservation) {
  const isAr = currentLang === "ar";
  const resCode = "RES-" + Math.floor(1000 + Math.random() * 9000);
  
  let sectionLabel = "";
  if (reservation.section === "families") sectionLabel = isAr ? "عوائل (خصوصية)" : "Family (Private)";
  else if (reservation.section === "singles") sectionLabel = isAr ? "أفراد" : "Singles";
  else sectionLabel = isAr ? "جلسات خارجية" : "Outdoor";

  let msg = "";
  if (isAr) {
    msg += `أرغب في حجز طاولة في ${restaurantConfig.shortNameAr} 🪑\n\n`;
    msg += `رمز الحجز: #${resCode}\n`;
    msg += `الاسم: ${reservation.name}\n`;
    msg += `الجوال: ${reservation.phone}\n`;
    msg += `التاريخ: ${reservation.date}\n`;
    msg += `الوقت: ${reservation.time}\n`;
    msg += `عدد الأشخاص: ${reservation.guests} أشخاص\n`;
    msg += `القسم: ${sectionLabel}\n`;
    if (reservation.specialRequests) {
      msg += `الطلبات الخاصة: ${reservation.specialRequests}\n`;
    }
    msg += `\nيرجى تأكيد الحجز والترتيب لطاولتنا. شكراً جزيلاً!`;
  } else {
    msg += `I would like to book a table at ${restaurantConfig.shortNameEn} 🪑\n\n`;
    msg += `Reservation Code: #${resCode}\n`;
    msg += `Name: ${reservation.name}\n`;
    msg += `Phone: ${reservation.phone}\n`;
    msg += `Date: ${reservation.date}\n`;
    msg += `Time: ${reservation.time}\n`;
    msg += `Guests: ${reservation.guests} Guests\n`;
    msg += `Section: ${sectionLabel}\n`;
    if (reservation.specialRequests) {
      msg += `Special Requests: ${reservation.specialRequests}\n`;
    }
    msg += `\nPlease confirm our table reservation. Thank you!`;
  }

  return { message: msg, resCode };
}

function submitReservation(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById("resNameInput");
  const phoneInput = document.getElementById("resPhoneInput");
  const dateInput = document.getElementById("resDateInput");
  const timeSelect = document.getElementById("resTimeSelect");
  const requestsInput = document.getElementById("resRequestsInput");

  if (nameInput) AppState.reservation.name = nameInput.value.trim();
  if (phoneInput) AppState.reservation.phone = phoneInput.value.trim();
  if (dateInput) AppState.reservation.date = dateInput.value;
  if (timeSelect) AppState.reservation.time = timeSelect.value;
  if (requestsInput) AppState.reservation.specialRequests = requestsInput.value.trim();

  if (!AppState.reservation.name) {
    showToast(currentLang === "ar" ? "يرجى إدخال الاسم الكريم للحجز" : "Please enter your name", "error");
    return;
  }
  if (!AppState.reservation.phone || AppState.reservation.phone.length < 8) {
    showToast(currentLang === "ar" ? "يرجى إدخال رقم جوال صحيح" : "Please enter a valid phone number", "error");
    return;
  }

  const { message, resCode } = generateWhatsAppReservation(AppState.reservation);
  
  // Show reservation success modal
  const modal = document.getElementById("resSuccessModal");
  const codeEl = document.getElementById("resSuccessCode");
  const btnEl = document.getElementById("resWhatsAppBtn");
  
  if (modal && codeEl) {
    codeEl.textContent = `#${resCode}`;
    if (btnEl) {
      const waUrl = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
      btnEl.onclick = () => window.open(waUrl, "_blank");
    }
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeResSuccessModal() {
  const modal = document.getElementById("resSuccessModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// =========================================================================
// 9. GOOGLE REVIEWS SECTION
// =========================================================================
function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  const isAr = currentLang === "ar";
  let html = "";

  restaurantConfig.reviews.forEach(rev => {
    const author = isAr ? rev.author : rev.authorEn;
    const text = isAr ? rev.text : rev.textEn;
    const date = isAr ? rev.date : rev.dateEn;

    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += `<i class="fa-solid fa-star text-amber-400 text-xs"></i>`;
    }

    html += `
      <div class="p-4 rounded-3xl bg-charcoal-900 border border-charcoal-800 shadow-md flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-black font-black text-xs flex items-center justify-center">
                ${author.charAt(0)}
              </div>
              <div>
                <h5 class="text-xs font-bold text-white">${author}</h5>
                <span class="text-[10px] text-zinc-500">${date}</span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <i class="fa-brands fa-google text-xs text-zinc-400"></i>
              <span class="text-[10px] text-zinc-400">${rev.source}</span>
            </div>
          </div>
          <div class="flex gap-1 mb-2.5">
            ${starsHtml}
          </div>
          <p class="text-xs text-zinc-300 leading-relaxed">
            "${text}"
          </p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// =========================================================================
// 10. TOAST NOTIFICATIONS & UTILS
// =========================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-message p-3 px-4 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2.5 mb-2 border ${
    type === "success" 
      ? "bg-emerald-900/95 border-emerald-500/50 text-emerald-100" 
      : type === "error"
      ? "bg-rose-900/95 border-rose-500/50 text-rose-100"
      : "bg-charcoal-900/95 border-amber-500/40 text-amber-200"
  }`;

  const icon = type === "success" 
    ? "fa-circle-check text-emerald-400" 
    : type === "error"
    ? "fa-circle-exclamation text-rose-400"
    : "fa-bell text-amber-400";

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-sm"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Quick WhatsApp button direct chat
function openDirectWhatsApp() {
  const isAr = currentLang === "ar";
  const defaultText = isAr 
    ? `مرحباً ${restaurantConfig.shortNameAr}، أرغب في الاستفسار عن المنيو والطلبات 🔥`
    : `Hello ${restaurantConfig.shortNameEn}, I would like to inquire about your menu and ordering 🔥`;
  const url = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
  window.open(url, "_blank");
}

function openBranchLocation() {
  const url = (restaurantConfig.branches && restaurantConfig.branches[0] && restaurantConfig.branches[0].googleMapsUrl) 
    || restaurantConfig.locationUrl 
    || "https://tr.ee/u9SmzohT1j";
  window.open(url, "_blank");
}

function callBranchPhone() {
  window.location.href = restaurantConfig.telUrl || `tel:${restaurantConfig.phoneNumber || "01104689702"}`;
}

// =========================================================================
// 11. EVENT LISTENERS & SCROLL SPY
// =========================================================================
function setupEventListeners() {
  // Mobile bottom nav active state tracking on scroll
  const sections = ["home", "menu", "family-meals", "branches", "reservations", "location"];
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(secId => {
      const section = document.getElementById(secId);
      if (section) {
        const top = section.offsetTop - 140;
        if (window.scrollY >= top) {
          current = secId;
        }
      }
    });

    if (current) {
      document.querySelectorAll(".bottom-nav-item").forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("data-section") === current) {
          item.classList.add("active");
        }
      });
    }
  }, { passive: true });
}

// Helper to smooth scroll to section
function navigateToSection(secId) {
  const el = document.getElementById(secId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// Export to window
if (typeof window !== "undefined") {
  window.AppState = AppState;
  window.toggleLanguage = toggleLanguage;
  window.selectCategory = selectCategory;
  window.handleSearch = handleSearch;
  window.clearSearchInput = clearSearchInput;
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
  window.setSingleOption = setSingleOption;
  window.toggleMultipleOption = toggleMultipleOption;
  window.changeCustomizingQty = changeCustomizingQty;
  window.addCustomizedProductToCart = addCustomizedProductToCart;
  window.openCart = openCart;
  window.closeCart = closeCart;
  window.updateCartItemQuantity = updateCartItemQuantity;
  window.clearCart = clearCart;
  window.setCheckoutStep = setCheckoutStep;
  window.setOrderType = setOrderType;
  window.handleDeliveryAreaChange = handleDeliveryAreaChange;
  window.validateAndGoToSummary = validateAndGoToSummary;
  window.validateAndSubmitDirect = validateAndSubmitDirect;
  window.submitAndOpenWhatsAppOrder = submitAndOpenWhatsAppOrder;
  window.closeOrderSuccessModal = closeOrderSuccessModal;
  window.changeGuestCount = changeGuestCount;
  window.setReservationSection = setReservationSection;
  window.submitReservation = submitReservation;
  window.closeResSuccessModal = closeResSuccessModal;
  window.openDirectWhatsApp = openDirectWhatsApp;
  window.openBranchLocation = openBranchLocation;
  window.callBranchPhone = callBranchPhone;
  window.navigateToSection = navigateToSection;
  window.showToast = showToast;
}