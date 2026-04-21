const pageNavMap = {
  home: ["home"],
  "home-en": ["home"],
  knowledge: ["knowledge"],
  history: ["knowledge"],
  "ai-search": ["ai"],
  news: ["news"],
  "company-radar": ["radar"],
  "supplier-directory": ["suppliers"],
  "buyer-desk": ["buyers"],
  "global-inquiry": ["inquiry"],
  join: ["join"],
  contact: ["contact"],
  about: ["contact"]
};

const pageFileMap = {
  home: { zh: "index.html", en: "index-en.html" },
  about: { zh: "about.html", en: "about-en.html" },
  "ai-search": { zh: "ai-search.html", en: "ai-search-en.html" },
  "buyer-desk": { zh: "buyer-desk.html", en: "buyer-desk-en.html" },
  "company-radar": { zh: "company-radar.html", en: "company-radar-en.html" },
  contact: { zh: "contact.html", en: "contact-en.html" },
  "global-inquiry": { zh: "global-inquiry.html", en: "global-inquiry-en.html" },
  history: { zh: "history.html", en: "history-en.html" },
  join: { zh: "join.html", en: "join-en.html" },
  knowledge: { zh: "knowledge.html", en: "knowledge-en.html" },
  news: { zh: "news.html", en: "news-en.html" },
  "supplier-directory": { zh: "supplier-directory.html", en: "supplier-directory-en.html" }
};

const shellCopy = {
  zh: {
    utility: {
      advisory: "专家顾问",
      buyers: "全球采购",
      contact: "联系我们"
    },
    nav: {
      home: "首页",
      suppliers: "供应商目录",
      knowledge: "知识库",
      news: "行业资讯",
      radar: "企业情报",
      buyers: "全球采购",
      join: "企业入驻",
      inquiry: "采购询盘",
      ai: "AI 搜索"
    },
    drawer: {
      contact: "联系我们",
      buyerDesk: "采购商专区",
      close: "关闭"
    },
    footer: {
      introTitle: "铝箔世界 Alfoil World",
      introText:
        "面向全球采购商、品牌方与供应链团队的铝箔产业门户，提供供应商发现、行业知识、市场洞察与询盘引导。",
      platform: "平台入口",
      content: "内容中心",
      connect: "联系合作",
      suppliers: "供应商目录",
      ai: "AI 搜索",
      inquiry: "提交询盘",
      join: "企业入驻",
      knowledge: "知识库",
      insights: "行业资讯",
      history: "产业历史",
      radar: "企业情报",
      buyers: "全球采购",
      contact: "联系我们",
      about: "关于平台",
      bottom:
        "© 2026 铝箔世界 Alfoil World · GitHub Pages 静态展示站原型，可继续扩展双语页面与内容矩阵。"
    },
    toggleOpen: "打开导航",
    toggleClose: "关闭导航",
    brandTitle: "铝箔世界",
    brandSubLeft: "ALFOIL",
    brandSubRight: "WORLD"
  },
  en: {
    utility: {
      advisory: "Advisory Board",
      buyers: "Global Buyers",
      contact: "Contact"
    },
    nav: {
      home: "Home",
      suppliers: "Suppliers",
      knowledge: "Knowledge Base",
      news: "Insights",
      radar: "Company Radar",
      buyers: "Global Buyers",
      join: "Join",
      inquiry: "Inquiry",
      ai: "AI Search"
    },
    drawer: {
      contact: "Contact Us",
      buyerDesk: "Buyer Desk",
      close: "Close"
    },
    footer: {
      introTitle: "Alfoil World",
      introText:
        "A global aluminum foil intelligence platform helping international buyers, sourcing teams, and brand-side decision makers move from market understanding to supplier discovery and inquiry action.",
      platform: "Platform",
      content: "Content",
      connect: "Contact",
      suppliers: "Supplier Directory",
      ai: "AI Search",
      inquiry: "Submit Inquiry",
      join: "Join as Supplier",
      knowledge: "Knowledge Base",
      insights: "Insights",
      history: "Industry History",
      radar: "Company Radar",
      buyers: "Global Buyers",
      contact: "Contact Us",
      about: "About",
      bottom:
        "© 2026 Alfoil World · Static GitHub Pages prototype for supplier discovery, sourcing guidance, and aluminum foil market intelligence."
    },
    toggleOpen: "Open navigation",
    toggleClose: "Close navigation",
    brandTitle: "ALFOIL WORLD",
    brandSubLeft: "GLOBAL ALUMINUM FOIL",
    brandSubRight: "INTELLIGENCE"
  }
};

