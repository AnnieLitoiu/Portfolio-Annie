// ordre fixe des sections dans la page
const SECTION_INDEX = {
  home: 1,
  about: 2,
  skills: 3,
  projects: 4,
  contact: 5
};
const TOTAL_SECTIONS = Object.keys(SECTION_INDEX).length;

/*******************************
 * NAVIGATION + SCROLL (fullPage piloté par index)
 *******************************/
const navLinks = document.querySelectorAll(".nav-link");

// tous les liens qui doivent scroller (inclut le logo .brand)
const scrollLinks = document.querySelectorAll(".nav-link, .hero-actions a, .about-intro a, .brand");

/*******************************
 * BURGER MENU (ouvrir / fermer)
 *******************************/
const burger = document.getElementById("burger");
const mainNav = document.getElementById("main-nav");

if (burger && mainNav) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    mainNav.classList.toggle("open");
  });
}

scrollLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();

    const id = href.substring(1);             // "home", "about", ...
    const index = SECTION_INDEX[id];          // 1,2,3,4,5

    if (window.fullpage_api && index) {
      // 👉 pilotage fullPage
      fullpage_api.moveTo(index);
    } else {
      // fallback sans fullPage
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

    // gérer la classe active sur le menu
    if (link.classList.contains("nav-link")) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }

    // fermer le burger sur mobile
    const navEl = document.getElementById("main-nav");
    const burgerEl = document.getElementById("burger");
    if (navEl) navEl.classList.remove("open");
    if (burgerEl) burgerEl.classList.remove("open");
  });
});

/*******************************
 * THEME
 *******************************/
const themeBtn = document.getElementById("theme-btn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    themeBtn.innerHTML =
      next === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
  });
}

/*******************************
 * I18N (TRADUCTIONS)
 *******************************/
// 👉 FR PAR DÉFAUT, SANS LOCALSTORAGE
let i18nLang = "FR";

// met à jour les tooltips fullPage avec la langue donnée
function updateFullpageTooltips(lang) {
  if (typeof fullpage_api === "undefined") return;
  if (typeof i18nTranslations === "undefined") return;

  const dict = i18nTranslations[lang];
  if (!dict) return;

  const labels = [
    dict["nav.home"],
    dict["nav.about"],
    dict["nav.skills"],
    dict["nav.projects"],
    dict["nav.contact"]
  ];

  const tooltips = document.querySelectorAll("#fp-nav ul li .fp-tooltip");
  tooltips.forEach((el, index) => {
    if (labels[index]) {
      el.textContent = labels[index];
    }
  });
}

function applyI18n(lang) {
  i18nLang = lang;

  const dict = i18nTranslations[lang];
  if (!dict) return;

  // TITLE
  if (dict["site.title"]) document.title = dict["site.title"];

  // TEXTES
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });

  // PLACEHOLDERS
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });

  // Langue affichée
  const currentSpan = document.getElementById("current-lang");
  if (currentSpan) currentSpan.textContent = lang;

  // 👉 mettre à jour les tooltips de fullPage
  updateFullpageTooltips(lang);
}

function setupI18n() {
  applyI18n(i18nLang);

  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");

  if (!langBtn || !langMenu) return;

  langBtn.addEventListener("click", e => {
    e.stopPropagation();
    langMenu.style.display =
      langMenu.style.display === "block" ? "none" : "block";
  });

  langMenu.querySelectorAll("button[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyI18n(btn.dataset.lang);
      langMenu.style.display = "none";
    });
  });

  document.addEventListener("click", e => {
    if (!langMenu.contains(e.target) && !langBtn.contains(e.target)) {
      langMenu.style.display = "none";
    }
  });
}

setupI18n();

/*******************************
 * BARRE DE PROGRESSION
 *******************************/
function updateScrollProgressByIndex(sectionIndex) {
  const bar = document.getElementById("scroll-progress-bar");
  if (!bar) return;

  const ratio = (sectionIndex - 1) / (TOTAL_SECTIONS - 1);  // 0 → 1
  bar.style.transform = `scaleX(${ratio})`;
}

/*******************************
 * PARTICULES (CANVAS HERO)
 *******************************/
