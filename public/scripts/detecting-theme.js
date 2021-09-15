(function () {
  var darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  var themeName = window.localStorage.getItem('theme-name');

  var isThemeAuto = !themeName || themeName === 'auto';
  if (isThemeAuto && darkThemeMq.matches) {
    themeName = 'dark';
  }

  return document.body.classList.toggle('theme_dark', themeName === 'dark');
})();
