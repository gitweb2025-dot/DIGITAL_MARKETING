//LOADER
const loaderTL = gsap.timeline({
  defaults: { ease: "power2.out" },
});

loaderTL
  .from("#loader div > div > div", {
    opacity: 0,
    y: 12,
    duration: 0.8,
    stagger: 0.35,
  })
  .to("#loader", {
    clipPath: "inset(0 0 100% 0)",
    duration: 2.8,
    ease: "power3.inOut",
    delay: 0.3,
  })
  .set("#loader", { display: "none" })
  .call(() => {
    loaderFinished = true;
    startHeroIfReady();
  });


function startHeroIfReady() {
  if (!heroTL.isActive() && loaderFinished) {
    heroTL.play();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // If loader already finished before DOM was ready
  startHeroIfReady();
});

// NAVBAR GSAP

gsap.registerPlugin(ScrollTrigger);

const desktopSubmenus = document.querySelectorAll(".submenu");
const desktopToggles = document.querySelectorAll(".submenu-toggle");

const mobileMenu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");
const mobileClose = document.querySelector(".mobile-close");
const mobileLinks = document.querySelectorAll(".mobile-link");

const mobileSubmenus = document.querySelectorAll(".mobile-submenu");
const mobileToggles = document.querySelectorAll(".mobile-sub-toggle");


// Desktop dropdowns
gsap.set(desktopSubmenus, {
  autoAlpha: 0,
  y: 16,
  pointerEvents: "none",
});

// Mobile menu
gsap.set(mobileMenu, { x: "100%" });

// Mobile dropdowns
gsap.set(mobileSubmenus, {
  height: 0,
  autoAlpha: 0,
  overflow: "hidden",
});


desktopToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const submenu = toggle.closest(".has-sub").querySelector(".submenu");
    const isOpen = submenu.classList.contains("is-open");

    closeAllDesktopSubmenus(submenu);

    if (!isOpen) openDesktopSubmenu(submenu);
  });
});

function openDesktopSubmenu(menu) {
  menu.classList.add("is-open");
  gsap.to(menu, {
    autoAlpha: 1,
    y: 0,
    duration: 0.35,
    ease: "power3.out",
    pointerEvents: "auto",
  });
}

function closeDesktopSubmenu(menu) {
  menu.classList.remove("is-open");
  gsap.to(menu, {
    autoAlpha: 0,
    y: 16,
    duration: 0.25,
    ease: "power3.in",
    pointerEvents: "none",
  });
}

function closeAllDesktopSubmenus(except = null) {
  desktopSubmenus.forEach((menu) => {
    if (menu !== except && menu.classList.contains("is-open")) {
      closeDesktopSubmenu(menu);
    }
  });
}

// Click outside (DESKTOP ONLY)
document.addEventListener("click", () => {
  if (window.innerWidth >= 1024) {
    closeAllDesktopSubmenus();
  }
});


