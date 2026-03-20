---
layout: guide
title: "Filters"
description: "Filters"
permalink: /guide/filters/
guide_shots:
  - src: /assets/images/guide/filters.png
    alt: Filter options in ABM Warranty
---


<p>
Filters allow you to narrow the device list for the <em>active tenant</em>
based on warranty status, coverage state, device type, or lifecycle state.
Filtering updates the device list, Dashboard counts, and navigation instantly.
</p>

<h3>Warranty & Coverage Status</h3>

<p>
Coverage-based filters group devices by their current warranty condition as
reported by Apple Business Manager and derived by ABM Warranty:
</p>

<ul>
    <li><strong>In Warranty</strong> – Devices with active standard warranty</li>
    <li><strong>Out of Warranty</strong> – Devices with expired standard coverage</li>
    <li><strong>Needs Attention</strong> – Devices nearing expiration or with coverage anomalies</li>
    <li><strong>Expiring Soon</strong> – Devices approaching warranty end dates</li>
    <li><strong>Expired YTD</strong> – Devices whose coverage expired earlier in the current year</li>
</ul>

<h3>AppleCare+ Coverage</h3>

<p>
AppleCare+ filters isolate devices with extended coverage:
</p>

<ul>
    <li><strong>Valid AppleCare+</strong> – Active AppleCare+ coverage</li>
    <li><strong>Expired AppleCare+</strong> – AppleCare+ coverage has ended</li>
</ul>

<h3>Device Type</h3>

<p>
Device-type filters group devices by Apple-reported hardware family:
</p>

<ul>
    <li>Mac</li>
    <li>iPhone</li>
    <li>iPad</li>
    <li>Apple TV</li>
</ul>

<h3>No Data & Inactive Devices</h3>

<p>
Some devices may not return coverage information or may no longer be present
in Apple Business Manager:
</p>

<ul>
    <li>
        <strong>No Data</strong> – Active devices where coverage data could not
        be retrieved. These devices support targeted retry without reloading
        the full device inventory.
    </li>
    <li>
        <strong>Inactive</strong> – Devices no longer returned by Apple Business
        Manager. Inactive devices are retained locally for historical reference
        and are never deleted automatically.
    </li>
</ul>

<h3>Dashboard Integration</h3>

<p>
Dashboard tiles act as filter shortcuts. Selecting a tile automatically applies
the corresponding filter and updates the device list to match the selected
category.
</p>

<h3>CSV Export Behavior</h3>

<p>
Filters apply directly to CSV exports. When exporting, only the currently
visible devices for the active tenant are included, and the export preserves
the current sort order.
</p>

<h3>Persistence & Live Updates</h3>

<p>
Filters remain active during imports. As new data is streamed in, Dashboard
counts and the device list update continuously without blocking the user
interface.
</p>

<p>
</p>
