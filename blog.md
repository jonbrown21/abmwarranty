---
layout: home
show_home_sections: false
title: Blog
description: ABM Warranty release notes, guides, roadmap updates, and operational insights.
permalink: /blog/
---

<section class="abm-section hero-band hero-band--blog">
  <div class="abm-container">
    <div class="hero-shell">
      <div class="hero-layout">
        <div class="hero-copy-col">
          <p class="eyebrow">Latest updates and release notes</p>
          <h1>ABM Warranty Blog</h1>
          <p class="hero-copy">
            Product updates, changelog highlights, roadmap context, and operational guidance for ABM Warranty deployments, including practical rollout notes, field-tested support workflows, and release planning details that help Apple IT teams make faster, lower-risk decisions at scale.
          </p>
          <p class="abm-cta-row">
            <a class="abm-btn" href="{{ '/changelog/' | relative_url }}">View Changelog</a>
            <a class="abm-btn abm-btn--ghost" href="{{ '/roadmap/' | relative_url }}">View Roadmap</a>
          </p>
        </div>
        <div class="hero-shot" role="img" aria-label="ABM Warranty app screenshot">
          <img
            id="hero-shot-image"
            src="{{ '/assets/images/home/screens/hero.png' | relative_url }}"
            data-light="{{ '/assets/images/home/screens/hero.png' | relative_url }}"
            data-dark="{{ '/assets/images/home/screens/hero_dk.png' | relative_url }}"
            alt="ABM Warranty dashboard showing warranty status and risk alerts"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1160"
            height="780">
        </div>
      </div>
      <div class="beta-cta-bar">
        <p class="beta-cta-bar__text">Join the Beta - Version 0.4.2</p>
        <a class="abm-btn abm-btn--pill" href="https://testflight.apple.com/join/tGnesmG1" target="_blank" rel="noopener noreferrer" aria-label="Join the ABM Warranty Beta on TestFlight">
          Download Now
        </a>
      </div>
    </div>
  </div>
</section>

<section id="blog" class="abm-section blog-page-band">
  <div class="abm-container">
    <p class="eyebrow">Published posts</p>
    <h2>Blog</h2>
    <p class="abm-note">Browse release notes, guides, and implementation updates.</p>

    {% assign recent_posts = site.posts | sort: "date" | reverse %}

    {% if recent_posts == empty %}
      <article class="abm-card blog-card">
        <div class="blog-cover" role="img" aria-label="Blog cover image placeholder">
          <span>Blog cover image</span>
        </div>
        <h3>Blog is ready to publish</h3>
        <p>Publish your first update and this page will feature it automatically.</p>
        <a href="{{ '/changelog/' | relative_url }}" class="abm-btn full-width blog-read-btn">Read changelog</a>
      </article>
    {% else %}
      <div class="abm-blog-grid" id="blog-page-grid" data-page-size="6">
        {% for post in recent_posts %}
          {% assign cover = post.image | default: post.cover %}
          <article class="abm-card blog-card">
            <div class="blog-cover" role="img" aria-label="Blog cover image placeholder">
              {% if cover %}
                <img
                  src="{{ cover | relative_url }}"
                  alt="{{ post.title | escape }} cover image"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450">
              {% else %}
                <span>Blog cover image</span>
              {% endif %}
            </div>
            <p class="meta">{{ post.date | date: "%b %d, %Y" }}</p>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
            <div class="blog-meta-row">
              {% assign fallback_categories = "guide|release|roadmap|updates|support|tips" | split: "|" %}
              {% if post.meta_categories and post.meta_categories != empty %}
                {% assign base_categories = post.meta_categories %}
              {% elsif post.categories and post.categories != empty %}
                {% assign base_categories = post.categories %}
              {% elsif post.tags and post.tags != empty %}
                {% assign base_categories = post.tags %}
              {% else %}
                {% assign base_categories = fallback_categories %}
              {% endif %}
              {% assign merged_categories = base_categories | concat: fallback_categories %}
              {% assign shown_categories = merged_categories | uniq | slice: 0, 4 %}
              {% for category in shown_categories %}
                {% assign chip_color = forloop.index0 | modulo: 8 %}
                {% if category.label %}
                  {% assign category_label = category.label %}
                {% else %}
                  {% assign category_label = category %}
                {% endif %}
                {% assign category_key = category_label | slugify %}
                {% assign chip_class = "blog-meta-chip--" | append: chip_color %}
                {% if category_key == "operations" %}
                  {% assign chip_class = "blog-meta-chip--operations" %}
                {% elsif category_key == "beta" %}
                  {% assign chip_class = "blog-meta-chip--beta" %}
                {% elsif category_key == "changelog" %}
                  {% assign chip_class = "blog-meta-chip--changelog" %}
                {% elsif category_key == "roadmap" %}
                  {% assign chip_class = "blog-meta-chip--roadmap" %}
                {% endif %}
                <a
                  href="{{ '/blog/category/' | append: category_key | append: '/' | relative_url }}"
                  class="blog-meta-chip {{ chip_class }}"
                  aria-label="View {{ category_label | escape }} posts"
                >
                  {{ category_label }}
                </a>
              {% endfor %}
            </div>
            <a href="{{ post.url | relative_url }}" class="abm-btn full-width blog-read-btn">Read post</a>
          </article>
        {% endfor %}
      </div>

      <nav id="blog-page-pagination" class="blog-page-pagination" aria-label="Blog pagination"></nav>
    {% endif %}
  </div>
</section>

{% include sections/newsletter.html %}

{% include sections/faq.html %}
