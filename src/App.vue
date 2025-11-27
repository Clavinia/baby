<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { StorageSerializers, useLocalStorage } from '@vueuse/core'

// Declare Ko-fi widget type
declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, options: Record<string, string>) => void
    }
  }
}

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

const exposureSlots = 5

const sideSections: BoardSection[] = [
  {
    id: 'alergenos',
    title: 'Alérgenos',
    icon: '⚠️',
    accent: {
      badge: 'bg-rose-50 text-rose-700 border-rose-100',
      dot: 'bg-rose-500 border-rose-500',
    },
    items: ['Huevos', 'Soja', 'Pescado', 'Mariscos', 'Kiwi', 'Sésamo', 'Leche', 'Nuez', 'Cacahuete', 'Trigo'],
  },
  {
    id: 'otros-sabores',
    title: 'Otros Sabores',
    icon: '🌿',
    accent: {
      badge: 'bg-violet-50 text-violet-700 border-violet-100',
      dot: 'bg-violet-500 border-violet-500',
    },
    items: ['Aceite de coco', 'Canela', 'Jengibre', 'Nuez moscada', 'Orégano', 'Perejil', 'Pesto', 'Romero'],
  },
]

const mainSections: BoardSection[] = [
  {
    id: 'frutas',
    title: 'Frutas',
    icon: '🍏',
    accent: {
      badge: 'bg-lime-50 text-lime-700 border-lime-100',
      dot: 'bg-lime-500 border-lime-500',
    },
    items: [
      'Manzana',
      'Albaricoque',
      'Aguacate',
      'Plátano',
      'Banana',
      'Zarzamora',
      'Mora',
      'Arándano',
      'Higo',
      'Uva',
      'Kiwi',
      'Limón',
      'Lima',
      'Mandarina',
      'Mango',
      'Melón',
      'Nectarina',
      'Naranja',
      'Papaya',
      'Melocotón',
      'Pera',
      'Piña',
      'Ciruelo rojo',
      'Ciruelo morado',
      'Frambuesa',
      'Fresa',
      'Uvas pasas',
      'Tomate',
    ],
  },
  {
    id: 'hidratos',
    title: 'Hidratos',
    icon: '🥖',
    accent: {
      badge: 'bg-amber-50 text-amber-700 border-amber-100',
      dot: 'bg-amber-500 border-amber-500',
    },
    items: ['Cebada', 'Pan', 'Cuscús', 'Pan de molde', 'Avena', 'Pasta', 'Quinoa', 'Arroz', 'Pastel de arroz', 'Tortita'],
  },
  {
    id: 'proteinas',
    title: 'Proteína',
    icon: '🥩',
    accent: {
      badge: 'bg-pink-50 text-pink-700 border-pink-100',
      dot: 'bg-pink-500 border-pink-500',
    },
    items: [
      'Mant. almendra',
      'Alubias',
      'Ternera',
      'Pollo',
      'Garbanzos',
      'Huevo',
      'Hummus',
      'Cordero',
      'Lentejas',
      'Mant. cacahuete',
      'Cerdo',
      'Gambas',
      'Salmón',
      'Tofu',
      'Atún',
      'Pavo',
      'Pescado blanco',
    ],
  },
  {
    id: 'vegetales',
    title: 'Vegetales',
    icon: '🥦',
    accent: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      dot: 'bg-emerald-500 border-emerald-500',
    },
    items: [
      'Espárragos',
      'Remolacha',
      'Brócoli',
      'Pimiento',
      'Col',
      'Zanahoria',
      'Coliflor',
      'Apio',
      'Maíz',
      'Pepino',
      'Berenjena',
      'Ajo',
      'Judía verde',
      'Champiñón',
      'Cebolla',
      'Zanahoria blanca',
      'Guisantes',
      'Patata',
      'Calabaza',
      'Espinacas',
      'Batata',
      'Calabacín',
    ],
  },
  {
    id: 'lacteos',
    title: 'Lácteos',
    icon: '🥛',
    accent: {
      badge: 'bg-sky-50 text-sky-700 border-sky-100',
      dot: 'bg-sky-500 border-sky-500',
    },
    items: ['Queso cheddar', 'Queso cottage', 'Q. parmesano', 'Natillas', 'Leche', 'Ricotta', 'Crema agria', 'Yogur'],
  },
]

