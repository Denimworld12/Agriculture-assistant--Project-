function addCrop(event) {
    event.preventDefault();
    
    // Collect form data
    const cropName = document.getElementById('crop-name').value;
    const cropDescription = document.getElementById('crop-description').value;
    const cropPrice = document.getElementById('crop-price').value;
    let cropImage = '';

    // Handle image input
    if (document.getElementById('upload-from-pc').checked) {
        cropImage = document.getElementById('crop-image-file').files[0]; // Image file
    } else {
        cropImage = document.getElementById('crop-image-url').value; // URL
    }

    // Log data for debugging
    console.log('Crop Name:', cropName);
    console.log('Crop Description:', cropDescription);
    console.log('Crop Price:', cropPrice);
    console.log('Crop Image:', cropImage);

    // Check for missing fields
    if (!cropName || !cropDescription || !cropPrice || (!cropImage && cropImage !== '')) {
        alert("Please fill all fields");
        return;
    }

    // Add Crop to the Page (just an example)
    const cropList = document.getElementById('crop-list');
    const newCropCard = document.createElement('div');
    newCropCard.classList.add('col-md-4', 'mb-4');
    newCropCard.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${cropImage instanceof File ? URL.createObjectURL(cropImage) : cropImage}" class="card-img-top" alt="${cropName}">
            <div class="card-body">
                <h5 class="card-title">${cropName}</h5>
                <p class="card-text">${cropDescription}</p>
                <p class="card-text">₹${cropPrice}</p>
                <a href="#" class="btn btn-primary">Update</a>
            </div>
        </div>
    `;
    cropList.appendChild(newCropCard);

    // Reset form after submitting
    document.getElementById('add-crop-form').reset();
}









// Toggle visibility of image inputs based on radio selection
function toggleImageInput() {
    const fileInput = document.getElementById('crop-image-file');
    const urlInput = document.getElementById('crop-image-url');

    // Show the appropriate input based on the selected radio button
    if (document.getElementById('upload-from-pc').checked) {
        fileInput.style.display = 'block';  // Show file input
        urlInput.style.display = 'none';    // Hide URL input
    } else if (document.getElementById('upload-from-url').checked) {
        fileInput.style.display = 'none';   // Hide file input
        urlInput.style.display = 'block';   // Show URL input
    }
}

// Initial toggle when the page loads
window.onload = function() {
    toggleImageInput(); // Call to set the initial visibility based on the default selection
};
