// Start Typing Effect
document.addEventListener("DOMContentLoaded", () => {
    const roles = ["Data Engineer","Web Developer", "Data Analyst", "AI Enthusiast"];
    const roleElement = document.getElementById("role");
    let roleIndex = 0
    let letterIndex = 0;
    let typingInterval;
    
    function typeRole(){
        roleElement.style.opacity = 0;
        setTimeout(() => {
            roleElement.textContent = "";
            letterIndex = 0;
            typingInterval = setInterval(() => {
                if(letterIndex < roles[roleIndex].length){
                    roleElement.textContent += roles[roleIndex].charAt(letterIndex);
                    letterIndex++;
                } else {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        roleIndex = (roleIndex + 1) % roles.length;
                        typeRole();
                    }, 1000);
                }
            }, 150);
            roleElement.style.opacity = 1;
        }, 500);
    }
    typeRole();
});

// Project Filter
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".project-list li");
    const projectBoxes = document.querySelectorAll(".project-box");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            const filter = button.getAttribute("data-filter");
            
            projectBoxes.forEach((project) => {
                if(filter === 'all' || project.getAttribute("data-category") === filter){
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });
});

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".dark-light-btn");
    const htmlElement = document.documentElement;

    const currentMode = localStorage.getItem("mode");
    if(currentMode === "light"){
        htmlElement.classList.add("light-mode");
        toggleButton.innerHTML = '<i class="fa-regular fa-moon"></i>';
    } else {
        htmlElement.classList.remove("light-mode");
        toggleButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
    }

    toggleButton.addEventListener("click", () => {
        htmlElement.classList.toggle("light-mode");
        const isLightMode = htmlElement.classList.contains("light-mode");
        toggleButton.innerHTML = isLightMode ? '<i class="fa-regular fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>';
        localStorage.setItem("mode", isLightMode ? "light" : "dark");
    });
});
// Nav auto active state
const section = document.querySelectorAll("section");
const navLi = document.querySelectorAll("ul li a");
function setActiveLink(){
    let currentSection = "";
    section.forEach((sec) => {
        const sectionTop = sec.offsetTop;
        const sectionHeight = sec.offsetHeight;
        if(window.scrollY >= sectionTop - sectionHeight / 3){
            currentSection = sec.getAttribute("id");
        }
    });
    navLi.forEach((link) => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${currentSection}`){
            link.classList.add("active");
        }
    });
}
window.addEventListener("scroll", setActiveLink);