import {
  firebaseIsConfigured,
  observeUser,
  signInWithGoogle,
  signOutUser,
  getProgress,
  saveProgress,
  recordEvent
} from "./firebase-service.js";

const state = {
  language: localStorage.getItem("sop-language") || "es",
  route: "home",
  user: null,
  progress: {},
  selectedModule: null,
  selectedCase: 0,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false
};

const main = document.getElementById("app-main");
const modalRoot = document.getElementById("modal-root");
const toastRoot = document.getElementById("toast-root");
const sidebar = document.getElementById("sidebar");

function content() {
  return window.SOP_CONTENT[state.language];
}

function safe(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function complete(id) {
  return state.progress[id] && state.progress[id].status === "completed";
}

function completedCount() {
  return content().modules.filter((module) => complete(module.id)).length;
}

function button(text, action, extra = "") {
  return `<button class="button ${extra}" type="button" data-action="${action}">${text}</button>`;
}

function updateChrome() {
  const data = content();
  const nav = document.querySelectorAll(".nav-link");

  nav.forEach((item, index) => {
    item.textContent = data.ui[
      ["navHome", "navLearn", "navCases", "navLibrary", "navProgress"][index]
    ];
    item.classList.toggle("is-active", item.dataset.route === state.route);
  });

  document.querySelectorAll("[data-language]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.language === state.language);
  });

  document.getElementById("privacy-note").innerHTML =
    `🔒 ${state.language === "es"
      ? "Guía educativa: no incluyas datos sensibles."
      : state.language === "en"
        ? "Educational guide: do not add sensitive data."
        : "Guide éducatif : n’ajoutez pas de données sensibles."}`;

  document.getElementById("breadcrumbs").textContent =
    data.ui[
      {
        home: "navHome",
        learn: "navLearn",
        cases: "navCases",
        library: "navLibrary",
        progress: "navProgress"
      }[state.route]
    ];

  const profile = document.getElementById("profile-button");

  if (state.user) {
    profile.innerHTML = `
      <span class="profile-avatar">
        ${state.user.photoURL
          ? `<img src="${safe(state.user.photoURL)}" alt="">`
          : "●"}
      </span>
      <span class="profile-name">${safe(state.user.displayName || "User")}</span>
    `;
  } else {
    profile.innerHTML = `<span class="avatar-fallback">●</span>
      <span class="profile-name">${data.ui.guest}</span>`;
  }
}

function footer() {
  const credits = content().credits;
  return `
    <footer class="site-footer">
      <div class="footer-credit"><span class="footer-mark">SOP</span>${credits[0]}</div>
      <div class="footer-credit"><span class="footer-dot"></span>${credits[1]}</div>
    </footer>
  `;
}

function moduleCard(module) {
  const data = content();
  const done = complete(module.id);

  return `
    <article class="module-card reveal">
      <div class="module-card-top">
        <span class="module-number">${module.number}</span>
        <span class="module-icon">${module.icon}</span>
      </div>
      <div class="module-card-body">
        <h3>${safe(module.title)}</h3>
        <p>${safe(module.summary)}</p>
      </div>
      <div class="module-card-footer">
        <span>${module.minutes} min</span>
        <button class="text-button" data-action="open-module" data-id="${module.id}">
          ${done ? data.ui.completed : data.labels[4]} →
        </button>
      </div>
    </article>
  `;
}

