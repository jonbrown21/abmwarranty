---
layout: home
show_home_sections: false
title: ABM Warranty Privacy
description: ABM Warranty privacy details for Mac device warranty monitoring.
permalink: /privacy/
---

<section class="abm-section hero-band hero-band--privacy">
  <div class="abm-container">
    <div class="hero-shell">
      <div class="hero-layout">
        <div class="hero-copy-col">
          <p class="eyebrow">Trust and data handling</p>
          <h1>Privacy</h1>
          <p class="hero-copy">
            ABM Warranty is built for Apple IT operations. This page describes what data is processed, how it is used, and what controls administrators retain.
          </p>
        </div>
        <div class="hero-shot" role="img" aria-label="ABM Warranty privacy page hero image">
          <img
            id="hero-shot-image"
            src="{{ '/assets/images/home/screens/widgets_lg.png' | relative_url }}"
            data-light="{{ '/assets/images/home/screens/widgets_lg.png' | relative_url }}"
            data-dark="{{ '/assets/images/home/screens/widgets_lgdk.png' | relative_url }}"
            alt="ABM Warranty app interface preview"
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

<section class="abm-section privacy-content">
  <div class="abm-container">
    <p class="eyebrow">Privacy policy</p>
    <h2>How ABM Warranty handles data</h2>

    <p>
      ABM Warranty connects to Apple Business Manager and Apple School Manager data sources that you authorize. The app is designed for operational visibility into warranty and AppleCare+ status and does not require broad, unrelated data collection to function.
    </p>

    <h3>Data collected for app functionality</h3>
    <ul>
      <li>Tenant and device inventory metadata required for warranty analysis.</li>
      <li>Coverage status and associated lifecycle timestamps returned by approved API calls.</li>
      <li>Operational diagnostics used to surface sync state and troubleshooting context.</li>
    </ul>

    <h3>How data is used</h3>
    <ul>
      <li>To display warranty state, risk conditions, and import outcomes inside the app.</li>
      <li>To support exports and reporting workflows requested by administrators.</li>
      <li>To provide diagnostics that help resolve API or credential issues.</li>
    </ul>

    <h3>Administrative controls</h3>
    <ul>
      <li>You can rotate credentials and reauthorize tenants as needed.</li>
      <li>You can remove local data and re-sync from source systems.</li>
      <li>Managed preferences can enforce configuration policies in enterprise deployments.</li>
    </ul>

    <h3>Contact</h3>
    <p>
      Questions about privacy or data handling can be sent to
      <a href="mailto:hello@abmwarranty.com">hello@abmwarranty.com</a>.
    </p>
  </div>
</section>

{% include sections/newsletter.html %}

{% include sections/faq.html %}
