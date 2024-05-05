//Fifth Section

$(document).ready(function () {
    var carousel = $('#carouselExampleControls'); // Replace with your carousel's selector

    carousel.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        muted: true,
        focusOnSelect: true,
        centerMode: true, // Enables centered view with partial prev/next slides
        centerPadding: '0px', // Removes padding
        autoplay: true, // Enables automatic sliding
        autoplaySpeed: 5000 // Sets the delay between slides to 5 seconds
    });

    $('#prevButton').on('click', function () {
        carousel.slick('slickPrev');
    });

    $('#nextButton').on('click', function () {
        carousel.slick('slickNext');
    });
});

var cards = [
    {
        type: 'video',
        src: 'assets/testimonails/luis_testimonal.mp4',
        message: 'Ryan Serhant is the Authority on all the things selling',
        name: 'Loius',
        designation: 'Cofounder PromoML - Netherlands'
    },
    {
        type: 'video',
        src: 'assets/testimonails/iqbal_testimonal.mp4',
        message: "Ryan's journey as he sharpened his own sales skills is truly inspiring and something every salesperson or entrepreneur needs to learn from.",
        name: 'Iqbal Ullah',
        designation: '"OUI SELECT LTD" - London,UK'
    },
    {
        type: 'image',
        src: 'assets/logo.png',
        message: 'Message 5',
        name: 'Name 5',
        designation: 'Designation 5'
    },
    {
        type: 'image',
        src: 'assets/logo.png',
        message: 'Message 4',
        name: 'Name 4',
        designation: 'Designation 4'
    },
    {
        type: 'video',
        src: 'assets/testimonails/suzana_paklar_testimonail.mp4',
        message: "Ryan's journey as he sharpened his own sales skills is truly inspiring and something every salesperson or entrepreneur needs to learn from.",
        name: 'Suzana Paklar',
        designation: '"Senior Program Coordinator" - UN Migration'
    }
];

var carousel = document.getElementById('carouselExampleControls');
cards.forEach(function (card) {
    var cardElement = document.createElement('div');
    cardElement.className = 'card';

    var mediaElement;
    if (card.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.className = 'card-video-top';
        mediaElement.autoplay = true;
        mediaElement.muted = true;
        mediaElement.loop = true;

        var sourceElement = document.createElement('source');
        sourceElement.src = card.src;
        sourceElement.type = 'video/mp4';
        mediaElement.appendChild(sourceElement);
    } else {
        mediaElement = document.createElement('img');
        mediaElement.className = 'card-img-top';
        mediaElement.src = card.src;
    }
    cardElement.appendChild(mediaElement);

    var bodyElement = document.createElement('div');
    bodyElement.className = 'card-body';

    var messageElement = document.createElement('p');
    messageElement.className = 'card-text message';
    messageElement.textContent = card.message;
    bodyElement.appendChild(messageElement);

    var nameElement = document.createElement('p');
    nameElement.className = 'card-text name';
    nameElement.textContent = card.name;
    bodyElement.appendChild(nameElement);

    var designationElement = document.createElement('p');
    designationElement.className = 'card-text designation';
    designationElement.textContent = card.designation;
    bodyElement.appendChild(designationElement);

    cardElement.appendChild(bodyElement);

    carousel.appendChild(cardElement);
});