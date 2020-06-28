const quoteContainer = document.querySelector('#quote-container');
const quoteMessageSpan = document.querySelector('#quote');
const quoteAuthorSpan = document.querySelector('#author');
const newQuoteBtn = document.querySelector('.new-quote');
const twitterBtn = document.querySelector('.twitter-button');
const loader = document.querySelector('#loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            quoteAuthorSpan.innerText = 'Unknown';
        } else {
            quoteAuthorSpan.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 50) {
            quoteMessageSpan.classList.add('long-quote');
        } else {
            quoteMessageSpan.classList.remove('long-quote');
        }
        quoteMessageSpan.innerText = data.quoteText;
        // Stop Loader & Show Quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteMessageSpan.innerText;
    const author = quoteAuthorSpan.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();