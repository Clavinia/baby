<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from './i18n/useI18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import PrintButton from './components/PrintButton.vue'
import FoodBoard from './components/FoodBoard.vue'

// Declare Ko-fi widget type
declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, options: Record<string, string>) => void
    }
  }
}

const { t, currentLanguage } = useI18n()

const foodBoardRef = ref<InstanceType<typeof FoodBoard> | null>(null)

const currentYear = new Date().getFullYear()

const handlePrint = () => {
  if (foodBoardRef.value) {
    foodBoardRef.value.stopEditingName()
  }
}

// Update document title and meta tags when language changes
watch(
  () => t.value.meta,
  (meta) => {
    document.title = meta.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description)
    }
    document.documentElement.lang = currentLanguage.value
  },
  { immediate: true }
)

// Initialize Ko-fi widget
onMounted(() => {
  // Load Ko-fi overlay script
  const script = document.createElement('script')
  script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
  script.async = true
  script.onload = () => {
    // Initialize the widget after script loads
    if (window.kofiWidgetOverlay) {
      window.kofiWidgetOverlay.draw('clavinia', {
        'type': 'floating-chat',
        'floating-chat.donateButton.text': 'Apóyame',
        'floating-chat.donateButton.background-color': '#ff5f5f',
        'floating-chat.donateButton.text-color': '#fff'
      })
    }
  }
  document.head.appendChild(script)
})
</script>

<template>
  <div class="relative min-h-screen bg-slate-100 py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 print:py-0 print:px-0 print:w-[297mm] print:h-[210mm] print:min-h-0 print:overflow-hidden">
    <PrintButton :on-print="handlePrint" />

    <!-- Header -->
    <header class="mx-auto w-full max-w-[1400px] mb-4 sm:mb-6 md:mb-8 print:hidden">
      <!-- Language switcher in corner -->
      <div class="flex justify-center md:justify-end mb-4 sm:mb-6">
        <LanguageSwitcher />
      </div>
      <!-- Title spanning full width -->
      <div class="text-left px-4 sm:px-6 md:px-8">
        <h1 class="text-center text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 w-full">{{ t.header.title }}</h1>
        <p class="text-xs sm:text-sm text-slate-600 max-w-[1400px] mx-auto mb-2 sm:mb-3">
          {{ t.header.description }}
        </p>
        <p class="text-[10px] sm:text-xs text-slate-600 max-w-[1400px] mx-auto">
          <strong>{{ t.header.disclaimerLabel }}:</strong> {{ t.header.disclaimer }}
        </p>
      </div>
    </header>

    <FoodBoard ref="foodBoardRef" />

    <!-- Footer -->
    <footer class="mt-4 sm:mt-6 md:mt-8 text-center text-xs sm:text-sm text-slate-500 print:hidden px-4">
      <p>{{ t.footer.madeWith }} <a href="https://cv.clavinia.eu" target="_blank" class="text-slate-800 hover:text-sky-600">{{ t.footer.by }}</a>, {{ currentYear }}. {{ t.footer.rights }}</p> 
    </footer>
  </div>
</template>
