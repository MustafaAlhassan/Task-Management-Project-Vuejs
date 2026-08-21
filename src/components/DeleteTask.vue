<script setup>
import Dialog from './Dialog.vue';

const emit = defineEmits(['close', 'confirm-delete'])

function handleConfirm() {
    emit('confirm-delete')
}
</script>

<template>
    <Dialog>
        <div class="modal-header">
            <h5 class="modal-title text-danger">Confirm Delete</h5>
            <button type="button" class="btn-close" @click="emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Are you sure you want to delete this task?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="emit('close')">Cancel</button>
            <button type="button" class="btn btn-danger" @click="handleConfirm">Delete</button>
        </div>
    </Dialog>
</template>

<style scoped></style>