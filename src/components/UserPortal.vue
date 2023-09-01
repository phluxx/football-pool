<template>
    <div class="user-container">
        <div v-if="decodedUsername">
      <h1>Welcome {{ decodedUsername }}!</h1>
      <div class="user-options">
        <router-link to="/pick">Enter New Picks</router-link>
        <router-link to="/viewmypicks">View/Change My Picks</router-link>
        <router-link to="/viewallpicks">View All Picks</router-link>
        <router-link to="/logout">Logout</router-link>
      </div>
      </div>
      <div v-else>You must log in to see this page!
    </div>
    </div>
  </template>
  
  <script>
  import jwtDecode from 'jwt-decode';

  export default {
    name: 'UserPortal',
      data() {
        return {
            token: localStorage.getItem('token'),
            decodedUsername: ''
        };
      },
      created() {
        this.decodeToken();
      },
    methods: {
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
  }
  </script>
  
  <style scoped>
  .user-container {
    background-color: rgba(142, 138, 143, 0.1); 
    border-radius: 10px;
    padding: 20px;
    max-width: 500px;
    margin: 40px auto;
    text-align: center;
  }
  
  .user-options > a {
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
  
  .user-options > a:hover {
    background-color: #7a1526;
  }
  
  .user-options > button {
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
  
  .user-options > button:hover {
    background-color: #7a1526;  
  }
  </style>