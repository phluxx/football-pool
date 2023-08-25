<!-- AdminPage.vue -->

<template>
  <div class="admin-container">
    <h1>Admin Panel</h1>
    <div class="admin-options">
      <div class="betting-controls">
        <button class="betting-button" id="open-betting" @click="openBetting">Open Betting</button>
        <button class="betting-button" id="close-betting" @click="closeBetting">Close Betting</button>
      </div>
      <router-link to="/admin/create-weekly-games">Create Weekly Games</router-link>
      <router-link to="/admin/update-scores">Update Scores</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  methods: {
    openBetting() {
      //Logic to open betting..
      alert("Betting Opened!");
      },
    closeBetting() {
      //Logic to close betting..
      alert("Betting Closed!");
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
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}

.betting-button {
  background-color: #9E1B32;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.betting-button:hover {
  background-color: #828A8F;
}
</style>
