// =========================================================
// PLAYSTATE - script.js
// Journal: click an article to expand it and read the full text
// =========================================================

const journalCards = document.querySelectorAll('.journal-card');

// Open or close one article card
function setArticleOpen(card, shouldOpen) {
    const button = card.querySelector('.journal-toggle');
    const body = card.querySelector('.article-body');

    card.classList.toggle('open', shouldOpen);
    body.classList.toggle('open', shouldOpen);

    // Keep the button accessible and update its text
    button.setAttribute('aria-expanded', shouldOpen);
    button.querySelector('.toggle-label').textContent = shouldOpen ? 'Close article' : 'Read article';
    button.querySelector('.toggle-icon').textContent = shouldOpen ? '−' : '+';
}

journalCards.forEach(function (card) {
    card.addEventListener('click', function (event) {

        // The "Close article" button at the bottom of the text
        if (event.target.closest('.article-close')) {
            setArticleOpen(card, false);
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        // Clicking inside the opened text does nothing (so you can select and copy it)
        if (event.target.closest('.article-body')) {
            return;
        }

        // Clicking anywhere else on the card (or its button) toggles it
        const isOpen = card.classList.contains('open');
        setArticleOpen(card, !isOpen);
    });
});

// The "Read article" link in the featured story opens article 1 and scrolls to it
document.querySelectorAll('[data-open-article]').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const card = document.getElementById(link.dataset.openArticle);
        if (!card) return;

        setArticleOpen(card, true);
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
