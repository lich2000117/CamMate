document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
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
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Add animation class
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('fade-in');
            }
        });
    }
    
    // Dark mode toggle
    const darkModeToggles = document.querySelectorAll('#dark-mode-toggle, #mobile-dark-mode-toggle');
    
    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If we have a saved theme, use that, otherwise use system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.documentElement.classList.add('dark');
    }
    
    // Add event listeners to all dark mode toggle buttons
    darkModeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', function() {
                document.documentElement.classList.toggle('dark');
                
                // Save preference to localStorage
                if (document.documentElement.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: target.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
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
    
    // Back to top button
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
    
    // Search overlay functionality
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // Create search overlay if it doesn't exist
            let searchOverlay = document.getElementById('search-overlay');
            if (!searchOverlay) {
                searchOverlay = document.createElement('div');
                searchOverlay.id = 'search-overlay';
                searchOverlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 fade-in';
                
                const searchContent = `
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Search</h3>
                            <button id="close-search" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div class="relative">
                            <input type="text" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search for features, cameras...">
                            <button class="absolute right-3 top-3 text-gray-400 dark:text-gray-500">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="mt-6">
                            <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Quick Links</h4>
                            <div class="grid grid-cols-2 gap-2">
                                <a href="#features" class="search-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Features</a>
                                <a href="#how-it-works" class="search-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">How It Works</a>
                                <a href="#use-cases" class="search-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Use Cases</a>
                                <a href="#extended-capabilities" class="search-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Extended Capabilities</a>
                                <a href="#event-management" class="search-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Event Management</a>
                                <a href="#contact" class="search-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Contact Us</a>
                            </div>
                        </div>
                    </div>
                `;
                
                searchOverlay.innerHTML = searchContent;
                document.body.appendChild(searchOverlay);
                
                // Add event listeners to close overlay
                const closeSearch = document.getElementById('close-search');
                const searchLinks = document.querySelectorAll('.search-link');
                
                closeSearch.addEventListener('click', function() {
                    searchOverlay.remove();
                });
                
                searchOverlay.addEventListener('click', function(e) {
                    if (e.target === searchOverlay) {
                        searchOverlay.remove();
                    }
                });
                
                // Handle quick links
                searchLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        searchOverlay.remove();
                    });
                });
            }
        });
    }
    
    // Background parallax effect
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxBackground = hero.querySelector('.bg-pattern');
            
            if (parallaxBackground) {
                parallaxBackground.style.transform = `translateY(${scrollPosition * 0.15}px)`;
            }
        });
    }
    
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
