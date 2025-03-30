document.addEventListener('DOMContentLoaded', function() {
    // Navigation and Menu Elements
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    
    // Toggle Mobile Menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Close Mobile Menu
    function closeMenu() {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Event Listeners
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    
    // Close menu when link is clicked
    document.querySelectorAll('.menu ul li a, nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Highlight Current Page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a, .menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('current-page');
        }
    });
    
    // destination read more/less
    // Enhanced Read More functionality for destination cards
    document.querySelectorAll('.destination-card').forEach(card => {
        const readMoreBtn = card.querySelector('.read-more');
        const description = card.querySelector('.destination-description');
        const fullDescription = card.querySelector('.destination-details');
        
        if (readMoreBtn && description && fullDescription) {
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Toggle between short and full description
                if (description.style.display !== 'none') {
                    description.style.display = 'none';
                    fullDescription.classList.add('active');
                    readMoreBtn.textContent = 'Read Less ←';
                } else {
                    description.style.display = '-webkit-box';
                    fullDescription.classList.remove('active');
                    readMoreBtn.textContent = 'Read More →';
                }
            });
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            testimonials[index].classList.add('active');
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        showTestimonial(currentIndex);
    }
    
    // Pricing Tabs
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    if (pricingTabs.length) {
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Deactivate all tabs
                pricingTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all packages
                document.querySelectorAll('.pricing-cards').forEach(card => {
                    card.style.display = 'none';
                });
                
                // Show selected package
                const target = this.getAttribute('data-target');
                document.getElementById(target + '-packages').style.display = 'flex';
            });
        });
        
        // Mark middle package as recommended
        const pricingCards = document.querySelectorAll('.pricing-card');
        if (pricingCards.length >= 3) {
            pricingCards[1].classList.add('recommended');
        }
    }
    
    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            
            const toggleIcon = this.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = item.classList.contains('active') ? '-' : '+';
            }
            
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = item.classList.contains('active') 
                    ? answer.scrollHeight + 'px' 
                    : 0;
            }
        });
    });
});