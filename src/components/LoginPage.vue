<template>
  <div class="container">
    <h1>Login</h1>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      // Call your backend API here and get the session token
      // Navigate to picker page if successful:
      this.$router.push('/pick');
    }
  }
}
</script>

