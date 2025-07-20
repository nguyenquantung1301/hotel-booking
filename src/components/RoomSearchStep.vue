<template>
  <div class="search-container">
    <h2>Search Available Rooms</h2>
    
    <form @submit.prevent="searchRooms">
      <div>
        <label>Check-in Date:</label>
        <input type="date" v-model="bookingDate" required />
      </div>

      <div>
        <label>Number of Guests:</label>
        <input type="number" v-model="guests" min="1" max="10" required />
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Searching...' : 'Search Rooms' }}
      </button>

      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRooms } from '../data/mockData'

const emit = defineEmits(['next', 'rooms-found'])

const bookingDate = ref('')
const guests = ref(2)
const isLoading = ref(false)
const errorMessage = ref('')

const searchRooms = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await getRooms(bookingDate.value)
    
    localStorage.setItem('bookingDate', bookingDate.value)
    localStorage.setItem('guests', guests.value.toString())
    
    emit('rooms-found', response.content)
    emit('next')
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Search failed'
    errorMessage.value = errorMsg
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.search-container {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  margin: 20px 0;
}

h2 {
  color: #2c3e50;
  font-size: 20px;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: #e74c3c;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #e74c3c;
  background-color: #ffe6e6;
}
</style>