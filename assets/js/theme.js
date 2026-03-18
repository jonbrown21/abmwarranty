(function () {
  var STORAGE_KEY = 'abm-theme';
  var LIGHT = 'light';
  var DARK = 'dark';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var logo = document.getElementById('site-logo');
  var heroImage = document.getElementById('hero-shot-image');
  var toggleLabel = null;
  if (toggle && toggle.nextElementSibling) {
    toggleLabel = toggle.nextElementSibling;
  }

  function setTheme(theme) {
    if (theme !== LIGHT && theme !== DARK) {
      return;
    }

    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (toggle) {
      var isDark = theme === DARK;
      toggle.checked = isDark;
      if (toggleLabel) {
        toggleLabel.setAttribute('aria-checked', String(isDark));
      }
      var srOnly = toggleLabel ? toggleLabel.querySelector('.sr-only') : null;
      if (srOnly) {
        srOnly.textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme';
      }
    }

    if (logo) {
      var lightLogo = logo.getAttribute('data-light');
      var darkLogo = logo.getAttribute('data-dark');
      var next = theme === DARK ? darkLogo : lightLogo;
      if (next) {
        logo.src = next;
      }
    }

    if (heroImage) {
      var lightHero = heroImage.getAttribute('data-light');
      var darkHero = heroImage.getAttribute('data-dark');
      var heroSrc = theme === DARK ? darkHero : lightHero;
      if (heroSrc) {
        heroImage.src = heroSrc;
      }
    }
  }

  function resolveInitialTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === LIGHT || saved === DARK) {
      return saved;
    }
    return LIGHT;
  }

  var initialTheme = resolveInitialTheme();
  setTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('change', function () {
      setTheme(toggle.checked ? DARK : LIGHT);
    });
  }
})();
