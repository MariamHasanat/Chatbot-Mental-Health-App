document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll(".slide");
    let index = 0;

    function updateMode() {
        return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function updateImageSrc(img, modeSuffix) {
        const baseSrc = img.dataset.baseSrc; // أخذ الـ src الأصلي المخزن
        if (baseSrc) {
            img.src = baseSrc.replace(".svg", `${modeSuffix}.svg`);
        }
    }

    function showNextSlide() {
        const isDarkMode = updateMode();
        const modeSuffix = isDarkMode ? "-dark" : "";

        // تحقق مما إذا كانت الشرائح موجودة
        if (slides && slides.length > 0) {
            slides.forEach(slide => slide.classList.remove("active"));

            if (index >= 0 && index < slides.length) {
                const currentSlide = slides[index];
                currentSlide.classList.add("active");

                const img = currentSlide.querySelector("img");
                if (img) {
                    updateImageSrc(img, modeSuffix); // استدعاء الدالة هنا
                }
            } else {
                console.error("Index out of bounds:", index);
            }

            index = (index + 1) % slides.length; // تحديث الفهرس
        } else {
            console.error("No slides found.");
        }
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