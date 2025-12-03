// Reads saved exercises from localStorage and renders them on the Saved page.

// Grab the container where we'll render saved exercises
const savedGrid = document.getElementById('saved-grid');

// If someone somehow loads this script on the wrong page, bail gracefully
if (!savedGrid) {
  console.warn('saved.js: #saved-grid not found on this page.');
} else {

/**
* Get the saved exercises array from localStorage.
* These are full exercise objects, saved by discover.js.
* @returns {Array<Object>}
*/
  function getSavedExercises() {
    const raw = localStorage.getItem('savedExercises');
    return raw ? JSON.parse(raw) : [];
  }

/**
* Save the updated list of exercises back to localStorage.
* @param {Array<Object>} list
*/
  function setSavedExercises(list) {
    localStorage.setItem('savedExercises', JSON.stringify(list));
  }

/**
* Remove one exercise by id from the saved list.
* @param {string} exerciseId
*/
  function removeSaved(exerciseId) {
    const current = getSavedExercises();
    const updated = current.filter((ex) => ex.id !== exerciseId);
    setSavedExercises(updated);
    renderSaved(updated); // re-render after removing
  }

/**
* Render a list of saved exercises into the #saved-grid container.
* @param {Array<Object>} list
*/
  function renderSaved(list) {
    // Clear out whatever is there now
    savedGrid.innerHTML = '';

    // If nothing is saved yet, show a friendly message
    if (!list.length) {
      savedGrid.innerHTML =
        '<p class="muted-label text-center">No saved exercises yet. Save some from the Discover page!</p>';
      return;
    }

// Build a card for each saved exercise
    list.forEach((ex) => {
      const card = document.createElement('article');
      card.className = 'card-glass exercise-card';

// You can reuse the placeholder image or skip images here
      const imageUrl = 'assets/placeholder-exercise.png';

      card.innerHTML = `
        <div class="exercise-card__image-wrapper mb-2">
          <img
            src="${imageUrl}"
            alt="${ex.name}"
            class="exercise-card__image"
            loading="lazy"
          />
        </div>
        <h3 class="mb-1" style="font-size: 0.95rem;">${ex.name}</h3>
        <p class="muted-label mb-1"><strong>Body part:</strong> ${ex.bodyPart}</p>
        <p class="muted-label mb-1"><strong>Target:</strong> ${ex.target}</p>
        <p class="muted-label mb-0"><strong>Equipment:</strong> ${ex.equipment}</p>

        <button
          class="btn btn-sm btn-danger mt-2 remove-btn"
          data-id="${ex.id}"
        >
          Remove
        </button>
      `;

      savedGrid.appendChild(card);
    });

// Attach remove button handlers after cards are added
    const removeButtons = savedGrid.querySelectorAll('.remove-btn');
    removeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        removeSaved(id);
      });
    });
  }


// On page load, get the saved list and render it
  const savedList = getSavedExercises();
  renderSaved(savedList);
}
