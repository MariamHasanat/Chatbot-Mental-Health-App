
const themes = ["light", "dark"];

const themeIcons = {
    light: "/assets/light-mode-icon.png",
    dark: "/assets/dark-mode-icon.png",
};

function applyTheme(themeName) {
    console.log(`Applying theme: ${themeName}`);
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    updateThemeIcon(themeName);
    updateSidebarIcons(themeName);
    updateImages(themeName);

    document.dispatchEvent(new CustomEvent("themeChanged", { detail: themeName }));
}

function updateThemeIcon(theme) {
    const icon = document.getElementById("theme-icon");
    if (!icon) {
        console.error("Theme icon not found!");
        return;
    }

    icon.src = themeIcons[theme] || themeIcons["light"];
    console.log(`Updated icon to: ${icon.src}`);
}

function updateSidebarIcons(theme) {
    document.querySelectorAll(".sidebar-icon img").forEach((img) => {
        img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
    });
}

//////////////////////////////////////////////////
function updatePlaceholderTheme(theme) {
    const placeholderImg = document.getElementById("placeholder-img");
    if (placeholderImg) {
        placeholderImg.src = theme === "dark" ? placeholderImg.dataset.dark : placeholderImg.dataset.light;
    }
}

document.addEventListener("click", (e) => {
    if (e.target.id === "theme-toggle" || e.target.id === "theme-icon") {
        toggleTheme();
    }
});
///////////////////////////////////////////////////////

function toggleTheme() {
    let currentTheme = localStorage.getItem("theme") || "light";
    let nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];

    applyTheme(nextTheme);
    console.log(`Theme changed to: ${nextTheme}`);
}


function updateImages(theme) {
    const images = {
        light: {
            articles: "/assets/articles.svg",
            chat: "/assets/chat.svg",
            emergency: "/assets/emergency.svg",
            settings: "/assets/settings.svg",
            logo: "/assets/logo.svg",
            string1: "/assets/image1.svg",
            string2: "/assets/image2.svg",
            string3: "/assets/image3.svg",
            loginLogo: "./assets/chat-bot-login.svg",
            logout: "/assets/logout-light.svg",

        },
        dark: {
            articles: "/assets/articles-dark.svg",
            chat: "/assets/chat-dark.svg",
            emergency: "/assets/emergency-dark.svg",
            settings: "/assets/settings-dark.svg",
            logo: "/assets/logo-dark.svg",
            string1: "/assets/image1-dark.svg",
            string2: "/assets/image2-dark.svg",
            string3: "/assets/image3-dark.svg",
            loginLogo: "./assets/logo-dark-theme.svg",
            logout: "/assets/logout-dark.svg",
        }
    };

    document.querySelectorAll("[data-icon]").forEach(img => {
        let key = img.dataset.icon;
        if (key && images[theme][key]) {
            img.src = images[theme][key];
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    updateThemeIcon(savedTheme);
    updateImages(savedTheme);
    console.log(`Loaded theme: ${savedTheme}`);

    const themeToggleButton = document.getElementById("theme-toggle");
    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", () => {
            let currentTheme = document.documentElement.getAttribute("data-theme") || "light";
            let nextTheme = currentTheme === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", nextTheme);
            localStorage.setItem("theme", nextTheme);
            updatePlaceholderTheme(nextTheme);
        });
        themeToggleButton.addEventListener("click", toggleTheme);
    }
    else {
        console.error("Theme toggle button not found!");
    }
}
);