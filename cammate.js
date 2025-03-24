document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Get form data
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                message: form.querySelector('#message').value
            };

            try {
                // You can replace this URL with your own serverless function endpoint
                const response = await fetch('https://formspree.io/f/2699608229498847076', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Show success message
                    form.reset();
                    alert('Thank you for your message. We will get back to you soon!');
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle mobile menu toggle
    const menuButton = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Handle dark mode toggle
    const darkModeToggle = document.querySelector('[data-dark-toggle]');
    const mobileDarkModeToggle = document.querySelector('[data-mobile-dark-toggle]');
    
    // Function to toggle dark mode
    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark') ? 'enabled' : 'disabled');
    }
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
    }
    
    // Add event listeners for dark mode toggles
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to the target with smooth behavior
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in:not(.visible), .slide-in:not(.visible)');
        
        elements.forEach(element => {
            // Check if element is in viewport
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.8) {
                element.classList.add('visible');
                // Set opacity to 1 to make the element visible
                element.style.opacity = '1';
            }
        });
    };
    
    // Hide elements initially
    document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
        // Only hide if not already visible and no inline style is set
        if (!element.style.opacity) {
            element.style.opacity = '0';
        }
    });
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Search button functionality (simplified example)
    const searchButton = document.getElementById('search-button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = prompt('Enter search term:');
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // Implement actual search functionality here
            }
        });
    }

    // Add background parallax effect
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.animated-gradient');
        
        if (heroSection) {
            heroSection.style.backgroundPosition = `50% ${scrollY * 0.05}px`;
        }
    });
});