function home() {
  const data = content();
  const modules = data.modules.slice(0, 3).map(moduleCard).join("");

  return `
    <div class="page home-page">
      <section class="hero-grid">
        <div class="hero-copy reveal">
          <div class="hero-eyebrow"><span class="eyebrow-dot"></span>${data.hero[0]}</div>
          <h1>${data.hero[1]} <em>${data.hero[2]}</em></h1>
          <p class="hero-body">${data.hero[3]}</p>
          <div class="hero-actions">
            ${button(data.hero[4], "route-learn", "button-primary")}
            ${button(data.hero[5], "route-cases", "button-secondary")}
          </div>
          <p class="hero-note">✓ ${state.language === "es"
            ? "Valida siempre las políticas y herramientas vigentes."
            : state.language === "en"
              ? "Always validate current policies and tools."
              : "Validez toujours les politiques et outils en vigueur."}</p>
        </div>

        <div class="hero-visual reveal">
          <span class="visual-orbit orbit-one"></span>
          <span class="visual-orbit orbit-two"></span>
          <div class="visual-topline"><span>LEARNING HUB</span><span class="live-dot"></span></div>
          <div class="visual-main">
            <h3>${data.labels[0]}</h3>
            <p>${state.language === "es" ? "Decidir con contexto" : state.language === "en" ? "Decide with context" : "Décider avec contexte"}</p>
            <div class="mini-grid">
              <div class="mini-metric"><b>8</b><span>${data.labels[0]}</span></div>
              <div class="mini-metric"><b>3</b><span>${data.labels[1]}</span></div>
              <div class="mini-metric"><b>10</b><span>quiz</span></div>
            </div>
            <div class="mini-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>
          </div>
          <span class="visual-chip chip-one">✦ ${data.labels[1]}</span>
          <span class="visual-chip chip-two">✓ ${data.labels[2]}</span>
        </div>
      </section>

      <section class="home-stats">
        <article class="stat-card stat-card-feature"><span class="stat-kicker">PROGRESO</span><strong>${completedCount()}/8</strong><p>${data.labels[0]}</p></article>
        <article class="stat-card"><strong>3</strong><p>${data.labels[1]}</p></article>
        <article class="stat-card"><strong>10</strong><p>Quiz</p></article>
        <article class="stat-card"><strong>ES / EN / FR</strong><p>${state.language === "es" ? "Idiomas disponibles" : "Languages"}</p></article>
      </section>

      <section>
        <div class="section-heading">
          <div><span class="section-kicker">01 · SOP</span><h2>${data.ui.navLearn}</h2></div>
          ${button(data.labels[3], "route-learn", "button-secondary small-button")}
        </div>
        <div class="home-module-grid">${modules}</div>
      </section>
      ${footer()}
    </div>
  `;
}

function learn() {
  const data = content();

  return `
    <div class="page learn-page">
      <header class="page-header">
        <span class="section-kicker">SOP · 8 ${data.labels[0]}</span>
        <h1>${data.ui.navLearn}</h1>
        <p>${state.language === "es"
          ? "Sigue los módulos en orden o elige el tema que necesitas practicar."
          : state.language === "en"
            ? "Follow the modules in order or choose the topic you need to practice."
            : "Suivez les modules dans l’ordre ou choisissez le sujet à pratiquer."}</p>
      </header>
      <div class="module-grid">${data.modules.map(moduleCard).join("")}</div>
      ${footer()}
    </div>
  `;
}

function lesson() {
  const data = content();
  const module = data.modules.find((item) => item.id === state.selectedModule);

  if (!module) {
    state.route = "learn";
    return learn();
  }

  return `
    <div class="page lesson-page">
      <button class="back-button text-button" data-action="route-learn">← ${data.ui.continue}</button>
      <div class="lesson-layout">
        <section>
          <article class="lesson-hero reveal">
            <div class="lesson-heading">
              <span class="lesson-icon">${module.icon}</span>
              <div><span class="section-kicker">${module.number} · ${module.minutes} min</span><h1>${safe(module.title)}</h1><p>${safe(module.summary)}</p></div>
            </div>
            <div class="lesson-objective"><strong>${data.labels[5]}:</strong> ${safe(module.objective)}</div>
          </article>

          <div class="lesson-content">
            <article class="lesson-block">
              <div class="lesson-block-heading"><span class="block-icon">→</span><h2>${data.labels[6]}</h2></div>
              <ol>${module.steps.map((step) => `<li>${safe(step)}</li>`).join("")}</ol>
            </article>
            <article class="warning-block"><strong>${data.labels[7]}:</strong> ${safe(module.watchOut)}</article>
            <article class="lesson-block">
              <div class="lesson-block-heading"><span class="block-icon">✦</span><h2>${data.labels[8]}</h2></div>
              <p>${safe(module.action)}</p>
            </article>
          </div>
        </section>

        <aside class="lesson-aside">
          <span class="aside-label">CHECKPOINT</span>
          <p class="lesson-aside-note">${complete(module.id)
            ? data.ui.completed
            : state.language === "es"
              ? "Completa el módulo después de practicar."
              : state.language === "en"
                ? "Complete the module after practicing."
                : "Terminez le module après la pratique."}</p>
          ${button(
            complete(module.id) ? `✓ ${data.ui.completed}` : data.labels[3],
            `complete-module:${module.id}`,
            "button-primary wide-button"
          )}
          ${button("Quiz · 10", "open-quiz", "button-secondary wide-button")}
        </aside>
      </div>
      ${footer()}
    </div>
  `;
}

