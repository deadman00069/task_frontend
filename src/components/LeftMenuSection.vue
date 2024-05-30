<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-16"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <DrawerMenuItem label="Dashboard" @onClick="ll" />
        <DrawerMenuItem label="Projects" @onClick="ll" />
        <DrawerMenuItem label="Tasks" @onClick="ll" />
      </ul>
    </div>
  </aside>
</template>

<script setup>
import DrawerMenuItem from './DrawerMenuItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const ll = (v) => {
  switch (v) {
    case 'Dashboard':
      router.push('dashboard')
      break
    case 'Projects':
      router.push('projects')
      break
    case 'Tasks':
      router.replace('tasks')

      break
  }
  console.log('yehefe')
}
</script>

<style lang="scss" scoped></style>
