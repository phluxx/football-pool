<template>
  <div class="admin-container">
    <h2>Create Weekly Football Games</h2>
    
    <!-- Date picker section -->
    <div class="date-section">
      <label for="gameDate">Games To Be Played On:</label>
      <input type="date" id="gameDate" v-model="gameDate">
    </div>

    <div class="betting-controls">
      <table>
        <thead>
          <tr>
            <th>Favored Team</th>
            <th>Underdog</th>
            <th>Point Spread</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in 15" :key="game">
            <td>
              <select v-model="selectedFavored[game]">
                <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
              </select>
            </td>
            <td>
              <select v-model="selectedUnderdog[game]">
                <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.team }}</option>
              </select>
            </td>
            <td>
              <input type="number" v-model="pointSpread[game]" placeholder="Point Spread"/>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="betting-button" @click="saveGames">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameDate: '',          // To store the selected game date
      teams: [],             // You can populate this from your MySQL database
      selectedFavored: {},   // To store the selected favored teams
      selectedUnderdog: {},  // To store the selected underdog teams
      pointSpread: {}        // To store the point spreads
    };
  },
  methods: {
    async saveGames() {
      // Implement your save logic here
    }
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

.admin-options > a,
.admin-options > button {
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

.admin-options > a:hover,
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

.date-section {
  margin-bottom: 20px; /* Add spacing between the date picker and the table */
}

label {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  margin-right: 10px;
}
</style>