function cases() {
  const data = content();
  const selected = data.cases[state.selectedCase];

  return `
    <div class="page cases-page">
      <header class="page-header">
        <span class="section-kicker">PRACTICE</span>
        <h1>${data.ui.navCases}</h1>
        <p>${state.language === "es" ? "Elige una respuesta y revisa el razonamiento." : state.language === "en" ? "Choose an answer and review the reasoning." : "Choisissez une réponse et consultez le raisonnement."}</p>
      </header>
      <div class="cases-layout">
        <aside class="case-list">
          ${data.cases.map((item, index) => `<button class="case-nav-item ${index === state.selectedCase ? "is-active" : ""}" data-action="case:${index}">${index + 1}. ${safe(item.title)}</button>`).join("")}
        </aside>
        <section class="case-workspace reveal">
          <div class="case-workspace-top"><span class="case-tag">CASE ${state.selectedCase + 1}</span><span class="case-signal">${safe(selected.title)}</span></div>
          <div class="case-context">${safe(selected.question)}</div>
          <div class="case-options">
            ${selected.options.map((option, index) => `<button class="case-option" data-action="answer-case:${index}">${safe(option)}</button>`).join("")}
          </div>
          <div id="case-feedback"></div>
        </section>
      </div>
      ${footer()}
    </div>
  `;
}

function library() {
  const data = content();

  return `
    <div class="page library-page">
      <header class="page-header">
        <span class="section-kicker">TOOLS</span>
        <h1>${data.ui.navLibrary}</h1>
        <p>${state.language === "es" ? "Recursos para estructurar tu análisis y tus próximos pasos." : state.language === "en" ? "Resources to structure analysis and next steps." : "Ressources pour structurer votre analyse et les prochaines étapes."}</p>
      </header>
      <div class="resource-grid">
        ${data.resources.map((resource) => `
          <article class="resource-card">
            <div class="resource-card-top"><span class="resource-type">CHECKLIST</span><span class="resource-icon">${resource.icon}</span></div>
            <h3>${safe(resource.title)}</h3>
            <p>${safe(resource.action)}</p>
            <button class="button button-secondary small-button" data-action="open-module" data-id="${resource.id}">${data.labels[4]}</button>
          </article>
        `).join("")}
      </div>
      ${footer()}
    </div>
  `;
}

function progress() {
  const data = content();
  const percent = Math.round((completedCount() / data.modules.length) * 100);

  return `
    <div class="page progress-page">
      <header class="page-header">
        <span class="section-kicker">TRACKER</span>
        <h1>${data.ui.navProgress}</h1>
        <p>${state.user
          ? safe(state.user.email || state.user.displayName)
          : state.language === "es"
            ? "Exploras como invitado. Inicia sesión para sincronizar tu progreso."
            : state.language === "en"
              ? "You are exploring as a guest. Sign in to sync progress."
              : "Vous explorez en invité. Connectez-vous pour synchroniser votre progrès."}</p>
      </header>
      <section class="progress-overview">
        <div class="radial-progress" data-value="${percent}%" style="--value:${percent}%"></div>
        <h2>${completedCount()} / ${data.modules.length}</h2>
        <p>${data.labels[0]}</p>
        ${!state.user ? button(data.ui.signIn, "login", "button-primary") : ""}
      </section>
      <section class="progress-module-list">
        ${data.modules.map((module) => `
          <article class="progress-module-row">
            <span class="progress-module-icon">${module.icon}</span>
            <div><strong>${safe(module.title)}</strong><p>${module.minutes} min</p></div>
            <span class="module-status">${complete(module.id) ? "✓" : "○"}</span>
          </article>
        `).join("")}
      </section>
      ${footer()}
    </div>
  `;
}

function render() {
  updateChrome();

  const views = {
    home,
    learn,
    lesson,
    cases,
    library,
    progress
  };

  main.innerHTML = (views[state.route] || home)();
  main.focus();
}

function toast(message) {
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  toastRoot.appendChild(item);
  setTimeout(() => item.remove(), 3200);
}

async function completeModule(id) {
  state.progress[id] = { status: "completed" };

  if (state.user) {
    await saveProgress(state.user.uid, id, { status: "completed" });
    await recordEvent(state.user.uid, "module_completed", id);
  }

  toast(state.language === "es" ? "Progreso guardado." : state.language === "en" ? "Progress saved." : "Progrès enregistré.");
  render();
}