hamburger.addEventListener("click", () => {
  resetMobileSubmenus();

  mobileMenu.classList.remove("hidden");

  gsap.to(mobileMenu, {
    x: 0,
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.from(mobileLinks, {
    x: 40,
    autoAlpha: 0,
    stagger: 0.08,
    delay: 0.2,
    ease: "power3.out",
  });
});

mobileClose.addEventListener("click", closeMobileMenu);

function closeMobileMenu() {
  gsap.to(mobileMenu, {
    x: "100%",
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => {
      mobileMenu.classList.add("hidden");
      resetMobileSubmenus();
    },
  });
}


mobileToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const parent = toggle.closest(".has-sub");
    const submenu = parent.querySelector(".mobile-submenu");
    const icon = toggle.querySelector("i");
    const isOpen = submenu.classList.contains("open");

    if (isOpen) {
      closeMobileSubmenu(submenu);
    } else {
      closeAllMobileSubmenus(submenu);

      submenu.classList.add("open");
      icon.classList.replace("fa-plus", "fa-minus");

      gsap.to(submenu, {
        height: "auto",
        autoAlpha: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  });
});

function closeAllMobileSubmenus(except = null) {
  mobileSubmenus.forEach((menu) => {
    if (menu !== except && menu.classList.contains("open")) {
      closeMobileSubmenu(menu);
    }
  });
}

function closeMobileSubmenu(menu) {
  menu.classList.remove("open");
  const icon = menu.closest(".has-sub").querySelector("i");
  icon.classList.replace("fa-minus", "fa-plus");

  gsap.to(menu, {
    height: 0,
    autoAlpha: 0,
    duration: 0.25,
    ease: "power3.in",
  });
}

function resetMobileSubmenus() {
  mobileSubmenus.forEach((menu) => {
    menu.classList.remove("open");
    gsap.set(menu, { height: 0, autoAlpha: 0 });
    const icon = menu.closest(".has-sub")?.querySelector("i");
    if (icon) icon.classList.replace("fa-minus", "fa-plus");
  });
}

// HOME GSAP

let loaderFinished = false;

gsap.set(".hero-content > *", {
  y: 40,
  autoAlpha: 0,
});

gsap.set(".hero-image img", {
  x: 60,
  autoAlpha: 0,
});

const heroTL = gsap.timeline({
  paused: true,
  defaults: { ease: "power3.out" },
});

heroTL
  .to(".hero-content > *", {
    y: 0,
    autoAlpha: 1,
    stagger: 0.5,
    duration: 1.8,
  })
  .to(
    ".hero-image img",
    {
      x: 0,
      autoAlpha: 1,
      duration: 1,
    },
    "-=0.6",
  );

// ABOUT GSAP

// IMAGE ENTRANCE
gsap.from(".image-item", {
  scrollTrigger: {
    trigger: ".agency-section",
    start: "top 70%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power3.out",
});

// BADGE
gsap.to(".badge-circle", {
  rotation: 360,
  duration: 20, // slower = more premium
  repeat: -1,
  ease: "none", // REQUIRED for smooth infinite rotation
  transformOrigin: "50% 50%",
});

// CONTENT
gsap.from(
  ".content-tag, .content-title, .content-text, .experience-card, .cta-group",
  {
    scrollTrigger: {
      trigger: ".content-wrap",
      start: "top 75%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.9,
    ease: "power3.out",
  },
);

// SERVICES GSAP

gsap.from(".gsap-heading", {
  scrollTrigger: {
    trigger: ".gsap-heading",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".gsap-left", {
  scrollTrigger: {
    trigger: ".gsap-left",
    start: "top 80%",
  },
  x: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".gsap-right", {
  scrollTrigger: {
    trigger: ".gsap-right",
    start: "top 80%",
  },
  x: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Content Data
const serviceData = {
  branding: {
    title: "Branding & Identity",
    desc: "We build strong digital identities that connect emotionally with audiences, combining strategy, design, and innovation.",
    img: "./src/assets/s1.webp",
  },
  strategy: {
    title: "Creative Strategy",
    desc: "Data-driven strategies designed to scale your digital presence and outperform competitors.",
    img: "./src/assets/s2.webp",
  },
  content: {
    title: "Content Creation",
    desc: "Scroll-stopping content crafted to engage, convert, and amplify your brand voice.",
    img: "./src/assets/s3.webp",
  },
  marketing: {
    title: "Campaign Management",
    desc: "High-performance campaigns optimized for reach, ROI, and measurable growth.",
    img: "./src/assets/s4.webp",
  },
};

// Click Interaction
document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("click", () => {
    const key = item.dataset.service;

    document.querySelectorAll(".service-item").forEach((el) => {
      el.classList.remove("service-active", "bg-primary", "text-white");
      el.classList.add("bg-gray-200/50");
    });

    item.classList.add("bg-primary", "text-white");

    gsap.to("#serviceImage, #serviceTitle, #serviceDesc", {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        serviceTitle.textContent = serviceData[key].title;
        serviceDesc.textContent = serviceData[key].desc;
        serviceImage.src = serviceData[key].img;

        gsap.to("#serviceImage, #serviceTitle, #serviceDesc", {
          opacity: 1,
          y: 0,
          duration: 0.4,
        });
      },
    });
  });
});

// STATS GSAP

document.querySelectorAll(".stat-number").forEach((el) => {
  let target = +el.dataset.value;

  gsap.fromTo(
    el,
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      ease: "power1.out",
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
      },
      onUpdate() {
        if (target >= 1000) {
          el.innerText = Math.floor(el.innerText / 1000) + "K";
        }
      },
    },
  );
});

/* PROCESS ANIMATION */
gsap.from(".process-card", {
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".process-wrap",
    start: "top 75%",
  },
});

/* SVG ARROWS DRAW */
gsap.from(".arrow-svg path", {
  strokeDasharray: 300,
  strokeDashoffset: 300,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".process-wrap",
    start: "top 70%",
  },
});

// WHY CHOOSE US GSAP

gsap.from(".gsap-why-left", {
  scrollTrigger: {
    trigger: ".gsap-why-left",
    start: "top 80%",
  },
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".gsap-why-right > div", {
  scrollTrigger: {
    trigger: ".gsap-why-right",
    start: "top 75%",
  },
  scale: 0.6,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "back.out(1.7)",
});

// TEAMS GSAP

// HEADER
gsap.from(".team-header", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".team-section",
    start: "top 75%",
  },
});

