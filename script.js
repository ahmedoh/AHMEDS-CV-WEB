document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // THEME TOGGLE (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const body = document.body;

    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeIcon.className = "fas fa-sun";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeIcon.className = "fas fa-moon";
    }

    themeToggle.addEventListener("click", () => {
        if (body.classList.contains("dark-theme")) {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            themeIcon.className = "fas fa-sun";
            localStorage.setItem("theme", "light");
        } else {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            themeIcon.className = "fas fa-moon";
            localStorage.setItem("theme", "dark");
        }
    });

    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
    const mobileMenuIcon = mobileMenuBtn.querySelector("i");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    function toggleMobileMenu() {
        mobileNavOverlay.classList.toggle("open");
        if (mobileNavOverlay.classList.contains("open")) {
            mobileMenuIcon.className = "fas fa-xmark";
            body.style.overflow = "hidden"; // Prevent background scroll
        } else {
            mobileMenuIcon.className = "fas fa-bars";
            body.style.overflow = "";
        }
    }

    mobileMenuBtn.addEventListener("click", toggleMobileMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNavOverlay.classList.remove("open");
            mobileMenuIcon.className = "fas fa-bars";
            body.style.overflow = "";
        });
    });

    // Close menu on resize if screen gets larger
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && mobileNavOverlay.classList.contains("open")) {
            mobileNavOverlay.classList.remove("open");
            mobileMenuIcon.className = "fas fa-bars";
            body.style.overflow = "";
        }
    });

    // ==========================================================================
    // SKILLS TAB SYSTEM & PROGRESS BAR ANIMATIONS
    // ==========================================================================
    const tabButtons = document.querySelectorAll(".skills-tab-btn");
    const tabContents = document.querySelectorAll(".skills-tab-content");

    // Initialize progress bar values (store final widths in data attribute, set to 0 initially)
    const progressBars = document.querySelectorAll(".skill-bar-progress");
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.setAttribute("data-width", targetWidth);
        bar.style.width = "0";
    });

    // Function to animate progress bars in a specific tab
    function animateTabBars(tabId) {
        const activeTab = document.getElementById(tabId);
        const activeBars = activeTab.querySelectorAll(".skill-bar-progress");
        setTimeout(() => {
            activeBars.forEach(bar => {
                const target = bar.getAttribute("data-width");
                bar.style.width = target;
            });
        }, 100);
    }

    // Reset progress bars in a tab
    function resetTabBars(tabId) {
        const tab = document.getElementById(tabId);
        const bars = tab.querySelectorAll(".skill-bar-progress");
        bars.forEach(bar => {
            bar.style.width = "0";
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");

            // Deactivate all buttons & contents
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(content => {
                const contentId = content.getAttribute("id");
                content.classList.remove("active");
                resetTabBars(contentId);
            });

            // Activate current button & content
            btn.classList.add("active");
            const activeContent = document.getElementById(targetTab);
            activeContent.classList.add("active");
            
            // Animate active tab's bars
            animateTabBars(targetTab);
        });
    });

    // ==========================================================================
    // CERTIFICATES LIGHTBOX MODAL
    // ==========================================================================
    const clickableCerts = document.querySelectorAll(".clickable-cert");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const lightboxClose = document.getElementById("lightbox-close");

    function openLightbox(certCard) {
        const imgSrc = certCard.getAttribute("data-img");
        const certTitle = certCard.getAttribute("data-title");
        const certDesc = certCard.getAttribute("data-desc");
        
        lightboxImg.src = imgSrc;
        modalTitle.textContent = certTitle;
        modalDesc.textContent = certDesc;
        
        lightboxModal.classList.add("open");
        body.style.overflow = "hidden"; // Prevent scrolling behind lightbox
    }

    // Disable right click (context menu) on certificates and inside the lightbox to prevent downloading
    document.addEventListener("contextmenu", (e) => {
        if (e.target.closest(".clickable-cert") || e.target.closest("#lightbox-modal")) {
            e.preventDefault();
        }
    });

    // Disable dragging on certificate images
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("dragstart", (e) => {
            if (img.closest(".clickable-cert") || img.closest("#lightbox-modal")) {
                e.preventDefault();
            }
        });
    });

    function closeLightbox() {
        lightboxModal.classList.remove("open");
        body.style.overflow = "";
        
        // Clear src after transition to avoid flash of old image next time
        setTimeout(() => {
            lightboxImg.src = "";
        }, 300);
    }

    clickableCerts.forEach(cert => {
        cert.addEventListener("click", () => openLightbox(cert));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    
    // Close on click outside content
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightboxModal.classList.contains("open")) {
            closeLightbox();
        }
    });

    // ==========================================================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================================================
    // Trigger scroll fade-ins
    const fadeElements = document.querySelectorAll(".edu-card, .timeline-item, .cert-card, .info-item, .contact-form-wrapper");
    
    // Apply styling for initial state of scroll elements in JS
    // so that if Javascript is disabled, layouts don't remain invisible.
    fadeElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => scrollObserver.observe(el));

    // Observe skills section specifically to trigger initial progress bar animation
    const skillsSection = document.getElementById("skills");
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeTab = document.querySelector(".skills-tab-content.active");
                if (activeTab) {
                    animateTabBars(activeTab.getAttribute("id"));
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ==========================================================================
    // CONTACT FORM HANDLING & LOCALSTORAGE LOGGER
    // ==========================================================================
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("form-submit-btn");
    const successMsg = document.getElementById("form-success-message");
    const resetFormBtn = document.getElementById("btn-reset-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Collect Form Values
            const name = document.getElementById("form-name").value;
            const email = document.getElementById("form-email").value;
            const subject = document.getElementById("form-subject").value;
            const message = document.getElementById("form-message").value;

            // Trigger Loading State
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            // Save Message to LocalStorage (acts as a mock database for students' inquiries)
            const messages = JSON.parse(localStorage.getItem("student_messages") || "[]");
            messages.push({
                name,
                email,
                subject,
                message,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem("student_messages", JSON.stringify(messages));

            // Simulate server network request delay
            setTimeout(() => {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
                
                // Switch View (hide form, show success)
                contactForm.classList.add("hidden");
                successMsg.classList.add("visible");
                
                // Clear fields
                contactForm.reset();
            }, 1500);
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener("click", () => {
            successMsg.classList.remove("visible");
            contactForm.classList.remove("hidden");
        });
    }
});
