<script setup>
import { ref } from 'vue';
import Dialog from './Dialog.vue';
import { useI18n } from 'vue-i18n'
import TaskForm from './TaskForm.vue';

const { t } = useI18n()

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
        errorMessage.value = t('writeTaskError')
        return
    }

    if (!formData.value.task) {
        errorMessage.value = t('choosePriorityError')
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
        <div class="modal-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="modal-title text-warning m-0">
                    {{ $t('editTask') }}
                </h5>
                <button type="button" class="btn-close" @click="emit('close')" :aria-label="$t('close')"></button>
            </div>
            <TaskForm v-model="formData" />
            <div v-if="errorMessage" class="alert alert-danger py-2 mt-3 mb-0">
                {{ errorMessage }}
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emit('close')">
                {{ $t('cancel') }}
            </button>
            <button type="button" class="btn btn-warning" @click="handleConfirm">
                {{ $t('save') }}
            </button>
        </div>
    </Dialog>
</template>

<style scoped></style>