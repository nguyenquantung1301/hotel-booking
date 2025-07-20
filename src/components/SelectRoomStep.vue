<template>
  <div class="rooms-container">
    <h2>Select Room</h2>
    
    <div class="sort-section">
      <label>Sort by:</label>
      <select v-model="sortBy" @change="sortRooms">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>

    <div v-if="rooms.length === 0" class="no-rooms">
      No rooms available
    </div>

    <div v-for="room in sortedRooms" :key="room.id" class="room-item">
      <RoomCard :room="room" />
      <button @click="selectRoom(room.id)" class="select-btn">
        Select This Room
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RoomCard from './RoomCard.vue'

interface Room {
  id: number;
  name: string;
  description: string;
  address: string;
  price: number;
  image: string;
}

const props = defineProps<{
  rooms: Room[]
}>()

const emit = defineEmits(['next', 'room-selected'])

const sortBy = ref('name')

const sortedRooms = computed(() => {
  const rooms = [...props.rooms]
  if (sortBy.value === 'price') {
    return rooms.sort((a, b) => a.price - b.price)
  }
  return rooms.sort((a, b) => a.name.localeCompare(b.name))
})

const selectRoom = (roomId: number) => {
  localStorage.setItem('roomId', roomId.toString())
  emit('room-selected', roomId)
  emit('next')
}

const sortRooms = () => {
  console.log('Sorting by:', sortBy.value)
}
</script>

<style scoped>
.rooms-container {
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

.sort-section {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

select {
  padding: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: white;
}

.no-rooms {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin: 30px 0;
}

.room-item {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 15px;
}

.select-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}
</style>