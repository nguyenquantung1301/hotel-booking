<template>
  <div class="container">
    <div class="login-card">
      <h2>Login to Your Account</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label>Username:</label>
          <input type="text" v-model="username" required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <div v-if="errorMessage" class="error">
          {{ errorMessage }}
        </div>
        
        <p>
          Don't have an account? <router-link to="/auth/register">Register here</router-link>
        </p>
        
        <div class="demo-info">
          <p><strong>Demo Accounts:</strong></p>
          <p>admin / admin</p>
          <p>user / user</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../data/mockData'
import { auth } from '../utils/auth'

const router = useRouter()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await loginUser(username.value, password.value)
    
    auth.login(response.token, response.user)
    
    alert('Login successful!')
    router.push('/home/dashboard')
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Login failed'
    errorMessage.value = errorMsg
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.container {
  padding: 50px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.login-card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border: 1px solid #ddd;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
  font-size: 22px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 0;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: #e74c3c;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #e74c3c;
  background-color: #ffe6e6;
}

p {
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

p a {
  color: #3498db;
  text-decoration: none;
}

.demo-info {
  background-color: #f0f0f0;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
  border: 1px solid #ddd;
}

.demo-info p {
  margin: 5px 0;
  font-size: 13px;
  color: #333;
}
</style>