<template>
  <div class="container">
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import BettingDataService from '../services/BettingDataService';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        let token = await BettingDataService.getLoginToken({username: this.username, password: this.password});

          // Store the token in local storage

          localStorage.setItem("token", token);

          this.password = '';

          this.$router.push('/userportal');
        } catch (err) {
          alert("Error during the login process!");
        }
      }
    }
  }
</script>

