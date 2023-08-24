<template>
  <div class="container">
    <h1>Matchup Picker</h1>
    <div class="matchup" v-for="match in matchups" :key="match.id">
      <span>{{ match.team1 }} vs {{ match.team2 }}</span>
      <select v-model="picks[match.id]">
        <option :value="match.team1">{{ match.team1 }}</option>
        <option :value="match.team2">{{ match.team2 }}</option>
      </select>
    </div>
    <button @click="submitPicks">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matchups: [], // Fetch this list from your backend
      picks: {} // { match_id: 'selected_team' }
    };
  },
  methods: {
    async submitPicks() {
      // Submit your picks to the backend
    }
  }
}
</script>

