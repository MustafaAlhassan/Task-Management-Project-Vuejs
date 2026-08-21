<script setup>
import { ref } from 'vue';
import DeleteTask from './DeleteTask.vue';
import EditTask from './EditTask.vue';

defineProps(['tasks'])

const emit = defineEmits(['delete-task', 'edit-task'])

const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)

const selectedTaskId = ref(null)
const selectedTask = ref(null)

function openDeleteModal(id) {
    selectedTaskId.value = id
    isDeleteModalOpen.value = true
}

function openEditModal(task) {
    selectedTask.value = { ...task }
    isEditModalOpen.value = true
}

function handleClose() {
    isDeleteModalOpen.value = false
    isEditModalOpen.value = false
    selectedTaskId.value = null
    selectedTask.value = null
}

function onConfirmDelete() {
    emit('delete-task', selectedTaskId.value)
    handleClose()
}

function onConfirmEdit(updatedTask) {
    emit('edit-task', updatedTask)
    handleClose()
}
</script>

<template>
    <div v-if="tasks.length > 0" class="table-responsive">
        <table class="table align-middle table-hover">
            <thead class="table-success">
                <tr>
                    <th>#</th>
                    <th class="w-50">Task</th>
                    <th>Date Add</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                    <th>execution</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tasks" :key="item.id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ item.task }}</td>
                    <td>{{ item.addDate }}</td>
                    <td>{{ item.dueDate }}</td>
                    <td>{{ item.priority }}</td>
                    <td class="d-flex">
                        <button type="button" @click="openEditModal(item)" class="btn btn-outline-warning me-2">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" @click="openDeleteModal(item.id)" class="btn btn-outline-danger">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <DeleteTask v-if="isDeleteModalOpen" @close="handleClose" @confirm-delete="onConfirmDelete" />

        <EditTask v-if="isEditModalOpen" :task="selectedTask" @close="handleClose" @confirm-edit="onConfirmEdit" />
    </div>

    <div v-else class="text-center text-muted my-4">
        No tasks found. Add a new task above!
    </div>
</template>

<style scoped></style>