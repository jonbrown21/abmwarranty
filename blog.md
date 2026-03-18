---
layout: page
title: Blog
description: ABM Warranty release notes, guides, and updates.
permalink: /blog/
---

# Blog

{% assign recent_posts = site.posts | sort: "date" | reverse %}

{% if recent_posts == empty %}

There are no posts yet.

{% else %}

<div class="abm-blog-grid">
  {% for post in recent_posts %}
    {% assign cover = post.image | default: post.cover %}
    <article class="abm-card blog-card">
      <div class="blog-cover" role="img" aria-label="Blog cover image placeholder">
        {% if cover %}
          <img src="{{ cover | relative_url }}" alt="{{ post.title | escape }} cover image">
        {% else %}
          <span>Blog cover image</span>
        {% endif %}
      </div>
      <p class="meta">{{ post.date | date: "%b %d, %Y" }}</p>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      <a href="{{ post.url | relative_url }}" class="abm-btn full-width blog-read-btn">Read post</a>
    </article>
  {% endfor %}
</div>

{% endif %}

