<script setup>
import Header from './components/Header.vue';
import AddNewTask from './components/AddNewTask.vue';
import TaskTable from './components/TaskTable.vue';
import TranslateToggleButton from './components/TranslateToggleButton.vue';
import ThemeToggleButton from './components/ThemeToggleButton.vue';
import Filter from './components/Filter.vue';
import { ref, watch, onMounted, computed } from 'vue';

const tasks = ref([])
const Priorities = ["High", "Medium", "Low"]

const activePriorityFilter = ref('')
const activeSortOrder = ref('')


watch(
    tasks,
    (newTasks) => {
        localStorage.setItem('my_tasks', JSON.stringify(newTasks))
    },
    { deep: true }
)

onMounted(() => {
    const savedTasks = localStorage.getItem('my_tasks')
    if (savedTasks) {
        try {
            tasks.value = JSON.parse(savedTasks)
        } catch (e) {
            console.error("Failed to Load Data from Local Storage:", e)
        }
    }
})

function addNewTaskToList(newTask) {
    tasks.value.push(newTask)
}

function deleteTaskFromList(id) {
    tasks.value = tasks.value.filter(task => task.id !== id)
}

function editTaskInList(updatedTask) {
    tasks.value = tasks.value.map(task =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    )
}

function makeTaskCompleted(completedTask) {
    tasks.value = tasks.value.map(task => {
        if (task.id === completedTask.id) {
            return { ...task, isCompleted: !task.isCompleted }
        }
        return task;
    })
}

function handlePrioritySelected(priority) {
    activePriorityFilter.value = priority
}

function handleSortChanged(sortOrder) {
    activeSortOrder.value = sortOrder
}

const filteredTasks = computed(() => {
    let result = [...tasks.value]
    if (activePriorityFilter.value) {
        result = result.filter(task => task.priority === activePriorityFilter.value)
    }
    return result.sort((a, b) => {
        const dateA = new Date(a.dueDate)
        const dateB = new Date(b.dueDate)

        if (activeSortOrder.value === 'asc') {
            return dateA - dateB
        } else {
            return dateB - dateA
        }
    })
})
</script>

<template>
    <Header />
    <div class="container">
        <div class="d-flex justify-content-end gap-2 mb-2">
            <ThemeToggleButton />
            <TranslateToggleButton />
        </div>
        <AddNewTask @add-task="addNewTaskToList" :Priorities="Priorities" />
        <Filter class="mb-3" :Priorities="Priorities" @priority-selected="handlePrioritySelected"
            @sort-changed="handleSortChanged" />
        <TaskTable :tasks="filteredTasks" @delete-task="deleteTaskFromList" @edit-task="editTaskInList"
            @complete-task="makeTaskCompleted" :Priorities="Priorities" />
    </div>
</template>

<style scoped></style>