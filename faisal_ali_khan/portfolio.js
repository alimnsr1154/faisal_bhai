function createContentSection(content, videoId) {
    console.log("Width: " + window.innerWidth);
    console.log("Height: " + window.innerHeight);
    // Create the main section container
    const section = document.createElement('div');
    section.className = 'content-section';

    // Create the text content
    const textSection = document.createElement('div');
    textSection.className = 'text-section';
    const heading = document.createElement('h2');
    heading.textContent = content.heading;
    const paragraph = document.createElement('p');
    paragraph.textContent = content.text;
    textSection.appendChild(heading);
    textSection.appendChild(paragraph);

    // Create the video content
    const videoSection = document.createElement('div');
    videoSection.className = 'video-section';
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameborder = '0';
    iframe.allowFullscreen = true;
    videoContainer.appendChild(iframe);
    videoSection.appendChild(videoContainer);

    // Append the text and video content to the main section
    section.appendChild(textSection);
    section.appendChild(videoSection);

    return section;
}

// Usage
const content1 = {
    heading: 'UI/UX & Web Design',

};
const content2 = {
    heading: 'Video Production & SMM Ads',
};
const content3 = {
    heading: 'Film and Documentaries',
};
const content4 = {
    heading: 'Podcast & Educational',
};

document.body.appendChild(createContentSection(content2, 'Hcg2zSnQpCU', false));
document.body.appendChild(createContentSection(content1, '1G90C-JNiSA', true));
document.body.appendChild(createContentSection(content3, 'HUNFrmBz9BY', true));
document.body.appendChild(createContentSection(content4, '8cOWGT4Cn2Y', false));