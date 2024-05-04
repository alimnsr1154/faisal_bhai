// Select the section 1
const firstSection = document.getElementById('first-section');

// Create an intersection observer
const observer1 = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            // Add the animations
            entry.target.querySelector('.first-name').style.animation = 'wrapAndOpen 2s ease-out forwards';
            entry.target.querySelector('.last-name').style.animation = 'wrapAndOpen 2s ease-out forwards';
        }
    });
});

// Start observing the sections
observer1.observe(firstSection);
