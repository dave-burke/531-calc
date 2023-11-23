<script setup lang="ts">
import { useTrainingMaxStore } from '@/stores/trainingMax'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

const day = ref(5)

enum Lift {
    Squat,
    Dead,
    Bench,
    Press,
}

const lift = ref(Lift.Squat)

</script>

<template>
<h1>Home</h1>
<v-btn-toggle v-model="day" shaped mandatory class="my-2">
    <v-btn :value="5">5</v-btn>
    <v-btn :value="3">3</v-btn>
    <v-btn :value="1">1</v-btn>
</v-btn-toggle>
<v-btn-toggle v-model="lift" shaped mandatory class="my-2">
    <v-btn :value="Lift.Squat">Squat</v-btn>
    <v-btn :value="Lift.Bench">Bench</v-btn>
    <v-btn :value="Lift.Dead">Deadlift</v-btn>
    <v-btn :value="Lift.Press">Press</v-btn>
</v-btn-toggle>
<v-table>
    <tbody>
        <tr>
            <td>Squat</td><td>{{ squatMax }}</td>
        </tr>
        <tr>
            <td>Bench Press</td><td>{{ benchMax }}</td>
        </tr>
        <tr>
            <td>Deadlift</td><td>{{ deadMax }}</td>
        </tr>
        <tr>
            <td>Overhead Press</td><td>{{ pressMax }}</td>
        </tr>
    </tbody>
</v-table>

</template>
