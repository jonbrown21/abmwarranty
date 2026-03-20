(function () {
  var STORAGE_KEY = 'abm-theme';
  var LIGHT = 'light';
  var DARK = 'dark';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var logo = document.getElementById('site-logo');
  var heroImage = document.getElementById('hero-shot-image');
  var featureCardImages = document.querySelectorAll('.feature-screenshot img[data-light][data-dark]');
  var featureGrid = document.getElementById('feature-grid');
  var featurePagination = document.getElementById('feature-pagination');
  var blogPageGrid = document.getElementById('blog-page-grid');
  var blogPagePagination = document.getElementById('blog-page-pagination');
  var roadmapProgressBars = document.querySelectorAll('.roadmap-progress-bar[data-added][data-target]');
  var toggleLabel = null;
  if (toggle && toggle.nextElementSibling) {
    toggleLabel = toggle.nextElementSibling;
  }

  function parseQuarterCompletion(value) {
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
      1: 0,
      2: 3,
      3: 7,
      4: 10
    };
    var endMonth = endMonthByQuarter[quarter];
    var endDay = new Date(year, endMonth + 1, 0).getDate();
    return Date.parse(year + '-' + String(endMonth + 1).padStart(2, '0') + '-' + String(endDay).padStart(2, '0') + 'T23:59:59');
  }

  function initFeaturePager() {
    if (!featureGrid || !featurePagination) {
      return;
    }

    var cards = Array.prototype.slice.call(featureGrid.querySelectorAll('.feature-card'));
    if (!cards.length) {
      return;
    }

    cards.reverse();
    for (var i = 0; i < cards.length; i++) {
      featureGrid.appendChild(cards[i]);
    }

    var pageSize = parseInt(featureGrid.getAttribute('data-page-size') || '6', 10);
    if (isNaN(pageSize) || pageSize < 1) {
      pageSize = 6;
    }

    var pageCount = Math.ceil(cards.length / pageSize);

    function renderPage(pageIndex) {
      for (var j = 0; j < cards.length; j++) {
        var start = pageIndex * pageSize;
        var end = start + pageSize;
        var isVisible = j >= start && j < end;
        cards[j].classList.toggle('is-hidden', !isVisible);
      }

      var dots = featurePagination.querySelectorAll('.feature-page-dot');
      for (var k = 0; k < dots.length; k++) {
        var isActive = k === pageIndex;
        dots[k].classList.toggle('is-active', isActive);
        dots[k].setAttribute('aria-current', isActive ? 'true' : 'false');
      }
    }

    featurePagination.innerHTML = '';
    if (pageCount <= 1) {
      renderPage(0);
      return;
    }

    for (var d = 0; d < pageCount; d++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'feature-page-dot';
      dot.setAttribute('aria-label', 'Show feature page ' + (d + 1));
      (function (pageNumber) {
        dot.addEventListener('click', function () {
          renderPage(pageNumber);
        });
      })(d);
      featurePagination.appendChild(dot);
    }

    renderPage(0);
  }

  function initBlogPager() {
    if (!blogPageGrid || !blogPagePagination) {
      return;
    }

    var cards = Array.prototype.slice.call(blogPageGrid.querySelectorAll('.blog-card'));
    if (!cards.length) {
      return;
    }

    var pageSize = parseInt(blogPageGrid.getAttribute('data-page-size') || '6', 10);
    if (isNaN(pageSize) || pageSize < 1) {
      pageSize = 6;
    }

    var pageCount = Math.ceil(cards.length / pageSize);
    var currentPage = 0;

    function renderPage(pageIndex) {
      currentPage = pageIndex;

      for (var i = 0; i < cards.length; i++) {
        var start = pageIndex * pageSize;
        var end = start + pageSize;
        var isVisible = i >= start && i < end;
        cards[i].classList.toggle('is-hidden', !isVisible);
      }

      var buttons = blogPagePagination.querySelectorAll('.blog-page-btn--num');
      for (var b = 0; b < buttons.length; b++) {
        var active = b === pageIndex;
        buttons[b].classList.toggle('is-active', active);
        buttons[b].setAttribute('aria-current', active ? 'page' : 'false');
      }

      var prevBtn = blogPagePagination.querySelector('.blog-page-btn--prev');
      var nextBtn = blogPagePagination.querySelector('.blog-page-btn--next');
      if (prevBtn) {
        prevBtn.disabled = pageIndex === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = pageIndex === pageCount - 1;
      }
    }

    function goTo(pageIndex) {
      if (pageIndex < 0 || pageIndex > pageCount - 1) {
        return;
      }
      renderPage(pageIndex);
    }

    blogPagePagination.innerHTML = '';
    if (pageCount <= 1) {
      renderPage(0);
      return;
    }

    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'blog-page-btn blog-page-btn--nav blog-page-btn--prev';
    prev.textContent = 'Previous';
    prev.addEventListener('click', function () {
      goTo(currentPage - 1);
    });
    blogPagePagination.appendChild(prev);

    for (var p = 0; p < pageCount; p++) {
      var num = document.createElement('button');
      num.type = 'button';
      num.className = 'blog-page-btn blog-page-btn--num';
      num.textContent = String(p + 1);
      num.setAttribute('aria-label', 'Go to blog page ' + (p + 1));
      (function (pageNumber) {
        num.addEventListener('click', function () {
          goTo(pageNumber);
        });
      })(p);
      blogPagePagination.appendChild(num);
    }

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'blog-page-btn blog-page-btn--nav blog-page-btn--next';
    next.textContent = 'Next';
    next.addEventListener('click', function () {
      goTo(currentPage + 1);
    });
    blogPagePagination.appendChild(next);

    renderPage(0);
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
        var addedDate = added ? Date.parse(added + 'T00:00:00') : NaN;
        var targetDate = NaN;

        var roadmapCard = roadmapBar.closest('.roadmap-card');
        var quarterTextNode = roadmapCard ? roadmapCard.querySelector('.roadmap-date span') : null;
        var quarterText = quarterTextNode ? quarterTextNode.textContent : '';
        targetDate = parseQuarterCompletion(quarterText);

        if (isNaN(targetDate)) {
          var target = roadmapBar.getAttribute('data-target');
          targetDate = target ? Date.parse(target + 'T00:00:00') : NaN;
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

  initFeaturePager();
  initBlogPager();

  var initialTheme = resolveInitialTheme();
  setTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('change', function () {
      setTheme(toggle.checked ? DARK : LIGHT);
    });
  }
})();
