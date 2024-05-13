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
            // If the target is the logos element, apply the blink animation
            if (entry.target === logos) {
                entry.target.style.animation = 'blink 3s linear';
            } else {
                // Otherwise, apply the slideFromBottom animation
                entry.target.style.animation = 'slideFromBottom 2s ease-out forwards';
            }
        }
    });
});

// Start observing the elements
observer3.observe(textContent);
observer3.observe(logos);
observer3.observe(videoDescription);