// CARDS
gsap.from(".team-card", {
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".team-wrap",
    start: "top 75%",
  },
});

// BLOGS GSAP

// HEADER
gsap.from(".blog-header", {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".blog-section",
    start: "top 75%",
  },
});

// CARDS
gsap.from(".blog-card", {
  y: 60,
  scale: 0.8,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".blog-grid",
    start: "top 75%",
    scrub: true,
    once: true,
  },
});

// TESTIMONIALS GSAP

// LEFT CONTENT
gsap.from(".feedback-left", {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".client-feedback-section",
    start: "top 75%",
  },
});

// CARDS
gsap.from(".feedback-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".feedback-right",
    start: "top 75%",
  },
});

// CONTACT US GSAP

gsap.from(".gsap-contact-left", {
  scrollTrigger: {
    trigger: ".gsap-contact-left",
    start: "top 80%",
  },
  x: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".gsap-contact-form", {
  scrollTrigger: {
    trigger: ".gsap-contact-form",
    start: "top 80%",
  },
  x: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// FORM VALIDATION
const form = document.getElementById("contactForm");
const emailField = document.getElementById("emailField");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailValue = emailField.value.trim();

  if (!emailValue.endsWith("@gmail.com")) {
    emailField.setAttribute("title", "Accept only @gmail.com");
    emailField.reportValidity();
    return;
  }

  // Clear fields
  form.reset();

  // Redirect
  window.location.href = "./404.html";
});

// FAQ WITH GSAP

gsap.from(".gsap-faq-header", {
  scrollTrigger: {
    trigger: ".gsap-faq-header",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".gsap-faq-grid", {
  scrollTrigger: {
    trigger: ".gsap-faq-grid",
    start: "top 80%",
  },
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

const items = document.querySelectorAll(".faq-item");

items.forEach((item) => {
  item.addEventListener("click", () => {
    items.forEach((el) => {
      if (el !== item) {
        el.classList.remove("active-faq");
        el.querySelector(".faq-answer").classList.add("hidden");
        el.querySelector(".faq-icon").classList.replace("fa-minus", "fa-plus");
      }
    });

    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (answer.classList.contains("hidden")) {
      answer.classList.remove("hidden");
      icon.classList.replace("fa-plus", "fa-minus");

      gsap.from(answer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      answer.classList.add("hidden");
      icon.classList.replace("fa-minus", "fa-plus");
    }
  });
});

// FOOTER GSAP
// FOOTER COLUMNS
gsap.from(".footer-brand, .footer-col", {
  opacity: 0,
  y: 60,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".mark-footer",
    start: "top 80%",
  },
});

// LENIS JS

const lenis = new Lenis({
  duration: 2, // Smoothness (1–1.5 recommended)
  // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Natural ease
  easing: (t) => 1 - Math.pow(1 - t, 4),
  smoothWheel: true, // Mouse wheel smoothing
  smoothTouch: false, // Disable on mobile (better UX)
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

gsap.ticker.lagSmoothing(0);
