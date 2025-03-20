/**
 * Comprehensive form validation for ACUMEN website
 * Handles all forms including registration and contact forms
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find all forms that need validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add custom validation
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'This field is required');
                } else {
                    clearError(field);
                }
            });
            
            // Check email format
            const emailFields = form.querySelectorAll('input[type="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            emailFields.forEach(field => {
                if (field.value.trim() && !emailPattern.test(field.value)) {
                    isValid = false;
                    showError(field, 'Please enter a valid email address');
                }
            });
            
            // Check phone format
            const phoneFields = form.querySelectorAll('input[type="tel"]');
            const phonePattern = /^[\d\s\+\-\(\)]{10,15}$/;
            
            phoneFields.forEach(field => {
                if (field.value.trim() && !phonePattern.test(field.value)) {
                    isValid = false;
                    showError(field, 'Please enter a valid phone number');
                }
            });
            
            // If validation fails, prevent form submission
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to the first error
                const firstError = form.querySelector('.form-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Real-time validation feedback
        form.addEventListener('input', function(e) {
            const field = e.target;
            if (field.hasAttribute('required') && field.value.trim()) {
                clearError(field);
            }
        });
    });
    
    function showError(field, message) {
        // Remove any existing error
        clearError(field);
        
        // Add error message
        const errorSpan = document.createElement('span');
        errorSpan.className = 'form-error';
        errorSpan.textContent = message;
        errorSpan.style.color = 'var(--secondary-color)';
        errorSpan.style.fontSize = '0.8rem';
        errorSpan.style.marginTop = '5px';
        errorSpan.style.display = 'block';
        
        // Insert error after the field
        field.parentNode.appendChild(errorSpan);
        
        // Highlight the field
        field.style.borderColor = 'var(--secondary-color)';
    }
    
    function clearError(field) {
        // Remove error message
        const errorSpan = field.parentNode.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.remove();
        }
        
        // Remove highlight
        field.style.borderColor = '';
    }
});
