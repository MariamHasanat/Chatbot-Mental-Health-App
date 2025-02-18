
const themes = ["light", "dark", "custom"];

const themeIcons = {
    light: "/assets/light-mode-icon.png", 
    dark: "/assets/dark-mode-icon.png", 
    custom: "/assets/custom-mode-icon.png"
};

function applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    updateThemeIcon(themeName);
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

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    updateThemeIcon(savedTheme);
    console.log(`Loaded theme: ${savedTheme}`);

    const themeToggleButton = document.getElementById("theme-toggle");
    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", toggleTheme);
    }
});

document.addEventListener("click", (e) => {
    if (e.target.id === "theme-toggle" || e.target.id === "theme-icon") {
        toggleTheme();
    }
});
