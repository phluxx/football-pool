<template>
  <div class="admin-container">
    <label for="gameDate">Games To Be Played On:</label>
    <input type="date" v-model="gameDate" id="gameDate" @input="checkDate" />

    <div v-for="(game, index) in games" :key="index" class="game-container">
      <label for="favorite">Favorite:</label>
      <select v-model="game.favorite">
        <option :disabled="!gameDate" v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>

      <label for="underdog">Underdog:</label>
      <select v-model="game.underdog">
        <option :disabled="!gameDate" v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>

      <input :disabled="!gameDate" type="number" step="0.5" v-model="game.spread"  @blur="enforceHalfPointSpreads(game)" placeholder="Spread" />
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
    async checkDate() {
      if (this.gameDate) {
        try {
          const response = await axios.get(`https://fbpsql.ewnix.net/api/checkdate/${this.gameDate}`);
          if (response.data.gamesExist) {
            // Populate the games array with the existing games
            this.populateGames();
          } else {
            alert("No games exist for this week! Please go to the Create Games page to create them.");
            this.gameDate = null;
          }
          } catch (error) {
              console.error("Error checking date:", error);
              alert("Error checking the date. Please try again later.");
             }
        }
      },

      async populateGames() {
        try {
          const response = await axios.get(`https://fbpsql.ewnix.net/api/populategames/${this.gameDate}`);
          if (response.data && response.data.length) {
            this.games = response.data;
          }
        } catch (error) {
          console.error("Error populating games:", error);
          alert("Error populating games. Please try again later.");
        }
      },
      
    enforceHalfPointSpreads(game) {
      let value = parseFloat(game.spread);
      if (isNaN(value)) {
        game.spread = "";
      } else if (value % 1 !== 0.5) {
        value = Math.round(value) + 0.5;
        game.spread = value;
      }
    },
    // Since I'm getting UUID errors in my console, let's figure out what's going on...
    isValidUUID(uuid) {
      const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      return regex.test(uuid)
    },

    async saveGames() {
      // Make sure the form is actually completely filled out before we attempt any save logic.
      if (!this.gameDate) {
        return alert("Please pick a date.");
      }
      for (const game of this.games) {
        if (!game.favorite || !game.underdog || !game.spread) {
          return alert("All fields must be filled out.");
        }
      }
      try {
        const teamLookup = {};
        this.teams.forEach(team => {
          teamLookup[team.id] = team;
        });
        // Generate ID and convert spread for each game
        this.games.forEach(game => {
          const favoriteTeam = teamLookup[game.favorite];
          const underdogTeam = teamLookup[game.underdog];

          if (!favoriteTeam || !underdogTeam) {
            throw new Error("Invalid team ID");
          }

          const name = favoriteTeam.team + underdogTeam.team + this.gameDate;
          const generatedUUID = uuidv5(name, NAMESPACE);

          if (!this.isValidUUID(generatedUUID)) {
            throw new Error("Invalid UUID");
          }

          game.id = generatedUUID;
          game.fav_id = favoriteTeam.id;
          game.dog_id = underdogTeam.id;
          game.spread = parseFloat(game.spread);
        });

        const payload = {
          gameDate: this.gameDate,
          games: this.games
        };

        const response = await axios.post("https://fbpsql.ewnix.net/api/savegames", payload);
        alert(response.data.status);
      } catch (error) {
        console.error("Error saving games:", error);
        alert("Error saving games. Please try again later.");
      }
    }
	  
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
