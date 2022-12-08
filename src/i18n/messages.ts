import flat from 'flat'

import enMessages from './lang/en'

const defaultMessages = {
  en: enMessages,
}

const messages: { en: Record<string, string> } = {
  en: flat(defaultMessages.en, {
    delimiter: '_',
  }),
}

export default messages
