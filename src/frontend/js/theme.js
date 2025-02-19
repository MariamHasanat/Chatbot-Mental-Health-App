const themes = ["light", "dark"];

const themeIcons = {
    light: "/assets/light-mode-icon.png",
    dark: "/assets/dark-mode-icon.png",
};

const serenText = document.getElementById("seren"); // إضافة عنصر "seren" هنا

function applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", themeName);
    updateThemeIcon(themeName);
    updateSerenColor(themeName); // إضافة دالة تغيير لون "seren"
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

function updateSerenColor(theme) { 
    if (theme === "dark") {
        serenText.style.color = "#FFA500"; 
    } else {
        serenText.style.color = "#333"; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    updateThemeIcon(savedTheme);
    updateSerenColor(savedTheme); 
    console.log(`Loaded theme: ${savedTheme}`);

    const themeToggleButton = document.getElementById("theme-toggle");
    console.log(themeToggleButton);

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", toggleTheme);
    } else {
        console.error("Theme toggle button not found!");
    }
});
