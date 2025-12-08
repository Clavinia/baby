import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Language, Translations } from './translations'
import { translations } from './translations'

export function useI18n() {
  const route = useRoute()
  const router = useRouter()

  const currentLanguage = computed<Language>(() => {
    const lang = route.path.includes('/first-food') ? 'en' : 'es'
    return lang
  })

  const t = computed<Translations>(() => translations[currentLanguage.value])

  const switchLanguage = () => {
    const newLang: Language = currentLanguage.value === 'es' ? 'en' : 'es'
    const newPath = newLang === 'en' ? '/first-food' : '/primeros-alimentos'
    router.push(newPath)
  }

  const getOtherLanguage = (): Language => {
    return currentLanguage.value === 'es' ? 'en' : 'es'
  }

  return {
    currentLanguage,
    t,
    switchLanguage,
    getOtherLanguage,
  }
}



