<template>
  <div class="contact-form">
    <h2>Enter Your Contact Information</h2>
    
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Title:</label>
        <select v-model="contact.title" required>
          <option value="">Select</option>
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
        </select>
      </div>

      <div class="form-group">
        <label>Full Name:</label>
        <input type="text" v-model="contact.name" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="contact.email" required />
      </div>

      <button type="submit" :disabled="isLoading" class="submit-btn">
        {{ isLoading ? 'Processing...' : 'Continue to Confirmation' }}
      </button>

      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['next', 'contact-saved'])

const contact = ref({
  title: '',
  name: '',
  email: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const submitForm = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    localStorage.setItem('contactInfo', JSON.stringify(contact.value))
    
    emit('contact-saved', contact.value)
    emit('next')
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Form submission failed'
    errorMessage.value = errorMsg
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.contact-form {
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: white;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.submit-btn:disabled {
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