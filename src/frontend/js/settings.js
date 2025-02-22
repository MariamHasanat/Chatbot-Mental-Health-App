document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const currentPasswordInput = document.getElementById("current-password");
    const newPasswordInput = document.getElementById("new-password");
    const saveProfileBtn = document.getElementById("save-profile");
    const primaryColorInput = document.getElementById("primary-color");
    const saveThemeBtn = document.getElementById("save-theme");

    // ✅ Save Profile Info
    saveProfileBtn.addEventListener("click", () => {
        const updatedUsername = usernameInput.value;
        const updatedEmail = emailInput.value;
        const currentPassword = currentPasswordInput.value;
        const newPassword = newPasswordInput.value;

        if (!currentPassword) {
            alert("⚠️ Please enter your current password to update your profile.");
            return;
        }

        console.log("✅ Profile Updated:", {
            username: updatedUsername,
            email: updatedEmail,
            newPassword: newPassword ? "Changed" : "Not changed"
        });

        alert("Profile updated successfully!");
    });

    saveThemeBtn.addEventListener("click", () => {
        const newPrimaryColor = primaryColorInput.value;
        document.documentElement.style.setProperty("--primary-color", newPrimaryColor);
        alert("Theme updated!");
    });
});
