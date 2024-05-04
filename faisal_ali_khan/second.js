

// Select the section
const section = document.getElementById('second-section');

// Create an intersection observer
const observer2 = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            // Add the animations
            entry.target.querySelector('.left').style.animation = 'slideFromLeft 2s ease-out forwards';
            entry.target.querySelector('.right').style.animation = 'slideFromBottom 2s ease-out forwards';
        }
    });
});

// Start observing the section
observer2.observe(section);