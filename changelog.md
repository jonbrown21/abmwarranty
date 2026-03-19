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
          <p class="hero-copy" aria-label="Latest release notes">
            Latest Release
            <br />
            Version 0.4.1 — Feb 27, 2026
            <br /><br />
            Multi-tenancy support for Managed Service Providers
            <br />
            MDM support for managing managed preferences
            <br />
            Multi-credential handling
            <br />
            Single device refresh
            <br />
            Log debugging for greater troubleshooting
          </p>
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
