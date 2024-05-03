
//Sixth Section
var socialCards = [
    {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/faisal-ali-khan-354549114/?originalSubdomain=pk',
        icon: 'assets/social-media icons/linkedin.png',
        username: '@faisalalikhan',
        followersCount: '2k+',
        followersText: 'Followers',
        message: 'Follow us on LinkedIn'
    },
    {
        platform: 'youtube',
        url: 'https://www.youtube.com/@faisalalikhan4409',
        icon: 'assets/social-media icons/youtube.png',
        username: '@faisalalikhan4409',
        followersCount: '1k+',
        followersText: 'Subscribers',
        message: 'Subscribe to our YouTube'
    },
    {
        platform: 'instagram',
        url: 'https://www.instagram.com/faisallalikhan/',
        icon: 'assets/social-media icons/insta.png',
        username: '@faisalalikhan',
        followersCount: '1.2k+',
        followersText: 'Followers',
        message: 'Follow us on Instagram'
    },
    {
        platform: 'facebook',
        url: 'https://www.facebook.com/mfaial.ali.9',
        icon: 'assets/social-media icons/facebook.png',
        username: '@faisalalikhan',
        followersCount: '1k+',
        followersText: 'Likes',
        message: 'Like our Facebook page'
    },
    {
        platform: 'x',
        url: '',
        icon: 'assets/social-media icons/x.png',
        username: '@faisalalikhan',
        followersCount: '2k+',
        followersText: 'Followers',
        message: 'Follow us on X'
    }
];

var centerText = "Engage<br>With Me<br>24/7";
var descriptionText = "After spending over a decade in real estate and entertainment, I'd love to share what I've learned<br> and connect with those who've supported me since the start of my career.";


// Get the container for the social cards
var socialCardsContainer = document.querySelector('.sixth-section .social-cards');

// Function to generate the onclick function for a card
function generateOnClickFunction(url) {
    return function () { window.open(url, '_blank'); };
}

// Loop through each social card
for (var i = 0; i < socialCards.length; i++) {
    var card = socialCards[i];

    // Create the card div
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card ' + card.platform;
    cardDiv.onclick = generateOnClickFunction(card.url);

    // Create the card image
    var img = document.createElement('img');
    img.src = card.icon;
    img.className = 'card-img-top';
    img.alt = card.platform;
    cardDiv.appendChild(img);

    // Create the card body
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Add the username, followers count, followers text, and message to the card body
    var classToPropertyMap = {
        'username': 'username',
        'followers-count': 'followersCount',
        'followers': 'followersText',
        'message': 'message'
    };

    Object.keys(classToPropertyMap).forEach(function (className) {
        var p = document.createElement('p');
        p.className = 'card-text ' + className;
        p.innerHTML = card[classToPropertyMap[className]];
        cardBody.appendChild(p);
    });

    // Add the card body to the card div
    cardDiv.appendChild(cardBody);

    // Add the card div to the social cards container
    socialCardsContainer.appendChild(cardDiv);
}

// Set the center text and description text
document.querySelector('.sixth-section .center-text').innerHTML = centerText;
document.querySelector('.sixth-section .description-text').innerHTML = descriptionText;