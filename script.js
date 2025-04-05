document.addEventListener('DOMContentLoaded', function() {
    const rsvpButton = document.querySelector('.rsvp-button');
    
    rsvpButton.addEventListener('click', function() {
        // Simple alert for demo purposes
        // In a real application, this would open a form or modal
        alert('Thank you for your interest in our special day! The RSVP form will be available soon.');
        
        // You could replace this with code to show a modal or navigate to an RSVP form
        // For example:
        // document.querySelector('.rsvp-form').classList.remove('hidden');
    });
    
    // Add subtle animation to the title when page loads
    const title = document.querySelector('.title');
    title.style.opacity = 0;
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        title.style.opacity = 1;
        title.style.transform = 'translateY(0)';
    }, 300);

    // Countdown Timer
    function updateCountdown() {
        const weddingDate = new Date('June 30, 2025 16:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        // If the date has passed
        if (timeLeft < 0) {
            document.getElementById('months').textContent = '0';
            document.getElementById('weeks').textContent = '0';
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        // Calculate time units
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        // Calculate months, weeks, days, hours, minutes and seconds
        const days = Math.floor(timeLeft / day);
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        const weeks = Math.floor(remainingDays / 7);
        const finalDays = remainingDays % 7;
        
        const hours = Math.floor((timeLeft % day) / hour);
        const minutes = Math.floor((timeLeft % hour) / minute);
        const seconds = Math.floor((timeLeft % minute) / second);
        
        // Update the countdown elements
        document.getElementById('months').textContent = months;
        document.getElementById('weeks').textContent = weeks;
        document.getElementById('days').textContent = finalDays;
        
        // Update hours, minutes, seconds if these elements exist
        if (document.getElementById('hours')) {
            document.getElementById('hours').textContent = hours;
        }
        if (document.getElementById('minutes')) {
            document.getElementById('minutes').textContent = minutes;
        }
        if (document.getElementById('seconds')) {
            document.getElementById('seconds').textContent = seconds;
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second (1000ms)
    
    // Create placeholder for images if not available
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22288%22%20height%3D%22225%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20fill%3D%22%23eee%22%20d%3D%22M0%200h288v225H0z%22%2F%3E%3Ctext%20fill%3D%22%23aaa%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20dy%3D%22.3em%22%20text-anchor%3D%22middle%22%20x%3D%22144%22%20y%3D%22112%22%3E%D0%98%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%3C%2Ftext%3E%3C%2Fsvg%3E';
            this.style.opacity = '0.7';
        };
    });
    
    // Scroll reveal animation
    const sections = document.querySelectorAll('section');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Function to handle scroll reveal
    function revealSections() {
        sections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('revealed')) {
                section.classList.add('revealed');
            }
        });
    }
    
    // Add initial classes and styles
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
    });
    
    // Reveal sections on initial load
    setTimeout(revealSections, 100);
    
    // Listen for scroll events
    window.addEventListener('scroll', revealSections);
    
    // Add revealed class
    document.addEventListener('scroll', function() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Add to Calendar button functionality
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
}); 