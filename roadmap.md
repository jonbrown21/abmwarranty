---
layout: home
show_home_sections: false
title: Roadmap
description: Forward roadmap for ABM Warranty features, versions, and planned improvements.
permalink: /roadmap/
---

<section class="abm-section hero-band hero-band--roadmap">
  <div class="abm-container">
    <div class="hero-shell">
      <div class="hero-layout">
        <div class="hero-copy-col">
          <p class="eyebrow">Product direction</p>
          <h1>Roadmap</h1>
          <p class="hero-copy">Planned features, milestones, and versioned priorities for ABM Warranty, shared as a transparent public roadmap to help teams plan adoption and feedback.</p>
          {% include sections/roadmap-hero-form.html %}
        </div>
        <div class="hero-shot" role="img" aria-label="ABM Warranty roadmap preview">
          <img
            id="hero-shot-image"
            src="{{ '/assets/images/changelog/screens/change.png' | relative_url }}"
            data-light="{{ '/assets/images/changelog/screens/change.png' | relative_url }}"
            data-dark="{{ '/assets/images/changelog/screens/change_dk.png' | relative_url }}"
            alt="ABM Warranty roadmap and planning timeline preview"
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

{% include sections/roadmap.html %}

{% include sections/pricing.html %}

{% include sections/newsletter.html %}

{% include sections/faq.html %}
