<script setup>
import Dialog from './Dialog.vue';

const emit = defineEmits(['close', 'confirm-delete'])

function handleConfirm() {
    emit('confirm-delete')
}
</script>

<template>
    <Dialog>
        <div class="modal-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="modal-title text-danger m-0">
                    {{ $t('confirmDelete') }}
                </h5>
                <button type="button" class="btn-close" @click="emit('close')" :aria-label="$t('close')"></button>
            </div>
            <p class="mb-0">{{ $t('confirmDeleteMessage') }}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emit('close')">{{ $t('cancel') }}</button>
            <button type="button" class="btn btn-danger" @click="handleConfirm">{{ $t('delete') }}</button>
        </div>
    </Dialog>
</template>

<style scoped></style>