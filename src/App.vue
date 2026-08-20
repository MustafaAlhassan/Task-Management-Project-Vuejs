<script setup>
import Header from './components/Header.vue';
import AddNewTask from './components/AddNewTask.vue';
import TaskTable from './components/TaskTable.vue';
import { ref, watch, onMounted } from 'vue';

const tasks = ref([])

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
            console.error("Failed to Loaded Data from Local Storage:", e)
        }
    }
})

function addNewTaskToList(newTask) {
    tasks.value.push(newTask)
}

function deleteTaskFromList(id) {
    tasks.value = tasks.value.filter(task => task.id !== id)
}
</script>

<template>
    <Header />
    <div class="container">
        <AddNewTask @add-task="addNewTaskToList" />
        <div class="mb-5"></div>
        <TaskTable :tasks="tasks" @delete-task="deleteTaskFromList" />
    </div>
</template>

<style scoped></style>
