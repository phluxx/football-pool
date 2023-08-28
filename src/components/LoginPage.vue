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
      try {
        let response = await fetch("https://fbpsql.ewnix.net/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
          });

          let responseBody = await response.json();

          if (response.status !== 200) {
            alert(responseBody.message || "Something went wrong!");
            return;
          }

          let token = await responseBody.token;

          // Store the token in local storage

          localStorage.setItem("token", token);

          this.password = '';

          this.$router.push('/pick');
        } catch (err) {
          alert("Error during the login process!");
        }
      }
    }
  }
</script>

