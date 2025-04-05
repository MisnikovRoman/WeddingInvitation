// Main event listener when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // COUNTDOWN TIMER
    /**
     * Updates the wedding countdown timer showing months, weeks, and days remaining
     * until the wedding date (June 30, 2025)
     */
    function updateCountdown() {
        const weddingDate = new Date('June 30, 2025 16:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        // If the wedding date has passed
        if (timeLeft < 0) {
            document.getElementById('months').textContent = '0';
            document.getElementById('weeks').textContent = '0';
            document.getElementById('days').textContent = '0';
            return;
        }
        
        // Calculate time units
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        // Calculate and format time remaining
        const days = Math.floor(timeLeft / day);
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        const weeks = Math.floor(remainingDays / 7);
        const finalDays = remainingDays % 7;
        
        // Update the countdown elements
        document.getElementById('months').textContent = months;
        document.getElementById('weeks').textContent = weeks;
        document.getElementById('days').textContent = finalDays;
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // IMAGE ERROR HANDLING
    /**
     * Sets a fallback for images that fail to load
     * Displays a placeholder SVG with "Изображение" text
     */
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22288%22%20height%3D%22225%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20fill%3D%22%23eee%22%20d%3D%22M0%200h288v225H0z%22%2F%3E%3Ctext%20fill%3D%22%23aaa%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20x%3D%22144%22%20y%3D%22112%22%3E%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%3C%2Ftext%3E%3C%2Fsvg%3E';
            this.style.opacity = '0.7';
        };
    });
    
    // SCROLL REVEAL ANIMATION
    /**
     * Implements smooth reveal animations for all sections
     * when they come into the viewport while scrolling
     */
    const sections = document.querySelectorAll('section');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Apply initial styles to sections for animations
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
    });
    
    // Reveal sections when scrolling
    function revealSections() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Reveal sections on initial load
    setTimeout(revealSections, 100);
    
    // Listen for scroll events
    window.addEventListener('scroll', revealSections);

    // ADD TO CALENDAR FUNCTIONALITY
    /**
     * Handles the "Add to Calendar" button click
     * Downloads the wedding_invitation.ics file
     */
    document.getElementById('add-to-calendar-button').addEventListener('click', function() {
        // Download the pre-created ICS file
        const icsFileUrl = 'wedding_invitation.ics';
        
        // Create a link element to download the file
        const link = document.createElement('a');
        link.href = icsFileUrl;
        link.download = 'wedding_invitation.ics';
        link.style.display = 'none';
        
        // Append to the body, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // RSVP FORM FUNCTIONALITY
    /**
     * Handles the RSVP form submission
     * Sends data to the webhook URL
     */
    const rsvpForm = document.getElementById('rsvp-form');
    const responseMessage = document.getElementById('response-message');

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('guest-name').value.trim();
        const answer = document.querySelector('input[name="answer"]:checked').value;
        const comment = document.getElementById('comment').value.trim();
        
        // Prepare data for submission
        const data = {
            name: name,
            answer: answer,
            comment: comment
        };
        
        // Send data to webhook
        fetch('https://hook.eu2.make.com/wch2a38ovay1sfiks7dbymjv57rpj1n3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Don't parse the response as JSON
            // Show success message
            responseMessage.textContent = 'Спасибо! Ваш ответ успешно отправлен.';
            responseMessage.className = 'response-message success';
            
            // Reset form
            rsvpForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            // Show error message
            responseMessage.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.';
            responseMessage.className = 'response-message error';
            
            console.error('Error:', error);
        });
    });
}); 