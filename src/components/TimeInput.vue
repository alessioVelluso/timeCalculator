<script setup lang="ts">
import { TimeStampTypeMicro } from '../types';

const props = defineProps<{ value:number, type:TimeStampTypeMicro, disabled?:boolean  }>()
const emit = defineEmits<{ updateValue: [value:number | undefined] }>()


</script>

<template>
    <div class="w-100 d-flex align-end px-10 py-2 time-input" style="height:56px">
      <v-text-field
        v-model="props.value"
        type="number"
        hide-spin-buttons
        variant="solo"
        density="compact"
        hide-details
        single-line
        class="lefty flex-grow-1"
        :readonly="disabled ?? false"
        flat
        @update:model-value="(val) => emit('updateValue', parseInt(val))"
      />
      <div class="h-100 d-flex justify-center align-center" style="aspect-ratio: 1/1; background-color: inherit;">
        <p class="mb-0 text-caption">{{ props.type }}</p>
      </div>
    </div>
</template>

<style>
</style>
