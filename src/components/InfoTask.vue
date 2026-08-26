<script setup>
import Dialog from './Dialog.vue';

defineProps({
    task: {
        type: Object,
        default: () => ({ description: '' })
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <Dialog>
        <div class="modal-body">
            <h4 class="text-primary">{{ $t('taskDescription') }}:</h4>
            <p>{{ task?.description || '---' }}</p>
        </div>
        <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" @click="emit('close')">
                {{ $t('cancel') }}
            </button>
        </div>
    </Dialog>
</template>