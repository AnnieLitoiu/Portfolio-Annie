/*******************************
 * NAVIGATION + SCROLL
 *******************************/
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

/*******************************
 * BURGER
 *******************************/
const burger = document.getElementById("burger");
const nav = document.getElementById("main-nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    burger.classList.toggle("open");
  });
}

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
 * TEXTE TAPÉ
 *******************************/
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typed-text");
  const cursor = document.getElementById("typed-cursor");

  if (!el) return;

  const dict = i18nTranslations[i18nLang] || i18nTranslations.FR;
  const text = dict["hero.title"] || "Web Developer Junior";

  el.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    } else if (cursor) {
      cursor.style.display = "none";
    }
  }

  type();
});

/*******************************
 * PARTICULES (CANVAS)
 *******************************/
const heroCanvas = document.getElementById("hero-bg");
if (heroCanvas) {
  const ctx = heroCanvas.getContext("2d");
  let w = 0, h = 0;
  let particles = [];

  const BASE = 200;
  const DENSITY = 0.00022;
  const MAX_DIST = 180;

  function resizeCanvas() {
    const home = document.getElementById("home");
    const rect = home.getBoundingClientRect();

    w = heroCanvas.width = window.innerWidth;
    h = heroCanvas.height = rect.height;

    createParticles();
  }

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
  window.addEventListener("load", resizeCanvas);
  resizeCanvas();
  animate();
}

/*******************************
 * ACCORDÉON
 *******************************/
const accordionItems = document.querySelectorAll(".accordion-item");
accordionItems.forEach(item => {
  const header = item.querySelector(".accordion-header");
  header.addEventListener("click", () => {
    accordionItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

/*******************************
 * CONTACT FORM CONFIRMATION (AJAX, SANS REDIRECTION)
 *******************************/
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // 👈 empêche la redirection

    const statusEl = document.getElementById("form-status");
    const dict = i18nTranslations[i18nLang] || i18nTranslations.FR;

    if (statusEl) {
      statusEl.textContent = dict["contact.form.confirm"];
      statusEl.classList.add("visible");
    }

    const formData = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: contactForm.method || "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (res.ok) {
        contactForm.reset();
      } else {
        // si tu veux gérer les erreurs, tu peux ajouter un message ici
        console.error("Erreur lors de l'envoi du formulaire");
      }
    } catch (err) {
      console.error("Erreur réseau lors de l'envoi du formulaire", err);
    }
  });
}


/*******************************
 * PARALLAXE AVATAR HERO
 *******************************/
(function setupHeroParallax() {
  const avatar = document.querySelector(".hero-avatar");
  if (!avatar) return;

  // Limite du mouvement (en pixels)
  const maxMove = 20;

  // Désactiver sur mobile
  if (window.innerWidth < 768) return;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2; 
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const moveX = -x * maxMove;
    const moveY = -y * maxMove;

    avatar.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
})();