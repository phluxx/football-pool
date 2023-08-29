<template>
    <div class="container">
      <h1>Register</h1>
      <input v-model="username" placeholder="Username" @input="validateUsername" class="input-style" />
      <span v-if="invalidUsername" class="error-text">Invalid username. No spaces or special characters allowed.</span>
      <input v-model="email" placeholder="Email" type="email" class="input-style"/>
      <input type="password" v-model="password" placeholder="Password" class="input-style" />
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" class="input-style" />
      <span v-if="passwordMismatch" class="error-text">Passwords don't match.</span>
      <button @click="register" class="button-style">Register</button>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      invalidUsername: false,
      passwordMismatch: false
    };
  },
  methods: {
    validateUsername() {
      const regex = /^[a-zA-Z0-9]+$/;
      this.invalidUsername = !regex.test(this.username);
    },
    async register() {
      if (this.password !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }
      try {
        let response = await fetch("https://fbpsql.ewnix.net/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        });
        if (response.status !== 200) {
          alert("Something went wrong during registration!");
          return;
        }
        alert("Registration completed!");
        this.$router.push('/login');
      } catch (err) {
        alert("Error during the registration process!");
      }
    }
  }
}
</script>
