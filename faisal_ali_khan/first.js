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


// Select the buttons
const youtubeButton = document.getElementById('youtube-button');
const whatsappButton = document.getElementById('whatsapp-button');

// Add event listener to the YouTube button
youtubeButton.addEventListener('click', () => {
    window.open('https://www.youtube.com/watch?v=jFLn4A_ZZU8', '_blank'); // Replace YOUR_VIDEO_ID with the actual video ID or URL
});

// Add event listener to the WhatsApp button
whatsappButton.addEventListener('click', () => {
    window.open('https://wa.me/923008637620', '_blank'); // Replace YOUR_PHONE_NUMBER with the actual phone number including country code
});

const video = document.querySelector('.video');
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');


// Start observing the sections
observer1.observe(firstSection);
