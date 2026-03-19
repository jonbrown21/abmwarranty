---
layout: home
show_home_sections: false
title: Changelog
description: ABM Warranty app release notes for warranty monitoring, API sync, and dashboard updates.
permalink: /changelog/
---

{% assign latest_changelog = site.categories.changelog | sort: "date" | reverse | first %}

<section class="abm-section hero-band">
  <div class="abm-container">
    <div class="hero-shell">
      <div class="hero-layout">
        <div class="hero-copy-col">
          <p class="eyebrow">Release notes</p>
          <h1>Changelog</h1>
          <p class="hero-copy">Track what has shipped for ABM Warranty and understand what is new, changed, and fixed in each release.</p>
          {% if latest_changelog %}
            <h3 class="changelog-latest-release-title">Latest Release</h3>
            <p class="hero-copy" aria-label="Latest release notes">Version {{ latest_changelog.release_version | default: latest_changelog.title }} — {{ latest_changelog.release_date | default: latest_changelog.date | date: "%b %-d, %Y" }}</p>
            <ul class="changelog-release-list">
              {% if latest_changelog.release_notes and latest_changelog.release_notes.size > 0 %}
                {% for note in latest_changelog.release_notes %}
                  <li><span class="changelog-release-check" aria-hidden="true">✓</span> {{ note }}</li>
                {% endfor %}
              {% elsif latest_changelog.excerpt %}
                {% assign latest_lines = latest_changelog.excerpt | strip_html | split: '\n' %}
                {% for line in latest_lines %}
                  {% assign trimmed_line = line | strip %}
                  {% if trimmed_line != "" %}
                    <li><span class="changelog-release-check" aria-hidden="true">✓</span> {{ trimmed_line }}</li>
                  {% endif %}
                {% endfor %}
              {% endif %}
            </ul>
            <div class="changelog-release-actions">
              <a class="abm-btn changelog-release-btn" href="{{ site.app_store_url }}" target="_blank" rel="noopener noreferrer">Download Version {{ latest_changelog.release_version | default: latest_changelog.title }}</a>
              <a class="abm-btn changelog-release-btn changelog-readmore-btn" href="{{ latest_changelog.url | relative_url }}">Read More</a>
            </div>
          {% endif %}
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
