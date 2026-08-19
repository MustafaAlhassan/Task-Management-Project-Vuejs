<script setup>
const Priorities = ["High", "Medium", "Low"]
</script>

<template>
    <div class="mb-3 row">
        <label for="TaskName" class="form-label fw-bold">Task Name:</label>
        <div>
            <input type="text" class="form-control border border-success" id="TaskName">
        </div>
    </div>
    <div class="mb-3 row">
        <div class="col">
            <label for="taskDueDate" class="form-label fw-bold">Deadline:</label>
            <div class="input-group">
                <span class="input-group-text">
                    <i class="bi bi-calendar-event"></i>
                </span>
                <input type="date" id="taskDueDate" class="form-control">
            </div>
        </div>
        <div class="col-6">
            <label for="Priority" class="form-label fw-bold">Priority:</label>
            <select class="form-select" id="Priority" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option v-for="(value, index) in Priorities" value="value" :id="index">{{ value }}</option>
            </select>
        </div>
        <div class="col-2 d-flex justify-content-end align-items-end">
            <button type="button" class="btn btn-success w-100">Add</button>
        </div>
    </div>
</template>

<style scoped></style>
