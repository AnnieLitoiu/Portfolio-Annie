// ordre fixe des sections dans la page
const SECTION_INDEX = {
  home: 1,
  about: 2,
  skills: 3,
  projects: 4,
  contact: 5
};

/*******************************
 * NAVIGATION + SCROLL (fullPage piloté par index)
 *******************************/
const navLinks = document.querySelectorAll(".nav-link");

// tous les liens qui doivent scroller
const scrollLinks = document.querySelectorAll(".nav-link, .hero-actions a, .about-intro a");

scrollLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();

    const id = href.substring(1);              // "home", "about", ...
    const index = SECTION_INDEX[id];           // 1,2,3,4,5

    if (window.fullpage_api && index) {
      // 👉 on demande à fullPage d'aller à l'index, pas à l'ancre
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
const i18nTranslations = {
  FR: {
    // SITE
    "site.title": "Portfolio Annie – Développeuse Web Junior",

    // NAV
    "nav.home": "Accueil",
    "nav.skills": "Compétences",
    "nav.projects": "Portfolio",
    "nav.contact": "Contact",

    // HERO
    "hero.title": "Développeuse Web Junior",
    "hero.subtitle":
      "Je conçois des expériences digitales uniques grâce à un design innovant et un code soigné. Je transforme les idées en sites et applications à la fois beaux, modernes, accessibles et faciles à maintenir.",
    "hero.btnPortfolio": "Voir mon portfolio",
    "hero.btnContact": "Me contacter",

    // ABOUT
    "about.title": "Qui suis-je ?",
    "about.subtitle": "Quelques infos sur mon parcours et ma façon de travailler.",
    "about.name": "AnnieCode",
    "about.text1":
      "Développeuse web junior en reconversion, je suis passionnée par la création d’interfaces modernes, intuitives et accessibles. J’aime transformer une idée en un produit clair, bien structuré et facile à faire évoluer.",
    "about.highlight":
      "Actuellement à la recherche d’un stage ou de premiers projets pour mettre en pratique mes compétences et continuer à progresser.",
    "about.btnWork": "Travaillons ensemble",
    "about.btnCV": "Télécharger mon CV",

    "about.accordion.path.title": "Mon parcours",
    "about.accordion.path.text":
      "Issue d’un parcours polyvalent, je me suis orientée vers le développement web pour associer créativité et logique. Formée aux bases du web (HTML, CSS, JavaScript) ainsi qu’aux outils modernes, je souhaite continuer à apprendre au contact d’une équipe et à travers des projets concrets.",
    "about.accordion.skills.title": "Ce que je sais faire",
    "about.accordion.skills.text":
      "Intégration de maquettes responsives, création de pages dynamiques en JavaScript, utilisation de frameworks front, conception et gestion de bases de données, avec une attention particulière à l’accessibilité, à la lisibilité du code et au design.",
    "about.accordion.search.title": "Ce que je recherche",
    "about.accordion.search.text":
      "Un environnement où je peux contribuer à de vrais projets, développer mes compétences en front-end et en back-end, tout en apportant mon sens de l’organisation, de la rigueur et de la communication.",

    // SKILLS
    "skills.title": "Compétences",
    "skills.subtitle": "Les technologies que j’utilise, d’après mon parcours.",
    "skills.frontend.title": "Front-end",
    "skills.frontend.desc": "Création d’interfaces modernes, responsives et agréables à utiliser.",
    "skills.frontend.html": "HTML5",
    "skills.frontend.css": "CSS3",
    "skills.frontend.js": "JavaScript",
    "skills.frontend.react": "React (bases)",
    "skills.frontend.angular": "Angular",
    "skills.backend.title": "Back-end",
    "skills.backend.desc": "Développement côté serveur selon les besoins du projet.",
    "skills.backend.php": "PHP (Symfony)",
    "skills.backend.python": "Python (Django)",
    "skills.backend.csharp": "C# (ASP.NET)",
    "skills.backend.node": "Node.js",
    "skills.db.title": "Bases de données et serveurs",
    "skills.db.desc": "Outils vus en formation et utilisés dans différents projets.",
    "skills.db.mysql": "MySQL Server",
    "skills.db.apache": "Apache / IIS",
    "skills.db.uml": "UML et conception",

    // CONTACT
    "contact.title": "Contact",
    "contact.subtitle":
      "Envie de collaborer ou d’en savoir plus ? Écrivez-moi ou connectons-nous 👇",
    "contact.form.name": "Nom",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Envoyer",
    "contact.link.email": "Email",
    "contact.link.github": "GitHub",
    "contact.link.linkedin": "LinkedIn",
    "contact.form.confirm": "Merci, votre message a bien été enregistré.",

    // PROJECTS – section
    "projects.title": "Portfolio",
    "projects.subtitle": "Quelques réalisations et exercices de développement.",

    // PROJET 1
    "projects.p1.title": "Ma première page HTML/CSS",
    "projects.p1.desc":
      "Page de présentation avec les sections « Qui suis-je ? », « Mon parcours », « Ma formation » et un formulaire de contact. Le travail a surtout porté sur la mise en page, les cartes arrondies et l’harmonie des couleurs.",
    "projects.p1.tag.html": "HTML",
    "projects.p1.tag.css": "CSS",
    "projects.p1.tag.mockup": "Maquette",

    // PROJET 2
    "projects.p2.title": "Quiz en PHP / Symfony",
    "projects.p2.desc":
      "Application de quiz avec gestion des questions, logique côté serveur et rendu dynamique. Projet réalisé en PHP avec le framework Symfony, selon l’architecture MVC, avec connexion à une base de données MySQL.",

    // PROJET 3
    "projects.p3.title": "Le Seau d’Eau",
    "projects.p3.desc":
      "Mini-jeu interactif développé en HTML, CSS et JavaScript. Vous incarnez un seau vide qui doit trouver une source d’eau et arroser la plante au centre du plateau. Les déplacements se font dans toutes les directions, et des cases bloquées apparaissent de manière aléatoire. Ce projet illustre la logique de jeu et la manipulation du DOM.",
    "projects.p3.tag.game": "Jeu",

    // PROJET 4
    "projects.p4.title": "Portfolio Annie",
    "projects.p4.desc":
      "Site web personnel conçu pour présenter mon profil de développeuse web junior. Réalisé en HTML, CSS et JavaScript, il met en avant mes compétences, mes projets et mon CV, avec un design moderne et des animations fluides.",
    "projects.p4.tag.design": "Design",

    // PROJET 5
    "projects.p5.title": "MamanBudget - Jeu éducatif",
    "projects.p5.desc":
      "Développé dans le cadre d’un hackathon à Interface 3, MamanBudget est une application web éducative réalisée avec Symfony, qui simule la gestion d’un foyer monoparental sur un mois. J’ai contribué à la partie back-end, notamment la modélisation de la base de données, la logique du jeu et la préparation des données finales.",
    "projects.p5.tag.hackathon": "Hackathon",

    // BOUTONS DE PROJET
    "projects.btn.view": "Voir le projet",
    "projects.btn.code": "Code source",

    // FOOTER
    "footer.text": "© 2025 Annie. Tous droits réservés."
  },

  EN: {
    "site.title": "Annie Portfolio – Junior Web Developer",

    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.projects": "Portfolio",
    "nav.contact": "Contact",

    "hero.title": "Junior Web Developer",
    "hero.subtitle":
      "I design unique digital experiences with modern layouts and clean code. I turn ideas into websites and applications that look great, are accessible, and remain easy to maintain over time.",
    "hero.btnPortfolio": "See my portfolio",
    "hero.btnContact": "Contact me",

    "about.title": "Who am I?",
    "about.subtitle": "A few details about my background and how I work.",
    "about.name": "AnnieCode",
    "about.text1":
      "I am a junior web developer in career transition, passionate about creating modern, intuitive and accessible interfaces. I enjoy turning an idea into a clear, well-structured product that can evolve as needs change.",
    "about.highlight":
      "I am currently looking for an internship or first real projects where I can put my skills into practice and keep learning.",
    "about.btnWork": "Let’s work together",
    "about.btnCV": "Download my CV",

    "about.accordion.path.title": "My background",
    "about.accordion.path.text":
      "With a versatile background, I chose web development to combine creativity and logic. I have been trained in web fundamentals (HTML, CSS, JavaScript) and modern tools, and I now want to keep learning through real projects and teamwork.",
    "about.accordion.skills.title": "What I can do",
    "about.accordion.skills.text":
      "Implement responsive layouts, build dynamic pages with JavaScript, use front-end frameworks, design and manage databases, always with attention to accessibility, design quality and code readability.",
    "about.accordion.search.title": "What I’m looking for",
    "about.accordion.search.text":
      "A place where I can contribute to real projects, grow my front-end and back-end skills, and bring my sense of organisation, reliability and communication.",

    "skills.title": "Skills",
    "skills.subtitle": "Technologies I use based on my training and projects.",
    "skills.frontend.title": "Front-end",
    "skills.frontend.desc": "Building modern, responsive and user-friendly interfaces.",
    "skills.frontend.html": "HTML5",
    "skills.frontend.css": "CSS3",
    "skills.frontend.js": "JavaScript",
    "skills.frontend.react": "React (basics)",
    "skills.frontend.angular": "Angular",
    "skills.backend.title": "Back-end",
    "skills.backend.desc": "Server-side development adapted to project needs.",
    "skills.backend.php": "PHP (Symfony)",
    "skills.backend.python": "Python (Django)",
    "skills.backend.csharp": "C# (ASP.NET)",
    "skills.backend.node": "Node.js",
    "skills.db.title": "Databases and servers",
    "skills.db.desc": "Tools used during my training and projects.",
    "skills.db.mysql": "MySQL Server",
    "skills.db.apache": "Apache / IIS",
    "skills.db.uml": "UML and design",

    "contact.title": "Contact",
    "contact.subtitle":
      "Want to collaborate or know more? Send me a message or let’s connect 👇",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send",
    "contact.link.email": "Email",
    "contact.link.github": "GitHub",
    "contact.link.linkedin": "LinkedIn",
    "contact.form.confirm": "Thank you, your message has been recorded.",

    "projects.title": "Portfolio",
    "projects.subtitle": "Some projects and development exercises.",

    "projects.p1.title": "My first HTML/CSS page",
    "projects.p1.desc":
      "A presentation page with sections such as “Who am I?”, “My background”, “My education” and a contact form. The focus was on layout, rounded cards and a consistent colour palette.",
    "projects.p1.tag.html": "HTML",
    "projects.p1.tag.css": "CSS",
    "projects.p1.tag.mockup": "Mockup",

    "projects.p2.title": "Quiz in PHP / Symfony",
    "projects.p2.desc":
      "A quiz application with question management, server-side logic and dynamic rendering. Built in PHP using the Symfony framework with an MVC architecture and a MySQL database.",

    "projects.p3.title": "Le Seau d’Eau",
    "projects.p3.desc":
      "A small interactive game built with HTML, CSS and JavaScript. You control an empty bucket that must find a water source and water the plant in the centre of the board. You can move in any direction, and blocked tiles appear randomly. This project showcases game logic and DOM manipulation.",
    "projects.p3.tag.game": "Game",

    "projects.p4.title": "Annie’s Portfolio",
    "projects.p4.desc":
      "A personal website created to present my profile as a junior web developer. Built with HTML, CSS and JavaScript, it highlights my skills, projects and CV with a modern design and smooth animations.",
    "projects.p4.tag.design": "Design",

    "projects.p5.title": "MamanBudget - Educational game",
    "projects.p5.desc":
      "Developed during a hackathon at Interface 3, MamanBudget is an educational web application built with Symfony that simulates managing a single-parent household over one month. I mainly contributed to the back-end: database modelling, game logic and preparing the final data.",
    "projects.p5.tag.hackathon": "Hackathon",

    "projects.btn.view": "View project",
    "projects.btn.code": "Source code",

    "footer.text": "© 2025 Annie. All rights reserved."
  },

  RO: {
    "site.title": "Portofoliul lui Annie – Dezvoltator Web Junior",

    "nav.home": "Acasă",
    "nav.skills": "Competențe",
    "nav.projects": "Portofoliu",
    "nav.contact": "Contact",

    "hero.title": "Dezvoltator Web Junior",
    "hero.subtitle":
      "Concep experiențe digitale moderne, cu design plăcut și cod îngrijit. Transform ideile în site-uri și aplicații care arată bine, sunt accesibile și ușor de întreținut în timp.",
    "hero.btnPortfolio": "Vezi portofoliul",
    "hero.btnContact": "Contactează-mă",

    "about.title": "Cine sunt?",
    "about.subtitle": "Câteva informații despre parcursul meu și modul meu de lucru.",
    "about.name": "AnnieCode",
    "about.text1":
      "Sunt dezvoltator web junior în reconversie profesională, pasionată de interfețe moderne, intuitive și accesibile. Îmi place să transform o idee într-un produs clar, bine structurat și ușor de dezvoltat în timp.",
    "about.highlight":
      "În prezent caut un stagiu sau primele proiecte reale în care să îmi pun abilitățile în practică și să continui să învăț.",
    "about.btnWork": "Hai să lucrăm împreună",
    "about.btnCV": "Descarcă CV-ul",

    "about.accordion.path.title": "Parcursul meu",
    "about.accordion.path.text":
      "Am un parcurs divers și am ales dezvoltarea web pentru a combina creativitatea cu logica. Am învățat bazele web-ului (HTML, CSS, JavaScript) și instrumente moderne, iar acum îmi doresc să evoluez lucrând în echipă și la proiecte reale.",
    "about.accordion.skills.title": "Ce pot să fac",
    "about.accordion.skills.text":
      "Integrarea de machete responsive, pagini dinamice cu JavaScript, utilizarea framework-urilor front-end, proiectarea și administrarea bazelor de date, cu atenție la accesibilitate, design și claritatea codului.",
    "about.accordion.search.title": "Ce caut",
    "about.accordion.search.text":
      "Un mediu în care pot contribui la proiecte reale, să îmi dezvolt competențele de front-end și back-end și să aduc organizare, seriozitate și comunicare.",

    "skills.title": "Competențe",
    "skills.subtitle": "Tehnologiile pe care le folosesc în urma formării și proiectelor mele.",
    "skills.frontend.title": "Front-end",
    "skills.frontend.desc": "Crearea interfețelor moderne, responsive și plăcute pentru utilizator.",
    "skills.frontend.html": "HTML5",
    "skills.frontend.css": "CSS3",
    "skills.frontend.js": "JavaScript",
    "skills.frontend.react": "React (bazele)",
    "skills.frontend.angular": "Angular",
    "skills.backend.title": "Back-end",
    "skills.backend.desc": "Dezvoltare pe partea de server, adaptată nevoilor proiectului.",
    "skills.backend.php": "PHP (Symfony)",
    "skills.backend.python": "Python (Django)",
    "skills.backend.csharp": "C# (ASP.NET)",
    "skills.backend.node": "Node.js",
    "skills.db.title": "Baze de date și servere",
    "skills.db.desc": "Instrumente folosite în timpul formării și în proiecte.",
    "skills.db.mysql": "MySQL Server",
    "skills.db.apache": "Apache / IIS",
    "skills.db.uml": "UML și concepție",

    "contact.title": "Contact",
    "contact.subtitle":
      "Vrei să colaborăm sau să afli mai multe? Scrie-mi sau hai să ne conectăm 👇",
    "contact.form.name": "Nume",
    "contact.form.email": "Email",
    "contact.form.message": "Mesaj",
    "contact.form.submit": "Trimite",
    "contact.link.email": "Email",
    "contact.link.github": "GitHub",
    "contact.link.linkedin": "LinkedIn",
    "contact.form.confirm": "Mulțumesc, mesajul tău a fost înregistrat.",

    "projects.title": "Portofoliu",
    "projects.subtitle": "Câteva proiecte și exerciții de dezvoltare.",

    "projects.p1.title": "Prima mea pagină HTML/CSS",
    "projects.p1.desc":
      "Pagină de prezentare cu secțiunile „Cine sunt?”, „Parcursul meu”, „Formarea mea” și un formular de contact. Accentul a fost pus pe structură, carduri cu colțuri rotunjite și o paletă de culori armonioasă.",
    "projects.p1.tag.html": "HTML",
    "projects.p1.tag.css": "CSS",
    "projects.p1.tag.mockup": "Machetă",

    "projects.p2.title": "Quiz în PHP / Symfony",
    "projects.p2.desc":
      "Aplicație de tip quiz cu gestionarea întrebărilor, logică pe server și afișare dinamică. Proiect realizat în PHP, folosind framework-ul Symfony, cu arhitectură MVC și bază de date MySQL.",

    "projects.p3.title": "Le Seau d’Eau",
    "projects.p3.desc":
      "Mini-joc interactiv dezvoltat în HTML, CSS și JavaScript. Controlezi o găleată goală care trebuie să găsească o sursă de apă și să ude planta din centrul tablei. Te poți deplasa în toate direcțiile, iar câmpurile blocate apar aleator. Proiectul ilustrează logica de joc și manipularea DOM-ului.",
    "projects.p3.tag.game": "Joc",

    "projects.p4.title": "Portofoliul lui Annie",
    "projects.p4.desc":
      "Site personal creat pentru a-mi prezenta profilul de dezvoltator web junior. Realizat în HTML, CSS și JavaScript, pune în valoare competențele, proiectele și CV-ul meu, cu un design modern și animații fluide.",
    "projects.p4.tag.design": "Design",

    "projects.p5.title": "MamanBudget - Joc educativ",
    "projects.p5.desc":
      "Dezvoltat în cadrul unui hackathon la Interface 3, MamanBudget este o aplicație web educativă realizată cu Symfony, care simulează gestionarea unui cămin monoparental pe durata unei luni. Am contribuit în principal la partea de back-end: modelarea bazei de date, logica jocului și pregătirea datelor finale.",
    "projects.p5.tag.hackathon": "Hackathon",

    "projects.btn.view": "Vezi proiectul",
    "projects.btn.code": "Cod sursă",

    "footer.text": "© 2025 Annie. Toate drepturile rezervate."
  }
};

// 👉 FR PAR DÉFAUT, SANS LOCALSTORAGE
let i18nLang = "FR";

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

function setupProjectsHorizontalScroll() {
  const scroller = document.getElementById('projects-scroller');
  if (!scroller) return;

  // 👉 état pour éviter de quitter la section trop vite
  let readyToLeaveDown = false;
  let leaveDownResetTimer = null;

  scroller.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    if (delta === 0) return;

    const goingDown = delta > 0;
    const goingUp = delta < 0;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const atStart = scroller.scrollLeft <= 0;
    const atEnd = scroller.scrollLeft >= maxScrollLeft - 2; // petite marge

    const FACTOR = 1.8;                  // vitesse horizontale
    const step = Math.abs(delta) * FACTOR;

    // reset de l'armement quand on re-scroll horizontalement
    const resetLeaveDown = () => {
      readyToLeaveDown = false;
      if (leaveDownResetTimer) {
        clearTimeout(leaveDownResetTimer);
        leaveDownResetTimer = null;
      }
    };

    // 1) Scroll horizontal tant qu'on n'est pas au bord
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

    // 2) Au tout début → on remonte directement vers la section précédente
    if (typeof fullpage_api !== 'undefined') {
      e.preventDefault();
      e.stopPropagation();

      // 👉 vers le HAUT : pas besoin de délai, on peut partir direct
      if (goingUp && atStart) {
        fullpage_api.moveSectionUp();
        resetLeaveDown();
        return;
      }

      // 👉 vers le BAS, à la fin des projets : on demande 2 scrolls
      if (goingDown && atEnd) {
        if (!readyToLeaveDown) {
          // 1er scroll : on "arme" la sortie
          readyToLeaveDown = true;

          // si l'utilisateur ne re-scroll pas dans le délai, on annule
          leaveDownResetTimer = setTimeout(() => {
            readyToLeaveDown = false;
          }, 500); // ⏱️ délai avant d'oublier (0.7s environ)

          return; // on reste dans la section Projects
        }

        // 2e scroll dans le délai → on descend vers Contact
        fullpage_api.moveSectionDown();
        resetLeaveDown();
        return;
      }
    }
  }, { passive: false });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof fullpage !== 'undefined') {
    new fullpage('#fullpage', {
      // Navigation
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips: ['Accueil', 'À propos', 'Compétences', 'Portfolio', 'Contact'],
      showActiveTooltip: true,

        // Scrolling
      scrollingSpeed: 1400,                 // plus long = plus doux (700 → 1100)
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 400,               // un peu moins de délai après arrêt
      scrollBar: false,
      easingcss3: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fitToSectionDelay: 500, 

      // Accessibility
      keyboardScrolling: true,
      animateAnchor: false,
      recordHistory: false,

      // Design
      verticalCentered: true,
      paddingTop: '60px',
      sectionSelector: '.section',

      onLeave(origin, destination, direction) {
        const links = Array.from(document.querySelectorAll('.nav-link'));
        links.forEach(l => l.classList.remove('active'));

        const active = links[destination.index];
        if (active) active.classList.add('active');
      },

      // 👉 quand fullPage a fini de tout initialiser
      afterRender() {
        setupHeroParticles();
        setupProjectsHorizontalScroll();   // ⬅️ ON AJOUTE ÇA
      }
    });
  } else {
    // 👉 au cas où fullPage n’est pas chargé (fallback simple)
    setupHeroParticles();
    setupProjectsHorizontalScroll();       // ⬅️ ET ÇA AUSSI ICI
  }
});