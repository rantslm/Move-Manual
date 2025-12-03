// discover.js
// Connects the Discover page to the ExerciseDB API and renders exercise cards.
//config
//fetchExercises()
// renderExercises()
// applySearchFilter()
// search listener
// getSavedExercises()
// saveExercise()

//  DOM REFERENCES 
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// If this script somehow loads on the wrong page, do nothing.
if (!searchInput || !resultsGrid) {
  console.warn('discover.js: required DOM elements not found.');
} else {

  //  API CONFIG 
  // RapidAPI key (wouldnt usually put here but its a class project so oh well)
  const API_KEY = '0e1da515dcmshe7ee7a4b14f6041p19391fjsn72a0f1a7208d';

  // Base URL for ExerciseDB via RapidAPI
  const EXERCISE_API_URL = 'https://exercisedb.p.rapidapi.com/exercises';

  // Optional: keep all fetched exercises in memory in case we want to use later
  let allExercises = [];
  //hold the list after search/filter is applied
  let filteredExercises = [];
  // Options for fetch() with RapidAPI headers
  const apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };

  /**
   * Fetches all exercises from ExerciseDB.
   * @returns {Promise<Array>} Array of exercise objects (or [] on error)
   */
  async function fetchExercises() {
    try {
      const response = await fetch(EXERCISE_API_URL, apiOptions);

      if (!response.ok) {
        // Log extra detail to help debugging if something goes wrong
        const text = await response.text();
        console.error('HTTP error', response.status, text);
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log('ExerciseDB fetched:', data.length, 'items');
      return data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
  }

  /**
   * Renders a list of exercises into the Results section.
   * Uses .card-glass and .muted-label styles from your CSS.
   * @param {Array<Object>} list - array of exercise objects from ExerciseDB
   */
  function renderExercises(list) {
    // Clear whatever is currently in the grid
    resultsGrid.innerHTML = '';

    // If nothing to show, display a friendly message
    if (!list.length) {
      resultsGrid.innerHTML =
        '<p class="muted-label text-center">No exercises found.</p>';
      return;
    }

    // Create a card for each exercise 
    list.forEach((ex) => {
      const card = document.createElement('article');
      card.className = 'card-glass exercise-card';

      // LOCAL placeholder image to avoid CORS issues
      const imageUrl = 'assets/placeholder-exercise.png';

      // Build the inner markup for the card
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
          class="bookmark-btn btn btn-outline-light btn-sm mt-2"
          data-id="${ex.id}"
          aria-label="Save exercise"
        >
          ★ Save
        </button>
      `;

      // Append the card into the results container
      resultsGrid.appendChild(card);

      // Attach a click handler to THIS card's save button
      const saveBtn = card.querySelector('.bookmark-btn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          // Save the full exercise object to localStorage
          saveExercise(ex);

          // Tiny visual feedback so user knows it worked
          saveBtn.textContent = '✓ Saved';
          saveBtn.disabled = true;
        });
      }
    });
  }
/**
* Applies a text search to allExercises and updates the UI.
* Matches on name, bodyPart, and target.
* @param {string} query
*/
function applySearchFilter(query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    // If the search is empty, show everything
    filteredExercises = allExercises;
  } else {
    filteredExercises = allExercises.filter((ex) => {
      return (
        ex.name.toLowerCase().includes(q) ||
        ex.bodyPart.toLowerCase().includes(q) ||
        ex.target.toLowerCase().includes(q)
      );
    });
  }

// For now, still only render the first 20 to keep things lightweight
    renderExercises(filteredExercises.slice(0, 20));
  }
// search bar even listener
// When the user types in the search bar, update displayed exercises
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  applySearchFilter(query);   // Re-runs filtering + re-renders list
});

  //SAVE / LOAD HELPERS (localStorage)
/**
  * Reads saved exercises from localStorage.
  * We store the FULL exercise objects here so the Saved page
  * can render name, bodyPart, target, equipment, etc.
  * @returns {Array<Object>}
  */
  function getSavedExercises() {
    const raw = localStorage.getItem('savedExercises');
    return raw ? JSON.parse(raw) : [];
  }

  /**
   * Saves a new exercise object to localStorage.
   * Avoids duplicates by checking id.
   * @param {Object} exercise
   */
  function saveExercise(exercise) {
    const current = getSavedExercises();

    // If this id is already in the list, do nothing
    if (current.some((item) => item.id === exercise.id)) {
      return;
    }

    // Otherwise, add it and write back to localStorage
    current.push(exercise);
    localStorage.setItem('savedExercises', JSON.stringify(current));
  }

  //INITIAL LOAD OF DISCOVER PAGE
(async function initDiscover() {
  console.log('Fetching exercise data...');
  const exercises = await fetchExercises();

  // Keep the full list around for future filters/search
  allExercises = exercises;
  filteredExercises = exercises;

  console.log('Sample data:', exercises.slice(0, 3));

  // Initial render: no search yet, so pass an empty query
  applySearchFilter('');
})();
}