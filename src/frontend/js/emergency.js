document.addEventListener("DOMContentLoaded", () => {
    console.log("Emergency script loaded! ✅");

    const doctorList = document.getElementById("doctor-list");
console.log("👨‍⚕️ doctorList found:", doctorList);

    if (!doctorList) {
        console.error("❌ doctor-list container not found!");
        return;
    }

    const doctors = [
        {
            name: "Dr. Emma Smith",
            specialty: "Cognitive Behavioral Therapy",
            experience: "10+ years",
            contact: "emma.smith@therapy.com",
            image: "assets/doctor1.jpg",
            quote: "Healing starts with one small step. You're never alone! 🌿"
        },
        {
            name: "Dr. Liam Johnson",
            specialty: "Depression & Anxiety Specialist",
            experience: "12+ years",
            contact: "liam.johnson@mentalcare.com",
            image: "assets/doctor2.jpg",
            quote: "Your feelings are valid. Let's talk and find light together. 💡"
        },
        {
            name: "Dr. Olivia Brown",
            specialty: "PTSD & Trauma Recovery",
            experience: "8+ years",
            contact: "olivia.brown@wellness.com",
            image: "assets/doctor3.jpg",
            quote: "Your past doesn’t define you. Every day is a new chance. 🌈"
        }
    ];

    doctors.forEach(doctor => {
        const card = document.createElement("div");
        card.classList.add("doctor-card");

        card.innerHTML = `
            <img src="${doctor.image}" alt="Doctor ${doctor.name}" class="doctor-img" onerror="this.src='assets/default-doctor.jpg';">
            <h3>${doctor.name}</h3>
            <p class="specialty">${doctor.specialty}</p>
            <p class="experience">🩺 ${doctor.experience}</p>
            <p class="quote">"${doctor.quote}"</p>
            <a href="mailto:${doctor.contact}" class="contact-btn">Contact Now</a>
        `;

        doctorList.appendChild(card);
    });

    // Force reflow to trigger fadeIn animation
    setTimeout(() => {
        document.querySelectorAll(".doctor-card").forEach(card => {
            card.style.opacity = "1";
        });
    }, 100);

    console.log("✅ Doctor cards added successfully!");
});
