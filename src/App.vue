<script setup lang="ts">
import { ref, Ref } from 'vue';
import { TimeCalculator } from './classes/TimeCalculator';
import TimeInput from './components/TimeInput.vue';
import { TemporalInput, TimeCalculatorParams, TimeStampType } from './types';
import { utils } from './utils';




// --- Generics
const timeCalculator = new TimeCalculator();
const switchViewValue:Ref<"Number" | "Timespan"> = ref("Number");



// --- Number View
const numberViewInput:Ref<number> = ref(0);
const numberViewInputUnit:Ref<'ms'|'s'|'m'|'h'|'d'> = ref("ms");
const numberViewTemporalResult:Ref<TemporalInput> = ref({ weeks: 0, days: 0, hours: 0, minutes: 1, seconds: 1, milliseconds: 1 });

const calculateNumberInputs = () => {
  if (isNumberInvalid(numberViewInput.value)) return;

  const result = timeCalculator.calculateIntValue(numberViewInput.value, utils.fromTimestampMicroToTimestamp(numberViewInputUnit.value))
  numberViewTemporalResult.value = result;
}

// --- Timestamp View
const timestampViewInput:Ref<TemporalInput> = ref({ weeks: 0, days: 0, hours: 0, minutes: 1, seconds: 1, milliseconds: 1 });
const timestampViewInputUnit:Ref<'s'|'m'|'h'|'d'> = ref("s");
const timestampViewTemporalResult:Ref<number> = ref(0);

const updateTimestampInputs = (value:number | undefined, type:TimeStampType) => {
  timestampViewInput.value[type] = value ?? 0;
  if (Object.values(timestampViewInput.value).some(x => isNumberInvalid(x))) return;

  calculateTimestampInput();
}

const calculateTimestampInput = () => {
  const res = timeCalculator.calculateTemporalValue(timestampViewInput.value, utils.fromTimestampMicroToTimestamp(timestampViewInputUnit.value));
  timestampViewTemporalResult.value = res;
}


// --- Generic Methods
const isNumberInvalid = (val:number):boolean => val % 1 !== 0

const showNumberResult = (value?:number) => (value && value > 0);
const showTimestampInputs = (type:TimeCalculatorParams) => {
  const currentType = timeCalculator.getTypeIndex(type);
  const paramType = timeCalculator.getTypeIndex(utils.fromTimestampMicroToTimestamp(timestampViewInputUnit.value));

  if (currentType >= paramType) return true;
  else {
    timestampViewInput.value[type] = 0;
    return false;
  }
}
</script>

<template>
  <v-container class="pa-5 d-flex flex-column" style="height: 100vh;">

    <v-row class="flex-grow-0">
      <v-col cols="12">
        <v-btn-toggle v-model="switchViewValue" class="d-flex" variant="outlined">
          <v-btn value="Number" class="flex-grow-1">Number</v-btn>
          <v-btn value="Timespan" class="flex-grow-1">Timespan</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <template v-if="switchViewValue === 'Number'">
      <v-row class="flex-grow-0 mt-10">
        <v-col cols="12" class="d-flex px-5">
          <v-text-field
            v-model="numberViewInput"
            type="number"
            hide-spin-buttons
            variant="solo"
            density="compact"
            hide-details
            single-line
            class="flex-grow-1"
            @update:model-value="calculateNumberInputs()"
          />
          <v-select
            :items="['ms', 's', 'm', 'h', 'd']"
            v-model="numberViewInputUnit"
            variant="outlined"
            density="compact"
            hide-details
            style="flex: none;"
            @update:model-value="calculateNumberInputs()"
          />
        </v-col>
      </v-row>
      <v-row class="py-10" style="flex:unset">
        <TimeInput v-if="showNumberResult(numberViewTemporalResult.weeks)" :value="numberViewTemporalResult.weeks ?? 0" type="w" disabled/>
        <TimeInput v-if="showNumberResult(numberViewTemporalResult.days)" :value="numberViewTemporalResult.days ?? 0" type="d" disabled/>
        <TimeInput v-if="showNumberResult(numberViewTemporalResult.hours)" :value="numberViewTemporalResult.hours ?? 0" type="h" disabled/>
        <TimeInput v-if="showNumberResult(numberViewTemporalResult.minutes)" :value="numberViewTemporalResult.minutes ?? 0" type="m" disabled/>
        <TimeInput v-if="showNumberResult(numberViewTemporalResult.seconds)" :value="numberViewTemporalResult.seconds ?? 0" type="s" disabled/>
        <TimeInput v-if="showNumberResult(numberViewTemporalResult.milliseconds)" :value="numberViewTemporalResult.milliseconds ?? 0" type="ms" disabled/>
      </v-row>
    </template>

    <template v-else-if="switchViewValue === 'Timespan'">
      <v-row class="flex-grow-0 mt-10">
        <TimeInput v-if="showTimestampInputs('days')" :value="timestampViewInput.days ?? 0" type="d" @update-value="(val) => updateTimestampInputs(val, 'days')"/>
        <TimeInput v-if="showTimestampInputs('hours')" :value="timestampViewInput.hours ?? 0" type="h" @update-value="(val) => updateTimestampInputs(val, 'hours')"/>
        <TimeInput v-if="showTimestampInputs('minutes')" :value="timestampViewInput.minutes ?? 0" type="m" @update-value="(val) => updateTimestampInputs(val, 'minutes')"/>
        <TimeInput v-if="showTimestampInputs('seconds')" :value="timestampViewInput.seconds ?? 0" type="s" @update-value="(val) => updateTimestampInputs(val, 'seconds')"/>
        <TimeInput v-if="showTimestampInputs('milliseconds')" :value="timestampViewInput.milliseconds ?? 0" type="ms" @update-value="(val) => updateTimestampInputs(val, 'milliseconds')"/>
      </v-row>
      <v-row class="py-10" style="flex:unset">
        <v-col cols="12" class="d-flex px-5">
          <v-text-field
            v-model="timestampViewTemporalResult"
            type="number"
            hide-spin-buttons
            variant="solo"
            density="compact"
            hide-details
            single-line
            class="flex-grow-1"
            disabled
            @update:model-value="calculateTimestampInput()"
          />
          <v-select
            :items="['ms', 's', 'm', 'h', 'd']"
            v-model="timestampViewInputUnit"
            variant="outlined"
            density="compact"
            hide-details
            style="flex: none;"
            @update:model-value="calculateTimestampInput()"
          />
        </v-col>
      </v-row>
    </template>

  </v-container>
</template>

<style scoped>

</style>
