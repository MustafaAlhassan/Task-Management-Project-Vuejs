<script setup>
import Header from './components/Header.vue';
import AddNewTask from './components/AddNewTask.vue';
import TaskTable from './components/TaskTable.vue';
</script>

<template>
    <Header />
    <div class="container">
        <AddNewTask />
        <div class="mb-5"></div>
        <TaskTable />
    </div>
</template>

<style scoped></style>
