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
</template>
