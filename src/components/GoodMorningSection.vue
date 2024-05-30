<template>
  <div class="relative">
    <img src="../assets/scenerio.svg" class="w-full h-80 object-cover brightness-75 rounded-lg" />
    <p class="absolute top-3 left-4 text-4xl font-semibold text-black">Good Morning, John</p>
    <p class="absolute top-14 left-4 text-base font-light text-black">
      You have <span class="font-bold">6 </span>Task for today
    </p>

    <!-- Up next section -->
    <div class="absolute bottom-4 right-4 w-1/2 h-1/2 bg-white rounded-lg p-4 overflow-y-auto">
      <p class="text-base font-semibold mb-4">Up next</p>
      <div class="flex mb-4">
        <div class="container w-1.5 bg-red-900 rounded-lg"></div>
        <div class="flex flex-col">
          <p class="text-xs font-medium pl-2 pb-2 text-gray-500">
            Design team meet - Discuess new project.
          </p>
          <p class="text-sm font-light pl-2 text-gray-500">11:30 AM - 01:00 PM</p>
        </div>
      </div>
      <div class="flex">
        <div class="container w-2 bg-red-900 rounded-lg"></div>
        <div class="flex flex-col">
          <p class="text-xs font-medium pl-2 text-gray-500">
            Design team meet - Discuess new project
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
