<script setup>
import { ref } from 'vue';
import DeleteTask from './DeleteTask.vue';
import EditTask from './EditTask.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function getPriorityLabel(priority) {
    if (priority === 'High') return t('high')
    if (priority === 'Medium') return t('medium')
    if (priority === 'Low') return t('low')
    return priority
}

defineProps(['tasks', 'Priorities'])

const emit = defineEmits(['delete-task', 'edit-task', 'complete-task'])

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

function handleComplete(completedTask) {
    emit('complete-task', completedTask)
}
</script>

<template>
    <div v-if="tasks.length > 0" class="table-responsive">
        <table class="table align-middle table-hover">
            <thead class="table-success">
                <tr>
                    <th>#</th>
                    <th class="w-50">{{ $t('taskName') }}</th>
                    <th>{{ $t('dateAdd') }}</th>
                    <th>{{ $t('deadline') }}</th>
                    <th>{{ $t('priority') }}</th>
                    <th>{{ $t('execution') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tasks"
                    :class="{ 'table-secondary text-decoration-line-through text-muted': item.isCompleted }"
                    :key="item.id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ item.task }}</td>
                    <td class="text-nowrap">{{ item.addDate }}</td>
                    <td class="text-nowrap">{{ item.dueDate }}</td>
                    <td><span class="badge rounded-pill" :class="{
                        'text-bg-danger': item.priority === 'High',
                        'text-bg-warning': item.priority === 'Medium',
                        'text-bg-info': item.priority === 'Low'
                    }">
                            {{ getPriorityLabel(item.priority) }}
                        </span></td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <button type="button" @click="handleComplete(item)" class="btn btn-outline-success">
                                <i class="bi bi-check2-square"></i>
                            </button>
                            <button type="button" @click="openEditModal(item)" class="btn btn-outline-warning"
                                :class="{ 'text-muted disabled': item.isCompleted }">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button type="button" @click="openDeleteModal(item.id)" class="btn btn-outline-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <DeleteTask v-if="isDeleteModalOpen" @close="handleClose" @confirm-delete="onConfirmDelete" />
        <EditTask v-if="isEditModalOpen" :task="selectedTask" :Priorities="Priorities" @close="handleClose"
            @confirm-edit="onConfirmEdit" />
    </div>

    <div v-else class="text-center text-muted my-4">
        {{ $t('noTasks') }}
    </div>
</template>

<style scoped></style>