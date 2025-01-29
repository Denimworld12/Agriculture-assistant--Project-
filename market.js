// price range
          document.getElementById('priceRange').oninput = function () {
                      document.getElementById('priceRangeValue').innerText = 'Price: ₹' + this.value + ' - ₹10000';
          };

const btn = document.querySelector("[search_data]");
const cards = document.querySelectorAll(".card");
const heading = document.querySelectorAll(".product_header");

let data_map = [];
let headerList = new Set(); // Store the headers that should be shown

// Extracting title and description from each card
for (let card of cards) {
    let title = card.querySelector(".card-title")?.textContent.trim();
    let description = card.querySelector(".card-body p.card-text:last-of-type")?.textContent.trim();
    data_map.push({ title, description, element: card });
}

console.log("Extracted Data:", data_map); // Check extracted data

// Event listener for search input
btn.addEventListener("input", (e) => {
    const input_data = e.target.value.toLowerCase();
    console.log("Search Input:", input_data);

    // Clear the headerList to only show relevant headers
    headerList.clear();

    data_map.forEach(({ title, description, element }) => {
        const section = element.closest('.product_header'); // Find the closest section of the card
        const head = section?.querySelector('.product_header'); // Find the header in that section

        if (title.toLowerCase().includes(input_data) || description.toLowerCase().includes(input_data)) {
            element.style.display = "block"; // Show matching cards
            if (head) headerList.add(head); // Add the section's header to the list if any card is visible
        } else {
            element.style.display = "none"; // Hide non-matching cards
        }
    });

    // Loop through all headers and toggle visibility based on headerList
    heading.forEach(header => {
        if (headerList.has(header)) {
            header.style.display = "block"; // Show header if at least one card in the section is visible
        } else {
            header.style.display = "none"; // Hide header if no cards are visible in the section
        }
    });
});

const formcheck = document.querySelectorAll(".form-check-input")
let form_id = new Set();
// form checking in the code

// formcheck.forEach(form=>{
//    form.addEventListener('change', ()=>{
//     let data = form.querySelector('.form-check-label')?.innerText.trim();
//     console.log(data);
//     if (!data) {
//         console.log("Label text not found");
//         return;
//     } // Ensure this prints expected output
//    })
// })


document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        let selectedCategories = Array.from(document.querySelectorAll(".form-check-input:checked"))
            .map((input) => input.value.toLowerCase());

        let allContainers = document.querySelectorAll(".product-category");

        if (selectedCategories.length === 0) {
            allContainers.forEach((container) => (container.style.display = "block"));
        } else {
            allContainers.forEach((container) => {
                let containerId = container.id.toLowerCase();
                if (selectedCategories.includes(containerId)) {
                    container.style.display = "block";
                } else {
                    container.style.display = "none";
                }
            });
        }
    });
});



// for the clear the filtes
document.getElementById('clearFilters').addEventListener('click', function () {
    // Reset all filters
    document.getElementById('priceRange').value = 0;
    document.getElementById('ratingFilter').value = 'all';
    // Reset checkbox selections
    document.querySelectorAll('.form-check-input').forEach(input => input.checked = false);
  });
 