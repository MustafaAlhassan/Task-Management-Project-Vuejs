<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TaskForm from './TaskForm.vue'

const { t } = useI18n()

const props = defineProps(['Priorities'])
const emit = defineEmits(['add-task'])

const formData = ref({
    task: '',
    dueDate: '',
    priority: ''
})

const addSuccess = ref(false)
const errorMessage = ref('')

function handleAddTask() {
    errorMessage.value = ''

    if (!formData.value.task.trim()) {
        errorMessage.value = t('writeTaskError')
        return
    }

    const finalDueDate = formData.value.dueDate || 'None'

    if (!formData.value.priority) {
        errorMessage.value = t('choosePriorityError')
        return
    }

    const newTask = {
        id: Date.now(),
        task: formData.value.task,
        addDate: new Date().toLocaleDateString(),
        dueDate: finalDueDate,
        priority: formData.value.priority,
        isCompleted: false
    }

    emit('add-task', newTask)

    addSuccess.value = true

    formData.value.task = ''
    formData.value.dueDate = ''
    formData.value.priority = ''

    setTimeout(() => {
        addSuccess.value = false
    }, 1500)
}
</script>

<template>
    <div v-if="errorMessage" class="alert alert-danger py-2 mb-3">
        {{ errorMessage }}
    </div>

    <div v-if="addSuccess" class="alert alert-success py-2 mb-3">
        {{ $t('successMessage') }}
    </div>

    <div class="mb-3">
        <TaskForm v-model="formData" />
        <div class="d-flex justify-content-end align-items-end mt-3">
            <button @click="handleAddTask" type="button" class="btn btn-success w-100">
                {{ $t('addBtn') }}
            </button>
        </div>
    </div>
    <hr class="my-3">
</template>

<style scoped></style>