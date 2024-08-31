<script setup lang="ts">
import { ref, Ref } from 'vue';
import Container from './components/Container.vue';
import Switcher from './components/Switcher.vue';
import { TemporalInput, TimeCalculatorParams, TimeStampType, ViewOptions } from './types';
import TimeStampInput from './components/TimeStampInput.vue';
import { TimeCalculator } from './classes/TimeCalculator';

// --- Data
const selectedView:Ref<ViewOptions> = ref('nb');

const numberViewInput:Ref<number> = ref(0);
const numberViewInputType:Ref<TimeCalculatorParams> = ref("seconds");
const numberViewTemporalResult:Ref<TemporalInput> = ref({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

const temporalViewInput:Ref<TemporalInput> = ref({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
const temporalViewNumberResult:Ref<number> = ref(0);
const temporalViewNumberResultType:Ref<TimeCalculatorParams> = ref("seconds");

const timeCalculator = new TimeCalculator();


// --- Methods
const isNumberInvalid = (val:number):boolean => val % 1 !== 0
const showTemporalValue = (value?:number) => (value && value > 0) ;


const calculateIntInputs = () => {
  if (isNumberInvalid(numberViewInput.value)) return;

  const result = timeCalculator.calculateIntValue(numberViewInput.value, numberViewInputType.value)
  numberViewTemporalResult.value = result;
}


const updateTemporalInputs = (value:number | undefined, type:TimeStampType) => {
  temporalViewInput.value[type] = value;
  calculateTemporalInput();
}

const calculateTemporalInput = () => {
  const res = timeCalculator.calculateTemporalValue(temporalViewInput.value, temporalViewNumberResultType.value);

  temporalViewNumberResult.value = res;
}


</script>

<template>
  <Container :style="{ justifyContent: 'center' }">
    <Switcher style="margin-bottom: 2rem;" @updateView="val => selectedView = val"/>
    <template v-if="selectedView === 'nb'">

      <div class="row" style="justify-content: center; margin-bottom: 6rem;">
        <input type="number" v-model="numberViewInput" @input="calculateIntInputs()"/>
        <select v-model="numberViewInputType" @change="calculateIntInputs()">
          <option value="milliseconds">ms</option>
          <option value="seconds">s</option>
          <option value="minutes">m</option>
          <option value="hours">h</option>
          <option value="days">d</option>
        </select>
      </div>

      <template v-if="isNumberInvalid(numberViewInput)">
        <p style="width: 100%; text-align: center; margin-bottom: 0.5rem;">Insert a valid number</p>
      </template>
      <template v-else>
        <p style="width: 100%; text-align: center; margin-bottom: 0.5rem;">RESULT</p>
        <TimeStampInput v-if="showTemporalValue(numberViewTemporalResult.weeks)" type="weeks" disabled :value="numberViewTemporalResult.weeks"/>
        <TimeStampInput v-if="showTemporalValue(numberViewTemporalResult.days)" type="days" disabled :value="numberViewTemporalResult.days"/>
        <TimeStampInput v-if="showTemporalValue(numberViewTemporalResult.hours)" type="hours" disabled :value="numberViewTemporalResult.hours"/>
        <TimeStampInput v-if="showTemporalValue(numberViewTemporalResult.minutes)" type="minutes" disabled :value="numberViewTemporalResult.minutes"/>
        <TimeStampInput v-if="showTemporalValue(numberViewTemporalResult.seconds)" type="seconds" disabled :value="numberViewTemporalResult.seconds"/>
        <TimeStampInput v-if="showTemporalValue(numberViewTemporalResult.milliseconds)" type="milliseconds" disabled :value="numberViewTemporalResult.milliseconds"/>
      </template>

    </template>
    <template v-else>

      <TimeStampInput type="weeks":value="temporalViewInput.weeks" @updateValue="updateTemporalInputs"/>
      <TimeStampInput type="days" :value="temporalViewInput.days" @updateValue="updateTemporalInputs"/>
      <TimeStampInput type="hours" :value="temporalViewInput.hours" @updateValue="updateTemporalInputs"/>
      <TimeStampInput type="minutes" :value="temporalViewInput.minutes" @updateValue="updateTemporalInputs"/>
      <TimeStampInput type="seconds" :value="temporalViewInput.seconds" @updateValue="updateTemporalInputs"/>
      <TimeStampInput type="milliseconds" :value="temporalViewInput.milliseconds" @updateValue="updateTemporalInputs"/>

      <div class="row" style="justify-content: center; margin-top: 6rem;">
        <p style="width: 100%; text-align: center; margin-bottom: 0.5rem;">RESULT</p>
        <input type="number" v-model="temporalViewNumberResult" disabled/>
        <select v-model="temporalViewNumberResultType" @change="calculateTemporalInput()">
          <option value="milliseconds">ms</option>
          <option value="seconds">s</option>
          <option value="minutes">m</option>
          <option value="hours">h</option>
          <option value="days">d</option>
          <option value="weeks">w</option>
        </select>
      </div>

    </template>
  </Container>
</template>

<style scoped>
</style>
