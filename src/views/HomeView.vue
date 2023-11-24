<script setup lang="ts">
import { useTrainingMaxStore } from '@/stores/trainingMax'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

enum Lift {
  Squat,
  Dead,
  Bench,
  Press
}

class LiftingSet {
  setNumber: number;
  reps: number;
  percent: number;

  constructor(setNumber: number, reps: number, percent: number) {
    this.setNumber = setNumber;
    this.reps = reps;
    this.percent = percent;
  }

  calcWeight(trainingMax: number): number {
    const weight = trainingMax * this.percent;
    // Round down to nearest multiple of 5
    return Math.floor(weight / 5) * 5;
  }
}

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

const day = useLocalStorage('day', 5)
const lift = useLocalStorage('lift', Lift.Squat)
const deloadScheme = useLocalStorage('deload', 1)

const trainingMax = computed(() => {
  switch (lift.value) {
    case Lift.Squat:
      return squatMax.value
    case Lift.Bench:
      return benchMax.value
    case Lift.Dead:
      return deadMax.value
    case Lift.Press:
      return pressMax.value
    default:
      return NaN
  }
})

function deloadSets(deload: number): Array<LiftingSet> {
  switch(deload) {
    case 1:
      return [
        new LiftingSet(1, 5, 0.40),
        new LiftingSet(2, 5, 0.50),
        new LiftingSet(3, 5, 0.60),
      ]
    case 2:
      return [
        new LiftingSet(1, 5, 0.50),
        new LiftingSet(2, 5, 0.60),
        new LiftingSet(3, 5, 0.70),
      ]
    case 3: 
      return [
        new LiftingSet(1, 3, 0.65),
        new LiftingSet(2, 3, 0.75),
        new LiftingSet(3, 3, 0.85),
      ]
    case 4:
      return [
        new LiftingSet(1, 10, 0.40),
        new LiftingSet(2, 8, 0.50),
        new LiftingSet(3, 6, 0.60),
      ]
    case 5:
      return [
        new LiftingSet(1, 10, 0.50),
        new LiftingSet(2, 8, 0.60),
        new LiftingSet(3, 6, 0.70),
      ]
    default:
      return []
  }
}

const warmupSets: Array<LiftingSet> = [
    new LiftingSet(1, 5, 0.40),
    new LiftingSet(2, 5, 0.50),
    new LiftingSet(3, 5, 0.60),
]

function workingSets(day: number): Array<LiftingSet> {
  switch(day) {
    case 5:
      return [
        new LiftingSet(1, 5, 0.65),
        new LiftingSet(2, 5, 0.75),
        new LiftingSet(3, 5, 0.85),
      ]
    case 3:
      return [
        new LiftingSet(1, 3, 0.70),
        new LiftingSet(2, 3, 0.80),
        new LiftingSet(3, 3, 0.90),
      ]
    case 1:
      return [
        new LiftingSet(1, 5, 0.75),
        new LiftingSet(2, 3, 0.85),
        new LiftingSet(3, 1, 0.95),
      ]
    default:
      return []
  }
}

const allSets = computed(() => {
  if(day.value === 0) {
    // deload
    return deloadSets(deloadScheme.value);
  } else {
    return warmupSets.concat(workingSets(day.value))
  }
})

</script>

<template>
  <v-btn-toggle elevation="1" v-model="day" divided mandatory class="mt-4 mb-2">
    <v-btn :value="5">5/5/5</v-btn>
    <v-btn :value="3">3/3/3</v-btn>
    <v-btn :value="1">5/3/1</v-btn>
    <v-btn :value="0">Deload</v-btn>
  </v-btn-toggle>
  <p>Deload scheme:</p>
  <v-btn-toggle v-if="day === 0" elevation="2" v-model="deloadScheme" divided mandatory class="my-2">
    <v-btn :value="1">1</v-btn>
    <v-btn :value="2">2</v-btn>
    <v-btn :value="3">3</v-btn>
    <v-btn :value="4">4</v-btn>
    <v-btn :value="5">5</v-btn>
  </v-btn-toggle>
  <v-btn-toggle elevation="2" v-model="lift" divided mandatory class="my-2">
    <v-btn :value="Lift.Squat">Squat</v-btn>
    <v-btn :value="Lift.Bench">Bench</v-btn>
    <v-btn :value="Lift.Dead">Deadlift</v-btn>
    <v-btn :value="Lift.Press">Press</v-btn>
  </v-btn-toggle>
  <v-table>
    <thead>
      <tr>
        <th>Set</th>
        <th>Reps</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="set of allSets" :key="set.setNumber">
        <td>{{set.setNumber}}</td>
        <td>{{ set.reps }}</td>
        <td>{{ set.calcWeight(trainingMax) }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
