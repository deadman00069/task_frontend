<template>
  <div class="bg-slate-600 flex min-h-screen flex-col">
    <NavBar />
    <LeftMenuSection />
    <div class="p-4 sm:ml-64 pt-20 flex-1 h-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftMenuSection from '../components/LeftMenuSection.vue'
import NavBar from '../components/NavBar.vue'
</script>
