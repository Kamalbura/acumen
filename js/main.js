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
});

// FIX: Better scroll handling to prevent flickering
(function() {
    let scrollTimer;
    let isScrollingSmoothly = false;
    const body = document.body;
    
    // More efficient scroll handler
    function handleScroll() {
        if (!isScrollingSmoothly) {
            isScrollingSmoothly = true;
            body.classList.add('is-scrolling');
            
            // Disable all non-essential animations
            document.querySelectorAll('.glitch-text').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        }
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            isScrollingSmoothly = false;
            body.classList.remove('is-scrolling');
            
            // Only re-enable animations if not on mobile
            if (window.innerWidth > 768) {
                document.querySelectorAll('.glitch-text').forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        }, 300); // Longer timeout for better performance
    }
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also handle touch moves on mobile to detect scrolling early
    window.addEventListener('touchmove', handleScroll, { passive: true });
})();

// FIX: Properly throttled random glitch effect
(function() {
    const originalRandomGlitch = window.randomGlitch || function() {};
    let glitchTimeout;
    
    window.randomGlitch = function() {
        // Only apply effects when not scrolling and not on mobile
        if (!document.body.classList.contains('is-scrolling') && window.innerWidth > 768) {
            const elements = document.querySelectorAll('.event-card, .section-title, .btn-primary, .btn-secondary');
            
            if (elements.length > 0) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                
                randomElement.classList.add('glitch-effect');
                
                setTimeout(() => {
                    randomElement.classList.remove('glitch-effect');
                }, 200);
            }
        }
        
        // Schedule next glitch with lower frequency
        clearTimeout(glitchTimeout);
        glitchTimeout = setTimeout(window.randomGlitch, Math.random() * 8000 + 5000);
    };
    
    // Start the first random glitch with a delay
    setTimeout(window.randomGlitch, 3000);
})();
