<template>
  <div class="admin-container">
    <label for="gameDate">Games To Be Played On:</label>
    <input type="date" v-model="gameDate" id="gameDate" />

    <div v-for="(game, index) in games" :key="index" class="game-container">
      <label for="favorite">Favorite:</label>
      <select v-model="game.favorite">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>

      <label for="underdog">Underdog:</label>
      <select v-model="game.underdog">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>

      <label for="spread">Spread:</label>
      <input type="text" v-model="game.spread" placeholder="Spread" />
    </div>

    <button @click="saveGames" class="betting-button">Save</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      gameDate: "",
      teams: [],
      games: Array.from({ length: 15 }, () => ({ favorite: null, underdog: null, spread: null }))
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
    saveGames() {
      // Logic for saving games will be implemented later
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