function resolvePageKey(page) {
  if (page === "home-en") {
    return "home";
  }
  return page;
}

function localizedHref(page, locale) {
  const key = resolvePageKey(page);
  const record = pageFileMap[key];
  if (!record) {
    return locale === "zh" ? "index.html" : "index-en.html";
  }
  return record[locale] || record.en;
}

function getHeaderMarkup(locale, page) {
  const copy = shellCopy[locale] || shellCopy.en;
  const homeHref = localizedHref("home", locale);
  const langSwitch = `
        <div class="lang-switch" aria-label="Language switch">
          <a href="${localizedHref(page, "zh")}" class="${locale === "zh" ? "active" : ""}">CN</a>
          <span>|</span>
          <a href="${localizedHref(page, "en")}" class="${locale === "en" ? "active" : ""}">EN</a>
        </div>
      `;

  return `
  <header class="site-header">
    <div class="utility-bar">
      <div class="container">
        <div class="utility-left">
          <span class="status-pill"><strong>Live</strong> LME / SHFE / Spot Market Tracking</span>
          <span class="status-pill"><strong>B2B</strong> Global Supply & Demand Connection</span>
        </div>
        <div class="utility-right">
          <a class="utility-link" href="${homeHref}#experts" data-nav-key="experts">${copy.utility.advisory}</a>
          <a class="utility-link" href="${localizedHref("buyer-desk", locale)}" data-nav-key="buyers">${copy.utility.buyers}</a>
          <a class="utility-link" href="${localizedHref("contact", locale)}" data-nav-key="contact">${copy.utility.contact}</a>
        </div>
      </div>
    </div>

    <div class="container header-main">
      <div class="header-branding">
        <a class="brand" href="${homeHref}" aria-label="Alfoil World">
          <div class="brand-mark" aria-hidden="true">
            <img src="assets/images/logo-aw.png" alt="" loading="eager" decoding="async">
          </div>
          <div class="brand-copy">
            <strong>${copy.brandTitle}</strong>
            <span><em>${copy.brandSubLeft}</em> <i>${copy.brandSubRight}</i></span>
          </div>
        </a>
        <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="${copy.toggleOpen}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="nav-shell" data-nav-drawer>
        <div class="drawer-head">
          <div class="drawer-brand">
            <div class="drawer-logo" aria-hidden="true">
              <img src="assets/images/logo-aw.png" alt="" loading="eager" decoding="async">
            </div>
            <div class="drawer-title">
              <strong>${copy.brandTitle}</strong>
              <span><em>${copy.brandSubLeft}</em> <i>${copy.brandSubRight}</i></span>
            </div>
          </div>
          <button class="drawer-close" type="button" data-nav-close aria-label="${copy.toggleClose}">${copy.drawer.close}</button>
        </div>
        <nav class="main-nav">
          <a href="${localizedHref("home", locale)}" data-nav-key="home">${copy.nav.home}</a>
          <a href="${localizedHref("supplier-directory", locale)}" data-nav-key="suppliers">${copy.nav.suppliers}</a>
          <a href="${localizedHref("knowledge", locale)}" data-nav-key="knowledge">${copy.nav.knowledge}</a>
          <a href="${localizedHref("news", locale)}" data-nav-key="news">${copy.nav.news}</a>
          <a href="${localizedHref("company-radar", locale)}" data-nav-key="radar">${copy.nav.radar}</a>
          <a href="${localizedHref("buyer-desk", locale)}" data-nav-key="buyers">${copy.nav.buyers}</a>
        </nav>

        <div class="nav-actions">
          <a class="nav-link-btn" href="${localizedHref("join", locale)}" data-nav-key="join">${copy.nav.join}</a>
          <a class="nav-cta alt" href="${localizedHref("global-inquiry", locale)}" data-nav-key="inquiry">${copy.nav.inquiry}</a>
          <a class="nav-cta" href="${localizedHref("ai-search", locale)}" data-nav-key="ai">${copy.nav.ai}</a>
        </div>

        ${langSwitch}

        <div class="drawer-meta">
          <a href="${localizedHref("contact", locale)}">${copy.drawer.contact}</a>
          <a href="${localizedHref("buyer-desk", locale)}">${copy.drawer.buyerDesk}</a>
        </div>
      </div>
    </div>
    <button class="nav-backdrop" type="button" data-nav-backdrop tabindex="-1" aria-hidden="true"></button>
  </header>
`;
}

