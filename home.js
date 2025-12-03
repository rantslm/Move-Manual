// Reads "savedExercises" from localStorage and shows up to 3 recent ones.

// Get the container for the "Recently Saved" cards.
const recentlySavedList = document.getElementById('recently-saved-list');

/**
* Helper: get the saved exercises array from localStorage.
* In discover.js we store an ARRAY OF EXERCISE OBJECTS under "savedExercises".
*/
  function getSavedExercises() {
    const raw = localStorage.getItem('savedExercises');
    return raw ? JSON.parse(raw) : [];
  }
/**
* Render up to 3 most recent saved exercises into the Home dashboard.
*/
function renderRecentlySaved() {
    const allSaved = getSavedExercises();

// Clear any existing/fallback content.
    recentlySavedList.innerHTML = '';

// If nothing is saved yet, show a message and exit.
    if (!allSaved.length) {
      recentlySavedList.innerHTML = `
        <div class="card-glass flex-fill">
          <p class="muted-label mb-0">
            No saved any exercises yet.
          </p>
        </div>
      `;
      return;
    }

// Take the last 3 items the user saved 
// (starts counting from the end of the array then reverses to show newest first).
    const latestThree = allSaved.slice(-3).reverse();

    latestThree.forEach((ex) => {
// Create a small summary card for each exercise.
    const card = document.createElement('article');
    card.className = 'card-glass flex-fill';

    card.innerHTML = `
    <h3 class="mb-1" style="font-size: 0.85rem;">${ex.name}</h3>
    <p class="muted-label mb-1">
    <strong>Body part:</strong> ${ex.bodyPart}
    </p>
    <p class="muted-label mb-0">
    <strong>Target:</strong> ${ex.target}
    </p>
    `;

    recentlySavedList.appendChild(card);
});
}

// Run once when the Home page loads.
renderRecentlySaved();

