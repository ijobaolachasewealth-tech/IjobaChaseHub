// script.js
console.log("OLAHUB Script loaded and running correctly!"); // <--- This line is correctly placed here now!

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader - MORE ROBUST HIDING LOGIC
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Hide preloader once the DOM is fully loaded (HTML parsed)
        // Add a small delay for a smoother visual transition, ensuring it's visible initially
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 300); // Hide after 300ms of DOM ready

        // Fallback: Hide preloader after all assets (images, stylesheets, scripts) are loaded
        window.addEventListener('load', () => {
            if (!preloader.classList.contains('hidden')) { // Only add if not already hidden by DOMContentLoaded
                preloader.classList.add('hidden');
            }
        });

        // Failsafe: Hide preloader after a maximum timeout, just in case
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
            }
        }, 5000); // Hide after 5 seconds regardless
    }

    // 2. Sticky Header
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // When scrolled down 50px
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        });
    }

    // 3. Mobile Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenuOverlay.classList.toggle('opacity-0');
        mobileMenuOverlay.classList.toggle('pointer-events-none');
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu); // Close menu when a link is clicked
    });


    // 4. Hero Dynamic Text (Typewriter Effect with Glow) - Updated for new structure and phrases
    const heroDynamicTextParagraph = document.getElementById('hero-dynamic-text-paragraph');
    if (heroDynamicTextParagraph) {
        const phrases = [
            "Social Media Awareness.",
            "Digital Dominance.",
            "Seamless Connections.",
            "Your Next Big Idea.",
            "Limitless Opportunities."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 60;
        const pauseTime = 1500; // Pause at end of phrase

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                heroDynamicTextParagraph.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroDynamicTextParagraph.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // The 'hero-text-glow' class for the animation is now directly on the paragraph in HTML
            // so we don't need to add/remove it dynamically here for the glow itself.
            // The typewriter effect (border-right) will still be present via CSS.

            let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                currentSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                currentSpeed = typingSpeed;
            }

            setTimeout(typeWriter, currentSpeed);
        }
        typeWriter(); // Start the typewriter effect
    }

    // 5. Custom Animated Signature in Hamburger Menu
    const signatureText = document.getElementById('signature-text');
    if (signatureText) {
        const signature = '|👤| © 𝗜𝗝❂𝗕𝗔 ☯︎𝗟𝗔 𝗖𝗛𝗔𝗦𝗘 𝗪𝗘𝗔𝗟𝗧𝗛™';
        let sigCharIndex = 0;
        let sigIsDeleting = false;
        const sigTypingSpeed = 80;
        const sigDeletingSpeed = 40;
        const sigPauseTime = 2000;

        function typeSignature() {
            if (sigIsDeleting) {
                signatureText.textContent = signature.substring(0, sigCharIndex - 1);
                sigCharIndex--;
            } else {
                signatureText.textContent = signature.substring(0, sigCharIndex + 1);
                sigCharIndex++;
            }

            let currentSpeed = sigIsDeleting ? sigDeletingSpeed : sigTypingSpeed;

            if (!sigIsDeleting && sigCharIndex === signature.length) {
                currentSpeed = sigPauseTime;
                sigIsDeleting = true;
            } else if (sigIsDeleting && sigCharIndex === 0) {
                sigIsDeleting = false;
                currentSpeed = sigTypingSpeed;
            }

            setTimeout(typeSignature, currentSpeed);
        }
        typeSignature();
    }


    // 6. Scroll-triggered Animations (Intersection Observer)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // 7. Counter Animations
    const counterItems = document.querySelectorAll('.counter-item');

    const startCounterAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterValue = entry.target.querySelector('.counter-value');
                const target = parseFloat(entry.target.dataset.target);
                const isDecimal = target % 1 !== 0;
                let start = 0;
                const duration = 2000; // 2 seconds
                let startTime = null;

                const animate = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    let current = isDecimal
                        ? (start + (target - start) * (progress / duration)).toFixed(1)
                        : Math.floor(start + (target - start) * (progress / duration));

                    // Special handling for the "Years in Business" to show 5.0
                    if (entry.target.dataset.target === "5") {
                        counterValue.textContent = `.${current}`; // Starts as .0, ends as .5.0
                    } else if (entry.target.dataset.target === "2.5") {
                        counterValue.textContent = `+${current}`;
                    }
                    else {
                         counterValue.textContent = `+${current}`;
                    }


                    if (progress < duration) {
                        requestAnimationFrame(animate);
                    } else {
                         if (entry.target.dataset.target === "5") {
                            counterValue.textContent = `.5.0`; // Ensure it ends exactly at 5.0
                        } else if (entry.target.dataset.target === "2.5") {
                            counterValue.textContent = `+2.5`;
                        }
                        else {
                            counterValue.textContent = `+${target}`;
                        }
                    }
                };
                requestAnimationFrame(animate);
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounterAnimation, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the item is visible
    });

    counterItems.forEach(item => {
        counterObserver.observe(item);
    });

    // 8. Custom Cursor (Improved - disabled on mobile)
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorFollower = document.querySelector('.custom-cursor-follower');

    // Only enable custom cursor on non-mobile devices
    if (window.innerWidth > 768 && customCursor && customCursorFollower) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;

            // Follower with a slight delay/smoothness
            customCursorFollower.style.transform = `translate(-50%, -50%) translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        // Hide cursor when not over body (e.g., leaving browser window)
        document.body.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '1';
            customCursorFollower.style.opacity = '0.6';
        });

        document.body.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
            customCursorFollower.style.opacity = '0';
        });

        // Optional: Hide default cursor
        document.body.style.cursor = 'none';
    }
});
