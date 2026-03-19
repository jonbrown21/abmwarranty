---
layout: home
show_home_sections: false
title: Changelog
description: ABM Warranty app release notes for warranty monitoring, API sync, and dashboard updates.
permalink: /changelog/
---

<section class="abm-section hero-band">
  <div class="abm-container">
    <div class="hero-shell">
      <div class="hero-layout">
        <div class="hero-copy-col">
          <p class="eyebrow">Release notes</p>
          <h1>Changelog</h1>
          <p class="hero-copy">Track what has shipped for ABM Warranty and understand what is new, changed, and fixed in each release.</p>
          <h3 class="changelog-latest-release-title">Latest Release</h3>
          <p class="hero-copy" aria-label="Latest release notes">Version 0.4.1 — Feb 27, 2026</p>
          <ul class="changelog-release-list">
            <li><span class="changelog-release-check" aria-hidden="true">✓</span> Multi-tenancy support for Managed Service Providers</li>
            <li><span class="changelog-release-check" aria-hidden="true">✓</span> MDM support for managing managed preferences</li>
            <li><span class="changelog-release-check" aria-hidden="true">✓</span> Multi-credential handling</li>
            <li><span class="changelog-release-check" aria-hidden="true">✓</span> Single device refresh</li>
            <li><span class="changelog-release-check" aria-hidden="true">✓</span> Log debugging for greater troubleshooting</li>
          </ul>
          <a class="abm-btn changelog-release-btn" href="{{ site.app_store_url }}" target="_blank" rel="noopener noreferrer">Download Version 0.4.1</a>
        </div>
        <div class="hero-shot" role="img" aria-label="ABM Warranty changelog screenshot">
          <img
            id="hero-shot-image"
            src="{{ '/assets/images/changelog/screens/change.png' | relative_url }}"
            data-light="{{ '/assets/images/changelog/screens/change.png' | relative_url }}"
            data-dark="{{ '/assets/images/changelog/screens/change_dk.png' | relative_url }}"
            alt="ABM Warranty changelog and release notes interface"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1160"
            height="780">
        </div>
      </div>
    </div>
  </div>
</section>

{% include sections/changelog.html %}

{% include sections/pricing.html %}

{% include sections/newsletter.html %}

{% include sections/faq.html %}