function setupHeroParticles() {
  const heroCanvas = document.getElementById("hero-bg");
  if (!heroCanvas) return;

  const ctx = heroCanvas.getContext("2d");
  let w = 0, h = 0;
  let particles = [];

  const BASE = 200;
  const DENSITY = 0.00022;
  const MAX_DIST = 180;

  function getCount() {
    const auto = Math.floor(w * h * DENSITY);
    return Math.max(BASE, auto);
  }

  function createParticles() {
    particles = [];
    const count = getCount();
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35
      });
    }
  }

  function resizeCanvas() {
    const home = document.getElementById("home");
    const rect = home ? home.getBoundingClientRect() : { height: window.innerHeight };

    w = heroCanvas.width = window.innerWidth;
    h = heroCanvas.height = rect.height || window.innerHeight;

    createParticles();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(14, 160, 165, 0.8)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DIST) {
          const opacity = 1 - dist / MAX_DIST;
          ctx.strokeStyle = `rgba(14,160,165,${opacity * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animate();
}

/*******************************
 * SCROLL HORIZONTAL PROJETS
 *******************************/
function setupProjectsHorizontalScroll() {
  const scroller = document.getElementById("projects-scroller");
  if (!scroller) return;

  let readyToLeaveDown = false;
  let leaveDownResetTimer = null;

  scroller.addEventListener("wheel", (e) => {
    const delta = e.deltaY;
    if (delta === 0) return;

    const goingDown = delta > 0;
    const goingUp = delta < 0;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const atStart = scroller.scrollLeft <= 0;
    const atEnd = scroller.scrollLeft >= maxScrollLeft - 2;

    const FACTOR = 1.8;
    const step = Math.abs(delta) * FACTOR;

    const resetLeaveDown = () => {
      readyToLeaveDown = false;
      if (leaveDownResetTimer) {
        clearTimeout(leaveDownResetTimer);
        leaveDownResetTimer = null;
      }
    };

    if (goingDown && !atEnd) {
      e.preventDefault();
      e.stopPropagation();
      resetLeaveDown();
      scroller.scrollLeft = Math.min(maxScrollLeft, scroller.scrollLeft + step);
      return;
    }

    if (goingUp && !atStart) {
      e.preventDefault();
      e.stopPropagation();
      resetLeaveDown();
      scroller.scrollLeft = Math.max(0, scroller.scrollLeft - step);
      return;
    }

    if (typeof fullpage_api !== "undefined") {
      e.preventDefault();
      e.stopPropagation();

      if (goingUp && atStart) {
        fullpage_api.moveSectionUp();
        resetLeaveDown();
        return;
      }

      if (goingDown && atEnd) {
        if (!readyToLeaveDown) {
          readyToLeaveDown = true;
          leaveDownResetTimer = setTimeout(() => {
            readyToLeaveDown = false;
          }, 500);
          return;
        }

        fullpage_api.moveSectionDown();
        resetLeaveDown();
        return;
      }
    }
  }, { passive: false });
}
/*******************************
 * INIT FULLPAGE + SETUP
 *******************************/
document.addEventListener("DOMContentLoaded", () => {
  if (typeof fullpage !== "undefined") {
    new fullpage("#fullpage", {
      // Navigation
      navigation: true,
      navigationPosition: "right",
      navigationTooltips: [
        i18nTranslations[i18nLang]["nav.home"],
        i18nTranslations[i18nLang]["nav.about"],
        i18nTranslations[i18nLang]["nav.skills"],
        i18nTranslations[i18nLang]["nav.projects"],
        i18nTranslations[i18nLang]["nav.contact"]
      ],
      showActiveTooltip: true,
      anchors: ["home", "about", "skills", "projects", "contact"],

      // Scrolling
      scrollingSpeed: 1400,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 500,
      scrollBar: false,
      easingcss3: "cubic-bezier(0.25, 0.1, 0.25, 1)",

      // Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,

      // Design
      verticalCentered: true,
      paddingTop: "60px",
      sectionSelector: ".section",

      onLeave(origin, destination, direction) {
        const links = Array.from(document.querySelectorAll(".nav-link"));
        links.forEach(l => l.classList.remove("active"));

        const active = links[destination.index];
        if (active) active.classList.add("active");

        const sectionIndex = destination.index + 1;
        updateScrollProgressByIndex(sectionIndex);
      },

      afterRender() {
        setupHeroParticles();
        setupProjectsHorizontalScroll();

        // Vérifie si sent=true pour rester sur Contact
        const params = new URLSearchParams(window.location.search);
        const sent = params.get("sent") === "true";

        let index;

        if (sent) {
          index = SECTION_INDEX["contact"];
        } else {
          const hash = window.location.hash.replace("#", "");
          index = SECTION_INDEX[hash] || 1;
        }

        if (typeof index === "number") {
          fullpage_api.silentMoveTo(index);
          updateScrollProgressByIndex(index);
        }
      }
    });
  }

  // Affichage message confirmation FormSubmit
  const params = new URLSearchParams(window.location.search);

  if (params.get("sent") === "true") {
    const status = document.getElementById("form-status");
    if (status) {
      status.classList.add("visible");

      setTimeout(() => {
        status.classList.remove("visible");
      }, 6000);
    }

    // Retirer ?sent=true mais garder #contact
    params.delete("sent");
    const newQuery = params.toString();
    const newUrl =
      window.location.pathname +
      (newQuery ? "?" + newQuery : "") +
      window.location.hash;

    window.history.replaceState({}, "", newUrl);
  }

});
