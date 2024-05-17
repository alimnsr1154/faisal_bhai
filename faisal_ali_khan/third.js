// Select the elements
const textContent = document.querySelector('.third-section-content .text-content');
const logos = document.querySelectorAll('.third-section-content .logos img'); // Select all logo images
const videoDescription = document.querySelector('.third-section-content .video-description');

// Create an intersection observer
const observer3 = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            // If the target is the textContent element, apply the slideFromBottom animation
            if (entry.target === textContent) {
                entry.target.style.animation = 'slideFromBottom 2s ease-out forwards';
            } else if (entry.target === videoDescription) {
                entry.target.style.animation = 'slideFromBottom 2s ease-out forwards';
            }
        }
    });
});

// Start observing the elements
observer3.observe(textContent);
if (videoDescription) {
    observer3.observe(videoDescription);
}

// Initially hide all logos after the 6th one
for (let i = 6; i < logos.length; i++) {
    logos[i].style.display = 'none';
}

// Switch logos every 5 seconds
let currentSet = 0;
setInterval(() => {
    // Hide all logos
    for (let i = 0; i < logos.length; i++) {
        logos[i].style.display = 'none';
    }

    // Calculate start and end indices for the current set of logos
    const start = currentSet * 6;
    const end = start + 6;

    // Show the current set of logos
    for (let i = start; i < end; i++) {
        if (logos[i]) {
            logos[i].style.display = 'block';
        }
    }

    // Update current set
    currentSet = (currentSet + 1) % 2; // This will toggle between 0 and 1
}, 3000); // 5 seconds in milliseconds
