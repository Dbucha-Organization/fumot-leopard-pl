// --- Hamburger Menu Logic ---
const ham = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu-overlay");
const menuLinks = document.querySelectorAll(".mobile-links a");

if (ham && menu) {
    ham.addEventListener("click", () => {
        ham.classList.toggle("active");
        menu.classList.toggle("active");

        // Prevent background scrolling when menu is open
        if (menu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            ham.classList.remove("active");
            menu.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
}

// --- Footer City Toggle ---
const city = document.getElementById("city");
// Select the links that are siblings or in the container to toggle
// Based on CSS .foot-cont-three a { display: none }
const footerLinks = document.querySelectorAll(".foot-cont-three a");

if (city) {
    city.addEventListener("click", function () {
        this.classList.toggle("active"); // For the arrow rotation
        footerLinks.forEach((el) => {
            // Toggle between none and inline-block/block based on current computed style or just toggle class
            if (el.style.display === "block" || getComputedStyle(el).display === "block") {
                el.style.display = "none";
            } else {
                el.style.display = "block";
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.parentElement.classList.add('animate'); // Trigger CSS animation context
                // Or directly add class if strictly using that
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        // Initial state set in CSS usually, but ensuring js control
        observer.observe(el);
    });


    // --- Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 1; // Start at middle slide

    function updateSlider() {
        slides.forEach((slide, index) => {
            // Remove all position classes
            slide.classList.remove('position-left', 'position-center', 'position-right');
            slide.classList.remove('active'); // legacy

            // Calculate position relative to compiled center
            if (index === currentIndex) {
                slide.classList.add('position-center');
            } else {
                // We have 3 slides. 
                // If currentIndex is 0: Left is 2, Right is 1.
                // If currentIndex is 1: Left is 0, Right is 2.
                // If currentIndex is 2: Left is 1, Right is 0.

                // Logic to find "Visual Left" (Previous)
                const leftIndex = (currentIndex - 1 + slides.length) % slides.length;

                // Logic to find "Visual Right" (Next)
                const rightIndex = (currentIndex + 1) % slides.length;

                if (index === leftIndex) {
                    slide.classList.add('position-left');
                } else if (index === rightIndex) {
                    slide.classList.add('position-right');
                }
            }
        });
    }

    // Initial run to set styles
    updateSlider();

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });


    // --- Parallax Effect ---
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const heroSection = document.querySelector('.hero-section');
    //     const bgGrid = document.querySelector('.hero-bg-grid');

    //     // Move background slower than scroll
    //     if (bgGrid) {
    //         bgGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
    //     }
    // });

});



// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Dostęp zabroniony. Strona tylko dla osób 18+");
    window.close();
    window.location.href = "https://www.google.pl";
});

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
        } else {
            warn.style.display = "";
        }
    });
}