
const themes = ["light", "dark"];

const themeIcons = {
    light: "/assets/light-mode-icon.png", 
    dark: "/assets/dark-mode-icon.png", 
};

function applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    updateThemeIcon(themeName);
    updateSidebarIcons(themeName);
}

function toggleTheme() {
    let currentTheme = localStorage.getItem("theme") || "light";
    let nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];

    applyTheme(nextTheme);
    console.log(`Theme changed to: ${nextTheme}`);
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

function updatePlaceholderTheme(theme) {
    const placeholderImg = document.getElementById("placeholder-img");
    if (placeholderImg) {
        placeholderImg.src = theme === "dark" ? placeholderImg.dataset.dark : placeholderImg.dataset.light;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    updateThemeIcon(savedTheme);
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
    }
});