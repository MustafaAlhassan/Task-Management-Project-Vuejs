<script setup>
import { ref } from 'vue';
import DeleteTask from './DeleteTask.vue';

defineProps(['tasks'])

const emit = defineEmits(['delete-task'])

const isModalOpen = ref(false)
const selectedTaskId = ref(null)

function openModal(id) {
    selectedTaskId.value = id
    isModalOpen.value = true
}

function handleClose() {
    isModalOpen.value = false
    selectedTaskId.value = null
}

function onConfirmDelete() {
    emit('delete-task', selectedTaskId.value)
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
                        <button type="button" class="btn btn-outline-warning me-2">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" @click="openModal(item.id)" class="btn btn-outline-danger">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <DeleteTask v-if="isModalOpen" @close="handleClose" @confirm-delete="onConfirmDelete" />
    </div>

    <div v-else class="text-center text-muted my-4">
        No tasks found. Add a new task above!
    </div>
</template>

<style scoped></style>