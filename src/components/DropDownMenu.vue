<template>
  <dropdown-menu with-dropdown-closer direction="right">
    <template #trigger>
      <button>
        <slot />
      </button>
    </template>

    <template #body>
      <ul>
        <li
          v-for="item in list"
          :key="item.value"
          :value="item.value"
          class="p-2 hover:bg-gray-700 rounded-md"
          @click="$emit('onChange', item)"
        >
          <p dropdown-closer class="text-white">{{ item.name }}</p>
        </li>
      </ul>
    </template>
  </dropdown-menu>
</template>

<script setup>
import DropdownMenu from 'v-dropdown-menu'
import 'v-dropdown-menu/css'
const props = defineProps({
  list: {
    required: true
    // type: Any
  }
})

const emit = defineEmits(['onChange'])
</script>

<style>
.v-dropdown-menu__container {
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  background-color: #1f1f1f;
  padding: 16px 8px;
  /* transform: translateY(-50px); */
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
} */
</style>
