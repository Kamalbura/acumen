document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Add delay to each navigation item for staggered animation
            document.querySelectorAll('.nav-links li').forEach((item, index) => {
                if (navLinks.classList.contains('active')) {
                    item.style.transitionDelay = `${index * 0.1}s`;
                } else {
                    item.style.transitionDelay = '0s';
                }
            });
        });
    }
    
    // Close mobile nav when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navToggle.click();
            }
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.padding = '10px 0';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
            } else {
                navbar.style.padding = '15px 0';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Random glitch effect for cyberpunk elements
    function randomGlitch() {
        const elements = document.querySelectorAll('.event-card, .section-title, .btn-primary, .btn-secondary');
        
        if (elements.length > 0) {
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            
            randomElement.classList.add('glitch-effect');
            
            setTimeout(() => {
                randomElement.classList.remove('glitch-effect');
            }, 200);
            
            // Schedule next glitch
            setTimeout(randomGlitch, Math.random() * 8000 + 4000); // Less frequent glitches
        }
    }
    
    // Start random glitch effect
    setTimeout(randomGlitch, 3000);
    
    // Add digital noise effect to body
    document.body.classList.add('digital-noise');
    
    // Animate event cards on scroll
    const eventCards = document.querySelectorAll('.event-card');
    
    if (eventCards.length > 0) {
        function checkScroll() {
            eventCards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (cardTop < windowHeight * 0.85) {
                    card.classList.add('visible');
                }
            });
        }
        
        // Initial check
        checkScroll();
        
        // Check on scroll
        window.addEventListener('scroll', checkScroll);
    }
    
    // Terminal typing effect for tagline
    const tagline = document.querySelector('.tagline');
    
    if (tagline && !tagline.classList.contains('terminal-text')) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.classList.add('terminal-text');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Fix for potential scrolling issues
    function fixScrolling() {
        // Reset any height constraints that might prevent scrolling
        document.body.style.height = 'auto';
        document.documentElement.style.height = 'auto';
        
        // Force a reflow to ensure scrollbars show properly
        window.dispatchEvent(new Event('resize'));
    }
    
    // Run the fix on page load and after a short delay to ensure all content is loaded
    fixScrolling();
    setTimeout(fixScrolling, 500);
    
    // Performance improvements for animations on mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Reduce animation intensity on mobile for better performance
        document.documentElement.style.setProperty('--animation-intensity', '0.5');
        
        // Add touch-friendly navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            link.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    } else {
        document.documentElement.style.setProperty('--animation-intensity', '1');
    }
    
    // Add student-friendly features
    
    // Highlight event deadlines
    const now = new Date();
    const eventDeadlines = document.querySelectorAll('[data-deadline]');
    
    if (eventDeadlines.length > 0) {
        eventDeadlines.forEach(deadline => {
            const deadlineDate = new Date(deadline.dataset.deadline);
            const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
            
            if (daysLeft <= 3 && daysLeft > 0) {
                // Highlight approaching deadlines
                deadline.classList.add('deadline-soon');
                deadline.innerHTML += `<span class="deadline-badge">Only ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left!</span>`;
            }
        });
    }
    
    // Enhance accessibility
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            const icon = element.querySelector('i');
            if (icon && icon.className) {
                const iconClass = icon.className.split(' ').filter(cls => cls.includes('fa-'))[0];
                if (iconClass) {
                    const label = iconClass.replace('fa-', '').replace(/-/g, ' ');
                    element.setAttribute('aria-label', label);
                }
            }
        }
    });
    
    // CRITICAL FIX: Ensure scrolling works properly
    function fixScrollIssues() {
        // Reset any problematic styles that might be blocking scroll
        document.documentElement.style.height = 'auto';
        document.body.style.height = 'auto';
        document.documentElement.style.overflow = 'visible';
        document.body.style.overflow = 'visible';
        
        // Force proper overflow settings
        setTimeout(function() {
            document.documentElement.style.overflowY = 'scroll';
            document.body.style.overflowY = 'visible';
            
            // Force browser to recognize changes
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }
    
    // Run scroll fix on page load and after a delay
    fixScrollIssues();
    setTimeout(fixScrollIssues, 500);
    
    // Fix any potential z-index issues with overlay elements
    document.querySelectorAll('.glitch-overlay, body::after').forEach(function(el) {
        if(el.style) {
            el.style.pointerEvents = 'none';
            el.style.zIndex = parseInt(el.style.zIndex || 0) < 2 ? el.style.zIndex : 1;
        }
    });
    
    // Check for mobile devices and reduce animation intensity
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {
        // Reduce animation intensity on mobile for better performance and scrolling
        document.documentElement.style.setProperty('--animation-intensity', '0.3');
        
        // Further optimize for mobile scrolling
        document.querySelectorAll('.glitch-text').forEach(el => {
            el.style.animationDuration = '6s';
        });
    }
    
    // Monitor for scroll issues
    let lastScrollTop = 0;
    let scrollStuckCounter = 0;
    
    window.addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if scroll seems stuck
        if (Math.abs(st - lastScrollTop) < 1) {
            scrollStuckCounter++;
            if (scrollStuckCounter > 20) {
                // Scroll appears stuck, try to fix
                fixScrollIssues();
                scrollStuckCounter = 0;
            }
        } else {
            scrollStuckCounter = 0;
        }
        
        lastScrollTop = st;
    });
    
    // Fix scrolling flickering by pausing animations during scroll
    let scrollTimeout;
    let isScrolling = false;
    
    function onScroll() {
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            document.body.classList.remove('is-scrolling');
        }, 100);
    }
    
    // Optimized scroll event with passive flag for better performance
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Fix for animation-related flickering
    function optimizeAnimations() {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        
        glitchTexts.forEach(function(element) {
            // Ensure each element has a data-text attribute
            if (!element.getAttribute('data-text')) {
                element.setAttribute('data-text', element.textContent);
            }
            
            // Force hardware acceleration
            element.style.transform = 'translateZ(0)';
        });
    }
    
    optimizeAnimations();
    
    // Throttle random glitch effect to reduce repaints
    const originalRandomGlitch = randomGlitch;
    randomGlitch = function() {
        if (!isScrolling) {
            originalRandomGlitch();
        } else {
            // When scrolling, schedule next check without executing effect
            setTimeout(randomGlitch, 3000);
        }
    };

    // Hero section button enhancements
    const registerButton = document.getElementById('registerButton');
    const exploreButton = document.getElementById('exploreButton');
    
    if (registerButton) {
        // Add hover effect
        registerButton.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        registerButton.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
        
        // Add click animation and analytics tracking
        registerButton.addEventListener('click', function(e) {
            // Add click animation
            this.classList.add('btn-clicked');
            
            // Track registration button click in analytics (if available)
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'engagement',
                    'event_label': 'register_button'
                });
            }
            
            // For mobile, add active state
            if (window.innerWidth < 768) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Add active state briefly
                this.classList.add('active');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    }
    
    if (exploreButton) {
        // Add hover effect
        exploreButton.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        exploreButton.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
        
        // Add click animation and analytics tracking
        exploreButton.addEventListener('click', function(e) {
            // Add click animation
            this.classList.add('btn-clicked');
            
            // Track explore events button click in analytics (if available)
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'engagement',
                    'event_label': 'explore_events_button'
                });
            }
            
            // For mobile, add active state
            if (window.innerWidth < 768) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Add active state briefly
                this.classList.add('active');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    }
    
    // Add custom cursor activation
    if (!('ontouchstart' in window)) {
        document.body.classList.add('custom-cursor-active');
        
        // Add glitch hover effect to text elements
        const headings = document.querySelectorAll('h1, h2, h3, .event-title, .footer-logo p');
        headings.forEach(heading => {
            if (!heading.classList.contains('glitch-text')) {  // Skip already glitched elements
                heading.classList.add('glitch-hover');
                heading.setAttribute('data-text', heading.textContent);
            }
        });
    }
    
    // Add parallax effect to hero sections
    const heroSections = document.querySelectorAll('.hero-section, .event-hero, .page-banner');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        heroSections.forEach(section => {
            // Only apply effect if section is in viewport
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                // Adjust background position based on scroll
                const speed = 0.5;
                section.style.backgroundPosition = `center ${scrollPosition * speed}px`;
            }
        });
    });
    
    // Add card tilt effect
    const cards = document.querySelectorAll('.event-card, .organizer-card, .sponsor-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Get position of mouse relative to card
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limit tilt amount
            const maxTilt = 10;
            const tiltX = ((y - centerY) / centerY) * maxTilt;
            const tiltY = -((x - centerX) / centerX) * maxTilt;
            
            // Apply transform
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Add animated underline effect to links
    document.querySelectorAll('.animated-link').forEach(link => {
        link.innerHTML = `<span class="animated-link-text">${link.textContent}</span>`;
        link.innerHTML += `<svg class="animated-link-line" width="100%" height="8" viewBox="0 0 100 8"><path d="M0,5 Q25,3 50,5 T100,5" stroke-width="2" stroke="var(--primary-color)" fill="none" /></svg>`;
    });
    
    // Improve navigation interaction
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = `0 0 10px var(--primary-color)`;
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });
    
    // Digital noise effect
    const noise = document.createElement('div');
    noise.className = 'digital-noise';
    document.body.appendChild(noise);
    
    // Add border glow effect to cards and buttons
    document.querySelectorAll('.event-card, .sponsor-card, .organizer-card').forEach(card => {
        card.classList.add('glow-border');
    });
    
    // Add energy field effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('energy-field');
        btn.setAttribute('data-text', btn.textContent);
    });
    
    // Add scanline effect to sections
    document.querySelectorAll('.event-hero, .hero-section, .about-section').forEach(section => {
        section.classList.add('scanline-effect');
    });
    
    // Add circuit path effect to footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.classList.add('circuit-path');
    });
    
    // Add corrupt text effect to social icons
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.classList.add('corrupt-text');
    });
    
    // Add text scramble effect for tech-themed elements
    const techElements = document.querySelectorAll('.event-title');
    
    techElements.forEach(element => {
        element.classList.add('scramble-text');
        element.setAttribute('data-text', element.textContent);
        
        element.addEventListener('mouseenter', function() {
            this.classList.add('scrambling');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('scrambling');
        });
    });
});
