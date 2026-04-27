document.addEventListener('DOMContentLoaded', () => {
  const quotesContainer = document.getElementById('quotes-container');
  const searchInput = document.getElementById('search');
  const emptyState = document.getElementById('empty-state');
  const errorState = document.getElementById('error-state');
  
  // Modal Elements
  const modal = document.getElementById('quote-modal');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const quoteForm = document.getElementById('quote-form');

  let remoteQuotes = [];
  let localQuotes = JSON.parse(localStorage.getItem('my_quotes') || '[]');

  // Fetch quotes from the quotes.json file
  fetch('quotes.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      remoteQuotes = data;
      updateDisplay();
      displayRandomQuote();
    })
    .catch(error => {
      console.error('Error fetching quotes:', error);
      // Even if remote fails, we might have local ones
      if (localQuotes.length > 0) {
        updateDisplay();
      } else {
        quotesContainer.classList.add('hidden');
        errorState.classList.remove('hidden');
      }
    });

  // Combine remote and local data then render
  function updateDisplay() {
    const allQuotes = [...remoteQuotes, ...localQuotes];
    filterAndRender(allQuotes);
  }

  // Render the list of quotes to the DOM
  function renderQuotes(quotesToRender) {
    quotesContainer.innerHTML = '';
    
    if (quotesToRender.length === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
      
      quotesToRender.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'quote-card';
        
        // Add a 'Local' badge if it's from localStorage
        const isLocal = item.isLocal ? '<span class="category-badge" style="background: rgba(34, 197, 94, 0.1); color: #4ade80; border-color: rgba(34, 197, 94, 0.2)">Local Demo</span>' : '';

        card.innerHTML = `
          <div class="card-header">
            ${isLocal}
            <span class="class-badge">${escapeHTML(item.class)}</span>
          </div>
          <div class="card-body">
            <p class="quote-text">${escapeHTML(item.quote)}</p>
          </div>
          <div class="card-footer">
            <span class="student-name">— ${escapeHTML(item.name)}</span>
          </div>
        `;
        quotesContainer.appendChild(card);
      });
    }
  }

  // Filter based on search input
  function filterAndRender(data = [...remoteQuotes, ...localQuotes]) {
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = data.filter(item => {
      return item.name.toLowerCase().includes(searchTerm) || 
             item.class.toLowerCase().includes(searchTerm) || 
             item.quote.toLowerCase().includes(searchTerm);
    });

    renderQuotes(filtered);
  }

  // Modal Logic
  openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Handle Form Submission
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newQuote = {
      name: document.getElementById('student-name').value,
      class: document.getElementById('student-class').value,
      quote: document.getElementById('quote-text').value,
      isLocal: true // Mark to distinguish from JSON data
    };

    localQuotes.push(newQuote);
    localStorage.setItem('my_quotes', JSON.stringify(localQuotes));
    
    // UI Updates
    quoteForm.reset();
    modal.classList.add('hidden');
    updateDisplay();
  });

  searchInput.addEventListener('input', () => updateDisplay());

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Display random quote
  function displayRandomQuote() {
    const allQuotes = [...remoteQuotes, ...localQuotes];
    if (allQuotes.length === 0) return;

    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    const randomCard = document.getElementById('random-quote-card');

    randomCard.innerHTML = `
      <blockquote>${escapeHTML(randomQuote.quote)}</blockquote>
      <p class="quote-author">— ${escapeHTML(randomQuote.name)} (${escapeHTML(randomQuote.class)})</p>
    `;
  }

  document.getElementById('another-quote-btn').addEventListener('click', displayRandomQuote);
});
