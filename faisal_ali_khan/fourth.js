var images = ['assets/team-pics/services pages/slide1.jpg', 'assets/team-pics/services pages/slide2.png', 'assets/team-pics/services pages/slide3.png', 'assets/team-pics/services pages/slide4.png'];
const frontDiv = document.querySelector('.front');

// Remove any existing images
while (frontDiv.firstChild) {
    frontDiv.firstChild.remove();
}

// Create and append new images
images.forEach((src, index) => {
    const img = document.createElement('img');
    img.classList.add('slide');
    img.src = src;
    img.alt = 'center Image';
    img.style.left = `${index * 100}%`;
    frontDiv.appendChild(img);
});


const slides = document.querySelectorAll('.fourth-section .slide');
console.log(slides);
var counter = 0;

slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`;
    }
)

const slideImage = () => {
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`;
        }
    )
};

// Call slideImage once to display the first image
slideImage();


const goPrev = () => {
    if (counter > 0) {
        counter--;
    } else {
        // If at the first image, wrap around to the last image
        counter = images.length - 1;
    }
    slideImage();
};

const goNext = () => {
    if (counter < images.length - 1) {
        counter++;
    } else {
        // If at the last image, wrap around to the first image
        counter = 0;
    }
    slideImage();
};

// Call goNext every 3 seconds
setInterval(goNext, 3000);

//Animation

// Select the section
const fourthSection = document.querySelector('.fourth-section');

// Create an intersection observer
const observer4 = new IntersectionObserver((entries) => {
    // Loop over the entries
    entries.forEach((entry) => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
            // Add the animation
            entry.target.style.animation = 'fade-in 3s ease-out forwards';
        }
    });
});

// Start observing the section
observer4.observe(fourthSection);