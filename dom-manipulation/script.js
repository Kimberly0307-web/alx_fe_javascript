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
    quoteDisplay.textContent = `${quotes[randomIndex].text} - (${quotes[randomIndex].category})`;
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
