function toggleAddCropForm() {
    const form = document.getElementById('add-crop-form');
    form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
}

function addCrop(event) {
    event.preventDefault();
    const cropName = document.getElementById('crop-name').value;
    const cropImageInput = document.getElementById('crop-image');
    const cropPrice = document.getElementById('crop-price').value;
    const cropImage = cropImageInput.files[0];

    if (cropImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const cropList = document.getElementById('crop-list');
            const cropItem = document.createElement('div');
            cropItem.className = 'crop-item';
            cropItem.setAttribute('data-crop-name', cropName);

            cropItem.innerHTML = `
                <img src="${e.target.result}" alt="${cropName}">
                <p>${cropName}</p>
                <p>$${cropPrice}</p>
            `;

            cropList.appendChild(cropItem);
        };
        reader.readAsDataURL(cropImage);
    }

    document.getElementById('add-crop-form').reset();
    toggleAddCropForm();
}

function filterCrops() {
    const searchBox = document.getElementById('search-box');
    const filter = searchBox.value.toLowerCase();
    const cropItems = document.querySelectorAll('.crop-item');

    cropItems.forEach(item => {
        const cropName = item.getAttribute('data-crop-name').toLowerCase();
        if (cropName.includes(filter)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
