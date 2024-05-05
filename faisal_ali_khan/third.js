// Select the elements
const textContent = document.querySelector('.third-section-content .text-content');
const logos = document.querySelector('.third-section-content .logos');
const videoDescription = document.querySelector('.third-section-content .video-description');

// Create an intersection observer
const observer3 = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            // Add the animation
            entry.target.style.animation = 'slideFromBottom 2s ease-out forwards';
        }
    });
});

// Start observing the elements
observer3.observe(textContent);
observer3.observe(logos);
observer3.observe(videoDescription);