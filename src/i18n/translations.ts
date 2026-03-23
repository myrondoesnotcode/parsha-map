export type Language = 'en' | 'he' | 'es' | 'ru'

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'EN',
  he: 'עב',
  es: 'ES',
  ru: 'RU',
}

export const LANGUAGE_DIR: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  he: 'rtl',
  es: 'ltr',
  ru: 'ltr',
}

interface Translations {
  tabs: { map: string; text: string; history: string; library: string }
  header: { library: string; subscribe: string; showTutorial: string }
  sidebar: { searchPlaceholder: string }
  parsha: {
    selectToBegin: string
    thisWeek: string
    thisWeeksPortion: string
    portionOf: (n: number, total: number) => string
    themes: string
    keyFigures: string
    didYouKnow: string
    historicalContext: string
    inJewishTradition: string
    learnMore: string
    showLess: string
    readCommentary: string
  }
  context: {
    title: string
    selectParsha: string
  }
  library: { title: string; searchPlaceholder: string }
}

const en: Translations = {
  tabs: { map: 'MAP', text: 'TEXT', history: 'HISTORY', library: 'LIBRARY' },
  header: { library: 'Library', subscribe: 'Subscribe', showTutorial: 'Show tutorial' },
  sidebar: { searchPlaceholder: 'Search portions…' },
  parsha: {
    selectToBegin: 'Select a Parsha to begin',
    thisWeek: 'This week',
    thisWeeksPortion: "This week's portion",
    portionOf: (n, total) => `Portion ${n} of ${total}`,
    themes: 'Themes',
    keyFigures: 'Key Figures',
    didYouKnow: 'Did You Know',
    historicalContext: 'Historical Context',
    inJewishTradition: 'In Jewish Tradition',
    learnMore: 'Learn more',
    showLess: 'Show less',
    readCommentary: 'Read commentary by Michael Eisenberg',
  },
  context: {
    title: 'Historical Context',
    selectParsha: 'Select a Parsha to see its historical context',
  },
  library: { title: 'Parsha Library', searchPlaceholder: 'Search parshas…' },
}

const he: Translations = {
  tabs: { map: 'מפה', text: 'טקסט', history: 'היסטוריה', library: 'ספריה' },
  header: { library: 'ספריה', subscribe: 'הירשם', showTutorial: 'הדרכה' },
  sidebar: { searchPlaceholder: 'חיפוש פרשות…' },
  parsha: {
    selectToBegin: 'בחר פרשה להתחיל',
    thisWeek: 'השבוע',
    thisWeeksPortion: 'פרשת השבוע',
    portionOf: (n, total) => `פרשה ${n} מתוך ${total}`,
    themes: 'נושאים',
    keyFigures: 'דמויות מרכזיות',
    didYouKnow: 'האם ידעת?',
    historicalContext: 'הקשר היסטורי',
    inJewishTradition: 'במסורת היהודית',
    learnMore: 'עוד',
    showLess: 'פחות',
    readCommentary: 'קרא פירוש מאת מיכאל אייזנברג',
  },
  context: {
    title: 'הקשר היסטורי',
    selectParsha: 'בחר פרשה לצפייה בהקשר ההיסטורי',
  },
  library: { title: 'ספריית פרשות', searchPlaceholder: 'חיפוש פרשות…' },
}

const es: Translations = {
  tabs: { map: 'MAPA', text: 'TEXTO', history: 'HISTORIA', library: 'BIBLIOTECA' },
  header: { library: 'Biblioteca', subscribe: 'Suscribirse', showTutorial: 'Tutorial' },
  sidebar: { searchPlaceholder: 'Buscar porciones…' },
  parsha: {
    selectToBegin: 'Selecciona una Parshá para empezar',
    thisWeek: 'Esta semana',
    thisWeeksPortion: 'Porción de esta semana',
    portionOf: (n, total) => `Porción ${n} de ${total}`,
    themes: 'Temas',
    keyFigures: 'Figuras clave',
    didYouKnow: '¿Sabías que…?',
    historicalContext: 'Contexto histórico',
    inJewishTradition: 'En la tradición judía',
    learnMore: 'Leer más',
    showLess: 'Mostrar menos',
    readCommentary: 'Leer comentario de Michael Eisenberg',
  },
  context: {
    title: 'Contexto histórico',
    selectParsha: 'Selecciona una Parshá para ver su contexto histórico',
  },
  library: { title: 'Biblioteca de Parshas', searchPlaceholder: 'Buscar parshas…' },
}

const ru: Translations = {
  tabs: { map: 'КАРТА', text: 'ТЕКСТ', history: 'ИСТОРИЯ', library: 'БИБЛИОТЕКА' },
  header: { library: 'Библиотека', subscribe: 'Подписаться', showTutorial: 'Обучение' },
  sidebar: { searchPlaceholder: 'Поиск разделов…' },
  parsha: {
    selectToBegin: 'Выберите Парашу для начала',
    thisWeek: 'На этой неделе',
    thisWeeksPortion: 'Параша этой недели',
    portionOf: (n, total) => `Раздел ${n} из ${total}`,
    themes: 'Темы',
    keyFigures: 'Ключевые фигуры',
    didYouKnow: 'Интересный факт',
    historicalContext: 'Исторический контекст',
    inJewishTradition: 'В еврейской традиции',
    learnMore: 'Подробнее',
    showLess: 'Свернуть',
    readCommentary: 'Читать комментарий Михаэля Айзенберга',
  },
  context: {
    title: 'Исторический контекст',
    selectParsha: 'Выберите Парашу для просмотра исторического контекста',
  },
  library: { title: 'Библиотека Параш', searchPlaceholder: 'Поиск Параш…' },
}

export const translations: Record<Language, Translations> = { en, he, es, ru }
