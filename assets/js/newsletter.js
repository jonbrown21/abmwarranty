(function () {
  var form = document.getElementById('newsletter-form');
  if (!form) {
    return;
  }

  var input = document.getElementById('newsletter-email');
  var success = document.getElementById('newsletter-success');
  var confettiLayer = document.getElementById('newsletter-confetti');
  var submitted = false;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function emitConfettiBatch(count) {
    if (!confettiLayer) {
      return;
    }

    for (var i = 0; i < count; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = random(0, 100) + '%';
      piece.style.top = '-' + Math.round(random(16, 64)) + 'px';
      piece.style.width = Math.round(random(4, 12)) + 'px';
      piece.style.height = Math.round(random(6, 16)) + 'px';
      piece.style.borderRadius = random(0, 1) > 0.45 ? '999px' : '2px';
      piece.style.background = 'hsl(' + Math.round(random(5, 355)) + ', ' + Math.round(random(65, 95)) + '%, ' + Math.round(random(42, 72)) + '%)';
      piece.style.animationDelay = random(0, 0.2) + 's';
      piece.style.animationDuration = random(3.0, 5.5) + 's';
      piece.style.animation = 'confetti-drop ' + piece.style.animationDuration + ' cubic-bezier(0.2, 0.7, 0.2, 1) forwards';
      confettiLayer.appendChild(piece);
    }
  }

  function spawnConfetti() {
    if (!confettiLayer) {
      return;
    }

    confettiLayer.innerHTML = '';
    var travel = Math.max(220, Math.round(confettiLayer.clientHeight * 2.2));
    confettiLayer.style.setProperty('--confetti-travel', travel + 'px');
    var totalDurationMs = 5000;
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    var batchIntervalMs = isMobile ? 120 : 95;
    var batchSize = isMobile ? 4 : 7;
    var elapsed = 0;

    emitConfettiBatch(Math.round(batchSize * 1.8));

    var ticker = window.setInterval(function () {
      emitConfettiBatch(batchSize);
      elapsed += batchIntervalMs;
      if (elapsed >= totalDurationMs) {
        window.clearInterval(ticker);
      }
    }, batchIntervalMs);

    window.setTimeout(function () {
      confettiLayer.innerHTML = '';
    }, totalDurationMs + 900);
  }

  function showSuccess() {
    if (submitted) {
      return;
    }
    submitted = true;

    form.classList.add('is-submitted');
    if (success) {
      success.hidden = false;
    }
    spawnConfetti();
    if (input) {
      input.value = '';
      input.blur();
    }
  }

    form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.reportValidity()) {
      return;
    }

    showSuccess();
  });
})();
