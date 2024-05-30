<template>
  <div class="mb-4 flex flex-col">
    <label class="mb-1 text-color666666" :for="label">{{ label }}</label>
    <dropdown-menu with-dropdown-closer class="custom-style" transition="zoom">
      <template #trigger>
        <button>
          <p v-if="selectedItem.name === ''">Select Priority</p>
          <p class="text-black">{{ selectedItem.name }}</p>
        </button>
      </template>

      <template #body>
        <ul>
          <li
            class="p-2 m-2 hover:bg-gray-600"
            @click="onSelectItem(i)"
            v-for="i in items"
            :key="i"
            dropdown-closer
          >
            <p>{{ i.name }}</p>
          </li>
        </ul>
      </template>
    </dropdown-menu>
    <p class="pl-1 pt-1 text-red-400" v-if="errorText">{{ errorText }}</p>
  </div>
</template>
<script setup lang="ts">
import DropdownMenu from 'v-dropdown-menu'
import { ref } from 'vue'
import type { SelectPriority } from '@/types/SelectPriority.ts'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  errorText: {
    type: String
  }
})

const selectedItem = ref<SelectPriority>({ name: '', value: '' })

const emit = defineEmits(['onChange'])

const onSelectItem = (i) => {
  selectedItem.value = i
  emit('onChange', i)
}
</script>

<style scoped>
.v-dropdown-menu {
  background-color: white;
  padding: 8px;
  border-radius: 0.375rem;
  color: #9ba3af;
}
.v-dropdown-menu__container {
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 16px 8px;
}

.v-dropdown-menu__container__body ul {
  margin: 0;
  padding: 0;
}

.v-dropdown-menu__container__body ul li {
  list-style: none;
}

/* .v-dropdown-menu__container__body ul li a {
  display: flex;
  padding: 1rem;
  color: #666;
  font-size: 16px;
  text-decoration: none;
}  */
</style>
