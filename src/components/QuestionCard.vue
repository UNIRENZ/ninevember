<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">{{ question }}</h2>
    <div class="grid gap-3">
      <button
        v-for="(option, index) in options"
        :key="index"
        class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition"
        @click="$emit('answer', index)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  question: string
  options: string[]
}>()
</script>
