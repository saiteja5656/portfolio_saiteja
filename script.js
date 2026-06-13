function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark / light mode

const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll(".icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  setDarkMode();
}

btn.addEventListener("click", function () {
  setTheme();
});

btn2.addEventListener("click", function () {
  setTheme();
});

function setTheme() {
  let currentTheme = document.body.getAttribute("theme");

  if (currentTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.body.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-dark");
  });
}

function setLightMode() {
  document.body.removeAttribute("theme");
  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-light");
  });
}

// Show More / Show Less Projects Toggle
function toggleMoreProjects() {
  const hiddenRow = document.getElementById("moreProjects");
  const btn = document.getElementById("showMoreProjectsBtn");

  if (hiddenRow.classList.contains("expanded")) {
    // Collapse: go from the current full height back down to 0 so it animates.
    hiddenRow.style.maxHeight = hiddenRow.scrollHeight + "px";
    void hiddenRow.offsetHeight; // force reflow so the next change animates
    hiddenRow.classList.remove("expanded");
    hiddenRow.style.maxHeight = "0";
    btn.textContent = "Show More Projects ▼";
    // Scroll back to projects section top
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  } else {
    // Expand: size to the actual content height (resize-safe, never clips,
    // works no matter how many projects are added later).
    hiddenRow.classList.add("expanded");
    hiddenRow.style.maxHeight = hiddenRow.scrollHeight + "px";
    btn.textContent = "Show Less Projects ▲";
    // Once expanded, drop the cap entirely so reflow/rotation can't clip it.
    hiddenRow.addEventListener("transitionend", function onExpand(e) {
      if (e.propertyName !== "max-height") return;
      if (hiddenRow.classList.contains("expanded")) {
        hiddenRow.style.maxHeight = "none";
      }
      hiddenRow.removeEventListener("transitionend", onExpand);
    });
  }
}

// ── Role Cycling ──────────────────────────────────────────────
(function initRoleCycle() {
  const items = document.querySelectorAll('#roleCycle .role-item');
  if (!items.length) return;

  let current = 0;

  setInterval(() => {
    const prev = current;
    current = (current + 1) % items.length;

    // Mark previous as exiting (slides up)
    items[prev].classList.remove('role-active');
    items[prev].classList.add('role-exit');

    // After transition completes, clean up exit class
    items[prev].addEventListener('transitionend', function onEnd() {
      items[prev].classList.remove('role-exit');
      items[prev].removeEventListener('transitionend', onEnd);
    });

    // Bring in the next one from below
    items[current].classList.add('role-active');
  }, 2000);
})();