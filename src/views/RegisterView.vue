<template>
  <div class="container">
    <div class="register-card">
      <h2>Create New Account</h2>
      <form @submit.prevent="handleRegister">
        <div>
          <label>Username:</label>
          <input type="text" v-model="username" required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Creating account...' : 'Register' }}
        </button>

        <div v-if="errorMessage" class="error">
          {{ errorMessage }}
        </div>
        
        <p>
          Already have an account? <router-link to="/auth/login">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../data/mockData'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  
  try {
    await registerUser(username.value, password.value, email.value)
    alert('Registration successful! Please login.')
    router.push('/auth/login')
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Registration failed'
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

.register-card {
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
  background-color: #27ae60;
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
</style>