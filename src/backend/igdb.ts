import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual IGDB API key
const IGDB_API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.igdb.com/v4';

// List of game names you want to search for
const gameNames = ['The Witcher 3: Wild Hunt', 'Red Dead Redemption 2', 'Cyberpunk 2077'];

// Define the headers for the API request
const headers = {
  'Client-ID': IGDB_API_KEY,
  'Authorization': 'Bearer ' + IGDB_API_KEY,
};

// Construct the request body to search for multiple games
const requestBody = `fields name, rating; where name = ("${gameNames.join('","')}");`;

async function getGamesScores() {
  try {
    const response = await axios.post(`${BASE_URL}/games`, requestBody, { headers });

    // Map the retrieved games' data to an array of objects
    const gamesWithScores = response.data.map((game: any) => ({
      name: game.name,
      score: game.rating || 'Score not available',
    }));

    // Output the game names and scores
    gamesWithScores.forEach((game) => {
      console.log(`Game: ${game.name}, Score: ${game.score}`);
    });
  } catch (error) {
    console.error('Error fetching game data:', error.message);
  }
}

// Call the function to get the games' scores
getGamesScores();
