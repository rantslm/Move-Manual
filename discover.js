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
  // my RapidAPI key from ExerciseDB docs
  const API_KEY = '0e1da515dcmshe7ee7a4b14f6041p19391fjsn72a0f1a7208d';
  // Base URL for ExerciseDB via RapidAPI
  const EXERCISE_API_URL = 'https://exercisedb.p.rapidapi.com/exercises';

  const apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };
  // store fetched exercises
const allExercises = [];
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
      card.className = 'card-glass';

      card.innerHTML = `
        <h3 class="mb-1" style="font-size: 0.95rem;">${ex.name}</h3>
        <p class="muted-label mb-1"><strong>Body part:</strong> ${ex.bodyPart}</p>
        <p class="muted-label mb-1"><strong>Target:</strong> ${ex.target}</p>
        <p class="muted-label mb-0"><strong>Equipment:</strong> ${ex.equipment}</p>
      `;

      // Append the card into the results container
      resultsGrid.appendChild(card);
    });
  }

  (async function initDiscover() {
    const allExercises = await fetchExercises();
    console.log("data received:", allExercises);
  })();
}