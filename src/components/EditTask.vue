<script setup>
import { ref } from 'vue';
import Dialog from './Dialog.vue';
import TaskForm from './TaskForm.vue';

const props = defineProps(['task', 'Priorities'])

const emit = defineEmits(['close', 'confirm-edit'])

const formData = ref({
    task: props.task?.task || '',
    dueDate: props.task?.dueDate || '',
    priority: props.task?.priority || ''
})

const errorMessage = ref('')


function handleConfirm() {
    errorMessage.value = ''

    if (!formData.value.task.trim()) {
        errorMessage.value = 'Task Name Cannot be Empty!'
        return
    }

    if (!formData.value.task) {
        errorMessage.value = 'Please Choose a Priority!'
        return
    }

    emit('confirm-edit', {
        id: props.task.id,
        addDate: props.task.addDate,
        task: formData.value.task,
        dueDate: formData.value.dueDate,
        priority: formData.value.priority
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
            <TaskForm v-model="formData" />
            <div v-if="errorMessage" class="alert alert-danger py-2 mb-3">
                {{ errorMessage }}
            </div>
            <div class="d-flex justify-content-end mt-3">
                <button type="button" class="btn btn-secondary me-2" @click="emit('close')">Cancel</button>
                <button type="button" class="btn btn-warning" @click="handleConfirm">Save</button>
            </div>
        </div>
    </Dialog>
</template>

<style scoped></style>