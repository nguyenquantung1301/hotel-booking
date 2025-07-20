<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="home-container">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  padding-top: 20px;
}
</style>