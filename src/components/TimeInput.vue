<script setup lang="ts">
import { TimeStampTypeMicro } from '../types';

const props = defineProps<{ value:number, type:TimeStampTypeMicro, disabled?:boolean  }>()
const emit = defineEmits<{ updateValue: [value:number | undefined] }>()


</script>

<template>
    <!-- <v-col cols="12" class="d-flex align-end">
      <p class="w-50 text-end px-1 text-h5">{{ props.value }}</p>
      <div style="flex-basis: 100px;" class="d-flex justify-center">
        <p class="px-1 text-caption" style="opacity: 0.7; font-size: 0.6rem !important;">{{ props.type.toUpperCase() }}</p>
      </div>
    </v-col> -->
    <v-col cols="12" class="d-flex align-end px-10 py-2 time-input">
      <v-text-field
        v-model="props.value"
        type="number"
        hide-spin-buttons
        variant="solo"
        density="compact"
        hide-details
        single-line
        class="lefty flex-grow-1"
        :disabled="disabled ?? false"
        @update:model-value="(val) => emit('updateValue', parseInt(val))"
      />
      <v-sheet class="h-100 d-flex justify-center align-center" style="aspect-ratio: 1/1; background-color: inherit;">
        <p class="mb-0 text-caption">{{ props.type }}</p>
      </v-sheet>
    </v-col>
</template>

<style>
.time-input .lefty input {
  text-align: end;
}
</style>
