import './styles/home-page.scss';
import'./assets/articles-dark.svg';
import'./assets/articles.svg';
import './assets/chat.svg';
import './assets/chat-dark.svg';
import './assets/emergency.svg' 
import './assets/emergency-dark.svg';
import './assets/settings.svg';
import './assets/settings-dark.svg';    
import './assets/logo.svg';
import './assets/logo-dark.svg';
import './styles/styles.scss';

document.addEventListener("DOMContentLoaded", () => {
    let slides = document.querySelectorAll(".slide");
    let index = 0;
    let isDarkMode = localStorage.getItem("theme") === "dark";

    function updateMode() {
        isDarkMode = document.body.classList.contains("dark-theme");
    }

    function showNextSlide() {
        updateMode();
        slides.forEach(slide => slide.classList.remove("active"));
        let modeClass = isDarkMode ? "dark-mode" : "light-mode";
        let filteredSlides = Array.from(slides).filter(slide => slide.classList.contains(modeClass));
        
        if (filteredSlides.length > 0) {
            filteredSlides[index].classList.add("active");
            index = (index + 1) % filteredSlides.length;
        }
    }

    setInterval(showNextSlide, 5000);

    updateMode();
    showNextSlide();

    document.getElementById("themeToggle").addEventListener("click", () => {
        setTimeout(showNextSlide, 300);
    });
});