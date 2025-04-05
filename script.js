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
}); 