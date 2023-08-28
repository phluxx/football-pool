<template>
  <div>
    <h2>Pick 'em for the week of Saturday, {{ nextSaturday }}</h2>
    <div class="container">
    <table v-for="(game, index) in games" :key="game.id" class="game-container">
      <thead>
        <tr>
          <th colspan="3">
            <h3>Game {{ index + 1 }}</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Favorite Team -->
          <td class="team-selection" :class="{'team-selected': picks[game.id] === game.favorite}" @click="selectTeam(game.id, game.favorite)">
            <img :src="getLogoURL(game.favorite)" alt="Favorite Team Logo" class="team-logo">
            <div>{{ getTeamName(game.favorite) }}</div>
          </td>
          
          <!-- Spread -->
          <td class="spread">-{{ game.spread }}</td>
          
          <!-- Underdog Team -->
          <td class="team-selection" :class="{'team-selected': picks[game.id] === game.underdog}" @click="selectTeam(game.id, game.underdog)">
            <img :src="getLogoURL(game.underdog)" alt="Underdog Team Logo" class="team-logo">
            <div>{{ getTeamName(game.underdog) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="tiebreaker">
      <label>{{ tiebreakerQuestion }}</label>
      <input type="text" v-model="tiebreakerAnswer" @input="formatTiebreakerInput" maxlength="5">
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
    this.fetchTiebreaker();
  },
  methods: {
    findNextSaturday() {
      let date = new Date();
      const today = date.getDay();
      const currentDateIso = date.toISOString().split('T')[0];

      // Since the season doesn't start until 9/2, let's start with that date.
      if (currentDateIso < '2023-09-02') {
        return '2023-09-02';
      }

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
    async fetchTeams() {
      try {
        const response = await axios.get("https://fbpsql.ewnix.net/api/populateteams");
        this.teams = response.data;
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    },
    async fetchGames() {
      try {
        const response = await axios.get(`https://fbpsql.ewnix.net/api/matchmaker/${this.nextSaturday}`);
        this.games = response.data;
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
    getLogoURL(uuid) {
      return `https://sjc1.vultrobjects.com/football-pool/logos2/${uuid}/logo.png`;
    },
    getTeamName(uuid) {
      const team = this.teams.find(t => t.id === uuid);
      return team ? team.team : '';
    },
    selectTeam(gameId, teamId) {
      this.picks[gameId] = teamId;
    },
    async savePicks() {
      try {
        await axios.post("https://fbpsql.ewnix.net/api/savepicks", { picks: this.picks });
        await axios.port("https://fbpsql.ewnix.net/api/saveusertiebreaker", { tiebreaker: this.tiebreakerAnswer });
      alert("Picks saved!");
      } catch (error) {
        console.error("Error saving picks:", error);
        alert("Error saving picks!");
      }
    },
    async fetchTiebreaker() {
      try {
        const response = await axios.get(`https://fbpsql.ewnix.net/api/gettiebreaker/${this.nextSaturday}`);
        this.tiebreakerQuestion = response.data.question;
      } catch (error) {
        console.error("Error fetching tiebreaker:", error);
      }
    },
    formatTiebreakerInput() {
      this.tiebreakerAnswer = this.tiebreakerAnswer.replace(/[^0-9]/g, '');
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
  margin: 20px 0;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
}

h3 {
  margin-top: 10px;
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #9E1B32;
  border-radius: 20px;
  background-color: #70757A;
}
.team-logo {
  width: 75px;
  height: 75px;
  border-radius: 50%; 
  margin-bottom: 5px;
}

.spread {
  font-weight: bold;
  font-size: 1.4em;
  background-color: #9E1B32;
  color: #FFFFFF;
  padding: 10px 15px;
  border-radius: 10px;
  margin-left: 20px;
  align-self: stretch;
  text-align: center;
}

button {
  background-color: #9E1B32;
  color: #FFFFFF;
  display: block;
  margin: 30px auto;
  border: none;
  border-radius: 20px;
  padding: 15px 30px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #7a1526; 
  transform: translateY(-3px);
}
table.game-container {
  width: 100%;
  border-collapse: collapse;
}

td.team-selection {
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  padding: 20px;
  transition: background-color 0.3s;
}

td.team-selection:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

td.spread {
  width: 80px;
}

table.game-container tbody tr td {
  border: 1px solid #9E1B32;
  border-radius: 10px;
  margin: 5px;
}

/* Highlighting the selection */
td.team-selected {
  background-color: rgba(0, 112, 201, 0.5); 
}

</style>




