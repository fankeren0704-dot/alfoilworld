const pageNavMap = {
  home: ["home"],
  knowledge: ["knowledge"],
  history: ["knowledge"],
  "ai-search": ["knowledge", "ai"],
  news: ["news"],
  "company-radar": ["radar"],
  "supplier-directory": ["suppliers"],
  "buyer-desk": ["buyers"],
  "global-inquiry": ["buyers", "inquiry"],
  join: ["join"],
  contact: ["contact"],
  about: ["contact"]
};

const headerMarkup = `
  <header class="site-header">
    <div class="utility-bar">
      <div class="container">
        <div class="utility-left">
          <span class="status-pill"><strong>Live</strong> LME / SHFE / Spot Market Tracking</span>
          <span class="status-pill"><strong>B2B</strong> Global Supply & Demand Connection</span>
        </div>
        <div class="utility-right">
          <a class="utility-link" href="index.html#experts" data-nav-key="experts">专家顾问</a>
          <a class="utility-link" href="buyer-desk.html" data-nav-key="buyers">Global Buyers</a>
          <a class="utility-link" href="contact.html" data-nav-key="contact">Contact Desk</a>
        </div>
      </div>
    </div>

    <div class="container header-main">
      <div class="header-branding">
        <a class="brand" href="index.html" aria-label="Alfoil World">
          <div class="brand-mark" aria-hidden="true">
            <img src="assets/images/logo-aw.png" alt="" loading="eager" decoding="async">
          </div>
          <div class="brand-copy">
            <strong>铝箔世界</strong>
            <span><em>ALFOIL</em> <i>WORLD</i></span>
          </div>
        </a>
        <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="打开导航">
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
              <strong>铝箔世界</strong>
              <span><em>ALFOIL</em> <i>WORLD</i></span>
            </div>
          </div>
          <button class="drawer-close" type="button" data-nav-close aria-label="关闭导航">关闭</button>
        </div>
        <nav class="main-nav">
          <a href="index.html" data-nav-key="home">首页</a>
          <a href="supplier-directory.html" data-nav-key="suppliers">供应商目录</a>
          <a href="knowledge.html" data-nav-key="knowledge">知识库</a>
          <a href="news.html" data-nav-key="news">行业资讯</a>
          <a href="company-radar.html" data-nav-key="radar">企业情报</a>
          <a href="buyer-desk.html" data-nav-key="buyers">全球采购</a>
        </nav>

        <div class="nav-actions">
          <a class="nav-link-btn" href="join.html" data-nav-key="join">企业入驻</a>
          <a class="nav-cta alt" href="global-inquiry.html" data-nav-key="inquiry">海外采购询盘</a>
          <a class="nav-cta" href="ai-search.html" data-nav-key="ai">AI智能搜索</a>
        </div>

        <div class="drawer-meta">
          <a href="contact.html">联系商务团队</a>
          <a href="buyer-desk.html">进入全球采购商专区</a>
        </div>
      </div>
    </div>
    <button class="nav-backdrop" type="button" data-nav-backdrop tabindex="-1" aria-hidden="true"></button>
  </header>
`;

const footerMarkup = `
  <footer>
    <div class="container">
      <div class="footer-grid footer-grid-wide">
        <div class="footer-column footer-intro">
          <h4>Alfoil World</h4>
          <p>面向全球供需连接的铝箔产业门户平台，服务采购、品牌、供应链、研究与国际市场拓展。</p>
        </div>
        <div class="footer-column">
          <h4>平台入口</h4>
          <a href="supplier-directory.html">供应商目录</a>
          <a href="ai-search.html">AI 智能搜索</a>
          <a href="global-inquiry.html">海外采购询盘</a>
          <a href="join.html">企业入驻</a>
        </div>
        <div class="footer-column">
          <h4>内容中心</h4>
          <a href="knowledge.html">知识库</a>
          <a href="news.html">行业资讯</a>
          <a href="history.html">发展历史</a>
          <a href="company-radar.html">企业情报</a>
        </div>
        <div class="footer-column">
          <h4>联系与合作</h4>
          <a href="buyer-desk.html">全球采购商专区</a>
          <a href="contact.html">联系我们</a>
          <a href="about.html">平台介绍</a>
          <a href="mailto:contact@alfoilworld.com">contact@alfoilworld.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 铝箔世界 Alfoil World · GitHub Pages 多页面静态站点结构已统一，可继续扩展目录、表单和内容矩阵。
      </div>
    </div>
  </footer>
`;

function mountSiteShell() {
  const headerSlot = document.querySelector("[data-site-header]");
  const footerSlot = document.querySelector("[data-site-footer]");
  const page = document.body.dataset.page || "home";
  const activeKeys = pageNavMap[page] || [];

  if (headerSlot) {
    headerSlot.outerHTML = headerMarkup;
  }

  if (footerSlot) {
    footerSlot.outerHTML = footerMarkup;
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
    navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
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
