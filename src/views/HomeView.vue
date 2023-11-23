<script setup lang="ts">
import { useTrainingMaxStore } from '@/stores/trainingMax'
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

const day = ref(5)

enum Lift {
    Squat,
    Dead,
    Bench,
    Press,
}

const lift = ref(Lift.Squat)

const reps = computed(() => {
    switch(day.value) {
        case 5:
            return [5,5,5,5,5,5]
        case 3:
            return [5,5,5,3,3,3]
        case 1:
            return [5,5,5,5,3,1]
        default:
            return [0,0,0,0,0,0]
    }
})

const trainingMax = computed(() => {
    switch(lift.value) {
        case(Lift.Squat):
            return squatMax.value
        case(Lift.Bench):
            return benchMax.value
        case(Lift.Dead):
            return deadMax.value
        case(Lift.Press):
            return pressMax.value
        default:
            return NaN;
    }
})

function round(x) {
    // Round down to nearest multiple of 5
    return Math.floor(x / 5) * 5;
}

const weight = computed(() => {
  const multiples: { [s: number]: Array<number> } = {
    5: [0.65, 0.75, 0.85],
    3: [0.7, 0.8, 0.9],
    1: [0.75, 0.85, 0.95]
  }

    const dayMultiples = multiples[day.value];
    return [
        0.40,
        0.50,
        0.60,
        dayMultiples[0],
        dayMultiples[1],
        dayMultiples[2],
    ]
    .map(x => trainingMax.value * x)
    .map(x => round(x))
})


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
    <thead>
        <tr>
            <th>#</th><th>Reps</th><th>Weight</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>1</td><td>{{ reps[0] }}</td><td>{{ weight[0] }}</td></tr>
        <tr><td>2</td><td>{{ reps[1] }}</td><td>{{ weight[1] }}</td></tr>
        <tr><td>3</td><td>{{ reps[2] }}</td><td>{{ weight[2] }}</td></tr>
        <tr><td>4</td><td>{{ reps[3] }}</td><td>{{ weight[3] }}</td></tr>
        <tr><td>5</td><td>{{ reps[4] }}</td><td>{{ weight[4] }}</td></tr>
        <tr><td>6</td><td>{{ reps[5] }}+</td><td>{{ weight[5] }}</td></tr>
    </tbody>
</v-table>

</template>
