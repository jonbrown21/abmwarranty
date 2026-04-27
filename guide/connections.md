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