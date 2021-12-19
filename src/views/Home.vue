<template>
  <div class="home">
    <img alt="Twit logo" src="../assets/jumbo-home.jpg">
    <h1 class="home-title">
      Tutti uniti con Twit 
      <i class="fab fa-twitter"></i>
    </h1>
    <div class="home-link">
      <router-link to="/login" class="home-link-rel">Login</router-link>
      <router-link to="/register" class="home-link-rel">Register</router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
}
</script>
