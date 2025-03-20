document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to (April 10, 2025)
    const countdownDate = new Date("April 10, 2025 09:00:00").getTime();
    
    // Verify countdown elements exist to prevent errors
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn("Countdown elements not found. Skipping countdown initialization.");
        return;
    }
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        try {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the countdown date
            const distance = countdownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Format with leading zeros
            const formattedDays = String(days).padStart(2, '0');
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');
            
            // Display the result in the corresponding elements - safely
            if (daysElement) daysElement.innerHTML = formattedDays;
            if (hoursElement) hoursElement.innerHTML = formattedHours;
            if (minutesElement) minutesElement.innerHTML = formattedMinutes;
            if (secondsElement) secondsElement.innerHTML = formattedSeconds;
            
            // Reduce frequency of glitch effects to improve performance
            if (Math.random() < 0.01) { // Less frequent glitches
                const timeElements = document.querySelectorAll('.countdown .time span:first-child');
                if (timeElements.length > 0) {
                    const randomElement = timeElements[Math.floor(Math.random() * timeElements.length)];
                    
                    randomElement.classList.add('glitch-text');
                    
                    setTimeout(() => {
                        randomElement.classList.remove('glitch-text');
                    }, 200);
                }
            }
            
            // If the countdown is finished, display text and clear interval
            if (distance < 0) {
                clearInterval(countdownTimer);
                const countdownTitle = document.querySelector(".countdown-container h3");
                if (countdownTitle) countdownTitle.innerHTML = "Event in Progress!";
                
                if (daysElement) daysElement.innerHTML = "00";
                if (hoursElement) hoursElement.innerHTML = "00";
                if (minutesElement) minutesElement.innerHTML = "00";
                if (secondsElement) secondsElement.innerHTML = "00";
            }
        } catch (error) {
            console.error("Error in countdown timer:", error);
        }
    }, 1000);
});
