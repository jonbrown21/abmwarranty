---
layout: guide
title: "Working with Connections"
description: "Working with Connections"
permalink: /guide/connections/
guide_shots:
  - src: /assets/images/guide/cred_side1.png
    alt: Connections setup panel in ABM Warranty
  - src: /assets/images/guide/jamf/jamf_light.png
    alt: Connections setup of JAMF in ABM Warranty
---

<p>
Connections define how ABM Warranty sends outbound updates to external systems
(for example, JAMF Pro or builder-based APIs). Each connection stores endpoint,
authentication, contract, and mapping behavior.
</p>

<h3>Where to Find Connections</h3>

<ul>
    <li>Open <strong>Settings</strong> and go to <strong>Connections</strong>.</li>
    <li>Select <strong>Add Connection</strong> to create a new one.</li>
    <li>Select an existing connection to edit options, mappings, and API contract details.</li>
    <li>Use <strong>Mapped Connections</strong> in Credential settings to associate connections to a credential.</li>
</ul>

<h3>High-Level Sorting and Ordering Logic</h3>

<ul>
    <li>The main Connections list is sorted alphabetically by connection name for stable browsing.</li>
    <li>Connection-to-credential relationships are shown as associated credential tags/pills.</li>
    <li>Execution order is controlled in each credential's <strong>Mapped Connections</strong> section using up/down ordering.</li>
    <li>That mapped order is the outbound run order used by sync execution.</li>
</ul>

<h3>Where Jobs Are Processed</h3>

<ul>
    <li>When outbound sync runs, ABM Warranty creates an outbound run and one job per mapped connection.</li>
    <li>Jobs are processed by the outbound sync engine in mapped order for the selected credential.</li>
    <li>Progress and results appear in <strong>Outbound Sync Jobs</strong> and the dashboard outbound progress area.</li>
    <li>Inbound ABM sync history remains separate in <strong>Inbound Sync Jobs</strong>.</li>
</ul>

<p>
This page is intentionally high-level. For field-level mapping behavior and contract configuration,
use the connection wizard and Update Mapping / Update API Contract views.
</p>

<h3>Operational Behavior During Outbound Sync</h3>
<p>
Outbound jobs execute in the mapped connection order configured for each credential. If a
credential has multiple connections, each connection runs as its own outbound job in sequence.
</p>

<h3>Source Modes</h3>
<ul>
  <li><strong>Database</strong>: outbound uses locally persisted ABM data as source.</li>
  <li><strong>Live API</strong>: outbound reconciles using live source data flow where enabled.</li>
</ul>

<h3>Dry Run</h3>
<p>
Dry run evaluates updates without writing destination changes and reports diagnostics
(would update, skipped, missing source, missing destination).
</p>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/jamf/modes.png' | relative_url }}"
      alt="Leverage Dry Run and API Based Modes"
      loading="lazy"
      decoding="async">
</figure>


<h3>Credential Association</h3>
<p>
After creation, connections are associated to credentials in the credential detail screen under
<strong>Mapped Connections</strong>. Ordering in that section determines outbound execution order
for that credential.
</p>

<figure class="guide-shot-card">
    <img
      src="{{ '/assets/images/guide/jamf/mapped_connections.png' | relative_url }}"
      alt="Mapped Connections in ABM Warranty"
      loading="lazy"
      decoding="async">
</figure>

