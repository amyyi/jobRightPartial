import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ZH_COMMON from './locales/zh/common'

const ns = ['common']

export enum LANG_OPTION {
  ZH = 'zh',
}

type Resources = Record<
  LANG_OPTION,
  {
    key: LANG_OPTION
    common: Record<string, string>
  }
>

export const resources: Resources = {
  zh: {
    key: LANG_OPTION.ZH,
    common: ZH_COMMON,
  },
}

export const defaultLang = LANG_OPTION.ZH

i18n.use(initReactI18next).init({
  resources,
  ns,
  defaultNS: ns[0],
  lng: defaultLang,
  fallbackLng: defaultLang,
  interpolation: {
    escapeValue: false,
  },
})
