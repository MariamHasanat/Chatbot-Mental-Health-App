// import app from "./js/firebase.js";
import app from "./js/firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore";


document.addEventListener("DOMContentLoaded", () => {

    const db = getFirestore(app);

    const form = document.getElementById("signup-form");
    
    if (form) {
        // Form submission handler
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent page reload

            // Collect user input
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            // Validate input
            if (!name || !email || !password) {
                alert("All fields are required.");
                return;
            }

            if (password.length < 5 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
                alert("Password must be at least 5 characters long and include uppercase, lowercase, and a number.");
                return;
            }

            try {
                // Add user info to Firestore
                const userRef = doc(db, "users", email); // Use email as a unique document ID
                await setDoc(userRef, {
                    name,
                    email,
                    password,
                    createdAt: new Date().toISOString()
                });

                alert("Account created successfully.");
                window.location.href = "login.html"; // Redirect to login page
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Failed to create account. Please try again.");
            }
        });
    }
});

