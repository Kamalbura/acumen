/**
 * Enhanced Mobile Navigation Fixes for ACUMEN Website
 * Fixes all mobile-specific UX issues
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        // Exit if navigation elements aren't found
        if (!navToggle || !navLinks) return;
        
        // Fix nav toggle button to ensure it works on all devices
        const toggleNav = function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open'); // Toggle body scroll lock
            
            // Add transition delay to navigation items for animation
            document.querySelectorAll('.nav-links li').forEach((item, index) => {
                item.style.transitionDelay = navLinks.classList.contains('active') 
                    ? `${index * 0.1}s` 
                    : '0s';
            });
        };
        
        // Toggle menu with better touch handling
        navToggle.addEventListener('click', toggleNav, { passive: false });
        
        // Prevent touchmove when menu is open to fix iOS scroll issues
        document.addEventListener('touchmove', function(e) {
            if (body.classList.contains('menu-open')) {
                if (!navLinks.contains(e.target)) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (navLinks.classList.contains('active')) {
                    toggleNav();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navToggle.contains(e.target) && 
                !navLinks.contains(e.target)) {
                toggleNav();
            }
        });
        
        // Fix for iOS and Android specific issues
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        if (isIOS) {
            // Fix for iOS momentum scrolling
            document.body.style.webkitOverflowScrolling = 'touch';
            
            // Fix for iOS 100vh issue
            const fixHeight = function() {
                document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
            };
            
            window.addEventListener('resize', fixHeight);
            window.addEventListener('orientationchange', fixHeight);
            fixHeight();
        }
        
        if (isAndroid) {
            // Fix for Android keyboard issues
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    window.scrollTo(0, 0);
                });
            });
        }
        
        // Detect touch capability for better interaction
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.body.classList.add('touch-device');
        }
        
        // Fix for mobile viewport and ensure no content bleeds off-screen
        function fixMobileLayout() {
            // Ensure proper viewport width
            const viewport = document.querySelector("meta[name=viewport]");
            if (viewport) {
                viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover");
            }
            
            // Fix for mobile toggle button positioning
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle && window.innerWidth <= 768) {
                // Force proper positioning of toggle button
                navToggle.style.position = 'absolute';
                navToggle.style.right = '15px';
                navToggle.style.top = '50%';
                navToggle.style.transform = 'translateY(-50%)';
                
                // Check if toggle is getting cut off
                const rect = navToggle.getBoundingClientRect();
                if (rect.right > window.innerWidth || rect.left < 0) {
                    // Adjust position if it's cut off
                    navToggle.style.right = '10px';
                }
            }
            
            // Check if any elements are causing horizontal scroll
            const bodyWidth = document.body.offsetWidth;
            const windowWidth = window.innerWidth;
            
            if (bodyWidth > windowWidth) {
                // Find and fix elements that might be causing overflow
                const allElements = document.querySelectorAll('*');
                allElements.forEach(el => {
                    if (el.offsetWidth > windowWidth) {
                        el.style.maxWidth = '100%';
                        el.style.overflowX = 'hidden';
                    }
                });
            }
            
            // Force container to respect viewport width
            const containers = document.querySelectorAll('.container');
            containers.forEach(container => {
                container.style.maxWidth = `${windowWidth}px`;
                container.style.boxSizing = 'border-box';
            });
        }
        
        // Run layout fix on load, after a delay, and on resize
        fixMobileLayout();
        window.addEventListener('resize', fixMobileLayout);
        setTimeout(fixMobileLayout, 100); // Run again after initial page layout
    });
    
    // Fix for position:fixed elements on mobile
    window.addEventListener('scroll', function() {
        // Force repainting of fixed elements for better mobile rendering
        const fixedElements = document.querySelectorAll('.navbar, .glitch-overlay');
        fixedElements.forEach(el => {
            el.style.transform = 'translateZ(0)';
        });
    }, { passive: true });
})();
