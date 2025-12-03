// discover.js
// Connects the Discover page to the ExerciseDB API

//  DOM REFERENCES 
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// If this script somehow loads on the wrong page, do nothing.
if (!searchInput || !resultsGrid) {
  console.warn('discover.js: required DOM elements not found.');
} else {

  //  API config 
  const API_KEY = '0e1da515dcmshe7ee7a4b14f6041p19391fjsn72a0f1a7208d'; 
  const EXERCISE_API_URL = 'https://exercisedb.p.rapidapi.com/exercises';
  // keep all fetched exercises in memory so we can look them up when saving
  let allExercises = [];


  // options for fetch() with RapidAPI headers
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
    });
  }

  // initial load
  (async function initDiscover() {
    console.log('Fetching exercise data...');
    const exercises = await fetchExercises();

    allExercises = exercises; 

    console.log('Sample data:', exercises.slice(0, 3));

    // Render first 20 for now
    renderExercises(exercises.slice(0, 20));
  })();
}
