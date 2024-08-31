<script setup lang="ts">
import { onMounted, ref, Ref, StyleValue, watch } from 'vue';
import { TimeStampType } from '../types';

const props = defineProps<{ type: TimeStampType, value?:number, disabled?:boolean }>()
const emit = defineEmits<{ updateValue: [value:number | undefined, type:TimeStampType] }>()

const value:Ref<number | undefined> = ref(undefined);

onMounted(() => {
    value.value = props.value;
})
watch(() => props.value, (newValue) => {
    value.value = newValue;
});

const rowStyle:StyleValue = { justifyContent: 'center', marginBottom: '1rem' }
const inputWrapperStyle:StyleValue = { display: 'flex', flexBasis: '287px' }
const textStyle:StyleValue = { flexGrow: 1, textAlign: 'end' }
const inputStyle:StyleValue = { width: '180px', marginRight: '1rem' };
</script>

<template>
    <div class="row" :style="rowStyle">
        <div :style="inputWrapperStyle">
            <input type="number" v-model="value" :style="inputStyle" :disabled="disabled ?? false" @input="emit('updateValue', value, props.type)"/>
            <p :style="textStyle">{{ props.type }}</p>
        </div>
    </div>
</template>

<style scoped>
</style>
