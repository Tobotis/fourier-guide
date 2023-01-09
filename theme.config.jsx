import { useRouter } from 'next/router'
export default {
  project: {
    link: 'https://github.com/Tobotis/fourier-gruide',
  },
  docsRepositoryBase: 'https://github.com/Tobotis/fourier-guide',
  logo: () => {
    const { locale } = useRouter()
    if (locale == 'de')
      return (
        <>
          <span className="mr-2 font-extrabold hidden md:inline">
            Fourier Guide
          </span>
          <span className="text-gray-600 font-normal hidden md:inline">
            Eine Einführung
          </span>
        </>
      )
    return (
      <>
        <span className="mr-2 font-extrabold hidden md:inline">
          Fourier Guide
        </span>
        <span className="text-gray-600 font-normal hidden md:inline">
          An introduction
        </span>
      </>
    )
  },
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta property="og:title" content="Fourier Guide" />
      <meta property="title" content="Fourier Guide" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="description" content="Fourier Guide - Eine Einführung" />
      <meta name="og:description" content="Fourier Guide - Eine Einführung" />
      <meta name="apple-mobile-web-app-title" content="Fourier Guide" />
    </>
  ),
  //primaryHue: 299,
  search: {
    placeholder: () => {
      const { locale } = useRouter()
      if (locale == 'de') return 'Suchen...'
      return 'Search...'
    },
  },
  navigation: true,
  footer: true,
  titleSuffix: false,
  editLink: {
    text: () => {
      const { locale } = useRouter()
      if (locale == 'de') return 'Bearbeite diese Seite auf Github →'
      return 'Edit this page on Github →'
    },
  },
  feedback: {
    content: () => {
      const { locale } = useRouter()
      if (locale == 'de') return 'Fragen? Gib uns Feedback →'
      return 'Question? Give us feedback →'
    },
  },
  footer: {
    text: () => {
      const { locale } = useRouter()
      if (locale == 'de')
        return (
          <span>
            {new Date().getFullYear()} © Florian Reinecke und Tobias
            Steinbrecher.
          </span>
        )
      return (
        <span>
          {new Date().getFullYear()} © Florian Reinecke and Tobias Steinbrecher.
        </span>
      )
    },
  },
  toc: {
    title: () => {
      const { locale } = useRouter()
      if (locale == 'de') return 'Auf dieser Seite'
      return 'On this page'
    },
  },
  faviconGlyph: '𝓕',
  sidebar: { defaultMenuCollapseLevel: 0 },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Fourier Guide',
    }
  },
  i18n: [
    { locale: 'en', text: '🇬🇧 English' },
    { locale: 'de', text: '🇩🇪 Deutsch' },
  ],
}
