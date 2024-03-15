<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTrainingMaxStore } from '@/stores/trainingMax'

const rules = [
  (value: string) => {
    // string of digits that can't start with zero
    if (/^[1-9]\d*$/.test(value)) return true
    return 'You must enter a positive whole number'
  }
]

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

function incrementLegs(amount: number) {
  squatMax.value += amount;
  deadMax.value += amount;
}

function incrementArms(amount: number) {
  benchMax.value += amount;
  pressMax.value += amount;
}

function incrementAll(amount: number) {
  incrementLegs(amount);
  incrementArms(amount);
}

</script>
<template>
  <h1>Training Max</h1>
  <v-form @submit.prevent>
    <v-text-field
      label="Squat"
      type="number"
      step="5"
      v-model.number="squatMax"
      :rules="rules"
    ></v-text-field>
    <v-text-field
      label="Bench Press"
      type="number"
      step="5"
      v-model.number="benchMax"
      :rules="rules"
    ></v-text-field>
    <v-text-field
      label="Deadlift"
      type="number"
      step="5"
      v-model.number="deadMax"
      :rules="rules"
    ></v-text-field>
    <v-text-field
      label="Overhead Press"
      type="number"
      step="5"
      v-model.number="pressMax"
      :rules="rules"
    ></v-text-field>
  </v-form>
  <v-row align-content="center" justify="center">
    <v-btn-group elevation="1" divided class="mb-4">
      <v-btn @click="incrementAll(5)">+5</v-btn>
      <v-btn @click="incrementAll(10)">+10</v-btn>
      <v-btn @click="incrementArms(5); incrementLegs(10)">+5/10</v-btn>
    </v-btn-group>
  </v-row>
</template>
