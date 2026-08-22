<script setup>
const Priorities = ["High", "Medium", "Low"]

const taskData = defineModel({
    default: () => ({ task: '', dueDate: '', priority: '' })
})
</script>

<template>
    <div class="mb-3">
        <label for="TaskName" class="form-label fw-bold">Task Name:</label>
        <div>
            <input v-model="taskData.task" type="text" class="form-control border border-success" id="TaskName">
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <label for="dueDate" class="form-label fw-bold">Deadline:</label>
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-calendar-event"></i>
                </span>
                <input v-model="taskData.dueDate" type="date" id="dueDate" class="form-control">
            </div>
        </div>
        <div class="col-6">
            <label for="Priority" class="form-label fw-bold">Priority:</label>
            <select v-model="taskData.priority" class="form-select" id="Priority">
                <option value="" disabled selected>Open this select menu</option>
                <option v-for="(value, index) in Priorities" :class="{
                    'text-danger': value === 'High',
                    'text-warning': value === 'Medium',
                    'text-info': value === 'Low'
                }" :key="index" :value="value">
                    {{ value }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped></style>