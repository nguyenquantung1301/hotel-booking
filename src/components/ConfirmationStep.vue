<template>
  <div class="confirmation-container">
    <h2>Booking Confirmed!</h2>
    
    <div v-if="isLoading" class="loading">
      Creating your booking...
    </div>
    
    <div v-else-if="bookingInfo">
      <div class="success-message">
        Your booking has been confirmed successfully!
      </div>
      
      <div class="booking-details">
        <h3>Booking Details</h3>
        <p><strong>Booking Number:</strong> {{ bookingInfo.bookingNumber }}</p>
        <p><strong>Room:</strong> {{ bookingInfo.room.name }}</p>
        <p><strong>Date:</strong> {{ formatDate(bookingInfo.bookingDate) }}</p>
        <p><strong>Guest Name:</strong> {{ bookingInfo.contact.name }}</p>
        <p><strong>Email:</strong> {{ bookingInfo.contact.email }}</p>
        <p><strong>Total Price:</strong> ${{ bookingInfo.totalPrice }}</p>
      </div>
      
      <div class="actions">
        <button @click="goToDashboard" class="primary-btn">View My Bookings</button>
        <button @click="bookAnother" class="secondary-btn">Book Another Room</button>
      </div>
    </div>
    
    <div v-else class="error-state">
      <p>Something went wrong. Please try again.</p>
      <button @click="$emit('restart')" class="retry-btn">Start Over</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { bookRoom } from '../data/mockData'

interface BookingInfo {
  id: number;
  bookingNumber: string;
  bookingDate: string;
  room: {
    name: string;
  };
  contact: {
    name: string;
    email: string;
  };
  totalPrice: number;
}

const router = useRouter()
const emit = defineEmits(['restart'])

const bookingInfo = ref<BookingInfo | null>(null)
const isLoading = ref(false)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const createBooking = async () => {
  isLoading.value = true
  
  try {
    const roomId = localStorage.getItem('roomId')
    const bookingDate = localStorage.getItem('bookingDate')
    const contactInfo = localStorage.getItem('contactInfo')
    
    if (!roomId || !bookingDate || !contactInfo) {
      throw new Error('Missing booking information')
    }
    
    const contact = JSON.parse(contactInfo)
    const booking = await bookRoom(roomId, bookingDate, contact)
    
    bookingInfo.value = booking as BookingInfo
    localStorage.setItem('bookingId', booking.id.toString())
  } catch (error) {
    console.error('Booking failed:', error)
    bookingInfo.value = null
  } finally {
    isLoading.value = false
  }
}

const goToDashboard = () => {
  router.push('/home/dashboard')
}

const bookAnother = () => {
  localStorage.removeItem('roomId')
  localStorage.removeItem('bookingDate')
  localStorage.removeItem('contactInfo')
  emit('restart')
}

onMounted(() => {
  createBooking()
})
</script>

<style scoped>
.confirmation-container {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  margin: 20px 0;
  text-align: center;
}

h2 {
  color: #27ae60;
  font-size: 22px;
  margin-bottom: 20px;
}

.loading {
  color: #666;
  font-size: 16px;
  margin: 30px 0;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
  padding: 15px;
  border: 1px solid #d6e9c6;
  margin: 20px 0;
}

.booking-details {
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
  border: 1px solid #ddd;
}

h3 {
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
}

p {
  margin: 8px 0;
  font-size: 14px;
  color: #333;
}

.actions {
  margin-top: 30px;
}

.primary-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
}

.secondary-btn {
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
}

.error-state {
  margin: 30px 0;
}

.error-state p {
  color: #e74c3c;
  font-size: 16px;
  margin-bottom: 15px;
}

.retry-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
}
</style>