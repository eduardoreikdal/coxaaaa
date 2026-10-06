"use strict";


/* =========================================================
   DADOS
========================================================= */

const news = [

    {
        id: 1,
        category: "futebol",
        categoryName: "Futebol",
        time: "Hoje",
        icon: "⚽",
        title: "Verdão se prepara para o próximo desafio",
        text: "Confira as principais informações sobre a preparação do Coritiba para seus próximos compromissos."
    },

    {
        id: 2,
        category: "torcida",
        categoryName: "Torcida",
        time: "Hoje",
        icon: "🏟️",
        title: "A força da torcida Coxa-Branca",
        text: "A paixão das arquibancadas é uma das marcas mais fortes da identidade do Coritiba."
    },

    {
        id: 3,
        category: "clube",
        categoryName: "Clube",
        time: "Ontem",
        icon: "🟢",
        title: "Tudo sobre o dia a dia do Coritiba",
        text: "Acompanhe informações, bastidores e novidades relacionadas ao clube."
    },

    {
        id: 4,
        category: "futebol",
        categoryName: "Futebol",
        time: "Ontem",
        icon: "📋",
        title: "Análise: pontos importantes para o próximo jogo",
        text: "Veja alguns dos aspectos que podem fazer diferença no próximo confronto."
    },

    {
        id: 5,
        category: "clube",
        categoryName: "Clube",
        time: "2 dias",
        icon: "🏆",
        title: "A história de um dos grandes clubes do Paraná",
        text: "Conheça momentos marcantes que ajudaram a construir a identidade do Verdão."
    },

    {
        id: 6,
        category: "torcida",
        categoryName: "Torcida",
        time: "2 dias",
        icon: "🟢",
        title: "Coxa-Branca: uma paixão passada de geração",
        text: "Histórias de torcedores mostram como a paixão pelo Coritiba atravessa gerações."
    }

];


const standings = [

    {
        name: "Coritiba",
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        sg: 0,
        highlight: true
    },

    {
        name: "Adversário FC",
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        sg: 0
    },

    {
        name: "Clube Atlético",
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        sg: 0
    },

    {
        name: "União Esporte",
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        sg: 0
    },

    {
        name: "Esporte Clube",
        pts: 0,
        j: 0,
        v: 0,
        e: 0,
        d: 0,
        sg: 0
    }

];


const tickerNews = [

    "Acompanhe todas as novidades do Verdão.",
    "Confira a agenda dos próximos jogos.",
    "Veja a classificação atualizada.",
    "Notícias e informações para o torcedor Coxa-Branca."
];

let tickerIndex = 0;


/* =========================================================
   ELEMENTOS
========================================================= */

const elements = {

    newsGrid:
        document.getElementById("newsGrid"),

    standingsBody:
        document.getElementById("standingsBody"),

    currentDate:
        document.getElementById("currentDate"),

    mobileMenu:
        document.getElementById("mobileMenu"),

    menuButton:
        document.getElementById("menuButton"),

    themeButton:
        document.getElementById("themeButton"),

    modal:
        document.getElementById("modal"),

    modalTitle:
        document.getElementById("modalTitle"),

    modalText:
        document.getElementById("modalText"),

    modalCategory:
        document.getElementById("modalCategory"),

    modalClose:
        document.getElementById("modalClose"),

    toast:
        document.getElementById("toast"),

    ticker:
        document.querySelector(".ticker-text"),

    days:
        document.getElementById("days"),

    hours:
        document.getElementById("hours"),

    minutes:
        document.getElementById("minutes")

};


/* =========================================================
   DATA
========================================================= */

