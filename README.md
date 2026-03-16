```markdown
# Move Manual

Move Manual is a front-end fitness application designed to help users discover, save, and organize personalized workout exercises. The app uses the ExerciseDB API to fetch real exercise data and provides a mobile-inspired interface for browsing workouts by body part, target muscle, equipment, and workout type.

This project was built to consolidate core front-end concepts including HTML, CSS, JavaScript, Fetch API, Bootstrap, and LocalStorage.

## Presentation

[View Project Presentation Slides](https://docs.google.com/presentation/d/1w4m668k5PgJF1JFdQjaelT-BbTABfgT6-f7S57FThBI/edit?usp=sharing)

## Project Overview

The goal of Move Manual is to help users do three things:

1. **Discover** new workout exercises  
2. **Save** exercises for later  
3. **Organize** workouts in a more personalized way  

Instead of searching through blogs, articles, TikToks, or YouTube videos, users can explore exercises in one place and narrow down results based on their needs. The application is especially useful for people who want workout guidance without needing a coach, trainer, or paid subscription.

## Problem It Solves

Many people struggle with exercise research because fitness information is scattered across too many sources. Move Manual helps solve that by creating a single interface where users can:

- browse exercises from a live API
- filter by body part, target muscle, equipment, or workout type
- search and sort results quickly
- save useful exercises into a custom routine for later review

This creates a more personalized experience since workouts are not one-size-fits-all.

## Target Audience

Move Manual is designed for adults ages 18–40 who want to stay active either at home or in the gym using simple tools to plan exercises quickly and independently.

The project was also informed by a few user-story archetypes:

- **Physical therapy / mobility user:** someone looking for exercises that target specific body parts or accommodate conditions such as scoliosis
- **Gym-focused user:** someone who cares about equipment variety, training style, and muscle targeting
- **General wellness user:** someone looking for approachable workouts without the pressure of a formal fitness program

## Features

- Fetches real exercise data from the ExerciseDB API
- Displays exercise cards with names, details, and images/placeholders
- Search functionality for quickly finding exercises
- Filtering by category such as body part, equipment, and type
- Sorting options for exercise titles and difficulty
- Save/favorites system using LocalStorage
- Separate saved workout routine page
- Overview page structure for future workout data visualization
- Responsive UI styled with Bootstrap and custom CSS

## Pages

### Home
The landing page introduces the app and provides entry into the workout discovery flow.

### Discover
This is the main page for finding new workouts. Users can:

- search exercises by text
- filter by category
- sort results
- save exercises for later

### Saved
This page stores a user’s saved exercises and acts as a simple workout routine area. Saved items persist through LocalStorage.

### Overview
This page was designed as a future analytics/dashboard space for workout summaries such as:

- exercises per muscle group
- exercises by difficulty
- workout type distribution

The page structure exists, but chart functionality is still planned for future implementation.

## Research and API Data

Move Manual uses the **ExerciseDB API** as its primary data source.

**API Documentation**
[ExerciseDB Documentation](https://edb-docs.up.railway.app/)


The API supports exercise discovery using categories such as:

- **bodyPart**  
  chest, back, shoulders, arms, legs, core, neck, hands, feet

- **target**  
  biceps, triceps, deltoids, quads, hamstrings, obliques, forearms, flexors, pronators, and more

- **difficulty**  
  beginner, intermediate, advanced

- **type**  
  cardio, mobility, olympic_weightlifting, plyometrics, powerlifting, strength, stretching

- **equipment**  
  barbell, dumbbell, kettlebell, resistance band, cable machine, treadmill, rowing machine, bench, exercise ball, and more

This API was a strong fit for the project because it is free to use and includes structured exercise data that supports filtering and organization.

## Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap**
- **Fetch API**
- **LocalStorage**
- **ExerciseDB API via RapidAPI**

## Technical Implementation

### JavaScript Concepts Used

#### Arrays
All fetched exercises are stored in an array and manipulated using methods such as:

- `.filter()`
- `.slice()`
- `.some()`
- `.push()`

Saved exercises are also stored as an array in LocalStorage.

#### Objects
Each exercise is handled as an object with properties such as:

- `id`
- `name`
- `bodyPart`
- `target`
- `equipment`

Saved exercises are stored as full objects so the app can render exercise details later without re-fetching data.

#### Functions
Examples of core application functions include:

- `fetchExercises()` — fetches data from the API
- `renderExercises()` — creates exercise cards dynamically
- `applySearchFilter()` — handles combined filtering and search logic
- `saveExercise()` / `getSavedExercises()` — handles LocalStorage persistence
- `initDiscover()` — initializes the Discover page

#### DOM Manipulation
The app dynamically renders content using:

- `document.createElement()`
- `innerHTML`
- `appendChild()`

#### Event Handling
The project uses event listeners such as:

- `input` for live search
- `click` for save buttons and interactive controls

#### Async/Await
Used with `fetch()` to manage API requests cleanly and improve readability.

#### LocalStorage
Used to persist saved exercises between browser sessions.

#### Event Delegation
Used for dynamically created elements such as bookmark/save buttons.

## HTML Structure

The project uses semantic HTML throughout, including:

- `<header>` for branding and navigation
- `<nav>` for app navigation
- `<main>` for page content
- `<section>` for grouped content areas
- `<article>` for exercise cards
- `<footer>` for persistent bottom navigation

Interactive and media elements include:

- `<input type="text">` for the search bar
- `<button>` for save/bookmark actions
- `<a>` for navigation links
- `<img>` for exercise thumbnails/placeholders

## CSS and UI Design

The visual design was intentionally styled to feel like a modern mobile fitness app.

### Design features include:

- custom multi-color gradients
- glassmorphism card styling using `backdrop-filter`
- flexbox layouts for alignment and spacing
- box shadows for layered card depth
- rounded corners across cards, buttons, and controls
- fixed header and footer for mobile-app feel
- responsive layout using Bootstrap grid and media queries
- custom styling for search and filter controls

### Bootstrap was used for:

- responsive grid layout
- spacing utilities
- buttons
- form controls
- fast mobile-first styling structure

## Design Process

The project design was planned in Figma before implementation. The app layout focused on a phone-style interface with an emphasis on simplicity, discoverability, and a clean visual hierarchy.

**Figma Design:**  
[View Figma Design](https://www.figma.com/design/oi2QKvPfvrRn9v76wpUuDF/miniproject1?node-id=0-1&p=f&t=PqKOJRig0R0gRdWz-0)

## Business / Product Value

Move Manual was designed not just as a coding exercise, but as a product concept with room for growth.

Potential value includes:

- reducing search time for users looking for workouts
- increasing engagement through saved/favorited exercises
- encouraging habit-forming behavior through personalization
- creating a foundation for future progress tracking and workout recommendations

Longer-term expansion ideas could include:

- trainer profiles
- wearable integrations such as smart watches
- gym partnerships
- QR-linked equipment workouts
- recommended routines based on saved exercises

## Feedback

Strengths highlighted in feedback included:

- strong use of semantic HTML
- polished and visually distinctive UI
- effective Bootstrap integration
- robust combined search and filtering logic
- well-organized and well-commented JavaScript
- efficient LocalStorage implementation using full exercise objects
- strong project planning through README, Figma, and presentation materials

Particular praise was given to the `applySearchFilter()` logic and the full “Favorites” workflow.

## Challenges

One of the main implementation challenges involved exercise images.

Originally, the project was intended to use the ExerciseDB GIF/image endpoint directly. However, the image API applies a strict cross-origin policy, so browsers block those assets when requested directly from the client in this front-end-only setup.

To keep the project fully front-end and still use ExerciseDB, the application fetches exercise data from the API and uses a local placeholder image for cards instead of the live exercise GIFs.

## Future Improvements

The following are planned or recommended future improvements:

- implement the Overview page charts using a library such as Chart.js
- replace placeholder images with API GIFs through a backend proxy
- add exercise detail pages
- improve title formatting, including uppercase/title consistency
- expand sorting and filtering options
- add smoother transitions and animations
- improve fallback image handling
- hide API keys behind a backend service for better security
- add more advanced workout organization and routine-building features

## Reflection

This project helped strengthen my understanding of:

- building multi-page front-end applications
- working with third-party APIs
- structuring JavaScript into reusable functions
- managing persistent state with LocalStorage
- combining search, filtering, sorting, and save interactions in a single app
- designing a more product-focused experience rather than just a static webpage

It also gave me more practice thinking about both user needs and technical tradeoffs during implementation.

## Repository Notes

This public repository is a portfolio version of the project and preserves the development history of the original work.

## Setup Instructions

1. Clone the repository
2. Open the project folder
3. Run the project using Live Server or another local development server
4. Use the Discover page to browse, search, filter, and save exercises
