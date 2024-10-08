<script setup lang="ts">
import { useTrainingMaxStore } from '@/stores/trainingMax'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useTheme } from 'vuetify';

enum Lift {
  Squat,
  Dead,
  Bench,
  Press,
  Other
}

enum RoundingMode {
  NONE,
  DOWN,
  UP
}

const showDetails = ref(false)

class LiftingSet {
  reps: number
  percent: number
  amrap: boolean

  constructor(reps: number, percent: number, amrap: boolean = false) {
    this.reps = reps
    this.percent = percent
    this.amrap = amrap
  }

  get id() {
    return crypto.randomUUID()
  }

  calcWeight(trainingMax: number, roundingMode: RoundingMode = RoundingMode.DOWN): number {
    const weight = trainingMax * this.percent
    switch (roundingMode) {
      case RoundingMode.NONE:
        return Math.round(weight)
      case RoundingMode.DOWN:
        return Math.floor(weight / 5) * 5
      case RoundingMode.UP:
        return Math.ceil(weight / 5) * 5
    }
  }
}

function displayWeight(set: LiftingSet, trainingMax: number) {
  if (showDetails.value === true) {
    const none = set.calcWeight(trainingMax, RoundingMode.NONE)
    const down = set.calcWeight(trainingMax, RoundingMode.DOWN)
    return `${none} → ${down}`
  } else {
    return set.calcWeight(trainingMax, RoundingMode.DOWN)
  }
}

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

const otherMax = useLocalStorage('otherMax', 45)

const day = useLocalStorage('day', 5)
const lift = useLocalStorage('lift', Lift.Squat)
const deloadScheme = useLocalStorage('deload', 1)
const jokers = ref<Array<number>>([])

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
    case Lift.Other:
      return otherMax.value
    default:
      return NaN
  }
})

function deloadSets(deload: number): Array<LiftingSet> {
  switch (deload) {
    case 1:
      return [new LiftingSet(5, 0.4), new LiftingSet(5, 0.5), new LiftingSet(5, 0.6)]
    case 2:
      return [new LiftingSet(5, 0.5), new LiftingSet(5, 0.6), new LiftingSet(5, 0.7)]
    case 3:
      return [new LiftingSet(3, 0.65), new LiftingSet(3, 0.75), new LiftingSet(3, 0.85)]
    case 4:
      return [new LiftingSet(10, 0.4), new LiftingSet(8, 0.5), new LiftingSet(6, 0.6)]
    case 5:
      return [new LiftingSet(10, 0.5), new LiftingSet(8, 0.6), new LiftingSet(6, 0.7)]
    default:
      return []
  }
}

const warmupSets: Array<LiftingSet> = [
  new LiftingSet(5, 0.4),
  new LiftingSet(5, 0.5),
  new LiftingSet(5, 0.6)
]

function workingSets(day: number): Array<LiftingSet> {
  switch (day) {
    case 5:
      return [new LiftingSet(5, 0.65), new LiftingSet(5, 0.75), new LiftingSet(5, 0.85, true)]
    case 3:
      return [new LiftingSet(3, 0.7), new LiftingSet(3, 0.8), new LiftingSet(3, 0.9, true)]
    case 1:
      return [new LiftingSet(5, 0.75), new LiftingSet(3, 0.85), new LiftingSet(1, 0.95, true)]
    default:
      return []
  }
}

const allSets = computed(() => {
  if (day.value === 0) {
    // deload
    return deloadSets(deloadScheme.value)
  } else {
    const workout = warmupSets.concat(workingSets(day.value))
    for (const joker of jokers.value) {
      const lastSet = workout[workout.length - 1]
      workout.push(new LiftingSet(lastSet.reps, lastSet.percent + joker))
    }
    return workout
  }
})

const theme = useTheme()

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-btn-toggle elevation="1" v-model="day" divided mandatory class="mt-4 mb-2">
        <v-btn :value="5">5/5/5</v-btn>
        <v-btn :value="3">3/3/3</v-btn>
        <v-btn :value="1">5/3/1</v-btn>
        <v-btn :value="0">Deload</v-btn>
      </v-btn-toggle>
      <p v-if="day === 0">Deload scheme:</p>
      <v-btn-toggle
        v-if="day === 0"
        elevation="2"
        v-model="deloadScheme"
        divided
        mandatory
        class="my-2"
      >
        <v-btn :value="1">1</v-btn>
        <v-btn :value="2">2</v-btn>
        <v-btn :value="3">3</v-btn>
        <v-btn :value="4">4</v-btn>
        <v-btn :value="5">5</v-btn>
      </v-btn-toggle>
      <v-btn-toggle elevation="2" v-model="lift" divided mandatory class="my-2">
        <v-btn :value="Lift.Squat">
          <img v-if="theme.current.value.dark" class="png-icon" src="../assets/icons/squat-dark.png"/>
          <img v-else class="png-icon dark-only" src="../assets/icons/squat.png"/>
        </v-btn>
        <v-btn :value="Lift.Bench">
          <img v-if="theme.current.value.dark" class="png-icon-bench" src="../assets/icons/bench-dark.png"/>
          <img v-else class="png-icon-bench dark-only" src="../assets/icons/bench.png"/>
        </v-btn>
        <v-btn :value="Lift.Dead">
          <img v-if="theme.current.value.dark" class="png-icon" src="../assets/icons/dead-dark.png"/>
          <img v-else class="png-icon dark-only" src="../assets/icons/dead.png"/>
        </v-btn>
        <v-btn :value="Lift.Press">
          <img v-if="theme.current.value.dark" class="png-icon" src="../assets/icons/press-dark.png"/>
          <img v-else class="png-icon dark-only" src="../assets/icons/press.png"/>
        </v-btn>
        <v-btn :value="Lift.Other"><v-icon icon="mdi-calculator"></v-icon></v-btn>
      </v-btn-toggle>
    </v-row>
  </v-container>

  <v-text-field v-if="lift === Lift.Other" v-model="otherMax"></v-text-field>
  <v-table>
    <thead @click="showDetails = !showDetails">
      <tr>
        <th>Set</th>
        <th>Reps</th>
        <th v-if="showDetails">%</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(set, index) of allSets" :key="set.id">
        <td>{{ index + 1 }}</td>
        <td>{{ set.reps }}<span v-if="set.amrap">+</span></td>
        <td v-if="showDetails">{{ Math.round(set.percent * 100) }}</td>
        <td>{{ displayWeight(set, trainingMax) }}</td>
      </tr>
    </tbody>
  </v-table>
  <div v-if="day !== 0" class="d-flex flex-row justify-space-around ma-2">
    <v-btn @click="jokers.push(0.05)" class="ma-2">+5%</v-btn>
    <v-btn @click="jokers.push(0.1)" class="ma-2">+10%</v-btn>
    <v-btn @click="jokers.splice(0, jokers.length)" class="ma-2">reset</v-btn>
  </div>
</template>
<style scoped>
.png-icon {
  max-width: 2rem;
}
.png-icon-bench {
  /* The bench icon is slightly bigger */
  max-width: 1.4rem;
}
</style>
