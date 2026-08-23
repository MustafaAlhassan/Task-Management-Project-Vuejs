<script setup>
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { locale } = useI18n()

function toggleLanguage() {
    const nextLang = locale.value === 'en' ? 'ar' : 'en'
    locale.value = nextLang
    localStorage.setItem('user_lang', nextLang)
}

watchEffect(() => {
    document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale.value
})
</script>

<template>
    <div class="d-flex justify-content-end">
        <button @click="toggleLanguage" type="button"
            class="btn btn-outline-success d-flex align-items-center gap-2 px-3 py-1 rounded-pill shadow-sm">
            <i class="bi bi-translate"></i>
            <span class="fw-bold">
                {{ locale === 'en' ? 'العربية' : 'English' }}
            </span>
        </button>
    </div>
</template>

<style scoped>
button {
    transition: all 0.2s ease-in-out;
}

button:hover {
    transform: scale(1.03);
}
</style>