(function () {
  var STORAGE_KEY = 'abm-theme';
  var LIGHT = 'light';
  var DARK = 'dark';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var logo = document.getElementById('site-logo');
  var heroImage = document.getElementById('hero-shot-image');
  var featureCardImages = document.querySelectorAll('.feature-screenshot img[data-light][data-dark]');
  var roadmapProgressBars = document.querySelectorAll('.roadmap-progress-bar[data-added][data-target]');
  var toggleLabel = null;
  if (toggle && toggle.nextElementSibling) {
    toggleLabel = toggle.nextElementSibling;
  }

  function parseQuarterEnd(value) {
    if (!value) {
      return NaN;
    }
    var match = String(value).trim().match(/^Q([1-4])\s+(\d{4})$/i);
    if (!match) {
      return NaN;
    }
    var quarter = parseInt(match[1], 10);
    var year = parseInt(match[2], 10);
    if (isNaN(quarter) || isNaN(year)) {
      return NaN;
    }
    var endMonthByQuarter = {
      1: 2,
      2: 5,
      3: 8,
      4: 11
    };
    var endMonth = endMonthByQuarter[quarter];
    var endDay = new Date(year, endMonth + 1, 0).getDate();
    return Date.parse(year + '-' + String(endMonth + 1).padStart(2, '0') + '-' + String(endDay).padStart(2, '0') + 'T23:59:59');
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

  if (featureCardImages && featureCardImages.length > 0) {
      for (var i = 0; i < featureCardImages.length; i++) {
        var featureCardImage = featureCardImages[i];
        var lightFeature = featureCardImage.getAttribute('data-light');
        var darkFeature = featureCardImage.getAttribute('data-dark');
        var featureSrc = theme === DARK ? darkFeature : lightFeature;
        if (featureSrc) {
          featureCardImage.src = featureSrc;
        }
      }
    }

    if (roadmapProgressBars && roadmapProgressBars.length > 0) {
      var now = Date.now();
      for (var j = 0; j < roadmapProgressBars.length; j++) {
        var roadmapBar = roadmapProgressBars[j];
        var added = roadmapBar.getAttribute('data-added');
        var target = roadmapBar.getAttribute('data-target');
        var addedDate = added ? Date.parse(added + 'T00:00:00') : NaN;
        var targetDate = target ? Date.parse(target + 'T00:00:00') : NaN;

        if (isNaN(targetDate)) {
          var roadmapCard = roadmapBar.closest('.roadmap-card');
          var quarterTextNode = roadmapCard ? roadmapCard.querySelector('.roadmap-date span') : null;
          var quarterText = quarterTextNode ? quarterTextNode.textContent : '';
          targetDate = parseQuarterEnd(quarterText);
        }

        if (isNaN(addedDate) || isNaN(targetDate) || targetDate <= addedDate) {
          roadmapBar.style.width = '0%';
          continue;
        }

        var progress = ((now - addedDate) / (targetDate - addedDate)) * 100;
        if (progress < 0) {
          progress = 0;
        } else if (progress > 100) {
          progress = 100;
        }
        roadmapBar.style.width = progress.toFixed(2) + '%';
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
