<template>
  <header class="masthead">
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">Hotel Booking</router-link>
      </div>
      
      <nav class="nav-links">
        <router-link to="/home/booking">Book Room</router-link>
        
        <router-link v-if="isLoggedIn" to="/home/dashboard">Dashboard</router-link>
        
        <template v-if="!isLoggedIn">
          <router-link to="/auth/login">Login</router-link>
          <router-link to="/auth/register">Register</router-link>
        </template>
      </nav>
      
      <div v-if="isLoggedIn" class="user-section">
        <span class="user-name">{{ username }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../utils/auth'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')

const checkAuth = () => {
  isLoggedIn.value = auth.isAuthenticated()
  if (isLoggedIn.value) {
    const user = auth.getCurrentUser()
    username.value = user?.username || 'User'
  }
}

const logout = () => {
  auth.logout()
  isLoggedIn.value = false
  username.value = ''
  alert('Logged out successfully!')
  router.push('/auth/login')
}

onMounted(() => {
  checkAuth()
  setInterval(checkAuth, 1000)
})
</script>

<style scoped>
.masthead {
  background-color: #2c3e50;
  color: white;
  padding: 12px 0;
  border-bottom: 1px solid #34495e;
}

.nav-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo a {
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  font-size: 14px;
}

.router-link-active {
  background-color: #3498db;
  font-weight: bold;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 13px;
  color: #bdc3c7;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
}
</style>