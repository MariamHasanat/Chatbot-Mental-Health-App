document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userName"));

    if (!userData && ((window.location.pathname === "/home-page.html") || (window.location.pathname === "/chat.html") || (window.location.pathname === "/settings.html") || (window.location.pathname === "/articles.html") || (window.location.pathname === "/emergency.html"))) {
        window.location.href = "login.html";
    }

    let slides = document.querySelectorAll(".slide");
    let index = 0;
    let intervalId;
   
    if (userData) {
        const heading = document.querySelector(".user-name");
        if (heading) {
            heading.innerHTML = userData.name;
        } else {
            console.error("Element with class 'user-name' not found in the DOM.");
        }
    } else {
        console.error("No user data found in localStorage.");
    }

    const logoutBtn = document.querySelector(".icon[href='./login.html']");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (event) => {
            event.preventDefault(); // منع الانتقال التلقائي

            localStorage.removeItem("userName"); // حذف بيانات المستخدم فقط
            window.location.href = "login.html"; // إعادة التوجيه لصفحة تسجيل الدخول
        });
    } else {
        console.error("Logout button not found in the DOM.");
    }

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
