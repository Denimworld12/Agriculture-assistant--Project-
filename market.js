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
            element.style.display = "flex"; // Show matching cards 
            // if (head) headerList.add(head); // Add the section's header to the list if any card is visible 
        } else { 
            element.style.display = "none"; // Hide non-matching cards 
        } 
    });

    // // Loop through all headers and toggle visibility based on headerList 
    // heading.forEach(header => { 
    //     if (headerList.has(header)) { 
    //         header.style.display = "flex"; // Show header if at least one card in the section is visible 
    //     } else { 
    //         header.style.display = "none"; // Hide header if no cards are visible in the section 
    //     } 
    // });
});

// Price range filtering
document.getElementById('priceRange').addEventListener('input', function () {
    const priceValue = this.value;
    const priceText = 'Price: ₹' + priceValue + ' - ₹10000';
    document.getElementById('priceRangeValue').innerText = priceText;

    // Filter products based on price range
    document.querySelectorAll('.product-category').forEach(category => {
        category.querySelectorAll('.card').forEach(card => {
            const priceText = card.querySelector('.card-text').textContent;
            const price = parseInt(priceText.split(' ')[1].replace(',', ''), 10);

            if (price <= priceValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Clear all filters
// Clear all filters
document.getElementById('clearFilters').addEventListener('click', function () { 
    // Reset all filters
    document.getElementById('priceRange').value = 10000; 
    document.getElementById('priceRangeValue').innerText = 'Price: ₹10000 - ₹10000'; // Reset price text
    document.getElementById('ratingFilter').value = 'all'; // Reset the rating dropdown to 'all'

    document.querySelectorAll('.form-check-input').forEach(input => input.checked = false); 

    // Reset the displayed content for categories and ratings
    document.querySelectorAll('.product-category').forEach(container => {
        container.style.display = "flex"; // Show all categories
        container.querySelectorAll('.card').forEach(card => {
            card.style.display = "block"; // Show all cards
        });
    });

    // Reset the rating display for all cards
    let select = document.querySelector('.form-select');
    let card_rate = document.querySelectorAll('.card');
    card_rate.forEach(card => {
        card.style.display = 'flex'; // Show all cards on reset
    });
});

//this is for filrering the product catagory 
let categories = document.querySelectorAll(".product-category");
let forms = document.querySelectorAll(".form-check-input");

let arr = [];

forms.forEach(form => {
    form.addEventListener('change', add_category);
});

function add_category() {
    arr = []; 

    // Collect selected categories from checked checkboxes
    forms.forEach(form => {
        if (form.checked) {
            let label = form.nextElementSibling; 
            if (label && label.classList.contains("form-check-label")) {
                arr.push(label.innerText.trim());
            }
        }
    });

    console.log("Selected Categories:", arr);

    // If no checkbox is checked, show all categories
    if (arr.length === 0) {
        document.querySelectorAll(".product-category").forEach(element => {
            element.style.display = "flex"; // Show all categories
        });
        return;
    }

    // Show only selected categories, hide others
    document.querySelectorAll(".product-category").forEach(category => {
        if (arr.includes(category.id)) {
            category.style.display = "flex"; // Show selected categories
        } else {
            category.style.display = "none"; // Hide unselected categories
        }
    });
}




// now starting with working on the starts 
let opt = document.querySelectorAll('option');
let select = document.querySelector('.form-select');
let card_rate = document.querySelectorAll('.card');

select.addEventListener('change', function() {
    let val = select.value;
    console.log(val);
   
    card_rate.forEach(card => { 
        let rate = card.querySelector(".rate"); // Get the rate element in the card
        if (!rate) return; // Skip if there's no .rate in the card
        
        let text = rate.innerText;
        let total = 0; 

        // Show all cards if 'all' is selected
        if (val === 'all') {
            card.style.display = 'flex'; 
            return; 
        }

        // Count the number of stars in the rating
        for (let i = 0; i < text.length; i++) {
            let ch = text[i];
            if (ch === '⭐') {
                total++; // Increase count for each star
            }
        }

        console.log('Total stars:', total);

        // If the total number of stars in the card matches or exceeds the selected value
        if (val <= total) {
            card.style.display = 'flex'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card if it doesn't match the selected value
        }
    });
});

