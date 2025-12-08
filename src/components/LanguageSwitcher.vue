<script setup lang="ts">
import { useI18n } from '../i18n/useI18n'

const { currentLanguage, switchLanguage } = useI18n()
</script>

<template>
  <div class="inline-flex rounded-full bg-slate-200 shadow-sm ring-1 ring-slate-300 print:hidden">
    <button
      @click="currentLanguage === 'es' ? null : switchLanguage()"
      :class="[
        'px-3 py-1 text-[10px] font-medium rounded-full transition-all duration-200 flex-1 min-w-[60px]',
        currentLanguage === 'es'
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-600 hover:text-slate-800'
      ]"
      :aria-label="currentLanguage === 'es' ? 'Español (activo)' : 'Cambiar a Español'"
    >
      Español
    </button>
    <button
      @click="currentLanguage === 'en' ? null : switchLanguage()"
      :class="[
        'px-3 py-1 text-[10px] font-medium rounded-full transition-all duration-200 flex-1 min-w-[60px]',
        currentLanguage === 'en'
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-600 hover:text-slate-800'
      ]"
      :aria-label="currentLanguage === 'en' ? 'English (active)' : 'Switch to English'"
    >
      English
    </button>
  </div>
</template>