function renderDate() {

    const now = new Date();

    const formatter =
        new Intl.DateTimeFormat(
            "pt-BR",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    elements.currentDate.textContent =
        formatter.format(now);

}


/* =========================================================
   NOTÍCIAS
========================================================= */

function renderNews(filter = "all") {

    const filteredNews =
        filter === "all"
            ? news
            : news.filter(
                item => item.category === filter
            );

    elements.newsGrid.innerHTML =
        filteredNews
            .map(createNewsCard)
            .join("");

}


function createNewsCard(item) {

    return `

        <article class="news-card">

            <div class="news-image ${item.category}">

                <span>
                    ${item.icon}
                </span>

            </div>

            <div class="news-body">

                <div class="news-meta">

                    <span class="news-category">
                        ${item.categoryName}
                    </span>

                    <span class="news-time">
                        ${item.time}
                    </span>

                </div>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.text}
                </p>

                <button
                    class="news-read"
                    onclick="openNews(${item.id})"
                >
                    Ler notícia →
                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   FILTROS
========================================================= */

function setupFilters() {

    const filters =
        document.querySelectorAll(".filter");

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item =>
                        item.classList.remove("active")
                );

                filter.classList.add("active");

                renderNews(
                    filter.dataset.filter
                );

            }
        );

    });

}


/* =========================================================
   MODAL
========================================================= */

function openNews(id) {

    const item =
        news.find(
            newsItem =>
                newsItem.id === id
        );

    if (!item) return;

    elements.modalCategory.textContent =
        item.categoryName;

    elements.modalTitle.textContent =
        item.title;

    elements.modalText.textContent =
        item.text +
        " Esta área pode ser conectada futuramente a um sistema de notícias ou API.";

    elements.modal.classList.add("active");

    elements.modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


function closeModal() {

    elements.modal.classList.remove("active");

    elements.modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =========================================================
   MENU MOBILE
========================================================= */

function setupMenu() {

    elements.menuButton.addEventListener(
        "click",
        () => {

            const open =
                elements.mobileMenu.classList.toggle(
                    "open"
                );

            elements.menuButton.setAttribute(
                "aria-expanded",
                open
            );

        }
    );


    document
        .querySelectorAll("#mobileMenu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    elements.mobileMenu
                        .classList.remove("open");

                    elements.menuButton
                        .setAttribute(
                            "aria-expanded",
                            "false"
                        );

                }
            );

        });

}


/* =========================================================
   TABELA
========================================================= */

function renderStandings() {

    elements.standingsBody.innerHTML =
        standings
            .map(
                (team, index) => `

                <tr>

                    <td>
                        <span class="position">
                            ${index + 1}
                        </span>
                    </td>

                    <td class="${team.highlight ? "highlight" : ""}">
                        ${team.name}
                    </td>

                    <td>
                        <strong>
                            ${team.pts}
                        </strong>
                    </td>

                    <td>${team.j}</td>

                    <td>${team.v}</td>

                    <td>${team.e}</td>

                    <td>${team.d}</td>

                    <td>${team.sg}</td>

                </tr>

            `
            )
            .join("");

}


/* =========================================================
   TEMA
========================================================= */

function setupTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    elements.themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            const dark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );

        }
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    elements.toast.textContent =
        message;

    elements.toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(
            () => {

                elements.toast
                    .classList.remove("show");

            },
            3000
        );

}


/* =========================================================
   TICKER
========================================================= */

function setupTicker() {

    document
        .getElementById("nextTicker")
        .addEventListener(
            "click",
            () => {

                tickerIndex++;

                if (
                    tickerIndex >=
                    tickerNews.length
                ) {

                    tickerIndex = 0;

                }

                elements.ticker.textContent =
                    tickerNews[tickerIndex];

            }
        );

}


/* =========================================================
   CONTADOR
========================================================= */

// Para ativar um contador real,
// substitua a data abaixo.

const nextMatchDate =
    null;


function updateCountdown() {

    if (!nextMatchDate) {

        elements.days.textContent = "--";
        elements.hours.textContent = "--";
        elements.minutes.textContent = "--";

        return;

    }


    const now =
        new Date().getTime();

    const target =
        new Date(nextMatchDate).getTime();

    const difference =
        target - now;


    if (difference <= 0) {

        elements.days.textContent = "0";
        elements.hours.textContent = "0";
        elements.minutes.textContent = "0";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
                24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
                60
        );


    elements.days.textContent =
        String(days).padStart(2, "0");

    elements.hours.textContent =
        String(hours).padStart(2, "0");

    elements.minutes.textContent =
        String(minutes).padStart(2, "0");

}


/* =========================================================
   NEWSLETTER
========================================================= */

function setupNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            if (!email) return;

            showToast(
                "Cadastro realizado com sucesso!"
            );

            form.reset();

        }
    );

}


/* =========================================================
   HISTÓRIA
========================================================= */

function setupHistory() {

    document
        .getElementById("historyButton")
        .addEventListener(
            "click",
            () => {

                elements.modalCategory.textContent =
                    "HISTÓRIA";

                elements.modalTitle.textContent =
                    "Coritiba Foot Ball Club";

                elements.modalText.textContent =
                    "Nesta área do portal você poderá apresentar uma linha do tempo completa do clube, com fundação, títulos, grandes equipes, jogadores históricos e momentos marcantes.";

                elements.modal.classList.add(
                    "active"
                );

                elements.modal.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

}


/* =========================================================
   MODAL EVENTOS
========================================================= */

function setupModal() {

    elements.modalClose.addEventListener(
        "click",
        closeModal
    );


    document
        .querySelector(".modal-overlay")
        .addEventListener(
            "click",
            closeModal
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                elements.modal.classList.contains("active")
            ) {

                closeModal();

            }

        }
    );

}


/* =========================================================
   MENU ATIVO NO SCROLL
========================================================= */

function setupScrollNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const links =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.id;

                }

            });


            links.forEach(link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute("href") ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function init() {

    renderDate();

    renderNews();

    renderStandings();

    setupFilters();

    setupMenu();

    setupTheme();

    setupTicker();

    setupNewsletter();

    setupHistory();

    setupModal();

    setupScrollNavigation();

    updateCountdown();

    setInterval(
        updateCountdown,
        60000
    );

}


document.addEventListener(
    "DOMContentLoaded",
    init
);
