<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'
import { useI18n } from '../i18n/useI18n'
import { slugify } from '../utils/slugify'

type BoardSection = {
  id: string
  title: string
  icon: string
  accent: {
    badge: string
    dot: string
  }
  items: string[]
}

const { t } = useI18n()

const exposureSlots = 5

// Create sections dynamically from translations
const sideSections = computed<BoardSection[]>(() => [
  {
    id: 'alergenos',
    title: t.value.sections.alergenos,
    icon: '⚠️',
    accent: {
      badge: 'bg-rose-50 text-rose-700 border-rose-100',
      dot: 'bg-rose-500 border-rose-500',
    },
    items: t.value.foodItems.alergenos,
  },
  {
    id: 'otros-sabores',
    title: t.value.sections.otrosSabores,
    icon: '🌿',
    accent: {
      badge: 'bg-violet-50 text-violet-700 border-violet-100',
      dot: 'bg-violet-500 border-violet-500',
    },
    items: t.value.foodItems.otrosSabores,
  },
])

const mainSections = computed<BoardSection[]>(() => [
  {
    id: 'frutas',
    title: t.value.sections.frutas,
    icon: '🍏',
    accent: {
      badge: 'bg-lime-50 text-lime-700 border-lime-100',
      dot: 'bg-lime-500 border-lime-500',
    },
    items: t.value.foodItems.frutas,
  },
  {
    id: 'vegetales',
    title: t.value.sections.vegetales,
    icon: '🥦',
    accent: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      dot: 'bg-emerald-500 border-emerald-500',
    },
    items: t.value.foodItems.vegetales,
  },
  {
    id: 'proteinas',
    title: t.value.sections.proteinas,
    icon: '🥩',
    accent: {
      badge: 'bg-pink-50 text-pink-700 border-pink-100',
      dot: 'bg-pink-500 border-pink-500',
    },
    items: t.value.foodItems.proteinas,
  },
  {
    id: 'hidratos',
    title: t.value.sections.hidratos,
    icon: '🥖',
    accent: {
      badge: 'bg-amber-50 text-amber-700 border-amber-100',
      dot: 'bg-amber-500 border-amber-500',
    },
    items: t.value.foodItems.hidratos,
  },
  {
    id: 'lacteos',
    title: t.value.sections.lacteos,
    icon: '🥛',
    accent: {
      badge: 'bg-sky-50 text-sky-700 border-sky-100',
      dot: 'bg-sky-500 border-sky-500',
    },
    items: t.value.foodItems.lacteos,
  },
])

const exposures = useLocalStorage<Record<string, number>>(
  'primeros-alimentos-exposures',
  {},
  { serializer: StorageSerializers.object }
)

const babyName = useLocalStorage('primeros-alimentos-nombre', '')
const notes = useLocalStorage('primeros-alimentos-notas', '')
const attemptTracker = useLocalStorage('primeros-alimentos-intentos', 0)

const isEditingName = ref(false)
const nameInputRef = ref<HTMLInputElement | null>(null)

const startEditingName = () => {
  isEditingName.value = true
  nextTick(() => {
    nameInputRef.value?.focus()
    nameInputRef.value?.select()
  })
}

const stopEditingName = () => {
  isEditingName.value = false
}

const getFillCount = (sectionId: string, label: string) => {
  const key = slugify(sectionId, label)
  return exposures.value[key] ?? 0
}

const toggleCircle = (sectionId: string, label: string, index: number) => {
  const key = slugify(sectionId, label)
  const current = exposures.value[key] ?? 0
  exposures.value[key] = current === index + 1 ? index : index + 1
}

const toggleAttempt = (index: number) => {
  attemptTracker.value = attemptTracker.value === index + 1 ? index : index + 1
}

const alergenosSection = computed(() => sideSections.value[0]!)
const otrosSaboresSection = computed(() => sideSections.value[1]!)
const frutasSection = computed(() => mainSections.value[0]!)
const vegetalesSection = computed(() => mainSections.value[1]!)
const proteinasSection = computed(() => mainSections.value[2]!)
const hidratosSection = computed(() => mainSections.value[3]!)
const lacteosSection = computed(() => mainSections.value[4]!)

