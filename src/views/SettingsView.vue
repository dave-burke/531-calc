<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTrainingMaxStore } from '@/stores/trainingMax'

const rules = [
    value => {
        // string of digits that can't start with zero
        if(/^[1-9]\d*$/.test(value)) return true;
        return "You must enter a positive whole number"
    }
]

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

</script>
<template>
    <h1>Training Max</h1>
    <v-form @submit.prevent>
        <v-text-field label="Squat" v-model="squatMax" :rules="rules"></v-text-field>
        <v-text-field label="Bench Press" v-model="benchMax" :rules="rules"></v-text-field>
        <v-text-field label="Deadlift" v-model="deadMax" :rules="rules"></v-text-field>
        <v-text-field label="Overhead Press"  v-model="pressMax" :rules="rules"></v-text-field>
    </v-form>
</template>