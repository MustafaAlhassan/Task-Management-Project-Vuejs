<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('user_theme', theme)
    isDark.value = theme === 'dark'
}

function toggleTheme() {
    const nextTheme = isDark.value ? 'light' : 'dark'
    applyTheme(nextTheme)
}

onMounted(() => {
    const savedTheme = localStorage.getItem('user_theme')
    if (savedTheme) {
        applyTheme(savedTheme)
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        applyTheme(prefersDark ? 'dark' : 'light')
    }
})
</script>

<template>
    <button @click="toggleTheme" type="button"
        class="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 rounded-pill">
        <i :class="isDark ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill text-primary'"></i>
        <span class="fw-bold">{{ isDark ? $t('lightMode') : $t('darkMode') }}</span>
    </button>
</template>