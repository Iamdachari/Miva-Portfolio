// =========================================================
// main.js — shared behaviour for every page
// (mobile menu, active link, scroll animations, footer year)
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  setupMenu();
  highlightActiveLink();
  setupReveal();
  setFooterYear();
});

// Mobile menu: open / close the navigation on small screens
function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // close the menu after a link is tapped
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Mark the link of the current page as active
function highlightActiveLink() {
  let page = window.location.pathname.split("/").pop();
  if (page === "") page = "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

// Fade elements in as they scroll into view; also fills skill bars
function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    fillSkillBars(document);
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fillSkillBars(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
}

function fillSkillBars(scope) {
  scope.querySelectorAll(".skill-bar span").forEach(function (bar) {
    bar.style.width = bar.dataset.level + "%";
  });
}

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}
