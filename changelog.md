---
layout: page
title: ABM Warranty Changelog | Apple Device Warranty Updates
description: Release notes and updates for the ABM Warranty macOS app.
permalink: /changelog/
---

## Changelog

- **Release focus:** Improved expiry alert visibility and cleaner tenant filtering.
- **Feature updates:** Better setup guidance and clearer premium support messaging.
- **Roadmap alignment:** See /roadmap for planned work and sequencing.

## Recent changes

{% for post in site.categories.changelog %}
### {{ post.title }} — {{ post.date | date: "%B %d, %Y" }}
{{ post.excerpt }}
{% endfor %}

