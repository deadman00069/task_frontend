<template>
  <div>
    <div class="px-3 py-1 rounded-md" :class="getBackgroundColor(props.priority)">
      <p class="text-white">{{ name }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    required: true,
    type: String
  },
  priority: {
    required: true,
    type: String
  }
})

function getBackgroundColor(priority: string): string {
  switch (priority) {
    case 'High':
      return 'bg-red-900'
    case 'Low':
      return 'bg-blue-900'
    case 'Medium':
      return 'bg-orange-800'
    default:
      return 'bg-orange-800'
  }
}
</script>
