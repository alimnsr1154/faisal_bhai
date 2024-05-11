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
        src: 'assets/testimonails/4.mp4',
        message: 'Faisal have a great visual skill for technology and start ups when it comes to marketing and sales. He helped both of our companies to get great attention in B2B and B2C market. His ability to connect brand with customers is really impressive we are 100% satisfied and love to always get his services',
        name: 'Loius',
        designation: 'Cofounder PromoML - Netherlands'
    },
    {
        type: 'video',
        src: 'assets/testimonails/5.mp4',
        message: "UNDP  knows the importance of content creation in modern digital world and luckily Faisal helped us a lot in the communication and video content areas for our initiatives and programs. His devotion towards climate change projects and documentaries is really extra ordinary and the way he craft the storytelling and make content engaging is impressive. He did a great job and we are looking forward for more collaborations!",
        name: 'Ammara Durrani',
        designation: '"Assistant Resident Representative" - UNDP,Pakistan'
    },
    {
        type: 'video',
        src: 'assets/testimonails/2.mp4',
        message: "We were launching our APP and needed a high end celebrity included marketing campaigns and Faisal did an amazing work way higher  than our expectation. Later on we had project lambo a crypto and blockchain project in which again he helped us in branding and high quality visuals and video creation. I definitely recommend him!",
        name: 'Iqbal Ullah2',
        designation: '"OUI SELECT LTD" - London,UK'
    },
    {
        type: 'video',
        src: 'assets/testimonails/1.mp4',
        message: "We were launching our APP and needed a high end celebrity included marketing campaigns and Faisal did an amazing work way higher  than our expectation. Later on we had project lambo a crypto and blockchain project in which again he helped us in branding and high quality visuals and video creation. I definitely recommend him!",
        name: 'Emman Ali',
        designation: '"OUI SELECT LTD" - London,UK'
    },
    {
        type: 'video',
        src: 'assets/testimonails/3.mp4',
        message: "NGO and International Organizations are always a tricky field for documentaries and agenda based films and I must say Faisal always did a great job working for UNDP,  USIP and now for UN Migration. His story telling ability is well matured and emotional that we do need in such initiatives  and I hope he will keep on serving the humanity through his artistic branding, web development and video creation for documentaries.",
        name: 'Suzana Paklar',
        designation: '"Senior Program Coordinator" - UN Migration'
    },

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
        mediaElement.playsinline = true; // Add this line

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