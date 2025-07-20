<template>
  <div class="container">
    <h1>My Booking Dashboard</h1>
    
    <div class="section">
      <h2>Upcoming Bookings</h2>
      <div v-if="isLoading">Loading your bookings...</div>
      <div v-else-if="incomingBookings.length === 0">
        <p>No upcoming bookings found.</p>
        <router-link to="/home/booking" class="book-now-btn">Book a room now</router-link>
      </div>
      <div v-else>
        <div v-for="booking in incomingBookings" :key="booking.id" class="booking-item">
          <RoomCard :room="booking.room" :isView="true" />
          <div class="booking-details">
            <p><strong>Booking #:</strong> {{ booking.bookingNumber }}</p>
            <p><strong>Check-in:</strong> {{ formatDate(booking.bookingDate) }}</p>
            <p><strong>Total:</strong> ${{ booking.totalPrice }}</p>
            <p><strong>Status:</strong> {{ booking.status }}</p>
            
            <button 
              @click="cancelBookingHandler(booking.id)" 
              class="cancel-btn"
              :disabled="cancellingId === booking.id"
            >
              {{ cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>Past Bookings</h2>
      <div v-if="pastBookings.length === 0">
        <p>No past bookings found.</p>
      </div>
      <div v-else>
        <div v-for="booking in pastBookings" :key="booking.id" class="booking-item">
          <RoomCard :room="booking.room" :isView="true" />
          <div class="booking-details">
            <p><strong>Booking #:</strong> {{ booking.bookingNumber }}</p>
            <p><strong>Check-in:</strong> {{ formatDate(booking.bookingDate) }}</p>
            <p><strong>Total:</strong> ${{ booking.totalPrice }}</p>
            <p><strong>Status:</strong> {{ booking.status }}</p>
            <p class="past-note">Cannot cancel past bookings</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import RoomCard from '../components/RoomCard.vue'
import { getMyBookings, cancelBooking } from '../data/mockData'

interface Room {
  id: number;
  name: string;
  description: string;
  address: string;
  price: number;
  image: string;
}

interface Booking {
  id: number;
  bookingNumber: string;
  bookingDate: string;
  room: Room;
  totalPrice: number;
  status: string;
}

const bookings = ref<Booking[]>([])
const isLoading = ref(false)
const cancellingId = ref<number | null>(null)

const incomingBookings = computed(() => 
  bookings.value.filter((item: Booking) => new Date(item.bookingDate) > new Date())
)

const pastBookings = computed(() => 
  bookings.value.filter((item: Booking) => new Date(item.bookingDate) < new Date())
)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadBookings = async () => {
  isLoading.value = true
  try {
    const data = await getMyBookings()
    bookings.value = data as Booking[]
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load bookings'
    alert('Error loading bookings: ' + errorMessage)
  } finally {
    isLoading.value = false
  }
}

const cancelBookingHandler = async (bookingId: number) => {
  if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
    return
  }
  
  cancellingId.value = bookingId
  try {
    await cancelBooking(bookingId.toString())
    alert('Booking cancelled successfully!')
    
    bookings.value = bookings.value.filter((booking: Booking) => booking.id !== bookingId)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to cancel booking'
    alert('Error: ' + errorMessage)
  } finally {
    cancellingId.value = null
  }
}

onMounted(() => {
  loadBookings()
})
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f5f5f5;
  min-height: 100vh;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
}

.section {
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
}

.section h2 {
  color: #333;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
  margin-bottom: 20px;
  font-size: 18px;
}

.booking-item {
  display: flex;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 15px;
}

.booking-details {
  padding: 15px;
  background-color: white;
  border-left: 2px solid #3498db;
  flex: 1;
}

.booking-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.booking-details strong {
  color: #333;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
}

.cancel-btn:disabled {
  background-color: #ccc;
}

.past-note {
  color: #666 !important;
  font-style: italic;
  font-size: 12px !important;
  margin-top: 8px;
}

.book-now-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  text-decoration: none;
  margin-top: 15px;
}

.section p {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin: 30px 0;
}
</style>