// Expose method to stop editing name when printing
defineExpose({
  stopEditingName: () => {
    isEditingName.value = false
  }
})
</script>

<template>
  <main class="mx-auto w-full max-w-[1400px] print:max-w-[297mm] print:w-[297mm] print:mx-0">
    <section
      id="printable-board"
      class="rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-board ring-1 ring-slate-100 print:rounded-none print:shadow-none print:ring-0 print:p-1 print:w-[297mm] print:min-h-[210mm] print:max-h-[210mm] print:h-[210mm] relative"
    >
      <!-- Watermark - solo visible en impresión -->
      <div class="hidden print:block absolute bottom-1 left-1 text-[8px] text-slate-300 font-light italic z-0 pointer-events-none">
        {{ t.footer.madeWith }} Clavinia
      </div>
      <!-- Grid principal: Layout horizontal con múltiples columnas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 print:grid-cols-4 print:gap-1 items-start">
        <!-- Columna 1: Header y Frutas -->
        <div class="flex flex-col gap-3 sm:gap-4 print:gap-1 self-start">
          <!-- Header -->
          <div class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1 text-center">
            <p class="text-xs uppercase tracking-[0.6em] text-slate-400 print:text-[7px] print:tracking-wider">{{ t.board.title }}</p>
            <h1 class="mt-2 text-xl font-semibold text-slate-800 print:text-xs print:mt-0.5">{{ t.board.subtitle }}</h1>
            <div class="mt-3 print:mt-2">
              <div
                v-if="!isEditingName"
                @click="startEditingName"
                class="cursor-text border-b-2 border-slate-300 pb-1 text-center transition hover:border-sky-400 print:border-slate-400 print:pb-0.5 print:cursor-default"
              >
                <span
                  v-if="babyName"
                  class="text-sm font-medium text-slate-800 print:text-[10px] print:font-semibold"
                >
                  {{ babyName }}
                </span>
                <span
                  v-else
                  class="text-sm font-medium text-slate-400 print:text-[10px] print:font-semibold print:text-slate-300"
                >
                  {{ t.board.namePlaceholder }}
                </span>
              </div>
              <input
                v-else
                ref="nameInputRef"
                v-model="babyName"
                type="text"
                @blur="stopEditingName"
                @keydown.enter="stopEditingName"
                @keydown.escape="stopEditingName"
                class="w-full border-b-2 border-sky-500 bg-transparent pb-1 text-center text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none print:text-[10px] print:placeholder:text-slate-300"
                :placeholder="t.board.namePlaceholder"
              />
            </div>
            <p class="mt-3 text-xs text-slate-500 print:text-[6px] print:mt-0.5">
              {{ t.board.instruction }}
            </p>
          </div>
          <!-- Frutas -->
          <div class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1">
            <div class="mb-3 flex items-center justify-center gap-2 print:mb-0.5">
              <span class="text-lg print:text-[10px] leading-none">{{ frutasSection.icon }}</span>
              <span
                class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide print:px-1 print:py-0.5 print:text-[7px] print:leading-none"
                :class="frutasSection.accent.badge"
              >
                {{ frutasSection.title }}
              </span>
            </div>
            <ul class="space-y-2 print:space-y-0">
              <li
                v-for="item in frutasSection.items"
                :key="item"
                class="flex items-center justify-between gap-3 print:gap-1"
              >
                <span class="text-sm font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
                <div class="flex gap-1 shrink-0 print:gap-0.5">
                  <button
                    v-for="slot in exposureSlots"
                    :key="`${frutasSection.id}-${item}-${slot}`"
                    type="button"
                    class="h-4 w-4 rounded-full border transition print:pointer-events-none print:h-2 print:w-2"
                    :class="[
                      getFillCount(frutasSection.id, item) >= slot
                        ? frutasSection.accent.dot
                        : 'border-slate-200 bg-white hover:border-slate-400',
                    ]"
                    @click="toggleCircle(frutasSection.id, item, slot - 1)"
                    :aria-label="`${t.buttons.print === 'Print' ? 'Mark' : 'Marcar'} ${frutasSection.title} - ${item} ${t.buttons.print === 'Print' ? 'attempt' : 'intento'} ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Columna 2: Vegetales y Hidratos -->
        <div class="flex flex-col gap-3 sm:gap-4 print:gap-1 self-start">
          <!-- Vegetales -->
          <div class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1">
            <div class="mb-3 flex items-center justify-center gap-2 print:mb-0.5">
              <span class="text-lg print:text-[10px] leading-none">{{ vegetalesSection.icon }}</span>
              <span
                class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide print:px-1 print:py-0.5 print:text-[7px] print:leading-none"
                :class="vegetalesSection.accent.badge"
              >
                {{ vegetalesSection.title }}
              </span>
            </div>
            <ul class="space-y-2 print:space-y-0">
              <li
                v-for="item in vegetalesSection.items"
                :key="item"
                class="flex items-center justify-between gap-3 print:gap-1"
              >
                <span class="text-sm font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
                <div class="flex gap-1 shrink-0 print:gap-0.5">
                  <button
                    v-for="slot in exposureSlots"
                    :key="`${vegetalesSection.id}-${item}-${slot}`"
                    type="button"
                    class="h-4 w-4 rounded-full border transition print:pointer-events-none print:h-2 print:w-2"
                    :class="[
                      getFillCount(vegetalesSection.id, item) >= slot
                        ? vegetalesSection.accent.dot
                        : 'border-slate-200 bg-white hover:border-slate-400',
                    ]"
                    @click="toggleCircle(vegetalesSection.id, item, slot - 1)"
                    :aria-label="`${t.buttons.print === 'Print' ? 'Mark' : 'Marcar'} ${vegetalesSection.title} - ${item} ${t.buttons.print === 'Print' ? 'attempt' : 'intento'} ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </div>
          <!-- Hidratos -->
          <div class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1">
            <div class="mb-3 flex items-center justify-center gap-2 print:mb-0.5">
              <span class="text-lg print:text-[10px] leading-none">{{ hidratosSection.icon }}</span>
              <span
                class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide print:px-1 print:py-0.5 print:text-[7px] print:leading-none"
                :class="hidratosSection.accent.badge"
              >
                {{ hidratosSection.title }}
              </span>
            </div>
            <ul class="space-y-2 print:space-y-0">
              <li
                v-for="item in hidratosSection.items"
                :key="item"
                class="flex items-center justify-between gap-3 print:gap-1"
              >
                <span class="text-sm font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
                <div class="flex gap-1 shrink-0 print:gap-0.5">
                  <button
                    v-for="slot in exposureSlots"
                    :key="`${hidratosSection.id}-${item}-${slot}`"
                    type="button"
                    class="h-4 w-4 rounded-full border transition print:pointer-events-none print:h-2 print:w-2"
                    :class="[
                      getFillCount(hidratosSection.id, item) >= slot
                        ? hidratosSection.accent.dot
                        : 'border-slate-200 bg-white hover:border-slate-400',
                    ]"
                    @click="toggleCircle(hidratosSection.id, item, slot - 1)"
                    :aria-label="`${t.buttons.print === 'Print' ? 'Mark' : 'Marcar'} ${hidratosSection.title} - ${item} ${t.buttons.print === 'Print' ? 'attempt' : 'intento'} ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Columna 3: Proteínas y Lácteos -->
        <div class="flex flex-col gap-3 sm:gap-4 print:gap-1 self-start">
          <section
            v-for="section in [proteinasSection, lacteosSection]"
            :key="section.id"
            class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1"
          >
            <div class="mb-3 flex items-center justify-center gap-2 print:mb-0.5">
              <span class="text-lg print:text-[10px] leading-none">{{ section.icon }}</span>
              <span
                class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide print:px-1 print:py-0.5 print:text-[7px] print:leading-none"
                :class="section.accent.badge"
              >
                {{ section.title }}
              </span>
            </div>
            <ul class="space-y-2 print:space-y-0">
              <li
                v-for="item in section.items"
                :key="item"
                class="flex items-center justify-between gap-3 print:gap-1"
              >
                <span class="text-sm font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
                <div class="flex gap-1 shrink-0 print:gap-0.5">
                  <button
                    v-for="slot in exposureSlots"
                    :key="`${section.id}-${item}-${slot}`"
                    type="button"
                    class="h-4 w-4 rounded-full border transition print:pointer-events-none print:h-2 print:w-2"
                    :class="[
                      getFillCount(section.id, item) >= slot
                        ? section.accent.dot
                        : 'border-slate-200 bg-white hover:border-slate-400',
                    ]"
                    @click="toggleCircle(section.id, item, slot - 1)"
                    :aria-label="`${t.buttons.print === 'Print' ? 'Mark' : 'Marcar'} ${section.title} - ${item} ${t.buttons.print === 'Print' ? 'attempt' : 'intento'} ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>

        <!-- Columna 4: Alérgenos y Otros Sabores -->
        <div class="flex flex-col gap-3 sm:gap-4 print:gap-1 self-start">
          <!-- Alérgenos -->
          <div class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1">
            <div class="mb-3 flex items-center justify-center gap-2 print:mb-0.5">
              <span class="text-lg print:text-[10px] leading-none">{{ alergenosSection.icon }}</span>
              <span
                class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide print:px-1 print:py-0.5 print:text-[7px] print:leading-none"
                :class="alergenosSection.accent.badge"
              >
                {{ alergenosSection.title }}
              </span>
            </div>
            <ul class="space-y-2 print:space-y-0">
              <li
                v-for="item in alergenosSection.items"
                :key="item"
                class="flex items-center justify-between gap-3 print:gap-1"
              >
                <span class="text-sm font-medium text-slate-600 print:text-[7px]">{{ item }}</span>
                <div class="flex gap-1 shrink-0 print:gap-0.5">
                  <button
                    v-for="slot in exposureSlots"
                    :key="`${alergenosSection.id}-${item}-${slot}`"
                    type="button"
                    class="h-4 w-4 rounded-full border transition print:pointer-events-none print:h-2 print:w-2"
                    :class="[
                      getFillCount(alergenosSection.id, item) >= slot
                        ? alergenosSection.accent.dot
                        : 'border-slate-200 bg-white hover:border-slate-400',
                    ]"
                    @click="toggleCircle(alergenosSection.id, item, slot - 1)"
                    :aria-label="`${t.buttons.print === 'Print' ? 'Mark' : 'Marcar'} ${alergenosSection.title} - ${item} ${t.buttons.print === 'Print' ? 'attempt' : 'intento'} ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </div>

          <!-- Otros Sabores -->
          <div class="rounded-xl border border-slate-200 p-3 sm:p-4 print:p-1">
            <div class="mb-3 flex items-center justify-center gap-2 print:mb-0.5">
              <span class="text-lg print:text-[10px] leading-none">{{ otrosSaboresSection.icon }}</span>
              <span
                class="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide print:px-1 print:py-0.5 print:text-[7px] print:leading-none"
                :class="otrosSaboresSection.accent.badge"
              >
                {{ otrosSaboresSection.title }}
              </span>
            </div>
            <ul class="space-y-2 print:space-y-0">
              <li
                v-for="item in otrosSaboresSection.items"
                :key="item"
                class="flex items-center justify-between gap-3 print:gap-1"
              >
                <span class="text-sm font-medium text-slate-600 print:text-[7px]">{{ item }}</span>
                <div class="flex gap-1 shrink-0 print:gap-0.5">
                  <button
                    v-for="slot in exposureSlots"
                    :key="`${otrosSaboresSection.id}-${item}-${slot}`"
                    type="button"
                    class="h-4 w-4 rounded-full border transition print:pointer-events-none print:h-2 print:w-2"
                    :class="[
                      getFillCount(otrosSaboresSection.id, item) >= slot
                        ? otrosSaboresSection.accent.dot
                        : 'border-slate-200 bg-white hover:border-slate-400',
                    ]"
                    @click="toggleCircle(otrosSaboresSection.id, item, slot - 1)"
                    :aria-label="`${t.buttons.print === 'Print' ? 'Mark' : 'Marcar'} ${otrosSaboresSection.title} - ${item} ${t.buttons.print === 'Print' ? 'attempt' : 'intento'} ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


