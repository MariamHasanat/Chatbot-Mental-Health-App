
document.addEventListener("DOMContentLoaded", () => {
    // Load existing settings
    document.getElementById("bot-name").value = localStorage.getItem("botName") || "Seren";
    let selectedGender = localStorage.getItem("botGender") || "neutral";
    document.querySelector(`input[value="${selectedGender}"]`).checked = true;

    let selectedAvatar = localStorage.getItem("botAvatar") || "./assets/bot-neutral.png";
    document.querySelectorAll(".avatar-choice").forEach(img => {
        if (img.getAttribute("data-avatar") === selectedAvatar) {
            img.classList.add("selected");
        }
    });

    // Save preferences
    document.getElementById("save-settings").addEventListener("click", () => {
        let botName = document.getElementById("bot-name").value;
        let botGender = document.querySelector('input[name="bot-gender"]:checked').value;
        let botAvatar = document.querySelector(".avatar-choice.selected")?.getAttribute("data-avatar") || selectedAvatar;

        localStorage.setItem("botName", botName);
        localStorage.setItem("botGender", botGender);
        localStorage.setItem("botAvatar", botAvatar);

    });

    document.querySelectorAll(".avatar-choice").forEach(img => {
        img.addEventListener("click", () => {
            document.querySelectorAll(".avatar-choice").forEach(el => el.classList.remove("selected"));
            img.classList.add("selected");
        });
    });

    document.getElementById("custom-avatar").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem("botAvatar", reader.result);
            };
            reader.readAsDataURL(file);
        }
    });
});
