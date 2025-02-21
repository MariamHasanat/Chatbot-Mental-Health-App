function updateSidebar() {
    let chatbotName = localStorage.getItem("botName") || "Seren";
    let chatbotNameElement = document.getElementById("chatbot-name");

    if (chatbotNameElement) {
        chatbotNameElement.textContent = chatbotName;
    } else {
        console.error("❌ ERROR: Element with ID 'chatbot-name' not found.");
    }
}

document.addEventListener("DOMContentLoaded", updateSidebar);


document.addEventListener("DOMContentLoaded", () => {
    console.log("Settings Page Loaded");

    // Select Elements
    const botNameInput = document.getElementById("bot-name");
    const saveButton = document.getElementById("save-settings");
    const avatarChoices = document.querySelectorAll(".avatar-choice");
    const genderInputs = document.querySelectorAll('input[name="bot-gender"]');
    const customAvatarInput = document.getElementById("custom-avatar");

    // Load Saved Settings on Page Load
    function loadSettings() {
        botNameInput.value = localStorage.getItem("botName") || "Seren";

        let selectedGender = localStorage.getItem("botGender") || "female";
        document.querySelector(`input[value="${selectedGender}"]`).checked = true;

        let selectedAvatar = localStorage.getItem("botAvatar") || "./assets/bot-female.png";
        
        // Update avatar selection
        avatarChoices.forEach(img => {
            if (img.getAttribute("data-avatar") === selectedAvatar) {
                img.classList.add("selected");
            } else {
                img.classList.remove("selected");
            }
        });

        console.log("Loaded Settings:", { botName: botNameInput.value, selectedGender, selectedAvatar });
    }

    // Save Settings Function
    function saveSettings() {
        let botName = botNameInput.value;
        let botGender = document.querySelector('input[name="bot-gender"]:checked').value;
        let botAvatar = document.querySelector(".avatar-choice.selected")?.getAttribute("data-avatar") || localStorage.getItem("botAvatar");

        // Save to localStorage
        localStorage.setItem("botName", botName);
        localStorage.setItem("botGender", botGender);
        localStorage.setItem("botAvatar", botAvatar);

        console.log("Saved Settings:", { botName, botGender, botAvatar });
        alert("Preferences Saved! ✅");

        updateSidebar();
    }

    avatarChoices.forEach(img => {
        img.addEventListener("click", () => {
            avatarChoices.forEach(el => el.classList.remove("selected"));
            img.classList.add("selected");
            localStorage.setItem("botAvatar", img.getAttribute("data-avatar"));
        });
    });

    customAvatarInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem("botAvatar", reader.result);
                console.log("Custom avatar saved:", reader.result);
                alert("Custom avatar uploaded successfully! 🎨");

                document.querySelectorAll(".avatar-choice").forEach(el => el.classList.remove("selected"));
                let imgElement = document.createElement("img");
                imgElement.src = reader.result;
                imgElement.classList.add("avatar-choice", "selected");
                imgElement.style.width = "60px";
                imgElement.style.height = "60px";
                imgElement.style.borderRadius = "50%";
                imgElement.style.cursor = "pointer";
                imgElement.addEventListener("click", () => {
                    document.querySelectorAll(".avatar-choice").forEach(el => el.classList.remove("selected"));
                    imgElement.classList.add("selected");
                    localStorage.setItem("botAvatar", reader.result);
                });

                document.querySelector(".avatar-options").appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }
    });

    saveButton.addEventListener("click", saveSettings);

    loadSettings();
});
