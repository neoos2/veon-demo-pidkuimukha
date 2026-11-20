// Page behaviour: lineage lines, mobile menu, call bar. Content never depends on this script (UX-R006):
// without JS the lines are drawn, the menu button is hidden and the call bar stays visible.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Motion 1 and 2: the lineage line draws itself (hero on load, services when it enters the screen).
const drawn = document.querySelectorAll<HTMLElement>("[data-draw]");
const draw = (el: Element) => el.classList.add("is-drawn");
if (reduce || !("IntersectionObserver" in window)) {
  drawn.forEach(draw);
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { draw(e.target); io.unobserve(e.target); }
  }, { threshold: 0.25 });
  drawn.forEach((el) => {
    if (el.dataset.draw === "hero") requestAnimationFrame(() => requestAnimationFrame(() => draw(el)));
    else io.observe(el);
  });
}

// Mobile menu: full-screen panel, closes on anchor, Esc and the button; focus stays inside.
const btn = document.querySelector<HTMLButtonElement>(".menu-btn");
const menu = document.getElementById("menu");
if (btn && menu) {
  const focusables = () => [btn, ...menu.querySelectorAll<HTMLElement>("a[href]")];
  const setOpen = (open: boolean, restore = true) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
    menu.hidden = !open;
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) menu.querySelector<HTMLElement>("a[href]")?.focus();
    else if (restore) btn.focus();
  };
  btn.addEventListener("click", () => setOpen(menu.hidden));
  menu.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest('a[href^="#"]')) setOpen(false, false);
  });
  document.addEventListener("keydown", (e) => {
    if (menu.hidden) return;
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "Tab") {
      const list = focusables();
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (m) => { if (m.matches && !menu.hidden) setOpen(false, false); });
}

// Motion 4: the call bar slides in once the hero has left the screen (≤ 768 px, CSS decides visibility).
const bar = document.querySelector<HTMLElement>(".callbar");
const hero = document.getElementById("hero");
if (bar && hero && "IntersectionObserver" in window) {
  bar.classList.add("is-armed");
  new IntersectionObserver(([e]) => bar.classList.toggle("is-on", !e.isIntersecting), { threshold: 0 }).observe(hero);
}
