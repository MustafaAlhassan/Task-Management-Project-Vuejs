<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const Priorities = ["High", "Medium", "Low"]

const taskName = ref('')
const taskDueDate = ref('')
const selectedPriority = ref('')

const addSuccess = ref(false)
const errorMessage = ref('')

function handleAddTask() {
    errorMessage.value = ''

    if (!taskName.value.trim()) {
        errorMessage.value = 'Please Write a Task!'
        return
    }

    const finalDueDate = taskDueDate.value || 'None'

    if (!selectedPriority.value) {
        errorMessage.value = 'Please Choose a Priority!'
        return
    }

    const newTask = {
        id: Date.now(),
        task: taskName.value,
        addDate: new Date().toLocaleDateString(),
        dueDate: finalDueDate,
        priority: selectedPriority.value
    }

    emit('add-task', newTask)

    addSuccess.value = true

    taskName.value = ''
    taskDueDate.value = ''
    selectedPriority.value = ''

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
        Task Added Successfully!
    </div>

    <div class="mb-3 row">
        <label for="TaskName" class="form-label fw-bold">Task Name:</label>
        <div>
            <input v-model="taskName" type="text" class="form-control border border-success" id="TaskName">
        </div>
    </div>
    <div class="mb-3 row">
        <div class="col">
            <label for="taskDueDate" class="form-label fw-bold">Deadline:</label>
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-calendar-event"></i>
                </span>
                <input v-model="taskDueDate" type="date" id="taskDueDate" class="form-control">
            </div>
        </div>
        <div class="col-6">
            <label for="Priority" class="form-label fw-bold">Priority:</label>
            <select v-model="selectedPriority" class="form-select" id="Priority">
                <option value="" disabled selected>Open this select menu</option>
                <option v-for="(value, index) in Priorities" :key="index" :value="value">
                    {{ value }}
                </option>
            </select>
        </div>
        <div class="col-2 d-flex justify-content-end align-items-end">
            <button @click="handleAddTask" type="button" class="btn btn-success w-100">Add</button>
        </div>
    </div>
    <hr class="my-4">
</template>

<style scoped></style>