function openQuiz() {
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizAnswered = false;
  renderQuiz();
}

function renderQuiz() {
  const data = content();
  const question = data.quiz[state.quizIndex];

  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <section class="modal-card quiz-modal">
        <button class="modal-close" data-action="close-modal">×</button>
        <span class="section-kicker">QUIZ ${state.quizIndex + 1} / ${data.quiz.length}</span>
        <h2>${safe(question.question)}</h2>
        <div class="quiz-options">
          ${question.options.map((option, index) => `<button class="quiz-option" data-action="quiz-answer:${index}">${safe(option)}</button>`).join("")}
        </div>
        <div id="quiz-feedback"></div>
      </section>
    </div>
  `;
}

function answerQuiz(index) {
  if (state.quizAnswered) return;

  state.quizAnswered = true;
  const question = content().quiz[state.quizIndex];
  const correct = index === question.answer;
  if (correct) state.quizScore += 1;

  document.querySelectorAll(".quiz-option").forEach((button, buttonIndex) => {
    if (buttonIndex === question.answer) button.classList.add("is-active");
  });

  const final = state.quizIndex === content().quiz.length - 1;
  document.getElementById("quiz-feedback").innerHTML = `
    <div class="quiz-feedback ${correct ? "correct" : "incorrect"}">
      ${correct ? "✓" : "!"} ${safe(question.explanation)}
    </div>
    <div class="modal-actions">
      ${button(
        final ? `${state.quizScore + (correct ? 0 : 0)} / ${content().quiz.length} · ${state.language === "es" ? "Finalizar" : state.language === "en" ? "Finish" : "Terminer"}` : state.language === "es" ? "Siguiente pregunta" : state.language === "en" ? "Next question" : "Question suivante",
        final ? "close-modal" : "next-quiz",
        "button-primary"
      )}
    </div>
  `;
}

async function login() {
  if (!firebaseIsConfigured()) {
    toast(state.language === "es"
      ? "Firebase se configurará al final. Puedes continuar como invitado."
      : "Firebase will be configured at the end. You can continue as a guest.");
    return;
  }

  try {
    await signInWithGoogle(state.language);
  } catch (error) {
    console.error(error);
    toast("No se pudo iniciar sesión. Revisa la configuración de Firebase.");
  }
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("[data-action],[data-route],[data-language]");
  if (!target) return;

  if (target.dataset.language) {
    state.language = target.dataset.language;
    localStorage.setItem("sop-language", state.language);
    render();
    return;
  }

  if (target.dataset.route) {
    state.route = target.dataset.route;
    state.selectedModule = null;
    sidebar.classList.remove("is-open");
    render();
    return;
  }

  const action = target.dataset.action || "";

  if (action === "route-learn") { state.route = "learn"; render(); }
  if (action === "route-cases") { state.route = "cases"; render(); }
  if (action === "open-module") { state.selectedModule = target.dataset.id; state.route = "lesson"; render(); }
  if (action === "login") login();
  if (action === "logout") signOutUser();
  if (action === "open-quiz") openQuiz();
  if (action === "close-modal") modalRoot.innerHTML = "";
  if (action === "next-quiz") {
    state.quizIndex += 1;
    state.quizAnswered = false;
    renderQuiz();
  }

  if (action.startsWith("complete-module:")) {
    completeModule(action.split(":")[1]);
  }

  if (action.startsWith("case:")) {
    state.selectedCase = Number(action.split(":")[1]);
    render();
  }

  if (action.startsWith("answer-case:")) {
    const index = Number(action.split(":")[1]);
    const current = content().cases[state.selectedCase];
    const correct = index === current.answer;

    document.getElementById("case-feedback").innerHTML = `
      <div class="case-feedback ${correct ? "correct" : "incorrect"}">
        ${correct ? "✓" : "!"} ${safe(current.explanation)}
      </div>
    `;
  }

  if (action.startsWith("quiz-answer:")) {
    answerQuiz(Number(action.split(":")[1]));
  }
});

document.getElementById("profile-button").addEventListener("click", () => {
  if (state.user) {
    signOutUser().then(() => toast("Sesión cerrada."));
  } else {
    login();
  }
});

document.getElementById("menu-toggle").addEventListener("click", () => {
  sidebar.classList.toggle("is-open");
});

observeUser(async (user) => {
  state.user = user;

  if (user) {
    state.progress = await getProgress(user.uid);
  }

  render();
}, state.language).catch((error) => console.warn(error));

render();
