import app from "./js/firebase.js";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


document.addEventListener("DOMContentLoaded", () => {

    const db = getFirestore(app);

    const form = document.querySelector("form");
    if (form) {

        // Form submission handler
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent page reload

            // Collect user input
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            // Validate input
            if (!email || !password) {
                alert("Both fields are required.");
                return;
            }

            try {
                // Retrieve user data from Firestore
                const userRef = doc(db, "users", email);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    alert("User not found. Please check your email.");
                    return;
                }

                const userData = userSnap.data();

                // Check if password matches (You should use Firebase Auth for real apps)
                if (password === userData.password) {
                    alert("Login successful!");
                    localStorage.setItem('userName', JSON.stringify(userData));
                    window.location.href = "home-page.html"; // Redirect to home page
                } else {
                    alert("Incorrect password. Please try again.");
                }
            } catch (error) {
                console.error("Error retrieving document: ", error);
                alert("Failed to login. Please try again.");
            }
        });
    }
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPassword');

    if (showPasswordCheckbox && passwordInput) {
        showPasswordCheckbox.addEventListener('change', () => {
            passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
        });
    }
});
