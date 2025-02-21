document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll(".slide");
    let index = 0;
    let intervalId;

    if (!document.querySelector(".slide")) return; 

    function updateMode() {
        return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function updateImageSrc(img, modeSuffix) {
        const baseSrc = img.dataset.baseSrc;
        if (baseSrc) {
            img.src = baseSrc.replace(".svg", `${modeSuffix}.svg`);
        }
    }

    function showNextSlide() {
        const isDarkMode = updateMode();
        const modeSuffix = isDarkMode ? "-dark" : "";

        if (slides.length > 0) {
            slides.forEach(slide => slide.classList.remove("active"));

            if (index >= 0 && index < slides.length) {
                const currentSlide = slides[index];
                currentSlide.classList.add("active");

                const img = currentSlide.querySelector("img");
                if (img) {
                    updateImageSrc(img, modeSuffix);
                }
            } else {
                console.error("Index out of bounds:", index);
            }

            index = (index + 1) % slides.length;
        } else {
            console.error("No slides found.");
        }
    }

    function startSlideshow() {
        if (intervalId) clearInterval(intervalId); 
        showNextSlide();
        intervalId = setInterval(showNextSlide, 5000);
    }

    function stopSlideshow() {
        if (intervalId) {
            clearInterval(intervalId);
            console.log("Slideshow stopped.");
        }
    }

    startSlideshow();

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        let currentTheme = localStorage.getItem("theme") || "light";
        let newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        showNextSlide();
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopSlideshow();
        else startSlideshow();
    });

    window.addEventListener("beforeunload", stopSlideshow);

    document.addEventListener("themeChanged", (event) => {
        console.log(`Theme changed detected: ${event.detail}`);
        startSlideshow(); 
    });
});
