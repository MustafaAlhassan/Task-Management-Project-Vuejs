<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedPriority = ref('')
const selectedSortOrder = ref('asc')

const Priorities = computed(() => [
    { key: 'High', label: t('high') },
    { key: 'Medium', label: t('medium') },
    { key: 'Low', label: t('low') }
])

const emit = defineEmits(['priority-selected', 'sort-changed'])

function handlePriorityChange() {
    emit('priority-selected', selectedPriority.value)
}

function handleSortChange() {
    emit('sort-changed', selectedSortOrder.value)
}
</script>

<template>
    <div class="d-flex flex-wrap align-items-center gap-3">
        <div class="d-flex align-items-center gap-2">
            <label for="PriorityFilter" class="form-label fw-bold m-0 text-nowrap">{{ $t('priority') }}:</label>
            <select id="PriorityFilter" v-model="selectedPriority" @change="handlePriorityChange" class="form-select">
                <option value="">{{ $t('allPriority') }}</option>
                <option v-for="item in Priorities" :key="item.key" :value="item.key" :class="{
                    'text-danger': item.key === 'High',
                    'text-warning': item.key === 'Medium',
                    'text-info': item.key === 'Low'
                }">
                    {{ item.label }}
                </option>
            </select>
        </div>

        <div class="d-flex align-items-center gap-2">
            <label for="DateSort" class="form-label fw-bold m-0 text-nowrap">{{ $t('sortByDate') }}:</label>
            <select id="DateSort" v-model="selectedSortOrder" @change="handleSortChange" class="form-select">
                <option value="asc">{{ $t('oldestFirst') }}</option>
                <option value="desc">{{ $t('newestFirst') }}</option>
            </select>
        </div>
    </div>
</template>