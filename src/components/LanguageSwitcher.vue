<script setup lang="ts">
import { useI18n } from '../i18n/useI18n'

const { currentLanguage, switchLanguage } = useI18n()
</script>

<template>
  <div class="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 print:hidden">
    <div class="inline-flex rounded-full bg-slate-200 p-0.5 shadow-sm ring-1 ring-slate-300">
      <button
        @click="currentLanguage === 'es' ? null : switchLanguage()"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
          currentLanguage === 'es'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-800'
        ]"
        :aria-label="currentLanguage === 'es' ? 'Español (activo)' : 'Cambiar a Español'"
      >
        Español
      </button>
      <button
        @click="currentLanguage === 'en' ? null : switchLanguage()"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
          currentLanguage === 'en'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-slate-600 hover:text-slate-800'
        ]"
        :aria-label="currentLanguage === 'en' ? 'English (active)' : 'Switch to English'"
      >
        English
      </button>
    </div>
  </div>
</template>

