<template>
  <div class="admin-container">
    <label for="gameDate">Games To Be Played On:</label>
    <input type="date" v-model="gameDate" id="gameDate" />

    <div v-for="(game, index) in games" :key="index" class="game-container">
      <label for="favorite">Favorite:</label>
      <select v-model="game.favorite" @change="alertTeamSelected(game.favorite, 'Favorite')">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>

      <label for="underdog">Underdog:</label>
      <select v-model="game.underdog" @change="alertTeamSelected(game.underdog, 'Underdog')">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>

      <input type="text" v-model="game.spread" placeholder="Spread" />
    </div>

    <button @click="saveGames" class="betting-button">Save</button>
    
  </div>
</template>

<script>
import axios from "axios";
import { v5 as uuidv5 } from 'uuid';

const NAMESPACE = '656d427b-64a7-42e2-aa72-62068d61b85d';

export default {
  data() {
    return {
      gameDate: "",
      teams: [],
      games: Array.from({ length: 15 }, () => ({ favorite: null, underdog: null, spread: null })),
      saveMessage: "",  // For displaying a success/error message
    };
  },
  created() {
    this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get("https://fbpsql.ewnix.net/api/populateteams");
        this.teams = response.data;
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
    // Since I'm getting UUID errors in my console, let's figure out what's going on...
    isValidUUID(uuid) {
      const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      return regex.test(uuid)
    },
    // Debugging
    alertTeamSelected(teamId, type) {
      alert('${type} selected with ID: ${teamId}');
    },
    async saveGames() {
      try {
        // Generate ID and convert spread for each game
        this.games.forEach(game => {
	  const favoriteTeam = this.teams.find(team => team.id === game.favorite);
	  const underdogTeam = this.teams.find(team => team.id === game.underdog);

	  if (!favoriteTeam || !underdogTeam) {
	      throw new Error('Could not find team details.');
	  }

	  const baseName = favoriteTeam.team + underdogTeam.team + this.gameDate;
	  const baseUUID = uuidv5(baseName, NAMESPACE);
	  
	  // Let's make them unique...
	  const uniqueSuffix = Date.now().toString() + Math.random().toString;
	  const finalName = baseUUID + uniqueSuffix;

	  const finalUUID = uuidv5(finalName, NAMESPACE);

	  // Let's validate each game's UUID before we continue..
          if (!this.isValidUUID(finalUUID)) {
            throw new Error(`Invalid UUID generated for game: ${game.favorite} vs ${game.underdog} on ${this.gameDate}`);
          }
          game.id = finalUUID;
	  game.fav_id = favoriteTeam.id;
	  game.dog_id = underdogTeam.id;
	  game.spread = parseFloat(game.spread); 
        });

        const payload = {
          gameDate: this.gameDate,
          games: this.games
        };

        const response = await axios.post("https://fbpsql.ewnix.net/api/savegames", payload);

        // Display the response from the server
        alert(response.data.message);

      } catch (error) {
        console.error("Error saving games:", error);
        alert("Error saving games. Please try again later.");
      }
    }
  }
};
</script>


<style scoped>
.admin-container {
  background-color: rgba(142, 138, 143, 0.1);
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  margin: 40px auto;
  text-align: center;
}

.betting-button {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  background-color: #9E1B32;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.betting-button:hover {
  background-color: #7a1526;
}

.game-container {
  background-color: rgba(142, 138, 143, 0.2);
  border-radius: 8px;
  padding: 10px;
  margin: 15px 0;
}

label {
  display: inline-block;
  margin-right: 10px;
}
</style>
