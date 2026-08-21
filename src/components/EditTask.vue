<script setup>
import { ref } from 'vue';
import Dialog from './Dialog.vue';

const props = defineProps(['task', 'Priorities'])

const emit = defineEmits(['close', 'confirm-edit'])

const Priorities = ["High", "Medium", "Low"]

const taskName = ref(props.task?.task || '')
const taskDueDate = ref(props.task?.dueDate || '')
const selectedPriority = ref(props.task?.priority || '')

function handleConfirm() {
    emit('confirm-edit', {
        id: props.task.id,
        addDate: props.task.addDate,
        task: taskName.value,
        dueDate: taskDueDate.value,
        priority: selectedPriority.value
    })
}
</script>

<template>
    <Dialog>
        <div class="modal-header">
            <h5 class="modal-title text-warning">Edit Task</h5>
            <button type="button" class="btn-close" @click="emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3 row">
                <label for="TaskName" class="form-label fw-bold">Task Name:</label>
                <div>
                    <input v-model="taskName" type="text" class="form-control border border-success" id="TaskName">
                </div>
            </div>
            <div class="mb-3 row">
                <div class="col-6">
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
                        <option value="" disabled>Select priority</option>
                        <option v-for="(value, index) in Priorities" :key="index" :value="value">
                            {{ value }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
                <button type="button" class="btn btn-warning" @click="handleConfirm">Save</button>
            </div>
        </div>
    </Dialog>
</template>

<style scoped></style>