// script.js

// Array to store quotes
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text} - <strong>(${quotes[randomIndex].category})</strong></p>`;
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote dynamically
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
    
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both quote and category!");
        return;
    }
    
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
}
// Initial random quote display
showRandomQuote();

function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    
    const inputQuote = document.createElement("input");
    inputQuote.setAttribute("id", "newQuoteText");
    inputQuote.setAttribute("type", "text");
    inputQuote.setAttribute("placeholder", "Enter a new quote");
    
    const inputCategory = document.createElement("input");
    inputCategory.setAttribute("id", "newQuoteCategory");
    inputCategory.setAttribute("type", "text");
    inputCategory.setAttribute("placeholder", "Enter quote category");
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);
    
    formContainer.appendChild(inputQuote);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);
    
    document.body.appendChild(formContainer);
}

// Call the function to create the form when the page loads
createAddQuoteForm();

// script.js

// Load quotes from local storage or use default array
const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories(); // Update categories in dropdown
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${selectedQuote.text} - <strong>(${selectedQuote.category})</strong></p>`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(selectedQuote));
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote dynamically
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
    
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both quote and category!");
        return;
    }
    
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
}

// Function to export quotes to JSON file
function exportToJSON() {
    const jsonData = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = url;
    downloadAnchor.download = "quotes.json";
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    
    URL.revokeObjectURL(url);
}

document.getElementById("exportQuotes").addEventListener("click", exportToJSON);

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories dynamically in the dropdown
function populateCategories() {
    const categorySelect = document.getElementById("categoryFilter");
    categorySelect.innerHTML = "<option value=''>All Categories</option>";
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    // Restore last selected category
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
        categorySelect.value = lastSelectedCategory;
        filterQuotes();
    }
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    const quoteDisplay = document.getElementById("quoteDisplay");
    const filteredQuotes = selectedCategory ? quotes.filter(q => q.category === selectedCategory) : quotes;
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
    } else {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const selectedQuote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${selectedQuote.text} - <strong>(${selectedQuote.category})</strong></p>`;
    }
}

document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// Check for last viewed quote and display it
const lastViewedQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
if (lastViewedQuote) {
    document.getElementById("quoteDisplay").innerHTML = `<p>${lastViewedQuote.text} - <strong>(${lastViewedQuote.category})</strong></p>`;
} else {
    showRandomQuote();
}

// Initialize categories on page load
populateCategories();


