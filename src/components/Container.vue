<script setup lang="ts">
import { StyleValue } from 'vue';

const props = defineProps<{ style?:StyleValue }>();
</script>

<template>
    <div class="container" :style="props.style">
        <slot />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    padding: 1rem;
}
</style>
