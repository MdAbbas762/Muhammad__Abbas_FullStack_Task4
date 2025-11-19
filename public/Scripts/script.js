const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".top-section ul");
const navLinks = document.querySelectorAll(".top-section ul li a");
const navItems = document.querySelectorAll(".top-section ul li");
const body = document.body;

/* Hamburger setting */
if (hamburger && navList) {
    hamburger.setAttribute("role", "button");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Toggle navigation menu");

    hamburger.addEventListener("click", (e) => {
        const isOpen = navList.classList.toggle("active");
        hamburger.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");

        if (isOpen) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".top-section") && navList.classList.contains("active")) {
            navList.classList.remove("active");
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
            body.style.overflow = "";
        }
    });
}

/* Smooth scroll & close mobile menu when link clicked */
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            const headerOffset = 64;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 8;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        if (navList.classList.contains("active")) {
            navList.classList.remove("active");
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
            body.style.overflow = "";
        }
    });
});

/* Form Validation */
const form = document.querySelector("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const emailPattern = /\S+@\S+\.\S+/;

if (form) {
    form.addEventListener("submit", (e) => {
        if (username.value.trim() === "") {
            alert("Please enter your name.");
            e.preventDefault();
            return;
        }

        if (email.value.trim() === "" || !emailPattern.test(email.value.trim())) {
            alert("Please enter a valid email.");
            e.preventDefault();
            return;
        }

        if (message.value.trim().length < 10) {
            alert("Please enter a message (at least 10 characters).");
            e.preventDefault();
            return;
        }
    });
}

/* Active nav link */
const sections = document.querySelectorAll("section[id]");

function onScrollHighlight() {
    const offset = 120;
    const scrollPos = window.pageYOffset;

    let activeIndex = 0;

    sections.forEach((sec, idx) => {
        const secTop = sec.getBoundingClientRect().top + window.pageYOffset;
        if (scrollPos + offset >= secTop) {
            activeIndex = idx;
        }
    });

    navItems.forEach((li, i) => {
        if (i === activeIndex) {
            li.classList.add("active");
        } else {
            li.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", onScrollHighlight);
window.addEventListener("resize", onScrollHighlight);
window.addEventListener("load", onScrollHighlight);