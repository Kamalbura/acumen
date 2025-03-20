/**
 * Event Styling Enhancement Script
 * This script adds dynamic styling to event pages and cards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize category colors as CSS variables
    const categoryColors = {
        'technical': '#00ffcc',
        'non-technical': '#ff9900',
        'gaming': '#ff3366',
        'hackathon': '#9966ff',
        'coding': '#33ccff'
    };
    
    // Helper function to convert hex to RGB (moved outside the loop for better performance)
    const hexToRgb = hex => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };
    
    // Apply colors to CSS variables
    Object.entries(categoryColors).forEach(([category, color]) => {
        document.documentElement.style.setProperty(`--${category}-color`, color);
        
        document.documentElement.style.setProperty(`--${category}-color-rgb`, hexToRgb(color));
    });
    
    // Apply category class to event page body if we're on an event detail page
    if (document.querySelector('.event-details')) {
        // Try to determine event category
        const eventCategory = document.querySelector('meta[name="event-category"]')?.getAttribute('content') || 'technical';
        document.body.classList.add('event-page');
        document.body.setAttribute('data-category', eventCategory);
        
        // Also set the hero section category
        const heroSection = document.querySelector('.event-hero');
        if (heroSection) {
            heroSection.setAttribute('data-category', eventCategory);
        }
    }
    
    // Animation for event cards on the events listing page
    const animateEventCards = () => {
        const eventCards = document.querySelectorAll('.event-card');
        if (eventCards.length > 0) {
            eventCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 100); // Staggered animation
            });
        }
    };
    
    // Apply hover effects for guideline items
    const guidelineItems = document.querySelectorAll('.guideline-item');
    guidelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize animations
    animateEventCards();
});
