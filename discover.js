// discover.js
// Connects the Discover page to the ExerciseDB API
// and renders exercise cards into the Results section.

// DOM REFERENCES 
const searchInput = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// If this script somehow loads on the wrong page, do nothing.
if (!searchInput || !resultsGrid) {
  console.warn('discover.js: required DOM elements not found.');
}
// Only run API logic if the page has the right elements
if (searchInput && resultsGrid) {
// ----- API config -----
// Base URL for ExerciseDB (RapidAPI)
const EXERCISE_API_URL = 'https://exercisedb.p.rapidapi.com/exercises';

// TODO: replace 'YOUR_RAPIDAPI_KEY_HERE' with your actual RapidAPI key.
const apiOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_HERE',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };

  
}
