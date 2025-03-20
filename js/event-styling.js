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
            // Set default categories if not already set
            eventCards.forEach(card => {
                if (!card.hasAttribute('data-category')) {
                    // Extract category from badge text if possible
                    const badge = card.querySelector('.event-badge');
                    if (badge) {
                        const badgeText = badge.textContent.trim().toLowerCase();
                        if (Object.keys(categoryColors).includes(badgeText)) {
                            card.setAttribute('data-category', badgeText);
                        } else {
                            // Set default category
                            card.setAttribute('data-category', 'technical');
                        }
                    }
                }
                
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, 100); // Use a consistent timing for better performance
            });
        }
    };
    
    // Apply hover effects for guideline items
    const guidelineItems = document.querySelectorAll('.guideline-item');
    guidelineItems.forEach(item => {
        // Add transition CSS directly to avoid potential issues
        item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Fix for FAQ accordion functionality
    const initFaqAccordion = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            // Initially hide all answers
            const answer = question.nextElementSibling;
            if (answer && answer.classList.contains('faq-answer')) {
                answer.style.display = 'none';
            }
            
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                
                const answer = this.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    if (this.classList.contains('active')) {
                        answer.style.display = 'block';
                    } else {
                        answer.style.display = 'none';
                    }
                }
            });
        });
    };
    
    // Initialize all functionality
    animateEventCards();
    initFaqAccordion();
});
