// ===== CONFIG: edit this to make the whole site yours =====================
// Day counter start date — when you started "building". Change freely.
const BUILDING_SINCE = "2023-05-01";

// PREVIOUSLY — past roles (collapsible)
const PREVIOUSLY = [
  {
    name: "DJSCE IETE",
    role: "Junior Strike Coordinator",
    meta: "SEP 2024 — FEB 2025",
    body: "Reviewed and edited research papers submitted for the DJS Strike and DJS Spark competitions.",
  },
  {
    name: "DJSCE IETE",
    role: "Events Department",
    meta: "SEP 2024 — FEB 2025",
    body: "Helped plan and run Unplugged, a large hardware hackathon — owned event logistics and built team-management skills.",
  },
  {
    name: "DJSCE BEATS",
    role: "Marketing Department",
    meta: "AUG 2024 — APR 2025",
    body: "Secured sponsors for open-mic and musical events; learned lead generation and sharpened negotiation skills.",
  },
];

// PROJECTS & INITIATIVES (collapsible)
const PROJECTS = [
  {
    name: "DJSCE BEATS — Band",
    role: "Lead Guitarist",
    meta: "AUG 2024 — PRESENT",
    body: "Lead guitarist of the college band — performed at inter-college competitions and brought home multiple podium finishes.",
  },
  {
    name: "Beats Retreat 2.0",
    role: "Organizer",
    meta: "2025",
    body: "Led organization of Beats Retreat 2.0, Open Mic and Engineering Diaries — engaging students through music and creative expression.",
  },
  {
    name: "Competitive Cricket",
    role: "Right-arm Medium Pacer",
    meta: "GILES & HARRIS SHIELD",
    body: "Swing bowler and middle-order batsman. 7/14 at the MI Interschool (Player of the Match), 7/36 vs St. Francis in the Giles Shield, and match-winning spells across school cricket.",
  },
];

// PRESS clippings
const PRESS = [
  {
    src: "THE HINDU",
    text: "Lakshdham HS, Goregaon 190 — Advait Sawant 46 — in the Harris Shield (Dec 2018).",
  },
  {
    src: "TIMES OF INDIA",
    text: "Lakshdham Goregaon 190 (Advait Sawant 46) beat St Xavier's by 56 runs — School's Cricket.",
  },
  {
    src: "KRIDA / MTONLINE",
    text: "Sanjay Sathe Memorial U-14 final — a decisive twin-strike spell sealed the title.",
  },
];

// ACHIEVEMENTS (title / detail)
const ACHIEVEMENTS = [
  ["Thakur Yuvotsav 2025", "Band Event — 1st Place"],
  ["DJS Trinity 2024", "Band Event — 1st Place"],
  ["DJS Trinity 2025 & 2026", "Band Event — 2nd Place"],
  ["Mithibai Kshitij 2025 & 2026", "Band Event — 3rd Place"],
  ["MI Interschool 2019", "Player of the Match (7/14)"],
  ["ICSE 10th Boards", "96% — Lakshdham High School"],
];

// ===== RENDER ==============================================================
function dayCount() {
  const start = new Date(BUILDING_SINCE);
  const days = Math.floor((Date.now() - start) / 86400000);
  document.getElementById("day-count").textContent = days.toLocaleString();
}

function accordionRow({ name, role, meta, body }) {
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `
    <button class="row-head" type="button">
      <span class="row-name">${name}<span class="role">${role}</span></span>
      <span class="row-plus">+</span>
    </button>
    <div class="row-body">
      <div class="row-body-inner">
        <span class="meta">${meta}</span>${body}
      </div>
    </div>`;
  const head = row.querySelector(".row-head");
  const bodyEl = row.querySelector(".row-body");
  head.addEventListener("click", () => {
    const open = row.classList.toggle("open");
    bodyEl.style.maxHeight = open ? bodyEl.scrollHeight + "px" : null;
  });
  return row;
}

function renderRows(targetSelector, data) {
  const target = document.querySelector(targetSelector);
  data.forEach((d) => target.appendChild(accordionRow(d)));
}

function renderPress() {
  const grid = document.getElementById("press-grid");
  PRESS.forEach(({ src, text }) => {
    const el = document.createElement("div");
    el.className = "press-item";
    el.innerHTML = `<div class="src">${src}</div><p>${text}</p>`;
    grid.appendChild(el);
  });
}

function renderAchievements() {
  const wrap = document.getElementById("ach");
  ACHIEVEMENTS.forEach(([title, detail]) => {
    const row = document.createElement("div");
    row.className = "ach-row";
    row.innerHTML = `<span class="a-title">${title}</span><span class="a-detail">${detail}</span>`;
    wrap.appendChild(row);
  });
}

// ===== THEME TOGGLE ========================================================
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const label = btn.querySelector(".t-label");
  const icon = btn.querySelector(".t-icon");
  const saved = localStorage.getItem("theme");
  if (saved === "light") setLight(true);

  function setLight(on) {
    document.documentElement.setAttribute("data-theme", on ? "light" : "dark");
    label.textContent = on ? "DARK" : "LIGHT";
    icon.innerHTML = on ? "&#9789;" : "&#9788;";
    localStorage.setItem("theme", on ? "light" : "dark");
  }
  btn.addEventListener("click", () =>
    setLight(document.documentElement.getAttribute("data-theme") !== "light")
  );
}

// ===== INIT ================================================================
dayCount();
renderRows("[data-accordion]:not(#projects)", PREVIOUSLY);
renderRows("#projects", PROJECTS);
renderPress();
renderAchievements();
initTheme();