function getFooterMarkup(locale) {
  const copy = shellCopy[locale] || shellCopy.en;

  return `
  <footer>
    <div class="container">
      <div class="footer-grid footer-grid-wide">
        <div class="footer-column footer-intro">
          <h4>${copy.footer.introTitle}</h4>
          <p>${copy.footer.introText}</p>
        </div>
        <div class="footer-column">
          <h4>${copy.footer.platform}</h4>
          <a href="${localizedHref("supplier-directory", locale)}">${copy.footer.suppliers}</a>
          <a href="${localizedHref("ai-search", locale)}">${copy.footer.ai}</a>
          <a href="${localizedHref("global-inquiry", locale)}">${copy.footer.inquiry}</a>
          <a href="${localizedHref("join", locale)}">${copy.footer.join}</a>
        </div>
        <div class="footer-column">
          <h4>${copy.footer.content}</h4>
          <a href="${localizedHref("knowledge", locale)}">${copy.footer.knowledge}</a>
          <a href="${localizedHref("news", locale)}">${copy.footer.insights}</a>
          <a href="${localizedHref("history", locale)}">${copy.footer.history}</a>
          <a href="${localizedHref("company-radar", locale)}">${copy.footer.radar}</a>
        </div>
        <div class="footer-column">
          <h4>${copy.footer.connect}</h4>
          <a href="${localizedHref("buyer-desk", locale)}">${copy.footer.buyers}</a>
          <a href="${localizedHref("contact", locale)}">${copy.footer.contact}</a>
          <a href="${localizedHref("about", locale)}">${copy.footer.about}</a>
          <a href="mailto:contact@alfoilworld.com">contact@alfoilworld.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        ${copy.footer.bottom}
      </div>
    </div>
  </footer>
`;
}

function mountSiteShell() {
  const headerSlot = document.querySelector("[data-site-header]");
  const footerSlot = document.querySelector("[data-site-footer]");
  const page = document.body.dataset.page || "home";
  const locale = document.body.dataset.locale || (page === "home" ? "zh" : "en");
  const copy = shellCopy[locale] || shellCopy.en;
  const activeKeys = pageNavMap[page] || [];

  if (headerSlot) {
    headerSlot.outerHTML = getHeaderMarkup(locale, page);
  }

  if (footerSlot) {
    footerSlot.outerHTML = getFooterMarkup(locale);
  }

  activeKeys.forEach((key) => {
    document
      .querySelectorAll(`[data-nav-key="${key}"]`)
      .forEach((node) => node.classList.add("active"));
  });

  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navClose = document.querySelector("[data-nav-close]");
  const navBackdrop = document.querySelector("[data-nav-backdrop]");
  const drawerLinks = document.querySelectorAll(".nav-shell a");

  const setMenuState = (isOpen) => {
    if (!siteHeader || !navToggle) {
      return;
    }

    siteHeader.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? copy.toggleClose : copy.toggleOpen);
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      setMenuState(!siteHeader.classList.contains("is-open"));
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => setMenuState(false));
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => setMenuState(false));
  }

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteHeader.classList.contains("is-open")) {
      setMenuState(false);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountSiteShell);
} else {
  mountSiteShell();
}
