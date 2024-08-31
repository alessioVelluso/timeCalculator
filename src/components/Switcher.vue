<script setup lang="ts">
import { ref, Ref, StyleValue } from 'vue';
import { ViewOptions } from '../types';

const props = defineProps<{ style?:StyleValue }>();
const emit = defineEmits<{ updateView: [value: ViewOptions] }>()


const selectedValue:Ref<ViewOptions> = ref("nb");

const setClass = (value:ViewOptions):string | undefined => {
    if (value === selectedValue.value) return 'active';
}
const setValue = (value:ViewOptions) => {
    selectedValue.value = value;
    emit('updateView', selectedValue.value);
}
</script>

<template>
    <div class="switcher" :style="props.style">
        <button :class="setClass('nb')" @click="setValue('nb')">NUMBER</button>
        <button :class="setClass('ts')" @click="setValue('ts')">TIME SPAN</button>
    </div>
</template>

<style scoped>
.switcher {
    width: 100%;
    display: flex;
}

.switcher button {
    border-radius: 0;
    flex-grow: 1;
}

.active {
    color: palegoldenrod;
    border: 1px solid palegoldenrod;
}

button:focus {
    outline: 1px solid rgb(238, 232, 170);
}
button:hover {
    border: 1px solid rgba(255,255,255,0.4);
}
</style>
