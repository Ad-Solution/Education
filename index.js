// Dummy resource data
const resourceData = [
    {
        id: 1,
        category: 'science',
        resourceType: 'Course',
        location: 'Colombo',
        institution: 'Tech University',
        description: 'An in-depth course on Physics, covering classical mechanics and quantum physics.',
        image: 'img1.png',
        postedDate: '2023-03-01'
    },
    
];

let filteredResources = [...resourceData];

function handleSearch() {
    const category = document.getElementById('category').value;
    const resourceType = document.getElementById('resourceType').value;
    const location = document.getElementById('location').value;

    filteredResources = resourceData.filter(resource => {
        return (!category || resource.category === category) &&
            (!resourceType || resource.resourceType === resourceType) &&
            (!location || resource.location.toLowerCase().includes(location.toLowerCase()));
    });

    displayResources();
}

function displayResources() {
    const resourceContainer = document.getElementById('resourceContainer');
    resourceContainer.innerHTML = '';

    filteredResources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 resource-card">
                <img class="card-img-top" src="${resource.image}" alt="Resource image">
                <div class="card-body">
                    <h5 class="card-title">${resource.institution}</h5>
                    <p class="card-text">${resource.location}</p>
                    <p class="card-text">Category: ${formatCategory(resource.category)}</p>
                    <p class="card-text">Resource Type: ${resource.resourceType}</p>
                    <p class="card-text">Posted: ${new Date(resource.postedDate).toLocaleDateString()}</p>
                    <p class="card-text">${resource.description.substring(0, 100)}...</p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${resource.id})">View More</button>
                </div>
            </div>`;
        resourceContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const resource = filteredResources.find(p => p.id === id);
    const modal = new bootstrap.Modal(document.getElementById('resourceModal'));

    document.getElementById('resourceModalLabel').innerText = resource.institution;
    document.getElementById('modalImage').src = resource.image;
    document.getElementById('modalInstitution').innerText = `Institution: ${resource.institution}`;
    document.getElementById('modalLocation').innerText = `Location: ${resource.location}`;
    document.getElementById('modalCategory').innerText = `Category: ${formatCategory(resource.category)}`;
    document.getElementById('modalResourceType').innerText = `Resource Type: ${resource.resourceType}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${new Date(resource.postedDate).toLocaleDateString()}`;
    document.getElementById('modalDescription').innerText = `Description: ${resource.description}`;

    modal.show();
}

function formatCategory(category) {
    switch (category) {
        case 'science': return 'Science';
        case 'technology': return 'Technology';
        case 'engineering': return 'Engineering';
        case 'mathematics': return 'Mathematics';
        case 'arts': return 'Arts';
        case 'humanities': return 'Humanities';
        case 'others': return 'Others';
        default: return 'Unknown';
    }
}

// Back to Top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', () => {
    displayResources();
});
