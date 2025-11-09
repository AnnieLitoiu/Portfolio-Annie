// ==========================
// NAVIGATION + SCROLL
// ==========================
const scrollLinks = document.querySelectorAll(".nav-link, .hero-actions a, .about-intro a");
const navLinks = document.querySelectorAll(".nav-link");

scrollLinks.forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);
      const target = document.getElementById(id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
      const navEl = document.getElementById("main-nav");
      const burgerEl = document.getElementById("burger");
      if (navEl) navEl.classList.remove("open");
      if (burgerEl) burgerEl.classList.remove("open");
    }
  });
});

// mettre la classe active au scroll
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 80;
  document.querySelectorAll("section[id]").forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetHeight + sec.offsetTop) {
      const id = sec.getAttribute("id");
      navLinks.forEach(l => l.classList.remove("active"));
      const current = document.querySelector(`.nav-link[href="#${id}"]`);
      if (current) current.classList.add("active");
    }
  });
});

// ==========================
// BURGER MOBILE
// ==========================
const burger = document.getElementById("burger");
const nav = document.getElementById("main-nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    burger.classList.toggle("open");
  });
}

// ==========================
// THEME TOGGLE
// ==========================
const themeBtn = document.getElementById("theme-btn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    themeBtn.innerHTML = next === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
}

// ==========================
// MENU LANGUE DÉROULANT
// ==========================
const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");
const currentLang = document.getElementById("current-lang");

if (langBtn && langMenu) {
  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
  });

  langMenu.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentLang) currentLang.textContent = btn.dataset.lang;
      langMenu.style.display = "none";
    });
  });

  document.addEventListener("click", () => {
    langMenu.style.display = "none";
  });
}

// ==========================
// TEXTE TAPÉ
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typed-text");
  const cursor = document.getElementById("typed-cursor");
  if (!el) return;

  const text = "Web Developer Junior";
  el.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    } else {
      if (cursor) cursor.style.display = "none";
    }
  }

  type();
});

// ==========================
// FOND ANIMÉ SECTION ACCUEIL
// (responsive + nombre modifiable)
// ==========================
const heroCanvas = document.getElementById("hero-bg");
if (heroCanvas) {
  const ctx = heroCanvas.getContext("2d");
  let w = 0, h = 0;
  let particles = [];

  // 👉 tu changes ça pour avoir plus ou moins de points de base
  const BASE_PARTICLE_COUNT = 240;

  // 👉 si tu laisses à true, il va en rajouter un peu sur grands écrans
  const USE_AUTO_DENSITY = true;
  const AUTO_DENSITY = 0.00022; // plus grand = plus de points selon la surface

  const MAX_DISTANCE = 150;

  function resizeCanvas() {
    const home = document.getElementById("home");
    const rect = home.getBoundingClientRect();

    w = heroCanvas.width = window.innerWidth;
    h = heroCanvas.height = rect.height;

    createParticles();
  }

  function getParticleCount() {
    if (!USE_AUTO_DENSITY) return BASE_PARTICLE_COUNT;
    const autoCount = Math.floor(w * h * AUTO_DENSITY);
    // on prend le plus grand des deux pour éviter qu'il en enlève sur mobile
    return Math.max(BASE_PARTICLE_COUNT, autoCount);
  }

  function createParticles() {
    particles = [];
    const count = getParticleCount();
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

  function animate() {
    ctx.clearRect(0, 0, w, h);

    // points
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

    // lignes
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DISTANCE) {
          const opacity = 1 - dist / MAX_DISTANCE;
          ctx.strokeStyle = `rgba(14, 160, 165, ${opacity * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("load", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animate();
}

// ===== Accordéon "A propos" =====
const accordionItems = document.querySelectorAll(".about-accordion .accordion-item");
const accordionContainer = document.querySelector(".about-accordion");

function setAccordionHeight() {
  if (!accordionContainer) return;
  const active = document.querySelector(".about-accordion .accordion-item.active .accordion-panel");
  if (active) {
    const extra = 120;
    accordionContainer.style.height = active.scrollHeight + extra + "px";
  }
}

accordionItems.forEach(item => {
  const header = item.querySelector(".accordion-header");
  header.addEventListener("click", () => {
    accordionItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });
    item.classList.toggle("active");
    setAccordionHeight();
  });
});

window.addEventListener("load", setAccordionHeight);
