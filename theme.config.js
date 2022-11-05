export default {
  github: 'https://github.com/Tobotis/fft-introduction',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Fourier...?</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Eine Einführung
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta property="og:title" content="Fourier?" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="description" content="Fourier... ? - Eine Einführung" />
      <meta name="og:description" content="Fourier... ? - Eine Einführung" />
      <meta name="apple-mobile-web-app-title" content="Fourier?" />
    </>
  ),
  search: false,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  titleSuffix: false,
  footerEditLink: false,
  footerText: (
    <>{new Date().getFullYear()} © Florian Reinecke und Tobias Steinbrecher.</>
  ),
  unstable_faviconGlyph: '𝓕',
}
