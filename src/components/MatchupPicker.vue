<template>
  <div>
    <h2>Pick 'em for the week of Saturday, {{ nextSaturday }}</h2>

    <div v-for="(game, index) in games" :key="game.id" class="game-container">
      <h3>Game {{ index + 1 }}</h3>
      <div>
        <img :src="getLogoURL(game.fav_id)" alt="Favorite Team Logo" class="team-logo">
        <span>Favorite:</span>
        {{ getTeamName(game.fav_id) }}
        <input type="radio" v-model="picks[game.id]" :value="game.fav_id">
      </div>

      <span class="spread">Spread: {{ game.spread }}</span>

      <div>
        <img :src="getLogoURL(game.dog_id)" alt="Underdog Team Logo" class="team-logo">
        <span>Underdog:</span>
        {{ getTeamName(game.dog_id) }}
        <input type="radio" v-model="picks[game.id]" :value="game.dog_id">
      </div>
    </div>

    <button @click="savePicks">Save Picks</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      games: [],
      teams: [],
      picks: {},
      nextSaturday: this.findNextSaturday()
    };
  },
  created() {
    this.fetchTeams();
    this.fetchGames();
  },
  methods: {
    findNextSaturday() {
      let date = new Date();
      const today = date.getDay();

      // If today is Saturday, return today's date
      if (today === 6) {
        return date.toISOString().split('T')[0];
      }

      // If today is Sunday, return yesterday's date
      if (today === 0) {
        date.setDate(date.getDate() -1);
        return date.toISOString().split('T')[0];
      }

      // Otherwise, find the next Saturday
      while (date.getDay() !== 6) {
        date.setDate(date.getDate() + 1);
      }
      return date.toISOString().split('T')[0];
    },
    async fetchGames() {
      try {
        const response = await axios.get(`https://fbpsql.ewnix.net/api/matchmaker/${this.nextSaturday}`);
        this.games = response.data;
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
    async fetchTeams() {
      // Same fetchTeams method as before...
    },
    getLogoURL(uuid) {
      const hexUUID = uuid.replace(/-/g, "");
      return `https://sjc1.vultrobjects.com/football-pool/logos/${hexUUID}/logo.png`;
    },
    getTeamName(uuid) {
      const team = this.teams.find(t => t.id === uuid);
      return team ? team.team : '';
    },
    async savePicks() {
      // TODO: Write logic to save users' picks.
    }
  }
};
</script>

<style scoped>
body {
  background-color: #828A8F;
  font-family: 'Roboto', sans-serif;
  color: #FFFFFF;
}

div {
  margin: 10px 0;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.game-container {
  background-color: rgba(255, 255, 255, 0.1); 
  border: 1px solid #9E1B32;
  border-radius: 15px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  text-align: center;
  margin-bottom: 10px;
}

.team-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%; 
  margin-right: 10px;
}

.spread {
  font-weight: bold;
  font-size: 1.2em;
  background-color: #9E1B32;
  padding: 5px 10px;
  border-radius: 5px;
}

button {
  background-color: #9E1B32;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #7a1526; 
}
</style>



