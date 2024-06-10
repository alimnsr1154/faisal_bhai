// Select the logos container
const logosContainer = document.querySelector('.third-section-content .logos');

// Clone the logos to create a seamless loop
const logosInner = document.createElement('div');
logosInner.className = 'logos-inner';
logosInner.innerHTML = logosContainer.innerHTML + logosContainer.innerHTML;
logosContainer.innerHTML = '';
logosContainer.appendChild(logosInner);

// Create an intersection observer
const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideLogos 50s linear infinite';
        }
    });
});

// Observe the logos container
observer3.observe(logosInner);
