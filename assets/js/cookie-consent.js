(function () {
  var storageKey = 'abm-cookie-consent';
  var banner = document.getElementById('cookie-consent-banner');
  if (!banner) {
    return;
  }

  function readChoice() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveChoice(value) {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch (error) {
      return;
    }
  }

  function hideBanner() {
    banner.classList.remove('is-visible');
    banner.setAttribute('hidden', 'hidden');
  }

  function showBanner() {
    banner.removeAttribute('hidden');
    window.requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });
  }

  function onActionClick(event) {
    var action = event.target.getAttribute('data-cookie-action');
    if (action !== 'accept' && action !== 'reject') {
      return;
    }

    saveChoice(action);
    hideBanner();
  }

  var savedChoice = readChoice();
  if (savedChoice === 'accept' || savedChoice === 'reject') {
    hideBanner();
    return;
  }

  showBanner();
  banner.addEventListener('click', onActionClick);
})();
