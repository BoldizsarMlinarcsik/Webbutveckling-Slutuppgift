document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    
    // Toggle menu function
    function toggleMenu() {
        if (hamburger && menu && overlay) {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Added this for consistent body state management
        }
    }
    
    // Close menu function
    function closeMenu() {
        if (hamburger && menu && overlay) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Event listeners for menu toggling
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('.menu ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a, .menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('current-page');
        }
    });

    // YouTube API handling
    if (document.getElementById('youtube-player')) {
        // This is already handled by the YouTube iframe API in index.html
        // Additional YouTube customization could go here if needed
    }
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Show the current testimonial
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        }
        
        // Next testimonial
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Previous testimonial
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Show first testimonial on page load
        showTestimonial(currentIndex);
    }
    
    // Pricing tabs functionality
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    if (pricingTabs.length > 0) {
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.pricing-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all packages
                document.querySelectorAll('.pricing-cards').forEach(card => {
                    card.style.display = 'none';
                });
                
                // Show the selected package
                const target = this.getAttribute('data-target');
                document.getElementById(target + '-packages').style.display = 'flex';
            });
        });

        // Add "Most Popular" indicator to the middle package
        const allPricingCards = document.querySelectorAll('.pricing-card');
        if (allPricingCards.length >= 3) {
            allPricingCards[1].classList.add('recommended');
        }
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                item.classList.toggle('active');
                
                const toggleIcon = this.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.textContent = item.classList.contains('active') ? '-' : '+';
                }
                
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = 0;
                    }
                }
            });
        });
    }

    // Add cross-promotion sections to connect pages
    function addCrossPromotion() {
        // On destinations page, add pricing cross-promotion
        if (currentPage === 'destinations.html') {
            const destinationsPage = document.querySelector('.destinations-page');
            if (destinationsPage) {
                const crossPromo = document.createElement('div');
                crossPromo.className = 'cross-promotion';
                crossPromo.innerHTML = `
                    <h3>Find the Perfect Package for Your Dream Destination</h3>
                    <p>Now that you've explored our popular destinations, check out our tailored tour packages designed to give you the best experience.</p>
                    <a href="pricing.html">View Tour Packages</a>
                `;
                destinationsPage.appendChild(crossPromo);
            }
        }
        
        // On pricing page, add destinations cross-promotion
        if (currentPage === 'pricing.html') {
            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                const crossPromo = document.createElement('div');
                crossPromo.className = 'cross-promotion';
                crossPromo.innerHTML = `
                    <h3>Discover Where Your Adventure Begins</h3>
                    <p>Explore our handpicked destinations across Europe and find your perfect getaway spot.</p>
                    <a href="destinations.html">Browse Destinations</a>
                `;
                ctaSection.before(crossPromo);
            }
        }
    }
    
    addCrossPromotion();

    // Interactive destination cards
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cardContent = this.querySelector('.card-content');
            if (cardContent) {
                cardContent.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const cardContent = this.querySelector('.card-content');
            if (cardContent) {
                cardContent.style.transform = 'translateY(60px)';
            }
        });
    });
});
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');
    });
  });