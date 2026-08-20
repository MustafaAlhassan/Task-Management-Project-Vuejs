<script setup>

const emit = defineEmits(['close', 'confirm-delete'])

function handleConfirm() {
    emit('confirm-delete')
}
</script>

<template>
    <div class="delete-modal-overlay">
        <div class="modal d-block" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
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
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.delete-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}

.modal {
    display: flex !important;
    align-items: center;
    justify-content: center;
}

.modal-dialog {
    width: 100%;
    max-width: 450px;
    margin: 0 1rem;
}
</style>