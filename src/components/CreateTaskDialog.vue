<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import CustomTextField from '@/components/CustomTextField.vue'
import CustomDropDownButton from '@/components/CustomDropDownButton.vue'
import CreateTaskCheckBoxGroup from '@/components/CreateTaskCheckBoxGroup.vue'
import CustomLoading from '@/components/CustomLoading.vue'
import CustomButton from './CustomButton.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { appStrings } from '../consts/strings'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { CreateTaskFormData } from '@/types/CreateTaskFormData.ts'

const taskStore = useTasksStore()
const { values, errors, defineField, handleSubmit, handleReset, setValues, setFieldValue } =
  useForm({
    validationSchema: yup.object({
      title: yup.string().required(appStrings.inputFields.required),
      description: yup.string().required(appStrings.inputFields.required),
      dueDate: yup.string().required(appStrings.inputFields.required),
      priority: yup.number().required(appStrings.inputFields.required),
      status: yup.number().required(appStrings.inputFields.required)
    })
  })

const [title, titleProps] = defineField('title', {
  validateOnModelUpdate: false
})

const [description, descriptionProps] = defineField('description', {
  validateOnModelUpdate: false
})

const [priority, priorityProps] = defineField('priority', {
  validateOnModelUpdate: false
})

const [dueDate, dueDateProps] = defineField('dueDate', {
  validateOnModelUpdate: false
})
const [status, statusProps] = defineField('status', {
  validateOnModelUpdate: false
})

const props = defineProps({
  hiddenClass: {
    type: String,
    default: 'hidden'
  },
  isClosed: {
    type: Boolean,
    required: true
  }
})

const dropdownItems = [
  { name: 'Low', value: '0' },
  { name: 'Medium', value: '1' },
  { name: 'High', value: '2' }
]
const emits = defineEmits(['onClick'])

const onDropDownChange = (i) => {
  console.log(i)
  setFieldValue('priority', i.value)
}

const onStatusChange = (i) => {
  console.log(i)
  switch (i) {
    case 'Ongoing':
      setFieldValue('status', 0)
      break
    case 'Pending':
      setFieldValue('status', 1)
      break
    case 'Completed':
      setFieldValue('status', 2)
      break

    default:
      setFieldValue('status', 0)
      break
  }
}

const onSubmit = handleSubmit(async (values) => {
  const task: CreateTaskFormData = {
    title: values.title,
    description: values.description,
    priority: parseInt(values.priority),
    dueDate: values.dueDate,
    status: values.status
  }

  const resp = await taskStore.createTask(task)
  if (resp) {
    handleReset()
    emits('onClick')
  }
})
</script>

<template>
  <div
    class="relative z-50"
    :class="hiddenClass"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity">
      <div
        class="fixed w-80 h-full bg-color1F1F1F right-0 px-4 transition ease-linear"
        :class="[isClosed ? 'translate-x-0' : 'translate-x-96']"
      >
        <div class="flex flex-col">
          <div class="flex justify-between mt-8 mb-8" @click="$emit('onClick')">
            <div>
              <p class="text-2xl text-white mb-4">Create task</p>
            </div>
            <FontAwesomeIcon class="text-white text-2xl cursor-pointer" :icon="faClose" />
          </div>
          <form @submit="onSubmit">
            <!-- Title  -->
            <CustomTextField
              v-model="title"
              v-bind="titleProps"
              :errorText="errors.title"
              extraClass=" mb-4"
              label="Title"
              placeholder="Enter title here"
            />

            <!-- Description -->
            <CustomTextField
              extraClass=" mb-4"
              label="Description"
              v-model="description"
              v-bind="descriptionProps"
              :errorText="errors.description"
              placeholder="Enter description here"
            />

            <!-- Priority -->

            <CustomDropDownButton
              label="Priopity"
              v-model="priority"
              v-bind="priorityProps"
              :errorText="errors.priority"
              :items="dropdownItems"
              @onChange="onDropDownChange"
            />

            <!-- Due Date -->
            <CustomTextField
              extraClass=" mb-4"
              label="Due date"
              placeholder="Enter title here"
              type="date"
              v-model="dueDate"
              v-bind="dueDateProps"
              :errorText="errors.dueDate"
            />

            <!-- Status -->
            <CreateTaskCheckBoxGroup
              v-model="status"
              v-bind="statusProps"
              :errorText="errors.status"
              @onChange="onStatusChange"
            />

            <CustomButton extraClass="mt-8">
              <p v-if="!taskStore._loadingCreateTask" class="flex flex-row justify-center w-full">
                Submit
              </p>
              <span v-else> <CustomLoading /> Loading </span>
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
