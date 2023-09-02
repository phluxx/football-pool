<template>
  <div>
      <ul>
          <li v-for="username in usernames" :key="username">
              <router-link :to="`/viewallpicks/${username}`">{{ username }}</router-link>
          </li>
      </ul>
  </div>
</template>
  
  <script>
  export default {
    created() {
      this.fetchUniqueUsernames();
    },
    data() {
      return {
        usernames: [],
      };
    },
    methods: {
      async fetchUniqueUsernames() {
        try {
            const response = await axios.get("https://fbpsql.ewnix.net/api/getuniqueusernames");
            this.usernames = response.data;
        } catch (error) {
            console.error("Error fetching unique usernames:", error);
        }
    }
  }
}
  </script>