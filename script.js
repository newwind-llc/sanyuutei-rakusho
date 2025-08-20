document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');

    if (hamburgerMenu && mobileMenuDropdown) {
        hamburgerMenu.addEventListener('click', function() {
            mobileMenuDropdown.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = hamburgerMenu.querySelectorAll('span');
            if (mobileMenuDropdown.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-dropdown a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuDropdown.classList.contains('active')) {
                mobileMenuDropdown.classList.remove('active');
                const spans = hamburgerMenu.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Smooth scrolling for all navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 160 : 120; // Account for header height
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu-dropdown a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.style.backgroundColor = '';
                    link.style.color = '';
                    link.style.fontWeight = '';
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        link.style.backgroundColor = '#e3f2fd';
                        link.style.color = '#4682B4';
                        link.style.fontWeight = '600';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Fade-in animation for content cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe content cards for animation
    const cards = document.querySelectorAll('.content-card, .top-section');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });

    // Enhanced hover effects for interactive elements
    const hoverElements = document.querySelectorAll('.event-item, .job-item, .feature, .sns-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Add click feedback for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});