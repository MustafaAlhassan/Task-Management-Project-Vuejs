<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// استخدام computed لتحديث الترجمات تلقائياً عند تغيير اللغة
const Priorities = computed(() => [
    { key: 'High', label: t('high') },
    { key: 'Medium', label: t('medium') },
    { key: 'Low', label: t('low') }
])

const taskData = defineModel({
    default: () => ({ task: '', dueDate: '', priority: '' })
})
</script>

<template>
    <div class="mb-3">
        <label for="TaskName" class="form-label fw-bold">{{ $t('taskName') }}:</label>
        <div>
            <input v-model="taskData.task" type="text" class="form-control border border-success" id="TaskName">
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <label for="dueDate" class="form-label fw-bold">{{ $t('deadline') }}:</label>
            <div class="input-group" dir="ltr">
                <span class="input-group-text">
                    <i class="bi bi-calendar-event"></i>
                </span>
                <input v-model="taskData.dueDate" type="date" id="dueDate" class="form-control pointer-cursor"
                    @click="$event.target.showPicker()">
            </div>
        </div>
        <div class="col-6">
            <label for="Priority" class="form-label fw-bold">{{ $t('priority') }}:</label>
            <select v-model="taskData.priority" class="form-select" id="Priority">
                <option value="" disabled selected>{{ $t('selectPriority') }}</option>
                <option v-for="item in Priorities" :key="item.key" :value="item.key" :class="{
                    'text-danger': item.key === 'High',
                    'text-warning': item.key === 'Medium',
                    'text-info': item.key === 'Low'
                }">
                    {{ item.label }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.pointer-cursor {
    cursor: pointer;
}
</style>