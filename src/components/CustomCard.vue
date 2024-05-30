<template>
  <div>
    <div class="bg-red-900 px-3 py-1 rounded-md mr-2">
      <p class="text-white">{{ name }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  name: {
    required: true,
    type: String
  }
})
</script>
