<template>
  <div class="room-card">
    <img :src="room.image" :alt="room.name" />
    
    <div class="room-info">
      <h3>{{ room.name }}</h3>
      <p>{{ room.description }}</p>
      <p><strong>Address:</strong> {{ room.address }}</p>
      <p class="price">${{ room.price }}/night</p>
    </div>

    <button v-if="!isView" @click="$emit('select', room.id)" class="room-select-btn">
      Select Room
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  room: {
    id: number
    name: string
    description: string
    address: string
    price: number
    image: string
  }
  isView?: boolean
}>()

defineEmits(['select'])
</script>

<style scoped>
.room-card {
  display: flex;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
}

img {
  width: 150px;
  height: 100px;
  margin-right: 15px;
}

.room-info {
  flex: 1;
}

h3 {
  color: #333;
  font-size: 16px;
  margin: 0 0 10px 0;
}

p {
  margin: 5px 0;
  font-size: 13px;
  color: #666;
}

.price {
  font-weight: bold;
  color: #27ae60;
  font-size: 14px;
}

.room-select-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;
}
</style>