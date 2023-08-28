<!-- AdminPage.vue -->

<template>
  <div class="admin-container">
    <h1>Admin Panel</h1>
    <div class="admin-options">
      <div class="betting-controls">
        <button v-if="!isBettingOpen" class="betting-button" @click="openBetting">Open Betting</button>
        <button v-if="isBettingOpen" class="betting-button" @click="closeBetting">Close Betting</button>
      </div>
      <router-link to="/admin/create">Create Weekly Games</router-link>
      <router-link to="/admin/updategames">Update Weekly Games</router-link>
      <router-link to="/admin/updatescores">Update Scores</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminPage',
    data() {
      return {
        isBettingOpen: false
      };
    },
    created() {
      this.fetchBettingStatus();
    },
  methods: {
     async fetchBettingStatus() {
      try {
        const response = await axios.get('https://fbpsql.ewnix.net/api/isbettingopen');
        this.isBettingOpen = response.data.isBettingOpen;
      } catch (error) {
        console.error('Error fetching betting status:', error);
      }
     },
     async openBetting() {
      try {
        await axios.post('https://fbpsql.ewnix.net/api/openbetting');
        this.isBettingOpen = true;
        alert("Betting Opened!");
      } catch (error) {
        console.error('Error opening betting:', error);
        alert('Error opening betting!');
       }
      },
      async closeBetting() {
        try {
          await axios.post('https://fbpsql.ewnix.net/api/closebetting');
          this.isBettingOpen = false;
          alert("Betting Closed!");
      } catch (error) {
        console.error('Error closing betting:', error);
        alert("Error closing betting!");
      }
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
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s;
}

.betting-button:hover {
  background-color: #7a1526;
}
</style>
