import './styles/home-page.scss';
import './assets/articles-dark.svg';
import './assets/articles.svg';
import './assets/chat.svg';
import './assets/chat-dark.svg';
import './assets/emergency.svg';
import './assets/emergency-dark.svg';
import './assets/settings.svg';
import './assets/settings-dark.svg';
import './assets/logo.svg';
import './assets/logo-dark.svg';
import './styles/styles.scss';
import './assets/image1-dark.svg';
import './assets/image1.svg';
import './assets/image2-dark.svg';
import './assets/image2.svg';   
import './assets/image3-dark.svg';
import './assets/image3.svg';


document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    function updateMode() {
        return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function showNextSlide() {
        let isDarkMode = updateMode();
        let modeSuffix = isDarkMode ? "-dark" : ""; // يضيف "-dark" عند الحاجة
    
        slides.forEach(slide => slide.classList.remove("active"));
        
        let currentSlide = slides[index];
        currentSlide.classList.add("active");
    
        // ✅ تحديث الصورة بناءً على الثيم، بدون تغيير الـ active
        let img = currentSlide.querySelector("img");
        if (img) {
            let baseSrc = img.dataset.baseSrc; // خذ الـ src الأصلي المخزن
            img.src = baseSrc.replace(".svg", `${modeSuffix}.svg`);
        }
    
        index = (index + 1) % slides.length;
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
            }
        };

        document.querySelectorAll("[data-icon]").forEach(img => {
            let key = img.dataset.icon;
            if (key && images[theme][key]) {
                img.src = images[theme][key];
            }
        });
    }

    function applyTheme(themeName) {
        document.documentElement.setAttribute("data-theme", themeName);
        localStorage.setItem("theme", themeName);
        updateImages(themeName);
        setTimeout(showNextSlide, 10); // تحديث سريع عند تغيير الثيم
    }

    setInterval(showNextSlide, 5000);
    showNextSlide();

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        let currentTheme = localStorage.getItem("theme") || "light";
        let newTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(newTheme);
    });

    let savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    document.addEventListener("themeChanged", (event) => {
        console.log(`Theme changed detected in home-page.js: ${event.detail}`);
        showNextSlide(true); // ✅ إجبار تحديث السلايدات فورًا
    });
});