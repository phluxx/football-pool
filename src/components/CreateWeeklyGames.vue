<template>
  <div class="admin-container">
    <label for="gameDate">Games To Be Played On:</label>
    <input type="date" v-model="gameDate" id="gameDate">

    <div v-for="game in games" :key="game.id" class="betting-controls">
      <select v-model="game.favorite">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>
      <select v-model="game.underdog">
        <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
      </select>
      <input type="number" v-model="game.spread" placeholder="Spread">
    </div>

    <button class="betting-button" @click="saveGames">Save</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      gameDate: "",
      teams: [],
      games: Array(15).fill({ favorite: null, underdog: null, spread: null })
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

.admin-options > a {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  display: block;
  margin: 15px 0;
  background-color: #9E1B32;
  padding: 10px 15px;
  border-radius: 5px;
  color: #FFFFFF;
  text-decoration: none;
  transition: background-color 0.3s;
}

.admin-options > a:hover {
  background-color: #7a1526;
}

.admin-options > button {
  display: block;
  margin: 15px 0;
  background-color: #9E1B32;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.3s;
}

.admin-options > button:hover {
  background-color: #7a1526;
}

.betting-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.betting-button {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  background-color: #9E1B32;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
}
</style>

