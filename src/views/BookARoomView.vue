<template>
  <div class="booking-container">
    <h1>Book a Room</h1>
    
    <div class="progress-bar">
      <div :class="['step', { active: currentStep >= 1 }]">
        <span class="step-number">1</span>
        <span class="step-title">Search</span>
      </div>
      <div :class="['step', { active: currentStep >= 2 }]">
        <span class="step-number">2</span>
        <span class="step-title">Select</span>
      </div>
      <div :class="['step', { active: currentStep >= 3 }]">
        <span class="step-number">3</span>
        <span class="step-title">Contact</span>
      </div>
      <div :class="['step', { active: currentStep >= 4 }]">
        <span class="step-number">4</span>
        <span class="step-title">Confirm</span>
      </div>
    </div>

    <div class="step-content">
      <RoomSearchStep 
        v-if="currentStep === 1"
        @next="nextStep"
        @rooms-found="handleRoomsFound"
      />
      
      <SelectRoomStep 
        v-if="currentStep === 2"
        :rooms="availableRooms"
        @next="nextStep"
        @room-selected="handleRoomSelected"
      />
      
      <ContactInformationStep 
        v-if="currentStep === 3"
        @next="nextStep"
        @contact-saved="handleContactSaved"
      />
      
      <ConfirmationStep 
        v-if="currentStep === 4"
        @restart="restartBooking"
      />
    </div>

    <div class="navigation" v-if="currentStep < 4">
      <button v-if="currentStep > 1" @click="previousStep" class="back-btn">
        Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RoomSearchStep from '../components/RoomSearchStep.vue'
import SelectRoomStep from '../components/SelectRoomStep.vue'
import ContactInformationStep from '../components/ContactInformationStep.vue'
import ConfirmationStep from '../components/ConfirmationStep.vue'

interface Room {
  id: number;
  name: string;
  description: string;
  address: string;
  price: number;
  image: string;
}

const currentStep = ref(1)
const availableRooms = ref<Room[]>([])

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleRoomsFound = (rooms: unknown[]) => {
  availableRooms.value = rooms as Room[]
}

const handleRoomSelected = (roomId: number) => {
  console.log('Room selected:', roomId)
}

const handleContactSaved = (contact: unknown) => {
  console.log('Contact saved:', contact)
}

const restartBooking = () => {
  currentStep.value = 1
  availableRooms.value = []
}
</script>

<style scoped>
.booking-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f5f5f5;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: #ccc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}

.step.active .step-number {
  background-color: #3498db;
}

.step-title {
  font-size: 12px;
  color: #666;
  font-weight: bold;
}

.step.active .step-title {
  color: #333;
}

.step-content {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.navigation {
  text-align: center;
}

.back-btn {
  background-color: #95a5a6;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
}
</style>