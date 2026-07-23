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

function currentLang() {
  return location.pathname.includes("/zh/") || location.pathname.endsWith("/zh") ? "zh" : "en";
}

function mapLangPath(lang) {
  const path = location.pathname;
  const file = path.split("/").pop() || "index.html";
  if (lang === "zh") {
    if (path.includes("/zh/")) return path;
    if (!file || file === "" || file === "/") return "zh/index.html";
    return `zh/${file === "index.html" || file === "" ? "index.html" : file}`;
  }
  if (path.includes("/zh/")) {
    return "../" + (file || "index.html");
  }
  return path;
}

document.querySelectorAll("[data-lang-switch]").forEach((select) => {
  select.value = currentLang();
  select.addEventListener("change", () => {
    const next = select.value;
    if (next === currentLang()) return;
    const target = mapLangPath(next);
    location.href = target;
  });
});

/**
 * Form backend:
 * 1) Preferred: set window.FORMSPREE_ENDPOINT = "https://formspree.io/f/xxxxxx"
 * 2) Fallback: posts to FormSubmit email inbox for admin@lanicao.com
 */
async function handleLeadForm(form) {
  const status = form.querySelector(".form-status") || Object.assign(document.createElement("p"), { className: "form-status" });
  if (!form.querySelector(".form-status")) form.appendChild(status);

  const data = new FormData(form);
  data.append("_subject", form.dataset.subject || "Website lead");
  data.append("_language", currentLang());

  const endpoint =
    window.FORMSPREE_ENDPOINT ||
    form.getAttribute("action") ||
    "https://formsubmit.co/ajax/admin@lanicao.com";

  status.textContent = currentLang() === "zh" ? "提交中…" : "Sending…";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Request failed");
    form.reset();
    status.textContent =
      currentLang() === "zh"
        ? "感谢您的来信。我们会尽快与您联系。"
        : "Thank you. Your message was sent and saved for our team.";
  } catch (err) {
    status.textContent =
      currentLang() === "zh"
        ? "提交失败，请直接发送邮件至 admin@lanicao.com。"
        : "Submission failed. Please email admin@lanicao.com directly.";
  }
}

document.querySelectorAll("form[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleLeadForm(form);
  });
});
