<template>
  <div v-if="isBettingOpen">
    <div v-if="decodedUsername"><h3>Welcome, {{  decodedUsername }}!</h3></div><br />
    <h2>Pick 'em for the week of Saturday, {{ nextSaturday }}</h2>
    
    <div v-for="(game, index) in games" :key="game.id" class="game-container">
      
      <h3>Game {{ index + 1 }}</h3>
      
      <!-- Favorite Team -->
      <div class="team-selection" :class="{'team-selected': picks[game.id] === game.favorite}" @click="selectTeam(game.id, game.favorite)">
        <img :src="getLogoURL(game.favorite)" alt="Favorite Team Logo" class="team-logo">
        <div>{{ getTeamName(game.favorite) }}</div>
      </div>
      
      <!-- Spread -->
      <div class="spread">-{{ game.spread }}</div>
      
      <!-- Underdog Team -->
      <div class="team-selection" :class="{'team-selected': picks[game.id] === game.underdog}" @click="selectTeam(game.id, game.underdog)">
        <img :src="getLogoURL(game.underdog)" alt="Underdog Team Logo" class="team-logo">
        <div>{{ getTeamName(game.underdog) }}</div>
      </div>
      
    </div>

    <div class="tiebreaker">
      <label>TIEBREAKER: {{ tiebreakerQuestion }}</label><br />
      <input type="text" v-model="tiebreakerAnswer" @input="formatTiebreakerInput" maxlength="5">
    </div>

    <button @click="savePicks">Save Picks</button>
  </div>
  <div v-else>
    <h2>Pick 'em for the week of Saturday, {{ nextSaturday }}</h2>
    <p>Betting is closed for this week.</p>
    <p><router-link to="/viewmypicks">View your picks</router-link></p>
  </div>
</template>



<script>
import axios from "axios";
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      isBettingOpen: false,
      games: [],
      teams: [],
      picks: {},
      nextSaturday: this.findNextSaturday(),
      tiebreakerQuestion: "",
      tiebreakerID: null,
      token: localStorage.getItem('token') || '',
      decodedUsername: ''
    };
  },
  created() {
    this.fetchTeams();
    this.fetchGames();
    this.fetchTiebreaker();
    this.fetchBettingStatus();
    this.decodeToken();
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
  if (today === 5) {
    return currentDateIso;
  }

  // Otherwise, find the next Saturday
  let daysUntilNextSaturday = 5 - today;
  date.setDate(date.getDate() + daysUntilNextSaturday);
  
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
    // Check if all 15 games have a selected winner
    const allGamesSelected = Object.keys(this.picks).length === 15 && !Object.values(this.picks).includes(null);

    // Check if the tiebreaker has been filled out
    const tiebreakerFilled = this.tiebreakerAnswer !== null && this.tiebreakerAnswer !== '';

    // Validate before sending request
    if (allGamesSelected && tiebreakerFilled) {
      const headers = {
        Authorization: `Bearer ${this.token}`
      };

      await axios.post("https://fbpsql.ewnix.net/api/saveuserpicks", {
        username: this.decodedUsername,
        picks: this.picks
      }, { headers: headers });

      await axios.post("https://fbpsql.ewnix.net/api/saveusertiebreaker", {
        username: this.decodedUsername,
        qid: this.tiebreakerID,
        tiebreaker: this.tiebreakerAnswer
      }, { headers: headers });

      alert("Picks saved!");
      this.$router.push('/userportal');
    } else {
      // Show an alert with what the user needs to do
      let errorMessage = "Please ensure:";
      if (!allGamesSelected) errorMessage += "\n- All 15 games have a selected winner.";
      if (!tiebreakerFilled) errorMessage += "\n- The tiebreaker has been filled out.";
      alert(errorMessage);
    }
  } catch (error) {
    console.error("Error saving picks:", error);
    alert("Error saving picks!");
  }
},

    async fetchTiebreaker() {
      try {
        const response = await axios.get(`https://fbpsql.ewnix.net/api/gettiebreaker/${this.nextSaturday}`);
        this.tiebreakerQuestion = response.data.tiebreakerQuestion;
        this.tiebreakerID = response.data.id;
      } catch (error) {
        console.error("Error fetching tiebreaker:", error);
      }
    },
    formatTiebreakerInput() {
      this.tiebreakerAnswer = this.tiebreakerAnswer.replace(/[^0-9]/g, '');
    },
    async fetchBettingStatus() {
      try {
        const response = await axios.get("https://fbpsql.ewnix.net/api/isbettingopen");
        this.isBettingOpen = response.data.isBettingOpen;
      } catch (error) {
        console.error("Error fetching betting status.")
      }
    },
    decodeToken() {
      if (this.token) {
        try {
          let decodedToken = jwtDecode(this.token);
          this.decodedUsername = decodedToken.username;
        } catch (err) {
          console.error('Error decoding token: ', err);
        }
      }
    }
  }
};

</script>

<style scoped>
body {
  background-color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

div {
  margin: 20px 0;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
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

.game-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #9E1B32;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  position: relative;  /* added for positioning the h3 */
}

h3 {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 0 10px;
  z-index: 1;  /* to ensure h3 is above other elements */
}

.team-selection, .spread {
  flex: 1;
  text-align: center;
  margin: 0 10px;
  transition: background-color 0.3s;
}

.team-selection {
  cursor: pointer;
  text-align: center;
  padding: 20px;
  width: 40%;
  transition: background-color 0.3s;
  border-radius: 10px;
}

.team-selection:not(.team-selected):hover {
  background-color: rgba(128, 27, 50, 0.3);
  border-radius: 10px;
}

/* Highlighting the selection */
.team-selected {
  background-color: rgba(128, 27, 50, 0.5); 
  border-radius: 10px;
}

.tiebreaker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 20px auto;
}

.tiebreaker label {
  margin-bottom: 10px;
}

a.router-link {
  color: #9E1B32;
  text-decoration: none;
}

a.router-link:hover {
  color: #8A1729;
  text-decoration: none;
}

p {
  text-align: center;
}

td.team-selection:hover, td.team-selected {
  border-radius: 10px;
}

@media (min-width: 768px) {
  div {
    max-width: 800px;
    margin: 20px auto;
  }
}


</style>