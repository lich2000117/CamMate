document.addEventListener('DOMContentLoaded', function() {
    // Ensure amber colors are properly applied
    function fixAmberColors() {
        // Force amber gradient colors to be properly applied
        const amberElements = document.querySelectorAll('[class*="amber"]');
        amberElements.forEach(el => {
            // Trigger a reflow
            el.classList.add('amber-color-fix');
            setTimeout(() => {
                el.classList.remove('amber-color-fix');
            }, 10);
        });
        
        // Fix logo gradient specifically
        const logoGradient = document.querySelector('.text-gradient');
        if (logoGradient) {
            logoGradient.style.setProperty('--tw-gradient-from', '#f59e0b', 'important');
            logoGradient.style.setProperty('--tw-gradient-to', '#d97706', 'important');
        }
    }
    
    // Apply color fixes
    fixAmberColors();
    setTimeout(fixAmberColors, 500); // Run again after a delay to catch any dynamic content
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 20) {
                header.classList.add('scrolled', 'shadow-md');
            } else {
                header.classList.remove('scrolled', 'shadow-md');
            }
        }
    });
    
    // Simple Mobile Menu Implementation
    function setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const closeButton = document.getElementById('mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        
        if (!menuButton || !closeButton || !mobileMenu || !overlay) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // Open menu function
        function openMenu() {
            // Show overlay
            overlay.classList.remove('hidden');
            
            // Show menu (remove the transform that pushes it off-screen)
            mobileMenu.classList.add('translate-x-0');
            mobileMenu.classList.remove('translate-x-full');
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
            
            // Update ARIA attributes
            menuButton.setAttribute('aria-expanded', 'true');
        }
        
        // Close menu function
        function closeMenu() {
            // Hide menu (add the transform that pushes it off-screen)
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            
            // Wait for animation to finish before hiding overlay
            setTimeout(() => {
                overlay.classList.add('hidden');
                
                // Restore body scrolling
                document.body.style.overflow = '';
                
                // Update ARIA attributes
                menuButton.setAttribute('aria-expanded', 'false');
            }, 300); // Match the transition duration
        }
        
        // Toggle menu
        menuButton.addEventListener('click', openMenu);
        
        // Close menu when clicking close button
        closeButton.addEventListener('click', closeMenu);
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMenu);
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
                closeMenu();
            }
        });
        
        // Handle menu link clicks
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // If link goes to another page, let it navigate naturally
                const href = this.getAttribute('href');
                if (!href.includes('#') || (href.includes('.html') && !href.includes(window.location.pathname.split('/').pop()))) {
                    return;
                }
                
                // For same-page links, close the menu after clicking
                setTimeout(closeMenu, 100);
            });
        });
    }
    
    // Setup mobile menu on page load
    setupMobileMenu();
    
    // Also setup after header is loaded via includes (if applicable)
    document.addEventListener('header-loaded', function() {
        setTimeout(setupMobileMenu, 100);
        setTimeout(fixAmberColors, 200); // Fix colors after header is loaded
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty anchors
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Fix for links with page references (e.g., index.html#section)
    document.querySelectorAll('a[href*=".html#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            // If link points to current page with hash, handle it like an anchor link
            if (href.startsWith(currentPage + '#')) {
                e.preventDefault();
                const targetId = '#' + href.split('#')[1];
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without reloading
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Handle initial hash in URL (for when page loads with a hash)
    function handleInitialHash() {
        if (location.hash) {
            const targetId = location.hash;
            const target = document.querySelector(targetId);
            
            if (target) {
                setTimeout(() => {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    }
    
    // Call handleInitialHash after DOM is loaded
    setTimeout(handleInitialHash, 1000);
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading indicator
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call - replace with actual fetch to your endpoint
            setTimeout(() => {
                // Success message
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-4 rounded-lg mt-4';
                successMessage.innerHTML = '<div class="flex items-center"><svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Thank you! Your message has been sent successfully.</span></div>';
                
                // Reset form and show message
                contactForm.reset();
                contactForm.appendChild(successMessage);
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Staggered animation for cards
        const cardContainers = document.querySelectorAll('.grid');
        cardContainers.forEach(container => {
            const cards = container.querySelectorAll('.feature-card, .enhanced-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    const cardPosition = card.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (cardPosition < windowHeight - 50) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                }, index * 150);
            });
        });
    };
    
    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Trigger once on page load
    setTimeout(animateOnScroll, 100);
    
    // Create back to top button
    const createBackToTopButton = function() {
        // Create the button if it doesn't exist
        if (!document.querySelector('.back-to-top')) {
            const backToTopButton = document.createElement('div');
            backToTopButton.className = 'back-to-top';
            backToTopButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                </svg>
            `;
            document.body.appendChild(backToTopButton);
            
            // Add click event
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Show/hide based on scroll position
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
        }
    };
    
    // Initialize back to top button
    createBackToTopButton();
    
    // Counter animation
    const animateCounter = function(counter, target) {
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter, target), 20);
        } else {
            counter.innerText = target;
        }
    };
    
    // Set up Intersection Observer for counters
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    setTimeout(() => {
                        animateCounter(entry.target, target);
                    }, 400);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});
