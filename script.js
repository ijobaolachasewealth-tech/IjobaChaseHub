// JavaScript to handle the preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    // Add a slight delay to ensure the animation is seen
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Optionally remove the preloader from DOM after transition
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
        });
    }, 1500); // Adjust delay as needed

    // Start typewriter effect after preloader is hidden
    setTimeout(() => {
        startTypewriter();
    }, 1000); // Start typewriter shortly after preloader hides

    // Initialize scroll animations after preloader
    initializeScrollAnimations();

    // Initialize header and mobile menu functionality
    initializeHeaderAndMobileMenu();

    // Initialize custom cursor functionality
    initializeCustomCursor();

    // Initialize parallax effects
    initializeParallax();
});


// Typewriter Effect Logic
const phrases = [
    "Social Media Accounts",
    "Virtual Numbers and OTP",
    "Social Media Boosting",
    "Strong VPN Logs",
    "Premium Streaming Logs"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
// Adjusted typing speed (slower)
let typingSpeed = 150; // milliseconds per character (was 100)
let deletingSpeed = 75; // milliseconds per character (was 50)
// Adjusted delay between phrases (longer)
let delayBetweenPhrases = 2500; // milliseconds (was 1500, aiming for 2-3 seconds)

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    const typewriterElement = document.getElementById('typewriter-text');

    if (!typewriterElement) {
        console.error('Typewriter element not found!');
        return; // Stop execution if element is missing
    }

    // Update text content
    let currentText = currentPhrase.substring(0, charIndex);
    // Append cursor after the text content
    typewriterElement.textContent = currentText;
    // Create and append cursor element separately for better control
    let cursor = typewriterElement.querySelector('.typewriter-cursor');
    if (!cursor) {
        cursor = document.createElement('span');
        cursor.classList.add('typewriter-cursor');
        typewriterElement.appendChild(cursor);
    }


    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
        currentSpeed = delayBetweenPhrases;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentSpeed = 500; // Short delay before typing next phrase
    }

    setTimeout(typeWriter, currentSpeed);
}

function startTypewriter() {
    typeWriter();
}

// Scroll Animation Logic using Intersection Observer
function initializeScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust margin to trigger slightly earlier/later
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Header and Mobile Menu Functionality
function initializeHeaderAndMobileMenu() {
    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const animatedSignature = document.getElementById('animated-signature');

    // Sticky & Shrinking Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Open
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when menu is open
        // Ensure signature is visible when typing starts
        animatedSignature.style.opacity = '1'; // Make it visible
        startSignatureAnimation(); // Start signature animation when menu opens
    });

    // Mobile Menu Close
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
        animatedSignature.classList.remove('signature-glowing'); // Remove glow class on close
        animatedSignature.style.opacity = '0'; // Hide it again for next open
    });

    // Close menu when clicking outside (overlay)
    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        animatedSignature.classList.remove('signature-glowing'); // Remove glow class on close
        animatedSignature.style.opacity = '0'; // Hide it again for next open
    });

    // Animated Signature in Hamburger Menu
    const signatureText = '|👤| © 𝗜𝗝❂𝗕𝗔 ☯︎𝗟𝗔 𝗖𝗛𝗔𝗦𝗘 𝗪𝗘𝗔𝗟𝗧𝗛™';
    let signatureCharIndex = 0;
    let signatureTypingSpeed = 70; // Speed of typing signature

    function typeSignature() {
        if (signatureCharIndex < signatureText.length) {
            animatedSignature.textContent += signatureText.charAt(signatureCharIndex);
            signatureCharIndex++;
            setTimeout(typeSignature, signatureTypingSpeed);
        } else {
            // Typing complete, add glowing class
            animatedSignature.classList.add('signature-glowing');
        }
    }

    function startSignatureAnimation() {
        animatedSignature.textContent = ''; // Clear previous text
        animatedSignature.classList.remove('signature-glowing'); // Ensure glow is off before typing
        signatureCharIndex = 0; // Reset index
        typeSignature();
    }
}

// Custom Cursor Functionality
function initializeCustomCursor() {
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorFollower = document.querySelector('.custom-cursor-follower');

    if (!customCursor || !customCursorFollower) {
        console.warn('Custom cursor elements not found. Skipping cursor initialization.');
        return;
    }

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        customCursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Handle hover states for interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, input[type="submit"], input[type="button"], label, .btn-primary, .animated-chase, .animated-ijoba'
    );

    interactiveElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
            customCursorFollower.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
            customCursorFollower.classList.remove('hover');
        });
    });

    // Hide custom cursor when mouse leaves document or on touch devices
    document.addEventListener('mouseleave', () => {
        customCursor.style.opacity = '0';
        customCursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        customCursor.style.opacity = '1';
        customCursorFollower.style.opacity = '1';
    });

    // Disable custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.style.cursor = 'default'; // Restore default cursor
        customCursor.style.display = 'none';
        customCursorFollower.style.display = 'none';
    }
}

// Parallax Effects Functionality
function initializeParallax() {
    const heroParallaxElement = document.getElementById('hero-parallax-element');
    const parallaxElements = document.querySelectorAll('.parallax-element'); // For Chase/Ijoba

    if (!heroParallaxElement && parallaxElements.length === 0) {
        console.warn('No parallax elements found. Skipping parallax initialization.');
        return;
    }

    let scrollPos = 0;
    let rafId = null;

    function updateParallax() {
        const newScrollPos = window.scrollY;

        // Parallax for Hero Background
        if (heroParallaxElement) {
            // Move slower than scroll (e.g., 50% speed)
            const translateY = newScrollPos * 0.5;
            heroParallaxElement.style.transform = `translateY(${translateY}px)`;
        }

        // Parallax for specific elements (Chase/Ijoba)
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallaxSpeed) || 0; // Get speed from data attribute
            // Calculate movement relative to its original position
            const elementRect = element.getBoundingClientRect();
            // Calculate how much the element has scrolled into view relative to viewport top
            // This makes the parallax effect relative to the element's position on the page
            const elementOffsetTop = element.offsetTop; // Position relative to parent
            const viewportHeight = window.innerHeight;

            // Calculate movement based on scroll relative to element's entry into viewport
            // This creates a more localized parallax effect
            let elementScrollProgress = (newScrollPos + viewportHeight - elementOffsetTop) / (viewportHeight + element.offsetHeight);
            elementScrollProgress = Math.max(0, Math.min(1, elementScrollProgress)); // Clamp between 0 and 1

            const elementTranslateY = (elementScrollProgress - 0.5) * speed * 500; // Adjust multiplier for intensity
            element.style.transform = `translateY(${elementTranslateY}px)`;
        });

        scrollPos = newScrollPos;
        rafId = requestAnimationFrame(updateParallax);
    }

    // Only start if not already running
    if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
    }

    // Listen for scroll events to trigger updates
    window.addEventListener('scroll', () => {
        // requestAnimationFrame will handle smooth updates, no need to call updateParallax directly here
        if (!rafId) { // Only request new frame if one isn't already pending
             rafId = requestAnimationFrame(updateParallax);
        }
    });
}