const slugify = (sectionId: string, label: string) =>
  `${sectionId}-${label}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

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

const alergenosSection = computed(() => sideSections[0]!)
const otrosSaboresSection = computed(() => sideSections[1]!)
const frutasSection = computed(() => mainSections[0]!)

const printPage = () => {
  // Asegurar que el nombre se muestre antes de imprimir
  isEditingName.value = false
  
  // Abrir el diálogo de impresión del navegador
  window.print()
}

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
  <div class="relative min-h-screen bg-slate-100 py-8 px-8 print:py-0 print:px-0 print:w-[297mm] print:h-[210mm] print:min-h-0 print:overflow-hidden">
    <!-- Botón flotante de imprimir -->
    <button
      @click="printPage"
      class="fixed bottom-6 right-6 z-50 rounded-full bg-purple-600 p-4 text-white shadow-lg transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 print:hidden"
      aria-label="Imprimir"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
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

    <main class="mx-auto w-full max-w-[1400px] print:max-w-[297mm] print:w-[297mm] print:mx-0">
      <section
        id="printable-board"
        class="rounded-2xl bg-white p-8 shadow-board ring-1 ring-slate-100 print:rounded-none print:shadow-none print:ring-0 print:p-1 print:w-[297mm] print:min-h-[210mm] print:max-h-[210mm] print:h-[210mm]"
      >
        <!-- Grid principal: Layout horizontal con múltiples columnas -->
        <div class="grid grid-cols-4 gap-4 print:gap-1 items-start">
          <!-- Columna 1: Header, Alérgenos y Otros Sabores apilados -->
          <div class="flex flex-col gap-4 print:gap-1 self-start">
            <!-- Header -->
            <div class="rounded-xl border border-slate-200 p-4 print:p-1 text-center">
              <p class="text-xs uppercase tracking-[0.6em] text-slate-400 print:text-[7px] print:tracking-wider">Primeros alimentos</p>
              <h1 class="mt-2 text-xl font-semibold text-slate-800 print:text-xs print:mt-0.5">Tablón del bebé</h1>
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
                    Nombre
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
                  placeholder="Nombre"
                />
              </div>
              <p class="mt-3 text-xs text-slate-500 print:text-[6px] print:mt-0.5">
                Un alimento marcado 5 veces es considerado como un alimento aceptado.
              </p>
            </div>
            <!-- Alérgenos -->
            <div class="rounded-xl border border-slate-200 p-4 print:p-1">
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
                  <span class="text-xs font-medium text-slate-600 print:text-[7px]">{{ item }}</span>
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
                      :aria-label="`Marcar ${alergenosSection.title} - ${item} intento ${slot}`"
                    />
                  </div>
                </li>
              </ul>
            </div>

            <!-- Otros Sabores -->
            <div class="rounded-xl border border-slate-200 p-4 print:p-1">
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
                  <span class="text-xs font-medium text-slate-600 print:text-[7px]">{{ item }}</span>
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
                      :aria-label="`Marcar ${otrosSaboresSection.title} - ${item} intento ${slot}`"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Columna 2: Frutas -->
          <div class="rounded-xl border border-slate-200 p-4 print:p-1 self-start">
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
                <span class="text-xs font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
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
                    :aria-label="`Marcar ${frutasSection.title} - ${item} intento ${slot}`"
                  />
                </div>
              </li>
            </ul>
          </div>

          <!-- Columna 3: Hidratos y Proteínas -->
          <div class="flex flex-col gap-4 print:gap-1 self-start">
            <section
              v-for="section in mainSections.slice(1, 3)"
              :key="section.id"
              class="rounded-xl border border-slate-200 p-4 print:p-1"
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
                  <span class="text-xs font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
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
                      :aria-label="`Marcar ${section.title} - ${item} intento ${slot}`"
                    />
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <!-- Columna 4: Vegetales y Lácteos -->
          <div class="flex flex-col gap-4 print:gap-1 self-start">
            <section
              v-for="section in mainSections.slice(3)"
              :key="section.id"
              class="rounded-xl border border-slate-200 p-4 print:p-1"
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
                  <span class="text-xs font-medium text-slate-700 print:text-[7px]">{{ item }}</span>
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
                      :aria-label="`Marcar ${section.title} - ${item} intento ${slot}`"
                    />
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
