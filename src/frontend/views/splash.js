import '../styles/splash.scss';


document.addEventListener("DOMContentLoaded", () => {
    console.log("Splash screen loaded! Redirecting soon...");

    setTimeout(() => {
        console.log("Redirecting to index.html...");
        window.location.href = "index.html";
    }, 3000); 
});