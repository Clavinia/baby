<script setup lang="ts">
import { useI18n } from '../i18n/useI18n'

const { t } = useI18n()

const props = defineProps<{
  onPrint?: () => void
}>()

const printPage = () => {
  props.onPrint?.()
  window.print()
}
</script>

<template>
  <button
    @click="printPage"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full bg-purple-600 p-3 sm:p-4 text-white shadow-lg transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 print:hidden"
    :aria-label="t.buttons.print"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
      />
    </svg>
  </button>
</template>

