
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle-id");

    // Toggle Sidebar
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
            sidebar.classList.remove("active");
            chatContainer.classList.remove("sidebar-open");
        }
    });

});
