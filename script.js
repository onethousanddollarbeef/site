const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

const slides = [...document.querySelectorAll(".slide")];
const dotsWrap = document.querySelector(".dots");
if (slides.length && dotsWrap) {
  let index = 0;
  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `Go to slide ${i + 1}`);
    btn.addEventListener("click", () => show(i));
    dotsWrap.appendChild(btn);
    return btn;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle("active", n === index));
    dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
  }

  document.querySelector(".slide-nav .prev")?.addEventListener("click", () => show(index - 1));
  document.querySelector(".slide-nav .next")?.addEventListener("click", () => show(index + 1));
  show(0);
  setInterval(() => show(index + 1), 7000);
}
