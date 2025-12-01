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
  // Base URL for ExerciseDB via RapidAPI
  const EXERCISE_API_URL = 'https://exercisedb.p.rapidapi.com/exercises';

  // TODO: replace 'YOUR_RAPIDAPI_KEY_HERE' with your actual RapidAPI key.
  const apiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_HERE',
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

  /* Initial boot function for the Discover page. */
  
  (async function initDiscover() {
    const allExercises = await fetchExercises();
    console.log('Sample exercises:', allExercises.slice(0, 3));
  })();
}
