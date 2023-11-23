<script setup lang="ts">
import { useTrainingMaxStore } from '@/stores/trainingMax'
import { storeToRefs } from 'pinia';

const { squatMax, benchMax, deadMax, pressMax } = storeToRefs(useTrainingMaxStore())

</script>

<template>
<h1>Home</h1>
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
