<script setup>
import { ref } from 'vue';
import DeleteTask from './DeleteTask.vue';
import InfoTask from './InfoTask.vue';
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
const isInfoModalOpen = ref(false)
const isEditModalOpen = ref(false)

const selectedTaskId = ref(null)
const selectedTask = ref(null)

function openDeleteModal(id) {
    selectedTaskId.value = id
    isDeleteModalOpen.value = true
}

function openInfoModal(task) {
    selectedTask.value = { ...task }
    isInfoModalOpen.value = true
}

function openEditModal(task) {
    selectedTask.value = { ...task }
    isEditModalOpen.value = true
}

function handleClose() {
    isDeleteModalOpen.value = false
    isInfoModalOpen.value = false
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
    <div v-if="tasks.length > 0" class="responsive-table-wrapper">
        <table class="table align-middle table-hover responsive-table">
            <thead class="table-success">
                <tr>
                    <th>#</th>
                    <th class="w-50">{{ $t('taskName') }}</th>
                    <th>{{ $t('dateAdd') }}</th>
                    <th>{{ $t('deadline') }}</th>
                    <th>{{ $t('priority') }}</th>
                    <th class="text-center">{{ $t('execution') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tasks"
                    :class="{ 'table-secondary text-decoration-line-through text-muted opacity-75': item.isCompleted }"
                    :key="item.id">

                    <td data-label="#">
                        <span class="fw-bold">{{ index + 1 }}</span>
                    </td>

                    <td data-label="اسم المهمة" class="fw-semibold">
                        {{ item.task }}
                    </td>

                    <td :data-label="$t('dateAdd')" class="text-nowrap">
                        <small class="text-muted d-md-none"><i class="bi bi-calendar-plus me-1"></i></small>
                        {{ item.addDate }}
                    </td>

                    <td :data-label="$t('deadline')" class="text-nowrap">
                        <small class="text-muted d-md-none"><i class="bi bi-calendar-check me-1"></i></small>
                        {{ item.dueDate }}
                    </td>

                    <td :data-label="$t('priority')">
                        <span class="badge rounded-pill" :class="{
                            'text-bg-danger': item.priority === 'High',
                            'text-bg-warning': item.priority === 'Medium',
                            'text-bg-info': item.priority === 'Low'
                        }">
                            {{ getPriorityLabel(item.priority) }}
                        </span>
                    </td>

                    <td :data-label="$t('execution')" class="action-buttons-cell text-nowrap">
                        <div class="d-flex align-items-center justify-content-center gap-1 flex-nowrap">
                            <button type="button" @click="handleComplete(item)" class="btn btn-sm btn-outline-success"
                                :title="$t('complete')">
                                <i class="bi bi-check2-square"></i>
                            </button>
                            <button type="button" @click="openEditModal(item)" class="btn btn-sm btn-outline-warning"
                                :class="{ 'text-muted disabled': item.isCompleted }" :title="$t('edit')">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button type="button" @click="openDeleteModal(item.id)"
                                class="btn btn-sm btn-outline-danger" :title="$t('delete')">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button type="button" @click="openInfoModal(item)" class="btn btn-sm btn-outline-primary"
                                :title="$t('info')">
                                <i class="bi bi-info-square"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <DeleteTask v-if="isDeleteModalOpen" @close="handleClose" @confirm-delete="onConfirmDelete" />
        <InfoTask v-if="isInfoModalOpen" :task="selectedTask" @close="handleClose" />
        <EditTask v-if="isEditModalOpen" :task="selectedTask" :Priorities="Priorities" @close="handleClose"
            @confirm-edit="onConfirmEdit" />
    </div>

    <div v-else class="text-center text-muted my-4 py-5 border rounded bg-body-tertiary">
        <i class="bi bi-inbox display-4 d-block mb-2 text-secondary"></i>
        {{ $t('noTasks') }}
    </div>
</template>

<style scoped>
/* ضمان ظهور الأزرار أفقياً وبشكل مصفوف في الشاشات العادية */
.action-buttons-cell div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

@media (max-width: 767.98px) {
    .responsive-table thead {
        display: none;
    }

    .responsive-table,
    .responsive-table tbody,
    .responsive-table tr,
    .responsive-table td {
        display: block;
        width: 100%;
    }

    .responsive-table tbody tr {
        margin-bottom: 1rem;
        background-color: var(--bs-body-bg);
        border: 1px solid var(--bs-border-color);
        border-radius: 0.75rem;
        padding: 0.75rem 1rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05);
    }

    .responsive-table td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px dashed var(--bs-border-color-translucent);
        text-align: end;
    }

    .responsive-table td.action-buttons-cell {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .responsive-table td.action-buttons-cell::before {
        margin-bottom: 0.25rem;
    }

    .responsive-table td:last-child {
        border-bottom: none;
        padding-top: 0.75rem;
    }

    .responsive-table td::before {
        content: attr(data-label);
        font-weight: 600;
        color: var(--bs-secondary-color);
        text-align: start;
    }

    .action-buttons-cell div {
        width: 100%;
        justify-content: flex-start !important;
    }

    .action-buttons-cell .btn {
        flex: 1;
        padding: 0.4rem;
    }
}
</style>