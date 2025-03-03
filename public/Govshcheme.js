let params = new URLSearchParams(window.location.search);
let query = params.get("q") || "agriculture"; // Get 'q' parameter
let pageno = parseInt(params.get("pageno")) || 1; // Ensure pageno defaults to 1
console.log(query, pageno);

let number_news = 30; // Set page size
let totalpages;
let content = document.querySelector('.content');
let pre = document.querySelector('#pre');
let next = document.querySelector('#next');

const fetch_news = async (query, pageno) => {
    try {
        let response = await fetch(`/main/news/api?q=${query}&pageno=${pageno}&apiKey=4cf5fbfebd1d46078404320528628a3f&pageSize=${number_news}&pageno=${pageno}`);
        let r = await response.json();
        console.log(r)
        if (!r.articles || r.articles.length === 0) {
            content.innerHTML = `<p class="text-center">No news found for "${query}".</p>`;
            return;
        }

        totalpages = Math.ceil(r.totalResults / number_news);
        
        // Update pagination links
        pre.parentElement.classList.toggle("disabled", pageno <= 1);
        next.parentElement.classList.toggle("disabled", pageno >= totalpages);

        let str = "";
        for (let item of r.articles) {
            str += `
                <div class="card shadow-sm" style="width: 18rem; margin: 3px;">
                    <img src="${item.urlToImage || 'placeholder.jpg'}" class="card-img-top" alt="News Image" style="height: 150px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description || "No description available."}</p>
                        <div class="d-flex justify-content-center">
                            <a target="_blank" href="${item.url}" class="btn btn-success">Read more...</a>
                        </div>
                    </div>
                </div>`;
        }

        content.innerHTML = str;
    } catch (error) {
        console.error("Error fetching news:", error);
        content.innerHTML = `<p class="text-center text-danger">Failed to load news. Please try again later.</p>`;
    }
};

pre.addEventListener("click", (e) => {
    e.preventDefault();
    if (pageno > 1) {
        const newPage = pageno - 1;
        history.pushState(null, "", `?q=${query}&pageno=${newPage}`);
        fetch_news(query, newPage); // Fetch new data
    }
});

next.addEventListener("click", (e) => {
    e.preventDefault();
    if (pageno < totalpages) {
        const newPage = pageno + 1;
        history.pushState(null, "", `?q=${query}&pageno=${newPage}`);
        fetch_news(query, newPage); // Fetch new data
    }
});
// Call the function
fetch_news(query, pageno);
